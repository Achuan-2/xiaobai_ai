import os
import numpy as np
def load_word_vecs(input_file):
	embeddings_index = {}
	f = open(input_file,encoding='utf8')
	f.readline()#escape first line
	for line in f:
	    values = line.split()
	    word = values[0]
	    coefs = np.asarray(values[1:], dtype='float32')
	    embeddings_index[word] = coefs
	f.close()

	print('Found %s word vectors.' % len(embeddings_index))
	return embeddings_index
