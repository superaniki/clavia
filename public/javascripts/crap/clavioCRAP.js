 

//avactivera clear, för det behövs inte
            /*
            scene.activated = function() {
                director.setClear(false);
            }*/




 /*
            this.getChildAt(0).mouseEnter= function(mouseEvent) {
                        this.parent.setZOrder( this, Number.MAX_VALUE );
                        this.emptyBehaviorList();
                        this.addBehavior(
                                new CAAT.ScaleBehavior().
                                        setFrameTime( this.time, 500 ).
                                        setValues( 1, 2, 1, 2 ).
                                        setPingPong()
                                ).
                            addBehavior(
                                new CAAT.RotateBehavior().
                                        setFrameTime( this.time, 500 ).
                                        setValues( 0, 2*Math.PI )
                                );

                        document.body.style.cursor = 'pointer';
                    };
                    */

            //this.setScale(this.scale);




               piano.addBehavior( new CAAT.Behavior.RotateBehavior().
                setValues( 0 , 2*Math.PI).
                setDelayTime( 0, 5000).
                setCycle( true )).setAnchor(150,100);
 

            /*
            var i = new CAAT.Behavior.Interpolator().createLinearInterpolator(true,false);
            piano = new CAAT.InterpolatorActor().setInterpolator(i).setLocation(100,100).setSize(100,100).setFillStyle('#333').setGap(20);
            
            
            piano.addBehavior( new CAAT.Behavior.RotateBehavior().
                setValues( 0 , 2*Math.PI).
                setDelayTime( 0, 5000).
                setCycle( false ));
            scene.addChild(piano);
/*
            scene.addChild(new CAAT.Foundation.UI.InterpolatorActor().
                                        setInterpolator( i ).
                                        setBounds( 10, 10, 80, 80 ).
                                        setFillStyle('#77f').
                                        setStrokeStyle( '#fff' ) );
 */
            // create a CAAT actor

            /*
            var circle=    new CAAT.Foundation.UI.ShapeActor().
                    setLocation(20,20).
                    setSize(60,60).
                    setFillStyle('#ff0000').
                    setStrokeStyle('#000000');
            circle.enableDrag();
            // add it to the scene
            scene.addChild(circle);
            */

            //klav = new CAAT.Clavia.Claviature;
            
            /*
            var container = new CAAT.Foundation.ActorContainer().Ñ
                setSize(180, 180).
                setPosition(0,100).
                setFillStyle('red').
                setGlobalAlpha( 1).
                setAlpha(.33);
                /*
                
            container.addChild(klav);
            
            scene.addChild(container);
/*
            // ritar ut en massa färgblobbar
            for (var i = 0; i < 30; i++) {
                var w = 30 + (100 * Math.random()) >> 0;
                var r = (255 * Math.random()) >> 0;
                var g = (255 * Math.random()) >> 0;
                var b = (255 * Math.random()) >> 0;
                scene.addChild(
                        new CAAT.Foundation.Actor().
                                setBounds(
                                (director.width * Math.random()) >> 0,
                                (director.height * Math.random()) >> 0,
                                w,
                                w).
                                setFillStyle('rgb(' + r + ',' + g + ',' + b + ')')
                );
            }
            */