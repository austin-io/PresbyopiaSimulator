// DOM Variables
const wheel = document.getElementsByClassName("wheel")[0];

// Global varaibles
let swipeY = null;
var wheelRotation = -67;
let wheelHidden = false;
let timeoutHandler = null;
let smallWheel = false;

//Event Listeners
wheel.addEventListener("touchstart", StartTouch, false, {passive: true});
wheel.addEventListener("touchmove", MoveTouch, false, {passive: true});
wheel.addEventListener("touchend", EndTouch, false, {passive: true});

document.addEventListener("DOMContentLoaded", function() {
    timeoutHandler = setTimeout(HideWheel, 2000);
});

//Things to export as a module
export { wheelRotation }

function HideWheel() {
    clearTimeout(timeoutHandler);
    wheel.classList.add("wheelIn");
    wheel.addEventListener("animationend", WheelAnimationEnd);
}

function StartTouch(e) {
    if(timeoutHandler) {
        clearTimeout(timeoutHandler);
    }
    
    if(wheelHidden) {
        wheel.classList.add("wheelOut");
        wheel.addEventListener("animationend", WheelAnimationEnd);
        return;
    }
    else if(!wheelHidden) {
        swipeY = e.touches[0].clientY;
    }
}

function EndTouch(e) {
    if(timeoutHandler) {
        clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(HideWheel, 3000);
}

function MoveTouch(e) {
    if(swipeY === null || wheel === null) {
        return;
    }
    var currSwipeY = e.touches[0].clientY;
    var diffY = swipeY - currSwipeY;
    var currDegree = wheelRotation;
    //Checking direction of swipe as to not go over
    if(diffY > 0) {
        // Swipping up; increase the amount of degrees
        if(currDegree >= 67 && !smallWheel) {
            wheel.style.setProperty("--wheelRotation", "67deg");
            return;
        } else if (currDegree >= 22 && smallWheel) {
            wheel.style.setProperty("--wheelRotation", "22deg");
            return;
        }
    } else {
        // Swipping down; decrease the amount of degrees
        if(currDegree <= -67 && !smallWheel) {
            wheel.style.setProperty("--wheelRotation", "-67deg");
            return;
        } else if(currDegree <= -22 && smallWheel) {
            wheel.style.setProperty("--wheelRotation", "-22deg");
            return;
        }
    }
    
    var newDegree = currDegree + (diffY * 0.5);
    wheel.style.setProperty("--wheelRotation", String(newDegree) + "deg");
    wheelRotation = newDegree;
    swipeY = e.touches[0].clientY;
    // what can we do to call another a scripts function? maybe have this be its own override or something?
    UpdateFilter();
}



function WheelAnimationEnd() {
    if(wheelHidden) {
        wheelHidden = false;
        wheel.style.right = "calc(100vh / 677 * -315)";
        wheel.classList.remove("wheelOut");
    } else {
        wheelHidden = true;
        wheel.style.right = "calc(100vh / 677 * -360)";
        wheel.classList.remove("wheelIn");
    }
    
    wheel.removeEventListener("animationend", WheelAnimationEnd);
}

export function UsingSmallWheel() {
    smallWheel = true;
    wheelRotation = -22;
}
