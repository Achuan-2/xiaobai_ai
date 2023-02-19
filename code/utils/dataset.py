import numpy as np
import random

def get_beans(counts):
	"""
	一个神经元，激活函数为y=wx+
	"""
	xs = np.random.rand(counts)
	xs = np.sort(xs)
	ys = [1.2*x+np.random.rand()/10 for x in xs]
	return xs,ys

def get_beans2(counts):
	"""
	一个神经元，激活函数为y=wx+b
	"""
	xs = np.random.rand(counts)
	xs = np.sort(xs)
	ys = np.array([(0.7*x+(0.5-np.random.rand())/5+0.5) for x in xs])
	return xs,ys

def get_beans3(counts):
	"""
	一个神经元，激活函数为sigmoid
	"""
	xs = np.random.rand(counts)
	xs = np.sort(xs)
	ys = np.zeros(counts)
	for i in range(counts):
		x = xs[i]
		yi = 0.7*x+(0.5-np.random.rand())/50+0.5
		if yi > 0.8:
			ys[i] = 1
	return xs,ys


def get_beans4(counts):
	"""
	一层隐藏层，激活函数为sigmoid
	"""
	xs = np.random.rand(counts)*2
	xs = np.sort(xs)
	ys = np.zeros(counts)
	for i in range(counts):
		x = xs[i]
		yi = 0.7*x+(0.5-np.random.rand())/50+0.5
		if yi > 0.8 and yi < 1.4:
			ys[i] = 1

	return xs, ys


def get_beans5(counts):
	"""
	二维特征，线性可分，一个神经元
	"""
	xs = np.random.rand(counts, 2)*2
	ys = np.zeros(counts)
	for i in range(counts):
		x = xs[i]
		if (x[0]-0.5*x[1]-0.1) > 0:
			ys[i] = 1
	return xs, ys


def get_beans6(counts):	
	"""
	二维特征，半圆，线性不可分，一层隐藏层，两个神经元
	"""
	xs = np.random.rand(counts, 2)*2
	ys = np.zeros(counts)
	for i in range(counts):
		x = xs[i]
		if (np.power(x[0]-1, 2)+np.power(x[1]-0.3, 2)) < 0.5:
			ys[i] = 1

	return xs, ys


def get_beans7(counts):
	"""
	二维特征，蚊香数据集
	"""
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
    