var grass;
var sunImage;

var plant1;
var plant2;
var plant3;
var plant4;
var plant5;

var z1;
var z2;
var z3;
var z4;
var z5;
var z6;
var z7;
var z8;
var z9;
var z10;

var zm1;
var zm2;
var zm3;
var zm4;
var zm5;
var zm6;
var zm7;
var zm8;
var zm9;
var zm10;

var images = [];

function preload() {
	sunImage = loadImage('https://i.imgur.com/RiB2V5g.png');

	// plants
	plant1 = loadImage('https://i.imgur.com/qOvYhCX.png');
	plant2 = loadImage('https://i.imgur.com/ENvVueV.png');
	plant3 = loadImage('https://i.imgur.com/XLx94HW.png');
	plant4 = loadImage('https://i.imgur.com/CP0VvHT.png');
	plant5 = loadImage('https://i.imgur.com/hGPtIfJ.png');
	grass = loadImage('https://i.imgur.com/CTV41Yl.jpg');

	// zombies walk
	z1 = loadImage('https://i.imgur.com/asKsJCH.png');
	z2 = loadImage('https://i.imgur.com/WgcVD36.png');
	z3 = loadImage('https://i.imgur.com/3OwIpf2.png');
	z4 = loadImage('https://i.imgur.com/p4HPs8q.png');
	z5 = loadImage('https://i.imgur.com/3cPEocE.png');
	z6 = loadImage('https://i.imgur.com/JEhsPzo.png');
	z7 = loadImage('https://i.imgur.com/DTsqk5m.png');
	z8 = loadImage('https://i.imgur.com/TwFMRm5.png');
	z9 = loadImage('https://i.imgur.com/rlQGWAk.png');
	z10 = loadImage('https://i.imgur.com/Y3dBFYt.png');

	// zombies male walk
	zm1 = loadImage('https://i.imgur.com/j7bxhUb.png');
	zm2 = loadImage('https://i.imgur.com/OFJ8nFA.png');
	zm3 = loadImage('https://i.imgur.com/GJDqKVX.png');
	zm4 = loadImage('https://i.imgur.com/Mw2V50w.png');
	zm5 = loadImage('https://i.imgur.com/UGMwULY.png');
	zm6 = loadImage('https://i.imgur.com/lnczNsp.png');
	zm7 = loadImage('https://i.imgur.com/hcuGr5a.png');
	zm8 = loadImage('https://i.imgur.com/kGhpiKf.png');
	zm9 = loadImage('https://i.imgur.com/ez2PKYD.png');
	zm10 = loadImage('https://i.imgur.com/U0vOFZF.png');
}

function setup() {
	createCanvas(1000, 460);

	images = [plant1, plant2, plant3, plant4, plant5];
}

var tiles = [];

var selectedImage = '';

var Tile = function(x, y) {
	this.x = x;
	this.y = y;
	this.width = 100;
	this.height = 80;
	this.img = grass;

	this.fillTile = function(tile) {
		this.img && image(this.img, this.x, this.y, 100, 80);
		noFill();
		stroke(0, 60);
		rect(this.x, this.y, 100, 80);
	};
};

// populate the tiles array with indivudual tiles containing position x, y;
var setupTiles = function() {
	for (var x = 50; x < 1000 - 100; x += 100) {
		for (var y = 50; y < 460 - 50; y += 80) {
			var tile = new Tile(x, y);
			tiles.push(tile);
		}
	}
};
setupTiles();

function plantsBar(x, y) {
	this.x = x;
	this.y = y;
	this.count = 0;
	this.needed = 3;

	this.squares = [];

	stroke(20);
	fill(25, 200);
	rect(5, 0, 430, 55, 10);
	for (var i = 80; i < 370; i += 70) {
		fill(71, 130, 67);
		rect(i, 0, 70, 50, 10);
	}
	images.forEach(function(img) {
		image(img, 95 + this.count, 5, 40, 40);
		fill(255);
		textSize(15);
		text(this.needed, this.count + 130, 46);
		this.count += 70;
		this.needed += 3;
		this.squares.push(this.count);
	});

	this.squares.forEach(function(t, index) {
		var tXConstrained = constrain(mouseX, t, t + 70);
		var tYConstrained = constrain(mouseY, 0, 50);
		if (
			mouseX >= tXConstrained &&
			mouseX <= tXConstrained &&
			mouseY >= tYConstrained &&
			mouseY <= tYConstrained &&
			mouseIsPressed
		) {
			selectedImage = images[index];
		}
	});
}

var sun = {
	x: Math.random(50, 950),
	y: -100,
	widthHeight: 50,
	speed: 1,
	count: 0,

	initalPosition: function() {
		this.y = -100;
		this.x = random(50, 950);
	},

	showSun: function() {
		sunImage &&
			image(sunImage, this.x, this.y, this.widthHeight, this.widthHeight);
	},

	moveSun: function() {
		if (this.y < 550) {
			this.y++;
		} else {
			this.initalPosition();
		}
	},
	counter: function() {
		fill(71, 130, 67);
		rect(10, 0, 70, 50, 10);
		sunImage && image(sunImage, 55, 0, 30, 30);
		textSize(50);
		fill(255);
		var tx = this.count > 10 ? 15 : 30;
		text(this.count, tx, 45);
	},
	catchTheSun: function() {
		var radiusSun = this.widthHeight / 2;
		var D = dist(mouseX, mouseY, this.x + radiusSun, this.y + radiusSun);
		if (D < this.widthHeight / 2 && mouseIsPressed) {
			this.initalPosition();
			this.count++;
		}
	}
};

var probability = function() {
	var r = random(0, 100);
	if (r < 0.5) {
	}
};

function Zombie(x, y, speed, kind) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.counter = 0;
	this.fr = 0;
	this.height = 100;
	this.width = 100;

	this.zombiesWalk = [z1, z2, z3, z4, z5, z6, z7, z8, z9, z10];
	this.zombiesMaleWalk = [zm1, zm2, zm3, zm4, zm5, zm6, zm7, zm8, zm9, zm10];

	// when creating new zombie pass probability (1 to 10) to determine kind of zombie
	this.kind = kind > 0.5 ? this.zombiesMaleWalk : this.zombiesWalk;

	this.kinds = [this.zombiesMaleWalk, this.zombiesWalk];

	this.moveZombie = function() {
		if (this.fr % 6 === 0) {
			this.counter = this.counter < 9 ? this.counter + 1 : 0;
		}
		this.fr++;
		image(this.kind[this.counter], this.x, this.y, this.width, this.height);
		this.x = this.x > -10 ? this.x - this.speed : random(1000, 1200);
	};
}

var zzommbie = new Zombie(900, 25, 0.2, 0.95);

var backdrop = function() {
	background(138, 237, 132);
	for (var x = 50; x < width - 100; x += 100) {
		for (var y = 50; y < height - 50; y += 80) {
			image(grass, x, y, 100, 80);
		}
	}
	tiles.forEach(tile => tile.fillTile());
};

var runSun = function() {
	sun.showSun();
	sun.moveSun();
	sun.counter();
	sun.catchTheSun();
};

var draw = function() {
	backdrop();
	plantsBar();
	runSun();
	zzommbie.moveZombie();
};

var mouseClicked = function() {
	tiles.forEach(function(t) {
		// if clicked on tile, change the image for the new one
		if (
			mouseX > t.x &&
			mouseY > t.y &&
			mouseX < t.x + 100 &&
			mouseY < t.y + 80
		) {
			t.img = selectedImage;
		}
	});
};
