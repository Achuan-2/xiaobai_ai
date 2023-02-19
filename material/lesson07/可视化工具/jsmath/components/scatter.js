function Scatter(scene,xs,ys,size=0.01,coordinate=undefined){

	for(var i=0;i<xs.length;i++){
		var x = xs[i]
		var y = ys[i]
		var geometry = new THREE.SphereGeometry( size,50,50 );
		var material = new THREE.MeshBasicMaterial({color: 0xff8800,wireframe: false})
		var ball = new THREE.Mesh(geometry,material)
		ball.position.x = x
		ball.position.y = y

		if(coordinate !== undefined){
			ball.position.x += coordinate.yOrigin.x
			ball.position.y += coordinate.xOrigin.y
		}
		scene.add(ball)
	}	
}

function Scatter3D(scene,vecs,hook = undefined,size=0.01,coordinate=undefined){
	this.balls = []
	this.scene = scene
	for(var i=0;i<vecs.length;i++){
		var x = vecs[i]['x']
		var y = vecs[i]['y']
		var z = vecs[i]['z']

		var geometry = new THREE.SphereGeometry( size,50,50 );
		var material = new THREE.MeshBasicMaterial({color: 0xff8800,wireframe: false})
		var ball = new THREE.Mesh(geometry,material)
		ball.position.x = x
		ball.position.y = y
		ball.position.z = z


		if(coordinate !== undefined){
			ball.position.x += coordinate.yOrigin.x
			ball.position.y += coordinate.xOrigin.y
			ball.position.z += coordinate.xOrigin.z

		}
		if(hook != undefined){
			hook(i,ball)
		}
		scene.add(ball)
		this.balls.push(ball)
	}	
}

Scatter3D.prototype.remove = function() {
	for(var i=0;i<this.balls.length;i++){
		this.scene.remove(this.balls[i])

	}
	
};
