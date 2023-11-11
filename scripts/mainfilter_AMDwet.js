// Imports
import { ablur } from './AMDwet.js'
import { wheelRotation } from './mainfilter.js'
import * as THREE from "./library/three.js/build/three.module.js";
import { material, mesh } from "/VisionSim/scripts/AMDwet.js";

var conditionText = document.getElementsByClassName("conditionText")[0];
var viewButton = document.getElementsByClassName("viewButton")[0];
var camera;

export { camera };

camera = true;

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/VisionSim/images/static_amdwet.jpg');
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


document.addEventListener("DOMContentLoaded", function() {
    ablur.uniforms.size.value = 0;
    ablur.uniforms.strength.value = 0;
    ablur.uniforms.laxis.value = 0;
    ablur.uniforms.saxis.value = 0;
    ablur.uniforms.time.value = 0;
    ablur.uniforms.severity.value = 0;
    ablur.uniforms.big.value = 0;
    window.UpdateFilter = function() {
        if (wheelRotation < -66) {
            ablur.uniforms.size.value = 0;
            ablur.uniforms.strength.value = 0;
            ablur.uniforms.big.value = 0;
        } else {
            ablur.uniforms.size.value = 1;
            ablur.uniforms.strength.value = 0.1;
            ablur.uniforms.big.value = 0.1;
        }
        ablur.uniforms.laxis.value = ((wheelRotation + 67) / 134) * 0.47;
        ablur.uniforms.saxis.value = ((wheelRotation + 67) / 134) * 0.47;
        ablur.uniforms.severity.value = ((wheelRotation + 67) / 134) * 6.41;

        ablur.uniforms.time.value = 4 - (((wheelRotation + 67) / 134) * 4);
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