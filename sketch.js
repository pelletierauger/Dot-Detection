var img;
var s;
var looping = true;
var sum = 0;
var arr = [];

function preload() {
    img = loadImage("titre05.png");
}

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowWidth * 9 / 16);
    background(0);
    image(img, 0, 0, width, height);
    loadPixels();
    background(0);
    // console.log(pixels);
    // console.log(pixels[1 + 2 * width]);
    noStroke();
    s = 8;
}

function draw() {
    background(0);
    if (sum < 4000) {
        for (var i = 0; i < 2500; i++) {
            var x = Math.floor(random(0, width));
            var y = Math.floor(random(0, height));
            // console.log(pixels[x + y * width]);
            if (pixels[(x + y * width) * 4] >= 200 && sum < 4000) {
                // fill(255, 150);
                // console.log("Found a pixel : " + pixels[x + y * width]);
                sum++;
                // console.log(sum);
                arr.push({ x: x, y: y });
            } else {
                // fill(255, 10);
            }
            // ellipse(x, y, s);
        }
    }
    for (var j = 0; j < arr.length; j++) {
        var blue = noise(frameCount / 10 + j) * 5;
        var mapsBlue = map(blue, 0, 5, 230, 255);
        var red = noise(frameCount / 20 + j) * 5;
        var mapsRed = map(red, 0, 5, 150, 15);
        var green = noise(frameCount / 40 + j) * 5;
        var mapsGreen = map(green, 0, 5, 150, 70);
        fill(mapsRed, mapsGreen, mapsBlue);
        var xx = noise(frameCount / 10 + j) * 5;
        var yy = noise(100 + frameCount / 10 + j) * 5;
        if (arr[j]) {
            ellipse(arr[j].x + xx, arr[j].y + yy, random(s / 2, s));
        }
    }
    // var total = 150;
    // var increment = TWO_PI / total;
    // for (var k = 0; k < TWO_PI; k += increment) {
    //     var X = cos(k + frameCount / 10) * 135 * k / 10;
    //     var Y = sin(k + frameCount / 10) * sin(k + frameCount / 20) * 135 * k / 10;
    //     ellipse(X + width / 2, Y + height / 2, random(s / 2, s));
    // }
}


function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    }
}

/*

Les joies confuses
Joy and Confusion

Animation
Guillaume Pelletier-Auger

Musique Music
Dan Deacon

Merci  Thanks
Vincent, Mathilde, Liane,
Jean-Raymond, Francis, Dan

Montréal
2017

*/
