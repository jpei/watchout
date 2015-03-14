var Ship = function(gameOptions) {
	this.x = 0;
	this.y = 0;
	this.gameOptions = gameOptions;
};

Ship.prototype.getX = function() {
	return this.x;
};
Ship.prototype.setX = function(x) {
	minX = this.gameOptions.padding;
	maxX = this.gameOptions.width - this.gameOptions.padding;
	if (x <= minX) {
		x = minX;
	}
	if (x >= maxX) {
		x = maxX;
	}
	this.x = x;
};

Ship.prototype.getY = function() {
	return this.y;
};
Ship.prototype.setY = function(y) {
	minY = this.gameOptions.padding;
	maxY = this.gameOptions.height - this.gameOptions.padding;
	if (y <= minY) {
		y = minY;
	}
	if (y >= maxY) {
		y = maxY;
	}
	this.y = y;
};

Ship.prototype.transform = function(opts) {
	this.setX(opts.x || this.x);
	this.setY(opts.y || this.y);
};

Ship.prototype.moveAbsolute = function(x,y) {
	this.transform({x:x, y:y});
};
