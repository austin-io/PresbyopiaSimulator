// Imports
import { wheelRotation, UsingSmallWheel} from './mainfilter.js'
import * as THREE from "./library/three.js/build/three.module.js";
import {ablur, material, mesh } from "/VisionSim/scripts/strabismus.js";
// import { scene } from './strabismus.js';


UsingSmallWheel();

var viewButton = document.getElementsByClassName("viewButton")[0];

var camera;

export { camera };

camera = true;

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/VisionSim/images/static_strabismus.jpg');
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

viewButton.addEventListener('click', cameraToggle);


var conditionText = document.getElementsByClassName("conditionText")[0];

document.addEventListener("DOMContentLoaded", function() {
    ablur.uniforms.h.value = 0;
    window.UpdateFilter = function() {
        ablur.uniforms.h.value = ((wheelRotation + 22) / 44);
        UpdateSeverity();
    };
});


function UpdateSeverity() {
    if(wheelRotation <= -21) {
        conditionText.innerHTML = "Normal Eye";
    } else {
        conditionText.innerHTML = "Affected Eye";
    } 
}