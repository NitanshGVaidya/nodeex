import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//camera, scene and render setup
const scene = new THREE.Scene();   //container
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGL1Renderer({
  canvas : document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene,camera);

//Torus
const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xFF0000}); //changed MeshBasicMaterial to MeshStandardMaterial
const torus = new THREE.Mesh(geometry,material);
scene.add(torus);

//Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
const ambidentLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambidentLight);

//for moving object on mouse control
const control = new OrbitControls(camera, renderer.domElement); // update camera position acc to dom events on mouse


//Light and grid helper
//const lighthelper = new THREE.PointLightHelper(pointLight);
//const gridhelper = new THREE.GridHelper(200,50);
//scene.add(lighthelper,gridhelper);

//star adding
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(500).fill().forEach(addStar);

//Texture mapping

const mytexture = new THREE.TextureLoader().load('my.jpg');
const my = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshStandardMaterial({map:mytexture})
);
scene.add(my);
my.position.z = 5;
my.position.x = -2 ;


function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.y += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();



//Backgroud
//const spaceTexture = new THREE.TextureLoader().load('space.jpg');
//scene.background = spaceTexture;

//renderer.render(scene,camera); in place of using this render we used recursive function that calls render method automatically
function animate(){
  requestAnimationFrame(animate); //indicate browser that you need to perform aniomation
  //animation code
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.01;
  // torus.rotation.y += 0.01;
  control.update();
  renderer.render(scene, camera);
}
animate()

