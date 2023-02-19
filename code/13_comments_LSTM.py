import numpy as np
from keras.models import load_model
import utils.shopping_data as shopping_data
import utils.chinese_vec as chinese_vec
from keras_preprocessing import sequence
from keras.models import Sequential
from keras.layers import Dense, Embedding, LSTM


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

# 自行构造词嵌入矩阵
"""
从网上加载别人训练好的超大的300d的词向量矩阵，
然后从这个词向量矩阵提取本次数据出现的单词，
得到本次训练的词向量矩阵，
"""
word_vecs = chinese_vec.load_word_vecs(input_file='./input/sgns.target.word-word.dynwin5.thr10.neg5.dim300.iter5')
embedding_matrix = np.zeros((vocalen,300))
for word, i in word_index.items():
    embedding_vector = word_vecs.get(word)
    if embedding_vector is not None:
        embedding_matrix[i] = embedding_vector


# 模型构建 #
model = Sequential()
# Embedding层不训练，直接使用预训练好的词向量矩阵，得到词嵌入矩阵
model.add(Embedding(trainable=False, weights=[embedding_matrix],input_dim=vocalen,
          output_dim=300, input_length=maxlen))
model.add(LSTM(128,return_sequences=True))
model.add(LSTM(128))
model.add(Dense(1, activation='sigmoid'))
model.compile(loss='binary_crossentropy',
              optimizer='adam', metrics=['accuracy'])

# 模型训练 #
model.fit(X_train_pad, y_train, batch_size=512, epochs=200)

# 保存模型
model.save('./model/13_model.h5')
loss, accuracy = model.evaluate(X_test_pad, y_test)
print(f'loss:{loss:.4f},accuracy:{accuracy:.4f}')
# loss: 0.8384 - accuracy: 0.895