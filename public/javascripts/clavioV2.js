

 (function () {


 	//var svg = document.getElementsByTagName('svg')[0];
 	//var div = document.createElement('div');
	//div.appendChild(svg.cloneNode(true));


	//CAAT.DEBUG=true;
        
		/**
         * Startup it all up when the document is ready.
         * Change for your favorite frameworks initialization code.
         */
         
        
        

/*
        window.addEventListener(
        'load',
        function() {
            CAAT.modules.initialization.init(
                    800, 500,
                    '_c1',
                    [],
                    keys
                    );
        },
        false);
*/
		
		/*
		function load(){				
			CAAT.Module.Initialization.TemplateWithSplash.init(		
					900, 500, // canvas size 
					"_c1", // canvas ID
					500, // splash time in milliseconds
					 // loadimages and set them up. image elements must be of the form:
					 // {id:'<unique string id>',    url:'<url to image>'}
					[],
					addModules, // onEndSplash callback function. Create your scenes on this method. 
					"splash/splash.jpg", // splash image - It will cover all of director's area.
					"splash/rueda.png"//  use this image as rotating spinner. optional.
			);
		}*/
			
			/*
		function addModules(director){
			CAAT.mydir = director;
			CAAT.ModuleManager.
				baseURL( "/javascripts").
				setModulePath("CAAT.Clavia", "claviamodules").
				bring(
                    [
						"CAAT.Clavia.Claviature"// "javascripts/claviamodules/Claviature.js"// 
					]
				).
				onReady( createScenes );	
		}
		*/

		/**
         * This function will be called to let you define new scenes that will be
         * shown after the splash screen.
         * In this example, create a simple scene with some circles on it.
         * @param director {CAAT.Director}
         */
		
        function createScenes() {
			
			// create a director object
			
			//CAAT.DEBUG= true;
			//CAAT.DEBUGBB= true;
			//CAAT.DEBUGBBBCOLOR= '00E'; 


			// init memory storage
			if(!localStorage.settings){
				localStorage.settings = JSON.stringify(CL.SETTINGS);
				console.log("hämtar förinställt")

			}else{ //load settings from web storage
				CL.SETTINGS = JSON.parse(localStorage.settings);
				console.log("hämtar sparat")
			}

			// create director
			var director = new CAAT.Foundation.Director().initialize(
					CL.width,    // 100 pixels wide
					CL.height,    // 100 pixels across
					document.getElementById('_c1')
			);

			CL.director = director;

			// load images, and then create scene
			new CAAT.Module.Preloader.ImagePreloader().loadImages(
		        [
		            {id:'syntcat',    url:'./images/syntcat.jpg'},
		            {id:'checkmarker-selected',	url:'./images/checkmarkerSelected.svg'},
		            {id:'checkmarker-unselected',	url:'./images/checkmarkerUnselected.svg'},
		            {id:'radio-selected',	url:'./images/radioSelected.svg'},
		            {id:'radio-unselected',	url:'./images/radioUnselected.svg'},
		            {id:'game-background',    url:'./images/gameBackground.jpg'},
		            {id:'settings-background',    url:'./images/settingsBackground.jpg'},
		            {id:'kitten-button',    url:'./images/kittenbutton.jpg'},
		        ],
		        function( counter, images ) {
		        	if ( counter==images.length ){
			            director.setImagesCache(images);
			            CL.PianoScene = new CL.PianoScene().create(director);
			           	// console.log("creatuing CL.PianoScene:"+CL.PianoScene);
			            CL.PrefsScene = new CL.PrefsScene().create(director);
			            //console.log("creatuing CL.PrefsScene:"+CL.PrefsScene);
						CAAT.loop(60);
						}
		            //__scene(director);
		        }
		    );
	
			return;

			/*
			var gardenScene= new HN.GardenScene().create(
            director,
            CocoonJS.available ? 0 : 120 );

	        var gameScene= new HN.GameScene().create(director, HN.GameModes.respawn );
	        gardenScene.gameScene= gameScene;

	        gameScene.addGameListener( gardenScene );
			*/



/*
            CAAT.registerKeyListener( function(key,action,modifiers,originalKeyEvent) {
		        if ( key==CAAT.Keys.k && action=='down') {
		            console.log("rööövem");
		        }
		    });
 */
/*
 			 CAAT.registerKeyListener( function kl( keyEvent ) {
 
		 
		        if ( keyEvent.getKeyCode()===CAAT.Keys.UP ) {
		        	console.log("rööövem");
		            keyEvent.preventDefault();
		            //keys[2]= ( keyEvent.getAction()==='up' ) ? 0 : 1;
		        }

		        */
		        /*
		        if ( keyEvent.getKeyCode()===CAAT.Keys.DOWN ) {
		            keyEvent.preventDefault();
		            keys[3]= ( keyEvent.getAction()==='up' ) ? 0 : 1;
		        }
		        if ( keyEvent.getKeyCode()===CAAT.Keys.LEFT ) {
		            keyEvent.preventDefault();
		            keys[0]= ( keyEvent.getAction()==='up' ) ? 0 : 1;
		        }
		        if ( keyEvent.getKeyCode()===CAAT.Keys.RIGHT ) {
		            keyEvent.preventDefault();
		            keys[1]= ( keyEvent.getAction()==='up' ) ? 0 : 1;
		        }
		        */
		 
		    //});


			//CAAT.loop(60);
        }

        window.addEventListener('load', createScenes, false);		
    })();