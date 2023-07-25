import * as THREE from "./library/three.js/build/three.module.js";
import { EffectComposer } from "./library/three.js/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from './library/three.js/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './library/three.js/examples/jsm/postprocessing/ShaderPass.js';
import { Presbyopia } from './library/shader/presbyopia.js';
import { camera as cameraToggle } from './mainfilter_presbyopia.js'

let camera, scene, renderer, video, mesh, composer, stream;

var wRatioX, wRatioY
var mblur, material;

init();
animate();

export { mblur, mesh, material };

function init() {

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 100;

  scene = new THREE.Scene();

  video = document.getElementById('video');

  const texture = new THREE.VideoTexture(video);

  var geometry = new THREE.PlaneGeometry(1, 1);

  material = new THREE.MeshBasicMaterial({
    map: texture
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerHeight, window.innerWidth);
  document.body.appendChild(renderer.domElement);

  composer = new EffectComposer( renderer );
  composer.addPass(new RenderPass( scene, camera ) );


  mblur = new ShaderPass( Presbyopia );
  mblur.enabled = true;
  mblur.renderToScreen = true;
  composer.addPass( mblur );


  window.addEventListener('resize', onWindowResize);

  //If we were suppose to have the camera on but we were unsuccessfully in getting it on
  if(cameraToggle && !getWebCamVideoInput()) {
    stopCamera(stream);
    cameraToggle = false;
    var newTexture = new THREE.TextureLoader().load('/VisionSim/images/Background2.jpg');
    mesh.material = new THREE.MeshBasicMaterial({
      map: newTexture
    })
    mesh.material.map.needsUpdate = true;
    material.needsUpdate = true;
    cameraToggle = false;
}
}

async function getWebCamVideoInput() {
  try {

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      
      stream = await navigator.mediaDevices.getUserMedia({video: true});
      let {width, height} = stream.getTracks()[0].getSettings();
      
      wRatioX = width;
      wRatioY = height;
      
      console.log(width, height);
      
      const constraints = {
        video: {
          width: wRatioX,
          height: wRatioY,
          facingMode: 'environment'
        }
      };
      
      //remove the tracks before we open the camera again
      stopCamera(stream)
      
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        
        // apply the stream to the video element used in the texture
        
        video.srcObject = stream;
        video.play();
        
        onWindowResize();
        
      }).catch(function (error) {
        
        console.error('Unable to access the camera/webcam.', error);
        stopCamera(stream);
        return false;
        
      });
      
      return true;
      
    } else {
      
      console.error('MediaDevices interface not available.');
      stopCamera(stream);
      return false;
    }
  } catch(error) {
    return false;
  }
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  let ang_rad = camera.fov * Math.PI / 180;
  let fov_y = camera.position.z * Math.tan(ang_rad / 2) * 2;

  var height = fov_y * 1.08;
  var width = ang_rad * height;
  
  mesh.scale.set( width, height, 1 );
}

function animate() {

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  
  composer.render();
}

async function stopCamera(stream) {
  //remove the tracks before we open the camera again
  stream.getTracks().forEach(function(track) {
    track.stop();
  });
}

export function scaleMesh(staticFilter) {
  let ang_rad = camera.fov * Math.PI / 180;
  let fov_y = camera.position.z * Math.tan(ang_rad / 2) * 2;
  
  var height = fov_y * 1.08;
  var width = ang_rad * height;
  if(staticFilter) {
    mesh.scale.set( (fov_y / window.innerHeight) * window.innerWidth, fov_y, 1 );
  } else {
    mesh.scale.set( width, height, 1 );
  }
}