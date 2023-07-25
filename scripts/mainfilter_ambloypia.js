// Imports
import { wheelRotation, UsingSmallWheel} from './mainfilter.js'
import * as THREE from "./library/three.js/build/three.module.js";
import { hblur } from './ambloypia.js'
import { vblur } from './ambloypia.js'
import { material, mesh, scene } from "/VisionSim/scripts/ambloypia.js";


UsingSmallWheel();

var viewButton = document.getElementsByClassName("viewButton")[0];

var camera;

export { camera };

camera = true;

function cameraToggle() {
    var style = getComputedStyle(document.body);
    if(camera) {
        var texture = new THREE.TextureLoader().load('/VisionSim/images/static_amblyopia.jpg');
        viewButton.style.backgroundImage = "var(--camImage)";
        scene.background = texture;
    } else {
        var texture = new THREE.VideoTexture(video);
        viewButton.style.backgroundImage = "var(--photoImage)";
        window.UpdateFilter();
        scene.background = texture;
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
    hblur.uniforms.h.value = 0;
    vblur.uniforms.v.value = 0;
    window.UpdateFilter = function() {
        vblur.uniforms.v.value = ((wheelRotation + 22) / 44) * 0.0016;
        hblur.uniforms.h.value = ((wheelRotation + 22) / 44) * 0.0016;
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