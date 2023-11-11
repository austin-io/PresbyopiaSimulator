// Imports
import { sblur } from './cataract.js'
import { hblur } from './cataract.js'
import { vblur } from './cataract.js'
import { wheelRotation } from './mainfilter.js'
import * as THREE from "./library/three.js/build/three.module.js";
import { material, mesh } from "/VisionSim/scripts/cataract.js";

var viewButton = document.getElementsByClassName("viewButton")[0];

var camera;

export { camera };

camera = true;

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/VisionSim/images/static_cataract.webp');
        viewButton.style.backgroundImage = "var(--camImage)";
    } else {
        var texture = new THREE.VideoTexture(video);
        viewButton.style.backgroundImage = "var(--photoImage)";
    }
    mesh.material = new THREE.MeshBasicMaterial({
        map: texture
    })
    mesh.material.map.needsUpdate = true;
    material.needsUpdate = true;
    camera = !camera;
}

viewButton.addEventListener('click', cameraToggle);


var conditionText = document.getElementsByClassName("conditionText")[0];


document.addEventListener("DOMContentLoaded", function() {
    sblur.uniforms.amount.value = 0;
    vblur.uniforms.v.value = 0;
    hblur.uniforms.h.value = 0;
    window.UpdateFilter = function() {
        sblur.uniforms.amount.value = ((wheelRotation + 67) / 134) * 0.5;
        vblur.uniforms.v.value = ((wheelRotation + 67) / 134) * 0.0016;
        hblur.uniforms.h.value = ((wheelRotation + 67) / 134) * 0.0016;
        UpdateSeverity();
    };
});

function UpdateSeverity() {
    if(wheelRotation <= -67) {
        conditionText.innerHTML = "Normal";
    } else if(wheelRotation <= -22) {
        conditionText.innerHTML = "Mild";
    } else if(wheelRotation <= 22) {
        conditionText.innerHTML = "Moderate";
    } else {
        conditionText.innerHTML = "Severe";
    }
}





