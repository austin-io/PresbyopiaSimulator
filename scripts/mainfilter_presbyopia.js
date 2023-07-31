// Imports
import { mblur } from './presbyopia.js'
import { wheelRotation } from './mainfilter.js'
import * as THREE from "./library/three.js/build/three.module.js";
import { material, mesh, scaleMesh } from "/scripts/presbyopia.js";

var viewButton = document.getElementsByClassName("viewButton")[0];
var camera;
export { camera };

camera = true;

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/images/static_presbyopia.jpg');
        viewButton.style.backgroundImage = "var(--camImage)";
        scaleMesh(true);
    } else {
        var texture = new THREE.VideoTexture(video);
        viewButton.style.backgroundImage = "var(--photoImage)";
        scaleMesh(false);
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
    mblur.uniforms.density.value = 0;
    mblur.uniforms.blurSwitch.value = 0;
    window.UpdateFilter = function() {
        if(wheelRotation <= - 66) {
            mblur.uniforms.blurSwitch.value = 0;
        } else {
            mblur.uniforms.blurSwitch.value = 1;
            mblur.uniforms.density.value = ((wheelRotation + 67) / 134) * 1.7;
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