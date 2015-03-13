var Enemy = function(gameOptions) {
	Ship.call(this, gameOptions);
	this.fill="black";
	this.r=7;
};

Enemy.prototype = Object.create(Ship.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.render = function(to){
	this.el = to.append('svg:circle')
							.attr('fill', this.fill);
	this.transform= {
		x: this.gameOptions.padding+(this.gameOptions.width-2*this.gameOptions.padding)*Math.random(), // random from padding to width - padding
		y: this.gameOptions.padding+(this.gameOptions.height-2*this.gameOptions.padding)*Math.random()
	};
}