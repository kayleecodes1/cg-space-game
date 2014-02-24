//////////////////////////////
//                          //
//       MENU UI CODE       //
//                          //
//////////////////////////////

// If the Ship Type input is changed,
// display the appropriate picture
$('#ShipType').change(function(){
	if($(this).val() == 'Assault'){
		$('#ShipPreview').attr('src', 'assets/player_Assault1.png');
	}else{
		$('#ShipPreview').attr('src', 'assets/player_Bomber1.png');
	}
}).change();

// Position the mute button next to the viewport
$(window).resize(function(){
	var viewportOffset = $('#viewport').offset();
	$('#Mute').css('top', viewportOffset.top + 35);
	$('#Mute').css('left', viewportOffset.left - $('#Mute').outerWidth() - 35);
}).resize();

// Position the powerup key next to the viewport
$(window).resize(function(){
	var viewportOffset = $('#viewport').offset();
	$('#PowerUpKey').css('top', viewportOffset.top + $('#Mute').outerHeight() + 70);
	$('#PowerUpKey').css('left', viewportOffset.left - $('#PowerUpKey').outerWidth() - 35);
}).resize();

// Position the dev controls next to the viewport
$(window).resize(function(){
	var viewportOffset = $('#viewport').offset();
	$('#DevControls').css('top', viewportOffset.top + 35);
	$('#DevControls').css('left', viewportOffset.left + $('#viewport').outerWidth() + 35);
}).resize();

// If the mute button is pressed, change
// its state and change the global variable
$('#Mute').click(function(){
	// If the game is muted, unmute the game
	if(GAME_MUTED)
	{
		GAME_MUTED = false;
		// Resume the soundtrack
		if(GAME_STARTED && !GAME_OVER){ MUSIC_SOUNDTRACK.play(); }
		// Update the mute button
		$('#Mute').html('MUTE');
	}
	// Otherwise, mute the game
	else
	{
		GAME_MUTED = true;
		// Pause the soundtrack
		MUSIC_SOUNDTRACK.pause();
		// Update the mute button
		$('#Mute').html('UNMUTE');
	}
});

///////////////////////////////
//                           //
//       INITIAL SETUP       //
//                           //
///////////////////////////////

/////////////////////////////////
// Constant / Global Variables //
/////////////////////////////////

