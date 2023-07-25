// Imports
import { mblur } from './myopia.js'
import { wheelRotation } from './mainfilter.js'
import * as THREE from "./library/three.js/build/three.module.js";
import { material, mesh, scaleMesh } from "/VisionSim/scripts/myopia.js";

var viewButton = document.getElementsByClassName("viewButton")[0];

var camera;

export { camera };

camera = true;

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/VisionSim/images/static_myhypres.jpg');
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
    mblur.uniforms.sizing.value = 0.1;
    mblur.uniforms.density.value = 0.01;
    window.UpdateFilter = function() {
        var sizing = ((wheelRotation + 67) / 134) * 2;
        var density = ((wheelRotation + 67) / 134) * 2;
        if(wheelRotation < -66) {
            sizing = 0.1;
            density = 0.01;
        } else if (wheelRotation > -22 && wheelRotation < 22){
            sizing = 1.7;            
        }
        mblur.uniforms.sizing.value = sizing;
        mblur.uniforms.density.value = density;
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
