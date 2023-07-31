// Imports
import * as THREE from "./library/three.js/build/three.module.js";
import { TurnEffectOn, scene, water, mesh, material } from "./water.js"

var viewButton = document.getElementsByClassName("viewButton")[0];

var camera;

export { camera };

camera = true;

let alpha = water.material.uniforms.timeAlpha;

document.addEventListener("DOMContentLoaded", function() {
    alpha.value = 0.7;
})

var viewButton = document.getElementsByClassName("viewButton")[0];
// var blink = document.getElementById("blink");
// blink.addEventListener("animationiteration", clearVision);

let blink;
blink = document.getElementById('blinkPlaceHolder');
let blinkTime = 5;


setInterval(function() {
    alpha.value -= 0.0005;
});

//blink timer
setInterval(function() {
    blink.id = 'blink';
    clearVision();
}, blinkTime * 1500);

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/elara-site-test.s3-website-us-east-1.amazonaws.com/images/static_allergy.jpg');
        viewButton.style.backgroundImage = "var(--camImage)";
    } else {
        var texture = new THREE.VideoTexture(video);
        viewButton.style.backgroundImage = "var(--photoImage)";
        window.UpdateFilter();
    }
    mesh.material = new THREE.MeshBasicMaterial({
        map: texture
    })
    mesh.material.map.needsUpdate = true;
    material.needsUpdate = true;
    camera = !camera;
}

function clearVision() {
    setTimeout(function() {
        alpha.value = 0.7;
    }, 380);
    setTimeout(function() {
        blink.id = '';
    }, 750);
}

viewButton.addEventListener('click', cameraToggle);
