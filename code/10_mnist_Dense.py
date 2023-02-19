
from tensorflow.keras.utils import to_categorical
import numpy as np
import matplotlib.pyplot as plt
from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import SGD
from keras.models import load_model
from keras.datasets import mnist

(X_train, Y_train), (X_test, Y_test) = mnist.load_data()


X_train = X_train.reshape(X_train.shape[0], -1)/255
X_test = X_test.reshape(X_test.shape[0], -1)/255

Y_train = to_categorical(Y_train, 10)
Y_test = to_categorical(Y_test, 10)


# 创建模型
model = Sequential()
model.add(Dense(units=256, activation='relu', input_dim=784))
model.add(Dense(units=256, activation='relu'))
model.add(Dense(units=256, activation='relu')) 
model.add(Dense(units=10, activation='softmax'))  # 输出层用softmax函数
model.compile(loss='categorical_crossentropy', optimizer=SGD(
    learning_rate=0.05), metrics=['accuracy'])  # 多分类问题使用交叉熵做代价函数
# 开始训练
model.fit(X_train, Y_train, epochs=5000, batch_size=2000, verbose=1)


# 训练完毕，查看loss和accuracy
loss, accuracy = model.evaluate(X_test, Y_test)
print(f"{loss=}")
print(f"{accuracy=}")
# 保存模型
model.save('./model/10_model.h5')
