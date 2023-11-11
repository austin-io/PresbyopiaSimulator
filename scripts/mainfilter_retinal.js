// Imports
import { ablur } from './retinal.js'
import { wheelRotation } from './mainfilter.js'
import * as THREE from "./library/three.js/build/three.module.js";
import { material, mesh } from "/PresbyopiaSimulator/scripts/retinal.js";

var viewButton = document.getElementsByClassName("viewButton")[0];
var camera;

export { camera };

camera = true;

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/PresbyopiaSimulator/images/static_retinal.jpg');
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
    var d = new Date();
    let seconds = d.getMilliseconds();
    var pngPos = seconds / 999.0;
    if(wheelRotation < -66) {
        //need to do something to make it 0
    } else {
        var currVal = ablur.uniforms.hairPos.value;
        currVal += (pngPos * 10) * 0.0001;
        if(currVal > 10) {
            currVal = 1;
        }
        ablur.uniforms.hairPos.value = currVal;
        ablur.uniforms.blobPosition.value = currVal;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    ablur.uniforms.hairPos.value = 0;
    ablur.uniforms.blobPosition.value = 0;
    ablur.uniforms.size.value = 2;
    ablur.uniforms.blurEdge.value = 0;
    ablur.uniforms.floaters.value = 0;
    window.UpdateFilter = function() {
        var feather = 0.2
        if (wheelRotation < -66) {
            ablur.uniforms.blurEdge.value = 0;
            ablur.uniforms.floaters.value = 0;
        } else {
            ablur.uniforms.blurEdge.value = feather;
            ablur.uniforms.floaters.value = 1;
        }
        
        ablur.uniforms.size.value = 1.5 - ((wheelRotation + 67) / 134);

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
