import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import * as dat from "https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/build/dat.gui.module.js";

//////////////////////////////////////
// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

(document.getElementById("container") || document.body).appendChild(renderer.domElement);

//////////////////////////////////////
// Texture loader
const textureLoader = new THREE.TextureLoader();

const loadTexture = (name) => textureLoader.load(`./image/${name}`);
const sunTexture = loadTexture("sun.jpg");
const mercuryTexture = loadTexture("mercury.jpg");
const venusTexture = loadTexture("venus.jpg");
const earthTexture = loadTexture("earth.jpg");
const earthNormalTexture = loadTexture("earth_normal_map.jpg");
const marsTexture = loadTexture("mars.jpg");
const jupiterTexture = loadTexture("jupiter.jpg");
const saturnTexture = loadTexture("saturn.jpg");
const uranusTexture = loadTexture("uranus.jpg");
const neptuneTexture = loadTexture("neptune.jpg");
const plutoTexture = loadTexture("pluto.jpg");
const saturnRingTexture = loadTexture("saturn_ring.png");
const uranusRingTexture = loadTexture("uranus_ring.png");
const moonTexture = loadTexture("moon.jpg");

//////////////////////////////////////
// Scene & background
const scene = new THREE.Scene();

//////////////////////////////////////
// Realistic Starfield using Points
function createStarField() {
  const starCount = 5000;
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    positions.push(x, y, z);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
  });

  const stars = new THREE.Points(geometry, starMaterial);
  return stars;
}

const starField = createStarField();
scene.add(starField);

//////////////////////////////////////
// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 4000);
camera.position.set(-120, 100, 250);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.dampingFactor = 0.05;
orbit.minDistance = 20;
orbit.maxDistance = 600;

//////////////////////////////////////
// Sun
const sun = new THREE.Mesh(new THREE.SphereGeometry(16, 64, 64), new THREE.MeshBasicMaterial({ map: sunTexture }));
scene.add(sun);

const sunLight = new THREE.PointLight(0xffffff, 2.8, 1000, 2);
sunLight.position.copy(sun.position);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.radius = 4;
sunLight.shadow.bias = -0.005;
scene.add(sunLight);

scene.add(new THREE.AmbientLight(0xffffff, 0.25));

//////////////////////////////////////
// Orbit paths
const path_of_planets = [];
function createOrbitPath(radius, color) {
  const geometry = new THREE.BufferGeometry();
  const points = Array.from({ length: 129 }, (_, i) => {
    const angle = (i / 128) * Math.PI * 2;
    return new THREE.Vector3(radius * Math.cos(angle), 0, radius * Math.sin(angle));
  });
  geometry.setFromPoints(points);
  const line = new THREE.LineLoop(geometry, new THREE.LineBasicMaterial({ color }));
  scene.add(line);
  path_of_planets.push(line);
}

//////////////////////////////////////
// Planet factory
function generatePlanet({ size, texture, distanceFromSun, ring, rotationSpeed, orbitSpeed, axialTilt, normalMap }) {
  const matOpt = { map: texture, roughness: 1, metalness: 0 };
  if (normalMap) matOpt.normalMap = normalMap;

  const planet = new THREE.Mesh(new THREE.SphereGeometry(size, 64, 64), new THREE.MeshStandardMaterial(matOpt));
  planet.castShadow = planet.receiveShadow = true;
  planet.rotation.z = axialTilt;
  planet.position.set(distanceFromSun, 0, 0);

  const obj = new THREE.Object3D();
  obj.add(planet);

  if (ring) {
    const ringMesh = new THREE.Mesh(
      new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 64),
      new THREE.MeshBasicMaterial({ map: ring.texture, side: THREE.DoubleSide, transparent: true, opacity: 0.8 })
    );
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.copy(planet.position);
    obj.add(ringMesh);
  }

  scene.add(obj);
  createOrbitPath(distanceFromSun, 0x555555);

  return { planetObj: obj, planet, rotationSpeed, orbitSpeed };
}

//////////////////////////////////////
// Planets
const planets = [
  { ...generatePlanet({ size: 3.2, texture: mercuryTexture, distanceFromSun: 28, rotationSpeed: 0.004, orbitSpeed: 0.017, axialTilt: THREE.MathUtils.degToRad(0.034) }), name: "Mercury" },
  { ...generatePlanet({ size: 5.5, texture: venusTexture, distanceFromSun: 44, rotationSpeed: -0.002, orbitSpeed: 0.012, axialTilt: THREE.MathUtils.degToRad(177.4) }), name: "Venus" },
  { ...generatePlanet({ size: 6, texture: earthTexture, normalMap: earthNormalTexture, distanceFromSun: 62, rotationSpeed: 0.02, orbitSpeed: 0.01, axialTilt: THREE.MathUtils.degToRad(23.5) }), name: "Earth" },
  { ...generatePlanet({ size: 3.5, texture: marsTexture, distanceFromSun: 78, rotationSpeed: 0.018, orbitSpeed: 0.008, axialTilt: THREE.MathUtils.degToRad(25) }), name: "Mars" },
  { ...generatePlanet({ size: 12, texture: jupiterTexture, distanceFromSun: 100, rotationSpeed: 0.04, orbitSpeed: 0.004, axialTilt: THREE.MathUtils.degToRad(3) }), name: "Jupiter" },
  { ...generatePlanet({ size: 10, texture: saturnTexture, distanceFromSun: 138, rotationSpeed: 0.038, orbitSpeed: 0.003, axialTilt: THREE.MathUtils.degToRad(26.7), ring: { innerRadius: 11, outerRadius: 18, texture: saturnRingTexture } }), name: "Saturn" },
  { ...generatePlanet({ size: 7, texture: uranusTexture, distanceFromSun: 176, rotationSpeed: 0.03, orbitSpeed: 0.002, axialTilt: THREE.MathUtils.degToRad(97.8), ring: { innerRadius: 7, outerRadius: 12, texture: uranusRingTexture } }), name: "Uranus" },
  { ...generatePlanet({ size: 7, texture: neptuneTexture, distanceFromSun: 200, rotationSpeed: 0.032, orbitSpeed: 0.0017, axialTilt: THREE.MathUtils.degToRad(28.3) }), name: "Neptune" },
  { ...generatePlanet({ size: 2.8, texture: plutoTexture, distanceFromSun: 216, rotationSpeed: 0.008, orbitSpeed: 0.001, axialTilt: THREE.MathUtils.degToRad(122.5) }), name: "Pluto" },
];

