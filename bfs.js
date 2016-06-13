var bfsStartX, bfsStartY;


var drawBfs = function() {

	clearMap();
	bfsStartX = bfsStartY = 0;

	if (!app.bfsQueue) {
		app.bfsQueue = async.queue(function (task, callback) {
			app.drawingQueue.push({ 
				x: task.x, 
				y: task.y, 
				fillStyle: task.squareColor
			});

			app.bfsQueue.pause();
			bfsPush(task.x+1, task.y  , task.squareColor);
			bfsPush(task.x  , task.y+1, task.squareColor);
			bfsPush(task.x-1, task.y  , task.squareColor);
			bfsPush(task.x  , task.y-1, task.squareColor);
			app.bfsQueue.resume();

	    	callback();
		}, 1);
	} else {
		app.bfsQueue.kill();
	}

	app.bfsQueue.drain = function() {
		bfsNextUnvisited();
	};

	// go through all squares, mark closed fields
    bfsNextUnvisited();		
};



var bfsPush = function(x, y, squareColor) {
	if (y < 0 || y >= app.input.fields.length || x < 0 || x >= app.input.fields[y].length)
		return;

	if (['X', 'V'].indexOf(app.input.fields[y][x]) > -1)
		return;

	app.input.fields[y][x] = 'V';
	app.bfsQueue.push({
		x: x,
		y: y,
		squareColor: squareColor	
	});
};


var bfsNextUnvisited = function() {

	var found = false;
	while (bfsStartY < app.input.fields.length && !found) {
		while (bfsStartX < app.input.fields[bfsStartY].length && !found) {
			if (app.input.fields[bfsStartY][bfsStartX] === ",") {
				bfsPush(bfsStartX, bfsStartY, getRandomColor(1));		
				found = true;		
			}
			if (!found)
				bfsStartX++;
		}
		if (!found) {
			bfsStartY++;
			bfsStartX = 0;
		}
	}
};