function get_beans(){
	var vecs=[]
	for(var i=0.1;i<2;i=i+0.1){
		var x = i
		var y = 0.7*x+(0.5-Math.random(5))/5+0.5
		var vec = new THREE.Vector2(x,y)
		vecs.push(vec)
	}
	return vecs

}