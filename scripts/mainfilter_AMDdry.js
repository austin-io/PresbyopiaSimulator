// Imports
import { ablur } from './AMDdry2.js'
import { wheelRotation } from './mainfilter.js'
import * as THREE from "./library/three.js/build/three.module.js";
import { material, mesh, material1, controls } from "/scripts/AMDdry2.js";

var viewButton = document.getElementsByClassName("viewButton")[0];
var camera;

export { camera };

camera = true;

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/images/static_amddry.jpg');
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

setInterval(function() {

    controls.controlVal *= -1;
}, 8000);

document.addEventListener("DOMContentLoaded", function() {
    ablur.uniforms.severity.value = 0;
    material1.opacity = 0;
    ablur.uniforms.translucency.value = 0;
    window.UpdateFilter = function() {
        var pngColor = ((wheelRotation + 67) / 134) * 0.6;
        if (wheelRotation < 22 ) {
            material1.opacity = 0;
            controls.controlVal= 0;
        } else {
            material1.opacity = 0.5;
            if(controls.controlVal == 0) {
                controls.controlVal = 0.1;
            }
        }
        
        ablur.uniforms.severity.value = ((wheelRotation + 67) / 134) * 0.5;
        ablur.uniforms.translucency.value = ((wheelRotation + 67) / 134) * 1;

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


