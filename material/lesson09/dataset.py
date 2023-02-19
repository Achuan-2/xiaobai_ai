import numpy as np
import random

def get_beans(counts):
	posX,posY = genSpiral(int(counts/2),0,1)
	negX,negY = genSpiral(int(counts/2),np.pi,0)
	X = np.vstack((posX,negX))
	Y = np.hstack((posY,negY))
	return X,Y

def genSpiral(counts,deltaT, label):
	X = np.zeros((counts,2))
	Y = np.zeros(counts)
	for i in range(counts):
		r = i / counts * 5
		t = 1.75 * i / counts * 2 * np.pi + deltaT;
		x1 = r * np.sin(t) + random.uniform(-0.1,0.1)
		x2 = r * np.cos(t) + random.uniform(-0.1,0.1)
		X[i] = np.array([x1,x2])
		Y[i] = label
	return X,Y 

def dist(a, b):
	dx = a['x'] - b['x'];
	dy = a['y']- b['y'];
	return np.sqrt(dx * dx + dy * dy);
def getCircleLabel(p, center):
	radius = 1;
	if dist(p, center) < (radius * 0.5):
		return 1
	else:
		return 0

def randUniform(a=-1, b=1):
  return np.random.rand() * (b - a) + a;

def classifyCircleData(numSamples=100, noise=0):
	points = [];
	Y = []
	X = []
	radius = 1;
	num = int(numSamples/2)
	for i in range(num):
		r = randUniform(0, radius * 0.5);
		angle = randUniform(0, 2 * np.pi);
		x = r * np.sin(angle);
		y = r * np.cos(angle);
		noiseX = randUniform(-radius, radius) * noise;
		noiseY = randUniform(-radius, radius) * noise;
		label = getCircleLabel({'x': x + noiseX, 'y': y + noiseY}, {'x': 0, 'y': 0});
		X.append([x+1,y+1])
		Y.append(label)
  

	for i in range(num):
		r = randUniform(radius * 0.7, radius);
		angle = randUniform(0, 2 * np.pi);
		x = r * np.sin(angle);
		y = r * np.cos(angle);
		noiseX = randUniform(-radius, radius) * noise;
		noiseY = randUniform(-radius, radius) * noise;
		label = getCircleLabel({'x': x + noiseX, 'y': y + noiseY}, {'x': 0, 'y': 0});
		X.append([x+1,y+1])
		Y.append(label)

	X = np.array(X)
	Y = np.array(Y)

	return X,Y
    