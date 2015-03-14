var Player = function(gameOptions) {
	Ship.call(this, gameOptions);
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

Player.prototype.transform = function(opt) {
	Ship.prototype.transform.call(this, opt);
	if (enemiesData) {
		for (var i=0; i<window.enemiesData.length; i++) {
			if (Math.pow(window.enemiesData[i].x - this.x,2)+ Math.pow(window.enemiesData[i].y -this.y,2) < Math.pow(window.enemiesData[i].r+this.r,2)){
				window.collide();
			}
		}
	}
};

Player.prototype.moveRelative = function(dx,dy) {
	this.transform({x:this.getX()+dx, y:this.getY()+dy});
};

Player.prototype.drag = d3.behavior.drag()
	.on("drag", function(d,i) {
		d.transform({
			x: d.x+d3.event.dx,
			y: d.y+d3.event.dy
		});
    d3.select(this).attr('cx', function(player) { return player.x; })
				 					 .attr('cy', function(player) { return player.y; })
});