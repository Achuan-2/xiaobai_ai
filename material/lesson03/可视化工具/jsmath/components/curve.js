function Curve(scene,func=null){
	
	this.geometry = new THREE.BufferGeometry()
	//.setFromPoints( points );
	 
	this.material = new THREE.LineBasicMaterial( { color : 0xff644e } );
	 
	this.func = func

	//default range
	this.start = -1
	this.end = 1
	// Create the final object to add to the scene
	
}

Curve.prototype.setCurve = function(func=null){
	var vecs = []
	
	for(var i=this.start;i<=this.end+0.1;i=i+0.1){
		var x = i 
		var y = i
		if(func != null){
			yz = func(x)
		}else{
			yz = {'y':0,'z':0}

		}

		vecs.push(new THREE.Vector3( x, yz['y'], yz['z'] ))

	}
	var curve = new THREE.CatmullRomCurve3(vecs );
	var points = curve.getPoints( 1000 );
	this.geometry.setFromPoints( points );
}

Curve.prototype.range = function(start,end){
	this.start = start
	this.end = end
	return this

}

Curve.prototype.show = function(coordinate=undefined){
	this.setCurve(this.func)
	this.curveObject = new THREE.Line( this.geometry, this.material );
	if(coordinate !== undefined){
		this.curveObject.position.x = coordinate.yOrigin.x
		this.curveObject.position.y = coordinate.xOrigin.y


	}
	scene.add(this.curveObject)
	return this
}

Curve.prototype.remove = function(){
	scene.remove(this.curveObject)
	return this
}


Curve.prototype.showContour = function(){
	var pCounts = this.points.length
	var linePoints = []

	var starsGeometry = new THREE.Geometry();

	for (var i=0;i<pCounts;i++){
		var point = this.points[i]
		//console.log(Math.abs(point['y'] - 0.5))
		if(Math.abs(point['y']-0.5)>0.01){
			continue
		}
		starsGeometry.vertices.push(point)

	}


	
	


	var starsMaterial = new THREE.PointsMaterial( { color: 0xff0000,size:0.1 } );

	var starField = new THREE.Points( starsGeometry, starsMaterial );

	//this.scene.add(starField);

}