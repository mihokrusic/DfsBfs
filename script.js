/*jshint esversion: 6 */
var app = {
	objects: {
		canvas: undefined,
		ctx: undefined
	},
	input: {
		original: undefined,
		parsed: undefined,
		fields: []
	},
	drawingQueue: undefined,
	bfsQueue: undefined,
	options: {
		grass: "rgba(0, 0, 250, 0.2)",
		fence: "rgba(0, 0, 0, 1)"
	}
};





app.input.original = `
,,,,,,,,,,,,,,,,,,,,,,,,,,,XXXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XXX,,,,,,,,,XXX
,,,,,,,,,,,,,,,,,,,,,,,XXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,XXXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,XXXXXXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,XXXXXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,XXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,XXX,,,,,,,,,,,,,XXXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,XXX,,,,,,,,,XXXXXX,,XXXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XXXXXXX,,,,,XXXX
,,,,,,,,,,,,,,XXXXXXXXX,,,,,,,,,,,XXXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XXX,,,,,,XX,XXX,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XXXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,XXX,,,,,,,,,XXX,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XXXXX,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,XX,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XXXX,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,XX,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XXXXXXXXXXXXXX,,,XXXX,,,,,,,,XXXX,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XXXX,,,,,,,,,,,,,,,,,,XXXX,,,,,XXXXX,,,,,,,,,,XX,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,XXXX,,,,,,,,,,,,,XXXX,,,,,,,,,,XXX,,,,,,,,,XXX,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,XX,,,,,,,,XXXX,,,,,,,,,,,,,,,,XXXX,,,,,,,,XXXX,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,XXXXXXXXXX,,,,,,,,,,,,,,,,,XXX,,,,,,,,,XXX,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,X,,,,,,,,,X,,,,,,,,XX,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,XX,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,X,X,X,,,,X,,,,,,,,XX,,,,,,,,,,,,,,,,XXX,,,,,,,,,XXX,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XXXXXXXX,,XX,,,,,,,,XX,,,,,,,,,,,,,,,X,,,,,,XXXX,,XX,,,,,,,,,,
,,XXX,,XXXX,,,,,,,,,,,,,,,XXXX,,,,,,,,XX,,,,,,,,,XX,,,,XXX,XXXXX,,,X,,,,,,,,XXXXX,,,,,,,,,,,
XX,,XXX,,XXXX,,,,,,,,,,,,,XXXX,,,,,,,,,,,,,,,,,,,,XXXX,,,XXX,,,XXXXX,,,,,,,,,,,XXXXX,,,,,,,,
,,,,,,,,,,XXX,,,,,,,,,,,,,,,,,XXX,,,,,,,,,,,,,,,,,,,XX,,XXX,,,,,,,,,XXXXX,,,XXXXX,,,XXXXXXXX
,,,,,,,,,,,XXXX,,,,,,,,,,,XXXX,,,,,,,,,,,,,,,,,,,,,XXXXXX,,,,,,,,,,,,,,,XXXXX,,,X,,,,,,,,,,,
,,,,,XXXX,,,,,XXXX,,,,,,,,,,XXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,X,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,XXXXXX,,XXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,X,,,,,,,,,,,,,
,,,,,,,,,,,,,,,XXX,,,,XXXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,XXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XXXX,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XXX,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,X,,,,,,,,XXXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,XX,,,,XXX,,,,XXXX,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,XXXX,,,,XX,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,XXX,,,,,X,,,,,,,,,,X,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,XX,,,,,XXXXXX,,,,XXXX,,,,,,,,,,,,,,,,,X,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,XX,XXX,,,,,XXXX,,,,XXX,,,,,,,,,,,,XX,XXXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,XXX,,,,,,XXX,,,,,,,XXX,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,XXXX,,,XX,,,,,,,,,X,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,XXXXX,,,,,,,,XXX,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,XX,,,XXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,XXXXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
XXXX,,,,,,,,,,,,,,,,,,,,XXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,XX,,,,,,,,,,,,,,,,,,,,XXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,XXX,,,,,,,,X,,,,,,,,XXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,XXXXXXXXX,XX,,XXXXX,XXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,XXXX,,,,,,XXXX,,,,,,,,,,,,,,,,,,,X,,,,,,,,,,,,,,,XXX,,XXXXXXXXX,,,XXXXXXXXX
,,,,,,,,,,,,,XXXX,,,,,,,,,,,,,XX,,XXXX,,,,,,,,,,,,XXXXXXXXXXXXXXXXXXXXX,,,,,,,,,XXX,,,,,,,,,
,,,,,,,,,,,,,,,,,XX,,,,,,,,,,,XXXX,,,,XXXX,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,X,,,,,,,,,,,,,,,,,,,,,XX,,,,,,,,X,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,XXX,,,,,,,,,,,,,,,,,,XX,,,,,,,,X,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,XXXXXX,,,,,,,,,,,,,,,,,,XX,,,,,,,,X,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,XXXX,,,,XXX,,,,,,,,,,,,,,,,XX,,,,,,,,X,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,XXXXXXX,,,,,,XX,,,,,,,,,,,,,,,,XX,,,,,,,X,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,X,,,,,,,,,,,,,,,,,XX,,,,,X,,,,,,,,,,,,,,,,,,,,,,,,,,,XXX,,,,,,,,,XXX,
,,,,,,,,,,,,,,,,,,XXXXX,,,,,,,,,,,,,,,,,,,XX,,,,X,,,,,,,,,,,,,,,,,,,,,,,XXXX,,,X,,,,XXXX,,,X
,,,,,,,,,,,,,,,,,XXX,,,,,,,,,,,,,,,,,,,,,,,XX,,,X,,,,,,,,,,,,,,,,,,,,XXX,,,,,,,XXXXX,,,,,,,,
,,,,,,,,,,,,,,XXXXX,,,,,,,,,,,,,,,,,,,,,,,,,XX,,X,,,,,,,,,,,,,,,,,,XXX,,,,,,,,,,XX,,,,,,,,,,
,,,,,,,,,,,,XXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,X,,,,,,,,,,,,,,,,,,,,,XXX,,,,,,,,,XXX,,,,,,,
,,,,,,,,,,,,,XXXXXXX,,,XXXXXXXXXX,,,,,,,,,,,XX,,X,,,,,,,,,,,,,,,,,,,,,,,XXX,,,,X,,,,XXX,,,,X
,,,,,,,,,,,XX,X,,,XXXXXX,,,,,,,XXXXX,,,,,,,,,XX,X,,,,,,,,,,,,,,,,,,,,,,,,,,XXXXX,,,,,,,XXXXX
,,,,,,,,,,XX,,,,,XXX,,,,,,,,,,,,,,,XXXXX,,,XX,,,X,,,,,,,,,,,,,,,,,,,,XXX,,,,,,,XXXXX,,,,,,,,
,,,,,,,,,,,XX,XXXXX,,,,,,,,,,,,,,,,,,,,XXXXXXX,,X,,,,,,,,,,,,,,,,,,XXX,,,,,,,,,,XX,,,,,,,,,,
,,,,,,,,,,,,XXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,X,,,,,,,,,,,,,,,,,,,,,XXX,,,,,,,,,XXX,,,,,,,
,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,X,,,,,,,,,,,,,,,,,,,,,,,XXX,,,,X,,,,XXX,,,,X
,,,,,,,,,,,,,,XXXX,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,X,,,,,,,,,,,,,,,,,,,,,,,,,,XXXXX,,,,,,,XXXXX
,,,,,,,,,,,,,,,,,XXX,,,,,,,,,,,,,,,,,,,,,,,XX,,,X,,,,,,,,,,,,,,,,,,,,XXX,,,,,,,XXXXX,,,,,,,,
,,,,,,,,,,,,,,XXXXX,,,,,,,,,,,,,,,,,,,,,,,,,XX,,X,,,,,,,,,,,,,,,,,,XXX,,,,,,,,,,XX,,,,,,,,,,
,,,,,,,,,,,,XXX,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,,X,,,,,,,,,,,,,,,,,,,,,XXX,,,,,,,,,XXX,,,,,,,
,,,,,,,,,,,,,XX,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,,X,,,,,,,,,,,,,,,,,,,,,,,XXX,,,,X,,,,XXX,,,,X
,,,,,,,,,,,,,,X,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,XX,X,,,,,,,,,,,,,,,,,,,,,,,,,,XXXXX,,,,,,,XXXXX
`;


