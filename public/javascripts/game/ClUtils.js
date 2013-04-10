
(function() {
    CL.director = null;
    CL.pianoScene = null;
    CL.prefsScene = null;

    CL.SETTINGS= { // 
        keys: ['Bb'],
        scales: ['MAJOR', 'MINOR'],
        diatonicNotes: [1],
        chromaticNotes: [1,2,3],
        lang: 'ENG',
        gameMode: 'mode1' //
    };

    CL.QuestionGroup = function() {
        return this;
    };

    CL.QuestionGroup.prototype = {
        questions : null,
        retry : false,
        init : function(){
            this.questions = [];
            this.retry = false
            return this;
        },
        addQuestion : function(question){
            this.questions.push(question);
            return this;
        },
        setRetry : function(state){
            this.retry = state;
            return this;
        }
    };

    CL.Question = function() {
        return this;
    };

    CL.Question.prototype = {
        key : null,
        keyData: null,
        scale : null,
        scaleData : null,
        note : null,
        noteData : null,
        retry : false,
        init : function(key, scale, note){
            this.key = key;
            this.keyData = CL.KEY[key];
            this.scale = scale;
            this.scaleData = CL.SCALE[scale];
            this.note = note;
            this.noteData = note-1;
           
            this.interval = {};
            this.interval.long = CL.INTERVAL[this.scaleData[this.noteData]].long;
            this.interval.short  = CL.INTERVAL[this.scaleData[this.noteData]].short;

            this.retry = false;
            return this;
        },
        isEqual : function(other){
            if(other.key == this.key && other.scale == this.scale && other.note == this.note)
                return true;
            else
                return false;
        },
        getDifference : function(other){
            var diff = {}
            diff.key = (other.key == this.key) ? false : true;
            diff.scale = (other.scale == this.scale) ? false : true;
            diff.note = (other.note == this.note) ? false : true;
            return diff;
        }
    };

    CL.UTILS = {
        
        oldQ : null,
        currentQ : null,

        qNotesMin : 3,
        qNotesMax : 7,
        
        lastQuestion : null,
        currentQuestion : null,
        currentQuestionNumber : 0,
        questionGroups : null,


    	randomize : function(first, last){
            return Math.floor( (Math.random()*((last)-first)) + first );
        },
        __randomizeFloat : function(first, last){
            return (Math.random()*(last-first)) + first;
        },
        __randomizeKey : function(){
            var num = this.randomize( 0, CL.SETTINGS.keys.length);
            //console.log(num);
            return CL.SETTINGS.keys[num];
        },

        __randomizeScale : function(){
            var num = this.randomize( 0, CL.SETTINGS.scales.length);
            return CL.SETTINGS.scales[num];
        },

        __randomizeChromaticNote : function(){
            var num = CL.SETTINGS.chromaticNotes[this.randomize( 0, CL.SETTINGS.chromaticNotes.length)];
            return num;
        },

        __randomizeDiatonicNote : function(){
            var num = CL.SETTINGS.diatonicNotes[ this.randomize( 0, CL.SETTINGS.diatonicNotes.length)] ;
            return num;
        },
        shuffle : function(o){ //v1.0
            for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },
        generateQuestions : function(){
            // generera frågor i förväg. en sorts mall som följs i bästa fall

            this.questionGroups = [];

            var keys = [],
                scales = [],
                notes = [];

            // create bunch of keys and shuffle
            var keys = CL.SETTINGS.keys.slice();
            keys = this.shuffle(keys);
            for(var k = 0; k<keys.length;k++){

                // create bunch of scales and shuffle
                var scales = CL.SETTINGS.scales.slice();
                scales = this.shuffle(scales);
                for(var s = 0; s<scales.length;s++){

                    var lengthNotes = this.randomize(this.qNotesMin, this.qNotesMax);
                    //console.log("lengthNotes: "+lengthNotes)
                    notes = [];
                    // create notes until >lengthNotes
                    while(notes.length < lengthNotes){
                        var newnotes = (scales[s] == 'CHROMATIC') ? CL.SETTINGS.chromaticNotes.slice() : CL.SETTINGS.diatonicNotes.slice();
                        //console.log("newnotes: "+newnotes)
                        notes = notes.concat(newnotes);
                        //console.log("notes: "+notes)
                    }
                    // remove redudant notes and shuffle
                    notes.splice(lengthNotes, notes.length);
                    notes = this.shuffle(notes)

                    //console.log("old sequence: "+notes);


                    // order questions to avoid three of the same in a row
                    var begin = -1;
                    for (var c=0;c<notes.length;c++){
                        //we must not compare null-values
                        if(c+2<notes.length)
                            if(notes[c] == notes[c+1] && notes[c+1] == notes[c+2]){
                                if(begin==-1)
                                    begin = c;
                                notes.push(notes.splice(c,1)[0]);
                            }
                    }

                    //console.log("new sequence: "+notes);

                    // check if we have moved some questions
                    // if we have, shuffle and sort again.
                    // maybe move the above function?
                    // BUG! can still be 3 of same as last in the array


                    // create a group for organizing the questions
                    var group = new CL.QuestionGroup().init();
                    
                    // create questions and put into group
                    for(var n = 0; n<notes.length;n++){
                        var question = new CL.Question().init(keys[k], scales[s], notes[n]);
                        
                        group.addQuestion(question);
                    }
                    //store group in class
                    this.questionGroups.push(group);
                }
            }

             
        },
        initQuestionGenerator : function(notesMin, notesMax){
            if(notesMin !== undefined)
                this.qNotesMin = notesMin;
            if(notesMax !== undefined)
                this.qNotesMax = notesMax;
            this.generateQuestions();

            this.currentQuestionGroupNumber = 0;
            this.currentQuestionNumber = 0;
            //genererar alla frågor i förväg.


            //default. vi randomiserar först hur många noter vi kör innan byte.
            //om vi felar någon av noterna, så resetas antalet noter.
            //när noterna tagit slut, så byts skalan.
            //när skalan är slut, så byts tonarten.

        },
        retryCurrentQuestionGroup : function(){
            this.questionGroups[this.currentQuestionGroupNumber].setRetry(true);
        },
        newQuestionV2 : function(){
            //this.lastQuestion = this.currentQuestion;
           

            // hämta nuvarande grupp
            var group = this.questionGroups[this.currentQuestionGroupNumber];

            console.log('question number:'+this.currentQuestionNumber+"/"+group.questions.length);
            console.log('question group:'+this.currentQuestionGroupNumber+"/"+this.questionGroups.length);
            console.log('retrygroup:'+group.retry);
            // överträtt antal frågor?
            if(this.currentQuestionNumber >= group.questions.length){
                // köra gruppen igen? - händer om man svarat fel på en fråga
                this.currentQuestionNumber = 0;
                if(group.retry){
                    this.shuffle(group.questions);
                    group.setRetry(false);
                }else{
                    // nästa grupp
                    this.currentQuestionGroupNumber++;
                    // kolla om vi kört igenom allt
                    if(this.currentQuestionGroupNumber >= this.questionGroups.length)
                    {
                        // isf, generate more questions
                        this.currentQuestionGroupNumber = 0;
                        this.generateQuestions();       
                    }
                }
            }

            this.currentQuestion = this.questionGroups[this.currentQuestionGroupNumber].questions[this.currentQuestionNumber];
            this.currentQuestionNumber++;

            return this.currentQuestion;
        },
        newQuestion : function(){
            this.oldQ = this.currentQ;

            var newkey = this.__randomizeKey(),
                newKeyData = CL.KEY[newkey],
                newScale = this.__randomizeScale(),
                newScaleData = CL.SCALE[newScale],
                newNote = 0, newNoteData = 0,
                newQ;
            if(newScale == 'CHROMATIC')
                newNote = this.__randomizeChromaticNote();
            else
                newNote = this.__randomizeDiatonicNote();

            var newQ =  {
                key : newkey,
                keyData: newKeyData,
                scale : newScale,
                scaleData : newScaleData,
                note : newNote,
                noteData : newNote-1,
                isEqual : function(other){
                    if(other.key == this.key && other.scale == this.scale && other.note == this.note)
                        return true;
                    else
                        return false;
                },
                getDifference : function(other){
                    var diff = {}
                    diff.key = (other.key == this.key) ? false : true;
                    diff.scale = (other.scale == this.scale) ? false : true;
                    diff.note = (other.note == this.note) ? false : true;
                    return diff;
                }
            };

            this.currentQ = newQ;

            // first time fix
            if(this.oldQ !== null){
                //exactly the same question - fix it
                if(newQ.isEqual(this.oldQ)){

                    //check if its the same note
                    if(newQ.note == this.oldQ.note && newQ.scale){
                        //get the available scalenotes for this note
                        var notes;
                        if(newQ.scale == 'CHROMATIC')
                            notes = CL.SETTINGS.chromaticNotes.slice();
                        else
                            notes = CL.SETTINGS.diatonicNotes.slice();
                        // can we choose another?
                        if(notes.length > 1){
                            var cutThis = notes.indexOf(this.oldQ.note);
                            notes.splice(cutThis, 1);
                            newQ.note = notes[ CL.UTILS.randomize(0,notes.length)]; //find a better note!
                            newQ.noteData = newQ.note-1;
                            console.log("last key was the same, we randomized a new")
                            return newQ;
                        }
                    }

                    // check for same key + possible to rand new key
                    if(newQ.key == this.oldQ.key && CL.SETTINGS.keys.length > 1){
                        var keys = CL.SETTINGS.keys.slice();
                        var cutThis = keys.indexOf(this.oldQ.key);
                        keys.splice(cutThis, 1);
                        newQ.key = keys[ CL.UTILS.randomize(0, keys.length)]; //find another key!
                        newQ.keyData = CL.KEY[newQ.key],
                        console.log("randomized new key")
                        return newQ;
                    }

                    // check for same key + possible to rand new scale
                    if(newQ.scale == this.oldQ.scale && CL.SETTINGS.scales.length > 1){
                        var scales = CL.SETTINGS.scales.slice();
                        var cutThis = scales.indexOf(this.oldQ.scale);
                        scales.splice(cutThis, 1);
                        newQ.scale = scales[ CL.UTILS.randomize(0, scales.length)]; //find another scale!
                        newQ.scaleData = CL.SCALE[newQ.scale];
                        console.log("randomized new scale")
                        return newQ;
                    }
                }
            }


            return newQ;
        },
        
	};

})();




// gui