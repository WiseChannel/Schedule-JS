// динамическое масло


var backgroundWidth = 0;
var backgroundHeight = 0;

var screenLeftPosition = 0;
var screenTopPosition = 0;

var isMobile = false;

function AddChangingColor (_div, _stable, _active) {
	
	_div.style.transition = "background-color 1s ease";
	_div.style.backgroundColor = _stable;
	
	_div.onmousedown = () => {
		
		_div.style.backgroundColor = _active;
	};
	
	//_div.onmouseout = () => {
	//	
	//	_div.style.backgroundColor = _stable;
	//};
	
	_div.onmouseup = () => {
		
		_div.style.backgroundColor = _stable;
	};
}

function СreateDiv(_innerHTML, _left, _top, _width, _height, _onclick, _id, _parent) {

	
	_parent = typeof _parent !== 'undefined' ? _parent : "main";
	
	newDiv = document.createElement('div');
	newDiv.style.position = "absolute";
	newDiv.id = _id;
	newDiv.innerHTML = _innerHTML;
	newDiv.style.left = _left+"px";
	newDiv.style.top = _top+ "px";
	newDiv.style.width = _width+"px";
	newDiv.style.height = _height+ "px";
	newDiv.onclick = _onclick;
	
	document.getElementById(_parent).appendChild(newDiv);
	
	return newDiv;
}
	
	
function СreateDivImg(_src, _left, _top, _width, _height, _onclick, _id,__id, _parent) {
	
	return СreateDiv("<img  src='"+_src+"' width=100% height=100% id = '"+__id+"' >", _left, _top, _width, _height, _onclick, _id, _parent);
}

function СreateDivInput(_text, __id, _left, _top, _width, _height, _size, _id, _onChange,  _parent) {
	
	return СreateDiv('<a>'+_text+'</a><input id="'+__id+'" type="text" size="'+_size+'" onchange="' + _onChange + '">', _left, _top, _width, _height, () => {}, _id, _parent);
}

function СreateDivTextArea(_text, __id, _left, _top, _width, _height, _id, _parent) {
	
	return СreateDiv('<textarea id="'+__id+'" type="text" style="width:100%; height:100%;">'+_text+'</textarea>', _left, _top, _width, _height, () => {}, _id, _parent);
}

function СreateDivSelect(_desc, _text, __id, _left, _top, _width, _height, _listWidth, _id, _onChange, _parent) {
	
	var toAddStr = "";
	for (var p in _text) {
		toAddStr+="<option>"+_text[p]+"</option>";
	}
	return СreateDiv((_desc == "" ? "" : '<a>' + _desc + '</a>') + 
		'<select id="'+__id+'" type="text" style="width:' + _listWidth + 'px" onchange="' + _onChange + '">'+toAddStr+"</select>"
		, _left, _top, _width, _height, () => {}, _id, _parent);
}

function СreateDivDatalist(_desc, _text, __id, _left, _top, _width, _height, _listWidth, _id, _parent) {

	var inner = (_desc == "" ? "" : '<a>' + _desc + '</a>') + '<input list="' + __id +"____list" + '" id ="' + __id + '" style="width:' + _listWidth + 'px">' 
		+ '<datalist id="' + __id +"____list" + '">';
  

	for (var p in _text) {
		
		inner += "<option>" + _text[p] + "</option>";
	}
	
	inner += "</datalist>";
	
	return СreateDiv(inner, _left, _top, _width, _height, () => {}, _id, _parent);
}

function СreateDivCalendar(_desc, __id, _left, _top, _width, _height, _calendarWidth, _id, _onChange, _parent) {
	
	
	return СreateDiv((_desc == "" ? "" : '<a>' + _desc + '</a>') + 
		'<input id="'+__id+'" type="date" style="width:' + _calendarWidth + 'px" onchange="' + _onChange + '">'
		, _left, _top, _width, _height, () => {}, _id, _parent);
}

function SetValue (_id, _value) {
	
	document.getElementById (_id).value = _value;
}

function GetValue (_id) {
	
	return document.getElementById (_id).value;
}

function SetBackgroundSize (width, height) {
	
	if (width != 0) {
		
		backgroundWidth = width;
		document.getElementById("main").style.width = width + "px";
	}
	
	if (height != 0) {
		
		backgroundHeight= height;
		document.getElementById("main").style.height = height + "px";
	}
}

function DateToString (date) {
	
	return date.getFullYear() + "-" + ((date.getMonth () + 1) < 10 ? "0" : "") + (date.getMonth () + 1) + "-" 
		+ (date.getDate () < 10 ? "0" : "") + date.getDate ();
}

function AddDaysToDate (date, days) {
	
	var result = new Date (date);
	result.setDate (result.getDate () + days);
	
	return result;
}

function GetStartOfTheWeek (date) { // Monday
	
	if (date.getDay () == 0 || date.getDay () == 6) {
		
		date.setDate (date.getDate () + 7);
	}
	
	while (date.getDay () != 1) {
		
		date.setDate (date.getDate () - 1);
	}
	
	return date;
}

function GetEndOfTheWeek (date) { // Sunday
	
	while (date.getDay () != 0) {
		
		date.setDate (date.getDate () + 1);
	}
	
	return date;
}

function DateDistanceInDays (date1, date2) {
	
  var oneDayMs = 1000 * 60 * 60 * 24;

  var date1Ms = date1.getTime ();
  var date2Ms = date2.getTime ();

  var differenceMs = date2Ms - date1Ms;
    
  return Math.round (differenceMs / oneDayMs); 
}

function RemoveElement (target, toRemove) {
	
	var res = [];
	
	for (var i = 0; i < target.length; i++) {
		
		if (target [i] != toRemove) {
			
			res.push (target [i]);
		}
	}
	
	return res;
} 

function CheckMobile () {
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		
		isMobile = true;
	} else {
		
		isMobile = false;
	}
	
}

function IsNull (target) {
	
	return typeof target === 'undefined';
}

function OpenLink (url) {
	
	var win = window.open (url, "_self");
	win.focus ();
}

function OpenInNewTab (url) {
	
	var win = window.open (url, '_blank');
	win.focus ();
}

function NoConnection(func,params) {

	CreateMessageBox ("Сервер не відповідає", [["Гаразд C:", () => {}]]);
	ConsoleLog(["No connection",func,params]);
}

CheckMobile ();
