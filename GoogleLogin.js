// гугл логин


var authURL = "www.google.com"; 
var loginpass = "";

function LoginGoogle (onLogin) {
	
	var win = window.open (authURL, '_blank');//window.open(authURL, "LoginGoogleETimetable", 'width=800, height=600'); 
	
	setTimeout (() => {
		
	var checker = window.setInterval(function() { 
	
                try {
					
                    var winURL = (win.document.URL);
					
                    if (winURL.indexOf("loginpass") > -1) {
						
                        window.clearInterval(checker);
						
						var i = 0;
						
						for (; winURL [i] != '='; i++);
						
						loginpass = "";
						
						for (i++; winURL [i] != '#' && i < winURL.length; i++) {
							
							loginpass += winURL [i];
						}

						onLogin (loginpass);
						win.close();
                    }
                } catch(e) {
					
                }
            }, 500);
	}, 500);
	
}