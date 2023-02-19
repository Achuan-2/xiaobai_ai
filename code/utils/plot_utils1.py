import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np

def show_scatter(xs,y):
	x = xs[:,0]
	z = xs[:,1]
	fig = plt.figure()
	ax = Axes3D(fig)
	ax.scatter(x, z, y)
	plt.show()

def show_surface(x,z,forward_propgation):
	x = np.arange(np.min(x),np.max(x),0.1)
	z = np.arange(np.min(z),np.max(z),0.1)
	x,z = np.meshgrid(x,z)
	y = forward_propgation(x,z)
	fig = plt.figure()
	ax = Axes3D(fig)
	ax.plot_surface(x, z, y, cmap='rainbow')
	plt.show()



def show_scatter_surface(xs,y,forward_propgation):
	x = xs[:,0]
	z = xs[:,1]
	fig = plt.figure()
	ax = Axes3D(fig)
	ax.scatter(x, z, y)

	x = np.arange(np.min(x),np.max(x),0.01)
	z = np.arange(np.min(z),np.max(z),0.01)
	x,z = np.meshgrid(x,z)
	y = forward_propgation(x,z)
	
	ax.plot_surface(x, z, y, cmap='rainbow')
	plt.show()


