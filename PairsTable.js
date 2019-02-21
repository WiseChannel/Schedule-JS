
var mobileScale = 0.7;

function CreateTableCellFull (id, left, top, values, borders, width, height, scaleIndex, isMargin, parentId) {
	
	isMargin = typeof isMargin !== 'undefined' ? isMargin : 1;
	
	var mainDiv = СreateDiv("", left, top, width, height, ()=>{}, id, parentId);
	mainDiv.style.borderLeft = borders [0] == 1 ?"1px solid" : "";
	mainDiv.style.borderRight = borders [1] == 1 ?"1px solid" : "";
	mainDiv.style.borderTop = borders [2] == 1 ?"1px solid" : "";
	mainDiv.style.borderBottom = borders [3] == 1 ?"1px solid" : "";
	
	var fullDiv = СreateDiv(values [0], 0, 0, width, height, ()=>{}, "TextElement", id);
	fullDiv.style.fontSize = 19 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	fullDiv.style.marginTop = 15 * scaleIndex * (isMobile ? mobileScale : 1) * isMargin + "px";
	
	mainDiv.style.overflow = "hidden";
	return mainDiv;
}

function CreateTableTopBottom (id, left, top, values, borders, width, height, scaleIndex, parentId) {
	
	var mainDiv = СreateDiv("", left, top, width, height, ()=>{}, id, parentId);
	mainDiv.style.borderLeft = borders [0] == 1 ?"1px solid" : "";
	mainDiv.style.borderRight = borders [1] == 1 ?"1px solid" : "";
	mainDiv.style.borderTop = borders [2] == 1 ?"1px solid" : "";
	mainDiv.style.borderBottom = borders [3] == 1 ?"1px solid" : "";
	
	var topDiv = СreateDiv(values [0], 0, 0, width, height / 2, ()=>{}, "TextElement", id);
	var botDiv = СreateDiv(values [1], 0, height / 2, width, height / 2, ()=>{}, "TextElement", id);
	
	topDiv.style.fontSize = 15 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	botDiv.style.fontSize = 15 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	
	topDiv.style.borderBottom = "1px dashed";
	
	mainDiv.style.overflow = "hidden";
	return mainDiv;
}


function CreateTableTopBottom2 (id, left, top, values, borders, width, height, scaleIndex, parentId) {
	
	
	var mainDiv = СreateDiv("", left, top, width, height, ()=>{}, id, parentId);
	mainDiv.style.borderLeft = borders [0] == 1 ?"1px solid" : "";
	mainDiv.style.borderRight = borders [1] == 1 ?"1px solid" : "";
	mainDiv.style.borderTop = borders [2] == 1 ?"1px solid" : "";
	mainDiv.style.borderBottom = borders [3] == 1 ?"1px solid" : "";
	
	var topDiv = СreateDiv(values [0], 0, 0, width, height / 2, ()=>{}, "TextElement", id);
	var botLeftDiv = СreateDiv(values [1], 0, height / 2, width / 2, height / 2, ()=>{}, "TextElement", id);
	var botRightDiv = СreateDiv(values [2], width / 2, height / 2, width / 2, height / 2, ()=>{}, "TextElement", id);
	
	topDiv.style.fontSize = 15 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	botLeftDiv.style.fontSize = 11 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	botRightDiv.style.fontSize = 11 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	
	topDiv.style.borderBottom = "1px dashed";
	botLeftDiv.style.borderRight = "1px dashed";
	
	mainDiv.style.overflow = "hidden";
	return mainDiv;
}


