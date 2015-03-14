var Player = function(gameOptions) {
	Ship.call(this, gameOptions);
	this.fill = 'red';
	this.r = 5;
};

Player.prototype = Object.create(Ship.prototype);
Player.prototype.constructor = Player;

Player.prototype.render = function(to) {
	this.transform({
		x: this.gameOptions.width*0.5,
		y: this.gameOptions.height*0.5
	});
	return this;
};


/*
Player.prototype.moveRelative = function(dx,dy) {
	this.transform({x:this.getX()+dx, y:this.getY()+dy});
};

Player.prototype.setupDragging = function(element) {
	var dragMove = function() { 
		console.log('hi');
		this.moveRelative(d3.event.dx, d3.event.dy);
	};
	var drag = d3.behavior.drag()
							 .on('drag', dragMove);
	// element.call(drag);
	return drag;
};
*/