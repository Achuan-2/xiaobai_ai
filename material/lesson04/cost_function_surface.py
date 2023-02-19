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

#把ws和bs变成一个网格矩阵
#这个网格矩阵的含义可以参考这篇文章:
#https://blog.csdn.net/lllxxq141592654/article/details/81532855
ws,bs = np.meshgrid(ws,bs)
print(ws)#打印出来瞅瞅
print(bs)


es = 0
#因为ws和bs已经变成了网格矩阵了
#一次性带入全部计算，我们需要一个一个的算
for i in range(m):
	y_pre = ws*xs[i]+bs#取出一个样本在网格矩阵上计算，得到一个预测矩阵
	e = (ys[i]-y_pre)**2#标准值减去预测（矩阵）得到方差矩阵
	es += e#把单样本上的方差矩阵不断累加到es上
es = es/m#求平均值，这样es方差矩阵每个点的位置就是对应的ws和bs矩阵每个点位置预测得到的方差



fig = plt.figure()
ax = Axes3D(fig)

ax.set_zlim(0,2)

#plot_surface函数绘制曲面
#cmap='rainbow表示彩虹图（用不同的颜色表示不同值）
ax.plot_surface(ws, bs, es, cmap='rainbow')

#显示图像
plt.show()  