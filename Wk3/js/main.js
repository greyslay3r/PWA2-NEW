/*  
	Your Project Title
	Author: You
*/

(function($){
	
	/*
	===============================================
	=========================== APPLICATION GLOBALS	
	*/
	
	var win = $(window),
		body = $(document.body),
		container = $('#container'),	// the only element in index.html
		currentUser = {}
	;
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	
// ------------- load landing -------------		
	
	var loadLanding = function(){
		$.get('templates/landing.html', function(html){
			var h = $(html);
			var landingCode = h.find('#template_landing').html();
			$.template('landing', landingCode);		// compile template
			$.render(currentUser, 'landing');		// use template
			container.html(landingCode);
			
			$('.btn').on('click', login);
			//$('.join_btn').on('click', loadRegForm);
			
		});
		return false;   //  added in from video.........
	};
	
// ------------- load application -------------	
	var loadApp = function(){
		$.get('templates/app.html', function(html){
			var h = $(html);
			var appCode = h.find('#template_dash').html();
			$.template('app', appCode);		// compile template
			$.render(currentUser, 'app');		// use template
			container.html(appCode);
			
			//  loadProjects();
			
			$('.out_btn').on('click', logout);
			//$('.join_btn').on('click', loadRegForm);
			
		});
		return false;
	
	};
	
// 	==============  check login state ============
	var checkLogin = function(){     //  var was checkLoginState

		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(r){
				 if (r.user){
				  	loadApp();
				  }else{
				  	console.log("check_login false");
					loadLanding();
				  }
			}
		});	
		return false;
		
	};
	
// 	===============  login function  =============

	var login = function(){
	
		var user = $('#user_name input').val(),
			pwd = $('#password input').val();
		
		$.ajax({
			url: 'xhr/login.php',
			data:{
				username: user,
				password: pwd
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				if(response.error){
					console.log(response.error);
				}else{
					loadApp();
				}
			}
		});
		return false;
	};
	
// 	===============  logout function  =============

	var logout = function(){
		
		$.ajax({
			url: 'xhr/logout.php',
			type: 'GET',
			dataType: 'json',
		
			success: function(response){
				loadLanding();
			}
		});
		return false;
	};


	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLogin();    //  initial var was checkLoginState 
	};
	
	
	init();
	
		
	/*
	===============================================
	======================================== EVENTS	
	*/
	
	// win.on('submit', '#user-reg-form', function(){
// 		
// 		return false;
// 	});
	
	/*	
	==================================== END EVENTS 
	===============================================
	*/
		
		

	
})(jQuery); // end private scope




