// coding train

outlets = 2;

var r1 = 125;
var r2 = 125;
var m1 = 10;
var m2 = 10;
var a1 = Math.PI/2;
var a2 = Math.PI/2;
var a1_v = 0;
var a2_v = 0;
var g = 1;
var d = 0.999;



function reset() {
    a1 = Math.PI/2;
    a2 = Math.PI/2;
}

function clamp( val, min, max ) {
    return Math.min( Math.max( val, min ), max )
   }

function scale(x, inLow, inHigh, outLow, outHigh) {

    return (x - inLow) * (outHigh - outLow) / 
        (inHigh - inLow) + outLow;
}

function easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
}

function getDamp(_d) {
    d = clamp(_d,0.975,0.9999);
}

function getG(_g) {
    g = clamp(_g,0,1);
}

function getR1(_r1) {
    r1 = _r1;
}
function getR2(_r2) {
    r2 = _r2;
}
function getM1(_m1) {
    m1 = _m1;
}
function getM2(_m2) {
    m2 = _m2;
}

function bang() {

    var px2 = -1;
    var py2 = -1;

    var num1 = -g * (2 * m1 + m2) * Math.sin(a1);
    var num2 = -m2 * g * Math.sin(a1 - 2 * a2);
    var num3 = -2 * Math.sin(a1 - a2) * m2;
    var num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2);
    var den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
    var a1_a = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * Math.sin(a1 - a2);
    num2 = (a1_v * a1_v * r1 * (m1 + m2));
    num3 = g * (m1 + m2) * Math.cos(a1);
    num4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2);
    den = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
    var a2_a = (num1 * (num2 + num3 + num4)) / den;

    var x1 = r1 * Math.sin(a1);
    var y1 = r1 * Math.cos(a1);
    var x2 = x1 + r2 * Math.sin(a2);
    var y2 = y1 + r2 * Math.cos(a2);

    a1_v += a1_a;
    a2_v += a2_a;
    a1 += a1_v;
    a2 += a2_v;

    a1_v *= d;
    a2_v *= d;

    px2 = x2;
    py2 = y2;

    outlet(0,scale(x1,-r1,r1,0,1));
    outlet(1,scale(x2,-r1-r2,r1+r2,0,1));
}