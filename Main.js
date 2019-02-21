
var lastSelectedDiv = "null";
var lastSelectedDivColor = "rgba (123, 123, 50, 0.465)";


var addLinkType = ["Предмет", "Предмет, викладач", "Предмет, група", "Предмет, викладач, група"];

function DrawMenu (scale, deltaX, deltaY) {
	
	DrawFilters (scale, deltaX, deltaY + 100);
	
	var daySelect = СreateDivCalendar("", "Calendar0", deltaX, deltaY + 50, 200, 20, 200, "Calendar00", "GetCalendar (GetValue ('Calendar0'));UpdateFilters ();");
	//daySelect.style.position = "fixed";
	//daySelect.style.zIndex = 10;
	
	SetValue ("Calendar0", DateToString (new Date ()));
	
	
	var printDiv = СreateDiv("Друкувати розклад", deltaX + 250, deltaY + 50, 200, 23
		, () => {
			
			Print ();
		}
		, "TextElement"
	);
	
	printDiv.style.fontSize = 18 * (isMobile ? mobileScale : 1) + "px";
	printDiv.style.border = "1px solid";
	printDiv.style.boxShadow = "grey 2px 2px";
	AddChangingColor (printDiv, "#FFFFFF", "#0000FF");
	
	var subscribeDiv = СreateDiv("Додати Google-календар", deltaX + 500, deltaY + 50, 200, 23
		, () => {
			
			CreateSubscribeGoogleCalendarMenu (screenLeftPosition + (window.innerWidth - subscribeGoogleCalendarMenuWidth) / 2, screenTopPosition + 200);
		}
		, "TextElement"
	);
	
	subscribeDiv.style.fontSize = 18 * (isMobile ? mobileScale : 1) + "px";
	subscribeDiv.style.border = "1px solid";
	subscribeDiv.style.boxShadow = "grey 2px 2px";
	AddChangingColor (subscribeDiv, "#FFFFFF", "#0000FF");
	
	var helpDiv = СreateDiv("Допомога", deltaX + 750, deltaY + 50, 200, 23
		, () => {
			
			OpenInNewTab ("http://ei.npu.edu.ua/Help0.html");
		}
		, "TextElement"
	);
	
	helpDiv.style.fontSize = 18 * (isMobile ? mobileScale : 1) + "px";
	helpDiv.style.border = "1px solid";
	helpDiv.style.boxShadow = "grey 2px 2px";
	AddChangingColor (helpDiv, "#FFFFFF", "#0000FF");
}

function OnCellClick (trg) {
			
	var parentId;
	var toClickId;
	var parentNode;
	
	if (trg.target.parentNode.id == "main") {
		
		//toClickId = trg.target.id;
	} else {
		
		parentId = trg.target.parentNode.id;
		parentNode = trg.target.parentNode;
		toClickId = trg.target.id;
		
		var allParams = cellParametersById [parentId] [3];
		
		console.log (["allParams",  allParams]);
		
		for (var i = 0; i < parentNode.childNodes.length; i++) {
			
			if (parentNode.childNodes [i] == trg.target) {
				
				if (allParams [i] [4] != "" && (typeof allParams [i] [4] !== 'undefined')) {
					
					OpenInNewTab (allParams [i] [4]);
				}
			}
		}
		
	}	
			
			
}

