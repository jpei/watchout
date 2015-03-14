var Enemy = function(gameOptions, id) {
	Ship.call(this, gameOptions);
	this.r = 7;
	this.id = id;
};

Enemy.prototype = Object.create(Ship.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.render = function(to){
	this.move();
	return this;
}

Enemy.prototype.move = function() {
	this.transform({
		x: this.gameOptions.padding+(this.gameOptions.width-2*this.gameOptions.padding)*Math.random(), // random from padding to width - padding
		y: this.gameOptions.padding+(this.gameOptions.height-2*this.gameOptions.padding)*Math.random()
});
};