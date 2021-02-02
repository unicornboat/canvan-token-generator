/**
 * CanvasTokenGenerator v1.0.0
 * @param {Element, string} el      Either a query selector or an HTML element
 * @param {object}          options JSON formatted object
 * @constructor
 */
function CanvasTokenGenerator (el, options) {
	this.canvas = document.createElement('canvas');
	this.settings = {
		chars: '',
		customChars: '',
		excludedChars: '',
		lowercase: 'abcdefghijklmnopqrstuvwxyz',
		max: 5,
		maxDots: 100,
		maxLines: 20,
		min: 4,
		number: '0123456789',
		uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		userInterferingDots: true,
		userInterferingLines: true
	};
	this.token = '';
	this.container = null;

	/**
	 * Check if is a string
	 * @param   {string}  str      Input variable to check
	 * @param   {boolean} is_empty Check if the string is empty (optional)
	 * @returns {boolean}
	 * @private
	 */
	var _isString = function () {
		if (arguments.length === 1) return typeof arguments[0] === 'string';
		if (arguments.length > 1) {
			if (typeof arguments[0] !== 'string') return false;
			if (typeof arguments[1] === 'boolean' && arguments[1] === true) {
				return arguments[0].replace(/\s+/g, '') !== '';
			}
			return true;
		}
		return false;
	};

	/**
	 * Check if input is an HTML element
	 * @param   {Element} element  Input variable to check
	 * @param   {string}  tag_name Check if the elment has the matching tag name
	 * @returns {boolean}
	 * @private
	 */
	var _isElement = function () {
		if (arguments.length === 1) {
			return typeof arguments[0] === 'object'
				&& arguments[0].constructor.toString().indexOf('HTML') > -1
				&& arguments[0].constructor.toString().indexOf('Element') > -1;
		}
		if (arguments.length > 1) {
			if (
				typeof arguments[0] === 'object'
				&& arguments[0].constructor.toString().indexOf('HTML') > -1
				&& arguments[0].constructor.toString().indexOf('Element') > -1
			) {
				if (typeof arguments[1] === 'string') {
					return arguments[1].replace(/\s+/g, '').toUpperCase() === arguments[0].tagName.toUpperCase()
				}
				return true;
			}
			return false;
		}
		return false;
	};

	/**
	 * /**
	 * Get the HTML element using the query selector
	 * @param   {string}  qs Query selector
	 * @returns {Element}
	 * @private
	 */
	var _querySelectorToElement = function (qs) {
		if (typeof qs !== 'string') throw new Error('Query selector must be a string');
		if (qs.replace(/\s+/g, '') === '') throw new Error('Query selector cannot be empty');
		if (!document.querySelector(qs)) throw new Error('Query selector must point to a valid DOM element');
		return document.querySelector(qs);
	};

	try {
		if (_isString(el)) {
			this.container = _querySelectorToElement(el);
		} else if (_isElement(el)) {
			this.container = el;
		} else {
			throw new Error('CanvasTokenGenerator constructor requires at least one parameter');
		}

		this.container.innerHTML = '';
		this.container.appendChild(this.canvas);
		this.canvas.height = this.container.getBoundingClientRect().height;
		this.canvas.width = this.container.getBoundingClientRect().width;
		this.constructor(options);
	} catch (err) {
		throw err;
	}
}

CanvasTokenGenerator.prototype.constructor = function (options) {
	if (typeof options === 'object' && Object.keys(options).length) {
		for (var key in options) {
			var value = options[key];
			switch (key) {
				case 'customChars':
					if (typeof value === 'string') this.settings.chars += value;
					break;
				case 'excludedChars':
					if (typeof value === 'string') this.settings.excludedChars = value;
					break;
				case 'lowercase':
				case 'number':
				case 'uppercase':
					if (typeof value === 'string') {
						this.settings[key] = value.replace(/\s+/g, '')
							.toLowerCase()
							.split('')
							.reduce(function (accum, each) {
								return accum.indexOf(each) === -1 ? accum + each : accum;
							});
					}
					break;
				case 'max':
				case 'maxDots':
				case 'maxLines':
				case 'min':
					if (parseInt(value) > 0) this.settings[key] = parseInt(value);
					break;
			}
		}
	}

	var chars = this.settings.chars + this.settings.lowercase + this.settings.number + this.settings.uppercase;

	if (this.settings.excludedChars) {
		this.settings.excludedChars.split('').forEach(function (char) {
			var regex = new RegExp(char, 'gi');
			chars = chars.replace(regex, '');
		});
	}

	if (!chars.length) throw new Error('No characters available after adapting the options');
	this.settings.chars = chars;
	return this;
};

