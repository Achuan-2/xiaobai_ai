# 【README】小白也能听懂的人工智能原理
我的GitHub项目存档：[machine_learning_record/Ele实验室_小白也能听懂的人工智能原理](https://github.com/Achuan-2/machine_learning_record/tree/main/Ele%E5%AE%9E%E9%AA%8C%E5%AE%A4_%E5%B0%8F%E7%99%BD%E4%B9%9F%E8%83%BD%E5%90%AC%E6%87%82%E7%9A%84%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E5%8E%9F%E7%90%86)
## 课程简介

【**课程来源**】：是B站的付费课程，地址见[这里](https://www.bilibili.com/cheese/play/ep6173?csource=Hp_searchresult)。主讲人是Up主【Ele实验室】。Ele实验室大概是回形针📎之后我在B站见过最用心做动画的硬核up主了，并且文案还总是带着一股浓浓的哲学思辨的味道，我是很喜欢的。

【**课程内容和特点**】：正如标题《小白也能听懂的人工智能原理》，就是面向小白，讲解人工智能原理，课程的理念是“**如无必要，勿增新知**”，用最简单和直接的方式揭示概念和方法。主要讲的是深度学习一些基本原理，不涉及机器学习的传统算法，内容不会讲的特别深，数学公式都是用很简单的式子演示，目的是让你知道一些概念的由来，这样的好处是小白可以很快就理解深度学习中常见的梯度下降、反向传播、卷积神经网络等等这些概念，坏处可能可能是看完视频依然只知大概理解不深。见仁见智吧，总之挺适合我的，我挺喜欢这种风格的（大概水平太差了，也不是科班，复杂的我看不懂，就喜欢这种小白风格的科普课程，起码我以后再见到这些概念，就不再迷糊了）。

【**课程值不值**】：其实我一开始就在网上搜到盗版的阿里云盘资源，看到只剩两集了才入正76.8元支持的。我个人是觉得很值的，所以我才愿意为其付费（平常老抠门了，能白嫖就白嫖）。毕竟课程还是很成体系的，动画做的也很好，让一些概念的讲解很好懂。就如我上一段提到的，这个课程很适合我，能够让我学到很多，比如梯度下降的概念、卷积为什么work、激活函数的选择、如何调参等等。而我之前有想过入门深度学习，因为太多不懂的概念就半途而废了，这个课程的学习曲线很平缓，设计就是一步步的深入。而且Ele实验室的文案依然一如既往的优秀，让我看视频看的津津有味。当然这只是我一家之言，选择适合自己的就好。

> 想白嫖的，可以直接去Google一搜就能免费找到绝大多数B站付费课程云盘合集，找不到也可以去淘宝低价购买。
> 我找过免费的云盘资源，但几乎会缺少第12课和第13课的课程附件，视频都是全的就是
>

## 课程目录

* 「**宣导片：来一场人工智能的奇妙冒险吧**」
* 「**01.一元一次函数：感知器如何描述直觉**」

  📌如何描述思考和认知？——函数  
  📌如何建立简单的认知？——McCulloch-Pitts模型（M-P模型）  
  📌如何从偏离现实的直觉通过学习过渡到符合现实的认知？——Rosenblatt感知器模型​
* 「**02.方差代价函数：知错**」

  📌如何评估误差？直接减、绝对值、平方……  
  📌什么是代价函数（cost function）？和预测函数的区别  
  📌方差代价函数（即均方差MSE）  
  📌如何求理想的w值
* 「**03.梯度下降和反向传播：能改（上）**」

  📌如何挪动，自动寻找抛物线的最低点？——根据斜率确定挪动方向  
  📌根据斜率可以知道往哪边挪了，该每次该挪动多少呢？——固定步长vs梯度下降  
  📌梯度下降的类型——批量、随机、mini-batch​
* 「**04.梯度下降和反向传播：能改（下）**」

  📌改进预测函数y=wx→y=wx+b——代价函数将从二维变为三维  
  📌三维的代价函数怎么寻找下降最快的方向——求对w的偏导数和对b的偏导数，引入梯度概念  
  📌回顾总结一下目前为止所学到的东西：预测函数模型、前向传播、代价函数、反向传播、学习率、训练
* 「**05.激活函数：给机器注入灵魂**」

  📌**线性函数无法解决分类问题，该怎么办？**——引入激活函数（Sigmoid函数）

  📌**怎么对加入激活函数为sigmoid的预测模型的代价函数进行梯度下降更新参数**——复合函数链式求导

  📌总结：主要介绍了链式求导法则、激活函数。
* 「**06.隐藏层：神经网络为什么working**」

  📌**现在的问题**：豆豆变得不再是简单的越大或者越小越可能有毒，而是在某个大小范围内有毒，而某些范围内无毒。

  📌**如何让预测模型能够产生更复杂的曲线呢？**——是时候让神经元形成一个网络了，添加隐藏层

  📌**什么是隐藏层**

  📌**神经网络如何进行梯度下降更新参数**——复合函数链式求导（好累😩）】
* 「**07.高维空间：机器如何面对越来越复杂的问题**」

  * 📌总结：这节课开始介绍多维特征以及线性不可分问题。
  * 📌考虑豆豆的颜色和大小，现在输入变量有两个了，x1和x2。那就有毒概率与豆豆颜色和大小的关系就需要三维的坐标系了。
  * 📌环境中豆豆的大小颜色深度和毒性分布是线性不可分的，那该怎么办——线性不可分问题
  * 📌当问题数据特征越来越多，就无法可视化该怎么处理问题呢——下节课将介绍处理多维度数据的数学工具【向量和矩阵】
  * 📌【补充】如果豆豆的有毒概率和大小颜色深浅的分布是一个圈圈。圈内的有毒，而圈外的无毒，大家想想隐藏层至少需要几个神经元才可以把分割线扭曲成为一个圈，从而实现类型分割。
* 「**08.初识Keras：轻松完成神经网络模型搭建**」

  * 📌这节课是**分水岭**，之后我们就不再进行底层的数学原理分析。直接开始用框架实践了。
  * 📌线性代数的介绍：一维是向量，二维是矩阵，三维以上是张量。向量可以简洁展示多元方程，用一个式子 $Z=X \cdot W^T+B$ 表表示一整层神经网络的前向传播。
  * 📌keras框架了解和上手
  * 📌用keras框架快速实现课程前面的几个神经网络
* 「**09.深度学习：神奇的DeepLearning**」

  * 📌深度学习的问题：网络中每个节点到底在理解什么，很难用精确的数学手段去分析
  * 📌Tensorflow 游乐场玩耍：了解如何调参，调整神经元数量、激活函数、隐藏层数目、学习率等
  * 📌sigmoid激活函数的问题：梯度消失
  * 📌ReLU的激活函数：Dead ReLU Problem、leaky ReLU
  * 📌总结激活函数的选择：sigmoid只适合输出层做二分类，隐藏层适合用ReLU
  * 📌keras 区分蚊香数据
* 「**10.卷积神经网络：打破图像识别的瓶颈**」

  * 📌总结：这节课主要讲的是全连接神经网络图像识别的局限，而借助卷积可以提高识别效果，但实战部分讲的还是用全连接神经网络来训练图像识别，数据使用的是mnist数据集，下节课才是卷积神经网络实战。
  * 📌 **图像识别的难度** ：这不再是一个适用于计算机机械逻辑做判断的问题，我们需要用有一定容错能力的系统来做这件事情。
  * 📌 **全连接神经网络怎么进行图像识别？** 训练集达到了100%正确率，测试集则只有97.82%
  * 📌 **全连接神经网络对图像识别效果并不太好，为此引入了卷积神经网络** ：具体实操见下节
  * 📌 **新出现的概念** ： **训练集和测试集** 、 **泛化能力** 、 **独热编码** 、 **softmax层** 、 **交叉熵** 、**卷积核**
* 「**11.卷积神经网络：图像识别实战**」

  * 📌总结：这节课开始使用卷积神经网络进行图像识别了，卷积神经网络虽然看起来步骤多了，但实际使用了更少参数，对于图像识别有更好的效果。通过这次学习，也发现深度学习调参是门玄学，层数、神经元数量、各种函数的选择等等，但也必须了解基本的原理，不至于瞎调。还有自己的电脑想要训练更多的epoch就做不到了，需要用Google Colab去炼丹，再保存模型到本地。
  * 📌**卷积过程学习**
  * 📌 **LeNet-5卷积神经网络模型** ：识别acc98.4%
  * 📌 **自行搭建的卷积神经网络模型** ：识别acc99.21%
* 「**12.循环：序列依赖问题**」

  * 📌 **总结** ：分析购物网站的评论数据是正面的还是负面的​
  * 📌**基本学习**

    * 词是自然语言处理的基本单位​
    * jieba 结巴模块分词​
    * 词向量编码句子​
    * 嵌入层​
    * 多分类问题是要softmax激活函数配合分类交叉熵函数使用，而二分类问题要使用sigmoid激活函数配合二进制交叉熵函数​
  * 📌**词嵌入矩阵+全连接层模型构建步骤**
* 「**13.LSTM网络：自然语言处理实践**」

  * 📌 **总结** ：上节课对词向量输入神经网络就是直接抽平为一阶数组，这节课则是考虑序列时间上的关系，介绍循环神经网络以及LSTM网络，并重新用LSTM网络以及利用别人的词向量矩阵进行文本情感分析。​
  * 📌**什么是循环神经网络**
  * 📌 **长短时记忆网络LSTM** （Long Short Term Memory：普通的循环神经网络对于长依赖的问题效果不好。长短时记忆网络LSTM通过引入了细胞状态，能够让网络有记忆和忘记过去词语的功能，从而能解决长依赖的问题​
  * 📌**LSTM的变体：GRU**
  * 📌**关于循环神经网络的参数**
  * 📌**实战LSTM训练判断情感文本**
* 「**14.机器学习：最后一节课也是第一节课**」

  * 📌​**回顾之前的课程**​
  * 📌​**人工智能、机器学习、深度学习之间的关系**
  * 📌​**后续应该怎样继续学习**

## 课程脉络

* 从深海生物小蓝遇到的问题开始，发现一个一元一次函数构建的神经元可以表示一种直觉。介绍了人工智能启蒙阶段的**McCulloch-Pitts神经元模型**和**Rosenblatt感知器**。
* 通过一元一次函数的拟合，介绍了**代价函数**的概念，并在一个简单的抛物线形状的代价函数上介绍了**梯度下降算法**。梯度下降算法能够在不断的训练中让误差代价逐渐向最低点波动，同时相比于正规方程有不会一次性占用太多的计算和存储资源，这是一种在海量数据上用时间换空间的思想。并发现Rosenblatt感知器与方差代价函数梯度的联系。
* 介绍**反向传播**的概念，通过只有一个神经元的网络**了解神经网络工作模式的雏形**：数据**前向传播**进行预测，误差代价**反向传播**调整权重和偏置参数。
* 通过分类问题引入**激活函数**。正是非线性激活函数，让神经网络摆脱了线性系统的约束，从而产生了解决复杂问题的能力，这是激活函数的主要作用。sigmoid的作为激活函数一般在输出层可以作为<u>二分类问题的预测输出</u>，而在<u>多层神经网络的隐藏层</u>中，我们采用ReLU激活函数。softmax则用于多分类。
* 介绍**多层神经网络**。在加入更多的隐藏层神经元后，发现用来承载函数的神经网络开始能够解决更加复杂的问题。但随之而来参数增多，又引入线性代数中的**向量和矩阵**概念。用向量可以表示出问题的更多特征，进入更高的维度，矩阵能让我们的计算更加直观和高效。
* 介绍了**keras框架**。了解keras框架和tensorflow框架的区别和联系，可以把keras看作是编程语言中的python，tensorflow看作是C语言。
* 基于keras框架，简单的分析了**卷积神经网络**和**循环神经网络**的工作原理，并实战<u>mnist图像识别和购物网站文本情感分析</u>。
