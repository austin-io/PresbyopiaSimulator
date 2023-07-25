import * as THREE from './library/three.js/build/three.module.js';

import { Water } from './Water2.js';

let scene, camera, clock, renderer, water, video, stream, waterGeometry, causticsGeometry, mesh;


var wRatioX, wRatioY;
var material;

const params = {
    color: '#ffffff',
    scale: 4,
    flowX: 1,
    flowY: 1
};

init();
animate();

export { scene, water, mesh, material};

export function TurnEffectOn(effect) {
    if(effect) {
        water.position.set(0,0,0);
    } else {
        water.position.set(0,5000,0);
    }
}

function init() {

    
    // scene
    
    scene = new THREE.Scene();
    
    // camera
    
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
    camera.position.set( 0, 0, 5 );
    camera.lookAt( scene.position );
    
    // Video Camerea
    video = document.getElementById('video');
    const cameraTexture = new THREE.VideoTexture(video); 
    
    // clock
    
    clock = new THREE.Clock();
    
    // water
    
    var shape2 = new THREE.Shape();
    shape2.moveTo(-1,-1);
    shape2.lineTo(1,-1);
    shape2.lineTo(1,1);
    shape2.lineTo(-1,1);
    

    var geometry2 = new THREE.ShapeGeometry( shape2);
    
    water = new Water( geometry2, {
        color: params.color,
        scale: params.scale,
        flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
        textureWidth: 1024,
        textureHeight: 1024
    } );
    // water.position.set(0,0,1);
    
    var geometry = new THREE.PlaneGeometry(1,1);
    material = new THREE.MeshBasicMaterial({
        map: cameraTexture
    });
    
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0,0,-1);
    scene.add(mesh);
    scene.add( water );
    // scene.background = cameraTexture;
    
    // renderer
    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize );
    
    getWebCamVideoInput();
    
    water.scale.set(0,0,0);
}

function onWindowResize() {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    let ang_rad = camera.fov * Math.PI / 180;
    let fov_y = camera.position.z * Math.tan(ang_rad / 2) * 2;
    
    var height = fov_y * 0.5;
    var width = ang_rad * height;
    
    water.scale.set( (height / window.innerHeight) * window.innerWidth,height,1);
    mesh.scale.set(width*2.5, height*2.5, 1);

}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    const delta = clock.getDelta();

    renderer.render( scene, camera );

}

async function getWebCamVideoInput() {
    try {

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        
        stream = await navigator.mediaDevices.getUserMedia({video: true});
        let {width, height} = stream.getTracks()[0].getSettings();
        
        wRatioX = width;
        wRatioY = height;
        
        
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
        console.log(error);
        return false;
    }
}

async function stopCamera(stream) {
    //remove the tracks before we open the camera again
    stream.getTracks().forEach(function(track) {
        track.stop();
    });
}