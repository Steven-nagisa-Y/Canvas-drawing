let inputContext;
let drawContext
let circleContext;
let lineContext;

let circleNumber = 30;
let deltat = 0.001;
let points = [];
var cn = [];
var xobj;

let startTime;
let period = 10;

let startedDrawing = false;
let continueDrawing = false;

window.onload = () => {
    console.log("Window onload.");
    inputContext = inputCanvas.getContext("2d");
    drawContext = drawCanvas.getContext("2d");
    circleContext = circleCanvas.getContext("2d");
    lineContext = lineCanvas.getContext("2d");

    inputContext.strokeStyle = "gray";
    circleContext.strokeStyle = "blue";
    lineContext.strokeStyle = "black";
    drawContext.strokeStyle = "red";
    drawContext.lineWidth = 2;


}

function drawButton() {
    console.log("Button onClick");
    xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "Cn.json", true);
    xobj.send(null);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4) {
            if (xobj.status == 200) {
                cn = JSON.parse(xobj.responseText);
                circleNumber = (cn.length - 1) / 2;
                console.log("Circle Number: " + circleNumber);
                console.log("Read Cn.json");
                lineContext.closePath();
                lineContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
                circleContext.closePath();
                circleContext.clearRect(0, 0, circleCanvas.width, circleCanvas.height);
                drawContext.closePath();
                drawContext.clearRect(0, 0, drawCanvas.width, drawCanvas.height);

                startTime = Date.now();
                startedDrawing = false;
                continueDrawing = true;
                requestAnimationFrame(updateCircles);
            } else {
                console.error("Load file error");
            }
        }
    }
}


let updateCircles = () => {
    lineContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
    circleContext.clearRect(0, 0, circleCanvas.width, circleCanvas.height);

    lineContext.beginPath();

    let t = (Date.now() - startTime) / 1000 / period;
    let p = cn[0];
    lineContext.moveTo(p.x, p.y);
    let nn = 1;
    for (let n = 1; n <= circleNumber; n++) {
        console.log("Now n = " + n);
        let v = cmult(cn[nn], cis(2 * n * t * Math.PI));
        circleContext.beginPath();
        circleContext.arc(p.x, p.y, abs(v), 0, 2 * Math.PI);
        circleContext.stroke();
        circleContext.closePath();

        p = cadd(p, v);
        lineContext.lineTo(p.x, p.y);

        v = cmult(cn[nn + 1], cis(-2 * n * t * Math.PI));
        circleContext.beginPath();
        circleContext.arc(p.x, p.y, abs(v), 0, 2 * Math.PI);
        circleContext.stroke();
        circleContext.closePath();

        p = cadd(p, v);
        lineContext.lineTo(p.x, p.y);

        nn += 2;
    }
    lineContext.stroke();
    lineContext.closePath();

    if (!startedDrawing) {
        drawContext.beginPath();
        drawContext.moveTo(p.x, p.y);
        startedDrawing = true;
    } else {
        drawContext.lineTo(p.x, p.y);
        drawContext.stroke();
        drawContext.moveTo(p.x, p.y);
    }

    if (continueDrawing)
        requestAnimationFrame(updateCircles);
    else {
        lineContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
        circleContext.clearRect(0, 0, circleCanvas.width, circleCanvas.height);
        drawContext.closePath();
        drawContext.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    }
}

let cis = (a) => {
    let res = { x: Math.cos(a), y: Math.sin(a) };
    // console.log("cis: " + JSON.stringify(res));
    return res;
}

let cmult = (a, b) => {
    let res = { x: a.x * b.x - a.y * b.y, y: a.x * b.y + a.y * b.x };
    // console.log("cmult: " + JSON.stringify(res));
    return res;
}

let crmult = (a, b) => {
    let res = { x: a.x * b, y: a.y * b };
    // console.log("crmult: " + JSON.stringify(res));
    return res;
}

let cadd = (a, b) => {
    let res = { x: a.x + b.x, y: a.y + b.y };
    // console.log("cadd: " + JSON.stringify(res));
    return res;
}

let abs = (a) => {
    let res = Math.sqrt((a.x * a.x) + (a.y * a.y));
    // console.log("abs: " + res);
    return res;
}

// let getPoint = (a) => {
//     let a1 = (points.length - 1) * a;
//     let amin = Math.floor(a1);
//     let amax = Math.ceil(a1);

//     if (amin == amax)
//         return points[amin];
//     return cadd(crmult(points[amin], (amax - a1)), crmult(points[amax], (a1 - amin)));
// }