# canvan-token-generator
一款利用canvas生成验证码的原生JS插件

*其他语言：[English](https://github.com/unicornboat/canvan-token-generator)*

## Parameters

|名称     |类型           |描述                           |是否必须  |
|:-------|:--------------|:-----------------------------|:-------:|
|el      |Element, string|DOM元素或者CSS选择器|是      |
|options |object         |JSON格式         |         |

### el {Element, string}

```html
<div id="token"></div>
```

> 请勿在该容器中放置任何内容。插件初始化的时候会用`canvas`元素覆盖里面的所有内容。

创建一个`CanvasTokenGenerator`实例只要传入CSS选择器即可，比如：
```javascript
new CanvasTokenGenerator('#token').draw();
```
或者直接传入DOM元素，比如：
```javascript
new CanvasTokenGenerator(document.getElementById('token')).draw();
```

### options {object}

关于**Options**的细节会在***选项***栏目内详细说明。

```javascript
new CanvasTokenGenerator('#token', options).draw();
```

## 选项

### customChars {string}

> Default: empty

如果需要插入`小写字母`、`大写字母`和`数字`之外的其他字符，可以在初始化的时候加入到`customChars`里。下面的例子就添加了`'&%$^#@'`特殊字符。

![alt text][example-customChars]

```javascript
new CanvasTokenGenerator('#token', {
	customChars: '&%$^#@'
}).draw();
```

### excludedChars {string}

> Default: empty

如果有不想使用的字符，可以加入到`excludedChars`选项里。`excludedChars`的清除是不区分大小写的，也就说`'a'`和`'A'`都会被`'a
'`清除掉。下面的例子清除调了`'ghijklmnopqrstuvwxyz'`这些字符。

![alt text][example-excludedChars]

```javascript
new CanvasTokenGenerator('#token', {
	excludedChars: 'ghijklmnopqrstuvwxyz'
}).draw();
```

### lowercase {string}

> Default: `'abcdefghijklmnopqrstuvwxyz'`

小写字母。可以传入自定义的小写字母，比如：`'abc'`，其他的小写字母便会被忽略。

### max {number}

> Default: 5

生成验证码的最大字符数。

![alt text][example-min]

```javascript
new CanvasTokenGenerator('#token', {
	max: 1
}).draw();
```

### min {number}

> Default: 4

生成验证码的最小字符数。

![alt text][example-max]

```javascript
new CanvasTokenGenerator('#token', {
	min: 12
}).draw();
```

### maxDots {number}

> Default: 100

当`userInterferingDots`为`true`时，生成的干扰点的最大数量。

### maxLines {number}

> Default: 20

当`userInterferingLines`为`true`时，生成的干扰线的最大数量。

### number {string}

> Default: `'0123456789'`

数字。可以传入自定义的数字，比如：`'123'`，其他的数字便会被忽略。

### uppercase {string}

> Default: `'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`

大写字母。可以传入自定义的大写字母，比如：`'ABC'`，其他的大写字母便会被忽略。

### userInterferingDots {boolean}

> Default: true

当`userInterferingDots`为`true`时，生成干扰点。

### userInterferingLines {boolean}

> Default: true

当`userInterferingLines`为`true`时，生成干扰线。























[example-customChars]: https://github.com/unicornboat/canvan-token-generator/blob/main/demo/img/examples/example-customChars.png?raw=true "Option: customChars"
[example-excludedChars]: https://github.com/unicornboat/canvan-token-generator/blob/main/demo/img/examples/example-excludedChars.png?raw=true "Option: excludedChars"
[example-max]: https://github.com/unicornboat/canvan-token-generator/blob/main/demo/img/examples/example-max.png?raw=true "Option: max"
[example-min]: https://github.com/unicornboat/canvan-token-generator/blob/main/demo/img/examples/example-min.png?raw=true "Option: min"