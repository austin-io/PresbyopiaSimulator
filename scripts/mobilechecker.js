let details = navigator.userAgent;
let regexp = /android|iphone|kindle|ipad/i;
let isMobileDevice = regexp.test(details);

if(!isMobileDevice) {
    // window.location = "[BASE_URL]/pages/QRCode.html";
}