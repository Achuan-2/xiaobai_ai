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
 	this.gridHelper_x_y.visible = false
	scene.add(this.gridHelper_x_y);


	this.gridHelper_z_y = new THREE.GridHelper( units, 20, 0x222222, 0x222222 );
 	this.gridHelper_z_y.rotation.z=(Math.PI/2)
 	this.gridHelper_z_y.position.z=units/2
 	this.gridHelper_z_y.position.y=units/2
 	this.gridHelper_z_y.visible = false
	scene.add(this.gridHelper_z_y);


	this.gridHelper_x_z = new THREE.GridHelper( units, 20, 0x222222, 0x222222 );
 	this.gridHelper_x_z.position.z=units/2
 	this.gridHelper_x_z.position.x=units/2
 	this.gridHelper_x_z.visible = false
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

Coordinate3D.prototype.x = function(name,units=-1){
	this.xDiv.textContent = name
	//this.xLength = (length==-1?this.units:length)
	return this
}

Coordinate3D.prototype.y = function(name,units=-1){
	this.yDiv.textContent = name
	//this.yLength = (length==-1?this.units:length)

	return this
}

Coordinate3D.prototype.z = function(name,units=-1){
	this.zDiv.textContent = name
	//this.yLength = (length==-1?this.units:length)

	return this
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




function Coordinate2D(scene,units,camera=undefined) {

	var scale = 200*(6/units)
	var cameraMove = 3*(units/6)
	//camera
	if(camera == undefined){
		this.camera = new THREE.OrthographicCamera( window.innerWidth  / - scale, window.innerWidth / scale, window.innerHeight / scale, window.innerHeight  / - scale, -1000, 10000 )
		this.camera.position.set( cameraMove, cameraMove, 0.1 );
		this.camera.lookAt(new THREE.Vector3(cameraMove, cameraMove, 0))
		scene.add( this.camera );
	}

	

	this.units = units
	this.xLength = 2
	this.yLength = 2

	this.xDiv = document.createElement( 'div' );
	this.xDiv.className = 'label';
	this.xDiv.textContent = 'x';
	this.xDiv.style.fontSize   = '2em';

	this.xDiv.style.marginTop = '0em';
	this.xDiv.style.marginLeft = '3em';


	this.yDiv = document.createElement( 'div' );
	this.yDiv.className = 'label';
	this.yDiv.textContent = 'y';
	this.yDiv.style.fontSize   = '2em';

	this.yDiv.style.marginTop = '-1em';
	this.arrowSplits = units/0.1
	this.xOrigin = new THREE.Vector3(0, 0, 0);
	this.yOrigin = new THREE.Vector3(0, 0, 0);
	this.xMarks = []
	this.yMarks = []


	

	this.scene = scene
	



 	
}

Coordinate2D.prototype.showNet = function(show) {
	if(show){
 		this.gridHelper_x_y.visible = true
	}else{
 		this.gridHelper_x_y.visible = false

	}
};

Coordinate2D.prototype.x = function(name,units=-1){
	this.xDiv.textContent = name
	//this.xLength = (length==-1?this.units:length)
	return this
}

Coordinate2D.prototype.y = function(name,units=-1){
	this.yDiv.textContent = name
	//this.yLength = (length==-1?this.units:length)

	return this
}
Coordinate2D.prototype.moveTo = function(xOrigin,yOrigin){
	this.xOrigin = xOrigin
	this.yOrigin = yOrigin

	return this


}

Coordinate2D.prototype.show = function(){
	//x
	var length = units;
	var hex = 0xffffff;
	var dir = new THREE.Vector3(1, 0, 0);
	var headWidth = 0.1*this.xLength
	this.arrowX = new THREE.ArrowHelper(dir, this.xOrigin, this.xLength*1.1, hex,headWidth);
	this.scene.add(this.arrowX);

	//y

	this.arrowY = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), this.yOrigin, this.yLength*1.1, hex,headWidth);
	this.scene.add(this.arrowY);

	this.gridHelper_x_y = new THREE.GridHelper( this.xLength, this.arrowSplits, 0x555555, 0x555555 );
 	this.gridHelper_x_y.rotation.x=(Math.PI/2)
 	this.gridHelper_x_y.position.z=-1
 	this.gridHelper_x_y.position.x=this.xOrigin.x+this.xLength/2
 	this.gridHelper_x_y.position.y=this.yOrigin.y+this.yLength/2
 	this.gridHelper_x_y.visible = true
	this.scene.add(this.gridHelper_x_y);

//x and y label
	
	this.xLabel = new THREE.CSS2DObject( this.xDiv );
	this.xLabel.position.set(0, this.xLength, 0 );


	
	this.yLabel = new THREE.CSS2DObject( this.yDiv );
	this.yLabel.position.set( 0, this.yLength, 0 );
	
	this.arrowX.add( this.xLabel );
	
	this.arrowY.add( this.yLabel );

	for (var i = 0;i<this.arrowSplits;i++){
		var v = document.createElement( 'div' );
		v.className = 'label';
		v.textContent = this.units*(i/this.arrowSplits);
		v.style.marginTop = '1em';
		var obj = new THREE.CSS2DObject( v )
		obj.position.set( 0, this.xLength*(i/this.arrowSplits), 0 );
		this.arrowX.add( obj );
		this.xMarks.push(obj)

	}

	for (var i = 0;i<this.arrowSplits;i++){
		var v = document.createElement( 'div' );
		v.className = 'label';
		v.textContent = this.units*(i/this.arrowSplits);
		v.style.marginLeft = '-1em';
		var obj = new THREE.CSS2DObject( v )
		obj.position.set( 0,this.yLength*(i/this.arrowSplits),0 );
		this.arrowY.add( obj );
		this.yMarks.push(obj)
	}
	


	return this
	
}

Coordinate2D.prototype.showMarks = function(show){
	for(var i=0;i<this.xMarks.length;i++){
		//this.xMarks[i].visible = show
		if(!show){
			this.arrowX.remove(this.xMarks[i])
		}
	}

	for(var i=0;i<this.yMarks.length;i++){
		//this.yMarks[i].visible = show
		if(!show){
			this.arrowY.remove(this.yMarks[i])
		}

	}

	return this


}

