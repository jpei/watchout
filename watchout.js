// start slingin' some d3 here.

// initialize board properties
var gameOptions = {
	height: 450,
	width: 700,
	nEnemies: 30,
	padding: 20
}

// game stats obj
var gameStats = {
	score: 0,
	bestScore: 0
}

// axes
var axes = {
	x: d3.scale.linear().domain([0,100]).range([0, gameOptions.width]),
	y: d3.scale.linear().domain([0,100]).range([0, gameOptions.height])
}

// initialize the game board
var gameBoard=d3.select('.container').append('svg:svg')
								.attr('width', gameOptions.width)
								.attr('height', gameOptions.height);

var updateScore = function() {
	d3.select('#current-score')
		.text(gameStats.score.toString());
}

var updateBestScore = function() {
	gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
	d3.select('#best-score').text(gameStats.bestScore.toString());
}

var players = [];
players.push(new Player(gameOptions).render(gameBoard));
var enemies_data = [];
for (var i=0; i < gameOptions.nEnemies; i++) {
	enemies_data.push(new Enemy(gameOptions, i).render(gameBoard));
}

var enemies = gameBoard.selectAll('circle')
				 							 .data(enemies_data);

enemies.enter()
			 .append('svg:circle');

enemies.attr('class','enemy')
			 .attr('fill', 'black')
			 .attr('cx', function(enemy) { return enemy.x; })
			 .attr('cy', function(enemy) { return enemy.y; })
			 .attr('r', function(enemy){return enemy.r});
			 // .attr('height', 10+'px')
			 // .attr('width', 10+'px');		 

enemies.exit()
			 .remove();

