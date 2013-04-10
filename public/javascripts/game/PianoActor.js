




(function() {

	CL.PianoKeyActor = function() {
        CL.PianoKeyActor.superclass.constructor.call(this);
        //        this.glEnabled= true;
		return this;
	};

	CL.PianoKeyActor.prototype= {
        //instances:           [],    //static!! only access using prototype
        //numberOfInstances:   0,     //static!! only access using prototype

        //thisInstance:        0,      // for accessing static this-variable
        keyNumber:            0,      // dont change!
		keyType:             null,   // CL.BLACK or CL.WHITE - dont change!
        intervalName:       "",
		scaleNote:            0,      // är skalnot om > 0
        state:                CL.KEY_UP,   // CL.KEY_UP or CL.KEY_DOWN

        scaleNoteHelper:          false,     // draw number or not when help is active
        scaleTextActor:         null,
        keyColor:                  null,
        textColor:              null,
        selectColor:            "#999",
        currentKeyColor:         null,
        questionNote:           false,
        
        initialize : function(keynumber, keytype, x, width, height) {
            //var proto = this.constructor.prototype;
            //proto.instances[proto.numberOfInstances] = this;
            //this.thisInstance = proto.numberOfInstances;
            //proto.numberOfInstances += 1;

            this.keyNumber = keynumber;
            this.keyType = keytype;
            this.setBounds(x,0,width,height);

            if(this.keyType == CL.BLACK){
                this.keyColor = "#000";
                this.textColor = "#FFF";     
            }
            else{
                this.keyColor = "#FFF";
                this.textColor = "#000";  
            }

            this.currentKeyColor = this.keyColor;

            this.createScaleText();
            return this;
        },

        setScaleTextVisibility : function(status){
            console.log("setScaleTextVisibility");
            if(this.scaleTextActor !== null && this.scaleNoteHelper){
                this.scaleTextActor.setVisible(status);
                R = this;
            }
                 
        },

        createScaleText : function(){
            this.scaleTextActor = new CAAT.Foundation.UI.TextActor().
                setFont("25px sans-serif").
                setText("").           
                //setLineWidth( 2).
                setTextAlign("center").
                setTextBaseline("bottom").
                setPosition( this.width*0.5, this.height ).
                setTextFillStyle(this.textColor).
                enableEvents(false);

            this.addChild(this.scaleTextActor);
            this.scaleTextActor.setText(this.scaleNote);
        },
        /**
             * Set the note number for the current scale
             * @param note
             * @return an object of the form { x: float, y: float }
             */
        setScaleNote : function(note) {
            this.scaleNote = note;
            if(this.scaleTextActor !== null)
                this.scaleTextActor.setText(note);
        },
        /**
             * Set if this scale not should be visible when pushing the wrong note
             * @param note
             * @return an object of the form { x: float, y: float }
             */
        setScaleNoteHelper : function(status){
            this.scaleNoteHelper = status;
            if(!status)
                this.scaleTextActor.setVisible(false);
        },
        setQuestionNote : function(state){
            this.QuestionNote = state;
        },
        setIntervalName : function(interval){
            this.intervalName = interval.short;
            this.scaleTextActor.setText(this.intervalName);
        },
        playKey : function(){
            if(this.QuestionNote === false){
                CL.EventHandler.fire("wrongnote");
                console.log("playing wrong darn note!!");
            }else{
                CL.EventHandler.fire("correctnote");
                console.log("playing quite nice!!");
            }
            
            /*
            this.addBehavior(
                new CAAT.GenericBehavior().setFrameTime(this.time, 1000).
                    setValues(0, 1, this, null, this.keyColorDownBehavior)
                );
            */
            this.currentKeyColor = this.selectColor;
        },
        releaseKey : function (){
            //console.log("holdkey");
           
           this.currentKeyColor = this.keyColor;  

        },
        keyColorDownBehavior : function(value, target){
            //console.log(value);
            if(value<1)
                target.currentKeyColor = target.selectColor;
            else
                target.currentKeyColor = target.keyColor;         
        },

        paint : function( director, time ) {       
            this.setFillStyle(this.currentKeyColor);

            var ctx = director.ctx;
                ctx.fillStyle = this.currentKeyColor;
      
                //ctx.fillStyle = '#FFF';
            ctx.fillRect(0, 0, this.width, this.height);

            //

            /*
            if(this.drawScaleNumber && this.scaleNote>0){
                //this.textNumber.setLocation( this.x, 500 );
                this.textNumber.calcTextSize(director);

                this.textNumber.paint(director,time);
            }*/
            
            // for drawing the numbers using the matrix
            return CL.PianoKeyActor.superclass.paint.call(this, director,time);
		},

        paintActorGL : function(director, time, ambient, wmv) {
            /*
            for( var i=0; i<contour.length; i++ ) {
                wmv.transformCoord(contour[i]);
                this.__polyLine[pos++]= contour[i].x;
                this.__polyLine[pos++]= contour[i].y;
                this.__polyLine[pos++]= z;
            }

            director.glTextureProgram.drawPolylines( this.__polyLine, contour.length,
                    Math.floor(this.color[0]*ambient)/255,
	        		Math.floor(this.color[1]*ambient)/255,
	        		Math.floor(this.color[2]*ambient)/255,
                    1,
                    3);
*/
        }
	};

    extend( CL.PianoKeyActor, CAAT.ActorContainer);
})();

