// Imports
import { mblur } from './hyperopia.js'
import { wheelRotation } from './mainfilter.js'
import * as THREE from "./library/three.js/build/three.module.js";
import { material, mesh, scaleMesh } from "/elara-site-test.s3-website-us-east-1.amazonaws.com/scripts/hyperopia.js";

var viewButton = document.getElementsByClassName("viewButton")[0];

var camera;

export { camera };

camera = true;

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/elara-site-test.s3-website-us-east-1.amazonaws.com/images/static_myhypres.jpg');
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
        if(wheelRotation <= -66) {
            mblur.uniforms.blurSwitch.value = 0;
        } else {
            mblur.uniforms.density.value = ((wheelRotation + 67) / 134) * 0.5;
            mblur.uniforms.blurSwitch.value = 1;
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