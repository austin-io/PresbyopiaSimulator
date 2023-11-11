// Imports
import { ablur } from './diabetic.js'
import { wheelRotation } from './mainfilter.js'
import * as THREE from "./library/three.js/build/three.module.js";
import { material, mesh } from "/scripts/diabetic.js";

var viewButton = document.getElementsByClassName("viewButton")[0];

var camera;

export { camera };

camera = true;

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/images/static_diabetic.jpg');
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
    ablur.uniforms.randNoise.value = 0;
    ablur.uniforms.randBlur.value = 0;
    ablur.uniforms.shape.value = 0;
    ablur.uniforms.big.value = 0;
    ablur.uniforms.severity.value = 0;
    window.UpdateFilter = function() {
        ablur.uniforms.randNoise.value =((wheelRotation + 67) / 134) * 1;
        ablur.uniforms.randBlur.value = ((wheelRotation + 67) / 134) * 2;
        ablur.uniforms.severity.value = ((wheelRotation + 67) / 134) * 10;
        
        if(wheelRotation > 21) {
            ablur.uniforms.big.value = ((wheelRotation + 67) / 134) * 0.44;
        } else {
            ablur.uniforms.big.value = 0.1;
        }
        
        if(wheelRotation <= -66) {
            ablur.uniforms.shape.value = 0;
        } else {
            //constant except for when we are at normal
            ablur.uniforms.shape.value = 9.8;
        }
        
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
