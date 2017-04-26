var drawCount = 0;

var xSheet = {
    joyAndConfusion: {
        d: 80,
        f: function() {
            // var rN = getSum(xSheet, xSheet.grotte);
            // firstSpiral.run();
            // console.log(credits[0].length);
            var coFade = cosineFade(0, 20);
            displayLerpedArrays(null, title01, coFade);
            // displayArray(title01);
        }
    },
    animation: {
        d: 80,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            // var rN = getSum(xSheet, xSheet.introTransition);
            var coFade = cosineFade(sum, 20);
            displayLerpedArrays(title01, title02, coFade);
        }
    },
    music: {
        d: 80,
        f: function(sum) {
            var coFade = cosineFade(sum, 20);
            displayLerpedArrays(title02, title03, coFade);
        }
    },
    thanks: {
        d: 100,
        f: function(sum) {
            var coFade = cosineFade(sum, 20);
            displayLerpedArrays(title03, title04, coFade);
        }
    },
    montreal: {
        d: 20,
        f: function(sum) {
            var coFade = cosineFade(sum, 20);
            displayLerpedArrays(title04, title05, coFade);
        }
    },
    montreaFadeOut: {
        d: 200,
        f: function(sum) {
            var coFade = cosineFade(sum, 180);
            // var rN = getSum(xSheet, xSheet.introTransition);
            if (drawCount > sum + 30) {
                var mapS = map(drawCount, sum, sum + 320, 0, 1);
                var s = mapS;
                for (var i = 0; i < title05.length; i++) {
                    title05[i].x += (noise(i) - 0.5) * s;
                    title05[i].y += (noise(100 + i) - 0.5) * s;
                }
            }
            displayLerpedArrays(title05, null, coFade);
        }
    },
    key: function(n) {
        return this[Object.keys(this)[n]];
    }
};

Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function cosineFade(sum, dur) {
    var fade = map(drawCount, sum, sum + dur, 1, 0);
    var fadeCons = constrain(fade, 0, 1);
    var fadeSmooth = fadeCons * PI;
    var coFade = map(cos(fadeSmooth), 1, -1, 0, 1);
    return coFade;
}

function cosineFadeSynchronous(t, sum, dur) {
    var fade = map(t, sum, sum + dur, 1, 0);
    var fadeCons = constrain(fade, 0, 1);
    var fadeSmooth = fadeCons * PI;
    var coFade = map(cos(fadeSmooth), 1, -1, 0, 1);
    return coFade;
}

function cosineFade2(t, dur) {
    var fade = map(t, sum, sum + dur, 1, 0);
    var fadeCons = constrain(fade, 0, 1);
    var fadeSmooth = fadeCons * PI;
    var coFade = map(cos(fadeSmooth), 1, -1, 0, 1);
    return coFade;
}

function runXSheet(sheet) {
    var tL = Object.size(sheet);

    //If the drawCount is lower than the duration of the first scene within the x-sheet, run that scene.
    if (drawCount < sheet.key(0).d) {
        sheet.key(0).f();

        //Else...for each scene of the sheet...calculate the total keyframes in the PREVIOUS scenes...
        //This is the sum. The number of frames preceding a scene.
        //Now... if the drawCount is higher or equal to that sum, and if it is lower than
        //the sum + the current scene's duration.. it means we are within the right scene. So run it.
        //Now, why do I pass this sum to the function inside the sheet ?
        //I do it because, this way, every single scene within the x-sheet can be launched as if it
        //was launched on drawCount 0. I just need to the pass the sum property to the run function.
        //This way, run()  gets "the current DrawCount minus all the previous scenes in the sheet".
    } else {
        for (var i = 1; i < tL; i++) {
            var sum = 0;
            for (var ii = 0; ii < i; ii++) {
                sum += sheet.key(ii).d;
            }

            if (drawCount >= sum && drawCount < sum + sheet.key(i).d) {
                sheet.key(i).f(sum);
            }
        }
    }
    drawCount++;
}

function getSum(sheet, prop) {
    var tL = Object.size(sheet);
    var propLocation = 0;
    var sum = 0;
    for (var i = 0; i <  tL; i++) {
        if (sheet.key(i) === prop) {
            propLocation = i;
        }
    }
    for (var ii = 0; ii < propLocation; ii++) {
        sum += sheet.key(ii).d;
    }
    return sum;
}

function queryXSheet(sheet) {
    var tL = Object.size(sheet);

    for (var i = 0; i < tL; i++) {
        var sum = 0;
        for (var ii = 0; ii < i; ii++) {
            sum += sheet.key(ii).d;
        }
        if (drawCount >= sum && drawCount < sum + sheet.key(i).d) {
            var name = Object.getOwnPropertyNames(sheet);
            return ("Scene #" + i + ", " + name[i]);
        }
    }
}

function sumXSheet(sheet) {
    var tL = Object.size(sheet);
    var sum = 0;
    for (var i = 0; i < tL - 1; i++) {
        sum += sheet.key(i).d;
    }
    return sum;
}