function Main (faculties) {
	
	backgroundWidth = window.innerWidth;
	backgroundHeight = window.innerHeight;
	
	facultyName = "";
	
	for (var i = 0; i  < faculties.length; i++) {
		
		if (faculties [i] [0] == faculty) {
			
			facultyName = faculties [i] [1];
			facultyGenetiveCase = faculties [i] [2];
		}
	}
	
	facultyNameDiv = СreateDiv("<a style='margin-left:40px; line-height:1.6;'>" + facultyName + "</a>", 0, 0, 18000, 100);
	facultyNameDiv.style.background = "#7E8A8B";
	facultyNameDiv.style.fontSize = 60 * (isMobile ? mobileScale : 1) + "px";
	facultyNameDiv.style.color = "#FFFFFF";
	
	GetNameLists ();
	GetCalendar (DateToString (new Date ()));
	
	DrawMenu (1, 100, 100);
	
	var leftTable = 100 - 20;
	var topTable = 300 - 51;
	
	СreateDiv("", leftTable, topTable, 10, 10, () => {}, "calendarTable");
	calendarTable.style.background = "#fff";
	
	backgroundCalendarLeft = 100 - 20;
	backgroundCalendarTop = 300 - 51;
	
	DrawCalendar (1, 20, 51, 1, OnCellClick);
	
	window.addEventListener('mousemove', (trg) => {

		var underId;
		var target = trg.target;
		var containerDiv;
		
		if (lastSelectedDiv == "null" || lastSelectedDiv != target) {
			
			if (lastSelectedDiv != "null") {
				
				lastSelectedDiv.style.backgroundColor = lastSelectedDivColor;
			}
			
			lastSelectedDiv = target;
			lastSelectedDivColor = target.style.backgroundColor;
		} else {
			
			return;
		}
		
		if (target.parentNode.id == "main") {
			
			underId = "";
		} else {
			
			containerDiv = target.parentNode;
			underId = containerDiv.id;
		}	
		
		if (IsNull (underId)) {

			return;
		}

		if (underId.indexOf ("TableCell") >= 0) {
			
			links = [];
			
			var cellParameters = cellParametersById [underId];
			    
			for (var i = 0; i < containerDiv.childNodes.length; i++) {
				
				if (target == containerDiv.childNodes [i]) {
				
					//console.log (links [i]);
					
					var courseLink = "";
					var inputLink = cellParameters [3].length > i ? cellParameters [3] [i] [3] : -1;;
					
					if (inputLink == -1) {
						
						courseLink = ""; 
					} else {
						
						var inputRaw = calendarRaw [inputLink];
						courseLink = (inputRaw.length > 9 ? inputRaw [9] : "")
					}
					
					//console.log (["CL", courseLink]);
					
					if (courseLink != "") {
						
						lastSelectedDiv.style.backgroundColor = linkedColor;
					}
				}
			}
			
		}
	});
	
	window.addEventListener('scroll', () => {
		
		screenLeftPosition = (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0);
		screenTopPosition = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);	
		
		
		if (screenTopPosition > 1 + topTable) {
			
			for (var i = 0; i < constantTopDivs.length; i++) {
			
				constantTopDivs [i].style.top = (screenTopPosition - topTable) + "px";
			}
		} else {
			
			for (var i = 0; i < constantTopDivs.length; i++) {
			
				constantTopDivs [i].style.top = (1) + "px";
			}
		}
		
		for (var i = 0; i < constantLeftDivs.length; i++) {
			
			if (screenLeftPosition > leftTable) {
			
				constantLeftDivs [i][0].style.left = (screenLeftPosition - leftTable + constantLeftDivs [i][1]) + "px";
			} else {
				
				constantLeftDivs [i][0].style.left = (constantLeftDivs [i][1]) + "px";
			}
		}
		
	}, false);

}

function OnFacultyClick (clickLink) {
	
	return () => {
				
		OpenLink (clickLink);
	}
}

function CreateFacultyMenu (faculties) {
	
	var topDiv = СreateDiv("<a style='margin-left:40px; line-height:1.6;'>" + "НПУ Розклад" + "</a>", 0, 0, 18000, 100);
	topDiv.style.background = "#7E8A8B";
	topDiv.style.fontSize = 60 * (isMobile ? mobileScale : 1) + "px";
	topDiv.style.color = "#FFFFFF";
		
	SetBackgroundSize (Math.max (backgroundWidth, 600 + window.innerWidth / 2 + 250), Math.max (backgroundHeight, 150 + Math.ceil (faculties.length / 2) * 120));
	
	for (var i = 0; i < faculties.length; i++) {
		
		var clickLink = "?" + faculties [i] [0];
		var description = faculties [i] [1];
		
		facultyDiv = СreateDiv("<br>" + description, window.innerWidth / 2 - 350 * (i % 2 == 0 ? 1 : -1) - 300, 150 + Math.floor (i / 2) * 120, 600, 100
			, OnFacultyClick (clickLink)
			, "TextElementRounded"
		);
		
		facultyDiv.style.fontSize = 26 * (isMobile ? mobileScale : 1) + "px";
		facultyDiv.style.border = "1px solid";
	}
}

function AfterFacultyLoad (faculties) {
	
	GetGoogleAuthURL ((res0) => {
		
		authURL = res0;
		
		GetCalendarRawFromServer ((res) => {
			
			calendarRaw = res [0];
			calendarAdditional = res [1];
			
			GetLectorsFromServer ((res1) => {
				
				lectorsListRaw = res1;
				
				GetAuditoriesFromServer ((res2) => {
					
					auditoriesListRaw = res2;
					
					GetGroupsFromServer ((res3) => {
						
						GetSettingsFromServer ((settings) => {

							console.log (settings);
							
							var oddEvenSplit = settings [4].split ('|');
							
							oddEvenDay = new Date (oddEvenSplit [0]);
							isOddDay = oddEvenSplit [1] == "true";
							
							console.log ([oddEvenDay, isOddDay]);
							
							groupsListRaw = res3;
							console.log (groupsListRaw);
							Main (faculties);
						});

					});
				});
			});
		});
	});
}	

GetFaculty ((resM1) => {
	
	console.log (resM1);
	
	if (faculty.indexOf ("http") > -1) {
		
		GetFacultiesFromServer ((res) => {
			
				CreateFacultyMenu (res);
		});
	} else {
		
		GetFacultiesFromServer ((res) => {
			
			GetSettingsFromServer ((settings) => {
				
				printTopCentreText = settings [0] [0];
				semester = settings [0] [1];
				educationYear = settings [0] [2];
				printTopRightText = settings [0] [3];
				
				console.log ([printTopCentreText, semester, educationYear, printTopRightText]);
				
				AfterFacultyLoad (res); 
			}); 
		});
		
	}
	
	
});