function CreateTableTop2Bottom2 (id, left, top, values, borders, width, height, scaleIndex, parentId) {
	
	
	var mainDiv = СreateDiv("", left, top, width, height, ()=>{}, id, parentId);
	mainDiv.style.borderLeft = borders [0] == 1 ?"1px solid" : "";
	mainDiv.style.borderRight = borders [1] == 1 ?"1px solid" : "";
	mainDiv.style.borderTop = borders [2] == 1 ?"1px solid" : "";
	mainDiv.style.borderBottom = borders [3] == 1 ?"1px solid" : "";
	
	var topLeftDiv = СreateDiv(values [0], 0, 0, width / 2, height / 2, ()=>{}, "TextElement", id);
	var topRightDiv = СreateDiv(values [1], width / 2, 0, width / 2, height / 2, ()=>{}, "TextElement", id);
	var botLeftDiv = СreateDiv(values [2], 0, height / 2, width / 2, height / 2, ()=>{}, "TextElement", id);
	var botRightDiv = СreateDiv(values [3], width / 2, height / 2, width / 2, height / 2, ()=>{}, "TextElement", id);
	
	topLeftDiv.style.fontSize = 11 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	topRightDiv.style.fontSize = 11 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	botLeftDiv.style.fontSize = 11 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	botRightDiv.style.fontSize = 11 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	
	topLeftDiv.style.borderBottom = "1px dashed";
	topRightDiv.style.borderBottom = "1px dashed";
	botLeftDiv.style.borderRight = "1px dashed";
	topLeftDiv.style.borderRight = "1px dashed";
	
	//topLeftDiv.style.marginTop = 8 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	
	mainDiv.style.overflow = "hidden";
	return mainDiv;
}


function CreateTableTop2Bottom (id, left, top, values, borders, width, height, scaleIndex, parentId) {
	
	
	var mainDiv = СreateDiv("", left, top, width, height, ()=>{}, id, parentId);
	mainDiv.style.borderLeft = borders [0] == 1 ?"1px solid" : "";
	mainDiv.style.borderRight = borders [1] == 1 ?"1px solid" : "";
	mainDiv.style.borderTop = borders [2] == 1 ?"1px solid" : "";
	mainDiv.style.borderBottom = borders [3] == 1 ?"1px solid" : "";
	
	var topLeftDiv = СreateDiv(values [0], 0, 0, width / 2, height / 2, ()=>{}, "TextElement", id);
	var topRightDiv = СreateDiv(values [1], width / 2, 0, width / 2, height / 2, ()=>{}, "TextElement", id);
	var botDiv = СreateDiv(values [2], 0, height / 2, width, height / 2, ()=>{}, "TextElement", id);
	
	botDiv.style.fontSize = 15 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	topLeftDiv.style.fontSize = 11 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	topRightDiv.style.fontSize = 11 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	
	botDiv.style.borderTop = "1px dashed";
	topLeftDiv.style.borderRight = "1px dashed";
	
	mainDiv.style.overflow = "hidden";
	return mainDiv;
}


function CreateTableLeftRight (id, left, top, values, borders, width, height, scaleIndex, parentId) {
	
	
	var mainDiv = СreateDiv("", left, top, width, height, ()=>{}, id, parentId);
	mainDiv.style.borderLeft = borders [0] == 1 ?"1px solid" : "";
	mainDiv.style.borderRight = borders [1] == 1 ?"1px solid" : "";
	mainDiv.style.borderTop = borders [2] == 1 ?"1px solid" : "";
	mainDiv.style.borderBottom = borders [3] == 1 ?"1px solid" : "";
	
	var leftDiv = СreateDiv("<br>" + values [0], 0, 0, width / 2, height, ()=>{}, "TextElement", id);
	var rightDiv = СreateDiv("<br>" + values [1], width / 2, 0, width / 2, height, ()=>{}, "TextElement", id);
	leftDiv.style.fontSize = 15 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	leftDiv.style.borderRight = "1px dashed";
	rightDiv.style.fontSize = 15 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	
	mainDiv.style.overflow = "hidden";
	return mainDiv;
}

