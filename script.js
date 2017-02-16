$(document).ready(function(){
	var game = new Phaser.Game(600, 580, Phaser.AUTO, "#app", {preload: preload, create: create, update: update});

	var seringue,
	fond,
	bullet,
	player;

	function preload(){
		game.load.image("seringue", "syringe.png");
		game.load.image("fond", "fond.jpg");
		game.load.spritesheet("player", "dude.png", 32, 48);
	}
	function create(){
		game.physics.startSystem(Phaser.Physics.ARCADE);

		fond = game.add.sprite(0, 0, "fond");

		var bullets = game.add.group();

		weapon = game.add.weapon(30, 'seringue');
		player = game.add.sprite(32, game.world.height - 150, 'player');
		cursors = game.input.keyboard.createCursorKeys();
		game.physics.arcade.enable(player);

		player.animations.add("left", [0, 1, 2, 3], 10, true);
		player.animations.add("right", [5, 6, 7, 8], 10, true);
	}
	function update(){



		player.body.velocity.x = 0;
		if(cursors.left.isDown){
			player.body.velocity.x = -600;

			player.animations.play('left')
		}
		else if(cursors.right.isDown){
			player.body.velocity.x = 600;

			player.animations.play('right');
		}
		else{
			player.animations.stop();
			player.frame = 4;
		}

		function collectStar(player, bullet){
			bullet.kill();
			score+=10;
			scoreText.text = "Score: " + score;
		}

		game.world.wrap(player, 16);
	}
});