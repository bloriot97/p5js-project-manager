function Gui(name, widht){
    this.name = name;
    this.width = widht;
    this.titleSize = 15;
    this.elementsSpace = 10;
    this.scrolling = {x: 0 ,y:0};

    this.background = color(52, 73, 94);
    this.bgMargin = 10;

    this.guiElements = [];

    this.height = 0;

}

Gui.prototype.scroll = function(x,y){
    this.scrolling.y += y;
    this.scrolling.x += x;
    translate(x, y);
    return {x: this.scrolling.x - x,y: this.scrolling.y - y};
}
Gui.prototype.pressed = function(x,y){
    this.guiElements.forEach( function(e){
        e.pressed(x,y);
    })
}

Gui.prototype.updateHeight = function(){
  this.height = this.titleSize + this.elementsSpace;
  for (let i = 0; i < this.guiElements.length; i ++){
      this.height += this.guiElements[i].height + this.elementsSpace
  }
}

Gui.prototype.draw = function(x,y){
    this.scrolling = {x: 0 ,y:0};


    push();
    this.scroll(x,y);
    fill(this.background);
    noStroke();
    rect(-this.bgMargin , -this.bgMargin , this.width + this.bgMargin * 2 , this.height + this.bgMargin * 2);
    fill(236, 240, 241);
    textSize(this.titleSize);
    text(this.name ,0, this.titleSize);
    this.scroll(0, this.titleSize + this.elementsSpace)

    this.guiElements.forEach( function(e){
        e.draw();
    })
    pop();
}
Gui.prototype.addElement = function(e, action){
    e.action = action;
    this.guiElements.push(e)
    this.updateHeight();
}


function GuiElement(gui){
    this.height = 0;
    this.gui = gui;
    this.value = 0;
    this.scrolling = {x:0, y: 0};
    this.textHeight = 14;
    this.tipSize = 12;
    this.tipText = "Tooltip";
    this.tipPadding = 5;
    this.tip = false;
}

GuiElement.prototype.draw = function(){

    if ( this.tip && this.isIn(mouseX,mouseY)){
      textAlign(CENTER);
      textSize(this.tipSize);
      let width = textWidth(this.tipText);
      fill(236, 240, 241);
      rect(this.gui.width + 8, (this.height - (this.tipSize)) / 2 - this.tipPadding, width + this.tipPadding * 2 , this.tipSize + this.tipPadding * 2);
      triangle(this.gui.width, (this.height) / 2, this.gui.width + 8, (this.height) / 2 - 4, this.gui.width + 8, (this.height) / 2 + 4);
      fill(44, 62, 80);
      text(this.tipText, this.gui.width + this.tipPadding + width/2 + 8, (this.height + this.tipSize*0.5) / 2 + this.tipPadding / 2);
    }
    this.translateNext();
}

GuiElement.prototype.translateNext = function(){
    this.scrolling = this.gui.scroll(0, this.height + this.gui.elementsSpace);
}

GuiElement.prototype.pressed = function(x,y){
    if ( this.isIn(x,y) ){
        this.proccedAction(x - this.scrolling.x ,y - this.scrolling.y)
    }
}

GuiElement.prototype.proccedAction = function(x,y){

}

GuiElement.prototype.isIn = function(x,y){
    if ( x >= this.scrolling.x
        && y >= this.scrolling.y
        && x < this.scrolling.x + this.gui.width
        && y < this.scrolling.y + this.height){
        return true;
    } else {
        return false;
    }
}

function GuiSlider(gui, name, from, to, value, formatFunction){
    GuiElement.call(this, gui)
    this.from = from;
    this.to = to;
    this.height = 10;
    this.proportion = 0.8;

    this.formatFunction = formatFunction;
    this.value = from;
    this.setValue(value);

    this.tipText = name;
    this.tip = true;
}

GuiSlider.prototype = new GuiElement();
GuiSlider.prototype.setValue = function(v){
    if ( this.formatFunction ){
        this.value = this.formatFunction(v);
    } else {
        this.value = v;
    }
    if ( this.value < this.from ){
      this.value = this.from;
    }
    if ( this.value > this.to ){
      this.value = this.to;
    }
}


function mapValue(value, a, b, c, d){
    return c + (value - a) / (b-a) * (d-c);
}

GuiSlider.prototype.draw = function(){
    ellipseMode(CENTER);
    noStroke();
    fill(127, 140, 141)
    rect((1-this.proportion)*this.gui.width,this.height/2-1, this.proportion*this.gui.width, 2);
    fill(26, 188, 156)
    ellipse(mapValue(this.value, this.from, this.to, (1-this.proportion)*this.gui.width, this.gui.width), this.height/2,this.height, this.height )

    textSize(12);
    textAlign(CENTER);
    fill(236, 240, 241);
    text(this.value.toFixed(2), 10, (this.height+this.textHeight*0.5) / 2)

    GuiElement.prototype.draw.call(this);
}
GuiSlider.prototype.proccedAction = function(x,y){
    this.setValue(mapValue(x, (1-this.proportion)*this.gui.width, this.gui.width, this.from, this.to));

    this.action({value: this.value});
}

function GuiButton(gui, name, height){
    GuiElement.call(this, gui);
    this.height = height;
    this.name = name;
    this.color = {r: 26,g: 188,b:156}
    this.textHeight = 14;

}
GuiButton.prototype = new GuiElement();

GuiButton.prototype.draw = function(){
    noStroke();
    fill(this.color.r, this.color.g, this.color.b);
    rect(0,0, this.gui.width, this.height);
    textSize(this.textHeight);
    textAlign(CENTER);
    fill(236, 240, 241);
    text(this.name, this.gui.width / 2, (this.height+this.textHeight*0.5) / 2)

    GuiElement.prototype.draw.call(this);
}

GuiButton.prototype.proccedAction = function(x,y){
    this.action({});
}


function GuiCheckBox(gui, name, value){
    GuiElement.call(this, gui)
    this.height = 20;
    this.buttonProportion = 0.8;
    this.name = name;
    this.color = {r: 26,g: 188,b:156}
    this.textHeight = 14;
    this.value = value;
}
GuiCheckBox.prototype = new GuiElement();

GuiCheckBox.prototype.draw = function(){
    noStroke();
    if ( this.value ){
        fill(this.color.r, this.color.g, this.color.b);
    } else {
        fill(236, 240, 241);

    }
    rect((1-this.buttonProportion) * 0.5 * this.height , (1-this.buttonProportion) * 0.5 * this.height, this.height*this.buttonProportion, this.height*this.buttonProportion);
    textSize(this.textHeight);
    textAlign(LEFT);
    fill(236, 240, 241);
    text(this.name, this.height + 5, (this.height+this.textHeight*0.5) / 2)

    GuiElement.prototype.draw.call(this);
}

GuiCheckBox.prototype.proccedAction = function(x,y){
    this.value = !this.value;
    this.action({value: this.value});
}
