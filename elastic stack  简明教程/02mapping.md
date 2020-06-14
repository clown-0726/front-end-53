类似于数据库中的表结构定义

```js
GET /test_index/mapping
```



自定义mapping

```
PUT my_index
{
	"mappings": {
		"doc": {
			"dynamic": false
			"properties": {
				"title": {
					"type": "text"
				},
				"name": {
					"type": "keyword"
				}
			}
		}
	}
}
```



mapping中的字段类型一旦设定后，禁止直接修改

通过`dynamic`来控制字段的新增，可以对整个文档设置，也可以对object字段进行设置

- true，允许自动新增字段
- false，不允许自动新增，但是允许插入，但是无法对新增的字段进行查询
- strict，文档不能新增，报错

每个字段下面可以用`index`关键词控制是否建立索引



## 数据类型

字符类型：text，keyword，区别是前者会分词后者不分词

数值型：long， interger等

日期型：date

布尔：boolean

二进制：binary

范围类型：integer_range, date_range等

数组类型：array

对象类型：object

嵌套类型：nested_object

地理位置类型

专用类型比如针对IP的，自动补全的等



es可以自动识别字段类型，是依靠JSON文档的类型来实现自动识别字段类型。其他类型显而易见比如对象类型，数值，布尔类型。但是对于字符串类型es会做日期探测（默认开启）和数值探测（默认关闭），如果都不符合则设置为字符型。

可以通过`dynamic_date_formats`自定义日期探测格式，也可以通过`date_detection`关闭es的日期自动探测功能。可以通过`numeric_dection`来开启数值的自动探测。



es同样提供了`dynamic_templates` API 允许我们自动设置类型探测的规则。比如将所有的字符预先设置为keyword类型，所有以某个字符开头的字段设置text类型等。

索引模版：这个用来预先配置匹配一些索引的规则，当创建一个新的索引的时候，如果这个索引匹配这个模版，则应用这个模版的规则。