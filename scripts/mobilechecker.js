let details = navigator.userAgent;
let regexp = /android|iphone|kindle|ipad/i;
let isMobileDevice = regexp.test(details);

if(!isMobileDevice) {
    // window.location = "https://esproduction.github.io/elara-site-test.s3-website-us-east-1.amazonaws.com/pages/QRCode.html";
}