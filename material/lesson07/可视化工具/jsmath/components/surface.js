function Surface(scene,func=null){
	this.points = []
	var other = this
	this.func = func
	this.scene = scene
	this.xRange = [-1,1]
	this.zRange = [-1,1]
	this.contours = []
	this.opacity = 1

	
}
Surface.prototype.range = function(xRange,zRange){
	this.xRange = xRange
	this.zRange = zRange
	return this

}

Surface.prototype.show = function(){
	this.update()
	
	return this
}

Surface.prototype.update = function(func=undefined) {
	scene.remove(this.planeMesh);

	if(func){
		this.func = func
	}
	var other = this
	function surfaceFunc(u,v, target) {
		//console.log(u+":"+v)
		var xLen = other.xRange[1]-other.xRange[0]
		var zLen = other.zRange[1]-other.zRange[0]
		var uMiddle = (other.xRange[1]+other.xRange[0])/2*(xLen)
		var vMiddle = (other.zRange[1]+other.zRange[0])/2*(zLen)



        var k = 1;//x、y取值范围
        var x = other.xRange[0]+u * xLen;
        var z = other.zRange[0]+v * zLen;
        var y = x+z
        //var y = Math.pow(a, 2) * (Math.pow(x, 2) + Math.pow(z, 2));
        if(other.func != null){
        	y = other.func(x,z)
        }
        

        target.set(x, y, z);

        other.points.push({'x':x,'y':y,'z':z})
	        
	}

	var planeGeometry = new THREE.ParametricGeometry(surfaceFunc, 100, 100);
	this.planeMaterial = new THREE.MeshPhongMaterial({
		color:0x22ffff,//三角面颜色
		side:THREE.DoubleSide,//两面可见
		transparent:true
	});
	this.planeMaterial.opacity = this.opacity

	// 线条模式渲染
	this.planeMaterial.wireframe  = false;

	this.planeMesh = new THREE.Mesh(planeGeometry, this.planeMaterial);
	scene.add(this.planeMesh);

	if(this.func){
		this.hiddenContour()
		this.showContour(0.5)
	}
	return this

};
Surface.prototype.setOpacity  = function(value) {
	this.opacity = value
	this.planeMaterial.opacity = value
	return this
};

Surface.prototype.setColor = function(color){
	this.planeMaterial.color.set(color)
}

Surface.prototype.hiddenContour = function() {
	for(var i=0;i<this.contours.length;i++){
		this.scene.remove(this.contours[i])
	}
	this.contours = []
	
};

