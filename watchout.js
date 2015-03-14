// start slingin' some d3 here.

// initialize board properties
var gameOptions = {
	height: 450,
	width: 700,
	nEnemies: 50,
	padding: 20
};

// game stats obj
var gameStats = {
	collisions: 0,
	collidedRecently : false,
	score: 0,
	bestScore: 0,
	timeBetweenMove: 5000
};

// axes
var axes = {
	x: d3.scale.linear().domain([0,100]).range([0, gameOptions.width]),
	y: d3.scale.linear().domain([0,100]).range([0, gameOptions.height])
};

// initialize the game board
var gameBoard = d3.select('.container').append('svg:svg')
									.attr('width', gameOptions.width)
									.attr('height', gameOptions.height);

var updateScore = function() {
	d3.select('#current-score')
		.text(gameStats.score.toString());
};

var updateBestScore = function() {
	gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
	d3.select('#best-score').text(gameStats.bestScore.toString());
};

var collide = function() {
	if (!gameStats.collidedRecently) {
		players.classed('invincible', !players.classed('invincible'));
		gameStats.collisions++;
		d3.select('.collisions span').data([gameStats.collisions]).text(function(d){return d.toString()});
		updateBestScore();
		gameStats.score = 0;
		updateScore();
		gameStats.collidedRecently = true;
		setTimeout(function() {
			players.classed('invincible', !players.classed('invincible'));
			gameStats.collidedRecently = false
		}, gameStats.timeBetweenMove);
	}
}

var playersData = [];
playersData.push(new Player(gameOptions).render(gameBoard));
var enemiesData = [];
for (var i=0; i < gameOptions.nEnemies; i++) {
	enemiesData.push(new Enemy(gameOptions, i).render(gameBoard));
}

var players = gameBoard.selectAll('.player')
											 .data(playersData);
	players.enter()
				 .append('svg:circle');
	players.attr('class','player')
				 .attr('cx', function(player) { return player.x; })
				 .attr('cy', function(player) { return player.y; })
				 .attr('r', function(player) { return player.r; })
				 .call(playersData[0].drag);

var update = function(){
	for (var i=0; i<enemiesData.length; i++){
		enemiesData[i].move();
	}
	var enemies = gameBoard.selectAll('.enemy')
				 							 	 .data(enemiesData);
	enemies.enter()
				 .append('svg:circle');
	enemies.attr('class', 'enemy')
				 .transition()
				 .duration(1000)
				 .tween('test', function() { return function(t) {
				 	if (Math.pow(this.cx.animVal.value - playersData[0].x,2)+ Math.pow(this.cy.animVal.value -playersData[0].y,2) < Math.pow(this.r.animVal.value+playersData[0].r,2)){
				 		collide();
				 	}

				 }})
				 .attr('cx', function(enemy) { return enemy.x; })
				 .attr('cy', function(enemy) { return enemy.y; })
				 .attr('r', function(enemy){ return enemy.r});
	enemies.exit()
				 .remove();
}
update();
setInterval(update, gameStats.timeBetweenMove);
