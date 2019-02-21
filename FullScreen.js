// полный экран

var scaleDelta = 1;
var fullscreen = 0;

var backgroundWidth=800;
var backgroundHeight=700;


var blackAndWhiteDiv;
var blackAndWhiteScale = 1;

var toScale = new Array();

function AddScale(num) {
	
	toScale.push(num);
	return toScale.length()-1;
}

function RemoveScale(index) {
	
	toScale.splice(index,1);
	
}

function Scale() {
	scaleDelta = (screen.width-20)/800 < (screen.height-20)/700?(screen.width-20)/800 : (screen.height-20)/700;
	blackAndWhiteScale = scaleDelta;
	
	if (flashVars["viewer_id"] === "37286200") scaleDelta = 1/4;
}


function ScaleForThis(parent) {
	
    var children = document.getElementById(parent).childNodes;
    for (var i=0;i<children.length; i++) if (children[i].style) {
	
        children[i].style.width=parseFloat(children[i].style.width.replace("px",""))*scaleDelta + "px";
        children[i].style.height=parseFloat(children[i].style.height.replace("px",""))*scaleDelta + "px";;
        children[i].style.left=parseFloat(children[i].style.left.replace("px",""))*scaleDelta + "px";
        children[i].style.top=parseFloat(children[i].style.top.replace("px",""))*scaleDelta + "px";
		if (children[i].style.fontSize) 
			children[i].style.fontSize = parseFloat(children[i].style.fontSize.replace("px",""))*scaleDelta + "px";
		if (children[i].style.backgroundPosition)
			children[i].style.backgroundPosition=parseFloat(children[i].style.backgroundPosition.replace("px 0px",""))*scaleDelta + "px 0px";
    }


}

function ScaleFor() {
	
	ScaleTable();
	ResizeBackground();
	
    ScaleForThis("main");
    ScaleForThis("backTop");
    ScaleForThis("backBottom");
	
	if (blackAndWhiteDiv) {
		
		blackAndWhiteDiv.style.backgroundSize = 2000*blackAndWhiteScale + "px "+2000*blackAndWhiteScale+"px";
			
	}
	
	
	for (var i = 0; i < toScale.length; i++) {
		toScale[i] *=scaleDelta;
	}


}

function ScaleMenu() {
	
	if (fullscreen) 
		ScaleFor();
	
}

function OnFullscreenChange(e) {
	blackAndWhiteScale = 1;
	fullscreen = !fullscreen;
	if (fullscreen)
		Scale();
	else
		scaleDelta = 1/scaleDelta;
	backgroundWidth*=scaleDelta;
	backgroundHeight*=scaleDelta;
	ScaleFor();
	if (!fullscreen)
		scaleDelta = 1;
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function MakeFullScreen(divObj) {
	
		if (!fullscreen) {
		    if (divObj.requestFullscreen) {
		        divObj.requestFullscreen();
		    }
		    if (divObj.oRequestFullscreen) {
		        divObj.oRequestFullscreen();
		    }
		    if (divObj.mozRequestFullScreen) {
		        divObj.mozRequestFullScreen();
		    }
		    if (divObj.webkitRequestFullscreen) {
		        divObj.webkitRequestFullscreen();
		    }
		} else {
			if(document.cancelFullScreen) {
			document.cancelFullScreen();
			} else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
			} else if(document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
			}


		}		
}


function ResizeBackground () {

	document.getElementById("main").backgroundSize = backgroundWidth + " " + backgroundHeight;
	document.getElementById("main").height=backgroundHeight;
	document.getElementById("backTop").backgroundSize = backgroundWidth + " " + 50*backgroundWidth/1200;
	document.getElementById("backTop").width = backgroundWidth;
	document.getElementById("backTop").height = 50*backgroundWidth/1200;
	document.getElementById("backBottom").backgroundSize = backgroundWidth + " " + 200*backgroundWidth/1200;
	document.getElementById("backBottom").width = backgroundWidth;
	document.getElementById("backBottom").height = 200*backgroundWidth/1200;

}

function ScaleTable() {

	document.getElementById("table").width=backgroundWidth;
	document.getElementById("main").height=backgroundHeight;
	
}

document.addEventListener("fullscreenchange",OnFullscreenChange);
document.addEventListener("mozfullscreenchange", OnFullscreenChange);
document.addEventListener("webkitfullscreenchange", OnFullscreenChange);
document.addEventListener("msfullscreenchange",OnFullscreenChange);