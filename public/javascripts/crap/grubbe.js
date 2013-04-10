
/* Script made by Lasse Grubbe: lassegrubbe@gmail.com

 * You may not use this script without permission of the owner. Any illegal copy of this script will cause a police report!

 * Dette script er lavet af Lasse Grubbe: lassegrubbe@gmail.com

 * Du må ikke kopiere dette script uden min tilladelse. Ulovlig kopiering af dette script vil blive politianmeldt. 

 */

var myvari = ""
var myvarb = ""
var ips = 0
var incr2= 0



if (document.images) {
  var blank = new Image()
  blank.src = "vpcblank.gif"


  var select = new Image()
  select.src = "vpcselect.gif"
  var select1 = new Image()
  select1.src = "vpcselect1.gif"

  var select2 = new Image()
  select2.src = "vpcselect2.gif"

  var scalfil = new Image()
  scalfil.src = "vpcscalfil.gif"

  var scalfil1 = new Image()
  scalfil1.src = "vpcscalfil1.gif"

  var scalfil1a = new Image()
  scalfil1a.src = "vpcscalfil1a.gif"

  var scalfil1b = new Image()
  scalfil1b.src = "vpcscalfil1b.gif"
	
  var scalfil2 = new Image()
  scalfil2.src = "vpcscalfil2.gif"

  var black = new Image()
  black.src = "vpcblack.gif"
}


function go() {
ips = 0

	if (document.keyform.cordscal[0].checked == 1) {
		x = document.keyform.formula.options.selectedIndex;
		chordcode = document.keyform.formula.options[x].value;

	dispch(chordcode);
        myvari = chordcode
        myvarb = chordcode
	}

	else if (document.keyform.cordscal[1].checked == 1) {
		scalecalc();
	}
}



function dispch(formulatext) {

z = document.keyform.root.options.selectedIndex;
root = document.keyform.root.options[z].value;

if (formulatext.charAt(0) != "1") {
	if (formulatext.charAt(0) != "1") {

		if (document.keyform.cordscal[1].checked == 2) {
				if (userinput.charAt(0) != "1") {
				a = Number.NaN
				}
		}
		else {
		a = parseFloat(root)
		}
	}
	else {
	a = Number.NaN
	}
}

formstring = ""
inact();

a = parseFloat(root)
playnote(a);

if (document.keyform.cordscal[1].checked == 2) {
	if (document.keyform.cordscal[1].checked == 2) {
		a = parseFloat(root)
	}
	else {
			a = 1
	}
}

else {

	a = parseFloat(root)

}

b = 0
d = formulatext.length / 2

for (var i = 0; i < d; i++) {
b = formulatext.indexOf(",")
myvar = parseFloat(formulatext.substring(0, b)) + a - 1
playnote(myvar);
formulatext = formulatext.substring(b + 1 , formulatext.length)
}
dispstring = formstring.substring(0, (formstring.length - 1));
document.keyform.formdisp.value = dispstring;
}

