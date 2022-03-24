const octree = new Octree(4);
octree.s = 30;

for (let i = 0; i < 16; i++) {
    var x = Math.random() * ( octree.s + octree.s / 2 ) - octree.s;
    var y = Math.random() * ( octree.s + octree.s / 2 ) - octree.s;
    var z = Math.random() * ( octree.s + octree.s / 2 ) - octree.s;
    var point = {x, y, z};
    octree.insert(point)   
};

// ------------------------------------------------------

function createOctreeVisualization(octree) {
    let visualizations = [];

    if (octree.nodes.length) {
        for (let i = 0; i < octree.nodes.length; i++) {
            const node = octree.nodes[i];
            const visualization = createOctreeVisualization(node);
            visualizations = visualizations.concat(visualization);
        }
    }
    else {
        const x = octree.x;
        const y = octree.y;
        const z = octree.z;
        const s = octree.s*2;

        const geometry = new THREE.BoxGeometry( s, s, s );
        const edges = new THREE.EdgesGeometry( geometry );
        const material = new THREE.LineBasicMaterial( { color: 0x00ffff } );
        const line = new THREE.LineSegments( edges, material );
        line.position.set(x, y, z);
        visualizations.push(line);        
    }

    return visualizations;
}

function createCircle(x, y, z, r) {
    const geometry = new THREE.SphereGeometry( r, 32, 16 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const circle = new THREE.Mesh( geometry, material );
    circle.position.set(x, y, z);
    return circle;
}

// ------------------------------------------------------

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 200 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();

var pointsVisualizations = octree.elements.map(element => createCircle(element.x, element.y, element.z, 1));
scene.add(...pointsVisualizations)

nodesVisualizations = createOctreeVisualization( octree );
scene.add(...nodesVisualizations);

function animate() {

    requestAnimationFrame( animate );                

    var pitch = 0;
    var yaw = 0.01 * performance.now() * Math.PI / 180;
    var euler = new THREE.Vector3();                
    euler.x = Math.cos(yaw) * Math.cos(pitch)
    euler.y = Math.sin(pitch)
    euler.z = Math.sin(yaw) * Math.cos(pitch)

    euler.multiplyScalar(200);
    camera.position.x = euler.x;
    camera.position.y = euler.y;
    camera.position.z = euler.z;    
    camera.lookAt(0, 0, 0);            

    renderer.render( scene, camera );
};

animate();