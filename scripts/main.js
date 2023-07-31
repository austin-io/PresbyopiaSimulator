//Document elements / variables
const logo = document.getElementById("logo");
const root = document.querySelector(":root");
const termsModal = document.querySelector("#termsModal");
const closeModalButton = document.querySelector("#termsModal > button");

closeModalButton.addEventListener("click", (e) => {
    e.preventDefault();

    termsModal.close();
})

//Global variables
let splashScreenFinished = false;
const backgroundImages = ["Background1.jpg", "Background2.jpg", "Background3.jpg"];
const lensImages = ["Background1-Lens.png", "Background2-Lens.png", "Background3-Lens.png"];
const refracImages = ["Background1-Refrac.png", "Background2-Refrac.png", "Background3-Refrac.png"];
const retImages = ["Background1-Ret.png", "Background2-Ret.png", "Background3-Ret.png"];
const musImages = ["Background1-mus.png", "Background2-mus.png", "Background3-mus.png"];
const ocularImages = ["Background1-OcularSurface.png", "Background2-OcularSurface.png", "Background3-OcularSurface.png"];
const index = Math.floor(Math.random() * 3);

//Function that starts the animation sequence for the splash screen
function SplashScreenLogo() {

    //Setting the three eye images based on index
    var refracElement = document.getElementById("refractive");
    refracElement.style.setProperty("--eyeImage", "url(" + '/elara-site-test.s3-website-us-east-1.amazonaws.com/images/' + refracImages[index] + ")");
    
    var retElement = document.getElementById("retinal");
    retElement.style.setProperty("--eyeImage", "url(" + '/elara-site-test.s3-website-us-east-1.amazonaws.com/images/' + retImages[index] + ")");
    
    var lensElement = document.getElementById("lens");
    lensElement.style.setProperty("--eyeImage", "url(" + '/elara-site-test.s3-website-us-east-1.amazonaws.com/images/' + lensImages[index] + ")");
    
    var musElement = document.getElementById("muscle");
    musElement.style.setProperty("--eyeImage", "url(" + '/elara-site-test.s3-website-us-east-1.amazonaws.com/images/' + musImages[index] + ")");
    
    var ocularElement = document.getElementById("ocular");
    ocularElement.style.setProperty("--eyeImage", "url(" + '/elara-site-test.s3-website-us-east-1.amazonaws.com/images/' + ocularImages[index] + ")");

    //Setting the background image based on index
    root.style.setProperty("--backgroundImage", "url(" + '/elara-site-test.s3-website-us-east-1.amazonaws.com/images/' + backgroundImages[index] + ")");
    
    //SplashScreenAnimation
    AddClassTo(logo,"fade-out-animation");
    logo.addEventListener("animationend", AnimationEndSplashScreen);
} 

function AnimationEndSplashScreen() {
    splashScreenFinished = true;
    logo.removeEventListener("animationend", AnimationEndSplashScreen);
    logo.remove(); //Remove splashscreen from the DOM
    
    var terms = document.getElementById("footer");
    var cards = document.getElementsByClassName("mainCardLook");
    var title = document.getElementById("appName");
    //Show eye condition cards   
    for(var i = 0; i < cards.length; i++) {
        AddClassTo(cards[i],"fade-in-animation");
    }
    AddClassTo(terms, "fade-in-animation");
    AddClassTo(title, "fade-in-animation");

    var returningUser = localStorage.getItem('returningUser');
    if(!returningUser) {
        returningUser = true;
        localStorage.setItem('returningUser', returningUser);
        termsModal.showModal();
    }

}

function AddClassTo(element, className) {
    element.classList.add(className);
}

