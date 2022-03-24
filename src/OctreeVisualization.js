class OctreeVisualization {

    constructor() {
        this.visualizations = [];
    }

    create(octree) {
        if (octree.nodes.length) {
            octree.nodes.forEach(node => {
                this.create(node);                        
            });
        }
        else {
            const x = octree.x;
            const y = octree.y;
            const z = octree.z;
            const s = octree.s;

            const geometry = new THREE.BoxGeometry( s, s, s );
            const edges = new THREE.EdgesGeometry( geometry );
            const material = new THREE.LineBasicMaterial( { color: 0x00ffff } );
            const line = new THREE.LineSegments( edges, material );
            line.position.set(x, y, z);

            this.visualizations.push(line);
        }                
    }
}