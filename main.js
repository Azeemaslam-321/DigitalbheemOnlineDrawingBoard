function $(id) {
    return document.getElementById(id);
}

var Saveimg = $("saveimg");
var Clearimg = $("clearimg");

var canvas = $("canvas");
var cxt = canvas.getContext("2d");

var Brush = $("means_brush");
var Eraser = $("means_eraser");
var Paint = $("means_paint");
var Straw = $("means_straw");
var Texter = $("means_text");
var Magnifier = $("means_magnifier");

var Line = $("means_line");
var Arc = $("means_arc");
var Rect = $("means_rect");
var Poly = $("means_poly");
var Arcfill = $("means_arcfill");
var Reactfill = $("means_reactfill");

var line_1 = $("width_1");
var line_3 = $("width_3");
var line_5 = $("width_5");
var line_8 = $("width_8");

var ColorRed = $("red");
var ColorGreen = $("green");
var ColorBlue = $("blue");
var ColorYellow = $("yellow");
var ColorWhite = $("white");
var ColorBlack = $("black");
var ColorPink = $("pink");
var ColorPurple = $("purple");
var ColorCyan = $("cyan");
var ColorOrange = $("orange");

var actions = [Brush, Eraser, Paint, Straw, Texter, Magnifier, Line, Arc, Rect, Poly, Arcfill, Reactfill];
var width = [line_1, line_3, line_5, line_8];
var colors = [ColorRed, ColorGreen, ColorBlue, ColorYellow, ColorWhite, ColorBlack, ColorPink, ColorPurple, ColorCyan, ColorOrange]

drawBrush(0);
setLineWith(0);
setColor(ColorRed, 0);

function setStatus(Arr, num, type) {
    for (var i = 0; i < Arr.length; i++) {
        if (i == num) {
            if (type == 1) {
                Arr[i].style.background = "yellow";
            } else {
                Arr[i].style.border = "1px solid #fff";
            }
        } else {
            if (type == 1) {
                Arr[i].style.background = "#ccc";
            } else {
                Arr[i].style.border = "1px solid #000";
            }
        }
    }
}

function drawBrush(num) {
    setStatus(actions, num, 1);
    var flag = 0;
    canvas.onmousedown = function (e) {
        e = window.e || e;
        var startX = e.pageX - this.offsetLeft;
        var startY = e.pageY - this.offsetTop;
        cxt.beginPath();
        cxt.moveTo(startX, startY);
        flag = 1;
    }

    canvas.onmousemove = function (e) {
        e = window.e || e;
        var endX = e.pageX - this.offsetLeft;
        var endY = e.pageY - this.offsetTop;
        if (flag) {
            cxt.lineTo(endX, endY);
            cxt.stroke();
        }
    }

    canvas.onmouseup = function () {
        flag = 0;
        storeAction();
    }

    canvas.onmouseout = function () {
        flag = 0;
        storeAction();
    }
}

function drawEraser(num) {
    var flag = 0;
    var eraserSize = 10; // Initial eraser size
    setStatus(actions, num, 1);

    canvas.onmousedown = function (e) {
        e = window.e || e;
        var eraserX = e.pageX - this.offsetLeft;
        var eraserY = e.pageY - this.offsetTop;
        erase(eraserX, eraserY);
        flag = 1;
    }

    canvas.onmousemove = function (e) {
        e = window.e || e;
        var eraserX = e.pageX - this.offsetLeft;
        var eraserY = e.pageY - this.offsetTop;
        if (flag) {
            erase(eraserX, eraserY);
        }
    }

    canvas.onmouseup = function () {
        flag = 0;
        storeAction();
    }

    canvas.onmouseout = function () {
        flag = 0;
        storeAction();
    }

    
    document.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.key === "+") {
            eraserSize += 5; // Increase eraser size by 5
        }
    });

    function erase(x, y) {
        cxt.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
    }
}


