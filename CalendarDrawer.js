// ящик для календаря


var printTopCentreText = "";
var semester = "";
var educationYear = "";
var	printTopRightText = "";
var	facultyGenetiveCase = "";

var calendarObjects = [];

var nullFilterValue = "Усі";

var groupFilter = nullFilterValue;
var lectorFilter = nullFilterValue;
var auditoriesFilter = nullFilterValue;
var daysFilter = nullFilterValue;

var currentDayColor = "rgba(255, 174, 174, 0.46)";

var oddDayColor = "";
var evenDayColor = "rgba(230, 230, 230, 0.46)";

var topsColor = "rgba(220, 255, 220, 0.458824)"; 
var linkedColor = "rgba(0, 184, 217, 0.458824)"; 
var linkedStaticColor = "rgba(217, 217, 0, 0.458824)"; 

var redrawCalendar = () => {};

var backgroundCalendarWidth = 0;
var backgroundCalendarHeight = 0;

var backgroundCalendarLeft = 0;
var backgroundCalendarTop = 0;

var auditoriesAtOneTime = [];

var facultyNameDiv;
var facultyName;

var constantLeftDivs = [];
var constantTopDivs = [];

function GetAdditionalCalendarData (target) {
	
	for (var i = 0; i < calendarAdditional.length; i++) {
		
		if (calendarAdditional [i] [0] == target) {
			
			return calendarAdditional [i];
		}
	}
	
	return false;
}

function SetAdditionalCalendarData (target) {
	
	for (var i = 0; i < calendarAdditional.length; i++) {
		
		if (calendarAdditional [i] [0] == target [0]) {
			
			calendarAdditional [i] = target;
			return;
		}
	}
	
	calendarAdditional.push (target);
}

function ConcatenateCellParams (target) { 

	//with filtering, without last (link) parameter
	
	if (target.length == 0) 
		return "";
	
	var res = target [0];
	
	if (!(lectorFilter == nullFilterValue || lectorFilter == target [1])) {
				
		return "";
	}
	
	if (!(auditoriesFilter == nullFilterValue || auditoriesFilter == target [2])) {
				
		return "";
	}
	
	for (var i = 1; i < target.length - 2; i++) {
		
		if (target [i] != "") {
				
			res += "<br>" + target [i];
		}
	}
	
	return res;
}

function CreateConcatenatedArray (target) {
	
	var res = [];
	for (var i = 0; i < target.length; i++) {
		
		res.push (ConcatenateCellParams (target [i]));
	}
	
	return res;
}

function SetBackgroundCalendarSize (width, height, isPrinting) {
	
	if (width != 0) {
		
		backgroundCalendarWidth = width;
		document.getElementById("calendarTable").style.width = width + "px";
		
		SetBackgroundSize (Math.max (backgroundWidth, width + backgroundCalendarLeft + 10 + (isPrinting ? 800 : 0)), 0);
	}
	
	if (height != 0) {
		
		backgroundCalendarHeight = height;
		document.getElementById("calendarTable").style.height = height + "px";
		
		SetBackgroundSize (0, height + backgroundCalendarTop + 10);
	}
}

