import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';

import Stats from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';

import { GUI } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/libs/dat.gui.module.js';

import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/GLTFLoader.js';

var container, stats, clock, gui, mixer, actions, activeAction;
var camera, scene, renderer, model, controls;

var xSpeed = 10;
var zSpeed = 10;

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.25, 1000 );
    camera.position.set( 0, 20, 30 );
    camera.lookAt( new THREE.Vector3( 0, 2, 0) );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );
    scene.fog = new THREE.Fog( 0x000000, 2, 1000 );

    clock = new THREE.Clock();

    // lights
    var light = new THREE.HemisphereLight( 0x000000, 0x004400 );
    light.position.set( 0, 10, 0 );
    scene.add( light );
    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 20, 10 );
    scene.add( light );

    // ground
    var gt = new THREE.TextureLoader().load("./fundo.jpg");
    var gg = new THREE.PlaneBufferGeometry(1000,1000);
    var gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: gt });

    var ground = new THREE.Mesh(gg, gm);
    ground.rotation.x = - Math.PI / 2;
    ground.material.map.repeat.set(25, 25);
    ground.material.map.wrapS = ground.material.map.wrapT = THREE.RepeatWrapping;
    ground.receiveShadow = true;

    scene.add(ground);

    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    container.appendChild( renderer.domElement );

    window.addEventListener('resize', onWindowResize, false );
    window.addEventListener('keydown', onDocumentKeyDown, false );

    stats = new Stats();
    container.appendChild( stats.dom );

    controls = new OrbitControls( camera, renderer.domElement );

}




function createGUI( model, animations ) {
    gui = new GUI();
    mixer = new THREE.AnimationMixer( model );
    actions = {};

    var clip = animations[0];
    var action = mixer.clipAction( clip );
    actions[ clip.name ] = action;

    activeAction = actions[ 'Take 001' ];
    activeAction.play();
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentKeyDown(e) {
    var keyCode = event.which;
    if (e.code != 'Space'){
        if (keyCode == 87) {
            model.position.z += zSpeed;
        } else if (keyCode == 83) {
            model.position.z -= zSpeed;
        } else if (keyCode == 65) {
            model.position.x += xSpeed;
        } else if (keyCode == 68) {
            model.position.x -= xSpeed;
        }
    }else{
        if (activeAction._clip.name == 'Take 001') {
            activeAction.paused = true;
            activeAction._clip.name = ''
        }else{
            activeAction._clip.name = 'Take 001'
            activeAction.paused = false;
        }
    }
}

function animate() {
    var dt = clock.getDelta();
    if ( mixer ) mixer.update( dt );
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    stats.update();
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

}





















/*

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  // greenish blue

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  renderer.render(scene, camera);
}

main();
*/
