


(function() {

	CL.GAMEMODE = {};


	CL.GAMEMODE.Oldmode = function(){
		return this;
	};
	CL.GAMEMODE.Oldmode.prototype = {
		scene:				null,
		piano:              null,
		background:			null,

		bgColor:	   '#C9B3C7',
		errorColor:		  "#F55",
		correctColor:	  "#4F4",
		prefsButtonUp:    '#999',
        prefsButtonDown:  '#555',

		backgroundActor:	null,

		questionActor:		null,
		scaleTextActor:		null,
	 	keyTextActor:		null,
		noteTextActor:		null,

		prefsButton:        null,

		currentQuestion:	null,
		lastQuestion:		null,

		correctActor:		null,
		failActor:			null,
		init : function(director, scene ){

			this.scene = scene;
				// background
			this.backgroundActor = new CAAT.Foundation.Actor().
					setName("backgroundActor").
					setBounds(0,0,director.width,director.height).
					setFillStyle(this.bgColor);
			this.scene.addChild(this.backgroundActor);	

			// piano
			this.piano= new CL.PianoActor().initialize(800,200,2,2)
				.setName("piano")//.enableDragPiano(true)
				.setPosition(50, 291);
			
			//CL.PIANO = this.piano;
			this.scene.addChild(this.piano);

			// keylisteners
			/*
			CAAT.registerKeyListener( function ( keyEvent ) {
				if ( keyEvent.getKeyCode()===CAAT.Keys.NUMPAD0 ) {
					CL.PIANO.setPianoKey(0);
					keyEvent.preventDefault();                   
				}
			});*/

			this.questionActor = new CAAT.Foundation.ActorContainer(CAAT.Foundation.ActorContainer.AddHint.CONFORM).
				setPosition(director.width*0.3,98);

			this.scaleTextActor = new CAAT.Foundation.UI.TextActor().
                    setFont("25px sans-serif").
                    setText("Scale:").           
                    setTextAlign("left").
                    setTextBaseline("bottom").
                    setTextFillStyle("#000").
                    enableEvents(true).
                    setName("scaleTextActor").
                    setScaleAnchor(0,0).
                    setScale(1.5, 1.5);


            this.keyTextActor = new CAAT.Foundation.UI.TextActor().
                    setFont("25px sans-serif").
                    setText("Key:").           
                    setTextAlign("left").
                    setTextBaseline("bottom").
                    setTextFillStyle("#000").
                    enableEvents(true).
                    setName("keyTextActor").
                    setScaleAnchor(0,0).
                    setPosition(0, 100).setScale(1.5, 1.5);

            this.noteTextActor = new CAAT.Foundation.UI.TextActor().
                    setFont("25px sans-serif").
                    setText("Note:").           
                    setTextAlign("left").
                    setTextBaseline("bottom").
                    setTextFillStyle("#000").
                    enableEvents(true).
                    setName("noteTextActor").
                    setScaleAnchor(0,0).
                    setPosition(250, 100).setScale(1.5, 1.5);


            this.questionActor.addChild(this.scaleTextActor);
            this.questionActor.addChild(this.keyTextActor);
            this.questionActor.addChild(this.noteTextActor);

            this.scene.addChild(this.questionActor);
			
            this.correctActor = new CAAT.Foundation.UI.TextActor().
                setFont("25px sans-serif").
                setText("Beethoven we salute you!!").           
                setTextAlign("left").
                setTextBaseline("bottom").
                setPosition( director.width*0.5, director.height*0.5 ).
                setTextFillStyle("#D5F5C5").
                enableEvents(true).setOutline(true).setLineWidth(1).
                setName("correctActor").
                setVisible(false).
                setGlobalAnchor(0.5,0.5);
                 
            this.wrongActor = new CAAT.Foundation.UI.TextActor().
                setFont("25px sans-serif").
                setText("study harder!!").           
                setTextAlign("left").
                setTextBaseline("bottom").
                setPosition( director.width*0.5, director.height*0.55 ).
                setTextFillStyle("#F33").
                enableEvents(true).setOutline(true).setLineWidth(1).
                setName("failActor").
                setVisible(false).
                setGlobalAnchor(0.5,0.5);

            this.scene.addChild(this.correctActor);
            this.scene.addChild(this.wrongActor);


			this.prefsButton = new CL.GUI.Button().init("settings", 698, 14, 
            							200, 50, this.prefsButtonUp, this.prefsButtonDown,
										function(){
							        		console.log("changing scene");
        									CL.director.switchToNextScene(1000, false, true);
							        	});
			this.scene.addChild(this.prefsButton);

			//Register Events 
			CL.EventHandler.addListener("wrongnote", "piano", this, this.flashWrong);
			CL.EventHandler.addListener("correctnote", "piano", this, this.flashCorrect);

			//CL.EventHandler.addListener("setpianoscale", "", this, this.setPianoScale);
			this.currentQuestion = CL.UTILS.newQuestion();
			this.newQuestion();

			return this;
		},
		newQuestion : function(){
			this.oldQuestion = this.currentQuestion;

			var Q = CL.UTILS.newQuestion();
			//while(Q.Note == this.oldQuestion.Note)
			//	Q = CL.UTILS.newQuestion();

			this.piano.setQuestion(Q);
			this.scaleTextActor.setText("Scale: " + CL.LANG[CL.SETTINGS.lang].SCALE[Q.scale]);
			this.keyTextActor.setText("Key: " + Q.key);
			this.noteTextActor.setText("Note: " + Q.note);
			this.questionActor.setVisible(true);
		},

		flashCorrect : function(){
			console.log("flashcorrect");


			this.questionActor.setVisible(false);
			
			this.wrongActor.setVisible(false);
			this.correctActor.emptyBehaviorList();
			this.correctActor.setVisible(true);
			
			this.correctActor.		
					addBehavior(
					new CAAT.ScaleBehavior().
                        setFrameTime( this.scene.time, 300 ).
                        setValues( 1.5, 2, 1.5, 2 )).
			 		addBehavior(
			 		new CAAT.GenericBehavior().
			 			setFrameTime( this.scene.time, 750).
			 			setValues(0, 1, this.correctActor, null, 
			 				function(value, target){ 
			 					if(value==1) 
			 						target.setAlpha(0);
			 				})).
			 		addBehavior(
			 		new CAAT.GenericBehavior().
			 			setFrameTime( this.scene.time+1000,0).
			 			setValues(0, 1, this, null, 
			 				function(value, target){
			 					console.log(value);
			 					if(value==1){			
			 						target.correctActor.setAlpha(1).setVisible(false);
			 						target.newQuestion();
			 						console.log("setvisible!")
			 					}
			 				}));
			 	
			this.piano.setPianoTextVisibility(false);
		
		},
		flashWrong : function(){
			console.log("flashwrong");


			this.correctActor.setVisible(false);
			this.wrongActor.emptyBehaviorList();
			this.wrongActor.setVisible(true);

			this.wrongActor.		
					addBehavior(
					new CAAT.ScaleBehavior().
                        setFrameTime( this.scene.time, 250 ).
                        setValues( 1, 2.5, 1, 2.5 )).
			 		addBehavior(
			 		new CAAT.GenericBehavior().
			 			setFrameTime( this.scene.time, 500).
			 			setValues(0, 1, this.wrongActor, null, 
			 				function(value, target){ 
			 					if(value==1) 
			 						target.setVisible(false);
			 				}));

			this.piano.setPianoTextVisibility(true);
		}
	}



	CL.GAMEMODE.Classic = function(){
		return this;
	};
	CL.GAMEMODE.Classic.prototype = {
		scene:null,
		backgroundActor : null,
		piano : null,
		bgColor: '#C9B3C7',
		prefsButtonUp:    '#999',
        prefsButtonDown:  '#555',
        targetActor : null,
		init : function(director, directorScene){
			this.director = director;
			this.scene = directorScene;

			 var gameBackgroundSprite= new CAAT.Foundation.SpriteImage().
			            initialize(director.getImage('game-background'), 1, 1);

			this.backgroundActor = new CAAT.Foundation.Actor().
					setBackgroundImage( gameBackgroundSprite ).
					setName("backgroundActor").
					setBounds(0,0,director.width,director.height).
					setFillStyle(this.bgColor);
			this.scene.addChild(this.backgroundActor);


			//kitten
            var kittenSprite= new CAAT.Foundation.SpriteImage().
			            initialize(director.getImage('syntcat'), 1, 1);

			this.kitten = new CAAT.Foundation.Actor().
				setBackgroundImage( kittenSprite ).
				enableEvents(false).setName("kittenactor").
				setBounds(-81, -78, 413, 310).setScale(0.42, 0.42).setRotation(-25.42); 

			CL.kitten = this.kitten;
			this.scene.addChild(this.kitten);

			 var kittenButtonSprite= new CAAT.Foundation.SpriteImage().
			            initialize(director.getImage('kitten-button'), 1, 1);


			// piano
			this.piano= new CL.PianoActor().initialize(900,239,2,1,true) // width, height, num, keyspace, border
				.setName("piano")//.enableDragPiano(true)
				.setPosition(0, 260);

			//buttons
			this.prefsButton = new CL.GUI.Button().init("settings", 698, 14, 
            							200, 50, this.prefsButtonUp, this.prefsButtonDown,
										function(){
							        		console.log("changing scene");
        									CL.director.switchToNextScene(1000, false, true);
							        	});
			this.prefsButton.setAlpha(0.6);
			
			this.prefsButton.setUpImage(kittenButtonSprite, false);
			//this.prefsButton.setDownImage(kittenButtonSprite, false);
			//this.prefsButton.setImageTransformation(CAAT.SpriteImage.TR_FIXED_TO_SIZE);
			this.scene.addChild(this.prefsButton);
			

			//questions
			this.questionActor = new CAAT.Foundation.ActorContainer(CAAT.Foundation.ActorContainer.AddHint.CONFORM).
				setPosition(director.width*0.3,98);

			this.scaleTextActor = this.createSomeLabel("Scale:", "scaleTextActor", 0, 0, 1.5, 1.5);
            this.keyTextActor = this.createSomeLabel("Key:", "keyTextActor", 0, 100, 1.5, 1.5);
            this.noteTextActor = new this.createSomeLabel("Note:", "noteTextActor", 250, 100, 1.5, 1.5);
                  
            this.questionActor.addChild(this.scaleTextActor);
            this.questionActor.addChild(this.keyTextActor);
            this.questionActor.addChild(this.noteTextActor);

            this.scene.addChild(this.questionActor);

            this.correctActor = this.createStateLabel("R", "correctActor",
            											director.width*0.5, director.height*0.5,
            											"#D5F5C5");
            this.wrongActor = this.createStateLabel("X", "failActor",
            											director.width*0.5, director.height*0.55,
            											"#F33");
            CL.EventHandler.addListener("wrongnote", "piano", this, this.flashWrong);
			CL.EventHandler.addListener("correctnote", "piano", this, this.flashCorrect);

            this.scene.addChild(this.correctActor);
            this.scene.addChild(this.wrongActor);

            // question system
            CL.UTILS.initQuestionGenerator(3,7);
			//this.currentQuestion = CL.UTILS.newQuestion();
			this.newQuestion().setQuestion(); // extra to fill up history?

			//.PIANO = this.piano;
			this.scene.addChild(this.piano);
		},
		createSomeLabel : function(label, name, x, y, scalex, scaley){
			return new CAAT.Foundation.UI.TextActor().
                    setFont("25px sans-serif").
                    setText(label).           
                    setTextAlign("left").
                    setTextBaseline("bottom").
                    setTextFillStyle("#000").
                    enableEvents(true).
                    setName(name).
                    setScaleAnchor(0,0).
                    setPosition(x, y).setScale(scalex, scaley);
		},
		createStateLabel : function(label, name, x, y, color){
			return new CAAT.Foundation.UI.TextActor().
                setFont("25px sans-serif").
                setText(label).           
                setTextAlign("left").
                setTextBaseline("bottom").
                setPosition( x,y ).
                setTextFillStyle(color).
                enableEvents(true).setOutline(true).setLineWidth(1).
                setName(name).
                setVisible(false).
                setGlobalAnchor(0.5, 0.5);
		},
		newQuestion : function(){
			this.oldQuestion = this.currentQuestion;

			var Q = CL.UTILS.newQuestionV2();
			this.currentQuestion = Q;
			//this.piano.setQuestion(Q);
			this.currentQuestionText = {
				scale : "Scale: " + CL.LANG[CL.SETTINGS.lang].SCALE[Q.scale],
				key : "Key: " + Q.key,
				note : "Note: " + Q.note
			};

			if(Q.scale == "CHROMATIC")
				this.currentQuestionText.note = CL.INTERVAL[Q.noteData].long;

			console.log(Q);
			return this;
			/*
			this.scaleTextActor.setText("Scale: " + CL.LANG[CL.SETTINGS.lang].SCALE[Q.scale]);
			this.keyTextActor.setText("Key: " + Q.key);
			this.noteTextActor.setText("Note: " + Q.note);
			this.questionActor.setVisible(true);
			*/
		},
		setQuestion : function(){
			var q = this.currentQuestionText;
			this.piano.setQuestion(this.currentQuestion);
			this.scaleTextActor.setText(q.scale);
			this.keyTextActor.setText(q.key);
			this.noteTextActor.setText(q.note);
			//this.questionActor.setVisible(true);
		},

		flashCorrect : function(){
			console.log("flashcorrect");
			this.newQuestion();

			// get question difference
			var diff = this.currentQuestion.getDifference(this.oldQuestion);

			if(diff.key)
				this.targetActor = this.keyTextActor;
			else
				if(diff.scale)
					this.targetActor = this.scaleTextActor;
				else
					//if(diff.note)
					this.targetActor = this.noteTextActor;
			
			//console.log(targetActor.name);
			// TODO!!!


			// leta up den detalj i frågan som är ny! find textACtor typ
			// visa CORRECT över frågan! därefter, visa den nya frågan.
			//this.questionActor.setVisible(false);
			this.targetActor.setVisible(false);
			//this.wrongActor.setVisible(false);


			
			this.correctActor.emptyBehaviorList();
			this.correctActor.x= this.questionActor.x + this.targetActor.x+ (this.targetActor.width * 0.5);
			this.correctActor.y= this.questionActor.y + this.targetActor.y+ (this.targetActor.height * 0.5);
			//this.correctActor.setPosition(this.targetActor.x, this.targetActor.y);
			this.correctActor.setVisible(true);
			
			this.correctActor.		
					addBehavior(
					new CAAT.ScaleBehavior().
                        setFrameTime( this.scene.time, 100 ).
                        setValues( 1.5, 3, 1.5, 3 )).
			 		addBehavior(
			 		new CAAT.GenericBehavior().
			 			setFrameTime( this.scene.time, 450).
			 			setValues(0, 1, this.correctActor, null, 
			 				function(value, target){ 
			 					if(value==1) 
			 						target.setAlpha(0);
			 				})).
			 		addBehavior(
			 		new CAAT.GenericBehavior().
			 			setFrameTime( this.scene.time+800,0).
			 			setValues(0, 1, this, null, 
			 				function(value, target){
			 					if(value==1){			
			 						target.correctActor.setAlpha(1).setVisible(false);
			 						target.setQuestion();
			 						target.targetActor.setVisible(true);

			 						//target.newQuestion();

			 						console.log("setvisible!")
			 					}
			 				}));
			 	
			this.piano.setPianoTextVisibility(false);
		
		},
		flashWrong : function(){
			console.log("flashwrong");
			CL.UTILS.retryCurrentQuestionGroup();

			this.correctActor.setVisible(false);
			this.wrongActor.emptyBehaviorList();
			this.wrongActor.setVisible(true);

			this.wrongActor.		
					addBehavior(
					new CAAT.ScaleBehavior().
                        setFrameTime( this.scene.time, 100 ).
                        setValues( 1.5, 3, 1.5, 3 )).
			 		addBehavior(
			 		new CAAT.GenericBehavior().
			 			setFrameTime( this.scene.time, 500).
			 			setValues(0, 1, this.wrongActor, null, 
			 				function(value, target){ 
			 					if(value==1) 
			 						target.setVisible(false);
			 				}));

			this.piano.setPianoTextVisibility(true);
		}
	}


	CL.GAMEMODE.Hero = function(){
		return this;
	};
	CL.GAMEMODE.Hero.prototype = {
	}

})();


(function() {
	CL.PianoScene = function() {
		return this;
	};

	CL.PianoScene.prototype= {
		staticInstance:			0,
		directorScene:      null,
		director:			null,

		gameMode:			null,
		game:				null,
		init:				null,

		create : function(director){
			this.constructor.prototype.staticInstance = this;
			this.directorScene = director.createScene();
			this.director = director;
			this.setGameMode(CL.SETTINGS.gameMode);
			return this;
		},
		setGameMode : function(gameMode){
			this.gameMode = CL.SETTINGS.gameMode;
			this.game = null;
			this.directorScene.emptyChildren();

			if(this.gameMode == "mode1")
				this.game = new CL.GAMEMODE.Classic();
				
			if(this.gameMode == "mode2")
				this.game = new CL.GAMEMODE.Oldmode();

			if(this.gameMode == "mode3")
				this.game = new CL.GAMEMODE.Hero();
			
			this.game.init(this.director, this.directorScene);

			return this;
		},
	};
})();