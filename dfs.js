var drawDfs = function() {

	clearMap();

	// go through all squares, mark closed fields
    for (y = 0; y < app.input.fields.length; y++) {

		for (x = 0; x < app.input.fields[y].length; x++) {

			if (app.input.fields[y][x] === ",") {
				dfsWalk(x, y, getRandomColor(1));
			}
		}
	}	
};


var dfsWalk = function(x, y, squareColor) {
	if (y < 0 || y >= app.input.fields.length || x < 0 || x >= app.input.fields[y].length)
		return;

	if (['X', 'V'].indexOf(app.input.fields[y][x]) > -1)
		return;

	app.input.fields[y][x] = 'V';	
	app.drawingQueue.push({ 
		x: x, 
		y: y, 
		fillStyle: squareColor
	});


	dfsWalk(x+1, y  , squareColor);
	dfsWalk(x  , y+1, squareColor);
	dfsWalk(x-1, y  , squareColor);
	dfsWalk(x  , y-1, squareColor);
};