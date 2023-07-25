let details = navigator.userAgent;
let regexp = /android|iphone|kindle|ipad/i;
let isMobileDevice = regexp.test(details);

if(!isMobileDevice) {
    // window.location = "https://esproduction.github.io/VisionSim/pages/QRCode.html";
}