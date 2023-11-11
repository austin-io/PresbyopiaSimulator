// Imports
import { wheelRotation } from './mainfilter.js'
import { gblur } from './glaucoma.js'
import * as THREE from "./library/three.js/build/three.module.js";
import { material, mesh } from "/VisionSim/scripts/glaucoma.js";

var viewButton = document.getElementsByClassName("viewButton")[0];

var camera;

export { camera };

camera = true;

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/VisionSim/images/static_glaucoma.jpg');
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
    gblur.uniforms.strength.value = 0;
    gblur.uniforms.curvature.value = 0;
    gblur.uniforms.inner.value = 0;
    gblur.uniforms.outer.value = 0;
    window.UpdateFilter = function() {
        gblur.uniforms.inner.value = 0;
        gblur.uniforms.outer.value = (((wheelRotation + 67) / 134) * -1.68) + 2;
        if (wheelRotation < -66) {
            gblur.uniforms.strength.value = 0;
            gblur.uniforms.curvature.value = 0;
        } else {
            gblur.uniforms.strength.value = 1;
            gblur.uniforms.curvature.value = 1.2;
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