function Curve(scene,func=null){
	
	this.geometry = new THREE.BufferGeometry()
	//.setFromPoints( points );
	this.color=0xff644e
	 
	 
	this.func = func

	//default range
	this.start = -1
	this.end = 1
	// Create the final object to add to the scene
	
}

Curve.prototype.setCurve = function(func=null){
	var vecs = []
	
	for(var i=this.start;i<=this.end+0.1;i=i+0.1){
		var z = i 
		var y = i
		if(func != null){
			xy = func(z)
		}
		vecs.push(new THREE.Vector3( xy['x'], xy['y'], z ))
	}
	var curve = new THREE.CatmullRomCurve3(vecs );
	var points = curve.getPoints( 1000 );
	this.geometry.setFromPoints( points );
}

Curve.prototype.setColor = function(color){
	this.color = color
	return this

}

Curve.prototype.range = function(start,end){
	this.start = start
	this.end = end
	return this

}

Curve.prototype.show = function(){
	this.material = new THREE.LineBasicMaterial( { color : this.color,linewidth: 6 } );
	this.setCurve(this.func)
	this.curveObject = new THREE.Line( this.geometry, this.material );
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