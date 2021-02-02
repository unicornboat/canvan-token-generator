# canvan-token-generator
A token generator in HTML using canvas

*Other languages: [简体中文](https://github.com/unicornboat/canvan-token-generator/blob/main/README.zh-cn.md)*

## Parameters

|Name    |Type           |Description                   |Required |
|:-------|:--------------|:-----------------------------|:-------:|
|el      |Element, string|An element or a query selector|Yes      |
|options |object         |JSON formatted object         |         |

### el {Element, string}

```html
<div id="token"></div>
```

> Anything inside canvas container will be wiped out. Then it will be filled with a `canvas` element.

To create a `CanvasTokenGenerator` instance, simply use the query selector string `'#token'`,
```javascript
new CanvasTokenGenerator('#token').draw();
```
or pass the element in.
```javascript
new CanvasTokenGenerator(document.getElementById('token')).draw();
```

### options {object}

Details are explained in **Options** section.

```javascript
new CanvasTokenGenerator('#token', options).draw();
```

## Options

### customChars {string}

> Default: empty

Any special characters that's not included in `lowercase`, `number`, and `uppercase`. Below example adds `'&%$^#@'` 
to the result.

![alt text][example-customChars]

```javascript
new CanvasTokenGenerator('#token', {
	customChars: '&%$^#@'
}).draw();
```

### excludedChars {string}

> Default: empty

Any characters are not wanted. This option is case-insensitive which means `'a'` will remove `'a'` and `'A'` . Below example removes `'ghijklmnopqrstuvwxyz'` from the result.

![alt text][example-excludedChars]

```javascript
new CanvasTokenGenerator('#token', {
	excludedChars: 'ghijklmnopqrstuvwxyz'
}).draw();
```

### lowercase {string}

> Default: `'abcdefghijklmnopqrstuvwxyz'`

Define the lower case characters.

### max {number}

> Default: 5

The maximum length of the token generated.

![alt text][example-min]

```javascript
new CanvasTokenGenerator('#token', {
	max: 1
}).draw();
```

### min {number}

> Default: 4

The minimum length of the token generated.

![alt text][example-max]

```javascript
new CanvasTokenGenerator('#token', {
	min: 12
}).draw();
```

### maxDots {number}

> Default: 100

The maximum amount of interfering dots. This option only works if `userInterferingDots` is `true`.

### maxLines {number}

> Default: 20

The maximum amount of interfering dots. This option only works if `userInterferingLines` is `true`.

### number {string}

> Default: `'0123456789'`

Define the numeric characters.

### uppercase {string}

> Default: `'ABCDEFGHIJKLMNOPQRSTUVWXYZ'`

Define the upper case characters.

### userInterferingDots {boolean}

> Default: true

If `true` certain amount of interfering dots will be drawn.

### userInterferingLines {boolean}

> Default: true

If `true` certain amount of interfering lines will be drawn.























[example-customChars]: https://github.com/unicornboat/canvan-token-generator/blob/main/demo/img/examples/example-customChars.png?raw=true "Option: customChars"
[example-excludedChars]: https://github.com/unicornboat/canvan-token-generator/blob/main/demo/img/examples/example-excludedChars.png?raw=true "Option: excludedChars"
[example-max]: https://github.com/unicornboat/canvan-token-generator/blob/main/demo/img/examples/example-max.png?raw=true "Option: max"
[example-min]: https://github.com/unicornboat/canvan-token-generator/blob/main/demo/img/examples/example-min.png?raw=true "Option: min"