function drawPaint(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function () {
        cxt.fillRect(0, 0, 880, 400);
        storeAction();
    }
    canvas.onmouseup = null;
    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

function drawStrw(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function (e) {
        e = window.e || e;
        var strawX = e.pageX - this.offsetLeft;
        var strawY = e.pageY - this.offsetTop;

        cxt.getImageData(strawX, strawY, 1, 1);
        var obj = cxt.getImageData(strawX, strawY, 1, 1);
        cxt.strokeStyle = "rgb(" + obj.data[0] + "," + obj.data[1] + "," + obj.data[2] + ")";
        cxt.fillStyle = "rgb(" + obj.data[0] + "," + obj.data[1] + "," + obj.data[2] + ")";
        alert("Color found");

        drawBrush(0);

        
        storeAction();
    }
    canvas.onmouseup = null;
    canvas.onmousemove = null;
}

function drawMagnigier(num) {
    setStatus(actions, num, 1);
    var scale = window.prompt("Enter the scale percentage:");
    if (scale) {
        var scaleX = 880 * scale / 100;
        var scaleY = 400 * scale / 100;
        canvas.style.width = scaleX + "px";
        canvas.style.height = scaleY + "px";
        storeAction();
    }

    canvas.onmousedown = null;
    canvas.onmouseup = null;
    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

function drawLine(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function (e) {
        e = window.e || e;
        var startX = e.pageX - this.offsetLeft;
        var startY = e.pageY - this.offsetTop;
        cxt.beginPath();
        cxt.moveTo(startX, startY);
    }

    canvas.onmousemove = null;
    canvas.onmouseout = null;
    canvas.onmouseup = function (e) {
        e = window.e || e;
        var endX = e.pageX - this.offsetLeft;
        var endY = e.pageY - this.offsetTop;
        cxt.lineTo(endX, endY);
        cxt.closePath();
        cxt.stroke();
        storeAction();
    }
}

function drawArc(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function (e) {
        e = window.e || e;
        arcX = e.pageX - this.offsetLeft;
        arcY = e.pageY - this.offsetTop;
    }
    canvas.onmouseup = function (e) {
        e = window.e || e;
        var endX = e.pageX - this.offsetLeft;
        var endY = e.pageY - this.offsetTop;
        let c = Math.sqrt((endX - arcX) * (endX - arcX) + (endY - arcY) * (endY - arcY)) / 2;
        cxt.beginPath();
        cxt.arc((arcX + (endX - arcX) / 2), (arcY + (endY - arcY) / 2), c, 0, 2 * Math.PI, false);
        cxt.closePath();
        cxt.stroke();
        storeAction();
    }

    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

function drawRect(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function (e) {
        e = window.e || e;
        rectX = e.pageX - this.offsetLeft;
        rectY = e.pageY - this.offsetTop;
    }
    canvas.onmouseup = function (e) {
        e = window.e || e;
        var endX = e.pageX - this.offsetLeft;
        var endY = e.pageY - this.offsetTop;

        let a = endX - rectX;
        let b = endY - rectY;
        cxt.beginPath();
        cxt.rect(rectX, rectY, a, b);
        cxt.closePath();
        cxt.stroke();
        storeAction();
    }
    cxt.onmouseout = null;
    cxt.onmousemove = null;
}

function drawPoly(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function (e) {
        e = window.e || e;
        polyX = e.pageX - this.offsetLeft;
        polyY = e.pageY - this.offsetTop;
    }
    canvas.onmouseup = function (e) {
        e = window.e || e;
        var endX = e.pageX - this.offsetLeft;
        var endY = e.pageY - this.offsetTop;
        cxt.beginPath();
        cxt.moveTo(polyX, endY);
        cxt.lineTo(endX, endY);
        cxt.lineTo(polyX + ((endX - polyX) / 2), polyY);
        cxt.lineTo(polyX, endY);
        cxt.closePath();
        cxt.stroke();
    }
    canvas.onmouseout = null;
    canvas.onmousemove = null;
}

function drawArcfill(num) {
    setStatus(actions, num, 1);
    canvas.onmousedown = function (e) {
        e = window.e || e;
        arcX = e.pageX - this.offsetLeft;
        arcY = e.pageY - this.offsetTop;
    }
    canvas.onmouseup = function (e) {
        e = window.e || e;
        var endX = e.pageX - this.offsetLeft;
        var endY = e.pageY - this.offsetTop;
        let c = Math.sqrt((endX - arcX) * (endX - arcX) + (endY - arcY) * (endY - arcY)) / 2;
        cxt.beginPath();
        cxt.arc((arcX + (endX - arcX) / 2), (arcY + (endY - arcY) / 2), c, 0, 2 * Math.PI, false);
        cxt.closePath();
        cxt.fill();
    }

    canvas.onmousemove = null;
    canvas.onmouseout = null;
}

function drawReactfill(num) {
    setStatus(actions, num, 1);
    setStatus(actions, num, 1);
    canvas.onmousedown = function (e) {
        e = window.e || e;
        rectX = e.pageX - this.offsetLeft;
        rectY = e.pageY - this.offsetTop;
    }
    canvas.onmouseup = function (e) {
        e = window.e || e;
        var endX = e.pageX - this.offsetLeft;
        var endY = e.pageY - this.offsetTop;
        let a = endX - rectX;
        let b = endY - rectY;
        cxt.beginPath();
        cxt.rect(rectX, rectY, a, b, endX, endY);
        cxt.closePath();
        cxt.fill();
    }
    cxt.onmouseout = null;
    cxt.onmousemove = null;
}

function setLineWith(num) {
    setStatus(width, num, 1);
    switch (num) {
        case 0:
            cxt.lineWidth = 1;
            break
        case 1:
            cxt.lineWidth = 3;
            break;
        case 2:
            cxt.lineWidth = 5;
            break;
        case 3:
            cxt.lineWidth = 8;
            break;
        default:
            cxt.lineWidth = 1;
    }
}

function setColor(obj, num) {
    
    setStatus(colors, num, 0);
    cxt.strokeStyle = obj.id;
    cxt.fillStyle = obj.id;
};

Clearimg.addEventListener("click", function () {
    cxt.clearRect(0, 0, 880, 400)
}, false)
Saveimg.addEventListener("click", function () {
    var url = canvas.toDataURL();
    console.log(url);
    var a = document.createElement("a");
    var event = new MouseEvent("click");
    a.download = name || "HTML"
    a.href = url;
    a.dispatchEvent(event);
}, false)


// ... existing code ...

var socket = io();

// ... existing code ...

canvas.onmousemove = function (e) {
  e = window.e || e;
  var endX = e.pageX - this.offsetLeft;
  var endY = e.pageY - this.offsetTop;
  if (flag) {
    cxt.lineTo(endX, endY);
    cxt.stroke();

    // Emit drawing data to the server
    socket.emit('draw', { startX, startY, endX, endY });
  }
};

// ... existing code ...

// Listen for drawing events from the server
socket.on('draw', (data) => {
  cxt.beginPath();
  cxt.moveTo(data.startX, data.startY);
  cxt.lineTo(data.endX, data.endY);
  cxt.stroke();
  cxt.closePath();
});

// ... existing code ...
