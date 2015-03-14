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
var gameBoard = d3.select('.container').append('svg:svg')
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

var playersData = [];
playersData.push(new Player(gameOptions).render(gameBoard));
var enemiesData = [];
for (var i=0; i < gameOptions.nEnemies; i++) {
	enemiesData.push(new Enemy(gameOptions, i).render(gameBoard));
}


var drag = d3.behavior.drag()
        .on("drag", function(d,i) {
            d.x += d3.event.dx
            d.y += d3.event.dy
            d3.select(this).attr("transform", function(d,i){
                return "translate(" + [ d.x - gameOptions.width*0.5,d.y - gameOptions.height*0.5] + ")"
            })
        });



var players = gameBoard.selectAll('.player')
												 .data(playersData);
	players.enter()
				 .append('svg:circle');
	players.attr('class','player')
				 .attr('fill', 'red')
				 .attr('cx', function(player) { return player.x; })
				 .attr('cy', function(player) { return player.y; })
				 .attr('r', function(player) { return player.r; })
				 .call(drag);
				 //.each(function(d, i){if(this&&d.setupDragging)this.call(d.setupDragging)});

	players.exit()
				 .remove();

var update=function(){


	var enemies = gameBoard.selectAll('.enemy')
				 							 	 .data(enemiesData);

	for (var i=0; i<enemiesData.length; i++){
		enemiesData[i].move();
	}
	enemies.enter()
				 .append('svg:circle');
	enemies.attr('class', 'enemy')
				 .attr('fill', 'black')
				 .transition()
				 .duration(1000)
				 .attr('cx', function(enemy) { return enemy.x; })
				 .attr('cy', function(enemy) { return enemy.y; })
				 .attr('r', function(enemy){ return enemy.r});
	enemies.exit()
				 .remove();

	

}



setInterval(update, 1000);