//Marching squares算法
Surface.prototype.showContour = function(value){
	//pickup uv points
	var basePoints = []
	for(var i=0;i<this.points.length;i+=3){
		//console.log("x:"+this.points[i].x+",z:"+this.points[i].z)
		basePoints.push(this.points[i])
	}
	var n = Math.sqrt(basePoints.length)
	console.log("n:"+n)
	var contourPoints = []
	var step = 0.005

	var linePoints = []
	var count =0
	for(var i=this.zRange[0];i<this.zRange[1];i+=step){
		for(var j=this.xRange[0];j<this.xRange[1];j+=step){
			count++

			var pStartX = undefined
			var pStartY 
			var pStartZ
			var pEndX 
			var pEndY 
			var pEndZ
			
			var point = new THREE.Vector3(j,this.func(j,i),i)
			var rightPoint =new THREE.Vector3(j+step,this.func(j+step,i),i)
			var topPoint = new THREE.Vector3(j,this.func(j,i+step),i+step)
			var topRightPoint = new THREE.Vector3(j+step,this.func(j+step,i+step),i+step)


			//1 1
			//0 0
			if(topPoint.y>value&&topRightPoint.y>value&&point.y<value&&rightPoint.y<value){
				pStartZ = point.z+(topPoint.z-point.z)/2
				pStartX = point.x
				pStartY = this.func(pStartX,pStartZ)

				pEndZ = pStartZ
				pEndX = rightPoint.x
				pEndY = this.func(pEndX,pEndZ)
				var geometry = new THREE.Geometry()
				geometry.vertices.push( new THREE.Vector3(pStartX,pStartY,pStartZ));
				geometry.vertices.push( new THREE.Vector3(pEndX,pEndY,pEndZ));
				// lines
				var material = new THREE.LineBasicMaterial( { color : 0xff644e } );
				var line2d = new THREE.Line( geometry, material );
				//line2d.position.set( 0, 0, 0 );
				this.scene.add( line2d );
				this.contours.push(line2d)


			}
			//0 0
			//1 1
			if(topPoint.y<value&&topRightPoint.y<value&&point.y>value&&rightPoint.y>value){
				pStartZ = point.z+(topPoint.z-point.z)/2
				pStartX = point.x
				pStartY = this.func(pStartX,pStartZ)

				pEndZ = pStartZ
				pEndX = rightPoint.x
				pEndY = this.func(pEndX,pEndZ)
				var geometry = new THREE.Geometry()
				geometry.vertices.push( new THREE.Vector3(pStartX,pStartY,pStartZ));
				geometry.vertices.push( new THREE.Vector3(pEndX,pEndY,pEndZ));
				// lines
				var material = new THREE.LineBasicMaterial( { color : 0xff644e } );
				var line2d = new THREE.Line( geometry, material );
				//line2d.position.set( 0, 0, 0 );
				this.scene.add( line2d );
				this.contours.push(line2d)


			}

			//1 0
			//1 0
			if(topPoint.y>value&&topRightPoint.y<value&&point.y>value&&rightPoint.y<value){
				pStartX = point.x+(rightPoint.x-point.x)/2
				pStartZ = point.z
				pStartY = this.func(pStartX,pStartZ)

				pEndX = pStartX
				pEndZ = topPoint.z
				pEndY = this.func(pEndX,pEndZ)
				var geometry = new THREE.Geometry()
				geometry.vertices.push( new THREE.Vector3(pStartX,pStartY,pStartZ));
				geometry.vertices.push( new THREE.Vector3(pEndX,pEndY,pEndZ));
				// lines
				var material = new THREE.LineBasicMaterial( { color : 0xff644e } );
				var line2d = new THREE.Line( geometry, material );
				//line2d.position.set( 0, 0, 0 );
				this.scene.add( line2d );
				this.contours.push(line2d)


			}

			//0 1
			//0 1
			if(topPoint.y<value&&topRightPoint.y>value&&point.y<value&&rightPoint.y>value){
				pStartX = point.x+(rightPoint.x-point.x)/2
				pStartZ = point.z
				pStartY = this.func(pStartX,pStartZ)

				pEndX = pStartX
				pEndZ = topPoint.z
				pEndY = this.func(pEndX,pEndZ)
				var geometry = new THREE.Geometry()
				geometry.vertices.push( new THREE.Vector3(pStartX,pStartY,pStartZ));
				geometry.vertices.push( new THREE.Vector3(pEndX,pEndY,pEndZ));
				// lines
				var material = new THREE.LineBasicMaterial( { color : 0xff644e } );
				var line2d = new THREE.Line( geometry, material );
				//line2d.position.set( 0, 0, 0 );
				this.scene.add( line2d );
				this.contours.push(line2d)



			}

			//1 1  0 0
			//1 0  0 1
			if(topPoint.y>value&&topRightPoint.y>value&&point.y>value&&rightPoint.y<value||
				topPoint.y<value&&topRightPoint.y<value&&point.y<value&&rightPoint.y>value

				){
				pStartX = point.x+(rightPoint.x-point.x)/2
				pStartZ = point.z
				pStartY = this.func(pStartX,pStartZ)

				pEndX = rightPoint.x
				pEndZ = rightPoint.z+(topRightPoint.z-rightPoint.z)/2
				pEndY = this.func(pEndX,pEndZ)
				var geometry = new THREE.Geometry()
				geometry.vertices.push( new THREE.Vector3(pStartX,pStartY,pStartZ));
				geometry.vertices.push( new THREE.Vector3(pEndX,pEndY,pEndZ));
				// lines
				var material = new THREE.LineBasicMaterial( { color : 0xff644e } );
				var line2d = new THREE.Line( geometry, material );
				//line2d.position.set( 0, 0, 0 );
				this.scene.add( line2d );
				this.contours.push(line2d)



			}
			//1 0  0 1
			//1 1  0 0
			if(topPoint.y>value&&topRightPoint.y<value&&point.y>value&&rightPoint.y>value||
				topPoint.y<value&&topRightPoint.y>value&&point.y<value&&rightPoint.y<value

				){
				pStartX = rightPoint.x
				pStartZ = rightPoint.z+(topRightPoint.z-rightPoint.z)/2
				pStartY = this.func(pStartX,pStartZ)

				pEndX = point.x+(rightPoint.x-point.x)/2
				pEndZ = topPoint.z
				pEndY = this.func(pEndX,pEndZ)
				var geometry = new THREE.Geometry()
				geometry.vertices.push( new THREE.Vector3(pStartX,pStartY,pStartZ));
				geometry.vertices.push( new THREE.Vector3(pEndX,pEndY,pEndZ));
				// lines
				var material = new THREE.LineBasicMaterial( { color : 0xff644e } );
				var line2d = new THREE.Line( geometry, material );
				//line2d.position.set( 0, 0, 0 );
				this.scene.add( line2d );
				this.contours.push(line2d)



			}
			//0 1     1 0
			//1 1	  0 0
			if(topPoint.y<value&&topRightPoint.y>value&&point.y>value&&rightPoint.y>value||
				topPoint.y>value&&topRightPoint.y<value&&point.y<value&&rightPoint.y<value

				){
				pStartX = point.x
				pStartZ = point.z+(topPoint.z-point.z)/2
				pStartY = this.func(pStartX,pStartZ)

				pEndX = point.x+(rightPoint.x-point.x)/2
				pEndZ = topPoint.z
				pEndY = this.func(pEndX,pEndZ)
				var geometry = new THREE.Geometry()
				geometry.vertices.push( new THREE.Vector3(pStartX,pStartY,pStartZ));
				geometry.vertices.push( new THREE.Vector3(pEndX,pEndY,pEndZ));
				// lines
				var material = new THREE.LineBasicMaterial( { color : 0xff644e } );
				var line2d = new THREE.Line( geometry, material );
				//line2d.position.set( 0, 0, 0 );
				this.scene.add( line2d );
				this.contours.push(line2d)



			}


			//1 1    0 0
			//0 1    1 0
			if(topPoint.y>value&&topRightPoint.y>value&&point.y<value&&rightPoint.y>value||
				topPoint.y<value&&topRightPoint.y<value&&point.y>value&&rightPoint.y<value
				){
				pStartX = point.x
				pStartZ = point.z+(topPoint.z-point.z)/2
				pStartY = this.func(pStartX,pStartZ)

				pEndX = point.x+(rightPoint.x-point.x)/2
				pEndZ = point.z
				pEndY = this.func(pEndX,pEndZ)
				var geometry = new THREE.Geometry()
				geometry.vertices.push( new THREE.Vector3(pStartX,pStartY,pStartZ));
				geometry.vertices.push( new THREE.Vector3(pEndX,pEndY,pEndZ));
				// lines
				var material = new THREE.LineBasicMaterial( { color : 0xff644e } );
				var line2d = new THREE.Line( geometry, material );
				//line2d.position.set( 0, 0, 0 );
				this.scene.add( line2d );
				this.contours.push(line2d)


			}

			if(pStartX != undefined){
				linePoints.push( new THREE.Vector3(pStartX,pStartY,pStartZ))

			}

		}


		
	}



	

	return this

}


Surface.prototype.remove = function(){
	this.hiddenContour()
	scene.remove(this.planeMesh)
	return this
}