import * as THREE from "three";
// import "./style.css";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});

// 기본적인 캔버스를 만듬
const mesh = new THREE.Mesh(geometry, material);
// 만든 캔버스를 scene에 더해줌
scene.add(mesh);

// 캔버스 사이즈 브라우저 사이즈에 맞게 세팅
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// 캔버스를 비추는 조명 세팅
const light = new THREE.PointLight(0xffffff, 1, 100);
// 조명 위치 x, y, z 좌표 설정
light.position.set(0, 10, 10);
scene.add(light);

// 만들어진 scene을 보는 방향을 결정함
// 첫번째 인자 : 카메라가 얼마나 넓은 각도로 볼 수 있는지를 결정
// 두번째, 세번째 : aspect ratio
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 10;
scene.add(camera);

// scene을 렌더링한다
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGL1Renderer({ canvas });
// 캔버스 사이즈 설정
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Orbit Controls : 마우스 커서로 움직일때마다 뷰포인트가 바뀌도록 설정함
// 보는 각도, 줌인줌아웃...
const controls = new OrbitControls(camera, canvas);
// 객체를 드래그 할 수 있도록 함
controls.enableDamping = true;
// 줌인을 너무 많이했을때 캔버스에 객체가 꽉 차지 않도록
controls.enablePan = false;
controls.enableZoom = false;
// 캔버스에 띄운 물체가 자동으로 회전되도록 설정, 회전 속도도 설정할 수 있다
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
// 브라우저 사이즈 변경될때마다 캔버스 사이즈 변경되도록 콜백 설정
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // THREE 속성값들을 변경된 윈도우 사이즈에 맞춰서 재설정
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

// 윈도우 사이즈에 따라 THREE가 렌더링한 객체의 비율도 바로 업데이트 되도록 설정
const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
