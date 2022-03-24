class Octree {

	constructor( capaticity ) {

		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.s = 1;

		this.capaticity = capaticity;
		this.elements = [];
		this.nodes = [];
	}

	subdivide() {

		const x = this.x;
		const y = this.y;
		const z = this.z;
		const s = this.s;

		const fnw = new Octree( this.capaticity );
		fnw.x = x - s / 2
		fnw.y = y - s / 2
		fnw.z = z - s / 2
		fnw.s =     s / 2

		const fne = new Octree( this.capaticity );
		fne.x = x + s / 2
		fne.y = y - s / 2
		fne.z = z - s / 2
		fne.s = 	s / 2
		
		const fsw = new Octree( this.capaticity );
		fsw.x = x - s / 2
		fsw.y = y + s / 2
		fsw.z = z - s / 2
		fsw.s = 	s / 2
		
		const fse = new Octree( this.capaticity );
		fse.x = x + s / 2
		fse.y = y + s / 2
		fse.z = z - s / 2
		fse.s = 	s / 2
		
		const bnw = new Octree( this.capaticity );
		bnw.x = x - s / 2
		bnw.y = y - s / 2
		bnw.z = z + s / 2
		bnw.s = 	s / 2
		
		const bne = new Octree( this.capaticity );
		bne.x = x + s / 2
		bne.y = y - s / 2
		bne.z = z + s / 2
		bne.s = 	s / 2
		
		const bsw = new Octree( this.capaticity );
		bsw.x = x - s / 2
		bsw.y = y + s / 2
		bsw.z = z + s / 2
		bsw.s = 	s / 2
		
		const bse = new Octree( this.capaticity );
		bse.x = x + s / 2
		bse.y = y + s / 2
		bse.z = z + s / 2
		bse.s = 	s / 2		

		this.nodes.push( fnw );
		this.nodes.push( fne );
		this.nodes.push( fsw );
		this.nodes.push( fse );
		this.nodes.push( bnw );
		this.nodes.push( bne );
		this.nodes.push( bsw );
		this.nodes.push( bse );

	}

	insert( element ) {

		if ( ! this.contains( element ) ) {

			return;

		}

		if ( this.elements.length < this.capaticity ) {

			this.elements.push( element );

		} else {

			if ( ! this.nodes.length ) {

				this.subdivide();

			}

			this.nodes.forEach( node => {

				node.insert( element );

			} );

		}

	}

	contains( point ) {

		return (
			point.x > this.x - this.s &&
            point.x < this.x + this.s &&
            point.y > this.y - this.s &&
            point.y < this.y + this.s &&
            point.z > this.z - this.s &&
            point.z < this.z + this.s
		);

	}

}