function CreateTableLeftRight2 (id, left, top, values, borders, width, height, scaleIndex, parentId) {
	
	
	var mainDiv = СreateDiv("", left, top, width, height, ()=>{}, id, parentId);
	mainDiv.style.borderLeft = borders [0] == 1 ?"1px solid" : "";
	mainDiv.style.borderRight = borders [1] == 1 ?"1px solid" : "";
	mainDiv.style.borderTop = borders [2] == 1 ?"1px solid" : "";
	mainDiv.style.borderBottom = borders [3] == 1 ?"1px solid" : "";
	
	var leftDiv = СreateDiv("<br>" + values [0], 0, 0, width / 2, height, ()=>{}, "TextElement", id);
	var rightTopDiv = СreateDiv(values [1], width / 2, 0, width / 2, height / 2, ()=>{}, "TextElement", id);
	var rightBotDiv = СreateDiv(values [2], width / 2, height / 2, width / 2, height / 2, ()=>{}, "TextElement", id);
	
	leftDiv.style.fontSize = 15 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	leftDiv.style.borderRight = "1px dashed";
	rightTopDiv.style.fontSize = 11 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	rightTopDiv.style.borderBottom = "1px dashed";
	rightBotDiv.style.fontSize = 11 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	
	mainDiv.style.overflow = "hidden";
	return mainDiv;
}

function CreateTableLeft2Right (id, left, top, values, borders, width, height, scaleIndex, parentId) {
	
	
	var mainDiv = СreateDiv("", left, top, width, height, ()=>{}, id, parentId);
	mainDiv.style.borderLeft = borders [0] == 1 ?"1px solid" : "";
	mainDiv.style.borderRight = borders [1] == 1 ?"1px solid" : "";
	mainDiv.style.borderTop = borders [2] == 1 ?"1px solid" : "";
	mainDiv.style.borderBottom = borders [3] == 1 ?"1px solid" : "";
	
	var rightDiv = СreateDiv("<br>" + values [2], width / 2, 0, width / 2, height, ()=>{}, "TextElement", id);
	var leftTopDiv = СreateDiv(values [0], 0, 0, width / 2, height / 2, ()=>{}, "TextElement", id);
	var leftBotDiv = СreateDiv(values [1], 0, height / 2, width / 2, height / 2, ()=>{}, "TextElement", id);
	
	rightDiv.style.fontSize = 15 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	rightDiv.style.borderLeft = "1px dashed";
	leftTopDiv.style.fontSize = 11 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	leftTopDiv.style.borderBottom = "1px dashed";
	leftBotDiv.style.fontSize = 11 * scaleIndex * (isMobile ? mobileScale : 1) + "px";
	
	mainDiv.style.overflow = "hidden";
	return mainDiv;
}

function CreateTableCell (id, left, top, type, values, borders, width, height, ignoreScale, parentId) { 
	
	// borders - array (4) == left, right, top, bottom; values = array (1..4) from leftTop to rightBottom
	
	width = typeof width !== 'undefined' ? width : 300;
	height = typeof height !== 'undefined' ? height : 100;
	
	var scaleWidth = width / 300.0;
	var scaleHeight = height / 100.0;
	
	var scaleIndex = ignoreScale ? 1 : Math.min (scaleWidth, scaleHeight);
	
	while (values.length < 4) {
		
		values.push ("");
	}
	
	switch (type) {
		
		case "Full": return CreateTableCellFull (id, left, top, values, borders, width, height, scaleIndex, 1, parentId);
		case "TopBottom": return CreateTableTopBottom (id, left, top, values, borders, width, height, scaleIndex, parentId);
		case "TopBottom2": return CreateTableTopBottom2 (id, left, top, values, borders, width, height, scaleIndex, parentId);
		case "Top2Bottom2": return CreateTableTop2Bottom2 (id, left, top, values, borders, width, height, scaleIndex, parentId);
		case "Top2Bottom": return CreateTableTop2Bottom (id, left, top, values, borders, width, height, scaleIndex, parentId);
		case "LeftRight": return CreateTableLeftRight (id, left, top, values, borders, width, height, scaleIndex, parentId);
		case "LeftRight2": return CreateTableLeftRight2 (id, left, top, values, borders, width, height, scaleIndex, parentId);
		case "Left2Right": return CreateTableLeft2Right (id, left, top, values, borders, width, height, scaleIndex, parentId);
	}
	
	ConsoleLog (["Unknown TableCell type", type]);
	return false;
}