// до загрузки


function DeleteObject (_this) {
	
	if (_this) {
		
		if (_this.parentNode) {
	
			_this.parentNode.removeChild (_this);
			return true;
		}

	}
	
	return false;
}

function DeleteObjectByiId (_this) {
	return DeleteObject (document.getElementById (_this));
}

var consoleText ="";
var consoleLogId = 0;
var isCtrl = false;
var onCtrlUp = () => {};
var onCtrlDown = () => {};

function GetConsoleText(delta,obj,depth) {
	if (depth >= 17) return "☺</br>";
	if (typeof obj !== 'object') {
		
		switch (typeof obj ) {
			case "undefined":return "<font color='#C2C2A3'>"+obj+"</font>"+",</br>";
			case "boolean":return "<font color='#FFFF66'>"+obj+"</font>"+",</br>";
			case "number":return "<font color='#FF0000'>"+obj+"</font>"+",</br>";
			case "string":return "<font color='#3333FF'>'"+obj+"'</font>"+",</br>";
			case "function":return "<font color='#FF0066'>Function "+obj.name+"()</font>"+",</br>";
		
		}
		
		
	} else {
		var res = "";
		if( Object.prototype.toString.call( obj ) === '[object Array]' ) {
			res +="[<br/>";
		} else 
			res +="{<br/>";
		
		for (var prop in obj) {
			if (prop != "parentNode") 
				res += delta+"'"+prop+"':"+ GetConsoleText(delta+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",obj[prop],depth+1);
		}
			
		if( Object.prototype.toString.call( obj ) === '[object Array]' ) {
			res +=delta+"]"+(delta==""?"":"</br>");
		} else 
			res +=delta+"}"+(delta==""?"":"</br>");
			return res;
	}


}

function GetCallers(func) {
	if (func)
		return (func.name==""?"anonymous":func.name) +"()&nbsp<-&nbsp"+GetCallers(func.caller);
	return "";
}

function ConsoleLog(obj) {

	console.log(obj);
	
	consoleText += "<font color='#AA1162'>$"+consoleLogId+".</font>&nbsp"+GetConsoleText("",obj,0) + "&nbsp&nbsp<font color='#FF0066'>"+GetCallers(ConsoleLog.caller)+"()</font>,<br/><br/>";
	
	consoleLogId++;
}
function ConsoleLogError(msg,url,line) {

	ConsoleLog(["Error",msg,url,line]);
	
	
}

document.onkeyup=function(e){
	if(e.which == 17) {
		
		isCtrl=false;
		onCtrlUp ();
	}
}
document.onkeydown=function(e) {
	if(e.which == 17) {
		
		isCtrl=true;
		onCtrlDown ();
	}
}


window.onerror = ConsoleLogError;
