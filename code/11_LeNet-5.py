import numpy as np
import matplotlib.pyplot as plt
from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import SGD
from keras.models import load_model
from keras.datasets import mnist
from tensorflow.keras.utils import to_categorical
from keras.layers import Conv2D
from keras.layers import AveragePooling2D
from keras.layers import Flatten

(X_train, Y_train), (X_test, Y_test) = mnist.load_data()


X_train = X_train.reshape(X_train.shape[0], 28,28,1)/255.0
X_test = X_test.reshape(X_test.shape[0], 28,28,1)/255.0

Y_train = to_categorical(Y_train, 10)
Y_test = to_categorical(Y_test, 10)


# 创建模型
model = Sequential()
""" 
strides = (1,1)：每次滑动步长为1
padding ='valid'不加填充 / 'same' 填充前后不变
"""
model.add(Conv2D(filters=6, kernel_size=(5,5), strides=(1,1),padding='valid',activation='relu', input_shape=(28,28,1)))
model.add(AveragePooling2D(pool_size=(2,2))) # 平均池化层
model.add(Conv2D(filters=16, kernel_size=(5,5), strides=(1,1),padding='valid',activation='relu'))
model.add(AveragePooling2D(pool_size=(2,2)))
model.add(Flatten())
model.add(Dense(units=120, activation='relu'))
model.add(Dense(units=84, activation='relu'))
model.add(Dense(units=10, activation='softmax'))  # 输出层用softmax函数,做多分类

# 送入训练
model.compile(loss='categorical_crossentropy', optimizer=SGD(
    learning_rate=0.05), metrics=['accuracy'])  # 多分类问题使用交叉熵做代价函数
model.fit(X_train, Y_train, epochs=3000, batch_size=4096, verbose=1)


# 训练完毕，查看loss和accuracy
loss, accuracy = model.evaluate(X_test, Y_test)
print(f"{loss=}")
print(f"{accuracy=}")
# 保存模型
model.save('./model/11_LeNet-2.h5')
