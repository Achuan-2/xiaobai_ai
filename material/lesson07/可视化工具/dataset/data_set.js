function get_beans(counts){
	var beans=[]
	Math.seedrandom('hello.');
	
	for(var i=0.1;i<counts;i++){
		var x = Math.random()*2
		var z = Math.random()*2
		var y = 0
		if((x-0.5*z-0.1)>0){
			y = 1
		}
		var vec = new THREE.Vector3(x,y,z)
		beans.push(vec)
	}
	return beans
}

function get_beans2(counts){
	var beans=[]
	Math.seedrandom('1');
	
	for(var i=0.1;i<counts;i++){
		var x = Math.random()*2
		var z = Math.random()*2
		var y = 0
		if(Math.pow(x-1,2)+Math.pow(z-0.3,2)<0.5){
			y = 1

		}
		// if(x>z*z-1*z+0.6){
		// 	y = 1
		// }
		var vec = new THREE.Vector3(x,y,z)
		beans.push(vec)
	}
	return beans
}

function get_beans3(counts){
	var beans=[]
	Math.seedrandom('1');
	
	for(var i=0.1;i<counts;i++){
		var x = Math.random()*2
		var z = Math.random()*2
		var y = 0
		if(Math.pow(x-1,2)+Math.pow(z-1,2)<0.2){
			y = 1

		}
		// if(x>z*z-1*z+0.6){
		// 	y = 1
		// }
		var vec = new THREE.Vector3(x,y,z)
		beans.push(vec)
	}
	return beans
}

function classifyTwoGaussData(numSamples=100, noise=0){
  let points = [];

  // let varianceScale = d3.scale.linear().domain([0, .5]).range([0.5, 4]);
  // let variance = varianceScale(noise);
  let variance = 0.02

  function genGauss(cx=0, cy=0, label=0) {
    for (let i = 0; i < numSamples / 2; i++) {
      let x = normalRandom(cx, variance);
      let y = normalRandom(cy, variance);
      var point = new THREE.Vector3(x,label,y)
      points.push(point);
    }
  }

  genGauss(1.4, 1.4, 1); // Gaussian with positive examples.
  genGauss(0.6, 0.6, 0); // Gaussian with negative examples.
  return points;
}

function classifyCircleData(numSamples=100, noise=0){
  let points = [];
  let radius = 1;
  function getCircleLabel(p, center) {
    return (dist(p, center) < (radius * 0.5)) ? 1 : 0;
  }

  // Generate positive points inside the circle.
  for (let i = 0; i < numSamples / 2; i++) {
    let r = randUniform(0, radius * 0.5);
    let angle = randUniform(0, 2 * Math.PI);
    let x = r * Math.sin(angle);
    let y = r * Math.cos(angle);
    let noiseX = randUniform(-radius, radius) * noise;
    let noiseY = randUniform(-radius, radius) * noise;
    let label = getCircleLabel({x: x + noiseX, y: y + noiseY}, {x: 0, y: 0});
    var point = new THREE.Vector3(x+1,label,y+1)
    points.push(point);
  }

  // Generate negative points outside the circle.
  for (let i = 0; i < numSamples / 2; i++) {
    let r = randUniform(radius * 0.7, radius);
    let angle = randUniform(0, 2 * Math.PI);
    let x = r * Math.sin(angle);
    let y = r * Math.cos(angle);
    let noiseX = randUniform(-radius, radius) * noise;
    let noiseY = randUniform(-radius, radius) * noise;
    let label = getCircleLabel({x: x + noiseX, y: y + noiseY}, {x: 0, y: 0});
    var point = new THREE.Vector3(x+1,label,y+1)
    points.push(point);
  }
  return points;
}

function classifyXORData(numSamples=100, noise=0) {
  function getXORLabel(p=Point) { return p.x * p.y >= 0 ? 1 : 0; }

  let points= [];
  for (let i = 0; i < numSamples; i++) {
    let x = randUniform(-1, 1);
    let padding = 0.01;
    x += x > 0 ? padding : -padding;  // Padding.
    let y = randUniform(-1, 1);
    y += y > 0 ? padding : -padding;
    let noiseX = randUniform(-1, 1) * noise;
    let noiseY = randUniform(-1, 1) * noise;
    let label = getXORLabel({x: x + noiseX, y: y + noiseY});
    var point = new THREE.Vector3(x+1,label,y+1)
    points.push(point);
  }
  return points;
}


function classifySpiralData(numSamples=100, noise=0){
  let points = [];
  let n = numSamples / 2;

  function genSpiral(deltaT=0, label=0) {
    for (let i = 0; i < n; i++) {
		let r = i / n * 1;
		let t = 1.75 * i / n * 2 * Math.PI + deltaT;
		let x = r * Math.sin(t) + randUniform(-1, 1) * noise;
		let y = r * Math.cos(t) + randUniform(-1, 1) * noise;
		var point = new THREE.Vector3(x+1,label,y+1)
		points.push(point);

    }
  }

  genSpiral(0, 1); // Positive examples.
  genSpiral(Math.PI, 0); // Negative examples.
  return points;
}


function normalRandom(mean = 0, variance = 1) {
  let v1, v2, s;
  do {
    v1 = 2 * Math.random() - 1;
    v2 = 2 * Math.random() - 1;
    s = v1 * v1 + v2 * v2;
  } while (s > 1);

  let result = Math.sqrt(-2 * Math.log(s) / s) * v1;
  return mean + Math.sqrt(variance) * result;
}


function randUniform(a=-1, b=1) {
  return Math.random() * (b - a) + a;
}

function dist(a, b){
  let dx = a.x - b.x;
  let dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

