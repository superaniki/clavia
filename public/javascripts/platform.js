
CL.width = 900;
CL.height = 500;
CL.Platform = navigator.userAgent;

//$("canvas").attr("width",$(window).width() );
//$("canvas").attr("height",$(window).height() );

if((CL.Platform.match(/iPhone/i)) || (CL.Platform.match(/iPod/i))) {
    //if (document.cookie.indexOf("iphone_redirect=false") == -1) {
    	$("header").remove();
    	CL.width = $(window).width();
		CL.height = $(window).height();
		//window.scrollTo(0,1);

        //window.location = "http://m.espn.go.com/wireless/?iphone&i=COMR";
    //}
}

if(CL.Platform.match(/Windows Phone/i)){
	$("header").remove();
	CL.width = $(window).width();
	CL.height = $(window).height();
}

if(CL.Platform.match(/Android/i)){
	$("header").remove();
    window.scrollTo(0,1);
 }




