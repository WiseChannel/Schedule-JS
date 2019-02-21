
var cellParametersById = [];

var calendarPrepared; 
var calendarRaw = [];
var calendarAdditional = [];
var maxPairsForDay;
var daysInWeek = 7;

var currentDay = "";

var isUseZeroPair = false;

var currentStartOfWeek;

var oddEvenDay = "";// new Date ("2017-09-04");//false;
var isOddDay = true;

var isOddCurrentWeek = true;

function GetCalendarRaw () {

	return;	
}

function ReadEventFromCalendarRaw (id) {
	
	if (id >= 0 && id < calendarRaw.length) {
		
		return calendarRaw [id];
	}
	
	return "null";
}

function AddEventToCalendarRaw (target) {
	
	calendarRaw.push (target);
	
	return calendarRaw.length - 1;
}

function RemoveEventFromCalendarRaw (id) {
	
	if (id != -1) {
		
		calendarRaw.splice (id, 1);
	}
}

function IsHasSameDelaAndSubgroup (arr) {
	
	for (var i = 0; i < arr.length; i++) {
		
		for (var q = i + 1; q < arr.length; q++) {
			
			if (arr [i] [3] == arr [q] [3] && arr [i] [4] == arr [q] [4]) {
						
						
				console.log (["SameDeltaSubGroup", arr]);
				return true;
			}
		}
	}
	
	return false;
}


function RemoveSameDelaAndSubgroup (arr) {
	
	var res = [];
	var dontAdd;
	
	for (var i = 0; i < arr.length; i++) {
		
		dontAdd = false;
		
		for (var q = i + 1; q < arr.length; q++) {
			
			if (arr [i] [3] == arr [q] [3] && arr [i] [4] == arr [q] [4]) {
				
				dontAdd = true;
			}
		}
		
		if (!dontAdd) {
			
			res.push (arr [i]);
		}
	}
	
	console.log (res);
	return res;
}

function IsHasDelaAndSubgroup (arr, d, s) {
	
	for (var i = 0; i < arr.length; i++) {
		
		if (arr [i] [3] == d && arr [i] [4] == s) {
			
			return true;
		}
	}
	
	return false;
}

function PreparedTarget (target) {
	
	return [target [0], target [1], target [2], target [5], target [6]];
}

function AddSpacesToTarget (target, mustHaveDeltaSubgroups) {
	
	
	var res = [];
	
	if (target.length == 0) {
		
		for (var z = 0; z < mustHaveDeltaSubgroups.length; z++) {
			
			res.push (["", "", "", mustHaveDeltaSubgroups [z] [0], mustHaveDeltaSubgroups [z] [1]]);
		}
		
		return res;
	}
	
	var i = 0;
	
	for (var z = 0; z < mustHaveDeltaSubgroups.length; z++) {
		
		if (i < target.length && target [i] [3] == mustHaveDeltaSubgroups [z] [0] && target [i] [4] == mustHaveDeltaSubgroups [z] [1]) {
			
			res.push (target [i]);
			i++;
		} else {
			
			res.push (["", "", "", mustHaveDeltaSubgroups [z] [0], mustHaveDeltaSubgroups [z] [1], -1]);
		}
	}
	
	return res;
}