function DrawCalendar (scale, deltaX, deltaY, minDayPairsCount, onClick, onAdditionalClick, isPrinting) {
	
	redrawCalendar = (_isPrinting) => {GetCalendarPrepared (currentStartOfWeek); DrawCalendar (scale, deltaX, deltaY, minDayPairsCount, onClick, onAdditionalClick, _isPrinting); 
		console.log (["calendarRaw", calendarRaw]);};
	
	constantLeftDivs = [];
	constantTopDivs = [];
	
	var currentDeltaX = deltaX;
	var currentDeltaY = deltaY;
	
	if (IsNull (isPrinting)) {
		
		isPrinting = false;
	}
	
	if (isPrinting) {
		
		currentDeltaY += 100;
	}
	
	RemoveCalendar ();
	
	auditoriesAtOneTime = [];
	
	backgroundCalendarWidth = 100;
	
	var dayNameDeltaY = currentDeltaY;
	
	var dayFiltered = -1;
	
	for (var i = 0; i < daysInWeek; i++) {
		
		if (!(daysFilter == nullFilterValue || daysFilter == GetDayName (i))) {
				
				continue;
		}
		
		dayFiltered ++;
		
		if (Math.max (maxPairsForDay [i], minDayPairsCount) <= 0 || (minDayPairsCount <= 1 && i >= daysInWeek - 2 && maxPairsForDay [i] <= 0)) {
			
			continue;
		}
		
		var dayDiv = CreateTableCellFull ("DayName" + i, currentDeltaX - (20/2) - 100 * (Math.max (maxPairsForDay [i], minDayPairsCount)/2)
			, dayNameDeltaY + 100 * (Math.max (maxPairsForDay [i], minDayPairsCount)/2) - (20/2), [GetDayName (i)], [1,1,1,0], 100 * Math.max (maxPairsForDay [i], minDayPairsCount) - 1
			, 20, true, 0, "calendarTable");
		dayDiv.style.transform = "rotate(-90deg)";
		
		/*if (currentDay == GetDayName (i) && !isPrinting) {
			
			dayDiv.style.backgroundColor = currentDayColor;
		} else {
			
			if (dayFiltered % 2) {
				
				dayDiv.style.backgroundColor = oddDayColor;
			} else {
				
				dayDiv.style.backgroundColor = evenDayColor;
			}
			
		}
		*/
		
		dayDiv.style.backgroundColor = topsColor;
		dayDiv.style.zIndex = "9";
		
		constantLeftDivs.push ([dayDiv, currentDeltaX - (20/2) - 100 * (Math.max (maxPairsForDay [i], minDayPairsCount)/2)]);
		
		calendarObjects.push (dayDiv);
		
		for (var q = 0; q < Math.max (maxPairsForDay [i], minDayPairsCount); q++) {
			
			calendarObjects.push (CreateTableCell ("PairTime" + i + "_" + q, currentDeltaX, dayNameDeltaY + q * 100, "TopBottom", [q + 1, GetPairTime (q)]
				, [1,0, (q == 0 && dayFiltered == 0 ? 1 : 0),1], 40, 100, true, "calendarTable"));
				
				/*if (currentDay == GetDayName (i)) {
			
					calendarObjects [calendarObjects.length - 1].style.backgroundColor = currentDayColor;
				} else {
			
					if (dayFiltered % 2) {
						
						calendarObjects [calendarObjects.length - 1].style.backgroundColor = oddDayColor;
					} else {
						
						calendarObjects [calendarObjects.length - 1].style.backgroundColor = evenDayColor;
					}
					
				}
				*/
				
				calendarObjects [calendarObjects.length - 1].style.backgroundColor = topsColor;
				calendarObjects [calendarObjects.length - 1].style.zIndex = "9";
				
				
				constantLeftDivs.push ([calendarObjects [calendarObjects.length - 1], currentDeltaX]);
			
		}
		
		dayNameDeltaY += 100 * (Math.max (maxPairsForDay [i], minDayPairsCount));
	}
		
	var iFiltered = -1;

	
	for (var i = 0; i < calendarPrepared.length; i++) {
		
		var deltaYForGroup = currentDeltaY;
		
			
		if (!(groupFilter == nullFilterValue || groupFilter == calendarPrepared [i] [0])) {
				
				continue;
		}
		
		iFiltered ++;	
		
		
		SetBackgroundCalendarSize (Math.max (Math.max (backgroundCalendarWidth, currentDeltaX + 340 + 300 * iFiltered), 1250 + 260 + 20 + 100), 0, isPrinting);
		
		calendarObjects.push (CreateTableCell ("GroupName" + i, currentDeltaX + 40 + 300 * iFiltered, currentDeltaY - 50, "Full", [calendarPrepared [i] [0]]
			, [(iFiltered == 0 ? 1 : 0), 1,1,0], 300, 50, true, "calendarTable"));
			
		calendarObjects [calendarObjects.length - 1].style.backgroundColor = topsColor;
		calendarObjects [calendarObjects.length - 1].style.zIndex = "9";

		constantTopDivs.push (calendarObjects [calendarObjects.length - 1]);
		
		var daysCalendar = calendarPrepared [i] [1];
		
		dayFiltered = -1;
		
		for (var q = 0; q < daysInWeek; q++) {
			
			if (!(daysFilter == nullFilterValue || daysFilter == GetDayName (q))) {
				
					continue;
			}
			
			dayFiltered ++;
			
			if (Math.max (maxPairsForDay [q], minDayPairsCount) <= 0 || (minDayPairsCount <= 1 && q >= daysInWeek - 2 && maxPairsForDay [q] <= 0)) {
				
				continue;
			}
			
			for (var j = 0; j < daysCalendar [q].length; j++) {
					
				var cellParameters = [currentDeltaX + 300 * iFiltered + 40, deltaYForGroup + j * 100
						, daysCalendar [q] [j] [0], daysCalendar [q] [j] [1]
						, [(iFiltered == 0 ? 1 : 0), 1, (dayFiltered == 0 && j == 0 ? 1 : 0), 1]
						, calendarPrepared [i] [0], j, AddDaysToDate (currentStartOfWeek, q)]; 
						//x, y, type, values, borders, groupName, pairNumber, pairDay
						
				cellParametersById ["TableCell" + i + "_" + q + "_" + j] = cellParameters;
						
				var cell = CreateTableCell ("TableCell" + i + "_" + q + "_" + j, currentDeltaX + 300 * iFiltered + 40, deltaYForGroup + j * 100
					, daysCalendar [q] [j] [0], CreateConcatenatedArray (daysCalendar [q] [j] [1]), [(iFiltered == 0 ? 1 : 0), 1, (dayFiltered == 0 && j == 0 ? 1 : 0), 1]
					, 300, 100, false, "calendarTable");
				calendarObjects.push (cell);

				cell.onclick = onClick;
				
				if (currentDay == GetDayName (q)) {
				
					calendarObjects [calendarObjects.length - 1].style.backgroundColor = currentDayColor;
				} else {
					
					if (dayFiltered % 2) {
						
						calendarObjects [calendarObjects.length - 1].style.backgroundColor = oddDayColor;
					} else {
						
						calendarObjects [calendarObjects.length - 1].style.backgroundColor = evenDayColor;
					}
					
				}
				
				for (var qi = 0; qi < cell.childNodes.length; qi++) {
					
					//console.log (links [i]);
					
					var courseLink = "";
					var inputLink = cellParameters [3].length > qi ? cellParameters [3] [qi] [3] : -1;;
					
					if (inputLink == -1) {
						
						courseLink = ""; 
					} else {
						
						var inputRaw = calendarRaw [inputLink];
						courseLink = (inputRaw.length > 9 ? inputRaw [9] : "")
					}
					
					//console.log (["CL", courseLink]);
					
					if (courseLink != "") {
						
						cell.childNodes [qi].style.backgroundColor = linkedStaticColor;
					}
				}
				
			}
			
			
			for (var j = daysCalendar [q].length; j < Math.max (maxPairsForDay [q], minDayPairsCount); j++) {
				
				cellParametersById ["TableCell" + i + "_" + q + "_" + j] = [currentDeltaX + 300 * iFiltered + 40, deltaYForGroup + j * 100
					, "Full", [["", "", "", -1]], [(iFiltered == 0 ? 1 : 0), 1, (dayFiltered == 0 && j == 0 ? 1 : 0),1], calendarPrepared [i] [0], j
					, AddDaysToDate (currentStartOfWeek, q)];
					
				var cell = CreateTableCell ("TableCell" + i + "_" + q + "_" + j, currentDeltaX + 300 * iFiltered + 40, deltaYForGroup + j * 100
					, "Full", [""], [(iFiltered == 0 ? 1 : 0), 1, (dayFiltered == 0 && j == 0 ? 1 : 0),1]
					, 300, 100, false, "calendarTable");
				
				calendarObjects.push (cell);	
				cell.onclick = onClick;	
				
				if (currentDay == GetDayName (q)) {
				
					calendarObjects [calendarObjects.length - 1].style.backgroundColor = currentDayColor;
				} else {
					
					if (dayFiltered % 2) {
						
						calendarObjects [calendarObjects.length - 1].style.backgroundColor = oddDayColor;
					} else {
						
						calendarObjects [calendarObjects.length - 1].style.backgroundColor = evenDayColor;
					}
					
				}
			}
			
			
			deltaYForGroup += 100 * (Math.max (maxPairsForDay [q], minDayPairsCount));
		}
		
	}
	
	if (daysFilter == nullFilterValue) {
	
		var examsDiv = CreateTableCellFull ("ex 	amsDiv", currentDeltaX + (20/2) - 100 * (1/2)
				, dayNameDeltaY + 100 * (1/2) - (60/2), ["<br>Екзамени"], [1,1,1,0], 100 * 1 - 1
				, 60, true, 0, "calendarTable");
			examsDiv.style.transform = "rotate(-90deg)";
		dayNameDeltaY += 100;
		
		var testsDiv = CreateTableCellFull ("testsDiv", currentDeltaX + (20/2) - 100 * (1/2)
				, dayNameDeltaY + 100 * (1/2) - (60/2), ["<br>Заліки"], [1,1,1,0], 100 * 1 - 1
				, 60, true, 0, "calendarTable");
			testsDiv.style.transform = "rotate(-90deg)";
		dayNameDeltaY += 100;
		
		var practicsDiv = CreateTableCellFull ("practicsDiv", currentDeltaX + (20/2) - 100 * (1/2)
				, dayNameDeltaY + 100 * (1/2) - (60/2), ["<br>Практики"], [1,1,1,0], 100 * 1 - 1
				, 60, true, 0, "calendarTable");
			practicsDiv.style.transform = "rotate(-90deg)";
		dayNameDeltaY += 100;
		
		calendarObjects.push (examsDiv);
		calendarObjects.push (testsDiv);
		calendarObjects.push (practicsDiv);
		
		
		iFiltered = -1;
		
		for (var i = 0; i < calendarPrepared.length; i++) {
			
			if (!(groupFilter == nullFilterValue || groupFilter == calendarPrepared [i] [0])) {
					
					continue;
			}
			
			iFiltered ++;
			
			var groupId = GetGroupByName (calendarPrepared [i] [0]);
			var data = GetAdditionalCalendarData (groupId);
			
			if (data === false) {
				
				SetAdditionalCalendarData ([groupId, "", "", ""]);
				data = [groupId, "", "", ""];
			}
			
			console.log (data);
			var cellExams = CreateTableCell ("ExamsCell" + groupId, currentDeltaX + 300 * iFiltered + 40, dayNameDeltaY - 300
					, "Full", [data [1].replace(/(?:\r\n|\r|\n)/g, '<br>')], [(iFiltered == 0 ? 1 : 0), 1, 1, 0]
					, 300, 100, false, "calendarTable");
			cellExams.onclick = onAdditionalClick;
			cellExams.style.overflowY = "scroll";
			calendarObjects.push (cellExams);
			
			var cellTests = CreateTableCell ("TestsCell" + groupId, currentDeltaX + 300 * iFiltered + 40, dayNameDeltaY - 200
					, "Full", [data [2].replace(/(?:\r\n|\r|\n)/g, '<br>')], [(iFiltered == 0 ? 1 : 0), 1, 1, 0]
					, 300, 100, false, "calendarTable");
			cellTests.onclick = onAdditionalClick;
			cellTests.style.overflowY = "scroll";
			calendarObjects.push (cellTests);
			
			var cellPractics = CreateTableCell ("PracticsCell" + groupId, currentDeltaX + 300 * iFiltered + 40, dayNameDeltaY - 100
					, "Full", [data [3].replace(/(?:\r\n|\r|\n)/g, '<br>')], [(iFiltered == 0 ? 1 : 0), 1, 1, 1]
					, 300, 100 - 1, false, "calendarTable");
			cellPractics.onclick = onAdditionalClick;
			cellPractics.style.overflowY = "scroll";
			calendarObjects.push (cellPractics);
			
		}
	}

	if (isPrinting) {
		
		var topCentreText = printTopCentreText
								.replace ("$1", facultyGenetiveCase)
								.replace ("$2", semester)
								.replace ("$3", educationYear);
		
		
		var topCentreTextDiv = СreateDiv(topCentreText, backgroundCalendarWidth / 2 - 400, 10, 800, 200, () => {}, "TextElement", "calendarTable");
		calendarObjects.push (topCentreTextDiv);
		
		var topRightText = printTopRightText;
		
		var topRightTextDiv = СreateDiv(topRightText, backgroundCalendarWidth - 600, 10, 600, 200, () => {}, "TextElementRight", "calendarTable");
		calendarObjects.push (topRightTextDiv);
	}
	
	facultyNameDiv.innerHTML = "<a style='margin-left:20px; line-height:1.6;'><font size='8'>" + (isOddCurrentWeek ? "Чисельник" : "Знаменник") + ". </font>" + facultyName + "</a>";
	
	SetBackgroundCalendarSize (0, dayNameDeltaY, isPrinting);
}