function playnote(note) {
  if (document.images){
	  if (note == 1){
	  playkey(1)
	  formstring = formstring + 'C , '
	  }
	  if (note == 2){
	  playsharp(1)
	  formstring = formstring + 'C#/Db , '
	  }
	  if (note == 3){
	  formstring = formstring + 'D , '
	  playkey(2)
	  }
	  if (note == 4){
	  formstring = formstring + 'D#/Eb , '
	  playsharp(2)
	  }
	  if (note == 5){
	  formstring = formstring + 'E , '
	  playkey(3)
	  }
	  if (note == 6){
	  formstring = formstring + 'F , '
	  playkey(4)
	  }
	  if (note == 7){
	  formstring = formstring + 'F#/Gb , '
	  playsharp(3)
	  }
	  if (note == 8){
	  formstring = formstring + 'G , '
	  playkey(5)
	  }
	  if (note == 9){
	  formstring = formstring + 'G#/Ab , '
	  playsharp(4)
	  }
	  if (note == 10){
	  formstring = formstring + 'A , '
	  playkey(6)
	  }
	  if (note == 11){
	  formstring = formstring + 'A#/Bb , '
	  playsharp(5)
	  }
	  if (note == 12){
	  formstring = formstring + 'B , '
	  playkey(7)
	  }
	  if (note == 13){
	  formstring = formstring + 'C , '
	  playkey(8)
	  }
	  if (note == 14){
	  formstring = formstring + 'C#/Db , '
	  playsharp(6)
	  }
	  if (note == 15){
	  formstring = formstring + 'D ,'
	  playkey(9)
	  }
	  if (note == 16){
	  formstring = formstring + 'D#/Eb ,'
	  playsharp(7)
	  }
	  if (note == 17){
	  formstring = formstring + 'E ,'
	  playkey(10)
	  }
	  if (note == 18){
	  formstring = formstring + 'F ,'
	  playkey(11)
	  }
	  if (note == 19){
	  formstring = formstring + 'F#/Gb ,'
	  playsharp(8)
	  }
	  if (note == 20){
	  formstring = formstring + 'G ,'
	  playkey(12)
	  }
	  if (note == 21){
	  formstring = formstring + 'G#/Ab ,'
	  playsharp(9)
	  }
	  if (note == 22){
	  formstring = formstring + 'A ,'
	  playkey(13)
	  }
	  if (note == 23){
	  formstring = formstring + 'A#/Bb ,'
	  playsharp(10)
	  }
	  if (note == 24){
	  formstring = formstring + 'B ,'
	  playkey(14)
	  }
	  if (note == 25){
	  formstring = formstring + 'C ,'
	  playkey(15)
	  }
	  if (note == 26){
	  formstring = formstring + 'C#/Db ,'
	  playsharp(11)
	  }
	  if (note == 27){
	  formstring = formstring + 'D ,'
	  playkey(16)
	  }
	  if (note == 28){
	  formstring = formstring + 'D#/Eb ,'
	  playsharp(12)
	  }
	  if (note == 29){
	  formstring = formstring + 'E ,'
	  playkey(17)
	  }
	  if (note == 30){
	  formstring = formstring + 'F ,'
	  playkey(18)
	  }
	  if (note == 31){
	  formstring = formstring + 'F#/Gb ,'
	  playsharp(13)
	  }
	  if (note == 32){
	  formstring = formstring + 'G ,'
	  playkey(19)
	  }
	  if (note == 33){
	  formstring = formstring + 'G#/Ab ,'
	  playsharp(14)
	  }
	  if (note == 34){
	  formstring = formstring + 'A ,'
	  playkey(20)
	  }
	  if (note == 35){
	  formstring = formstring + 'A#/Bb ,'
	  playsharp(15)
	  }
	  if (note == 36){
	  formstring = formstring + 'B ,'	
	  playkey(21)
	  }
	

   }


}

function playkey(note){

	if (document.keyform.cordscal[1].checked == 1) {

	  document.images['t' + note +''].src = eval('scalfil2.src')

	  document.images['m' + note +''].src = eval('scalfil2.src')

	  document.images['b' + note +''].src = eval('scalfil.src')

	}

        else {

	      document.images['t' + note +''].src = eval('select2.src')

	      document.images['m' + note +''].src = eval('select2.src')

	      document.images['b' + note +''].src = eval('select.src')    

        }

}



function playsharp(note){

	if (document.keyform.cordscal[1].checked == 1) {

	  document.images['s' + note +'b1'].src = eval('scalfil1.src')

	  document.images['s' + note +'b2'].src = eval('scalfil1a.src')

	  document.images['s' + note +'b3'].src = eval('scalfil1b.src')

	}


             else {

	      document.images['s' + note +'b1'].src = eval('scalfil1.src')

	      document.images['s' + note +'b2'].src = eval('scalfil1a.src')

              document.images['s' + note +'b3'].src = eval('scalfil1b.src')

             }



}


function inact() {

  if (document.images){

	for (var i = 1; i < 22; i++) {

		if (document.images['t' + i +''].src != blank.src) {

	  document.images['t' + i +''].src = eval('blank.src')

	  document.images['m' + i +''].src = eval('blank.src')

	  document.images['b' + i +''].src = eval('blank.src')

		}

	}

	for (var i = 1; i < 16; i++) {

		if (document.images['s' + i +'b1'].src != black.src) {

	  document.images['s' + i +'b1'].src = eval('black.src')

	  document.images['s' + i +'b2'].src = eval('black.src')

	  document.images['s' + i +'b3'].src = eval('black.src')

		}

	}



   }

}



function ConvertInput() {


formulastring = ""

}

