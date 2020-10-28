首先要会矩阵的基础数学知识

矩阵可以应用到元素的2D和3D变换上

2D变换矩阵为3\*3，3D变换则是4\*4

transform 的四个取值为：skew(斜拉) scale(缩放) rotate(旋转) translate(位移) ，这些的变化在css的底层是矩阵进行计算的。

transform: matrix(a,b,c,d,e,f) 无论是旋转还是拉伸什么的，本质上都是应用matrix()方法实现的（修改matrix方法的固定几个值），知识类似于transform:rotate这种表现形式，我们更容易理解，记忆和上手。

通过 tranform-origin 属性进行设置的时候，矩阵相关计算也随之发生变化。实际图像效果上就是，旋转拉伸的中心点变了。