function Vector ( array=[] ) {

	this.array = array

}


Vector.prototype.multiply = function(vector) {
	if(vector.length != this.length){
		console.warn("vector length not match")
		return this
	}
	for(var i=0;i<this.array.length;i++){
		this.array[i] = this.array[i] * vector.array[i]

	}

	return this;
};
Vector.prototype.multiplyScalar = function(scalar) {
	for(var i=0;i<this.array.length;i++){
		this.array[i] = this.array[i] * scalar

	}

	return this;
};

Vector.prototype.length = function() {
	return array.length
};

Vector.prototype.sub = function(vector) {
	if(vector.length != this.length){
		console.warn("vector length not match")
		return this
	}
	for(var i=0;i<this.array.length;i++){
		this.array[i] = this.array[i] - vector.array[i]

	}

	return this;
};

Vector.prototype.sum = function() {
	var sum = 0
	for(var i=0;i<this.array.length;i++){
		sum += this.array[i]

	}

	return sum;
};

Vector.prototype.copy = function() {
	var copyVec = new Vector([])
	for(var i=0;i<this.array.length;i++){
		copyVec.array[i] = this.array[i]

	}

	return copyVec;
};

