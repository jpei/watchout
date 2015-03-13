var Player = function(gameOptions) {
	Ship.call(this, gameOptions);
	this.fill='red';
	this.r=5;
};

Player.prototype = Object.create(Ship.prototype);
Player.prototype.constructor = Player;

Player.prototype.render = function(to) {
	this.el = to.append('svg:path')
						  .attr('fill', this.fill);
	this.transform = {
		x: this.gameOptions.width*0.5,
		y: this.gameOptions.height*0.5
	};
	this.setupDragging();
};

Player.prototype.moveRelative = function(dx,dy) {
	this.transform({x:this.getX()+dx, y:this.getY()+dy, angle: 360*Math.atan2(dy,dx)/(Math.PI*2)});
};

Player.prototype.setupDragging = function() {
	var dragMove = function() { 
		this.moveRelative(d3.event.dx, d3.event.dy);
	};
	var drag = d3.behavior.drag()
							 .on('drag', dragMove);
	this.el.call(drag);
};