// highlight + shift + tab to left, highlight + space/tab to right, highlight + ctrl + # to comment/uncomment
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//add glow
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { bowTop, sternSbTop, sternPtTop, createWireframeHull } from './hullShape.js';
import { createSailGeometry } from './sailShape.js';
import { updateSailColor, updateGeometrysailVertices } from './bft.js';
import { createGUI, PARAMS } from './gui.js';
import { createBackstay } from "./backstay.js";

// Renderer setup
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
// let the renderer setup the canvas-element instead of doing it myself in the html
document.body.appendChild(renderer.domElement);

// Camera setup... in units. it is where it starts rendering
const fov = 75, aspect = w / h, near = 0.1, far = 40;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 12;

const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.03;

// post-processing, adding glow to the wireframe
// bloompass is where the magic happens
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100);
bloomPass.threshold = 0.002;
bloomPass.strength = 3;
bloomPass.radius = 0;
// the composer will replace our renderer
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

const sailHullGroup = new THREE.Group();

createWireframeHull(sailHullGroup);
const { sailGeometry, sailMesh, originalPositions } = createSailGeometry(sailHullGroup);
// createBackstay(sailGeometry, sailHullGroup);

// Add the group to the scene
scene.add(sailHullGroup);

// Update sail color and geometry based on bft
function updateSail() {
  updateSailColor(PARAMS.bft, sailMesh);
  updateGeometrysailVertices(PARAMS.bft, sailGeometry, originalPositions);
}

// Initial update
updateSail();

// Setup GUI
createGUI(updateSail);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // renderer.render(scene, camera);
  // for glow use composer instead of renderer
  composer.render(scene, camera);
  // todo rename: updatesailbft
  updateSail();
  // todo updateSailbackstay();
}
animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);