import matplotlib.pyplot as plt
import dataset
import numpy as np
from mpl_toolkits.mplot3d import Axes3D

#从数据中获取随机豆豆
m=100
xs,ys = dataset.get_beans(m)


#配置图像
plt.title("Size-Toxicity Function", fontsize=12)
plt.xlabel('Bean Size')
plt.ylabel('Toxicity')

# 豆豆毒性散点图
plt.scatter(xs, ys) 

#预测函数
w=0.1
b=0.1
y_pre = w*xs+b

#预测函数图像
plt.plot(xs,y_pre) 

#显示图像
plt.show()  




#代价函数
ws = np.arange(-1,2,0.1)
bs = np.arange(-2,2,0.1)


fig = plt.figure()
ax = Axes3D(fig)

ax.set_zlim(0,2)

for w in ws:#每次取不同的w
	es = []	
	for b in bs:
		y_pre = w*xs+b
		#得到w和b的关系
		e = (1/m)*np.sum((ys-y_pre)**2)
		es.append(e)
	#plt.plot(ws,es) 
	figure = ax.plot(bs, es, w, zdir='y')


#显示图像
plt.show()  