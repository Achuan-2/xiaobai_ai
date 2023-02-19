import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np
from keras.models import Sequential#导入keras


def show_scatter_curve(X,Y,pres):
	plt.scatter(X, Y) 
	plt.plot(X, pres) 
	plt.show()

def show_scatter(X,Y):
	if X.ndim>1:
		show_3d_scatter(X,Y)
	else:
		plt.scatter(X, Y) 
		plt.show()


def show_3d_scatter(X,Y):
	x = X[:,0]
	z = X[:,1]
	fig = plt.figure()
	ax = Axes3D(fig)
	ax.scatter(x, z, Y)
	plt.show()

def show_surface(x,z,forward_propgation):
	x = np.arange(np.min(x),np.max(x),0.1)
	z = np.arange(np.min(z),np.max(z),0.1)
	x,z = np.meshgrid(x,z)
	y = forward_propgation(X)
	fig = plt.figure()
	ax = Axes3D(fig)
	ax.plot_surface(x, z, y, cmap='rainbow')
	plt.show()



def show_scatter_surface(X,Y,forward_propgation):
	if type(forward_propgation) == Sequential:
		show_scatter_surface_with_model(X,Y,forward_propgation)
		return
	x = X[:,0]
	z = X[:,1]
	y = Y

	fig = plt.figure()
	ax = Axes3D(fig)
	ax.scatter(x, z, y)

	x = np.arange(np.min(x),np.max(x),0.1)
	z = np.arange(np.min(z),np.max(z),0.1)
	x,z = np.meshgrid(x,z)

	X = np.column_stack((x[0],z[0]))
	for j in range(z.shape[0]):
		if j == 0:
			continue
		X = np.vstack((X,np.column_stack((x[0],z[j]))))

	r = forward_propgation(X)
	y = r[0]
	if type(r) == np.ndarray:
		y = r

	
	y = np.array([y])
	y = y.reshape(x.shape[0],z.shape[1])
	ax.plot_surface(x, z, y, cmap='rainbow')
	plt.show()

def show_scatter_surface_with_model(X,Y,model):
	#model.predict(X)

	x = X[:,0]
	z = X[:,1]
	y = Y

	fig = plt.figure()
	ax = Axes3D(fig)
	ax.scatter(x, z, y)

	x = np.arange(np.min(x),np.max(x),0.1)
	z = np.arange(np.min(z),np.max(z),0.1)
	x,z = np.meshgrid(x,z)



	X = np.column_stack((x[0],z[0]))

	for j in range(z.shape[0]):
		if j == 0:
			continue
		X = np.vstack((X,np.column_stack((x[0],z[j]))))

	y = model.predict(X)
	
	# return
	# y = model.predcit(X)
	y = np.array([y])
	y = y.reshape(x.shape[0],z.shape[1])
	ax.plot_surface(x, z, y, cmap='rainbow')
	plt.show()

def pre(X,Y,model):
	model.predict(X)