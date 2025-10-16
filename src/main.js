import './style.css'
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}


// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);


// Controls
const controls = new PointerLockControls(camera, renderer.domElement);


// Click to start pointer lock
document.addEventListener('click', () => {
  controls.lock();
});

// Movement
const keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

const velocity = new THREE.Vector3();
const speed = 5; // m/s


//const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

camera.position.z = 5;


//Create axis lines

const x_axis_color = new THREE.LineBasicMaterial( { color: 0x0000ff} )
const y_axis_color = new THREE.LineBasicMaterial( { color: 0x00ff00} )
const z_axis_color = new THREE.LineBasicMaterial( { color: 0xff0000} )

const points = [];
points.push( new THREE.Vector3(-10,0,0));
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const x_axis = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( x_axis, x_axis_color );
scene.add( line );

function animate() {


  requestAnimationFrame(animate);

  const delta = 0.016; // ~60 FPS
  velocity.set(0, 0, 0);

  if (keys['KeyW']) velocity.z -= speed * delta;
  if (keys['KeyS']) velocity.z += speed * delta;
  if (keys['KeyA']) velocity.x -= speed * delta;
  if (keys['KeyD']) velocity.x += speed * delta;

  controls.moveRight(velocity.x);
  controls.moveForward(-velocity.z);
  renderer.render(scene, camera);

}

renderer.setAnimationLoop( animate );