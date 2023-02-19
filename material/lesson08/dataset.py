import numpy as np

def get_beans(counts):
	xs = np.random.rand(counts,2)*2
	ys = np.zeros(counts)
	for i in range(counts):
		x = xs[i]
		if (x[0]-0.5*x[1]-0.1)>0:
			ys[i] = 1
	return xs,ys

def get_beans1(counts):
	xs = np.random.rand(counts)
	xs = np.sort(xs)
	ys = np.zeros(counts)
	for i in range(counts):
		x = xs[i]
		yi = 0.7*x+(0.5-np.random.rand())/50+0.5
		if yi > 0.8:
			ys[i] = 1
		else:
			ys[i] = 0
	return xs,ys

def get_beans2(counts):
	xs = np.random.rand(counts)*2
	xs = np.sort(xs)
	ys = np.zeros(counts)
	for i in range(counts):
		x = xs[i]
		yi = 0.7*x+(0.5-np.random.rand())/50+0.5
		if yi > 0.8 and yi < 1.4:
			ys[i] = 1


	return xs,ys

def get_beans3(counts):
	xs = np.random.rand(counts)*2
	xs = np.sort(xs)
	ys = np.zeros(counts)
	for i in range(counts):
		x = xs[i]
		yi = 0.7*x+(0.5-np.random.rand())/50+0.5
		if yi > 0.8 and yi < 1.4:
			ys[i] = 1

		if yi > 1.6 and yi < 1.8:
			ys[i] = 1
	return xs,ys

def get_beans4(counts):
	xs = np.random.rand(counts,2)*2
	ys = np.zeros(counts)
	for i in range(counts):
		x = xs[i]
		if (np.power(x[0]-1,2)+np.power(x[1]-0.3,2))<0.5:
			ys[i] = 1


	return xs,ys