function PrepareDayArrayPairPart (target) {
	
	// [name, lector, auditory, delta, subgroup, link] []
	
	target.sort ((a, b) => {
		
		return (a [3] == b[3] ? a [4] - b [4] : a [3] - b [3]);
	});
	
	
	if (IsHasSameDelaAndSubgroup (target)) {
		
		target = RemoveSameDelaAndSubgroup (target);
		
		//return ["Full", [["Error-1", target, "", -1, ""]]];
	}
	
	if (target.length == 0) {
		
		return ["Full", [["", "", "", -1, ""]]];
	}
	
	if (target.length == 1) {
		
		if (IsHasDelaAndSubgroup (target, 0, 0)) {
			
			return ["Full", [PreparedTarget (target [0])]];
		}
	}
	
	if (target.length <= 3) {
		
		if (IsHasDelaAndSubgroup (target, 1, 0) && (IsHasDelaAndSubgroup (target, 2, 1) || IsHasDelaAndSubgroup (target, 2, 2))) {
			
			target = AddSpacesToTarget (target, [[1, 0], [2, 1], [2, 2]]);
			var res = [];
			
			for (var i = 0; i < target.length; i++) {
				
				res.push (PreparedTarget (target [i]));
			}
			
			return ["TopBottom2", res];
		}
		
		if (IsHasDelaAndSubgroup (target, 2, 0) && (IsHasDelaAndSubgroup (target, 1, 1) || IsHasDelaAndSubgroup (target, 1, 2))) {
			
			target = AddSpacesToTarget (target, [[1, 1], [1, 2], [2, 0]]);
			var res = [];
			
			for (var i = 0; i < target.length; i++) {
				
				res.push (PreparedTarget (target [i]));
			}
			
			return ["Top2Bottom", res];
		}
		
		if (IsHasDelaAndSubgroup (target, 0, 2) && (IsHasDelaAndSubgroup (target, 1, 1) || IsHasDelaAndSubgroup (target, 2, 1))) {
			
			target = AddSpacesToTarget (target, [[0, 2], [1, 1], [2, 1]]);
			var res = [];
			
			for (var i = 0; i < target.length; i++) {
				
				res.push (PreparedTarget (target [i]));
			}
			
			return ["Left2Right", res];
		}
		
		if (IsHasDelaAndSubgroup (target, 0, 1) && (IsHasDelaAndSubgroup (target, 1, 2) || IsHasDelaAndSubgroup (target, 2, 2))) {
			
			target = AddSpacesToTarget (target, [[0, 1], [1, 2], [2, 2]]);
			var res = [];
			
			for (var i = 0; i < target.length; i++) {
				
				res.push (PreparedTarget (target [i]));
			}
			
			return ["LeftRight2", res];
		}
		
	}
	
	if (target.length <= 2) {
		
		if (IsHasDelaAndSubgroup (target, 1, 0) || IsHasDelaAndSubgroup (target, 2, 0)) {
			
			target = AddSpacesToTarget (target, [[1, 0], [2, 0]]);
			return ["TopBottom", [PreparedTarget (target [0]), PreparedTarget (target [1])]];
		}
		
		if (IsHasDelaAndSubgroup (target, 0, 1) || IsHasDelaAndSubgroup (target, 0, 2)) {
			
			target = AddSpacesToTarget (target, [[0, 1], [0, 2]]);
			return ["LeftRight", [PreparedTarget (target [0]), PreparedTarget (target [1])]];
		}
		
	}
	
	if (target.length <= 4) {
		
		if ((IsHasDelaAndSubgroup (target, 1, 1) || IsHasDelaAndSubgroup (target, 1, 2)) &&
			(IsHasDelaAndSubgroup (target, 2, 1) || IsHasDelaAndSubgroup (target, 2, 2))) {
			
			target = AddSpacesToTarget (target, [[1, 1], [1, 2], [2, 1], [2, 2]]);
			
			var res = [];
			
			for (var i = 0; i < target.length; i++) {
				
				res.push (PreparedTarget (target [i]));
			}
			
			return ["Top2Bottom2", res];
		}
		
	}
	
	if (target.length <= 2) {
		
		if ((IsHasDelaAndSubgroup (target, 2, 1) || IsHasDelaAndSubgroup (target, 2, 2))) {
			
			target = AddSpacesToTarget (target, [[1, 0], [2, 1], [2, 2]]);
			var res = [];
			
			for (var i = 0; i < target.length; i++) {
				
				res.push (PreparedTarget (target [i]));
			}
			
			return ["TopBottom2", res];
		}
		
		if ((IsHasDelaAndSubgroup (target, 1, 1) || IsHasDelaAndSubgroup (target, 1, 2))) {
			
			target = AddSpacesToTarget (target, [[1, 1], [1, 2], [2, 0]]);
			var res = [];
			
			for (var i = 0; i < target.length; i++) {
				
				res.push (PreparedTarget (target [i]));
			}
			
			return ["Top2Bottom", res];
		}
		
		if ((IsHasDelaAndSubgroup (target, 1, 1) || IsHasDelaAndSubgroup (target, 2, 1))) {
			
			target = AddSpacesToTarget (target, [[0, 2], [1, 1], [2, 1]]);
			var res = [];
			
			for (var i = 0; i < target.length; i++) {
				
				res.push (PreparedTarget (target [i]));
			}
			
			return ["Left2Right", res];
		}
		
		if ((IsHasDelaAndSubgroup (target, 1, 2) || IsHasDelaAndSubgroup (target, 2, 2))) {
			
			target = AddSpacesToTarget (target, [[0, 1], [1, 2], [2, 2]]);
			var res = [];
			
			for (var i = 0; i < target.length; i++) {
				
				res.push (PreparedTarget (target [i]));
			}
			
			return ["LeftRight2", res];
		}
		
	}
	
	console.log (["AlmostError0", target]);
	
	target.shift ();
	
	return PrepareDayArrayPairPart (target);
}


