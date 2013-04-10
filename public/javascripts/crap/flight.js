
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


    (function() {
        CAAT.DEBUG=1;
        window.addEventListener('load',load,false);

        function load() {
            CAAT.ModuleManager.
                baseURL( "../../../src/").
                setModulePath("CAAT.Core",              "Core").
                setModulePath("CAAT.Math",              "Math").
                setModulePath("CAAT.Behavior",          "Behavior").
                setModulePath("CAAT.Foundation",        "Foundation").
                setModulePath("CAAT.Event",             "Event").
                setModulePath("CAAT.PathUtil",          "PathUtil").
                setModulePath("CAAT.Module",            "Modules").
                setModulePath("CAAT.WebGL",             "WebGL").

                setModulePath("CAAT.FC",                "../documentation/demos/demo20").

                // get modules, and solve their dependencies.
                bring(
                    [
                        "CAAT.PathUtil.Path",
                        "CAAT.Foundation.Director",
                        "CAAT.Foundation.ActorContainer",
                        "CAAT.Foundation.Actor",

                        "CAAT.Foundation.UI.PathActor",

                        "CAAT.Math.Point",
                        "CAAT.Math.Rectangle",

                        "CAAT.Behavior.PathBehavior",

                        "CAAT.FC.Board"
                    ]
                ).

                // this function will be firer every time all dependencies have been solved.
                // if you call again bring, this function could be fired again.
                onReady( __start );
        }

        function __start() {


            var director= new CAAT.Foundation.Director().initialize(800, 500, "experiment-canvas");
            var scene= director.createScene();
            var board= new CAAT.FC.Board().create( director, scene );

            CAAT.loop(60);
        }

    })();

