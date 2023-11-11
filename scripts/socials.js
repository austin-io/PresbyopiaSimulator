function facebookClick() {
    // gtag('event', 'share_to_facebook', {
    // 'event_callback': function() {
        window.open("https://www.facebook.com/share.php?u=" + getHref() + "&quote=Check+out+this+filter+that+demonstrates+what+a+person+with+" + getDiseaseName(true) + "+sees!", "_blank");
    // }
    // });
}
function twitterClick() {

    window.open("https://twitter.com/intent/tweet?url=" + getHref() + "&text=Check+out+this+filter+that+demonstrates+what+a+person+with+" + getDiseaseName(true) + "+sees!&hashtags=Alcon," + getDiseaseName(false) + ",VisionSim", "_blank");
}
function linkedinClick() {

    window.location = "https://www.linkedin.com/shareArticle/?mini=true&url=" + getHref();
}
function copyClick() {
    let copyText = window.location.href;
    navigator.clipboard.writeText(copyText);
    alert("Copied: " + copyText.toString());
}

function getDiseaseName(spaces) {
    let href = getHref();
    let diseaseName = href.split("/").pop().split(".")[0];
    if(diseaseName.includes('diabetic')) {
        diseaseName += spaces ? " Retinopathy" : "Retinopathy";
    } else if(diseaseName.includes('retinal')) {
        diseaseName += spaces ? " Detachment" : "Detachment";
    } else if(diseaseName.includes('amd')) {
        diseaseName = diseaseName.substring(0,3).toUpperCase() + ": " + diseaseName[3].toUpperCase() + diseaseName.substring(4);
    } else if(diseaseName.includes('dry')) {
        diseaseName = spaces ? "Dry Eye" : "dryeye";
    }
    
    diseaseName = spaces ? diseaseName[0].toUpperCase() + diseaseName.substring(1) : diseaseName.toLowerCase();
    return diseaseName;
}

function getHref() {
    return window.location.href;
}