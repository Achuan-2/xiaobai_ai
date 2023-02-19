
import numpy as np
import matplotlib.pyplot as plt
from keras.models import Sequential
from keras.layers import Dense
from keras.models import load_model
from keras.datasets import mnist
from keras.layers import Conv2D
from keras.layers import AveragePooling2D,MaxPooling2D
from keras.layers import Flatten

(X_train, Y_train), (X_test, Y_test) = mnist.load_data()


X_train = X_train.reshape(X_train.shape[0], 28,28,1)/255.0
X_test = X_test.reshape(X_test.shape[0], 28,28,1)/255.0

# Y_train = to_categorical(Y_train, 10)
# Y_test = to_categorical(Y_test, 10)


# 创建模型
model = Sequential()
model.add(Conv2D(filters=32, kernel_size=(3, 3), strides=(
    1, 1), padding='valid', activation='relu', input_shape=(28, 28, 1)))
model.add(MaxPooling2D((2, 2)))
model.add(Conv2D(filters=64, kernel_size=(3, 3), strides=(
    1, 1), padding='valid', activation='relu'))
model.add(Conv2D(filters=64, kernel_size=(3, 3), strides=(
    1, 1), padding='valid', activation='relu'))
model.add(Flatten())
model.add(Dense(64, activation='relu'))
model.add(Dense(10, activation='softmax'))



model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
model.fit(X_train, Y_train, epochs=200, batch_size=32, verbose=1)


# 训练完毕，查看loss和accuracy
loss, accuracy = model.evaluate(X_test, Y_test)
print(f"{loss=}")
print(f"{accuracy=}")
# 保存模型
model.save('./model/11_CNN.h5')
