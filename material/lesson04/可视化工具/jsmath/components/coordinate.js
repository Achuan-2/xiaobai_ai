function Coordinate3D(scene,units){

	// camera

	this.camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 1, 10000 );
	this.camera.position.set( 15, 20, 30 );
	scene.add( this.camera );


	//x
	var origin = new THREE.Vector3(0, 0, 0);
	var length = units;
	var hex = 0xffffff;
	var dir = new THREE.Vector3(1, 0, 0);
	var headWidth = 0.1*units


	var arrowX = new THREE.ArrowHelper(dir, origin, length, hex,headWidth);
	scene.add(arrowX);

	//y

	var arrowY = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, length, hex,headWidth);
	scene.add(arrowY);

	//z
	var arrowZ = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), origin, length, hex,headWidth);
	scene.add(arrowZ);

 // 	var gridHelper_x_y = new THREE.GridHelper( 20, 20, 0x2C2C2C, 0x888888 );
	// scene.add(gridHelper_x_y);

	this.gridHelper_x_y = new THREE.GridHelper( units, 20, 0x222222, 0x222222 );
 	this.gridHelper_x_y.rotation.x=(Math.PI/2)
 	this.gridHelper_x_y.position.x=units/2
 	this.gridHelper_x_y.position.y=units/2
 	this.gridHelper_x_y.visible = true
	scene.add(this.gridHelper_x_y);


	this.gridHelper_z_y = new THREE.GridHelper( units, 20, 0x222222, 0x222222 );
 	this.gridHelper_z_y.rotation.z=(Math.PI/2)
 	this.gridHelper_z_y.position.z=units/2
 	this.gridHelper_z_y.position.y=units/2
 	this.gridHelper_z_y.visible = true
	scene.add(this.gridHelper_z_y);


	this.gridHelper_x_z = new THREE.GridHelper( units, 20, 0x222222, 0x222222 );
 	this.gridHelper_x_z.position.z=units/2
 	this.gridHelper_x_z.position.x=units/2
 	this.gridHelper_x_z.visible = true
	scene.add(this.gridHelper_x_z);




	this.xDiv = document.createElement( 'div' );
	this.xDiv.className = 'label';
	this.xDiv.textContent = 'x';
	this.xDiv.style.marginTop = '-1em';
	const xLabel = new THREE.CSS2DObject( this.xDiv );
	xLabel.position.set(0, units, 0 );
	arrowX.add( xLabel );

	this.yDiv = document.createElement( 'div' );
	this.yDiv.className = 'label';
	this.yDiv.textContent = 'y';
	this.yDiv.style.marginTop = '-1em';
	const yLabel = new THREE.CSS2DObject( this.yDiv );
	yLabel.position.set( 0, units, 0 );
	arrowY.add( yLabel );


	this.zDiv = document.createElement( 'div' );
	this.zDiv.className = 'label';
	this.zDiv.textContent = 'z';
	this.zDiv.style.marginTop = '-1em';
	const zLabel = new THREE.CSS2DObject( this.zDiv );
	zLabel.position.set( 0, units, 0 );
	arrowZ.add( zLabel );
}

Coordinate3D.prototype.showNet = function(show) {
	if(show){
 		this.gridHelper_x_y.visible = true
 		this.gridHelper_x_z.visible = true
 		this.gridHelper_z_y.visible = true

	}else{
 		this.gridHelper_x_y.visible = false
 		this.gridHelper_x_z.visible = false
 		this.gridHelper_z_y.visible = false

	}
};

Coordinate3D.prototype.x = function(name,length=-1){
	this.xDiv.textContent = name
	this.xLength = (length==-1?this.units:length)
	return this
}

Coordinate3D.prototype.y = function(name,length=-1){
	this.yDiv.textContent = name
	this.yLength = (length==-1?this.units:length)
	return this
}

