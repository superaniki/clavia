(function() {
    CL.GUI = {}

    CL.GUI.CheckMarkerGroup = function() {
        return this;
    };

    CL.GUI.CheckMarkerGroup.prototype = {
        label :                  null,
        members :                null,
        actor :                  null,
        mouseActions :          false,
        mouseEnterSetState :    false,
        labelActor :             null,

        init : function(label, checkmarkers, x, y, elementsPerRow, yspace, xrowspace, checksize){
            var calcx=0,
                calcy=0,
                countElem= 0;

            this.members = [];
            this.label = label;
            this.actor = new CAAT.Foundation.ActorContainer(CAAT.Foundation.ActorContainer.AddHint.CONFORM)
                            .setPosition(x, y);

            // add group label
            this.labelActor = new CAAT.Foundation.UI.TextActor().
                    setFont("20px sans-serif").
                    setText(label).           
                    setTextAlign("left").
                    setTextBaseline("middle").
                    setPosition( 0, 0 ).
                    setTextFillStyle("#000").
                    enableEvents(false);

            this.actor.addChild(this.labelActor);

            // calculate screen placements
            for(var t=0; t< checkmarkers.length; t++){
                if(checkmarkers[t].id != 'space'){
                    var cm = new CL.GUI.CheckMarkerActor().init(checkmarkers[t].id, checkmarkers[t].label, calcx, calcy, checksize, this);
                    this.actor.addChild(cm);
                    calcy+=yspace;
                }
                else{
                    calcy+=yspace*0.4;
                }

                countElem+=1;
                if(countElem > elementsPerRow){
                    calcx += xrowspace;
                    countElem = 0;
                    calcy = 0;
                }   
            }

            return this;
        },
        setState : function(state){
            for(var i=0;i<this.members.length;i++)
                this.members[i].setState(state);
            return this;
        },
        setLabelPosition : function(x,y){
            this.labelActor.setPosition(x,y);
            return this;
        }
    };

    CL.GUI.CheckMarkerActor = function() {
        CL.GUI.CheckMarkerActor.superclass.constructor.call(this, CAAT.Foundation.ActorContainer.AddHint.CONFORM);
        return this;
    };

    CL.GUI.CheckMarkerActor.prototype = {
        marker : null,
        box : null,
        label : null,
        dataId : null,
        selectedActor : null,

        init: function(id, label, x, y, checksize, checkmarkGroup){
            this.setPosition(x,y);

            // gfx and events
            var labelText = new CAAT.Foundation.UI.TextActor().
                    setFont("20px sans-serif").
                    setText(label).           
                    setTextAlign("left").
                    setTextBaseline("middle").
                    setPosition( checksize+10, checksize*0.5 ).
                    setTextFillStyle("#000").
                    enableEvents(false);

            var unselectedImage= new CAAT.Foundation.SpriteImage().
                    initialize(CL.director.getImage('checkmarker-unselected'), 1,1 );
            var selectedImage= new CAAT.Foundation.SpriteImage().
                    initialize(CL.director.getImage('checkmarker-selected'), 1,1 );

            var selectedActor = new CAAT.Foundation.Actor().
                setBackgroundImage(selectedImage).
                setImageTransformation(CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE).
                setSize(checksize, checksize).
                enableEvents(false).
                setVisible(false);

            var unselectedActor = new CAAT.Foundation.Actor().    
                setBackgroundImage(unselectedImage).
                setImageTransformation(CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE).
                setSize(checksize, checksize).
                enableEvents(true);

            // for easy access
            this.label = label;
            this.dataId = id;
            this.selectedActor = selectedActor;

            checkmarkGroup.members.push(this);
            unselectedActor.checkmarkGroup = checkmarkGroup;  // because box is handling detection
            unselectedActor.selectedActor = selectedActor;

            unselectedActor.mouseDown = function(){     
                console.log("mouseDown, this.checkmarkGroup.mouseActions: "+ this.checkmarkGroup.mouseActions)  
                this.checkmarkGroup.mouseActions = true;   
                this.checkmarkGroup.mouseEnterSetState = !this.selectedActor.visible;
                this.selectedActor.setVisible(this.checkmarkGroup.mouseEnterSetState); 
                //console.log("mouseDown, this.checkmarkGroup.mouseActions: "+ this.checkmarkGroup.mouseActions);
                //console.log("enterstate: "+ this.checkmarkGroup.mouseEnterSetState);
            };

            unselectedActor.mouseUp = function(){
                //console.log("mouseUp");
                this.checkmarkGroup.mouseActions = false;
            };

            unselectedActor.mouseEnterAlways = function(){
                console.log("mouseenter, this.checkmarkGroup.mouseActions: ");//+ this.checkmarkGroup.mouseActions)
                if(this.checkmarkGroup.mouseActions == true){
                    this.selectedActor.setVisible(this.checkmarkGroup.mouseEnterSetState); 
                     console.log("setting checked: "+this.checkmarkGroup.mouseEnterSetState);//+ this.checkmarkGroup.mouseActions)
                }
            };
            
            // gfx
            this.addChild(labelText);
            this.addChild(unselectedActor);
            this.addChild(this.selectedActor);
            
            this.invalidate();
            return this;
        },
        getState : function(){ 
            //return this.marker.visible;
            return this.selectedActor.visible;
        },
        setState : function(state){ 
            //this.marker.setVisible(state);
            this.selectedActor.setVisible(state);
            this.selectedActor.enableEvents(false);
            return this;
        }
    };
    extend( CL.GUI.CheckMarkerActor, CAAT.ActorContainer);


    CL.GUI.RadioGroup = function() {
        return this;
    };

     CL.GUI.RadioGroup.prototype = {
        label : null,
        members : [],
        actor : null,
        mouseActions : false,
        mouseEnterSetState : false,
        labelActor : null,

        init : function(label, radios, x, y, elementsPerRow, yspace, xrowspace, checksize, that){
            var calcx=0,
                calcy=0,
                countElem= 0;

            this.actor = new CAAT.Foundation.ActorContainer(CAAT.Foundation.ActorContainer.AddHint.CONFORM)
                            .setPosition(x, y),//.setFillStyle("#aaa"),
            this.label = label;
            // add group label
            this.labelActor = new CAAT.Foundation.UI.TextActor().
                    setFont("20px sans-serif").
                    setText(label).           
                    setTextAlign("left").
                    setTextBaseline("middle").
                    setPosition( 0, 0 ).
                    setTextFillStyle("#000").
                    enableEvents(false);

            this.actor.addChild(this.labelActor);

            // calculate screen placements
            for(var t=0; t< radios.length; t++){
                if(radios[t].id != 'space'){
                    var cm = new CL.GUI.RadioActor().init(radios[t].id, radios[t].label, calcx, calcy, checksize, this);
                    this.actor.addChild(cm);
                    calcy+=yspace;
                }
                else{
                    calcy+=yspace*0.4;
                }

                countElem+=1;
                if(countElem > elementsPerRow){
                    calcx += xrowspace;
                    countElem = 0;
                    calcy = 0;
                }   
            }

            return this;

        },
        setState : function(state){
            for(var i=0;i<this.members.length;i++)
                this.members[i].setState(state);
        },          
        setLabelPosition : function(x,y){
            this.labelActor.setPosition(x,y);
        }
    };

 

    CL.GUI.RadioActor = function(){
        CL.GUI.RadioActor.superclass.constructor.call(this, CAAT.Foundation.ActorContainer.AddHint.CONFORM);
        return this;
    };

    CL.GUI.RadioActor.prototype = {
        marker : null,
        box : null,
        dataId : null,
        members : null,
        selectedActor : null,

        init : function(id, label, x, y, checksize, radioGroup){
            this.setPosition(x, y);
            this.members = [];

            var labelText = new CAAT.Foundation.UI.TextActor().
                    setFont("20px sans-serif").
                    setText(label).           
                    setTextAlign("left").
                    setTextBaseline("middle").
                    setPosition( checksize+10,checksize*0.5 ).
                    setTextFillStyle("#000").
                    enableEvents(false);

            var unselectedImage= new CAAT.Foundation.SpriteImage().
                    initialize(CL.director.getImage('radio-unselected'), 1,1 );
            var selectedImage= new CAAT.Foundation.SpriteImage().
                    initialize(CL.director.getImage('radio-selected'), 1,1 );

            var selectedActor = new CAAT.Foundation.Actor().
                setBackgroundImage(selectedImage).
                setImageTransformation(CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE).
                setSize(checksize, checksize).
                enableEvents(false).
                setVisible(false);

            var unselectedActor = new CAAT.Foundation.Actor().    
                setBackgroundImage(unselectedImage).
                setImageTransformation(CAAT.Foundation.SpriteImage.TR_FIXED_TO_SIZE).
                setSize(checksize, checksize).
                enableEvents(true);

            // for easy access
            //this.marker = marker; // for retrival of states
            this.label = label;
            this.dataId = id;
            this.selectedActor = selectedActor;

            radioGroup.members.push(this);
            unselectedActor.radioGroup = radioGroup;  // because box is handling detection
            unselectedActor.selectedActor = selectedActor;
            unselectedActor.radio = this;

            unselectedActor.mouseDown = function(){     
                console.log("mouseDown, this.checkmarkGroup.mouseActions: "+ this.radioGroup.mouseActions)  
                this.radioGroup.mouseActions = true;
                this.radioGroup.setState(false);    
                this.radioGroup.mouseEnterSetState = !this.selectedActor.visible;
                this.selectedActor.setVisible(this.radioGroup.mouseEnterSetState);
                this.radioGroup.currentSelected = this.radio;
            };
            unselectedActor.mouseUp = function(){
                console.log("mouseUp");
                this.radioGroup.mouseActions = false;
            };
            unselectedActor.mouseEnterAlways = function(){
                console.log("mouseenter, this.checkmarkGroup.mouseActions: ");//+ this.radioGroup.mouseActions)
                if(this.radioGroup.mouseActions == true){
                    this.radioGroup.setState(false);
                    this.selectedActor.setVisible(this.radioGroup.mouseEnterSetState);
                    this.radioGroup.currentSelected = this.radio;
                }
            };
            
            // gfx
            this.addChild(unselectedActor);
            this.addChild(selectedActor);
            this.addChild(labelText);
            this.invalidate();

            this.getState = function(){ return this.selectedActor.visible; };
            this.setState = function(state){ return this.selectedActor.setVisible(state); };
            return this;
        }
    }
    extend( CL.GUI.RadioActor, CAAT.ActorContainer);

    CL.GUI.Button = function(){
        CL.GUI.Button.superclass.constructor.call(this);//, CAAT.Foundation.ActorContainer.AddHint.CONFORM);
        return this;
    }

    CL.GUI.Button.prototype = {
        downFillStyle : null,
        upFillStyle : null,
        upImage : null,
        downImage: null,
        sizeToImage : false,


        init : function(label, x, y, width, height, upFillStyle, downFillStyle, callback ){
            
            var label = new CAAT.Foundation.UI.TextActor().
                setFont("25px sans-serif").
                setText(label).           
                setTextAlign("center").
                setPosition( width*0.5, height*0.2 ).
                setTextFillStyle("#000").
                enableEvents(false);

            this.downFillStyle = downFillStyle;
            this.upFillStyle = upFillStyle;
            this.setFillStyle(upFillStyle);
            this.setBounds(x, y, width, height);
            
            this.mouseClick = callback;

            this.addChild(label);

            this._initRendering();
            return this;
        },


            /**
             * setup borderimages for nice button-styles
             * @param cornerSize : the size of one corner in percent of full image
             * @param outputsize : in screen pixels. is this good?
             * @param stretch : stretch the long sides. if false, repeat or print one time
             *
             * @return this
             */
        setupBorderImage : function(mapimage, cornerSize, outputsize, stretch){
            //this.borderImage = image;

            // file:///C:/work/githubs/CAAT/documentation/tutorials/t10-3.html

            var corner = {}.
            corner.w = cornerSize * image.width;
            corner.h = corner.w; //cornerSize * image.height;

            var horizontalBarWidth = image.width - (corner.w + corner.w);
            var verticalBarHeight = image.height - (corner.w + corner.w);

            var map = {
                topleft : {
                    x: 0,
                    y: 0,
                    width: corner.w,
                    height: corner.h
                },
                top : {
                    x: corner.w,
                    y: 0,
                    width: horizontalBarWidth,
                    height: corner.h
                },
                topright : {
                    x: horizontalBarWidth + corner.w,
                    y: 0,
                    width: corner.w,
                    height: corner.h
                },
                left : {
                    x: 0,
                    y: corner.h,
                    width: corner.w,
                    height: verticalBarHeight
                },
                right : {
                    x: corner.w + horizontalBarWidth,
                    y: corner.h,
                    width: corner.w,
                    height: verticalBarHeight
                },
                bottomLeft : {
                    x: 0,
                    y: verticalBarHeight,
                    width: corner.w,
                    height: corner.h
                },
                bottom : {
                    x: corner.w,
                    y: verticalBarHeight,
                    width: horizontalBarWidth,
                    height: corner.h
                },
                bottomRight : {
                    x: corner.w + horizontalBarWidth,
                    y: verticalBarHeight,
                    width: corner.w,
                    height: corner.h
                }
            }

            this.borderImage = new CAAT.Foundation.SpriteImage().
                        initializeFromMap(mapimage, map);

            return this;
        },

        _initRendering : function(){
            this.setBackgroundImage(null);


            // define image for "up" + "exit" state, if exists
            if(this.upImage != null){
                this.setBackgroundImage(this.upImage, false);
                this.setImageTransformation(CAAT.SpriteImage.TR_FIXED_TO_SIZE);
                this.mouseUp = function(){ 
                    this.setBackgroundImage(this.upImage, false);
                    this.setImageTransformation(CAAT.SpriteImage.TR_FIXED_TO_SIZE);
                };
                this.mouseExit = function(){
                    this.setBackgroundImage(this.upImage, false);
                    this.setImageTransformation(CAAT.SpriteImage.TR_FIXED_TO_SIZE);
                }
            }
            else{
                this.mouseExit = function(){ 
                    this.setBackgroundImage(null);
                    this.setFillStyle(this.upFillStyle);

                };
                this.mouseUp = function(){ 
                    this.setBackgroundImage(null);
                    this.setFillStyle(this.upFillStyle); 
                };
            }

            // define image for "down" state, if exists
            if(this.downImage != null){
                this.mouseDown = function(){ 
                    this.setBackgroundImage(this.downImage, false);
                    this.setImageTransformation(CAAT.SpriteImage.TR_FIXED_TO_SIZE);
                };
            }
            else{
                this.mouseDown = function(){ this.setBackgroundImage(null);this.setFillStyle(this.downFillStyle); };
            }

            //// check if stretched
            
            //this.setImageTransformation(CAAT.SpriteImage.TR_FIXED_TO_SIZE);

            //this.setBounds(this.x, this.y,tWidth,tHeight);
        },
        setUpImage : function(image, sizeToImage){
            this.upImage = image;
            this.sizeToImage = sizeToImage;
            this._initRendering();
            return this;
        },
        setDownImage : function(image, sizeToImage){
            this.downImage = image;
            this.sizeToImage = sizeToImage;
            this._initRendering();
            return this;
        }
    };
    extend(CL.GUI.Button, CAAT.ActorContainer );

})();