// Earth moon & atmosphere
const earth = planets.find(p => p.name === "Earth");
const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(6.1, 64, 64), new THREE.MeshBasicMaterial({ color: 0x1f94f3, transparent: true, opacity: 0.15 }));
earth.planet.add(atmosphere);

const moon = new THREE.Mesh(new THREE.SphereGeometry(1.3, 64, 64), new THREE.MeshStandardMaterial({ map: moonTexture }));
moon.position.set(10, 0, 0);
const earthMoonObj = new THREE.Object3D();
earthMoonObj.add(moon);
earth.planetObj.add(earthMoonObj);

//////////////////////////////////////
// Tooltip
const tooltip = document.createElement("div");
Object.assign(tooltip.style, {
  position: "fixed", color: "white", padding: "6px 10px",
  backgroundColor: "rgba(0,0,0,0.7)", borderRadius: "4px",
  pointerEvents: "none", fontFamily: "Arial", fontSize: "14px", display: "none"
});
document.body.appendChild(tooltip);

//////////////////////////////////////
// GUI
const options = {
  speed: 1,
  pauseAnimation: false,
  lightIntensity: 2.8,
  showOrbitPaths: true,
};

// Create GUI with improved styling
const gui = new dat.GUI({ width: 320 });

// Folder for animation controls
const animFolder = gui.addFolder("Animation Controls");
animFolder.add(options, "speed", 0, 5, 0.1).name("Speed");
animFolder.add(options, "pauseAnimation").name("Pause Animation");
animFolder.open();

// Folder for lighting controls
const lightFolder = gui.addFolder("Lighting");
lightFolder.add(options, "lightIntensity", 0, 5, 0.1).name("Sun Light Intensity").onChange(val => {
  sunLight.intensity = val;
});
lightFolder.open();

// Folder for display options
const displayFolder = gui.addFolder("Display Options");
displayFolder.add(options, "showOrbitPaths").name("Show Orbit Paths").onChange(val => {
  path_of_planets.forEach(p => p.visible = val);
});
displayFolder.open();

//////////////////////////////////////
// Hover
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets.map(p => p.planet));
  if (intersects.length) {
    const match = planets.find(p => p.planet === intersects[0].object);
    tooltip.style.display = "block";
    tooltip.style.left = `${e.clientX + 10}px`;
    tooltip.style.top = `${e.clientY + 10}px`;
    tooltip.textContent = match.name;
  } else tooltip.style.display = "none";
}
window.addEventListener("mousemove", onMouseMove);

//////////////////////////////////////
// Click zoom
let zooming = false, zoomStart = new THREE.Vector3(), zoomEnd = new THREE.Vector3(), zoomProgress = 0;

function onClick(e) {
  if (zooming) return;
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hit = raycaster.intersectObjects(planets.map(p => p.planet));
  if (hit.length) {
    const targetPlanet = hit[0].object;
    zooming = true;
    zoomProgress = 0;
    zoomStart.copy(camera.position);
    zoomEnd.copy(targetPlanet.getWorldPosition(new THREE.Vector3())).add(new THREE.Vector3(0, 10, 20));
  }
}
window.addEventListener("click", onClick);

//////////////////////////////////////
// Animation
function animate() {
  requestAnimationFrame(animate);

  if (!options.pauseAnimation) {
    const s = options.speed;
    planets.forEach(({ planet, planetObj, rotationSpeed, orbitSpeed }) => {
      planet.rotation.y += rotationSpeed * s;
      planetObj.rotation.y += orbitSpeed * s;
    });
    earthMoonObj.rotation.y += 0.01 * options.speed;
  }

  // Animate twinkling stars (optional)
  const time = Date.now() * 0.005;
  starField.material.size = 0.7 + 0.3 * Math.sin(time);

  if (zooming) {
    zoomProgress += 0.02;
    if (zoomProgress >= 1) zooming = false;
    else {
      camera.position.lerpVectors(zoomStart, zoomEnd, zoomProgress);
      orbit.target.lerp(zoomEnd, 0.1);
    }
  }

  orbit.update();
  renderer.render(scene, camera);
}

animate();

//////////////////////////////////////
// Resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
