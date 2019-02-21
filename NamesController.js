
var lectorsListRaw = [];
var groupsListRaw = [];
var auditoriesListRaw = [];

var lectorsListClear = [];
var groupsListClear = [];
var auditoriesListClear = [];


var groupsList = [];
var groupsSortedNames = [];
var lectorsList = [];
var auditoriesList = [];
var subjectsList = [];

function GetNameLists () {
	
	
	lectorsList = [];
	lectorsListClear = [];
	
	for (var i = 0; i < lectorsListRaw.length; i++) {
		
		lectorsList.push (lectorsListRaw [i] [1]);
		lectorsListClear.push (lectorsListRaw [i] [1]);
	}
	
	lectorsList.sort ((a, b) => { return (a > b ? 1 : (a == b ? 0 : -1)); });
	lectorsListClear.sort ((a, b) => { return (a > b ? 1 : (a == b ? 0 : -1)); });
	lectorsList.unshift (nullFilterValue);
	
	groupsList = [];
	groupsListClear = [];
	
	for (var i = 0; i < groupsListRaw.length; i++) {
		
		groupsList.push (groupsListRaw [i] [1]);
		groupsListClear.push (groupsListRaw [i] [1]);
	}
	
	groupsListClear.sort ((a, b) => { return (a > b ? 1 : (a == b ? 0 : -1)); });
	groupsList.unshift (nullFilterValue);
	
	auditoriesList = [];
	auditoriesListClear = [];
	
	for (var i = 0; i < auditoriesListRaw.length; i++) {
		
		auditoriesList.push (auditoriesListRaw [i] [1]);
		auditoriesListClear.push (auditoriesListRaw [i] [1]);
	}
	
	auditoriesList.sort ((a, b) => { return (a > b ? 1 : (a == b ? 0 : -1)); });
	auditoriesListClear.sort ((a, b) => { return (a > b ? 1 : (a == b ? 0 : -1)); });
	auditoriesList.unshift (nullFilterValue);
}

function GetStartTime (number) {
	
	switch (number) {
		
		case 0: return "6:30"
		case 1: return "8:00"
		case 2: return "9:30"
		case 3: return "11:00"
		case 4: return "12:30"
		case 5: return "14:00"
		case 6: return "15:30"
		case 7: return "17:00"
		case 8: return "18:30"
		case 9: return "20:00"
		case 10: return "21:30"
	}
	
	return "Undefined";
}

function GetEndTime (number) {
	
	switch (number) {
		
		case 0: return "7:50";
		case 1: return "9:20";
		case 2: return "10:50";
		case 3: return "12:20";
		case 4: return "13:50";
		case 5: return "15:20";
		case 6: return "16:50";
		case 7: return "18:20";
		case 8: return "19:50";
		case 9: return "21:20";
		case 10: return "22:50";
	}
	
	return "Undefined";
}

function GetPairTime (number) {
	
	return "<br>" + (number + 1), GetStartTime (number + 1) + "<br>-<br>" + GetEndTime (number + 1);
}

function GetDayName (number) {
	
	switch (number) {
		
		case 0: return "Понеділок";
		case 1: return "Вівторок";
		case 2: return "Середа";
		case 3: return "Четвер";
		case 4: return "П'ятниця";
		case 5: return "Субота";
		case 6: return "Неділя";
	}
	
	return "Undefind";
}

function GetGroupName (id) {
	
	for (var i = 0; i < groupsListRaw.length; i++) {
		
		if (groupsListRaw [i] [0] == id) {
			
			return groupsListRaw [i] [1];
		}
	}
	
	return "Error: " + id;
}

function GetAuditoryName (id) {
	
	for (var i = 0; i < auditoriesListRaw.length; i++) {
		
		if (auditoriesListRaw [i] [0] == id) {
			
			return auditoriesListRaw [i] [1];
		}
	}
	
	return "Error: " + id;
}

function GetLectorName (id) {
	
	for (var i = 0; i < lectorsListRaw.length; i++) {
		
		if (lectorsListRaw [i] [0] == id) {
			
			return lectorsListRaw [i] [1];
		}
	}
	
	return "Error: " + id;
}

function GetGroupCalendarId (id) {
	
	for (var i = 0; i < groupsListRaw.length; i++) {
		
		if (groupsListRaw [i] [0] == id) {
			
			return groupsListRaw [i] [2];
		}
	}
	
	return "Error: " + id;
}

function GetAuditoryCalendarId (id) {
	
	for (var i = 0; i < auditoriesListRaw.length; i++) {
		
		if (auditoriesListRaw [i] [0] == id) {
			
			return auditoriesListRaw [i] [2];
		}
	}
	
	return "Error: " + id;
}

function GetLectorCalendarId (id) {
	
	for (var i = 0; i < lectorsListRaw.length; i++) {
		
		if (lectorsListRaw [i] [0] == id) {
			
			return lectorsListRaw [i] [2];
		}
	}
	
	return "Error: " + id;
}

function GetGroupByName (name) {
	
	for (var i = 0; i < groupsListRaw.length; i++) {
		
		if (groupsListRaw [i] [1] == name) {
			
			return groupsListRaw [i] [0];
		}
	}
	
	return -1;
}

function GetAuditoryByName (name) {
	
	for (var i = 0; i < auditoriesListRaw.length; i++) {
		
		if (auditoriesListRaw [i] [1] == name) {
			
			return auditoriesListRaw [i] [0];
		}
	}
	
	return -1;
}

function GetLectorByName (name) {
	
	for (var i = 0; i < lectorsListRaw.length; i++) {
		
		if (lectorsListRaw [i] [1] == name) {
			
			return lectorsListRaw [i] [0];
		}
	}
	
	return -1;
}

function GetLectors () {
	
	return lectorsListClear;
}

function GetAuditories () {
	
	return auditoriesListClear;
}

function GetSubjects () {
	
	return subjectsList;
}

function ForgetSubjects () {
	
	subjectsList = [];
}

function RememberSubject (target) {
	
	if (subjectsList.indexOf (target) < 0) {
		
		subjectsList.push (target);
	}
}

function GetFaculty (func) {
	
	var url = document.URL;
	faculty = "";
	
	for (var i = url.length - 1; i >= 0 && url [i] != '?'; i--) {
		
		
		faculty = url [i] + faculty;
	}
	
	func (faculty);
}

