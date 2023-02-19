function get_beans(){
	var vecs=[]
	Math.seedrandom('hello.');
	for(var i=0.1;i<0.2;i=i+0.1){
		var x = i
		var y = 0.7*x+(0.5-Math.random(5))/5+0.5
		var vec = new THREE.Vector2(x,y)
		vecs.push(vec)
	}
	return vecs
}

function get_class_middle_beans(size){
	var vecs=[]
	//Math.seedrandom('hello.');
	var step = 0.1
	var end = size*step
	for(var i=0;i<end;i=i+step+Math.random()/100){
		var x = i
		var yi = 0.7*x+(0.5-Math.random())/50+0.5
		var y = 0
		if (yi > 0.8 && yi < 1.4){
			y = 1
		}
		// if(x<end*2/3 && x>end/3){
		// 	y=1
		// }
		var vec = new THREE.Vector2(x,y)
		vecs.push(vec)
	}
	return vecs
}