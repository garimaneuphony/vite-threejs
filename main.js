import * as THREE from "three";
import "./styles.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

const gui = new GUI();
const parameters = {
  color: 0xffff00,
  // spinY: () => {
  //   gsap.to(mesh.rotation, {
  //     duration: 4,
  //     y: mesh.rotation.y + Math.PI * 2 - 1,
  //   });
  // },
};

/**
 * Object
 */

const geometry = new THREE.BoxGeometry(1, 1, 1);
// .toNonIndexed();
geometry.colorsNeedUpdate = true;

// geometry.faces[0] = new THREE.Color(1, 0, 0);
const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
  vertexColors: true,
});
const positionAttribute = geometry.getAttribute("position");
console.log(positionAttribute);
const colors = [];
const color = new THREE.Color();

for (let i = 0; i < positionAttribute.count; i += 3) {
  color.set(Math.random() * 0xffffff);

  colors.push(color.r, color.g, color.b);
  colors.push(color.r, color.g, color.b);
  colors.push(color.r, color.g, color.b);
}
geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// Debug

gui.add(mesh.rotation, "x").min(-1.5).max(1.5).step(0.1).name("Pitch (x)");
gui.add(mesh.rotation, "y").min(-1.5).max(1.5).step(0.1).name("Yaw (y)");
gui.add(mesh.rotation, "z").min(-1.5).max(1.5).step(0.1).name("Roll (z)");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Create a PointLight and turn on shadows for the light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 4);
light.castShadow = true; // default false
scene.add(light);

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
camera.position.y = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// const geometry = new THREE.SphereGeometry(5, 64, 64);
// const material = new THREE.MeshPhongMaterial({
//   color: "#00ff83",
//   // metal: true,
// });
