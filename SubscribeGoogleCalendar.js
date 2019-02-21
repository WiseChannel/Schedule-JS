// подписаться на календарь Google


var subscribeGoogleCalendarMenuWidth = 850;
var subscribeGoogleCalendarMenuHeight = 300;

var objectsSubscribeGoogleCalendarMenu = [];

function CreateSubscribeGoogleCalendarMenu (left, top) {
	
	var link1 = "https://calendar.google.com/calendar/r/settings/addbyurl?cid=https://calendar.google.com/calendar/ical/";
	var link2 = "/public/basic.ics";
	
	DestroySubscribeGoogleCalendarMenu ();
	
	var backgroundDiv = СreateDiv("Додати Google-календар", left, top, subscribeGoogleCalendarMenuWidth, subscribeGoogleCalendarMenuHeight, ()=>{}, "TextElement");
	backgroundDiv.style.border = "1px solid";
	backgroundDiv.style.backgroundColor = "#FFFFFF";
	backgroundDiv.style.fontSize = 30 * (isMobile ? mobileScale : 1) + "px";
	backgroundDiv.style.opacity = 0.95;
	
	objectsSubscribeGoogleCalendarMenu.push (backgroundDiv);
	
	var nullValue = "Вибрати";
	var newGroupList = [nullValue]; for (var i = 1; i < groupsList.length; i++) {newGroupList.push (groupsList [i]);}
	var newLectorsList = [nullValue]; for (var i = 1; i < lectorsList.length; i++) {newLectorsList.push (lectorsList [i]);}
	var newAuditoriesList = [nullValue]; for (var i = 1; i < auditoriesList.length; i++) {newAuditoriesList.push (auditoriesList [i]);}
	
	objectsSubscribeGoogleCalendarMenu.push (СreateDivSelect("Група: ", newGroupList, "SubscribeSelect0", left + 20, top + 70, 200, 20, 100, "SubscribeSelect00"));
	objectsSubscribeGoogleCalendarMenu.push (СreateDivSelect("Викладач: ", newLectorsList, "SubscribeSelect1", left + 20, top + 120, 240, 20, 140, "SubscribeSelect11"));
	objectsSubscribeGoogleCalendarMenu.push (СreateDivSelect("Аудиторія: ", newAuditoriesList, "SubscribeSelect2", left + 20, top + 170, 260, 20, 150, "SubscribeSelect22"));
	
	
	var groupDiv = СreateDiv("Додати", left + subscribeGoogleCalendarMenuWidth / 2 - 100, top + 70, 200, 20
		, () => {
			
			if (GetValue ("SubscribeSelect0") != nullValue)
			OpenInNewTab (link1 + GetGroupCalendarId (GetGroupByName (GetValue ("SubscribeSelect0"))) + link2);
		}
		, "TextElement"
	);
	
	groupDiv.style.fontSize = 19 * (isMobile ? mobileScale : 1) + "px";
	groupDiv.style.border = "1px solid";
	groupDiv.style.boxShadow = "grey 2px 2px";
	AddChangingColor (groupDiv, "#FFFFFF", "#00FF00");
	objectsSubscribeGoogleCalendarMenu.push (groupDiv);
	
	var lectorDiv = СreateDiv("Додати", left + subscribeGoogleCalendarMenuWidth / 2 - 100, top + 120, 200, 20
		, () => {
			
			if (GetValue ("SubscribeSelect1") != nullValue)
			OpenInNewTab (link1 + GetLectorCalendarId (GetLectorByName (GetValue ("SubscribeSelect1"))) + link2);
		}
		, "TextElement"
	);
	
	lectorDiv.style.fontSize = 19 * (isMobile ? mobileScale : 1) + "px";
	lectorDiv.style.border = "1px solid";
	lectorDiv.style.boxShadow = "grey 2px 2px";
	AddChangingColor (lectorDiv, "#FFFFFF", "#00FF00");
	objectsSubscribeGoogleCalendarMenu.push (lectorDiv);
	
	var auditoryDiv = СreateDiv("Додати", left + subscribeGoogleCalendarMenuWidth / 2 - 100, top + 170, 200, 20
		, () => {
			
			if (GetValue ("SubscribeSelect2") != nullValue)
			OpenInNewTab (link1 + GetAuditoryCalendarId (GetAuditoryByName (GetValue ("SubscribeSelect2"))) + link2);
		}
		, "TextElement"
	);
	
	auditoryDiv.style.fontSize = 19 * (isMobile ? mobileScale : 1) + "px";
	auditoryDiv.style.border = "1px solid";
	auditoryDiv.style.boxShadow = "grey 2px 2px";
	AddChangingColor (auditoryDiv, "#FFFFFF", "#00FF00");
	objectsSubscribeGoogleCalendarMenu.push (auditoryDiv);
	
	var okDiv = СreateDiv("Закрити", left + subscribeGoogleCalendarMenuWidth / 2 - 100, top + 220, 200, 40
		, () => {
			
			DestroySubscribeGoogleCalendarMenu ();
		}
		, "TextElement"
	);
	
	okDiv.style.fontSize = 30 * (isMobile ? mobileScale : 1) + "px";
	okDiv.style.border = "1px solid";
	okDiv.style.boxShadow = "grey 2px 2px";
	AddChangingColor (okDiv, "#FFFFFF", "#00FF00");
	objectsSubscribeGoogleCalendarMenu.push (okDiv);
	
	
	
	for (var i = 0; i < objectsSubscribeGoogleCalendarMenu.length; i++) {
	
		objectsSubscribeGoogleCalendarMenu [i].style.zIndex = 10;
	}
}


function DestroySubscribeGoogleCalendarMenu () {
	
	for (var i = 0; i < objectsSubscribeGoogleCalendarMenu.length; i++) {
		
		DeleteObject (objectsSubscribeGoogleCalendarMenu [i]);
	}
	
	
	objectsSubscribeGoogleCalendarMenu = [];
}





























