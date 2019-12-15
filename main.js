var fundo = "./fundo.jpg";
S
var scene, camera, renderer;
var rigth_cube, left_cube, top_cube, bottom_cube;
var velocity = 0.04;

var player = {
  id: 'null',
  shape: new THREE.Mesh()
}

var texture = new THREE.TextureLoader().load(emilio_face_url);
var material = new THREE.MeshBasicMaterial();
material.map = texture;

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("#000");
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
  });

  const light = new THREE.PointLight(0xFFFFFF, 1, 1000);
  light.position.set(0, 0, 0);
  scene.add(light);

  initializeBorders();

  document.addEventListener('keydown', handleKeydown, false);
  render();
}

const initializeBorders = () => {
  let geometry = new THREE.BoxGeometry(1.5, 5, 1);
  let material = new THREE.MeshBasicMaterial({ depthWrite: false, depthTest: false })

  rigth_cube = new THREE.Mesh(geometry, material);
  rigth_cube.position.set(4.5, 0, 0.5);
  left_cube = new THREE.Mesh(geometry, material);
  left_cube.position.set(-4.5, 0, 0.5);

  geometry = new THREE.BoxGeometry(9, 1.5, 1);
  top_cube = new THREE.Mesh(geometry, material);
  top_cube.position.set(0, 2.5, 0.5);
  bottom_cube = new THREE.Mesh(geometry, material);
  bottom_cube.position.set(0, -2.5, 0.5);

  geometry = new THREE.BoxGeometry(8.5, 4.5, 0.00001);
  material = new THREE.MeshBasicMaterial({ depthWrite: false, depthTest: false })
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, 0);

  const edges = new THREE.EdgesGeometry(cube.geometry);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
  scene.add(line);
}

const initializePlayer = () => {
  const geometry = new THREE.CircleGeometry(0.25, 32);
  player.shape = new THREE.Mesh(geometry, material);
  scene.add(player.shape);
}

  const key_press = comand.key;
  const moveFunction = accepted_moves[key_press];

  if (moveFunction) moveFunction();
}
  
const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);

}

init();
