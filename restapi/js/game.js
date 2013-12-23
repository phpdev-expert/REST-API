 //called when dom ready
 jQuery(document).ready(function ($) {
		if(window.location.hash=='' || window.location.hash==undefined){
		   window.location.hash='user';	
		}
		// apply tabs
        $('#tabs').tab();
		//set click on tabs
		 $('#tabs').bind('click', function (e) {
		 if(e.target.hash!=undefined){
		 window.location.hash = e.target.hash;
		var has=e.target.hash.replace('#','');	
		 }                          
      });
	
	        var url = document.location.toString();
			if (url.match('#')) {
			$('.nav-tabs a[href=#'+url.split('#')[1]+']').tab('show') ;
	  }
	  //called when window hashchange 
		$(window).on('hashchange', function() {
			var url = document.location.toString();
			if (url.match('#')) {
			$('.nav-tabs a[href=#'+url.split('#')[1]+']').tab('show') ;
			} 
		});
		
		/*$('#s_date').datepicker({autoclose:true,todayBtn:false});
		$('#e_date').datepicker({autoclose:true,todayBtn:false});*/
		    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
     var nxt = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate()+7, 0, 0, 0, 0); 
     $('#s_date').datepicker({
	    format:'dd/mm/yyyy',
      });
	 $('#e_date').datepicker({
	   format:'dd/mm/yyyy',
      });
	
	/*$('#s_date').val(now);
	$('#e_date').val(nxt);*/
    });

/**
*  @name:addConsole
*  @params:non
*  @return:false
*  @uses:validate form and submit form data 
*   
*/
function addConsole(){
		$('#console-form').validate();
		if($('#console-form').valid()){
			newConsole();
	        return false;
		}
	}

/**
*  @name:addGame
*  @params:non
*  @return:false
*  @uses:validate form and submit form data 
*   
*/
function addGame(){
		$('#game-form').validate();
		if($('console_ids').val()==''){
			$.ambiance({message: "Please select Console", 
            type: "error"});
			return false;
		}
		if($('#game-form').valid()){
			newGame();
	        return false;
		}
	}
	
	/**
*  @name:addGame
*  @params:non
*  @return:false
*  @uses:validate form and submit form data 
*   
*/
function addTires(){
		$('#tiers-form').validate();
		if($('#gamedrop_ids').val()==0){
			$.ambiance({message: "Please select Game", 
            type: "error"});
			return false;
		}
		if($('#tiers-form').valid()){
		
			saveTiers();
	        return false;
		}
	}
	
		/**
*  @name:addGame
*  @params:non
*  @return:false
*  @uses:validate form and submit form data 
*   
*/
function addBanuser(){
		$('#ban_users-form').validate();
		if($('#ban_users-form').valid()){
			saveUserbans();

	        return false;
		}
	}
	
	
	function updateBanuser(){
		$('#ban_users-form').validate();
		if($('#ban_users-form').valid()){
			save_Userbans();

	        return false;
		}
	}
	
	
	function getLimits(val){
	if(val==1){
		$('#user_b_2').hide()
		$('#user_b_1').show()
		CON_ID=$('#console_idub').val();
		GM_ID=0;
	}else if(val==2){
		$('#user_b_1').hide()
		$('#user_b_2').show()
		CON_ID=0;
		GM_ID=$('#game_idub').val();
	}else{
		$('#user_b_1').hide()
		$('#user_b_2').hide()
		$('#console_idub').val('');
		$('#game_idub').val('');
	}	
		
	}
	
	tinymce.init({selector:'textarea'});