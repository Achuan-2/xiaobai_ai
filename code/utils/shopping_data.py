import os
import keras
import numpy as np
import keras.preprocessing.text as text
import re
import jieba
import random


def load_data(input_file):
    xs = []
    ys = []
    with open(input_file, 'r', encoding='utf-8') as f:
        line = f.readline()  # escape first line"label review"
        while line:
            line = f.readline()
            if not line:
                break
            contents = line.split(',')

            # if contents[0]=="书籍":
            # 	continue

            label = int(contents[1])
            review = contents[2]
            if len(review) > 20:
				# 如果评价字数超过大于20，则跳过
                continue

            xs.append(review)
            ys.append(label)

    xs = np.array(xs)
    ys = np.array(ys)

    # 打乱数据集
    indies = [i for i in range(len(xs))]
    random.seed(666)
    random.shuffle(indies)
    xs = xs[indies]
    ys = ys[indies]
	# 划分训练集和测试集，4：1
    m = len(xs)
    cutpoint = int(m*4/5)
    x_train = xs[:cutpoint]
    y_train = ys[:cutpoint]

    x_test = xs[cutpoint:]
    y_test = ys[cutpoint:]

    print('总样本数量:%d' % (len(xs)))
    print('训练集数量:%d' % (len(x_train)))
    print('测试集数量:%d' % (len(x_test)))

    return x_train, y_train, x_test, y_test


def createWordIndex(x_train, x_test):
    x_all = np.concatenate((x_train, x_test), axis=0)
    # 建立词索引
    tokenizer = text.Tokenizer()
    # create word index
    word_dic = {}
    voca = []
    for sentence in x_all:
        # 去掉标点
        sentence = re.sub(
            "[\s+\.\!\/_,$%^*(+\"\']+|[+——！，。？、~@#￥%……&*（）]+", "", sentence)
        # 结巴分词
        cut = jieba.cut(sentence)
        # 遍历分词
        for word in cut:
            if not (word in word_dic):
                word_dic[word] = 0
            else:
                word_dic[word] += 1  # 统计词出现次数
    # 按照词的出现次数进行倒序排序
    word_dic = sorted(word_dic.items(), key=lambda kv: kv[1], reverse=True)
    # 获得分词的列表
    voca = [v[0] for v in word_dic]

    tokenizer.fit_on_texts(voca)
    print("voca:"+str(len(voca)))
    return len(voca), tokenizer.word_index


def word2Index(words, word_index):
    vecs = []
    for sentence in words:
        # 去掉标点
        sentence = re.sub(
            "[\s+\.\!\/_,$%^*(+\"\']+|[+——！，。？、~@#￥%……&*（）]+", "", sentence)
        # 结巴分词
        cut = jieba.cut(sentence)
        #cut_list = [ i for i in cut ]
        index = []

        for word in cut:
            if word in word_index:
                index.append(float(word_index[word]))

        # if len(index)>25:
        # 	index = index[0:25]
        vecs.append(np.array(index))

    return np.array(vecs, dtype=object)