function GetCalendarPrepared (startOfWeek) {
	
	
	console.log ([oddEvenDay, isOddDay]);
	
	currentStartOfWeek = startOfWeek;
	
	calendarPrepared = [];
	
	var dateDistance;
	
	var groupsCount = groupsListRaw.length;
	
	maxPairsForDay = [0, 0, 0, 0, 0, 0, 0];
	
	var groupsSorted = [];
	
	console.log (["groupsListRaw", groupsListRaw]);
	
	var groupsToSort = [];
	
	for (var i = 0; i < groupsCount; i++) {
		
		groupsToSort.push (groupsListRaw [i]);
	}
	
	
	groupsToSort.sort ((a, b) => { return (a [3] > b [3] ? 1 : (a [3] == b [3] ? (a[0] > b [0] ? 1 : (a[0] == b [0] ? 0 : -1)) : -1)); });
	
	console.log (["groupsToSort", groupsToSort]);
	
	for (var i = 0; i < groupsCount; i++) {
		
		groupsSorted.push (groupsToSort [i] [0]);
	}
	
	ForgetSubjects ();
	
	for (var i = 0; i < calendarRaw.length; i++) {
		
		RememberSubject (calendarRaw [i] [1]);
	}
	
	//groupsSorted.sort ((a, b) => { return (GetGroupName (a) > GetGroupName (b) ? 1 : (GetGroupName (a) == GetGroupName (b) ? 0 : -1));  });
	
	for (var i = 0; i < groupsCount; i++) {
		
		calendarPrepared.push ([GetGroupName (groupsSorted [i]), []]);
		
		for (var q = 0; q < daysInWeek; q++) {
			
			var thisDayEvents = [];
			
			for (var l = 0; l < 15; l++) {
				
				thisDayEvents.push ([]);
			}
			
			for (var j = 0; j < calendarRaw.length; j++) {
				
				
				if (calendarRaw [j] [0] == groupsSorted [i]) {
					
					dateDistance = DateDistanceInDays (new Date (calendarRaw [j] [4]), AddDaysToDate (startOfWeek, q));
					
					if (dateDistance % 7 == 0 && (0 <= dateDistance || (calendarRaw [j] [7] != 0 && dateDistance == -7)) && Math.ceil (dateDistance / (calendarRaw [j] [7] == 0 ? 7 : 14)) < calendarRaw [j] [5] ) {
						
						
						if (oddEvenDay === false) {
						
							if (calendarRaw [j] [7] == 1) {
								
								//oddEvenDay = GetStartOfTheWeek (new Date (calendarRaw [j] [4]));
								//isOddDay = true;
								
								console.log (["calendarRaw isOddDay oddEvenDay", calendarRaw [j], isOddDay, oddEvenDay]);
							} else if (calendarRaw [j] [7] == 2) {
								
								//oddEvenDay = GetStartOfTheWeek (new Date (calendarRaw [j] [4]));
								//isOddDay = false;
								
								console.log (["calendarRaw isOddDay oddEvenDay", calendarRaw [j], isOddDay, oddEvenDay]);
							}
						}
						
						maxPairsForDay [q] = Math.max (maxPairsForDay [q], calendarRaw [j] [6]);
						
						var lnk = j;
						
						thisDayEvents [calendarRaw [j] [6]]
							.push ([calendarRaw [j] [1], GetLectorName (calendarRaw [j] [2]), GetAuditoryName (calendarRaw [j] [3])
								, calendarRaw [j] [7], calendarRaw [j] [8], lnk, (calendarRaw [j].length > 9 ? calendarRaw [j] [9] : "")]);
								
					}
				}
			}
			
			var lastNotNull = 0;
			
			for (var l = 0; l < 15; l++) {
				
				if (thisDayEvents [l].length != 0) {
					
					lastNotNull = l;
				}
				
				thisDayEvents [l] = PrepareDayArrayPairPart (thisDayEvents [l]);
			}
			
			thisDayEvents.splice (lastNotNull + 1, thisDayEvents.length - lastNotNull);
			
			if (!isUseZeroPair) {
				
				thisDayEvents.splice (0, 1);	
			}
			
			calendarPrepared [i] [1].push (thisDayEvents);
		}
	}
	
	if (oddEvenDay !== false) {
		
		var distanceToOddEvenDay = DateDistanceInDays (oddEvenDay, startOfWeek);
												
		if ((distanceToOddEvenDay % 14 == 0)) {
			
			isOddCurrentWeek = isOddDay;
		} else {
			
			isOddCurrentWeek = !isOddDay;
		}
		
		
	}
	
}

function GetCalendar (date) {
	
	GetCalendarRaw ();
	GetCalendarPrepared (GetStartOfTheWeek (new Date (date)));
	
	var dateSplit = date.split ("-");
	
	currentDay = GetDayName (((new Date (parseInt (dateSplit [0]), parseInt (dateSplit [1]) - 1, parseInt (dateSplit [2])).getDay () - 1) % 7 + 7) % 7);
}





