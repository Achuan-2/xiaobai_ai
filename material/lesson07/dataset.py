import numpy as np

def get_beans(counts):
	xs = np.random.rand(counts,2)*2
	ys = np.zeros(counts)
	for i in range(counts):
		x = xs[i]
		if (x[0]-0.5*x[1]-0.1)>0:
			ys[i] = 1
	return xs,ys

def get_beans2(counts):
	xs = np.random.rand(counts,2)*2
	ys = np.zeros(counts)
	for i in range(counts):
		x = xs[i]
		if (np.power(x[0]-1,2)+np.power(x[1]-0.3,2))<0.5:
			ys[i] = 1


	return xs,ys

