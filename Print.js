
function Print () {
	
	redrawCalendar (true);
	
	var backgroundWidthBefore = backgroundWidth;
	var backgroundHeightBefore = backgroundHeight;
	
	SetBackgroundSize (backgroundWidth, backgroundHeight * 3);

	var tableWidth = document.getElementById ('calendarTable').offsetWidth;
	var tableHeight = document.getElementById ('calendarTable').offsetHeight;
	
	var resultWidth = (Math.ceil (tableWidth / 794))*794;
	var resultHeight = (Math.ceil (tableHeight / 1122))*1122;
	
	document.getElementById ('calendarTable').style.width = resultWidth +"px";
	document.getElementById ('calendarTable').style.height = resultHeight +"px";
	
	var countHeight = (document.getElementById ('calendarTable').offsetHeight) / 1122;
	var countWidth = (document.getElementById ('calendarTable').offsetWidth) / 794;
	
	html2canvas (document.getElementById ('calendarTable'), {
		
		background :'#FFFFFF',
		onrendered: function (canvas) {
			
			document.body.appendChild (canvas);
			$(canvas).attr ('id', 'canvasBefore');
			var canvas = document.getElementById ("canvasBefore");
			canvas.style.display = "none";
			canvas.style.background = "#fff";
			var img = canvas.toDataURL ("image/jpeg");  
			
			var doc = new jsPDF ('p','mm','a4');
			
			for (var j = 0;j < countHeight; j ++){
			 
				for (var m = 0; m < countWidth; m ++){
					
					doc.addImage ( img, 'JPEG', (210*m*-1), (297*j*-1));
					
					if (j != countHeight -1 || m != countWidth - 1)
						doc.addPage (); 
				}
			}
			
			doc.save ("rozklad.pdf");
			
			SetBackgroundSize (backgroundWidthBefore, backgroundHeightBefore);
			DeleteObject (canvas);
			redrawCalendar (false);
		}
	});
}