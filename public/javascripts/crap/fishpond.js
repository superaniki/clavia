
    /**
     * @license
     *
     * The MIT License
     * Copyright (c) 2010-2011 Ibon Tolosana, Hyperandroid || http://labs.hyperandroid.com/

     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:

     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.

     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     *
     */
CAAT.DEBUG=1;
    (function() {
        /**
         * Startup it all up when the document is ready.
         * Change for your favorite frameworks initialization code.
         */
        window.addEventListener('load',load,false);

        function load() {
            CAAT.ModuleManager.
                debug(true).

                baseURL( "../../../src/").
                setModulePath("CAAT.Core",              "Core").
                setModulePath("CAAT.Math",              "Math").
                setModulePath("CAAT.Behavior",          "Behavior").
                setModulePath("CAAT.Foundation",        "Foundation").
                setModulePath("CAAT.Event",             "Event").
                setModulePath("CAAT.PathUtil",          "PathUtil").
                setModulePath("CAAT.Module",            "Modules").
                setModulePath("CAAT.WebGL",             "WebGL").

                setModulePath("CAAT.Procedural",        "../documentation/demos/demo2").

                // get modules, and solve their dependencies.
                bring(
                    [
                        "CAAT.PathUtil.Path",
                        "CAAT.Procedural.Fish",
                        "CAAT.Foundation.Director"
                    ]
                ).

                // this function will be firer every time all dependencies have been solved.
                // if you call again bring, this function could be fired again.
                onReady( start );
        }

        function start() {
            CAAT.DEBUG=1;

            var director= new CAAT.Foundation.Director().initialize( 800,500,'experiment-canvas' );

            var scene= director.createScene();

            // when the scene is activated, avoid the director clearing the viewport since it'll be
            // totally erased by the background.
            scene.activated= function() {
                director.setClear(false);
            }
            var NP=20;
            var colors= ['red', 'blue', 'white', 'rgb(0,255,255)', 'yellow'];
            var gradient= director.ctx.createLinearGradient(0,0,director.width,director.height);
            gradient.addColorStop(0,'#000000');
            gradient.addColorStop(1,'#00007f');

            var gr= new CAAT.ActorContainer().
                    setBounds(0,0,director.width,director.height).
                    setFillStyle(gradient).
                    enableEvents(false).
                    cacheAsBitmap();

            for( var i=0; i<NP; i++ ) {

                var fw= (100 + Math.random()*40*(Math.random()<.5?1:-1))>>0;
                var fh= (20+ Math.random()*5*(Math.random()<.5?1:-1))>>0;

                var inTime= i*1000;

                var pb = new CAAT.PathBehavior().
                        setPath(new CAAT.PathUtil.Path().setCubic(
                        -fw - Math.random() * 300,
                        Math.random() * director.height,

                        director.width * Math.random(),
                        Math.random() * director.height,

                        director.width * Math.random(),
                        Math.random() * director.height,

                        Math.random() < .5 ? director.width + fw + Math.random() * 150 : Math.random() * director.width,
                        Math.random() < .5 ? -director.height * Math.random() - 300 : director.height + Math.random() * director.height
                        )).
                        setFrameTime(scene.time + inTime, (20000 + 5000 * Math.random()) >> 0).
                        setCycle(true).
                        setAutoRotate(true).
                        addListener({
                                behaviorExpired : function(behavior, time, actor) {
                                    behavior.path.setCubic(
                                            -fw - Math.random() * 300,
                                            Math.random() * director.height,

                                            director.width * Math.random(),
                                            -Math.random() * director.height / 2 + Math.random() * director.height,

                                            director.width * Math.random(),
                                            -Math.random() * director.height / 2 + Math.random() * director.height,

                                            Math.random() < .5 ? director.width + fw + Math.random() * 150 : Math.random() * director.width,
                                            Math.random() < .5 ? -director.height * Math.random() - 300 : director.height + Math.random() * director.height
                                            );
                                    behavior.setFrameTime(scene.time, (20000 + 5000 * Math.random()) >> 0);
                                    actor.born();
                                },
                                behaviorApplied : function(actor, time, normalizedTime, value) {

                                }
                            });

                var f= new CAAT.Procedural.Fish().
                        setBounds(300,400,fw,fh).
                        born().
                        setFrameTime( scene.time+inTime, Number.MAX_VALUE ).
                        setBodyColor(colors[i%colors.length]);

                f.addBehavior(pb);
                gr.addChild(f);
            }

            scene.addChild(gr);

            CAAT.loop(60);

        }

    })();