(function() {
    CL.PianoActor = function() {
        CL.PianoActor.superclass.constructor.call(this, CAAT.Foundation.ActorContainer.AddHint.CONFORM);
        return this;
    };

    CL.PianoActor.prototype= {
        instance:          0,

        pianoKeys:                  [],
        pianoScale:                 CL.MAJOR,
        pianoKey:                   0,  // CL.NOTE
        questionNote:               -1,
        calculatedPianoScale:       Array(12),
        drawOutline:                true,

        initialize : function(width, height, num, keyspace, outline) {
            this.constructor.prototype.instance = this;
            if(num ==0 ) // no keyboards generated
                return false;

            this.drawOutline = outline;
            calculatedPianoScale = Array(12);
            this.setFillStyle("#000");

            //compute sizes
            var whiteW = ((width/num) / 7) - keyspace, // size of a white key
                whiteH = height,
                blackW = whiteW*0.7, // size of a black key
                blackH = whiteH*0.6,
                whiteX = [], //positions
                blackX = []; //positions
            //this.setSize(width, height);

            // calculate positions for all white keys
            for(t=0;t<7;t++)
                whiteX[t] = (t*whiteW) + (t*keyspace);

            //calculate positions for all black keys
            blackX[0] = whiteX[0]+(whiteW*0.55);
            blackX[1] = whiteX[2]+(whiteW*0.45) - blackW;
            blackX[2] = whiteX[3]+(whiteW*0.55);
            blackX[3] = whiteX[5]-(blackW*0.50) - (keyspace*0.5);
            blackX[4] = whiteX[6]+(whiteW*0.45) - blackW;

            var octavewidth = width/num;
            this.pianoKeys = [];
            for(var c=0; c<num; c++){
                this.pianoKeys.push(new CL.PianoKeyActor().initialize(0, CL.WHITE, whiteX[0] + (c*octavewidth), whiteW, whiteH ));               
                this.pianoKeys.push( new CL.PianoKeyActor().initialize(1, CL.BLACK, blackX[0]+ (c*octavewidth), blackW, blackH ));       
                this.pianoKeys.push( new CL.PianoKeyActor().initialize(2, CL.WHITE, whiteX[1]+ (c*octavewidth), whiteW, whiteH ));
                this.pianoKeys.push( new CL.PianoKeyActor().initialize(3, CL.BLACK, blackX[1]+ (c*octavewidth), blackW, blackH ));           
                this.pianoKeys.push( new CL.PianoKeyActor().initialize(4, CL.WHITE, whiteX[2]+ (c*octavewidth), whiteW, whiteH ));
                this.pianoKeys.push( new CL.PianoKeyActor().initialize(5, CL.WHITE, whiteX[3]+ (c*octavewidth), whiteW, whiteH ));
                this.pianoKeys.push( new CL.PianoKeyActor().initialize(6, CL.BLACK, blackX[2]+ (c*octavewidth), blackW, blackH )); 
                this.pianoKeys.push( new CL.PianoKeyActor().initialize(7, CL.WHITE, whiteX[4]+ (c*octavewidth), whiteW, whiteH ));
                this.pianoKeys.push( new CL.PianoKeyActor().initialize(8, CL.BLACK, blackX[3]+ (c*octavewidth), blackW, blackH )); 
                this.pianoKeys.push( new CL.PianoKeyActor().initialize(9, CL.WHITE, whiteX[5]+ (c*octavewidth), whiteW, whiteH ));
                this.pianoKeys.push( new CL.PianoKeyActor().initialize(10, CL.BLACK, blackX[4]+ (c*octavewidth), blackW, blackH ));
                this.pianoKeys.push( new CL.PianoKeyActor().initialize(11, CL.WHITE, whiteX[6]+ (c*octavewidth), whiteW, whiteH ));
            }

            for(var c=0; c<this.pianoKeys.length; c++)
                this.addChild(this.pianoKeys[c]);

            var blackKeys = [];
            for(var t=0;t<this.getNumChildren(); t++){
                key = this.getChildAt(t);  
                //this.getChildAt(t).enableEvents(false);
                if(key.keyType == CL.BLACK)
                    blackKeys.push(key);
                key.mouseDown= function(mouseEvent) {
                    this.playKey();
                };
                key.mouseExit= function(mouseEvent) {
                    this.releaseKey();
                };
                key.mouseUp= function(mouseEvent) {
                    this.releaseKey();
                };

            }
            k = this;
            var i=blackKeys.length;
            while(i--){
                //blackkeys[i].enableEvents(false);     
                this.setZOrder( blackKeys[i], Number.MAX_VALUE );
            }
           
            return this;
        },
        setQuestion : function(q){
            this.pianoKey = q.keyData;
            this.pianoScale = q.scaleData;
            this.questionNote = q.noteData;
            this.questionInterval = q.interval;
            this.chromaticScale = (q.scale == "CHROMATIC") ? true : false;
            this.__calculateQuestionNote();  
            return this;
            /*
            Question { Key : newkey, Scale : newScale, Note : newNote }
            */
        },  
        setPianoKey : function(key){
            this.pianoKey = key;
            this.__calculateQuestionNote();
            return this;  
        },
        setPianoScale : function(scale){
            this.pianoScale = scale;
            this.__calculateQuestionNote();
            return this;      
        },
        setQuestionNote : function(note){
            this.questionNote = note;
            this.__calculateQuestionNote();
            return this;      
        },
        enableDragPiano : function(state){
            this.enableDrag(state);
            for(var k=0; k<this.pianoKeys.length; k++){
                this.pianoKeys[k].enableEvents(!state);
            }
            return this;
        },
        __calculateQuestionNote : function(){  
            // generate array of correct scale notes
            for(var t=0; t<12; t++){
                this.calculatedPianoScale[t] = this.pianoKey + this.pianoScale[t];
                // adjust for superlong keyboard
                if(this.calculatedPianoScale[t]>11)
                    this.calculatedPianoScale[t] -=12;
            }
                
            // set correct scale notes for piano
            for(var k=0; k<this.pianoKeys.length; k++){

                //reset stuff!
                this.pianoKeys[k].setScaleNote(0);
                this.pianoKeys[k].setQuestionNote(false);
                this.pianoKeys[k].setScaleNoteHelper(false);

                //set scalenote
                for(var c=0;c<this.calculatedPianoScale.length; c++)
                    if(this.pianoKeys[k].keyNumber == this.calculatedPianoScale[c]){
                        this.pianoKeys[k].setScaleNote(c+1);
                        if(this.chromaticScale) // intervallnamn om kromatisk skala
                            this.pianoKeys[k].setIntervalName(CL.INTERVAL[c]);
                        if(c == this.questionNote)
                            this.pianoKeys[k].setQuestionNote(true);
                    }
            }
            
            // only show scale note help for the first visible octave
            var count = 1;
            for(var t=0; t<this.pianoScale.length; t++){
                var note = this.pianoKey + this.pianoScale[t];
                this.pianoKeys[note].setScaleNoteHelper(true);
            }
            
        },
        setPianoTextVisibility : function(status){
            for(var k=0; k<this.pianoKeys.length; k++)
                this.pianoKeys[k].setScaleTextVisibility(status);
            return this;
        },
        paint : function( director, time ) {
            var ctx = director.ctx;
            //setFillStyle
            //ctx.fillRect(_x+whiteKey[t].x,_y+whiteKey[t].y,whiteW,whiteH);

            CL.PianoActor.superclass.paint.call(this, director,time);
            
            if(this.drawOutline){

            //ctx.setFillStyle(this.currentKeyColor);
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(this.width, 0);
            ctx.lineTo(this.width, this.height)
            ctx.lineTo(0, this.height)
            ctx.lineTo(0,0);
            ctx.stroke();
            }

        }
        
    };




    
    extend( CL.PianoActor, CAAT.ActorContainer);
})();