function scalecalc(){

scaletext = "";
scaletext1 = "";
scaletext2 = "";
scaletext3 = "";

u = 1
t = 0
i = 0

if (document.keyform.cordscal[1].checked == 1) {
x = document.keyform.scale.options.selectedIndex;
scalevalue = document.keyform.scale.options[x].value.toUpperCase()
}

for (var y = 0; y < scalevalue.length; y++) {
	if (scalevalue.charAt(y) == "1") {
	t = 1 + u
	scaletext = scaletext +  t + ",";
       	scaletext1 = scaletext1 +  (t - 12) + ",";
       	scaletext2 = scaletext2 +  (t + 12) + ",";
       	scaletext3 = scaletext3 +  (t - 24) + ",";
	}
	else if (scalevalue.charAt(y) == "2") {
	t = 2 + u
	scaletext = scaletext +  t + ",";
       	scaletext1 = scaletext1 +  (t - 12) + ",";
       	scaletext2 = scaletext2 +  (t + 12) + ",";
       	scaletext3 = scaletext3 +  (t - 24) + ",";
	}
	else if (scalevalue.charAt(y) == "3") {
	t = 3 + u
	scaletext = scaletext +  t + ",";
       	scaletext1 = scaletext1 +  (t - 12) + ",";
       	scaletext2 = scaletext2 +  (t + 12) + ",";
       	scaletext3 = scaletext3 +  (t - 24) + ",";
	}
	else if (scalevalue.charAt(y) == "4") {
	t = 4 + u
	scaletext = scaletext +  t + ",";
       	scaletext1 = scaletext1 +  (t - 12) + ",";
       	scaletext2 = scaletext2 +  (t + 12) + ",";
       	scaletext3 = scaletext3 +  (t - 24) + ",";
	}
	else if (scalevalue.charAt(y) == "5") {
	t = 5 + u
	scaletext = scaletext +  t + ",";
       	scaletext1 = scaletext1 +  (t - 12) + ",";
       	scaletext2 = scaletext2 +  (t + 12) + ",";
       	scaletext3 = scaletext3 +  (t - 24) + ",";
	}
	else if (scalevalue.charAt(y) == "6") {
	t = 6 + u
	scaletext = scaletext +  t + ",";
       	scaletext1 = scaletext1 +  (t - 12) + ",";
       	scaletext2 = scaletext2 +  (t + 12) + ",";
       	scaletext3 = scaletext3 +  (t - 24) + ",";
	}
	else if (scalevalue.charAt(y) == "7") {
	t = 7 + u
	scaletext = scaletext +  t + ",";
       	scaletext1 = scaletext1 +  (t - 12) + ",";
       	scaletext2 = scaletext2 +  (t + 12) + ",";
       	scaletext3 = scaletext3 +  (t - 24) + ",";
	}
	else if (scalevalue.charAt(y) == "8") {
	t = 8 + u
	scaletext = scaletext +  t + ",";
       	scaletext1 = scaletext1 +  (t - 12) + ",";
       	scaletext2 = scaletext2 +  (t + 12) + ",";
       	scaletext3 = scaletext3 +  (t - 24) + ",";
	}
	else if (scalevalue.charAt(y) == "9") {
	t = 9 + u
	scaletext = scaletext +  t + ",";
       	scaletext1 = scaletext1 +  (t - 12) + ",";
       	scaletext2 = scaletext2 +  (t + 12) + ",";
       	scaletext3 = scaletext3 +  (t - 24) + ",";
	}
u = t
}

if (scalevalue.charAt(y) == "1") {
totalscale =  scaletext
}
else {
totalscale = scaletext
}
dispch(totalscale);
}

function inverter() {
ndums = (ips*2) + incr2
      if (ndums >= myvarb.length) {
      ndums = 0
      ips = -1
      myvari = myvarb
      incr2= 0
      }
      else {
           if (myvarb.charAt(ndums +1) != ","){
              chartf = myvarb.substring(ndums, (myvarb.indexOf(",")+ ndums +1))
              incr = 2
              incr2= 1
           }
           else {
              chartf = myvarb.substring(ndums, (myvarb.indexOf(",")+ ndums))
              incr = 1
              incr2= 0
           }
           tochange = parseFloat(chartf) 
           myvari = myvarb.substring(0, ndums) + (tochange - 12) + myvarb.substring((ndums + incr), myvarb.length)
      }
dispch(myvari);
ips ++
}
// -->