用好 Grid 和 Flex 的结合布局，能让前台布局事倍功半！

### 简介

Grid 布局作为一种新的前端布局方式，越来越多的收到前端开发人员的青睐。尤其是在当前的响应式布局中，Grid 布局有着巨大的优势，当其和 flex 布局相结合使用的时候，能大大提升布局的效率并减少一些 "hack"  的写法。

由于这个布局的标准也一直在完善之中，因此浏览器的兼容性也是一个不得不关注的话题，关于具体的兼容性参考 https://caniuse.com/?search=grid.

### 常用概念

- 网格容器(Grid container)： 存放网格项的父元素，指的是具体的元素；
- 网格项(Grid item)：网格容器中每一个元素，也指的是具体的元素；
- 网格线(Grid line)：每个网格项的分界线，是虚拟的线；
- 网格轨道(Grid Track) : 两个相邻的网格线之间的轨道，这些水平或垂直的轨道总包含了网格项；
- 网格单元(Grid cell)：两个相邻的列网格线和两个相邻的行网格线组成的是网格单元。是由网格线决定的，一个网格单元中可能包含网格项目也可能不包含；
- 网格区域(Grid area)：一个或多个网格项组成的区域；
- fr: 剩余空间分配数目；
- gr: 网格数单位（未被w3c采纳）；

