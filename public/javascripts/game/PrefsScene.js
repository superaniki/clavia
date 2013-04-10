

(function() {
	CL.PrefsScene = function() {
		return this;
	};
	CL.PrefsScene.prototype= {
		bgColor:	   '#BFE3CE',
		directorScene:		null,
		backButton:			null,
		buttonUpStyle: 		'#999',
        buttonDownStyle: 	'#555',
        keysCheckmarkers:		null,
        scalesCheckmarkers:		null,
        notesDiatonicCheckmarkers:		null,
        notesChromaticCheckmarkers:			null,
        gameModeRadios:	null,

		create : function(director){
			this.directorScene = director.createScene();
			this.directorScene.activated = function(){ console.log(" prefsscene activated"); };
			//this.directorScene.onRenderEnd = function(){ console.log("onrenderend prefsscene"); };

			var settingsBackgroundSprite= new CAAT.Foundation.SpriteImage().
			            initialize(director.getImage('settings-background'), 1, 1);

			var kittenButtonSprite= new CAAT.Foundation.SpriteImage().
			            initialize(director.getImage('kitten-button'), 1, 1);

			

			// background
			this.backgroundActor = new CAAT.Foundation.Actor().
					setBackgroundImage( settingsBackgroundSprite ).
					setBounds(0,0,director.width,director.height).
					setFillStyle(this.bgColor);

			this.directorScene.addChild(this.backgroundActor);

			// create backbutton
			this.backButton = new CL.GUI.Button().init("back", director.width *0.3, 10,//director.height-60, 
										150, 50, this.buttonUpStyle, this.buttonDownStyle,
										function(){
							        		console.log("changing scene");
							        		CL.SETTINGS = CL.PrefsScene.getSettingsFromGui();
							        		CL.PianoScene.setGameMode(CL.SETTINGS.gameMode);
							        		CL.director.switchToPrevScene(1000, false, true);
							        	});
			this.backButton.setAlpha(0.6);
			this.backButton.setUpImage(kittenButtonSprite, false);
			this.directorScene.addChild(this.backButton);

			// create savebutton
			this.saveButton = new CL.GUI.Button().init("save",director.width *0.6, 10,//director.height-60, 
										150, 50, this.buttonUpStyle, this.buttonDownStyle,
										function(){
							        		console.log("saving preferences");
							        		CL.SETTINGS = CL.PrefsScene.getSettingsFromGui();
							        		localStorage.settings = JSON.stringify(CL.SETTINGS);
							        	});
			this.saveButton.setAlpha(0.6);
			this.saveButton.setUpImage(kittenButtonSprite, false);
			this.directorScene.addChild(this.saveButton);


            // ===========Checkmarkers for Keys ===========

			var cms = [];

			cms.push({ id : "C", label : "C" });
			cms.push({ id : "Db", label : "Db" });
			cms.push({ id : "D", label : "D" });
			cms.push({ id : "Eb", label : "Eb" });
			cms.push({ id : "E", label : "E" });
			cms.push({ id : "F", label : "F" });
			cms.push({ id : "Gb", label : "Gb" });
			cms.push({ id : "G", label : "G" });
			cms.push({ id : "Ab", label : "Ab" });
			cms.push({ id : "A", label : "A" });
			cms.push({ id : "Bb", label : "Bb" });
			cms.push({ id : "B", label : "B" });

			//var that = this;
			this.keysCheckmarkers = new CL.GUI.CheckMarkerGroup().init(
						"Choose Key", 
						cms, 
						50, //x
						100, //y
						20, //elementsPerRow
						30, //yspace
						140, //xrowspace
						20);
			this.keysCheckmarkers.setLabelPosition(0,-25); //chechmarksize
			this.directorScene.addChild(this.keysCheckmarkers.actor);




			// ===========Checkmarkers for Scales ===========

			cms = [];
			var scale = CL.LANG[CL.SETTINGS.lang].SCALE;


			cms.push({ id : "MAJOR", label : scale.MAJOR });
			cms.push({ id : "MINOR", label : scale.MINOR });
			cms.push({ id : "space" });
			cms.push({ id : "CHROMATIC", label : scale.CHROMATIC });
			cms.push({ id : "space" });
			cms.push({ id : "IONIAN", label : scale.IONIAN });
			cms.push({ id : "DORIAN", label : scale.DORIAN });
			cms.push({ id : "PHRYGIAN", label : scale.PHRYGIAN });
			cms.push({ id : "LYDIAN", label : scale.LYDIAN });
			cms.push({ id : "MIXOLYDIAN", label : scale.MIXOLYDIAN });
			cms.push({ id : "AOLIAN", label : scale.AOLIAN });
			cms.push({ id : "LOCRIAN", label : scale.LOCRIAN });

			this.scalesCheckmarkers = new CL.GUI.CheckMarkerGroup().init(
						"Choose Scale", 
						cms, 
						250, //x
						100, //y
						20, //elementsPerRow
						30, //yspace
						140, //xrowspace
						20); //chechmarksize
			this.directorScene.addChild(this.scalesCheckmarkers.actor);
			this.scalesCheckmarkers.setLabelPosition(0,-25); //chechmarksize




			// =========== Checkmarkers for Diatonic Notes ===========

			cms = [];
			cms.push({ id : "1", label : "1" });
			cms.push({ id : "2", label : "2" });
			cms.push({ id : "3", label : "3" });
			cms.push({ id : "4", label : "4" });
			cms.push({ id : "5", label : "5" });
			cms.push({ id : "6", label : "6" });
			cms.push({ id : "7", label : "7" });

			this.notesDiatonicCheckmarkers = new CL.GUI.CheckMarkerGroup().init(
						"Choose Diatonic Notes",
						cms,
						450, //x
						100, //y
						8, //elementsPerRow
						30, //yspace
						140, //xrowspace
						20); //chechmarksize
			this.directorScene.addChild(this.notesDiatonicCheckmarkers.actor);
			this.notesDiatonicCheckmarkers.setLabelPosition(0,-25); //chechmarksize


			// =========== Checkmarkers for Chromatic Notes ===========

			cms = [];
			cms.push({ id : "1", label : CL.INTERVAL[0].short });
			cms.push({ id : "2", label : CL.INTERVAL[1].short });
			cms.push({ id : "3", label : CL.INTERVAL[2].short });
			cms.push({ id : "4", label : CL.INTERVAL[3].short });
			cms.push({ id : "5", label : CL.INTERVAL[4].short });
			cms.push({ id : "6", label : CL.INTERVAL[5].short });
			cms.push({ id : "7", label : CL.INTERVAL[6].short });
			cms.push({ id : "8", label : CL.INTERVAL[7].short });
			cms.push({ id : "9", label : CL.INTERVAL[8].short });
			cms.push({ id : "10", label : CL.INTERVAL[9].short });
			cms.push({ id : "11", label : CL.INTERVAL[10].short });
			cms.push({ id : "12", label : CL.INTERVAL[11].short });

			this.notesChromaticCheckmarkers = new CL.GUI.CheckMarkerGroup().init(
						"Choose Chromatic Notes",
						cms,
						650, //x
						150, //y
						8, //elementsPerRow
						30, //yspace
						140, //xrowspace
						20); //chechmarksize
			this.directorScene.addChild(this.notesChromaticCheckmarkers.actor);
			this.notesChromaticCheckmarkers.setLabelPosition(0,-25); //chechmarksize

			cms = [];
			cms.push({ id : "mode1", label : "Classic" });
			cms.push({ id : "mode2", label : "Oldmode" });
			cms.push({ id : "mode3", label : "Hero (not implemented)" });
			var that = this;
			this.gameModeRadios = new CL.GUI.RadioGroup().init(
						"Game mode",
						cms,
						750, //x
						350, //y
						8, //elementsPerRow
						30, //yspace
						140, //xrowspace
						20, that); //chechmarksize
			this.directorScene.addChild(this.gameModeRadios.actor);
			this.gameModeRadios.setLabelPosition(0, -25); //chechmarksize
            

            this.loadSettingsToGui(CL.SETTINGS);
            return this;
		},

		getSettingsFromGui : function(){
			var settings = CL.SETTINGS;

			settings.keys = [];
			settings.scales = [];
			settings.diatonicNotes = [];
			settings.chromaticNotes = [];
			settings.gameMode = 0;

			//keys
			for(var t=0;t<this.keysCheckmarkers.members.length;t++)
				if(this.keysCheckmarkers.members[t].getState())
					settings.keys.push(this.keysCheckmarkers.members[t].dataId);
			//scales 
			for(var t=0;t<this.scalesCheckmarkers.members.length;t++)
				if(this.scalesCheckmarkers.members[t].getState())
					settings.scales.push(this.scalesCheckmarkers.members[t].dataId);
			//diatonic notes 
			for(var t=0;t<this.notesDiatonicCheckmarkers.members.length;t++)
				if(this.notesDiatonicCheckmarkers.members[t].getState())
					settings.diatonicNotes.push(this.notesDiatonicCheckmarkers.members[t].dataId);

			//chromatic notes 
			for(var t=0;t<this.notesChromaticCheckmarkers.members.length;t++)
				if(this.notesChromaticCheckmarkers.members[t].getState())
					settings.chromaticNotes.push(this.notesChromaticCheckmarkers.members[t].dataId);

			//game mode 
			settings.gameMode = this.gameModeRadios.currentSelected.dataId;

			// körs innan scenen laddas in
			console.log("settings:"+JSON.stringify(settings));
			return settings;
		},

		loadSettingsToGui : function(settings){
			//keys
			this.keysCheckmarkers.setState(false);
			for(var t=0;t<settings.keys.length;t++)
				for(var m = 0;m<this.keysCheckmarkers.members.length;m++)
					if(settings.keys[t] == this.keysCheckmarkers.members[m].dataId)
						this.keysCheckmarkers.members[m].setState(true);

			//scales
			this.scalesCheckmarkers.setState(false);
			for(var t=0;t < settings.scales.length; t++ )
				for(var m = 0;m<this.scalesCheckmarkers.members.length;m++)
					if(settings.scales[t] == this.scalesCheckmarkers.members[m].dataId)
						this.scalesCheckmarkers.members[m].setState(true);

			//diatonic notes
			this.notesDiatonicCheckmarkers.setState(false);
			for(var t=0;t < settings.diatonicNotes.length; t++ )
				for(var m = 0;m<this.notesDiatonicCheckmarkers.members.length;m++)
					if(settings.diatonicNotes[t] == this.notesDiatonicCheckmarkers.members[m].dataId)
						this.notesDiatonicCheckmarkers.members[m].setState(true);

			//chromatic notes
			this.notesChromaticCheckmarkers.setState(false);
			for(var t=0;t < settings.chromaticNotes.length; t++ )
				for(var m = 0;m<this.notesChromaticCheckmarkers.members.length;m++)
					if(settings.chromaticNotes[t] == this.notesChromaticCheckmarkers.members[m].dataId)
						this.notesChromaticCheckmarkers.members[m].setState(true);

			//game mode
			this.gameModeRadios.setState(false);
			for(var m = 0;m<this.gameModeRadios.members.length;m++)
				if(settings.gameMode == this.gameModeRadios.members[m].dataId){
					this.gameModeRadios.members[m].setState(true);
					this.gameModeRadios.currentSelected = this.gameModeRadios.members[m];
				}
		}
	};
})();
