//Variables for setup

let container;
let camera;
let renderer;
let scene;
let rocket;

function init(){
    container = document.querySelector('.scene');

    //Create Scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 65);

    const ambient = new THREE.AmbientLight(0x404040, 3); //change second value to change brightness
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xFF4900, 2);
    light.position.set(100, 10, 10);
    scene.add(light);

    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias:true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load("./3d/scene.gltf", function(gltf){
        scene.add(gltf.scene);
        rocket = gltf.scene.children[0];
        animate();
    });
}

function animate(){
    requestAnimationFrame(animate);
    rocket.rotation.y += 0.0015;
    rocket.rotation.z += 0.001;
    renderer.render(scene, camera);
}

init()

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);