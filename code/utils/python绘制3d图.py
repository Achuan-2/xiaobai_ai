# 3D绘图示意
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
fig = plt.figure()
ax = Axes3D(fig)

x = np.arange(-4, 4, 0.25)
y = np.arange(-4, 4, 0.25)
x, y = np.meshgrid(x, y)
r = np.sqrt(x**2 + y**2)
z = np.sin(r)

ax.plot_surface(x, y, z, rstride=1,   # row 行步长
                cstride=2,           # colum 列步长
                cmap=plt.cm.hot)      # 渐变颜色
ax.contourf(x, y, z,
            zdir='z',  # 使用数据方向
            offset=-2,  # 填充投影轮廓位置
            cmap=plt.cm.hot)
ax.set_zlim(-2, 2)

plt.show()
