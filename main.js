import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

// CS115 has cursed my programming style
// Also if you are reading this hi please don't steal my keys
// Thanks https://www.youtube.com/watch?v=Q7AOvWpIVHU

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);
const pointLight = new THREE.PointLight(0xffffff, 2000);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xffa8f7});
const torus = new THREE.Mesh(geometry, material);
const derakumaTexture = new THREE.TextureLoader().load('/images/derakuma.png');
const derakuma = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: derakumaTexture, color: 0xffffff})
);
const moonTexture = new THREE.TextureLoader().load('/images/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('/images/normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({map: moonTexture, normalMap: normalTexture, color: 0xffffff})
);
moon.position.z = 30;
moon.position.setX(-10);
scene.add(pointLight, ambientLight, torus, derakuma, moon);
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({color: 0xd22f9b});
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const tuna = [];
for (let i = 1; i <= 1325; i++) {tuna.push(new THREE.TextureLoader().load(`/images/${i}.webp`))}
function moveCamera() {
  const frame = document.body.getBoundingClientRect().top;
  scene.background = tuna[parseInt(-frame/6.1+23)];
  // console.log(parseInt(-frame/6.1+23));
  camera.position.x = frame * -0.0002;
  camera.position.y = frame * -0.0002;
  camera.position.z = frame * -0.01;}
document.body.onscroll = moveCamera;
moveCamera();
// var audio = new Audio('/tuna.mp3');
// audio.volume = 0.05;
// audio.loop = true;
// audio.play();

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  derakuma.rotation.x = 0;
  derakuma.rotation.y += 0.01;
  derakuma.rotation.z += 0.01;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.005;
  controls.update();
  renderer.render(scene, camera);}
animate();