CanvasTokenGenerator.prototype.draw = function () {
	/**
	 * Get random RGBA color
	 * @param   {string} opposite RGB color string to get opposite
	 * @returns {string} RGB color
	 */
	function color () {
		/**
		 * Check if it's a bright color
		 * @param   {number}  r Red color integer
		 * @param   {number}  g Green color integer
		 * @param   {number}  b Blue color integer
		 * @returns {boolean}
		 */
		function isBright (r, g, b) {return r * 0.299 + b * 0.587 + b * 0.114 >= 192;}

		/**
		 * Generate a random number between 0 and 255
		 * @returns {number}
		 */
		function rand () {return Math.floor(Math.random() * 256);}

		var count = 0, red = rand(), green = rand(), blue = rand();

		if (arguments.length && typeof arguments[0] === 'string') {
			var opposite = arguments[0];

			// Sanitise the RGB string and keep the numbers and commas only
			opposite = opposite.replace(/[rgba\(\)]/gi, '').split(',').map(function (i) {return parseInt(i)});

			// Check if the opposite color is a bright color
			opposite = isBright(opposite[0], opposite[1], opposite[2]);

			// Exit the while loop if count is greater than or equal to 100 for loop safety
			if (isBright(opposite[0], opposite[1], opposite[2])) {
				// Get a dark color if given color is bright
				while (isBright(red, green, blue) || count >= 100) {
					count ++;
					red = rand(); green = rand(); blue = rand();
				}
			} else {
				// Get a bright color if given color is dark
				while (!isBright(red, green, blue) || count >= 100) {
					count ++;
					red = rand(); green = rand(); blue = rand();
				}
			}
		}
		return 'rgba(' + red + ',' + green + ',' + blue + ')';
	}

	/**
	 * Get a random token string
	 * @returns {string}
	 */
	function make (chars, min, max) {
		// Get the random string length between min and max in settings
		var len = random(min, max), str = '';
		for (var i = 0; i < len; i ++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	/**
	 * Get random number between given range
	 * @param   {number} min
	 * @param   {number} max
	 * @returns {number}
	 */
	function random (min, max) {
		if (min > max) min = [max, max = min][0];
		return Math.floor(Math.random() * (max - min) + min);
	}

	var bg_color = color(),
		ctx = this.canvas.getContext('2d'),
		fonts = ['Arial', 'Georgia', 'Helvetica', 'SimHei', 'SimSong', 'Verdana'],
		height = this.canvas.height,
		i,
		token = make(this.settings.chars, this.settings.min, this.settings.max),
		width = this.canvas.width,
		font_size = Math.floor(width / (token.length * 3 / 2 + .5)),
		padding = font_size / 2,
		last_x = random(padding, padding * .5);

	if (font_size > height * .5) font_size = height * .5;

	ctx.textBaseline = 'center';

	// Get a random color
	ctx.fillStyle = color();

	// Render the rectangle with the random color
	ctx.fillRect(0,0, this.canvas.width, this.canvas.height);

	// Draw text
	for (i = 0; i < token.length; i ++) {
		// Random text color with opposite brightness of the background color
		ctx.fillStyle = color(bg_color);

		// Random font
		ctx.font = random(font_size * .9, font_size * 1.1) + 'px ' + fonts[random(0, fonts.length)];

		var x = random(last_x + padding / 2, last_x + padding), // Random position x
			y = random(font_size, height - padding), // Random position y
			deg = random(-20, 20); // Random rotation

		last_x = x + font_size;

		// Set position
		ctx.translate(x, y);

		// Set rotation
		ctx.rotate(deg * Math.PI / 180);

		// Draw text
		ctx.fillText(token[i], 0, 0);

		// Reset position
		ctx.rotate(-deg * Math.PI / 180);

		// Reset rotation
		ctx.translate(-x, -y);
	}

	// Draw interfering lines
	if (this.settings.userInterferingLines) {
		for (i = 0; i < random(this.settings.maxLines * .5, this.settings.maxLines); i++) {
			var line_length = random(width * .5, width),
				line_x = random(width * -.5, width * 1.5),
				line_y = random(height * -.5, height * 1.5);
			ctx.strokeStyle = color(); // Line color
			ctx.beginPath();
			ctx.moveTo(line_x, line_y);
			ctx.lineTo(random(line_x, line_length), random(line_y, line_length));
			ctx.stroke();
		}
	}

	// Draw interfering dots
	if (this.settings.userInterferingDots) {
		for (i = 0; i < random(this.settings.maxDots * .5, this.settings.maxDots); i++) {
			ctx.fillStyle = color();
			ctx.beginPath();
			ctx.arc(random(0, width), random(0, height), 1, 0, 2 * Math.PI);
			ctx.fill();
		}
	}
};