var onLoad = function() {
	app.objects.canvas = document.getElementById('canvasElem');
	app.objects.ctx = app.objects.canvas.getContext('2d');

	document.getElementById("btnDfs").addEventListener('click', drawDfs, false);
	document.getElementById("btnBfs").addEventListener('click', drawBfs, false);
	document.getElementById("btnClear").addEventListener('click', clearMap, false);

	// parse input
	app.input.parsed = (app.input.original.trim().replace( /\n/g, "|" ).split("|"));

	// create queue
	app.drawingQueue = async.queue(function (task, callback) {
    	drawSquare(task.x, task.y, task.fillStyle);

    	setTimeout(callback, 0);
	}, 1);

	initializeFieldsAndMap();
};



var initializeFieldsAndMap = function() {

	var x, y;

	app.objects.ctx.clearRect(0, 0, app.objects.canvas.width, app.objects.canvas.height);
	app.input.fields = [];

	// Initialize structure
	for (y = 0; y < app.input.parsed.length; y++) {
		app.input.fields.push([]);
		for (x = 0; x < app.input.parsed[y].length; x++) {
			app.input.fields[y].push(app.input.parsed[y].charAt(x));
		}
	}


	// draw initial squares
    for (y = 0; y < app.input.fields.length; y++) {

		for (x = 0; x < app.input.fields[y].length; x++) {

			switch (app.input.fields[y][x]) {
				case ",": 
				case "V": 
					drawSquare(x, y, app.options.grass);
					break;
				case "X": 
					drawSquare(x, y, app.options.fence);
					break;
			}
		}
	}	
};


var getRandomColor = function(alpha) {
    var r = Math.trunc(255 * Math.random()),
        g = Math.trunc(255 * Math.random()),
        b = Math.trunc(255 * Math.random());
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
};



var drawSquare = function(x, y, fillStyle) {
	app.objects.ctx.fillStyle = fillStyle;
	app.objects.ctx.fillRect(x * 10, y * 10, 10, 10);	
};


var clearMap = function() {
	app.drawingQueue.kill();
	initializeFieldsAndMap();
};