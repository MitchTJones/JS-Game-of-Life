function rect(location, size) {
	ctx.fillRect(location.x-size.x/2, location.y-size.y/2, size.x, size.y);
}

function cRect(location, size, color) {
	var pC = ctx.fillStyle;
	ctx.fillStyle=color;
	rect(location, size);
	ctx.fillStyle=pC;
}

function scaleCanvas(iVector) {
	cvs.width  = iVector.x;
	cvs.height = iVector.y;
}

function properScale() {
	scaleCanvas({x:cvs.clientWidth,y:cvs.clientHeight});
}

// function add1D(a, b) {
// 	var len = a.length;
// 	var out = new Array(len);
// 	for (i = 0; i < len; i++) {
// 		out[i] = a[i] + b[i];
// 	}
// }

// function add2D(a, b) {
// 	var yLen = a.length;
// 	var xLen = a[0].length;
// 	var out = newArr2D(yLen, xLen);
// 	for (y = 0; y < yLen; y++) {
// 		for (x = 0; x < xLen; x++) {
// 			out[y][x] = a[y][x] + b[y][x];
// 		}
// 	}
// 	return out;
// }

// function add2Ds(arr) {
// 	var len  = arr.length;
// 	var yLen = arr[0].length;
// 	var xLen = arr[0][0].length;
// 	var out = newArr2D(yLen, xLen);
// 	for (i = 0; i < len; i++) {
// 		var a = arr[i];
// 		for (y = 0; y < yLen; y++) {
// 			if (typeof a[y] == 'undefined') {
// 				console.log(yLen);
// 				console.log(y);
// 				console.log(i);
// 				console.log(a);
// 			}
// 			for (x = 0; x < xLen; x++) {
// 				out[y][x] += a[y][x];
// 			}
// 		}
// 	}
// }

// function roll(a, c) {
// 	var yLen = a.length;
// 	var xLen = a[0].length;
// 	var out = newArr2D(xLen, yLen);
// 	for (y = 0; y < yLen; y++) {
// 		for (x = 0; x < xLen; x++) {
// 			out[y][x] = c(a[y],x);
// 		}
// 	}
// 	return out;
// }

// function rollLeft(a) {
// 	return roll(a,function(e, i) {
// 		if (i == e.length-1)
// 			return e[0];
// 		else
// 			return e[i+1];
// 	});
// }

// function rollRight(a) {
// 	return roll(a,function(e, i) {
// 		if (i == 0)
// 			return e[e.length-1];
// 		else
// 			return e[i-1];
// 	});
// }

// function rollUp(a) {
// 	return a.map(function(v, i) {
// 		if (i == a.length-1)
// 			return a[0];
// 		else
// 			return a[i+1];
// 	});
// }

// function rollDown(a) {
// 	return a.map(function(v, i) {
// 		if (i == 0)
// 			return a[a.length-1];
// 		else
// 			return a[i-1];
// 	});
// }

function add1D(a, b) {
	return a.map(function(v, i) {
		return v + b[i];
	});
}

function add2D(a, b) {
	return a.map(function(e, n) {
		return e.map(function(v, i) {
			return v + b[n][i];
		});
	});
}

function add2Ds(arr) {
	return arr[0].map(function(e, n) {
		return e.map(function(v, idx) {
			for (i = 1; i < arr.length; i++) {
				v += arr[i][n][idx];
			}
			return v;
		});
	});
}

function roll(a, c) {
	return a.map(function(e, n) {
		return e.map(function(v, i) {
			return c(e,i);
		});
	});
}

function rollLeft(a) {
	return roll(a,function(e, i) {
		if (i == e.length-1)
			return e[0];
		else
			return e[i+1];
	});
}

function rollRight(a) {
	return roll(a,function(e, i) {
		if (i == 0)
			return e[e.length-1];
		else
			return e[i-1];
	});
}

function rollUp(a) {
	return a.map(function(v, i) {
		if (i == a.length-1)
			return a[0];
		else
			return a[i+1];
	});
}

function rollDown(a) {
	return a.map(function(v, i) {
		if (i == 0)
			return a[a.length-1];
		else
			return a[i-1];
	});
}

function newArr2D(x,y) {
	var out = new Array(y);
	for (i = 0; i < y; i++) {
		out[i] = new Array(x);
	}
	return out;
}