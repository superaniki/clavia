

(function() {


    CL = {
        BLACK : "black",
        WHITE : "white",
        KEY_UP : "up",
        KEY_DOWN : "down"
    };

    CL.KEY = { 
        "C" : 0,
        "Db" : 1,
        "C#" : 1,
        "D" : 2, 
        "Eb" : 3,
        "D#" : 3,
        "E" : 4,
        "F" : 5,
        "Gb" : 6,
        "F#" : 6,
        "G" : 7,
        "Ab" : 8,
        "G#" : 8,
        "A" : 9,
        "Bb" : 10,
        "A#" : 10,
        "B" : 11,
      };

    CL.INTERVAL = [
        {"short":"P1","long":"Unison"},
        {"short":"m2","long":"Minor second"},
        {"short":"M2","long":"Major second"},
        {"short":"m3","long":"Minor third"},
        {"short":"M3","long":"Major third"},
        {"short":"P4","long":"Perfect fourth"},
        {"short":"TT","long":"Tritone"},
        {"short":"P5","long":"Perfect fifth"},
        {"short":"m6","long":"Minor sixth"},
        {"short":"M6","long":"Major sixth"},
        {"short":"m7","long":"Minor seventh"},
        {"short":"M7","long":"Major seventh"},
        {"short":"P8","long":"Perfect octave"}
    ];

    CL.SCALE = {
        CHROMATIC : [0,1,2,3,4,5,6,7,8,9,10,11],
        MAJOR : [0,2,4,5,7,9,11],
        MINOR : [0,2,3,5,7,8,10],
        HARMONIC_MINOR : [0,2,3,5,7,8,11],
        MELODIC_MINOR : [0,2,3,5,7,9,11],
        HARMONIC_MAJOR : [0,2,4,5,7,8,11],

        IONIAN : [0,2,4,5,7,9,11],
        DORIAN : [0,2,3,5,7,9,10],
        PHRYGIAN : [0,1,3,5,7,8,10],
        LYDIAN : [0,2,4,6,7,9,11],
        MIXOLYDIAN : [0,2,4,5,7,9,10],
        AOLIAN : [0,2,3,5,7,8,10],
        LOCRIAN : [0,1,3,5,6,8,10]
    };


    CL.LANG = {}

    CL.LANG.ENG = {}
    CL.LANG.ENG.SCALE = {
        CHROMATIC : "Chromatic",
        MAJOR : "Major",
        MINOR : "Minor",
        HARMONIC_MINOR : "Harmonic Minor",
        MELODIC_MINOR : "Melodic Minor",
        HARMONIC_MAJOR : "Harmonic Major",

        IONIAN : "Ionian",
        DORIAN : "Dorian",
        PHRYGIAN : "Phrygian",
        LYDIAN : "Lydian",
        MIXOLYDIAN : "Mixolydian",
        AOLIAN : "Aolian",
        LOCRIAN : "Locrian",
    }

    CL.LANG.SWE = {}
    CL.LANG.SWE.SCALE = {
        CHROMATIC : "Kromatisk",
        MAJOR : "Dur",
        MINOR : "Moll",
        HARMONIC_MINOR : "Harmonisk Moll",
        MELODIC_MINOR : "Melodisk Moll",
        HARMONIC_MAJOR : "Harmonisk Dur",

        IONIAN : "Jonisk",
        DORIAN : "Dorisk",
        PHRYGIAN : "Frygisk",
        LYDIAN : "Lydisk",
        MIXOLYDIAN : "Mixolydisk",
        AOLIAN : "Eolisk",
        LOCRIAN : "Lokrisk",
    }
})();


(function() { // CAAT hax

    CAAT.Foundation.Actor.prototype.setName = function(name){
        this.name = name;
        return this;
    }

    CL.currentSceneCoordinates = function(){
        var s = CL.director.getCurrentScene();
        for(var n=0;n<s.getNumChildren();n++){
            var o = s.getChildAt(n);
            var out = "Name: "+o.name+" setBounds("+Math.round(o.x)+", "+Math.round(o.y)+", "
                +Math.round(o.width)+", "+Math.round(o.height)+")."+
                "setScale("+o.scaleX.toFixed(2)+", "+o.scaleY.toFixed(2)+")."+
                "setRotation("+o.rotationAngle.toFixed(2)+");";
                console.log(out);
        }
    };

    CL.currentSceneEnableDrag = function(state){
        var s = CL.director.getCurrentScene();
        for(var n=0;n<s.getNumChildren();n++){
            var o = s.getChildAt(n);
            o.enableDrag(state);
        }
    };

})();