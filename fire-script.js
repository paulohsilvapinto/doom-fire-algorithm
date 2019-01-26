var fireArray;
var fireWidth = 100
var fireHeight = 60

const fireWidthDebugging = 10;
const fireHeightDebugging = 10;

const fireWidthNotDebugging = 100;
const fireHeightNotDebugging = 60;

var numberOfPixels;
var debug = false;
const fireColorPalette = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]
var windDirection = 1;
var fireStrength = 3;
const windDirections = ["Left Wind", "No Wind", "Right Wind"]


function start() {
    fireArray = [];
    numberOfPixels = fireWidth * fireHeight;
    createFireStructure();
    createFireSource();
    setInterval(updateFirePropagation, 50);
}

function stop(){
    clearInterval();
    createFireStructure();
    renderFire();
}


function createFireStructure() {
    for (let i = 0; i < (numberOfPixels); i++) {
        fireArray[i] = 0;
    }

}


function createFireSource() {

    for (let col = 0; col < fireWidth; col++) {
        let lastRowIndexes = numberOfPixels - fireWidth + col;
        fireArray[lastRowIndexes] = 36;
    }

}


function increaseFireStrengthness(){
    fireStrength <= 2 ? null: fireStrength--;
}

function decreaseFireStrengthness(){
    fireStrength >= 20 ? null: fireStrength++;
}

function changeDebugMode(){
    let button = document.querySelector(".change_debug");

    if(debug) {
        debug = false;
        button.textContent =  "Enable Debug Mode"
        fireWidth = fireWidthNotDebugging;
        fireHeight = fireHeightNotDebugging
        
    } else {
        debug =  true;
        button.textContent = "Disable Debug Mode" 
        fireWidth = fireWidthDebugging;
        fireHeight = fireHeightDebugging
    }

    start();
    
}


function changeWindDirection(){
    let button = document.querySelector(".change_wind")
        if(button.textContent == "Left Wind"){
            windDirection = 1;
            button.textContent = windDirections[1];
        } else if (button.textContent == "No Wind") {
            windDirection = 2;
            button.textContent = windDirections[2];
        }else if (button.textContent == "Right Wind"){
            windDirection = 0;
            button.textContent = windDirections[0];
        }

}

//For each pixel, subtracts 0-3 from below fire intensity pixel
function updateFirePropagation() {

    for (let row = 0; row < fireHeight; row++) {
        for (let col = 0; col < fireWidth; col++) {
            let currentIndex = col + fireWidth * row;
            let belowIndex = currentIndex + fireWidth;
            let decay = Math.floor(Math.random() * fireStrength);

            if (belowIndex < numberOfPixels) {
                switch (windDirection) {
                    case 0: fireArray[currentIndex - decay] = fireArray[belowIndex] - decay <= 0 ? 0 : fireArray[belowIndex] - decay;break;
                    case 1: fireArray[currentIndex] = fireArray[belowIndex] - decay <= 0 ? 0 : fireArray[belowIndex] - decay;break;
                    case 2: if(currentIndex + decay < numberOfPixels - fireWidth){ fireArray[currentIndex + decay] = fireArray[belowIndex] - decay <= 0 ? 0 : fireArray[belowIndex] - decay};break;
                }

            }
        }
    }

    renderFire();

}


//update html to exhibit either fire intensity or fire color
function renderFire() {
    let html = '<table>';
    for (let row = 0; row < fireHeight; row++) {
        html += '<tr>';

        for (let col = 0; col < fireWidth; col++) {
            const pixelIndex = col + fireWidth * row;
            const fireIntensity = fireArray[pixelIndex];
            const fireColors = fireColorPalette[fireIntensity];

            const colorString = fireColors.r + ',' + fireColors.g + ',' + fireColors.b;

            if (debug) {
                html += '<td>';
                html += fireArray[pixelIndex];
                html += '</td>';
            } else {
                html += '<td style="background-color: rgb(' + colorString + ')"></td>';
            }

        }
        html += '</tr>';

    }

    html += '</table>';

    document.querySelector(".fire_table").innerHTML = html;
}

start();