// Create the Raphael canvas
var VIEWPORT_WIDTH = 1000;
var VIEWPORT_HEIGHT = 800;
var VIEWPORT = Raphael('viewport', VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

// Frames rendered per millisecond
var FPMS = 10;

// Whether the game is muted
var GAME_MUTED = false;

// Music and sound effects buffering
var MUSIC_SOUNDTRACK = new Audio("assets/ObstacleCourse.wav");
MUSIC_SOUNDTRACK.loop = true;

var SFX_LASER_SMALL = new Audio("assets/sfx_laser_small.mp3");
SFX_LASER_SMALL.volume = .5;
var SFX_LASER_MEDIUM = new Audio("assets/sfx_laser_medium.mp3");
SFX_LASER_MEDIUM.volume = .5;
var SFX_LASER_LARGE = new Audio("assets/sfx_laser_large.mp3");
SFX_LASER_LARGE.volume = .5;
var SFX_LASER_HUGE = new Audio("assets/sfx_laser_huge.mp3");
SFX_LASER_HUGE.volume = .5;

var SFX_POWERUP_1 = new Audio("assets/sfx_powerup_1.wav");
var SFX_POWERUP_2 = new Audio("assets/sfx_powerup_2.wav");
var SFX_POWERUP_3 = new Audio("assets/sfx_powerup_3.wav");
var SFX_POWERUP_4 = new Audio("assets/sfx_powerup_4.wav");

var SFX_PLAYER_SCORE = new Audio("assets/sfx_player_score.wav");
SFX_PLAYER_SCORE.volume = .5;
var SFX_PLAYER_LEVELUP = new Audio("assets/sfx_player_levelup.wav");
var SFX_PLAYER_HIT = new Audio("assets/sfx_player_hit.wav");
var SFX_PLAYER_SHIELDRECHARGE = new Audio("assets/sfx_player_shieldrecharge.wav");
var SFX_PLAYER_DESTROY = new Audio("assets/sfx_player_destroy.wav");

// Whether the game has started
var GAME_STARTED = false;

// Information about the game's background
var BACKGROUND_SCROLL_SPEED = 2;
// The game's background
var BACKGROUND = null;

// Information about the player's ship
var PLAYER_WIDTH = 75;
var PLAYER_HEIGHT = 100;
var PLAYER_START_X = VIEWPORT_WIDTH / 2;
var PLAYER_START_Y = VIEWPORT_HEIGHT - PLAYER_HEIGHT;
var PLAYER_RESPAWN_TIME = 150;
var PLAYER_SHIELD_CHARGE_COOLDOWN = 150;
var PLAYER_SHIELD_CHARGE_AMOUNT = 1;
var PLAYER_INVINCIBILITY_TIME = 200;
// The player
var PLAYER = null;

// The score checkpoints for ship upgrades
var UPGRADE_SCORE_2 = 1000;
var UPGRADE_SCORE_3 = 3000;
var UPGRADE_SCORE_4 = 8000;
var UPGRADE_SCORE_5 = 20000;
var UPGRADE_SCORE_6 = 50000;

// The stats for player ship type / level
var PLAYER_ASSAULT1 = {	// ASSAULT 1 //
	speed: 5, laserDmg: 10, laserSpeed: 70, laserWidth: 4,
	laserLength: 15, laserCount: 1, laserSound: SFX_LASER_SMALL,
	attackCooldown: 65
};
var PLAYER_ASSAULT2 = {	// ASSAULT 2 //
	speed: 7, laserDmg: 20, laserSpeed: 90, laserWidth: 4,
	laserLength: 20, laserCount: 1, laserSound: SFX_LASER_SMALL,
	attackCooldown: 60
};
var PLAYER_ASSAULT3 = {	// ASSAULT 3 //
	speed: 10, laserDmg: 40, laserSpeed: 110, laserWidth: 6,
	laserLength: 25, laserCount: 1, laserSound: SFX_LASER_SMALL,
	attackCooldown: 55
};
var PLAYER_ASSAULT4 = {	// ASSAULT 4 //
	speed: 13, laserDmg: 60, laserSpeed: 140, laserWidth: 6,
	laserLength: 30, laserCount: 2, laserSound: SFX_LASER_MEDIUM,
	attackCooldown: 50
};
var PLAYER_ASSAULT5 = {	// ASSAULT 5 //
	speed: 17, laserDmg: 70, laserSpeed: 190, laserWidth: 8,
	laserLength: 40, laserCount: 2, laserSound: SFX_LASER_MEDIUM,
	attackCooldown: 45
};
var PLAYER_ASSAULT6 = {	// ASSAULT 6 //
	speed: 21, laserDmg: 100, laserSpeed: 230, laserWidth: 10,
	laserLength: 50, laserCount: 2, laserSound: SFX_LASER_MEDIUM,
	attackCooldown: 40
};
var PLAYER_BOMBER1 = {	// BOMBER 1 //
	speed: 3, laserDmg: 20, laserSpeed: 60, laserWidth: 10,
	laserLength: 6, laserCount: 1, laserSound: SFX_LASER_MEDIUM,
	attackCooldown: 95
};
var PLAYER_BOMBER2 = {	// BOMBER 2 //
	speed: 4, laserDmg: 50, laserSpeed: 80, laserWidth: 14,
	laserLength: 8, laserCount: 1, laserSound: SFX_LASER_MEDIUM,
	attackCooldown: 95
};
var PLAYER_BOMBER3 = {	// BOMBER 3 //
	speed: 6, laserDmg: 80, laserSpeed: 100, laserWidth: 14,
	laserLength: 10, laserCount: 2, laserSound: SFX_LASER_LARGE,
	attackCooldown: 85
};
var PLAYER_BOMBER4 = {	// BOMBER 4 //
	speed: 8, laserDmg: 110, laserSpeed: 120, laserWidth: 18,
	laserLength: 12, laserCount: 2, laserSound: SFX_LASER_LARGE,
	attackCooldown: 85
};
var PLAYER_BOMBER5 = {	// BOMBER 5 //
	speed: 11, laserDmg: 140, laserSpeed: 140, laserWidth: 18,
	laserLength: 14, laserCount: 3, laserSound: SFX_LASER_HUGE,
	attackCooldown: 75
};
var PLAYER_BOMBER6 = {	// BOMBER 6 //
	speed: 14, laserDmg: 170, laserSpeed: 150, laserWidth: 22,
	laserLength: 15, laserCount: 3, laserSound: SFX_LASER_HUGE,
	attackCooldown: 75
};

// Information about the player's reticle
var RETICLE_RADIUS = 25;
var RETICLE_WIDTH = 3;
var RETICLE_COLOR = '#5997D8';

// How many frames between enemy waves
var ENEMY_INTERVAL = 1000;
// The enemies in the game
var ENEMIES = [];

// The enemy waves
var WAVE1 = [	// Scattered 1's
	{type: 1, x: 40, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 150, y: -146, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 240, y: -86, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 360, y: -180, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 500, y: -60, speedX: 0, speedY: 1, targets: false}
];
var WAVE2 = [	// Row of 1's
	{type: 1, x: 40, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 120, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 200, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 280, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 360, y: -26, speedX: 0, speedY: 1, targets: false}
];
var WAVE3 = [	// V of 1's
	{type: 1, x: 40, y: -146, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 120, y: -86, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 200, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 280, y: -86, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 360, y: -146, speedX: 0, speedY: 1, targets: false}
];

var WAVE4 = [	// 1's traveling diagonally across eachother
	{type: 1, x: 40, y: -26, speedX: -.1, speedY: 1, targets: false},
	{type: 1, x: 120, y: -26, speedX: .1, speedY: 1, targets: false},
	{type: 1, x: 200, y: -26, speedX: .1, speedY: 1, targets: false},
	{type: 1, x: 280, y: -26, speedX: -.1, speedY: 1, targets: false},
	{type: 1, x: 360, y: -26, speedX: .1, speedY: 1, targets: false}
];
var WAVE5 = [	// Double row of 1's
	{type: 1, x: 40, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 120, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 200, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 280, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 360, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 80, y: -150, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 160, y: -150, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 240, y: -150, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 320, y: -150, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 400, y: -150, speedX: 0, speedY: 1, targets: false}
];
var WAVE6 = [	// V of 1's with a 2
	{type: 1, x: 40, y: -146, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 120, y: -86, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 200, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 280, y: -86, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 360, y: -146, speedX: 0, speedY: 1, targets: false},
	{type: 2, x: 200, y: -175, speedX: 0, speedY: .9, targets: false}
];

var WAVE7 = [	// V of 1's that target player
	{type: 1, x: 40, y: -146, speedX: 0, speedY: 1, targets: true},
	{type: 1, x: 120, y: -86, speedX: 0, speedY: 1, targets: true},
	{type: 1, x: 200, y: -26, speedX: 0, speedY: 1, targets: true},
	{type: 1, x: 280, y: -86, speedX: 0, speedY: 1, targets: true},
	{type: 1, x: 360, y: -146, speedX: 0, speedY: 1, targets: true}
];
var WAVE8 = [	// Row of 2's
	{type: 2, x: 50, y: -26, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 200, y: -26, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 350, y: -26, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 500, y: -26, speedX: 0, speedY: .9, targets: false}
];
var WAVE9 = [	// 2's Escorting a 3, the 3 targets
	{type: 2, x: 40, y: -146, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 140, y: -86, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 240, y: -26, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 340, y: -86, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 420, y: -146, speedX: 0, speedY: .9, targets: false},
	{type: 3, x: 240, y: -195, speedX: 0, speedY: .8, targets: true}
];

var WAVE10 = [	// Three 3's that target
	{type: 3, x: 50, y: -26, speedX: 0, speedY: .8, targets: true},
	{type: 3, x: 250, y: -26, speedX: 0, speedY: .8, targets: true},
	{type: 3, x: 450, y: -26, speedX: 0, speedY: .8, targets: true}
];
var WAVE11 = [	// A huge wave of 1's
	{type: 1, x: 40, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 200, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 280, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 360, y: -26, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 160, y: -150, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 240, y: -150, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 400, y: -150, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 420, y: -226, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 500, y: -226, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 660, y: -226, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 460, y: -350, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 540, y: -350, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 620, y: -350, speedX: 0, speedY: 1, targets: false},
	{type: 1, x: 700, y: -350, speedX: 0, speedY: 1, targets: false}
]
var WAVE12 = [	// Row of 2's with two 3's trailing, 3's target
	{type: 2, x: 50, y: -26, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 200, y: -26, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 350, y: -26, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 500, y: -26, speedX: 0, speedY: .9, targets: false},
	{type: 3, x: 125, y: -160, speedX: 0, speedY: .8, targets: true},
	{type: 3, x: 425, y: -160, speedX: 0, speedY: .8, targets: true}
];

var WAVE13 = [	// Row of 3's, half target
	{type: 3, x: 50, y: -26, speedX: 0, speedY: .8, targets: true},
	{type: 3, x: 200, y: -26, speedX: 0, speedY: .8, targets: false},
	{type: 3, x: 350, y: -26, speedX: 0, speedY: .8, targets: true},
	{type: 3, x: 500, y: -26, speedX: 0, speedY: .8, targets: false}
];
var WAVE14 = [	// V of 3's escorting a 4, 4 targets
	{type: 3, x: 80, y: -146, speedX: 0, speedY: .8, targets: false},
	{type: 3, x: 200, y: -86, speedX: 0, speedY: .8, targets: false},
	{type: 3, x: 320, y: -26, speedX: 0, speedY: .8, targets: false},
	{type: 3, x: 440, y: -86, speedX: 0, speedY: .8, targets: false},
	{type: 3, x: 560, y: -146, speedX: 0, speedY: .8, targets: false},
	{type: 4, x: 320, y: -280, speedX: 0, speedY: .7, targets: true}
];
var WAVE15 = [	// A huge wave of 2's
	{type: 2, x: 40, y: -26, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 200, y: -26, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 360, y: -26, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 160, y: -150, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 400, y: -150, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 500, y: -226, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 660, y: -226, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 460, y: -350, speedX: 0, speedY: .9, targets: false},
	{type: 2, x: 700, y: -350, speedX: 0, speedY: .9, targets: false}
];

var WAVE16 = [	// A line of 3s, fast line of 2's, slow trailing 4's, 3's and 4's target
	{type: 1, x: 110, y: -200, speedX: 0, speedY: 2, targets: false},
	{type: 1, x: 190, y: -200, speedX: 0, speedY: 2, targets: false},
	{type: 1, x: 270, y: -200, speedX: 0, speedY: 2, targets: false},
	{type: 1, x: 350, y: -200, speedX: 0, speedY: 2, targets: false},
	{type: 1, x: 430, y: -200, speedX: 0, speedY: 2, targets: false},
	{type: 3, x: 50, y: -26, speedX: 0, speedY: .8, targets: true},
	{type: 3, x: 200, y: -26, speedX: 0, speedY: .8, targets: true},
	{type: 3, x: 350, y: -26, speedX: 0, speedY: .8, targets: true},
	{type: 3, x: 500, y: -26, speedX: 0, speedY: .8, targets: true},
	{type: 4, x: 125, y: -280, speedX: 0, speedY: .6, targets: true},
	{type: 4, x: 425, y: -280, speedX: 0, speedY: .6, targets: true}
];
var WAVE17 = [	// A huge wave of 3's
	{type: 3, x: 40, y: -26, speedX: 0, speedY: .8, targets: false},
	{type: 3, x: 200, y: -26, speedX: 0, speedY: .8, targets: false},
	{type: 3, x: 160, y: -225, speedX: 0, speedY: .8, targets: false},
	{type: 3, x: 500, y: -226, speedX: 0, speedY: .8, targets: false},
	{type: 3, x: 660, y: -226, speedX: 0, speedY: .8, targets: false},
	{type: 3, x: 700, y: -425, speedX: 0, speedY: .8, targets: false}
];
var WAVE18 = [	// 3's escorting two 4's, all target
	{type: 3, x: 150, y: -26, speedX: 0, speedY: .8, targets: true},
	{type: 3, x: 300, y: -26, speedX: 0, speedY: .8, targets: true},
	{type: 3, x: 450, y: -26, speedX: 0, speedY: .8, targets: true},
	{type: 3, x: 600, y: -26, speedX: 0, speedY: .8, targets: true},
	{type: 4, x: 225, y: -280, speedX: 0, speedY: .7, targets: true},
	{type: 4, x: 525, y: -280, speedX: 0, speedY: .7, targets: true},
	{type: 3, x: 70, y: -320, speedX: 0, speedY: .8, targets: true},
	{type: 3, x: 680, y: -320, speedX: 0, speedY: .8, targets: true}
];

// The array of enemy waves organized by level
var WAVES = [
	[WAVE1, WAVE2, WAVE3],
	[WAVE4, WAVE5, WAVE6],
	[WAVE7, WAVE8, WAVE9],
	[WAVE10, WAVE11, WAVE12],
	[WAVE13, WAVE14, WAVE15],
	[WAVE16, WAVE17, WAVE18]
];	

// Information about the lasers
var PLAYER_LASER_COLOR = '#5997D8';
var ENEMY_LASER_COLOR = '#F4812C';
// The lasers in the game
var LASERS = [];

// Interval between chances for a powerup
var POWERUP_INTERVAL = 1800;
// The powerups in the game
var POWERUPS = [];

// Whether the game is over
var GAME_OVER = false;

///////////////////////////////
//                           //
//  STATIC HELPER FUNCTIONS  //
//                           //
///////////////////////////////

// Resets the game to be played again
function gameReset()
{
	// Hide the game over title
	$('#title_GameOver').fadeOut();
	
	// Hide the game over menu
	$('#menu_GameOver').fadeOut();
	
	// Show the game title
	$('#title').fadeIn();
	
	// Reset the inputs and show the menu
	$('#PlayerName').val('');
	$('#ShipType').val('Assault');
	$('#menu').fadeIn();
	
	GAME_STARTED = false;
	GAME_OVER = false;
}

// Starts the game with the selected settings
function gameStart()
{		
	// Create the player's ship
	PLAYER = new Player($('#PlayerName').val(), $('#ShipType').val());
	
	// Reset the enemies, lasers, and powerups
	ENEMIES = [];
	LASERS = [];
	POWERUPS = [];
	
	// Create the game's background
	BACKGROUND = new Background();
	
	// Hide the menu
	$('#menu').fadeOut();
	
	// Hide the game title
	$('#title').fadeOut();
	
	// Show the powerup key
	$('#PowerUpKey').fadeIn();
	
	// Show the dev controls
	$('#DevControls').fadeIn();
	
	// Hide the cursor in the game window
	$('#viewport').css('cursor', 'none');
	
	// Start the soundtrack
	MUSIC_SOUNDTRACK.currentTime = 0;
	playSound(MUSIC_SOUNDTRACK);
	
	// Start the game
	GAME_STARTED = true;
	GAME_OVER = false;
	step();
	setTimeout("enemyWave()", ENEMY_INTERVAL * FPMS);
	setTimeout("powerUp()", POWERUP_INTERVAL * FPMS);
}

// Generate the given wave of enemies in the game
function enemyWave()
{
	// Only generate the wave if the game is not over
	if(!GAME_OVER)
	{
		// Choose a random wave type based on the player's level.
		// A high chance of getting same level, medium chance of
		// getting lower level, and low chance of getting higher level.
		// Obviously, the player can't get lower level waves at level
		// 1 and can't get higher level waves at level 6
		var playerLevel = PLAYER.level;
		var randomNumber = Math.floor(Math.random() * 100) + 1;
		// 31 - 90, same level
		var enemyLevel = playerLevel;
		// 1 - 30, lower level
		if(randomNumber >= 1 && randomNumber <= 30 && playerLevel > 1)
		{
			enemyLevel--;
		}
		// 91-100, higher level
		else if(randomNumber >= 91 && randomNumber <= 100 && playerLevel < 6)
		{
			enemyLevel++;
		}
		// Choose a random wave from the enemy level
		randomNumber = Math.floor(Math.random() * WAVES[enemyLevel - 1].length);
		var currentWave = WAVES[enemyLevel - 1][randomNumber];
		
		// If a specific wave is being requested, generate it
		if(arguments.length > 0){
			currentWave = WAVES[arguments[0]][arguments[1]];
		}
		
		// Find the enemy furthest to the right
		var xMax = 0;
		$.each(currentWave, function(index, enemyData){
			if(enemyData.x > xMax){ xMax = enemyData.x; }
		});
		// Choose a random xOffset for the wave
		var xOffset = Math.floor(Math.random() * (VIEWPORT_WIDTH - xMax));
		
		// Go through the wave array and generate
		// each enemy based on the data provided
		$.each(currentWave, function(index, enemyData){
			ENEMIES.push(new Enemy(enemyData.type, enemyData.x + xOffset, enemyData.y, enemyData.speedX, enemyData.speedY, enemyData.targets));
		});
		
		// Set off the next enemy wave at the next interval
		// if a specific wave is not being requested
		if(arguments.length == 0){
			setTimeout("enemyWave()", ENEMY_INTERVAL * FPMS);
		}
	}
}

// Has a chance of spawning a powerup for the player.
// Armor - 30%
// Life - 10%
// Invincibility - 15%
// Score - 20%
// NOTHING - 25%
function powerUp()
{
	// Only spawn the powerup if the game is not over
	if(!GAME_OVER)
	{
		var randomNumber = Math.floor(Math.random() * 100) + 1;
		var powerUpType = 0;	// Nothing
		// If a specific powerup is being requested, generate it
		if(arguments.length > 0)
		{
			powerUpType = arguments[0];
		}
		else if(randomNumber >= 1 && randomNumber <= 30)	// Armor
		{
			powerUpType = 1;
		}
		else if(randomNumber >= 31 && randomNumber <= 40)	// Life
		{
			powerUpType = 2;
		}
		else if(randomNumber >= 41 && randomNumber <= 55)	// Invincibility
		{
			powerUpType = 3;
		}
		else if(randomNumber >= 56 && randomNumber <= 75)	// Score
		{
			powerUpType = 4;
		}
		
		// Only spawn a powerup if we didn't choose 'nothing'
		if(powerUpType != 0)
		{
			// Choose a random position to spawn the powerup
			var randX = Math.floor(Math.random() * (VIEWPORT_WIDTH - 60)) + 30;
			// Create the powerup
			POWERUPS.push(new PowerUp(randX, -100, powerUpType));
		}
		
		// Set off the next function call at the next interval
		// if a specific powerup was not requested
		if(arguments.length == 0){
			setTimeout("powerUp()", POWERUP_INTERVAL * FPMS);
		}
	}
}

// Ends the game, halting gameplay and
// bringing up the game over screen
function gameOver()
{
	// End the game
	GAME_OVER = true;
	
	// Stop the soundtrack
	MUSIC_SOUNDTRACK.pause();
	
	// Hide the powerup key
	$('#PowerUpKey').fadeOut();
	
	// Hide the dev controls
	$('#DevControls').fadeOut();
	
	// Show the game over title
	$('#title_GameOver').fadeIn();
	
	// Fill in information and show
	// the game over menu
	$('#name').html(PLAYER.name);
	$('#finalScore').html(PLAYER.score);
	$('#type').html(PLAYER.type);
	$('#finalLevel').html(PLAYER.level);
	$('#menu_GameOver').fadeIn();
	
	// Show the cursor in the game window
	$('#viewport').css('cursor', 'pointer');
}

// A function that will check if the game is muted
// before playing a sound
function playSound(sfx)
{
	if(!GAME_MUTED){ sfx.play(); }
}

// A function to find the distance between two sets
// of coordinates, mostly for collision checking 
function distanceBetween(coords1, coords2)
{
	return Math.sqrt(Math.pow(coords2.x - coords1.x, 2) + Math.pow(coords2.y - coords1.y, 2));
}

//////////////////////////////
//                          //
//      EVENT HANDLING      //
//                          //
//////////////////////////////

//////////////
// Stepping //
//////////////

// Update and render the game at each FPMS interval
function step()
{
	// Clear the current canvas
	VIEWPORT.clear();
	
	// Only step if the game is not over
	if(!GAME_OVER)
	{
		// Update and render the background
		BACKGROUND.update();
		BACKGROUND.render();
		
		// Update and render all of the powerups
		$.each(POWERUPS, function(index, powerup){
			if(powerup !== undefined)
			{
				powerup.update();
				powerup.render();
			}
		})
		
		// Update and render all of the enemies
		$.each(ENEMIES, function(index, enemy){
			if(enemy !== undefined)
			{
				enemy.update();
				enemy.render();
			}
		});
		
		// Update and render all of the lasers
		$.each(LASERS, function(index, laser){
			if(laser !== undefined)
			{
				laser.update();
				// If the laser is off the screen,
				// remove it from the game
				if(laser.offScreen())
				{
					delete LASERS[index];
				}
				// Otherwise, render it
				else
				{
					laser.render();
				}
			}
		});
		
		// Update and render the player
		PLAYER.update();
		PLAYER.render();
		
		// Trigger the step for the next frame
		setTimeout("step()", FPMS);
	}
}

/////////////////////////////////
// Key handling for the player //
/////////////////////////////////

// The array to track which keys are being pressed
var PRESSED_KEYS = [];

// If a key is pressed down ...
$(document).keydown(function(evt){
	// If the pressed key isn't already in the array,
	// put that key in the array of pressed keys
	if($.inArray(evt.keyCode, PRESSED_KEYS) == -1)
	{
		PRESSED_KEYS.push(evt.keyCode);
	}
});
// If a key is released ...
$(document).keyup(function(evt){
	// Remove that key from the array of pressed keys
	PRESSED_KEYS.splice($.inArray(evt.keyCode, PRESSED_KEYS), 1);
});

///////////////////////////////////
// Mouse handling for the player //
///////////////////////////////////

// Actions for when the mouse is moved
$('#viewport').mousemove(function(evt){
	if(GAME_STARTED && !GAME_OVER)
	{
		// Update the position of the firing reticle
		var parentOffset = $(this).offset();
		x = evt.pageX - parentOffset.left - 1;
		y = evt.pageY - parentOffset.top - 1;
		PLAYER.reticle.position(x, y);
	}
});

// Tracks whether the mouse is pressed
var MOUSE_DOWN = false;
// Set the global variable to true
// if the mouse is pressed down
$('#viewport').mousedown(function(){
	MOUSE_DOWN = true;
});
// Set the global variable to false
// if the mouse is unpressed
$(document).mouseup(function(){
	MOUSE_DOWN = false;
});

///////////////////////////////
//                           //
//          CLASSES          //
//                           //
///////////////////////////////

////////////////////////////////////
//****  the Background class  ****//
////////////////////////////////////
function Background()
{
	this.x = 0;						// x-coordinate
	this.y = VIEWPORT_HEIGHT * -2;	// y-coordinate
	
	// Render the background
	this.render = function()
	{
		VIEWPORT.image("assets/background.jpg", this.x, this.y, VIEWPORT_WIDTH, VIEWPORT_HEIGHT * 3);
	}
	
	// Update the background
	this.update = function()
	{
		// Scroll the background up
		this.y = this.y + BACKGROUND_SCROLL_SPEED;
		
		// If the background has completed
		// its loop, reset its position
		if(this.y > 0)
		{
			this.y = VIEWPORT_HEIGHT * -2;
		}
	}
}

////////////////////////////////////
//****    the Player class    ****//
////////////////////////////////////
function Player(name, type)
{
	this.x = PLAYER_START_X;	// x-coordinate
	this.y = PLAYER_START_Y;	// y-coordinate
	
	this.type = type;	// Assault || Bomber
	this.level = 1;		// Player's level (1-6)
	
	this.name = name;	// The player's name
	this.score = 0;		// The player's score
	
	this.lives = 3;				// Number of lives
	this.respawnCounter = 0;	// Tracks respawn
	
	// Set the stats of the ship based on type
	if(this.type == 'Assault'){
		this.speed = PLAYER_ASSAULT1.speed;
		this.laserDmg = PLAYER_ASSAULT1.laserDmg;
		this.laserSpeed = PLAYER_ASSAULT1.laserSpeed;
		this.laserWidth = PLAYER_ASSAULT1.laserWidth;
		this.laserLength = PLAYER_ASSAULT1.laserLength;
		this.laserCount = PLAYER_ASSAULT1.laserCount;
		this.laserSound = PLAYER_ASSAULT1.laserSound;
		this.attackCooldown = PLAYER_ASSAULT1.attackCooldown;
	}else if(this.type == 'Bomber'){
		this.speed = PLAYER_BOMBER1.speed;
		this.laserDmg = PLAYER_BOMBER1.laserDmg;
		this.laserSpeed = PLAYER_BOMBER1.laserSpeed;
		this.laserWidth = PLAYER_BOMBER1.laserWidth;
		this.laserLength = PLAYER_BOMBER1.laserLength;
		this.laserCount = PLAYER_BOMBER1.laserCount;
		this.laserSound = PLAYER_BOMBER1.laserSound;
		this.attackCooldown = PLAYER_BOMBER1.attackCooldown;
	}		
	this.armor = 100;	// The armor left on the ship [0-100]
	this.shields = 100;	// The shields left on the ship [0-100]
	this.shieldRechargeCounter = 0;	// Tracks shield recharge
	
	this.reticle = new Reticle();	// The player's aiming reticle
	this.attackCooldownCounter = 0;	// Tracks the attack cooldown
	
	this.invincibilityCounter = 0;
	
	// Render the player in the viewport
	this.render = function()
	{
		// Render the player's ship
		img = VIEWPORT.image("assets/player_" + this.type + this.level + ".png", this.x - (PLAYER_WIDTH / 2), this.y - (PLAYER_HEIGHT / 2), PLAYER_WIDTH, PLAYER_HEIGHT);
		// If the player is waiting to respawn,
		// display the ship as slightly transparent
		if(this.respawnCounter > 0){ img.attr('opacity', .5); }
		
		// Render the laser cooldown information
		var chargeWidth = PLAYER_WIDTH;
		if(this.attackCooldownCounter > 0){
			chargeWidth = PLAYER_WIDTH * this.attackCooldownCounter / this.attackCooldown;
		}
		var rect = VIEWPORT.rect(this.x - (PLAYER_WIDTH / 2), this.y + (PLAYER_HEIGHT / 2), chargeWidth, 5);
		rect.attr('fill', '#25B1FA');
		var rect = VIEWPORT.rect(this.x - (PLAYER_WIDTH / 2), this.y + (PLAYER_HEIGHT / 2), PLAYER_WIDTH, 5);
		rect.attr('stroke', '#FFF');
		rect.attr('stroke-width', 1);
		rect.attr('stroke-opacity', .8);
		
		// Render the player's armor information
		var rect = VIEWPORT.rect(25, VIEWPORT_HEIGHT - (this.armor * 3) - 25, 25, this.armor * 3);
		var color = '#4FBE37';
		if(this.armor < 75){ color = '#B7BE37'; }
		if(this.armor < 50){ color = '#BE8837'; }
		if(this.armor < 25){ color = '#BE4837'; }
		rect.attr('fill', color);
		var rect = VIEWPORT.rect(25, VIEWPORT_HEIGHT - 325, 25, 300);
		rect.attr('stroke', '#FFF');
		rect.attr('stroke-width', 2);
		
		// Render the player's shield information
		var rect = VIEWPORT.rect(75, VIEWPORT_HEIGHT - (this.shields * 3) - 25, 25, this.shields * 3);
		var color = '#25B1FA';
		if(this.shields < 75){ color = '#286889'; }
		if(this.shields < 50){ color = '#2C2889'; }
		if(this.shields < 25){ color = '#632076'; }
		rect.attr('fill', color);
		// If the shield is recharging, represent it
		// with the opacity of the bounding box
		var strokeOpacity = 1;
		if(this.shieldRechargeCounter > 0){
			strokeOpacity = this.shieldRechargeCounter / PLAYER_SHIELD_CHARGE_COOLDOWN;
		}
		var rect = VIEWPORT.rect(75, VIEWPORT_HEIGHT - 325, 25, 300);
		rect.attr('stroke', '#FFF');
		rect.attr('stroke-width', 2);
		rect.attr('stroke-opacity', strokeOpacity);
		// Render the shield as a pure white bar if the player is invincible
		if(this.invincibilityCounter > 0)
		{
			rect.attr('fill', '#FFF');
			rect.attr('stroke-opacity', 1);
		}
		
		// Render the player's name and ship information
		var text = VIEWPORT.text(270, VIEWPORT_HEIGHT - 70, 'Pilot ' + this.name);
		text.attr('fill', '#FFF');
		text.attr('font-size', 18);
		text.attr('font-weight', 'bold');
		var text = VIEWPORT.text(530, VIEWPORT_HEIGHT - 70, this.type + ' - Level ' + this.level);
		text.attr('fill', '#FFF');
		text.attr('font-size', 20);
		
		// Render a progress bar to show the player's
		// progress towards the next level
		if(this.level == 1){
			var progress = this.score / UPGRADE_SCORE_2;
		}else if(this.level == 2){
			var progress = this.score / UPGRADE_SCORE_3;
			
		}else if(this.level == 3){
			var progress = this.score / UPGRADE_SCORE_4;
			
		}else if(this.level == 4){
			var progress = this.score / UPGRADE_SCORE_5;
			
		}else if(this.level == 5){
			var progress = this.score / UPGRADE_SCORE_6;
			
		}else if(this.level == 6){
			var progress = 1;
		}
		var rect = VIEWPORT.rect(135, VIEWPORT_HEIGHT - 45, progress * 500, 10);
		rect.attr('fill', '#FFF');
		rect.attr('stroke-width', 0);
		var rect = VIEWPORT.rect(135, VIEWPORT_HEIGHT - 45, 500, 10);
		rect.attr('stroke', '#FFF');
		rect.attr('stroke-width', 2);
		rect.attr('stroke-opacity', .4);
		// Render a preview of the next level next to the progress bar
		if(this.level < 6){
			img = VIEWPORT.image("assets/player_" + this.type + (this.level + 1) + ".png", 650, VIEWPORT_HEIGHT - 45 - (PLAYER_HEIGHT / 4), PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2);
			img.attr('opacity', progress);
		}
		
		// Render the player's lives
		// If the player has more than 3 lives,
		// render them as an icon with a number
		if(this.lives > 3)
		{
			VIEWPORT.image("assets/player_" + this.type + this.level + ".png", VIEWPORT_WIDTH - (3 * PLAYER_WIDTH  / 2) - 80, VIEWPORT_HEIGHT - 120, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2);
			var text = VIEWPORT.text(VIEWPORT_WIDTH - (3 * PLAYER_WIDTH  / 4) - 50, VIEWPORT_HEIGHT - 120 + (PLAYER_HEIGHT / 4), 'X ' + this.lives);
			text.attr('fill', '#FFF');
			text.attr('font-size', 30);
			text.attr('font-weight', 'bold');
		}
		// Otherwise, render the number of
		// lives that the player has
		else
		{
			if(this.lives > 0){
				VIEWPORT.image("assets/player_" + this.type + this.level + ".png", VIEWPORT_WIDTH - (PLAYER_WIDTH / 2) - 40, VIEWPORT_HEIGHT - 120, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2);
			}
			if(this.lives > 1){
				VIEWPORT.image("assets/player_" + this.type + this.level + ".png", VIEWPORT_WIDTH - PLAYER_WIDTH - 60, VIEWPORT_HEIGHT - 120, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2);
			}
			if(this.lives > 2){
				VIEWPORT.image("assets/player_" + this.type + this.level + ".png", VIEWPORT_WIDTH - (3 * PLAYER_WIDTH / 2) - 80, VIEWPORT_HEIGHT - 120, PLAYER_WIDTH / 2, PLAYER_HEIGHT / 2);
			}
		}
		
		// Render the player's score
		var score_string = ("0000000" + this.score).slice(-7);
		var text = VIEWPORT.text(VIEWPORT_WIDTH - 160, VIEWPORT_HEIGHT - 30, 'Score: ' + score_string);
		text.attr('fill', '#FFF');
		text.attr('font-size', 36);
		text.attr('font-weight', 'bold');
		
		// Render the player's aiming reticle
		this.reticle.render();
	}
	
	// Update the player
	this.update = function()
	{
		// Update the respawn counter
		if(this.respawnCounter > 0)
		{
			// Increment the counter if it's counting
			this.respawnCounter++;
		}
		if(this.respawnCounter > PLAYER_RESPAWN_TIME)
		{
			// If the counter is done counting, reset it
			this.respawnCounter = 0;
		}
		
		// Update the shield charge counter
		if(this.shieldRechargeCounter > 0)
		{
			// Increment the counter if it's counting
			this.shieldRechargeCounter++;
		}
		if(this.shieldRechargeCounter > PLAYER_SHIELD_CHARGE_COOLDOWN)
		{
			// If the counter is done counting, reset it
			this.shieldRechargeCounter = 0;
			// Play a sound to indicate the shield is charging.
			// Start the audio based on how much regeneration is needed
			SFX_PLAYER_SHIELDRECHARGE.currentTime = SFX_PLAYER_SHIELDRECHARGE.duration * this.shields / 100;
			playSound(SFX_PLAYER_SHIELDRECHARGE);
		}
		// If the shield recharge isn't
		// counting, recharge the shield
		if(this.shieldRechargeCounter == 0)
		{
			this.shields = this.shields + PLAYER_SHIELD_CHARGE_AMOUNT;
			// Don't allow the shield to overcharge.
			// If it is fully charged, stop the
			// charging sound effect
			if(this.shields >= 100)
			{
				this.shields = 100;
				SFX_PLAYER_SHIELDRECHARGE.pause();
			}
		}
		
		// Update the attack cooldown counter
		if(this.attackCooldownCounter > 0)
		{
			// Increment the counter if it's counting
			this.attackCooldownCounter++;
		}
		if(this.attackCooldownCounter > this.attackCooldown)
		{
			// If the counter is done counting, reset it
			this.attackCooldownCounter = 0;
		}
		
		// Update the invincibility counter
		if(this.invincibilityCounter > 0)
		{
			// Increment the counter if it's counting
			this.invincibilityCounter++;
		}
		if(this.invincibilityCounter > PLAYER_INVINCIBILITY_TIME)
		{
			// If the counter is done counting, reset it
			this.invincibilityCounter = 0;
		}
		
		// Fire the laser if the left mouse button is down
		if(MOUSE_DOWN)
		{
			this.fireLaser();
		}
		
		// Move the player based on the keys being pressed
		// LEFT ARROW KEY or 'A' //
		if($.inArray(37, PRESSED_KEYS) != -1 ||
			$.inArray(65, PRESSED_KEYS) != -1)
		{
			this.x = this.x - this.speed;
		}
		// RIGHT ARROW KEY or 'D' //
		if($.inArray(39, PRESSED_KEYS) != -1 ||
			$.inArray(68, PRESSED_KEYS) != -1)
		{
			this.x = this.x + this.speed;
		}
		// UP ARROW KEY or 'W' //
		if($.inArray(38, PRESSED_KEYS) != -1 ||
			$.inArray(87, PRESSED_KEYS) != -1)
		{
			this.y = this.y - this.speed;
		}
		// DOWN ARROW KEY or 'S' //
		if($.inArray(40, PRESSED_KEYS) != -1 ||
			$.inArray(83, PRESSED_KEYS) != -1)
		{
			this.y = this.y + this.speed;
		}
		
		// Correct the player back into frame if they
		// have gone beyond the canvas bounds
		if(this.x > VIEWPORT_WIDTH - (PLAYER_WIDTH / 2)){
			this.x = VIEWPORT_WIDTH - (PLAYER_WIDTH / 2);
		}
		else if(this.x < PLAYER_WIDTH / 2){
			this.x = PLAYER_WIDTH / 2;
		}
		if(this.y > VIEWPORT_HEIGHT - (PLAYER_HEIGHT / 2)){
			this.y = VIEWPORT_HEIGHT - (PLAYER_HEIGHT / 2);
		}
		else if(this.y < PLAYER_WIDTH / 2){
			this.y = PLAYER_WIDTH / 2;
		}
		
		// Check if any lasers are hitting the player
		// and deal with them accordingly
		this.laserCheck();
	}
	
	// Fires the ship's laser if it's not on cooldown
	this.fireLaser = function()
	{
		// Make sure the cooldown and respawn
		// counters aren't running
		if(this.attackCooldownCounter == 0 && this.respawnCounter == 0)
		{
			// Create the new lasers in front of the ship
			if(this.laserCount == 2 || this.laserCount == 3)
			{
				// Create the lasers on the left and right
				LASERS.push(new Laser(1, this.laserDmg, this.laserSpeed, this.laserWidth, this.laserLength, this.x - (PLAYER_WIDTH / 2), this.y, this.reticle.x - this.x, this.reticle.y - this.y));
				LASERS.push(new Laser(1, this.laserDmg, this.laserSpeed, this.laserWidth, this.laserLength, this.x + (PLAYER_WIDTH / 2), this.y, this.reticle.x - this.x, this.reticle.y - this.y));
			}
			if(this.laserCount == 1 || this.laserCount == 3)
			{
				// Create the middler laser
				LASERS.push(new Laser(1, this.laserDmg, this.laserSpeed, this.laserWidth, this.laserLength, this.x, this.y, this.reticle.x - this.x, this.reticle.y - this.y));
			}
			
			// Play a laser sound effect based
			// on the ship type / level
			this.laserSound.volume = .5;
			this.laserSound.currentTime = 0;
			playSound(this.laserSound);
			
			// Start the cooldown counter
			this.attackCooldownCounter = 1;
		}
	}
	
	// Checks if any enemy lasers are hitting the player.
	// If any are, they deal damage to the player and are
	// removed from the game
	this.laserCheck = function()
	{
		// Only run the check if the player is
		// not waiting to respawn
		if(this.respawnCounter == 0)
		{
			$.each(LASERS, function(index, laser){
				// Only check enemy lasers
				if(laser !== undefined && !laser.player)
				{
					// If either end of the laser is within the
					// player's "collision sphere," it's a hit
					if(distanceBetween({x: laser.x, y: laser.y}, {x: PLAYER.x, y: PLAYER.y}) < (PLAYER_WIDTH / 2) + (laser.width / 2) ||
						distanceBetween({x: laser.x + laser.speedX, y: laser.y + laser.speedY}, {x: PLAYER.x, y: PLAYER.y}) < (PLAYER_WIDTH / 2) + (laser.width / 2))
					{
						// Play a sound to indicate the player has been hit
						SFX_PLAYER_HIT.currentTime = 0;
						playSound(SFX_PLAYER_HIT);
						
						// Only deal damage if the player is not invincible
						if(PLAYER.invincibilityCounter == 0)
						{
							// If shields are still up, deal the
							// damage to the shields
							if(PLAYER.shields > 0)
							{
								PLAYER.shields = PLAYER.shields - laser.dmg;
								// If the damage was more than the
								// shields could take, go through to armor
								// and set the shields to 0
								if(PLAYER.shields < 0)
								{
									PLAYER.armor = PLAYER.armor + PLAYER.shields;
									PLAYER.shields = 0;
								}
							}
							// Otherwise, deal the damage to the armor
							else
							{
								PLAYER.armor = PLAYER.armor - laser.dmg;
							}
							
							// Start the shield recharge counter
							PLAYER.shieldRechargeCounter = 1;
						}
						
						// Remove the laser from the game
						delete LASERS[index];
						
						// If the player has no armor, destroy them
						if(PLAYER.armor <= 0)
						{
							PLAYER.armor = 0;
							PLAYER.destroy();
						}
					}
				}
			});
		}
	}
	
	// Add to the player's score and upgrade
	// their ship if necessary
	this.addScore = function(n)
	{
		// Play audio to indicate the player scored
		SFX_PLAYER_SCORE.currentTime = 0;
		playSound(SFX_PLAYER_SCORE);
		
		// Check if the ship gets an upgrade and play
		// level up sound if it does get upgraded.
		// Also change the ship attributes based on level
		// LEVEL 2 //
		if(this.score < UPGRADE_SCORE_2 && this.score + n >= UPGRADE_SCORE_2){
			this.level = 2;
			SFX_PLAYER_LEVELUP.currentTime = 0;
			playSound(SFX_PLAYER_LEVELUP);
			if(this.type == 'Assault'){
				this.speed = PLAYER_ASSAULT2.speed;
				this.laserDmg = PLAYER_ASSAULT2.laserDmg;
				this.laserSpeed = PLAYER_ASSAULT2.laserSpeed;
				this.laserWidth = PLAYER_ASSAULT2.laserWidth;
				this.laserLength = PLAYER_ASSAULT2.laserLength;
				this.laserCount = PLAYER_ASSAULT2.laserCount;
				this.laserSound = PLAYER_ASSAULT2.laserSound;
				this.attackCooldown = PLAYER_ASSAULT2.attackCooldown;
			}else if(this.type == 'Bomber'){
				this.speed = PLAYER_BOMBER2.speed;
				this.laserDmg = PLAYER_BOMBER2.laserDmg;
				this.laserSpeed = PLAYER_BOMBER2.laserSpeed;
				this.laserWidth = PLAYER_BOMBER2.laserWidth;
				this.laserLength = PLAYER_BOMBER2.laserLength;
				this.laserCount = PLAYER_BOMBER2.laserCount;
				this.laserSound = PLAYER_BOMBER2.laserSound;
				this.attackCooldown = PLAYER_BOMBER2.attackCooldown;
			}
		}
		// LEVEL 3 //
		if(this.score < UPGRADE_SCORE_3 && this.score + n >= UPGRADE_SCORE_3){
			this.level = 3;
			SFX_PLAYER_LEVELUP.currentTime = 0;
			playSound(SFX_PLAYER_LEVELUP);
			if(this.type == 'Assault'){
				this.speed = PLAYER_ASSAULT3.speed;
				this.laserDmg = PLAYER_ASSAULT3.laserDmg;
				this.laserSpeed = PLAYER_ASSAULT3.laserSpeed;
				this.laserWidth = PLAYER_ASSAULT3.laserWidth;
				this.laserLength = PLAYER_ASSAULT3.laserLength;
				this.laserCount = PLAYER_ASSAULT3.laserCount;
				this.laserSound = PLAYER_ASSAULT3.laserSound;
				this.attackCooldown = PLAYER_ASSAULT3.attackCooldown;
			}else if(this.type == 'Bomber'){
				this.speed = PLAYER_BOMBER3.speed;
				this.laserDmg = PLAYER_BOMBER3.laserDmg;
				this.laserSpeed = PLAYER_BOMBER3.laserSpeed;
				this.laserWidth = PLAYER_BOMBER3.laserWidth;
				this.laserLength = PLAYER_BOMBER3.laserLength;
				this.laserCount = PLAYER_BOMBER3.laserCount;
				this.laserSound = PLAYER_BOMBER3.laserSound;
				this.attackCooldown = PLAYER_BOMBER3.attackCooldown;
			}
		}
		// LEVEL 4 //
		if(this.score < UPGRADE_SCORE_4 && this.score + n >= UPGRADE_SCORE_4){
			this.level = 4;
			SFX_PLAYER_LEVELUP.currentTime = 0;
			playSound(SFX_PLAYER_LEVELUP);
			if(this.type == 'Assault'){
				this.speed = PLAYER_ASSAULT4.speed;
				this.laserDmg = PLAYER_ASSAULT4.laserDmg;
				this.laserSpeed = PLAYER_ASSAULT4.laserSpeed;
				this.laserWidth = PLAYER_ASSAULT4.laserWidth;
				this.laserLength = PLAYER_ASSAULT4.laserLength;
				this.laserCount = PLAYER_ASSAULT4.laserCount;
				this.laserSound = PLAYER_ASSAULT4.laserSound;
				this.attackCooldown = PLAYER_ASSAULT4.attackCooldown;
			}else if(this.type == 'Bomber'){
				this.speed = PLAYER_BOMBER4.speed;
				this.laserDmg = PLAYER_BOMBER4.laserDmg;
				this.laserSpeed = PLAYER_BOMBER4.laserSpeed;
				this.laserWidth = PLAYER_BOMBER4.laserWidth;
				this.laserLength = PLAYER_BOMBER4.laserLength;
				this.laserCount = PLAYER_BOMBER4.laserCount;
				this.laserSound = PLAYER_BOMBER4.laserSound;
				this.attackCooldown = PLAYER_BOMBER4.attackCooldown;
			}
		}// LEVEL 5 //
		if(this.score < UPGRADE_SCORE_5 && this.score + n >= UPGRADE_SCORE_5){
			this.level = 5;
			SFX_PLAYER_LEVELUP.currentTime = 0;
			playSound(SFX_PLAYER_LEVELUP);
			if(this.type == 'Assault'){
				this.speed = PLAYER_ASSAULT5.speed;
				this.laserDmg = PLAYER_ASSAULT5.laserDmg;
				this.laserSpeed = PLAYER_ASSAULT5.laserSpeed;
				this.laserWidth = PLAYER_ASSAULT5.laserWidth;
				this.laserLength = PLAYER_ASSAULT5.laserLength;
				this.laserCount = PLAYER_ASSAULT5.laserCount;
				this.laserSound = PLAYER_ASSAULT5.laserSound;
				this.attackCooldown = PLAYER_ASSAULT5.attackCooldown;
			}else if(this.type == 'Bomber'){
				this.speed = PLAYER_BOMBER5.speed;
				this.laserDmg = PLAYER_BOMBER5.laserDmg;
				this.laserSpeed = PLAYER_BOMBER5.laserSpeed;
				this.laserWidth = PLAYER_BOMBER5.laserWidth;
				this.laserLength = PLAYER_BOMBER5.laserLength;
				this.laserCount = PLAYER_BOMBER5.laserCount;
				this.laserSound = PLAYER_BOMBER5.laserSound;
				this.attackCooldown = PLAYER_BOMBER5.attackCooldown;
			}
		}
		// LEVEL 6 //
		if(this.score < UPGRADE_SCORE_6 && this.score + n >= UPGRADE_SCORE_6){
			this.level = 6;
			SFX_PLAYER_LEVELUP.currentTime = 0;
			playSound(SFX_PLAYER_LEVELUP);
			if(this.type == 'Assault'){
				this.speed = PLAYER_ASSAULT6.speed;
				this.laserDmg = PLAYER_ASSAULT6.laserDmg;
				this.laserSpeed = PLAYER_ASSAULT6.laserSpeed;
				this.laserWidth = PLAYER_ASSAULT6.laserWidth;
				this.laserLength = PLAYER_ASSAULT6.laserLength;
				this.laserCount = PLAYER_ASSAULT6.laserCount;
				this.laserSound = PLAYER_ASSAULT6.laserSound;
				this.attackCooldown = PLAYER_ASSAULT6.attackCooldown;
			}else if(this.type == 'Bomber'){
				this.speed = PLAYER_BOMBER2.speed;
				this.laserDmg = PLAYER_BOMBER6.laserDmg;
				this.laserSpeed = PLAYER_BOMBER6.laserSpeed;
				this.laserWidth = PLAYER_BOMBER6.laserWidth;
				this.laserLength = PLAYER_BOMBER6.laserLength;
				this.laserCount = PLAYER_BOMBER6.laserCount;
				this.laserSound = PLAYER_BOMBER6.laserSound;
				this.attackCooldown = PLAYER_BOMBER5.attackCooldown;
			}
		}
		
		// Increment the score
		this.score = this.score + n;
	}
	
	// Destroy the player's ship
	this.destroy = function()
	{
		// Play a sound to indicate the player's destruction
		SFX_PLAYER_DESTROY.currentTime = 0;
		playSound(SFX_PLAYER_DESTROY);
		
		// Remove a life from the player
		this.lives = this.lives - 1;
		
		// If the player is out of lives, end the game
		if(this.lives <= 0)
		{
			gameOver();
		}
		// Otherwise, start the respawn timer and reset
		// the player's health and armor
		else
		{
			this.shields = 0;
			this.shieldRechargeCounter = 0;
			this.armor = 100;
			this.respawnCounter = 1;
		}
	}
}

/////////////////////////////////////
//****    the Reticle class    ****//
/////////////////////////////////////
function Reticle()
{
	this.x = VIEWPORT_WIDTH / 2;
	this.y = VIEWPORT_HEIGHT / 2;
	
	// Render the reticle
	this.render = function()
	{
		// Render the main circle of the reticle
		var circle = VIEWPORT.circle(this.x, this.y, RETICLE_RADIUS);
		circle.attr('stroke', RETICLE_COLOR);
		circle.attr('stroke-width', RETICLE_WIDTH);
		var dot = VIEWPORT.circle(this.x, this.y, Math.ceil(RETICLE_WIDTH / 2));
		dot.attr('fill', RETICLE_COLOR);
		dot.attr('stroke-width', 0);
		
		// Draw the aiming lines on the reticle
		var path = VIEWPORT.path(
			'M' + this.x + ',' + (this.y - (RETICLE_RADIUS * 1 / 2)) +
			'V' + (this.y - (RETICLE_RADIUS * 5 / 4))
		);
		path.attr('stroke', RETICLE_COLOR);
		path.attr('stroke-width', RETICLE_WIDTH);
		var path = VIEWPORT.path(
			'M' + (this.x + (RETICLE_RADIUS * 1 / 2)) + ',' + this.y +
			'H' + (this.x + (RETICLE_RADIUS * 5 / 4))
		);
		path.attr('stroke', RETICLE_COLOR);
		path.attr('stroke-width', RETICLE_WIDTH);
		var path = VIEWPORT.path(
			'M' + this.x + ',' + (this.y + (RETICLE_RADIUS * 1 / 2)) +
			'V' + (this.y + (RETICLE_RADIUS * 5 / 4))
		);
		path.attr('stroke', RETICLE_COLOR);
		path.attr('stroke-width', RETICLE_WIDTH);
		var path = VIEWPORT.path(
			'M' + (this.x - (RETICLE_RADIUS * 1 / 2)) + ',' + this.y +
			'H' + (this.x - (RETICLE_RADIUS * 5 / 4))
		);
		path.attr('stroke', RETICLE_COLOR);
		path.attr('stroke-width', RETICLE_WIDTH);
	}
	
	// Change the position of the reticle to
	// the given x and y coordinates
	this.position = function(x, y)
	{
		this.x = x;
		this.y = y;
	}
}

/////////////////////////////////////
//****     the Enemy class     ****//
/////////////////////////////////////
function Enemy(type, x, y, speedX, speedY, targets)
{
	this.type = type;		// What type of enemy? (1|2|3|4)
	
	this.x = x;				// This enemy's x-coordinate
	this.y = y;				// This enemy's y-coordinate
	this.speedX = speedX;	// Horizontal speed
	this.speedY = speedY;	// Vertical speed
	
	this.targets = targets;	// Does this enemy target the player?
	
	// Set parameters based on this enemy's type
	// TYPE 1 //
	if(this.type == 1)
	{
		this.score = 200;	// The score for killing this enemy
		this.armor = 20;	// This enemy's armor
		this.dmg = 15;		// This enemy's laser damage
		this.laserSpeed = 35;	// This enemy's laser speed
		this.laserWidth = 3;	// This enemy's laser width
		this.laserLength = 15;	// This enemy's laser length
		this.width = 50;	// This enemy's width
		this.height = 52;	// This enemy's height
		this.laserCooldown = 40;	// The laser cooldown
	}
	// TYPE 2 //
	else if(this.type == 2)
	{
		this.score = 400;
		this.armor = 200;
		this.dmg = 40;
		this.laserSpeed = 30;
		this.laserWidth = 5;
		this.laserLength = 25;
		this.width = 75;
		this.height = 121;
		this.laserCooldown = 70;
	}
	// TYPE 3 //
	else if(this.type == 3)
	{
		this.score = 800;
		this.armor = 300;
		this.dmg = 60;
		this.laserSpeed = 25;
		this.laserWidth = 10;
		this.laserLength = 50;
		this.width = 120;
		this.height = 185;
		this.laserCooldown = 100;
	}
	// TYPE 4 //
	else if(this.type == 4)
	{
		this.score = 2000;
		this.armor = 800;
		this.dmg = 100;
		this.laserSpeed = 15;
		this.laserWidth = 20;
		this.laserLength = 60;
		this.width = 160;
		this.height = 250;
		this.laserCooldown = 125;
	}
	// The laser cooldown counter
	this.laserCooldownCounter = Math.floor((Math.random() * this.laserCooldown) + 1);
	
	// Render this enemy in the viewport
	this.render = function()
	{
		VIEWPORT.image("assets/enemy_" + this.type + ".png", this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height);
	}
	
	// Update this enemy
	this.update = function()
	{
		// Update the enemy's position
		this.x = this.x + (this.speedX * BACKGROUND_SCROLL_SPEED);
		this.y = this.y + (this.speedY * BACKGROUND_SCROLL_SPEED);
		
		// Check for player lasers
		this.laserCheck();
		
		// Update the laser cooldown counter
		this.laserCooldownCounter++;
		if(this.laserCooldownCounter > this.laserCooldown)
		{
			// If the counter is done counting, fire and reset
			this.fireLaser();
		}
		
		// If the enemy is offscreen, remove it from the game
		if(this.offScreen())
		{
			this.destroy();
		}
	}
	
	// Is this enemy off the screen?
	// (gives the enemy 100px of space outside of the
	// viewport and unlimited space above the top)
	this.offScreen = function()
	{
		if(this.x > VIEWPORT_WIDTH + 100 ||
			this.y > VIEWPORT_HEIGHT + 130 ||
			this.x < -100
		)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	// Fires the enemy's laser
	this.fireLaser = function()
	{
		// Aim at the player if this ship targets
		if(this.targets)
		{
			// Create a new laser in front of the ship
			LASERS.push(new Laser(0, this.dmg, this.laserSpeed, this.laserWidth, this.laserLength, this.x, this.y, PLAYER.x - this.x, PLAYER.y - this.y));
		}
		// Otherwise, fire straight ahead
		else
		{
			// Create a new laser in front of the ship
			LASERS.push(new Laser(0, this.dmg, this.laserSpeed, this.laserWidth, this.laserLength, this.x, this.y, 0, 100));
		}
		
		// Play a laser firing sound effect
		switch(this.type)
		{
			case(1):
				SFX_LASER_SMALL.volume = .25;
				SFX_LASER_SMALL.currentTime = 0;
				playSound(SFX_LASER_SMALL);
				break;
			case(2):
				SFX_LASER_MEDIUM.volume = .25;
				SFX_LASER_MEDIUM.currentTime = 0;
				playSound(SFX_LASER_MEDIUM);
				break;
			case(3):
				SFX_LASER_LARGE.volume = .25;
				SFX_LASER_LARGE.currentTime = 0;
				playSound(SFX_LASER_LARGE);
				break;
			case(4):
				SFX_LASER_HUGE.volume = .25;
				SFX_LASER_HUGE.currentTime = 0;
				playSound(SFX_LASER_HUGE);
				break;
		}
		
		// Start the cooldown counter
		this.laserCooldownCounter = 1;
	}
	
	// Checks if any player lasers are hitting this enemy.
	// If they are, delete the laser and deal damage to the enemy
	this.laserCheck = function()
	{
		var temp_Enemy = this;
		$.each(LASERS, function(index, laser){
			// Only check player lasers
			if(laser !== undefined && laser.player)
			{
				// If either end of the laser is within the
				// enemy's "collision sphere," it's a hit
				if(distanceBetween({x: laser.x, y: laser.y}, {x: temp_Enemy.x, y: temp_Enemy.y}) < (temp_Enemy.width / 2) + (laser.width / 2) ||
					distanceBetween({x: laser.x + laser.speedX, y: laser.y + laser.speedY}, {x: temp_Enemy.x, y: temp_Enemy.y}) < (temp_Enemy.width / 2) + (laser.width / 2))
				{
					// Deal the damage to the enemy
					temp_Enemy.armor = temp_Enemy.armor - laser.dmg;
					
					// Remove the laser from the game
					delete LASERS[index];
					
					// If the enemy has no armor, destroy it
					if(temp_Enemy.armor <= 0)
					{
						// Award the player points for the kill
						PLAYER.addScore(temp_Enemy.score);
						// Destroy this enemy
						temp_Enemy.destroy();
					}
				}
			}
		});
	}
	
	// Removes this enemy from the game
	this.destroy = function()
	{
		// Get the index of this enemy in the global array
		var index = ENEMIES.indexOf(this);
		// Remove this enemy from the game
		delete ENEMIES[index];
	}
}

/////////////////////////////////////
//****     the Laser class     ****//
/////////////////////////////////////
function Laser(player, dmg, laserSpeed, width, length, x, y, xOffset, yOffset)
{
	this.player = player;	// 0: enemy, 1: player
	this.dmg = dmg;			// How much damage this laser does
	this.laserSpeed = laserSpeed;	// How fast does this laser move?
	this.width = width;		// Width of this laser
	this.length = length;	// Length of this laser
	this.x = x;				// x-coordinate
	this.y = y;				// y-coordinate
	
	this.speedX =			// Horizontal speed
		Math.sqrt(Math.pow(this.length, 2) /
			((Math.pow(yOffset, 2) /
				Math.pow(xOffset, 2)) + 1));
		if(xOffset < 0){ this.speedX = -this.speedX; }
	this.speedY =			// Vertical speed
		Math.sqrt(Math.pow(this.length, 2) /
			((Math.pow(xOffset, 2) /
				Math.pow(yOffset, 2)) + 1));
		if(yOffset < 0){ this.speedY = -this.speedY; }
	
	// Renders the laser
	this.render = function()
	{
		var color = ENEMY_LASER_COLOR;
		if(this.player){ color = PLAYER_LASER_COLOR; }
		var path = VIEWPORT.path(
			'M' + this.x + ',' + this.y +
			'L' + (this.x + this.speedX) + ',' + (this.y + this.speedY)
		);
		path.attr('stroke', color);
		path.attr('stroke-width', this.width);
		path.attr('stroke-linecap', 'round');
	}
	
	// Updates the laser
	this.update = function()
	{
		// Update the laser's position
		this.x = this.x + this.speedX * this.laserSpeed / 100;
		this.y = this.y + this.speedY * this.laserSpeed / 100;
	}
	
	// Is this laser off the screen?
	this.offScreen = function()
	{
		if(this.y < 0 || this.x > VIEWPORT_WIDTH ||
			this.y > VIEWPORT_HEIGHT || this.x < 0
		)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

/////////////////////////////////////
//****    the PowerUp class    ****//
/////////////////////////////////////
function PowerUp(x, y, type)
{
	this.x = x;	// x-coordinate
	this.y = y;	// y-coordinate
	this.type = type;	// The type of powerup (1|2|3|4)
	
	// Set parameters based on this enemy's type
	// TYPE 1 - Armor //
	if(this.type == 1)
	{
		this.width = 44;
		this.height = 47;
	}
	// TYPE 2 - Life //
	else if(this.type == 2)
	{
		this.width = 54;
		this.height = 56;
	}
	// TYPE 3 - Invincibility //
	else if(this.type == 3)
	{
		this.width = 38;
		this.height = 52;
	}
	// TYPE 4 - Points //
	else if(this.type == 4)
	{
		this.width = 46;
		this.height = 42;
	}
	
	// Render this powerup in the viewport
	this.render = function()
	{
		VIEWPORT.image("assets/powerup_" + this.type + ".png", this.x - (this.width / 2), this.y - (this.height / 2), this.width, this.height);
	}
	
	// Update this powerup
	this.update = function()
	{
		// Move the powerup down with the background
		this.y = this.y + BACKGROUND_SCROLL_SPEED;
		
		// Check if this powerup is touching the player
		this.playerCheck();
		
		// Remove this powerup from the game if it is offscreen
		if(this.offScreen())
		{
			this.destroy();
		}
	}
	
	// Is this powerup off the screen?
	// Allowed to be off the top of the viewport
	this.offScreen = function()
	{
		if(this.y > VIEWPORT_HEIGHT + (this.height / 2))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	// Check if this powerup is tocuhing the player.
	// If it is, grant the player the appropriate bonus
	// and remove this powerup from the game
	this.playerCheck = function()
	{
		// Check if the player's and the powerup's
		// "collision spheres" are touching
		if(distanceBetween({x: PLAYER.x, y: PLAYER.y}, {x: this.x, y: this.y}) < (PLAYER_WIDTH / 2) + (this.width / 2))
		{
			// Grant the player the appropriate bonus
			// and play appropriate sound effect
			switch(this.type)
			{
				case(1):
					PLAYER.armor = 100;
					SFX_POWERUP_1.currentTime = 0;
					playSound(SFX_POWERUP_1);
					break;
				case(2):
					PLAYER.lives++;
					SFX_POWERUP_2.currentTime = 0;
					playSound(SFX_POWERUP_2);
					break;
				case(3):
					PLAYER.invincibilityCounter = 1;
					SFX_POWERUP_3.currentTime = 0;
					playSound(SFX_POWERUP_3);
					break;
				case(4):
					PLAYER.addScore(1000);
					SFX_POWERUP_4.currentTime = 0;
					playSound(SFX_POWERUP_4);
					break;
			}
			// Destroy this powerup
			this.destroy();
		}
	}
	
	// Remove this powerup from the game
	this.destroy = function()
	{
		// Get the index of this powerup in the global array
		var index = POWERUPS.indexOf(this);
		// Remove this enemy from the game
		delete POWERUPS[index];
	}
}