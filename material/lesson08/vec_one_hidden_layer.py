import dataset
import plot_utils

import numpy as np
#从数据中获取随机豆豆
m=100
X,Y = dataset.get_beans4(m)
print(X)
print(Y)

plot_utils.show_scatter(X, Y)

W1 = np.random.rand(2,2)
B1 = np.random.rand(1,2)
W2 = np.random.rand(1,2)
B2 = np.random.rand(1,1)


def forward_propgation(X):

	#Z1:(m,2)
	Z1 = X.dot(W1.T) + B1

	#A1:(m,2)
	A1 = 1/(1+np.exp(-Z1))
	#Z2:(m,1)
	Z2 = A1.dot(W2.T) + B2
	#A2:(m,1)
	A2 = 1/(1+np.exp(-Z2))
	return A2,Z2,A1,Z1

plot_utils.show_scatter_surface(X, Y,forward_propgation)


for _ in range(5000):
	for i in range(m):
		Xi = X[i]

		Yi = Y[i]
		A2,Z2,A1,Z1 = forward_propgation(Xi)


		E = (Yi - A2)**2


		#(1,1)
		dEdA2 = -2*(Yi-A2)
		#(1,1)
		dEdZ2 = dEdA2*A2*(1-A2)

		

		#(1,2)
		dEdW2 = dEdZ2*A1
		#(1,1)
		dEdB2 = dEdZ2*1

		#(1,2)
		dEdA1 = dEdZ2*W2

		#(1,2)
		dEdZ1 = dEdA1*A1*(1-A1)


		dEdW1 = (dEdZ1.T).dot(np.array([Xi]))




		dEdB1 = dEdZ1*1

		

		
		alpha = 0.05
		W2 = W2 - alpha*dEdW2
		B2 = B2 - alpha*dEdB2

		W1 = W1 - alpha*dEdW1

		B1 = B1 - alpha*dEdB1
	#计算准确率

	A2,Z2,A1,Z1 = forward_propgation(X)
	A2 = np.around(A2)#四舍五入取出0.5分割线左右的分类结果
	A2 = A2.reshape(1,m)[0]
	accuracy = np.mean(np.equal(A2,Y))
	print("准确率："+str(accuracy))

plot_utils.show_scatter_surface(X, Y,forward_propgation)














