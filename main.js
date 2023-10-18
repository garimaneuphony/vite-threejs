import * as THREE from "three";
import "./styles.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

/* // CUBE
const scene = new THREE.Scene();
// BASE OBJECT -HOLDS ALL 3D OBJECTS
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// TO VIEW OUR SCENE = (DEGREE, ASPECT RATIO, NEAR AND FAR PLAIN)

const renderer = new THREE.WebGLRenderer();
// TO RENDER CONTENTS ON SCREEN
renderer.setSize(window.innerWidth, window.innerHeight);
// SET SIZE OF RENDER TARGET
document.body.appendChild(renderer.domElement);
// ATTACH OUTPUT TO DOM

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: "red",
});
// HOW TO RENDER THAT OBJECT
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// ADD CUBE TO THE SCENE

camera.position.z = 5;
// SET CAMERA POSITION TO 5, otherwise we will view from inside the cube and won't be able to view it

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
*/

// SPHERE

const scene = new THREE.Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshPhongMaterial({
  color: "#00ff83",
  // metal: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 40, 100, 1.2);
light.position.set(0, 10, 10);
light.castShadow = true;
scene.add(light);
// color, min, max view - beyond that it will be black

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// CONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

// Timeline magic
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });

// Mouse Animation Color
let mouseDown = true;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = false));
window.addEventListener("mouseup", () => (mouseDown = true));

window.addEventListener("mousemove", (e) => {
  console.log("object");
  if (mouseDown) {
    console.log("mouse down");
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.width) * 255),
      150,
    ];
    console.log(rgb);
    // let's animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
