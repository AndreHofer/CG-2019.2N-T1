var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // as 5 primeiras linhas são padrões
var controls = new THREE.OrbitControls( camera, renderer.domElement ); // adiciona o OrbitControls ( para mecher a camera com o mouse )

var light = new THREE.PointLight(0xffffff, 1, 100, 1);
light.position.set(0,10,-10);   // coloca uma luz no alto
scene.add(light);


var groundMaterial = null; // precisa pegar uma imagem
var ground = new THREE.Mesh (new THREE.PlaneBufferGeometry(2000, 2000), 
                             new THREE.MeshPhongMaterial({color:0x7777ff, 
                             depthWrite: false}));
ground.rotation.x = - Math.PI / 2;
ground.position.y = 0;
scene.add(ground)   // adiciona um chão 

camera.position.z = 10;
camera.rotation.x = - (Math.PI / 8);
camera.position.y = 4;

var backImagem = new THREE.TextureLoader().load('./windows.jpg');
var backMaterial = new THREE.MeshBasicMaterial( {map: backImagem} );    
var backGeometry = new THREE.PlaneBufferGeometry(10,10);
var background = new THREE.Mesh( backGeometry, backMaterial);
scene.add(background);
background.position.z = -0.0001;

var sentido = [x = 1, y = 1];
var profes = [
    {nome:'Fernando', geometry: new THREE.PlaneBufferGeometry(1,1), plane: null, sentido:[1,1]},
    {nome:'Denio', geometry: new THREE.PlaneBufferGeometry(1,1), plane: null, sentido:[1,1] }

]
var textures = [
    './fernando1.webp',
    './denio.webp'
]

for(var i = 0; i < profes.length; i++){
   
    var imagem = new THREE.TextureLoader().load(textures[i]);
    var material = new THREE.MeshBasicMaterial( {map: imagem} );
    var plano = new THREE.Mesh(profes[i].geometry, material);

    
    plano.position.x = i+1;
    plano.position.y = i+1;

    profes[i].plane = plano;
    scene.add(plano);
}

var animate = function(){
    requestAnimationFrame(animate);

    animateTeatchers();

    controls.update();
    renderer.render(scene,camera);
}

var animateTeatchers = function(){
    for(var i = 0; i < profes.length; i++) {
        profes[i].plane.position.x +=  (0.01) * profes[i].sentido[0];
        profes[i].plane.position.y +=  (0.01 ) * profes[i].sentido[1];

        if(profes[i].plane.position.x >= 4.5){
            profes[i].sentido[0] *= -1;
            profes[i].plane.position.x += 0.01 * profes[i].sentido[0];
        }
        if(profes[i].plane.position.y >= 4.5){
            profes[i].sentido[1] *= -1;
            profes[i].plane.position.x += 0.01 * profes[i].sentido[1];
        }
        if(profes[i].plane.position.x <= -4.5){
            profes[i].sentido[0] *= -1;
            profes[i].plane.position.x += 0.01 * profes[i].sentido[0];
        }
        if(profes[i].plane.position.y <= -4.5){
            profes[i].sentido[1] *= -1;
            profes[i].plane.position.x += 0.01 * profes[i].sentido[1];
        }
    }
}

animate();

var select = 0; 
