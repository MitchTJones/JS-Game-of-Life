var	RECT_WIDTH   = 20,
	RECT_PADDING = 2,
	numRows = 0,
	numCols = 0,
	size;

var cells, positions, neighbors;

var mRect, mMove, mPos, mClick, mOn;

var infinity;

var playing;

var last_frame;

var fps = 60;
var fps_actual;

function init() {
	playing = false;
	infinity = true;
	window.onresize = reset;
	reset();
	last_frame = Date.now();
	draw();
	var updateFPS = setInterval(function() {
		var h;
		if (playing)
			h = fps_actual;
		else
			h = fps;
		rll_fps.html(h.toString());
	},1000);
}

function reset() {
	size = {x:RECT_WIDTH,y:RECT_WIDTH};
	mRect = cvs.getBoundingClientRect();
	properScale();
	cells = [];
	positions = [];
	neighbors = [];
	var w = cvs.clientWidth,
		h = cvs.clientHeight;
	var t = RECT_WIDTH+(2*RECT_PADDING);
	numRows = ~~((h-t-t)/t);
	numCols = ~~((w-t-t)/t);
	for (y = 0; y < numRows; y++) {
		cells[y] = [];
		positions[y] = [];
		neighbors[y] = [];
		for (x = 0; x < numCols; x++) {
			cells[y][x] = 0;
			positions[y][x] = {x:t*(x+1),y:t*(y+1)};
			neighbors[y][x] = getNeighbors(x,y);
		}
	}
	mOn = undefined;
}

function draw() {
	var n = Date.now();
	var d = n - last_frame;
	last_frame = n;
	fps_actual = ~~(1000/d);
	ctx.clearRect(0,0,cvs.width,cvs.height);
	var mousedOver = !mMove;
	cl(function(x,y,c,p) {
		if (c==1)
			cRect(p,size,'green');
		if (mMove) {
			if(within(mPos, p, size)) {
				mOn = {x:x,y:y};
				mousedOver = true;
			}
		}
	});
	if (playing) {
		cells = getAlive();
	} else {
		if (!mousedOver)
			mOn = undefined;
		if (typeof mOn !== 'undefined') {
			var x = mOn.x, y = mOn.y;
			coords(x,y);
			cRect(positions[y][x],size,'rgba(150,150,150,0.5)');
			if (mClick) {
				if (cells[y][x] == 1)
					cells[y][x] = 0;
				else
					cells[y][x] = 1
			}
		}
	}
	ctx.stroke();
	mClick = false;
	mMove = false;
	var _fps = 60;
	if (playing)
		_fps = fps;
	setTimeout(draw, 1000/_fps);
}

function within(v1, v2, s2) {
	var x1 = v1.x, y1 = v1.y, x2 = v2.x, y2 = v2.y, w  = s2.x, h  = s2.y;
	return (x2-w/2 <= x1 && x1 <= x2+w/2 && y2-h/2 <= y1 && y1 <= y2+h/2);
}

function cl(callback) {
	for (y = 0; y < numRows; y++)
		for (x = 0; x < numCols; x++)
			callback(x,y,cells[y][x], positions[y][x]);
}

function getAlive() {
	var a;
	if (infinity) {
		var as =
		[
			rollUp(rollLeft(cells)),
			rollUp(cells),
			rollUp(rollRight(cells)),
			rollLeft(cells),
			rollRight(cells),
			rollDown(rollLeft(cells)),
			rollDown(cells),
			rollDown(rollRight(cells))
		]
		a = add2Ds(as);
	} else {
		var yLen = numRows;
		var xLen = numCols;
		a = newArr2D(xLen, yLen);
		for (y = 0; y < yLen; y++) {
			for (x = 0; x < xLen; x++) {
				a[y][x] = 0;
				var ns = neighbors[y][x];
				for (i = 0; i < ns.length; i++) {
					var n = ns[i];
					a[y][x] += cells[n.y][n.x];
				}
			}
		}
	}
	return a.map(function(e, n) {
		return e.map(function(v, i) {
			if (cells[n][i] == 1) {
				if (v < 2)
					return 0;
				else if (v > 3)
					return 0;
				else
					return 1;
			} else {
				if (v == 3)
					return 1;
				else
					return 0;
			}
		});
	});
}


function getNeighbors(x,y) {
	var out = [];
	var xM = numCols;
	var yM = numRows;
	for (dx = (x > 0 ? -1 : 0); dx <= (x < xM-1 ? 1 : 0); dx++) {
		for (dy = (y > 0 ? -1 : 0); dy <= (y < yM-1 ? 1 : 0); dy++) {
			if (dx != 0 || dy != 0) {
				out.push({x:x+dx,y:y+dy});
			}
		}
	}
	return out;
}