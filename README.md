# p5js-project-manager

A very basic php web app to manage and use my own [p5.js](https://p5js.org/) projects.

You can have a preview of the project on [my website](http://benjaminloriot.com/home/P5/).

## Libraries

There is a possibility to include libraries.

Yet I have only created a *simple gui library*.

## Project

The project must inlclude a **app.json** file and a **sketch.js** file containing the root of the app.

The json file must be formated as following.
``` JSON
{
  "name": "Name of the app",
  "version": "0.1.0",
  "author": "Benjamin <bloriot97@gmail.com>",
  "libraries": ["gui.js"],
  "jsfiles": ["map.js", "heap.js" ],
  "thumbnail": "thumbnail.png",
  "description": ""
}
```