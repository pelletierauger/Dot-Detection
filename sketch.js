var img;
var s;
var looping = true;
var sum = 0;
var arr = [];
var credits = [];
var title01, title02, title03, title04, title05;

function preload() {
    img = loadImage("titre05.png");
    // for (var i = 1; i <= 5; i++) {
    //     // var url = "/credits/title0" + i + ".json";
    //     // var title = loadJSON(url);
    //     // credits.push(title);
    //     // loadJSON("/credits/title0" + i + ".json", gotTitle);
    //     loadJSON("/credits/title0" + i + ".json", gotTitle);
    // }
    loadJSON("/credits/title01.json", function(t) {
        title01 = t;
    });
    loadJSON("/credits/title02.json", function(t) {
        title02 = t;
    });
    loadJSON("/credits/title03.json", function(t) {
        title03 = t;
    });
    loadJSON("/credits/title04.json", function(t) {
        title04 = t;
    });
    loadJSON("/credits/title05.json", function(t) {
        title05 = t;
    });
}

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowWidth * 9 / 16);
    background(0);
    image(img, 0, 0, width, height);
    loadPixels();
    background(0);
    noStroke();
    s = 8;
}

function gotTitle(titleJSON) {
    var title = titleJSON;
    credits.push(title);
}

function draw() {
    background(0);
    // dotDetection();
    runXSheet(xSheet);
    // displayArray(arr);
}

function dotDetection() {
    if (sum < 4000) {
        for (var i = 0; i < 2500; i++) {
            var x = Math.floor(random(0, width));
            var y = Math.floor(random(0, height));
            if (pixels[(x + y * width) * 4] >= 200 && sum < 4000) {
                sum++;
                arr.push({ x: x, y: y });
            }
        }
    }
}

function displayLerpedArrays(arr1, arr2, l) {
    l = constrain(l, 0, 1);
    //l = 0 : display all of arr1, none of arr1
    //l = 0.5 : display half of arr1, half of arr2
    //l = 1 : display all of arr2, none of arr1
    if (arr1 !== null) {
        var mapArr1 = map(l, 1, 0, arr1.length, 0);
        displayArray(arr1, mapArr1);
    }
    if (arr2 !== null) {
        var mapArr2 = map(l, 1, 0, 0, arr2.length);
        displayArray(arr2, mapArr2);
    }
}

function displayArray(arr, count) {
    if (count == null) {
        count = arr.length;
    }
    for (var j = 0; j < count; j++) {
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
