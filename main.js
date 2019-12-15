
var bins_face_url = "./fundo.jpg";
var emilio_face_url = "./fundo.jpg";
var marco_face_url = "./fundo.jpg";
var dota2_url = "./fundo.jpg";
var pill_icon = "./fundo.jpg";
var bueno_icon = "./fundo.jpg";
var fernando_face_url = "./fundo.jpg";

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
  initializePlayer();

  document.addEventListener('keydown', handleKeydown, false);
  render();
}

const setPlayerId = (id) => {
  player.id = id;
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

const handleChangeTeacherTexture = (teacher_id) => {
  const accepted_textures = {
    Bins() { return bins_face_url },
    Emilio() { return emilio_face_url },
    Marco() { return marco_face_url },
    Fernando() { return fernando_face_url }
  }

  if (teacher_id === player.id) return;

  const teacherTexture = accepted_textures[teacher_id];

  if (teacherTexture) {
    setPlayerId(teacher_id)
    const url = teacherTexture()
    const texture = new THREE.TextureLoader().load(url);
    material.map = texture;
  }
}

const initializePlayer = () => {
  const geometry = new THREE.CircleGeometry(0.25, 32);
  player.shape = new THREE.Mesh(geometry, material);
  player.shape.rotateZ(Math.random() * (0, 2) * Math.PI);
  scene.add(player.shape);
}

const isCollider = (teste_cube) => {
  const circle_BB = new THREE.Box3().setFromObject(player.shape);
  const cube_BB = new THREE.Box3().setFromObject(teste_cube);
  const is_collide = cube_BB.containsBox(circle_BB);

  return is_collide;
}

const movePlayer = (comand) => {
  const accepted_moves = {
    ArrowUp() {
      if (!isCollider(top_cube)) player.shape.rotateZ(0.05);
    },
    ArrowDown() {
      if (!isCollider(bottom_cube)) player.shape.rotateZ(-0.05);
    },
    ArrowLeft() {
      if (!isCollider(left_cube)) player.shape.rotateZ(-0.05);
    },
    ArrowRight() {
      if (!isCollider(rigth_cube)) player.shape.rotateZ(0.05);
    }
  };

  // agora quando eu precisar colocar mais uma tecla, é só colocar mais um objeto e 
  // implementar a regra de negócio, não preciso verificar mais em lugar nenhum se tem 
  // ou não a tecla e tudo mais. Isso deixa o código com a menor fricção possível

  const key_press = comand.key;
  const moveFunction = accepted_moves[key_press];

  if (moveFunction) moveFunction();
}

const handleKeydown = (event) => {
  movePlayer(event);
  // console.log('Tecla pressionada: ', event.key)
}

const changeRotate = (number) => {
  const rotate = ((player.shape.rotation.z / Math.PI) + number) * -1 * Math.PI;
  player.shape.rotation.z = rotate;
}

const render = () => {
  requestAnimationFrame(render);
  renderer.render(scene, camera);

  if (isCollider(top_cube)) {
    changeRotate(0);
    handleChangeTeacherTexture('Emilio')
  } else if (isCollider(bottom_cube)) {
    changeRotate(0);
    handleChangeTeacherTexture('Bins')
  } else if (isCollider(left_cube)) {
    changeRotate(1);
    handleChangeTeacherTexture('Marco')
  } else if (isCollider(rigth_cube)) {
    changeRotate(1);
    handleChangeTeacherTexture('Fernando')
  }
  player.shape.translateX(velocity)
}

init();
