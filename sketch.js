var drawing = [];
var database, canvas;

function setup(){
    database = firebase.database();
    canvas = createCanvas(400,400);
    canvas.parent('canvascontainer');
    background(240);

    var clearButton = select('#clearbutton');
    clearButton.mousePressed(clearDrawing);
}

var db_drawing = [];

function draw(){
    
    background(240);
    readData();
    beginShape();
    stroke("black");
    strokeWeight(4);
    noFill();

    for(var i=0; i < db_drawing.length; i++){
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
    }
}

function mouseDragged(){
    var point = {
        x: mouseX,
        y: mouseY
    }

    drawing.push(point);
    var drawingRef = database.ref('drawing');
    drawingRef.set({
        "d": drawing
    });
}

function readData(){
    database.ref('drawing/').on("value", (data) => {
        db_drawing = data.val().d;
    } );
}

function clearDrawing(){  
    var clearRef = database.ref('drawing/');
   clearRef.remove();    
    db_drawing = [];
}