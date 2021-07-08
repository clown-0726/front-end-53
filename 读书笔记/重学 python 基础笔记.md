书读百遍，其义自现。每次重学基础，总有值得记录的地方。

![大连-渔人码头](https://lilu-pic-bed.oss-cn-beijing.aliyuncs.com/my-blog/20210706-python-relearn-basic-notes/dalian-yurenmatou.jpeg)

### 和其他语言不一样的除法
在 `python` 中，`2/2` 的结果是小数，而不是我们熟知的整数。
```python
# <class 'float'>
type(2/2)
# <class 'int'>
type(2//2)
```

### 进制表示法
```
0b10 -> 二进制
0o11 -> 八进制
0x15 -> 十六进制

bin() -> 二进制转换函数
int() -> 十进制转换函数
oct() -> 八进制转换函数
hex() -> 十六进制转换函数
```

### 数据类型
`bool` 是 `Number` 大分类下面的一种，而不是单独一个类。
```python
int(True) = 1
bool(0) = False
```

可变类型和不可变类型
- `int` `str` `tuple` 是不可改变类型
- `list` `set` `dict` 是可改变类型

```python
# 证明
# id() 函数可以得到变量的内存地址，下面代码两次 a 变量的内存地址是不一样的

a = 'hello'
id(a)
a = a + ' world'
id(a)
```

为什么会存在 `tuple`：编程注重稳定性，tuple 是不可改变类型，也就是说 `a[1] = '2'` 或 `a.append(3)` 是报错的，但是很多场景下我们需要 `tuple` 就够了，不需要 `list` 提供的各种数组方法。

### 身份运算符
身份运算符 is 和 ==
```python
# Case 1
# 下面比较的是两个集合，是无需的，== 比较的是值，因此表达式两边相等
a = {1,2,3}
b = {2,1,3}
a is b # False
a == b # True
```

```python
# Case 2
c = (1,2,3)
d = (2,1,3)
a == d # False
a is b # False
```

```python
# Case 3
e = None
id(e) # 4412745832
e is None # True
```

对象的三个特征和三个方法
- 数据对象的三个特征：id，value，type
- 分别对象三个方法：id(), ==, isinstance()

不用 `type` 而用 `isinstance` 是因为 `type` 不能判断子类

### 函数多值返回
python 函数是可以有多个返回值的，多个返回值会封装到元组中
```python
def add(a, b):
    return a, b
    
c, d = add(1, 2)
print([c, d]) 
```

### 序列解包
正常的序列解包
`a, b, c = [1, 2, 3]`

可变参数的解包赋值
```python
def add(param, *args, **kwargs):
    print(param, args, kwargs)
    
args = (1, 2, 3)
kwargs = {'a': 1, 'b': 2}
add(1, *args, **kwargs)  
```

### 所有类型和 `bool` 类型的对应
和 `js` 中一样，`python` 中所有的类型都可以转换成 `bool` 类型。
```python
bool(0) == False
bool([]) == False
bool({}) == False
bool('') == False
bool(None) == False
```
除了上面的，其余的结构基本都为 `True`。

### 枚举类型
枚举的好处：
- 枚举定义的值不可变
- 防止相同的值的功能
- 枚举可遍历

```python
from enum import Enum

class VIP(Enum):
    YELLOW = 1
    # 如果有相同的数值会被当作上一个的别名，是不会被遍历出来
    YELLOW_ALISA = 1
    GREEN = 4
    BLACK = 3


print(VIP.GREEN)  # 枚举的类型
print(VIP.GREEN.name)  # 枚举的名字
print(VIP.GREEN.value)  # 枚举的值

# 转成枚举类型
a = 1
print(VIP(1))
```

### 面向对象
要区分类成员和对象成员，类成员是直接定义在类上的变量，对象成员是通过 self 定义的。如果一个变量在对象中找不到，则会去类上去找。
```python
class Student(object):
    name = 'ss'
    age = 9
    sex = 'f'

    def __init__(self, name, age):
        self.name = name
        # 这句话没有意义，前后 age 都是形参的 age
        age = age
       # 这样可以在方法中访问类变量
       print(self.__class__.age)


ss = Student('Wang Qiang', 18)
print(ss.name)  # 对象成员
print(ss.age)  # 来自类成员，因为对象成员中没有
print(ss.sex)  # 来自类成员，因为对象成员中没有
print(Student.name)  # 类成员

print(ss.__dict__)  # 打印出所有的对象成员
print(Student.__dict__)  # 打印出所有的类成员
```

类方法是用来操作类成员变量的
```python
class Student(object):
    name = 'ss'
    age = 9
    sex = 'f'

    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def opr_info(cls):
        cls.age = cls.age + 1


ss = Student(name='Wang Qiang', age=18)
# 类方法是专门用于操作类变量的
Student.opr_info()
# 对象也可以调用类方法，但是不推荐这么做
ss.opr_info()
```

`python` 对私有变量的保护很弱
```python
# 下面代码中，其实 python 将私有变量 __name 改名为 _Student__name，因此其对私有变量对保护非常弱
class Student(object):
    __name = 'ss'
    __age = 9

    def __init__(self, name, age):
        self.__name = name
        self.__age = age


ss1 = Student(name='Wang Qiang', age=18)
ss1.__name = 'Haha'
print(ss1.__name)  # 强制给 ss1 设置变量 __name，而不是覆盖类的私有变量

ss2 = Student(name='Cao Lilu', age=18)
print(ss2.__name)  # 报错
```

了解面向对象下 `python` 的灵活
```
class Student(object):
    __name = 'ss'
    __age = 9

    def __init__(self, name, age):
        self.__name = name
        self.__age = age

    def do_homework(self):
        print('I am instresting code')


ss1 = Student(name='Wang Qiang', age=18)
# 以下两个代码也是可以执行的，了解 python 的灵活，下面代码是不可取的
Student.do_homework(ss1)
Student.do_homework('xxx')
```

### 使用列表模仿 `switch case`
```
day = 1

def get_zero():
    return 'Sunday'

def get_one():
    return 'Monday'

switcher = {
    0: get_zero,
    1: get_one,
}

day_name = switcher.get(day, None)()
print(day_name)
```

### 列表推导式 & 字典列表推导式
列表推导式
```
item_list = [x for x in [1, 2, 3, 4] if x > 2]
print(item_list)
```

字典的列表推导式
```
students = {
    '喜小乐': 18,
    '周小云': 20,
    '横小五': 15,
}

b = (key for key, value in students.items())
for x in b:
    print(x)
```

### 逻辑运算符
我们知道逻辑运算符 `and` 和 `or` 的规则分别是“全真才真”和“全假才假”。下面代码中，数字也分别对应相应的布尔值，因此如果读到第一个就能判断出结果，就返回第一个，否则返回第二个。
```
print(1 and 0)  # 0
print(0 and 1)  # 0
print(1 and 2)  # 2
print(2 and 1)  # 1

print(0 or 1)  # 1
print(1 or 0)  # 1
print(1 or 2)  # 1
```

### `python` 包的导入

`__all__ = ['a', 'b']` 表示在用 `from a import *` 的时候，只能导入 `a` 和 `b`。`__all__` 是约束导出。

当一个 python 文件被当作主文件入口的时候，其名字会被强制更改为 `__main__`，一个 `python` 程序只有一个入口，因此其他模块的名字都是正常的模块名。

关于 `python` 程序包的绝对引入和相对引入
- 首先要知道在 `java` 中一个文件就是一个类，一个文件中的类名和文件名是一样的，但是在 `python` 中一个文件则是一个模块，类是在模块里面的。
- `python` 中的顶级包是和入口文件在同一级别目录的（项目的跟路径文件名不是顶级包名），因此模块导入的时候程序找包一般是从顶级模块开始找的。
- 在顶级包之内的包是可以使用相对导入的，一个点代表当前路径，两个点代表上一级，依次类推。
- 但是和顶级包同等级的文件是不能使用相对导入的，因为 `python` 会把 `__package__` 的名字改为 `__main__`，这时候就不是正常的包寻址名字了，因此是没发正常导入包的。

### `dataclass` 来简化类的实例化

```
from dataclasses import dataclass

@dataclass
class Student(object):
    name: str
    age: int
    school_name: str

    # def __init__(self, name, age, school_name):
    #     self.name = name
    #     self.age = age
    #     self.school_name = school_name

    def print_data(self):
        print([str(self.name), str(self.age), str(self.school_name)])


student = Student('Xiaohua', 18, 'Tsinghua')
student.print_data()
```

### 实现迭代器
`python` 中，决定是否是可叠迭代对象的关键点是是否实现了 `__iter__` 和 `__next__` 这两个魔法函数，下面例子就是将一个类的实例变成了可迭代对象。  
迭代器具有一次性，迭代完一次就能再次遍历了。
```python
class BookCollection(object):
    def __init__(self):
        self.books = ['Book01', 'Book02', 'Book03']
        self.cur = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.cur >= len(self.books):
            raise StopIteration()

        r = self.books[self.cur]
        self.cur += 1
        return r


books = BookCollection()
for book in books:
    print(book)
```

### 生成器
用生成器生成 0 到 10000 数据的例子。
```python
def gen(max):
    n = 0
    while n < max:
        n += 1
        yield n


g = gen(10000)
print(g.__next__())
print(g.__next__())
print(g.__next__())
```
其实可以用列表推导式，但是这会很占用内存，因为列表推导式生成的 10000 个数据都要存到数组中，也就是存到内存中。但是生成器只是函数计算，并不会吧 10000 个数据都存放到内存中。

其实元组的列表推导式生成的就是生成器。
```python
n = (i for i in range(1, 10001))
print(n.__next__())
print(n.__next__())
print(n.__next__())
```

### 闭包
下面是闭包的例子，注意 `__closure__` 存在的条件
```python
def curve_pre():
    a = 25

    def curve(x):
        # 如果这里重新对 a 赋值，那么 __closure__ 就不存在了，
        # 因为没有了对环境变量对引用，也就不存在闭包了
        # a = 20
        return a * x * x

    return curve


a = 10
f = curve_pre()
print(f.__closure__)
print(f.__closure__[0].cell_contents)
print(f(2))

```

下面用闭包解决梯度赋值问题
```python
def factory(pos):
    def go(step):
        # 这里为解决下面变量未声明赋值的问题，去父作用域寻找引用
        nonlocal pos
        new_pos = pos + step
        pos = new_pos
        return new_pos

    return go


tourist = factory(0)
print(tourist(2))
print(tourist(3))
print(tourist(5))
```

### `wraps` 装饰器解决自定义装饰器的缺点
wraps 这个装饰器可以将 func 函数的信息复制到 wrapper 函数上，解决被装饰函数信息改变问题，因为被装饰对象其实已经不是原函数了，比如函数的 `__name__` 的变化

```python
import time
from functools import wraps

def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(time.time())
        func(*args, **kwargs)

    return wrapper


@decorator
def foo(param):
    print('This is the root func ' + param)


foo('Teapot')
```

### `python` 函数式编程
`reduce` 函数和 `lambda` 的使用
```python
from functools import reduce

list_a = [1, 2, 3, 4, 5, 6]
list_b = [1, 2, 3, 4, 5, 6]
r = map(lambda x, y: x * x + y, list_a, list_b)
print(list(r))
```

经典累加问题
```
list_x = [1, 2, 3, 4, 5, 6, 7, 8]
r = reduce(lambda x, y: x + y, list_x)
print(r)
```

### 海象运算符(python 3.8之后)
下面代码会通过 `:=` 将 `b` 进行赋值，而不需要我们单独拉出 `b` 在 `if` 语句之外进行赋值
```python
# walrus
a = 'python'

if (b := len(a)) > 5:
    print('The true length of b is:' + str(b))
```

### 杂记 & 技巧

#### 输出原始 `\n`
```python
# 会吧 \n 解释成真正的换行
print('hello \nworld') 
# 前面加上 r 会以原始字符串输出
print(r'hello \nworld')
```

#### 定义一个空集合
```python
s = set()
```

#### 元组和类型
- `type(('1'))` 结果为 int，原因在于 `python` 会把小括号解析为普通的括号而不是 `tuple`
- 如果要声明一个元素的元组，就要 `('1',)`

#### `python` 之禅
`import this` 可以打印出 `python` 之禅

#### 技巧：`a` 和 `b` 不同同时为 `False`
`a or b`

#### 对象的 bool 不一定为 True
对象的布尔值不一定为 `True`，这取决于 `__len__` 和 `__bool__` 魔法函数的返回值，如果有 `__bool__` 这个正宗方法则取决于 `__bool__`，优先级高于 `__len__`

```
class Test(object):
    def __init__(self):
        pass
    
    # def __bool__(self):
    #     return False
    
    def __len__(self):
        return 0


test = Test()
print(bool(test))
```

#### `vscode` 配置 `python linter`
```
{
    "python.linting.pyLintEnabled": false,
    "python.linting.flake8Enabled": true,
    "python.linting.enabled": true,
}
```


### References:
[1] 人生苦短，快用 python

