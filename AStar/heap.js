 function BinaryHeap(){
    this.heap = [];
}

BinaryHeap.prototype.push = function(node){
    this.heap.push(node);
    var index = this.heap.length - 1;
    var done = false;
    while ( index != 0 && (!done)) {
        var parent = int(index / 2);
        if ( this.heap[parent].f > this.heap[index].f ){
            var tmp = this.heap[parent];
            this.heap[parent] = this.heap[index];
            this.heap[index] = tmp;
            index = parent
        } else {
            done = true;
        }

    }
}

BinaryHeap.prototype.draw = function(){
    fill(231, 76, 60);
    for ( var i = 0; i < this.heap.length ; i ++){
        rect((tileSize+tileSpace) * this.heap[i].x ,(tileSize+tileSpace) * this.heap[i].y, tileSize, tileSize )
    }
}

BinaryHeap.prototype.isEmpty = function(){
    return this.heap.length == 0;
}

BinaryHeap.prototype.pop = function(){
    if ( !this.isEmpty() ){
        var returnNode = this.heap[0];
        this.heap[0] = this.heap[this.heap.length-1];
        this.heap.splice(this.heap.length-1, 1);
        if ( !this.isEmpty() ){
            var index = 0;
            var done = false;
            while ( index*2+1 < this.heap.length && (!done)) {
                var min = 0;
                var iMin = 0;
                if ( index*2+2 == this.heap.length){
                    min = this.heap[index*2+1].f;
                    iMin = index*2+1;
                } else {
                    if ( this.heap[index*2+1].f < this.heap[index*2+2].f){
                        min = this.heap[index*2+1].f;
                        iMin = index*2+1;
                    } else {
                        min = this.heap[index*2+2].f;
                        iMin = index*2+2;
                    }
                }
                if ( min < this.heap[index].f ){
                    var tmp = this.heap[iMin];
                    this.heap[iMin] = this.heap[index];
                    this.heap[index] = tmp;
                    index = iMin;
                } else {
                    done = true;
                }
            }
        }
        return returnNode;
    }
    return null;

}


function max(a,b){
    if ( a < b){
        return b;
    } else {
        return a;
    }

}