Coordinate3D.prototype.z = function(name,length=-1){
	this.zDiv.textContent = name
	this.zLength = (length==-1?this.units:length)
	return this
}




function Coordinate2D(scene,units) {

	var scale = 200*(6/units)
	var cameraMove = 3*(units/6)
	//camera

	this.camera = new THREE.OrthographicCamera( window.innerWidth  / - scale, window.innerWidth / scale, window.innerHeight / scale, window.innerHeight  / - scale, -1000, 10000 )
	this.camera.position.set( cameraMove, cameraMove, 0.1 );
	this.camera.lookAt(new THREE.Vector3(cameraMove, cameraMove, 0))
	scene.add( this.camera );

	this.units = units
	this.xLength = units
	this.yLength = units

	this.xDiv = document.createElement( 'div' );
	this.xDiv.className = 'label';
	this.xDiv.textContent = 'x';
	this.xDiv.style.marginTop = '-1em';

	this.yDiv = document.createElement( 'div' );
	this.yDiv.className = 'label';
	this.yDiv.textContent = 'y';
	this.yDiv.style.marginTop = '-1em';
	this.arrowSplits = 20

	

	this.scene = scene
	



 	
}

Coordinate2D.prototype.showNet = function(show) {
	if(show){
 		this.gridHelper_x_y.visible = true
	}else{
 		this.gridHelper_x_y.visible = false

	}
};

Coordinate2D.prototype.x = function(name,length=-1){
	this.xDiv.textContent = name
	this.xLength = (length==-1?this.units:length)
	return this
}

Coordinate2D.prototype.y = function(name,length=-1){
	this.yDiv.textContent = name
	this.yLength = (length==-1?this.units:length)

	return this
}

Coordinate2D.prototype.show = function(){
	//x
	var origin = new THREE.Vector3(0, 0, 0);
	var length = units;
	var hex = 0xffffff;
	var dir = new THREE.Vector3(1, 0, 0);
	var headWidth = 0.1*units
	var arrowX = new THREE.ArrowHelper(dir, origin, this.xLength+3*units/this.arrowSplits, hex,headWidth);
	this.scene.add(arrowX);

	//y

	var arrowY = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, this.yLength+3*units/this.arrowSplits, hex,headWidth);
	this.scene.add(arrowY);

	this.gridHelper_x_y = new THREE.GridHelper( units, this.arrowSplits, 0x555555, 0x555555 );
 	this.gridHelper_x_y.rotation.x=(Math.PI/2)
 	this.gridHelper_x_y.position.z=-1
 	this.gridHelper_x_y.position.x=units/2
 	this.gridHelper_x_y.position.y=units/2
 	this.gridHelper_x_y.visible = true
	this.scene.add(this.gridHelper_x_y);

//x and y label
	
	this.xLabel = new THREE.CSS2DObject( this.xDiv );
	this.xLabel.position.set(0, units, 0 );


	
	this.yLabel = new THREE.CSS2DObject( this.yDiv );
	this.yLabel.position.set( 0, units, 0 );
	
	arrowX.add( this.xLabel );
	
	arrowY.add( this.yLabel );

	for (var i = 0;i<this.arrowSplits;i++){
		var v = document.createElement( 'div' );
		v.className = 'label';
		v.textContent = this.xLength*(i/this.arrowSplits);
		v.style.marginTop = '1em';
		var obj = new THREE.CSS2DObject( v )
		obj.position.set( 0, this.xLength*(i/this.arrowSplits), 0 );
		arrowX.add( obj );
	}

	for (var i = 0;i<this.arrowSplits;i++){
		var v = document.createElement( 'div' );
		v.className = 'label';
		v.textContent = this.yLength*(i/this.arrowSplits);
		v.style.marginLeft = '-1em';
		var obj = new THREE.CSS2DObject( v )
		obj.position.set( 0,this.yLength*(i/this.arrowSplits),0 );
		arrowY.add( obj );
	}
	


	return this
	
}

