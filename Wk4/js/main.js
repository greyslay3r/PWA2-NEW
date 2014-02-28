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
		return false;   //  added in from video........
	};
	
// ------------- load application -------------	
	var loadApp = function(){
		$.get('templates/app.html', function(html){
			var h = $(html);
			var appCode = h.find('#template_dash').html();
			$.template('app', appCode);		// compile template
			$.render(currentUser, 'app');		// use template
			
			container.html(appCode);
			console.log('loadApp done');

			//  loadProjects();
			$('#projects').on('click',loadProjects);
			$('#tasks').on('click',loadTasks);
			$('#contacts').on('click',loadContacts);
			$('.out_btn').on('click', logout);
			// ---------------------

			// $('.join_btn').on('click', loadRegForm);
			
			
		});
		return false;
	
	};

// ================== load projects ================

	var loadProjects = function(){
		$.get('templates/app.html', function(html){
			var h = $(html);
			var appCode = h.find('#template_project').html();
			$.template('app', appCode);		// compile template
			$.render(currentUser, 'app');		// use template
			container.html(appCode);

			$.ajax({
				url: 'xhr/get_projects.php',
				type: 'get',
				dataType: 'json',
				success: function(response){
					if(response.error){
						console.log(response.error);
					}else{
						console.log(response);
						$.get('templates/app.html', function(html){
							var h = $(html),
								tempCode = h.find('#template_project_1').html(),
								markup = '';

							$.template('projects', tempCode);

							for (var i = 0, j=response.projects.length; i<j; i++){
								var project = response.projects[i];
								markup += $.render(project, 'projects');							};
								
								// var client = project.clientName;
								// console.log("client name is :"+client);
								// ====== accordian attempt =======
								// $('#accordian').jacc({
								// 	header: '#down_arrow',
								// 	content: '.content',
								// 	easing: 'easeOutCirc',
								// 	duration: '2000'
								// })
								// =================================

							$('.projects').html(markup);
						})
					}
				}
			})

		});


	};
// ================== load tasks ================
	var loadTasks = function(){
		$.get('templates/app.html', function(html){
			var h = $(html);
			var appCode = h.find('#template_task').html();
			$.template('app', appCode);		// compile template
			$.render(currentUser, 'app');		// use template
			container.html(appCode);

			$.ajax({
				url: 'xhr/get_tasks.php',
				type: 'get',
				dataType: 'json',
				success: function(response){
					if(response.error){
						console.log(response.error);
					}else{
						console.log(response);
						$.get('templates/app.html', function(html){
							var h = $(html),
								tempCode = h.find('#template_task_1').html(),
								markup = '';

							$.template('tasks', tempCode);

							for (var i = 0, j=response.tasks.length; i<j; i++){
								var task = response.tasks[i];
								markup += $.render(task, 'tasks');
							};

							$('.tasks').html(markup);
						})
					}
				}
			})

		});


	};
// ================== load contacts ================
	var loadContacts = function(){
		$.get('templates/app.html', function(html){
			var h = $(html);
			var appCode = h.find('#template_contact_page').html();
			$.template('app', appCode);		// compile template
			$.render(currentUser, 'app');		// use template
			container.html(appCode);

		});


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