function RemoveCalendar () {
	
	cellParametersById = [];
	
	for (var i = 0; i < calendarObjects.length; i++) {
		
		DeleteObject (calendarObjects [i]);
	}
	
	calendarObjects = [];
}


function UpdateFilters () {
	
	groupFilter = GetValue ("DisplayFilter0");
	lectorFilter = GetValue ("DisplayFilter1");
	auditoriesFilter = GetValue ("DisplayFilter2");
	daysFilter = GetValue ("DisplayFilter3");
	
	redrawCalendar ();
}

function DrawFilters (scale, deltaX, deltaY) {
	
	
	var daysList = [nullFilterValue];
	
	for (var i = 0; i < daysInWeek; i++) {
		
		daysList.push (GetDayName (i));
	}
	
	СreateDivSelect("Група: ", groupsList, "DisplayFilter0", deltaX, deltaY, 200, 20, 100, "DisplayFilter00", "UpdateFilters ();");
	СreateDivSelect("Викладач: ", lectorsList, "DisplayFilter1", deltaX + 200, deltaY, 240, 20, 140, "DisplayFilter11", "UpdateFilters ();");
	СreateDivSelect("Аудиторія: ", auditoriesList, "DisplayFilter2", deltaX + 440, deltaY, 260, 20, 150, "DisplayFilter22", "UpdateFilters ();");
	СreateDivSelect("День тижня: ", daysList, "DisplayFilter3", deltaX + 700, deltaY, 260, 20, 150, "DisplayFilter33", "UpdateFilters ();");
	
	SetBackgroundSize (Math.max (backgroundWidth, deltaX + 700 + 260 + 20), 0);
}

function UpdateFilterLists (scale, deltaX, deltaY) {
	
	DeleteObjectByiId ("DisplayFilter00");
	DeleteObjectByiId ("DisplayFilter11");
	DeleteObjectByiId ("DisplayFilter22");
	DeleteObjectByiId ("DisplayFilter33");
	
	DrawFilters (scale, deltaX, deltaY);
}
