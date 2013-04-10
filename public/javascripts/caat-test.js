function __scene(director) {
 
    var scene= director.createScene();
 
    var bg= new CAAT.ActorContainer().
            setBounds(0,0,director.width*0.5,director.height);
 
    // custom paint: stroke a bounding rectangle
    bg.paint= function(director,time) {
        var ctx= director.ctx;
        ctx.stokeStyle='black';
        ctx.strokeRect(0,0,bg.width,bg.height);
    };
 
    scene.addChild(bg);
 
    var arrow= new CAAT.Actor().
            setBounds(0,0,director.width,director.height).
            enableEvents(false);
    bg.addChild(arrow);
 
    // custom paint: draw a proportional arrow
    arrow.paint= function(director, time) {
 
        var ctx= director.ctx;
        var gap= 80;
 
        // build a random color
        var color= 'rgb(';
        color+= time%255;
        color+=',';
        color+= (time>>8)&255;
        color+=',';
        color+= 0xa0;
        color+=')';
 
        ctx.strokeStyle= color;
        ctx.beginPath();
        ctx.moveTo(gap, bg.height / 2);
        ctx.lineTo(bg.width - gap, bg.height/2);
        ctx.lineTo( bg.width - gap - (bg.height / 4), bg.height / 4);
 
        ctx.moveTo(bg.width - gap, bg.height/2);
        ctx.lineTo(bg.width - gap - (bg.height / 4), bg.height / 2 + bg.height / 4);
 
        ctx.lineWidth=15;
        ctx.lineJoin='round';
        ctx.lineCap='round';
 
        ctx.stroke();
    };
 
    // make the arrow face the mouse position
    bg.mouseMove= function(e) {
        var angle= Math.atan2(
                e.y - arrow.height / 2,
                e.x - arrow.width / 2 );
        arrow.setRotation(angle);
    }
}
 
function __init()   {
 
    var director = new CAAT.Director().
            initialize(500,500, document.getElementById('_c1'));
 
    __scene(director);
 
    CAAT.loop(30);
}
 
__init();