### 第一个 Grid 布局试水

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        .container {
            display: grid;
            grid-template-columns: 100px 10% auto 1fr 2fr;
            grid-template-rows: auto;
            gap: 5px;
        }
        .item {
            border: 1px solid #cccccc;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
        <div class="item">6</div>
        <div class="item">7</div>
        <div class="item">8</div>
        <div class="item">9</div>
        <div class="item">10</div>
        <div class="item">11</div>
    </div>
</body>
</html>
```

上面代码定义了一个最基本的 Grid 布局，当我们在网络容器中放置很多元素的时候，我们可以通过设置 grid-template-columns / grid-template-rows 来规定这些元素要以什么样的规则排列。

### Grid 实例 - 容器上的属性

在 Grid 布局中，常用的属性一共有下面五种，`display`, `grid-template`, `gap`, `items`, `content`, `grid-auto`。他们分别作用在网格容器和网格项中，最终形成一个统一的网格布局。如果网格布局比较熟悉后，可以直接用个统一的属性 `grid` 来完成所有属性的简写形式。

我们可以将所有的属性分为两个部分，一个是 `grid` 属性，专门用来控制网格所有网格项的布局方式。另一个是 `items` 属性，专门用来控制每个网格项自身内容的布局。

##### [grid] 定义一个网格布局

我们可以简单的在一个网格容器上通过 `display: grid`，来定义一个网格布局，当前元素下的所有直接子元素都会按照网格布局进行布局。

当元素设置了网格布局， `column`, `float`, `clear`, `vertical-align` 属性都将无效。

##### [grid] 通过 `grid-template` 确定行列

下面属性作用在网格容器上，通过 `grid-template-columns` 和 `grid-template-rows` 来确定行列。想象一下，一个容器中有一批网格元素，下面代码中 `grid-template-columns: 100px 10% auto 1fr 2fr;` 确定了一行只能有5个元素（如下代码，元素的宽度单位可以有多种），剩下的元素就会从下一行开始重新按照列的规则重新排布。`grid-template-rows: auto` 则规则了所有行从上到下的高度。

如果设置宽度或高度为 auto ，如果确定不了 auto 的值的话，那么 auto 就是0。

```css
.container {
  display: grid;
  grid-template-columns: 100px 10% auto 1fr 2fr;
  grid-template-rows: auto;
  gap: 5px;
}
```

我们可以对网格线进行命名，方式很简单，其实就是在相应的位置插入名字即可

```
.container {
  display: grid;
  grid-template-columns: [LN01] 100px [LN02] 10% [LN03] auto [LN04 LN04-2] 1fr [LN03] 2fr [LN03];
  grid-template-rows: auto;
  gap: 5px;
}
```

 我们可以给一条线取多个名字，在中括号中用空格分开即可，比如 `[LN04 LN04-2]`

##### [grid] 网格区域

网格区域有点类似 table 元素中的合并单元格，网页也可以进行合并，是通过属性 grid-template-areas 来实现的

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        .container {
            display: grid;
            grid-template-columns: 15.6vw 15.6vw auto 15.6vw 15.6vw;
            grid-template-rows: 1fr 1fr 1fr 1fr;
          	grid-template-areas:
                "device     map     map     map     value"
                "industry   map     map     map     weight"
                "area       map     map     map     height"
                "expire     alarm   stat    time    trip";
            gap: 5px;
        }
        .item {
            border: 1px solid #cccccc;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="device item">device</div>
        <div class="map item">map</div>
        <div class="value item">value</div>
        <div class="industry item">industry</div>
        <div class="weight item">weight</div>
        <div class="area item">area</div>
        <div class="height item">height</div>
        <div class="expire item">expire</div>
        <div class="alarm item">alarm</div>
        <div class="stat item">stat</div>
        <div class="time item">time</div>
        <div class="trip item">trip</div>
    </div>
</body>
</html>
```

在上面的代码中一定要注意 grid-template-areas / grid-template-columns / grid-template-rows 之间的配合，来保持行列的一致性。

当然这三个也有其简写都形式 grid-template，具体的简写规则自行查阅，这里不做赘述，不推荐使用简写的形式，在正常的开发中代码的阅读性不佳。

##### [grid] 网格间距

官方定义网格线（虚拟的线）的大小。我们可以分别通过 grid-column-gap / grid-row-gap 去设置网格之间的间距，当然，其简写方式为 gap: 00px 00px。

##### [item] 网格项的内容对齐方式

网格内元素的对齐方式和 flex 布局是一致的，可以使用 justify-items / align-items 来设置，当然也有其简写的方式 place-items: center center。其取值分别如下：

- justify-items: start | end | center | stretch
- align-items: start | end | center | stretch

具体含义顾名思义。

##### [content] 设置网格容器内的网格的对齐方式

主要有两个属性 `justify-content` 和 `align-content` 来设置网格容器内的网格沿着**行轴**对齐网格的对齐方式。其取值主要有 `start`, `end`, `center`, `stretch`, `space-around`, `space-between`, `space-evenly`。

一般来说，只有内部网格项得总长度或总高度小于网格容器等时候，会用到这两个属性做对齐方式的调整。

其简写形式为 place-content: stretch stretch。

### Grid 实例 - 容器项上的属性

##### start / end

我们知道，再定义了网格布局之后，会有很多网格线，并且可以为网格线设置名字。这时候我们可以通过定义一个网格项的起始和结束位置来确定当前网格项在什么方。

```css
grid-column-start: 1;
grid-column-end: 2;

grid-row-start: 1;
grid-row-end: span 2;
```

##### grid-area

给 grid item 进行命名以便于使用 `grid-template-areas` 属性创建模版时来进行引用。

```
.item {
  grid-area: <name> | <row-start> / <colunm-start> / <row-end> / <colunm-end>;
}
```



##### self





### 常用的css函数

##### repeat

顾名思义，这个属性主要是用来重复要写的 css 样式的，比如 `grid-template-columns: repeat(5, 1fr)` 就是相当于写5次 1fr 的效果。

#####  fit-content

我们可以设置一个行宽或着列高为 `fit-content(200px ｜ 20%)`，意思就是如果内容不足设置的高度或宽度，则显示内容的高度或宽度，如果内容超过限制，则最多显示设置的数值。

##### minmax

和 `fit-content` 类似，这个函数定义了一个网格项的宽度或者告诉范围，比如 `minmax(50px, 50%)`

### 总结

xxx



### Reference

[1] Grid布局基础: https://www.imooc.com/learn/1111