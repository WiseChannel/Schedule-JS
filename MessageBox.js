

var messageBoxWidth = 600;
var messageBoxHeight = 200;

var objectsMessageBox = [];

function CreateMessageBox (text, buttons) {
	
	DestroyMessageBox ();
	
	if (IsNull (buttons)) {
		
		buttons = [];
	}
	
	var left = window.innerWidth / 2 - messageBoxWidth / 2;
	var top = window.innerHeight / 2 - messageBoxHeight / 2;
	
	var backgroundDiv = СreateDiv((buttons.length == 0 ? "<br><br>" : "<br>") + text, left, top, messageBoxWidth, messageBoxHeight, ()=>{}, "TextElement");
	backgroundDiv.style.border = "1px solid";
	backgroundDiv.style.backgroundColor = "#FFFFFF";
	backgroundDiv.style.position = "fixed";
	backgroundDiv.style.opacity = 1;
	backgroundDiv.style.zIndex = 1001;
	backgroundDiv.style.fontSize = 30 * (isMobile ? mobileScale : 1) + "px";

	
	objectsMessageBox.push (backgroundDiv);
	
	if (buttons.length > 0) {

		var okDiv = СreateDiv(buttons [0] [0], left + (buttons.length > 1 ? 20 : messageBoxWidth / 2 - 100), top + messageBoxHeight - 20 - 40, 200, 40
			, ()=>{
				
				buttons [0] [1] ();
				DestroyMessageBox ();
			}
			, "TextElement"
		);
		AddChangingColor (okDiv, "#FFFFFF", "#00FF00");
		okDiv.style.fontSize = 30 * (isMobile ? mobileScale : 1) + "px";
		okDiv.style.border = "1px solid";
		okDiv.style.position = "fixed";
		okDiv.style.zIndex = 1002;
		okDiv.style.boxShadow = "grey 2px 2px";
		
		objectsMessageBox.push (okDiv);
	}
	
	if (buttons.length > 1) {

		var elseDiv = СreateDiv(buttons [1] [0], left + messageBoxWidth - 200 - 20, top + messageBoxHeight - 20 - 40, 200, 40
			, ()=>{
				
				buttons [1] [1] ();
				DestroyMessageBox ();
			}
			, "TextElement"
		);
		AddChangingColor (elseDiv, "#FFFFFF", "#FF0000");
		elseDiv.style.fontSize = 30 * (isMobile ? mobileScale : 1) + "px";
		elseDiv.style.border = "1px solid";
		elseDiv.style.position = "fixed";
		elseDiv.style.zIndex = 1002;
		elseDiv.style.boxShadow = "grey 2px 2px";
		
		objectsMessageBox.push (elseDiv);
	}
	
	return (newText) => {
	
		backgroundDiv.innerHTML = (buttons.length == 0 ? "<br><br>" : "<br>") + newText;
	};
}

function CreateMessageBoxControllable (text, buttons, isButtonsActive) {
	
	DestroyMessageBox ();
	
	if (IsNull (buttons)) {
		
		buttons = [];
	}
	
	var left = window.innerWidth / 2 - messageBoxWidth / 2;
	var top = window.innerHeight / 2 - messageBoxHeight / 2;
	
	var backgroundDiv = СreateDiv((buttons.length == 0 ? "<br><br>" : "<br>") + text, left, top, messageBoxWidth, messageBoxHeight, ()=>{}, "TextElement");
	backgroundDiv.style.border = "1px solid";
	backgroundDiv.style.backgroundColor = "#FFFFFF";
	backgroundDiv.style.position = "fixed";
	backgroundDiv.style.opacity = 1;
	backgroundDiv.style.zIndex = 1001;
	backgroundDiv.style.fontSize = 30 * (isMobile ? mobileScale : 1) + "px";

	
	objectsMessageBox.push (backgroundDiv);
	
	var okDiv;
	var elseDiv;
	
	if (buttons.length > 0) {

		okDiv = СreateDiv(buttons [0] [0], left + (buttons.length > 1 ? 20 : messageBoxWidth / 2 - 100), top + messageBoxHeight - 20 - 40, 200, 40
			, ()=>{
				
				buttons [0] [1] ();
				DestroyMessageBox ();
			}
			, "TextElement"
		);
		AddChangingColor (okDiv, "#FFFFFF", "#00FF00");
		okDiv.style.fontSize = 30 * (isMobile ? mobileScale : 1) + "px";
		okDiv.style.border = "1px solid";
		okDiv.style.position = "fixed";
		okDiv.style.zIndex = 1002;
		okDiv.style.boxShadow = "grey 2px 2px";
		okDiv.style.visibility= isButtonsActive ? 'visible' : 'hidden';
		
		objectsMessageBox.push (okDiv);
	}
	
	if (buttons.length > 1) {

		elseDiv = СreateDiv(buttons [1] [0], left + messageBoxWidth - 200 - 20, top + messageBoxHeight - 20 - 40, 200, 40
			, ()=>{
				
				buttons [1] [1] ();
				DestroyMessageBox ();
			}
			, "TextElement"
		);
		AddChangingColor (elseDiv, "#FFFFFF", "#FF0000");
		elseDiv.style.fontSize = 30 * (isMobile ? mobileScale : 1) + "px";
		elseDiv.style.border = "1px solid";
		elseDiv.style.position = "fixed";
		elseDiv.style.zIndex = 1002;
		elseDiv.style.boxShadow = "grey 2px 2px";
		elseDiv.style.visibility= isButtonsActive ? 'visible' : 'hidden';
		
		objectsMessageBox.push (elseDiv);
	}
	
	var res = {};
	res.changeText = function (newText) {
	
		backgroundDiv.innerHTML = (buttons.length == 0 ? "<br><br>" : "<br>") + newText;
	};
	
	res.setButtonsVisibility = function (isVisible) {
	
		if (buttons.length > 0) {
		
			okDiv.style.visibility = isVisible ? 'visible' : 'hidden';
		}
		
		if (buttons.length > 1) {
		
			elseDiv.style.visibility = isVisible ? 'visible' : 'hidden';
		}
	};
	
	return res;	
}


function DestroyMessageBox () {
	
	for (var i = 0; i < objectsMessageBox.length; i++) {
		
		DeleteObject (objectsMessageBox [i]);
	}
	
	objectsMessageBox = [];
}





























