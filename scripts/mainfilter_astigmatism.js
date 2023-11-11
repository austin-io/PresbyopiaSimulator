// Imports
import { dblur } from './astigmatism.js'
import { ablur } from './astigmatism.js'
import { wheelRotation } from './mainfilter.js'
import * as THREE from "./library/three.js/build/three.module.js";
import { material, mesh1, material1 } from "/PresbyopiaSimulator/scripts/astigmatism.js";
import { onWindowResize } from "/PresbyopiaSimulator/scripts/astigmatism.js";

var viewButton = document.getElementsByClassName("viewButton")[0];

var camera;

export { camera };

camera = true;

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/PresbyopiaSimulator/images/static_astigmatism.jpg');
        viewButton.style.backgroundImage = "var(--camImage)";
        ablur.uniforms.angle.value = 1;
        dblur.uniforms.size.value = 0;
    } else {
        var texture = new THREE.VideoTexture(video);
        viewButton.style.backgroundImage = "var(--photoImage)";
        window.UpdateFilter();
    }
    mesh1.material = new THREE.MeshBasicMaterial({
        map: texture
    })
    mesh1.material.map.needsUpdate = true;
    material1.needsUpdate = true;
    camera = !camera;
    onWindowResize();

}

viewButton.addEventListener('click', cameraToggle);

var conditionText = document.getElementsByClassName("conditionText")[0];


document.addEventListener("DOMContentLoaded", function() {
    ablur.uniforms.angle.value = 1;
    dblur.uniforms.size.value = 0;
    window.UpdateFilter = function() {
        if(camera) {
            var angle = ((wheelRotation + 67) / 134) * 30;
            if (angle > 0) {
                ablur.uniforms.angle.value = angle;
            } else {
                ablur.uniforms.angle.value = 1;
            }
            dblur.uniforms.size.value = ((wheelRotation + 67) / 134) * 0.017;
        } else {
            material.opacity = ((wheelRotation + 67) / 134);
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

