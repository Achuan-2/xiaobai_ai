
from keras.models import load_model
import utils.shopping_data as shopping_data
from keras_preprocessing import sequence
from keras.models import Sequential
from keras.layers import Dense, Embedding, LSTM, Flatten


# 处理爬取的数据，6w条数据，情感标签+文本数据 #

X_train, y_train, X_test, y_test = shopping_data.load_data(
    input_file='./input/online_shopping_10_cats.csv')

print(f'X_train.shape:,{X_train.shape}')
print(f'y_train.shape:,{y_train.shape}')
print(f'X_test.shape:,{X_test.shape}')
print(f'y_test.shape:,{y_test.shape}')
print(X_train[0])
print(y_train[0])
"""
X_train: ["京东自营服务确实很好，以后会继续购买。", ...]
y_train: [1, ...]
"""
# 把数据集所有文本进行分词，获得索引词典 #
vocalen, word_index = shopping_data.createWordIndex(X_train, X_test)
""" 
shopping_data.createWordIndex为自行封装的函数。
函数模块内容就是对数据集中所有文本去除标点符号后，使用jieba分词，获得所有词列表，按出现次数倒序排序，然后使用keras分词器Tokenizer来根据顺序从1开始创建词索引。
"""

# 获得训练和测试数据的索引表示 #
X_train_index = shopping_data.word2Index(X_train, word_index)
X_test_index = shopping_data.word2Index(X_test, word_index)
"""
"京东自营服务确实很好，以后会继续购买。"
→
[ 58., 299.,  92., 400.,  37.,  39., 157., 192., 367.,  95.】
"""

# 把序列按照maxlen进行对齐 #
maxlen = 25
X_train_pad = sequence.pad_sequences(X_train_index, maxlen=maxlen)
X_test_pad = sequence.pad_sequences(X_test_index, maxlen=maxlen)
"""
[ 58., 299.,  92., 400.,  37.,  39., 157., 192., 367.,  95.]
→
[  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,  58, 299,  92, 400,  37,  39, 157, 192, 367,  95]
"""

# 模型构建 #
model = Sequential()
"""Embedding层
对测试集和训练集的词语创建特征权值矩阵，对句子索引创建onehot编码矩阵，两个矩阵点乘就是这个句子的特征矩阵。这一步可以直接使用keras的Embedding层实现
- input_dim 设置输入维度，即输入的最大词数；
- output_dim 设置输出维度，即特征维度；
"""
model.add(Embedding(trainable=True, input_dim=vocalen,
          output_dim=300, input_length=maxlen))

model.add(Flatten())
model.add(Dense(256, activation='relu'))
model.add(Dense(256, activation='relu'))
model.add(Dense(256, activation='relu'))
model.add(Dense(1, activation='sigmoid'))
model.compile(loss='binary_crossentropy',
              optimizer='adam', metrics=['accuracy'])

# 模型训练 #
model.fit(X_train_pad, y_train, batch_size=512, epochs=200)

# 保存模型
model.save('./model/12_model.h5')
loss, accuracy = model.evaluate(X_test_pad, y_test)
print(f'loss:{loss:.4f},accuracy:{accuracy:.4f}')
# loss: 2.3973 - accuracy: 0.8569