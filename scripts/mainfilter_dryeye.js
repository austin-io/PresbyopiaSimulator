// Imports
import { hblur } from './dryeye.js'
import { vblur } from './dryeye.js'
import {TextureLoader, VideoTexture, MeshBasicMaterial, RGBA_ASTC_5x4_Format} from "./library/three.js/build/three.module.js";
import { material, mesh } from "/PresbyopiaSimulator/scripts/dryeye.js";

let blink;
blink = document.getElementById('blinkPlaceHolder');
let blinkTime = 5;

window.addEventListener("load", function() {
    // blink.id = 'blink';
    // blink.addEventListener("animationiteration", clearVision);
    hblur.uniforms.h.value = 0;
    vblur.uniforms.v.value = 0;
});

let viewButton = document.getElementsByClassName("viewButton")[0];

//blurs every second
setInterval(function() {
    hblur.uniforms.h.value += 0.000005;
    vblur.uniforms.v.value += 0.000005;
});


//blink timer
setInterval(function() {
    blink.id = 'blink';
    clearVision();
}, blinkTime * 1000);

var camera;

export { camera };

camera = true;

function cameraToggle() { 
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new TextureLoader().load('/PresbyopiaSimulator/images/static_dryeye.jpg');
        viewButton.style.backgroundImage = "var(--camImage)";
    } else {
        var texture = new VideoTexture(video);
        viewButton.style.backgroundImage = "var(--photoImage)";
    }
    mesh.material = new MeshBasicMaterial({
        map: texture
    })
    mesh.material.map.needsUpdate = true;
    material.needsUpdate = true;
    camera = !camera;
}

viewButton.addEventListener('click', cameraToggle);

function clearVision() {
    setTimeout(function() {
        hblur.uniforms.h.value = 0;
        vblur.uniforms.v.value = 0;
    }, 380);
    setTimeout(function() {
        blink.id = '';
    }, 750);
}

