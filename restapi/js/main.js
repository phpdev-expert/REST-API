//store console data;
var consolesarray=Array();
//store game id
var Game_id;
var CON_ID=0;
var GM_ID=0;
var Uid=0;
var ntype;
var nref;
var nfor;
var upd;
var nid;
//set cahe on for all ajax request
 $.ajaxSetup({ cache: true });
// Retrieve  list when application starts 
findAll();
findAllGame();
loadUsers();
loadTiers();
loadUserBAn();



/**
*  @name:findAll
*  @params:non
*  @return:non
*  @uses:call api using  ajax and get console and call another two funtcion renderList findList 
*   
*/
function findAll() {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: apiURL+'/console',
		dataType: "json", // data type of response
		success: function(data){
			var res="";
			res=data;
			renderList(res);	
			findList(res);
			
		}
	});
}

/**
*  @name:findAllGame
*  @usesget all games and render on table
*  @params:non
*  @return:non
*  @desciption:call another  funtcion renderGameList finList 
*  call api using  ajax and get games
*/
function findAllGame() {
	console.log('findAllGame');
	$.ajax({
		type: 'GET',
		url: apiURL+'/game',
		dataType: "json", // data type of response
		success: function(data){
			var res="";
			res=data;
			renderGameList(res);	
			gameList(res);
			
		}
	});
}

/**
* @name:findList
* @uses: get all console list and set it on games form dropdown
* @param:xdata {{ jsone encode console list}}
* @return:none
*
*/
function findList(xdata) {
		var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
		var htm="<select id='console_ids'>";
		var html="<select id='console_idub'>";
		$.each(list, function(index, gameapp) {
			htm=htm+"<option value='"+gameapp.console_id+"'>"+gameapp.console_name+"</option>";
			html=html+"<option value='"+gameapp.console_id+"'>"+gameapp.console_name+"</option>";
		});
		htm=htm+"</select>";
		$('#console-drop').html(htm);
		html=html+"</select>";
		$('#cons_drop').html(html);
		var ghtm="<select id='updateGameconsole_id' onchange='updateGameconsole(this.value)'>";
		$.each(list, function(index, gameapp) {
		ghtm=ghtm+"<option value='"+gameapp.console_id+"'>"+gameapp.console_name+"</option>";
		});
		ghtm=ghtm+"</select>"
		$('#console-drop-game').html(ghtm);
	
}

/**
* @name:findList
* @uses: get all console list and set it on games form dropdown
* @param:xdata {{ jsone encode console list}}
* @return:none
*
*/

function gameList(xdata) {
		var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
		var htm="<select id='gamedrop_ids' onchange='seletedgame(this.value)'>"
		var htmx="<select id='game_idub'>"
		var htmn="<select id='game_idteam' onchange='loadTir(this.value)'> <option value='0'>--select games--</option>"
		var htmnt="<select id='game_idteam-t' onchange='loadTir(this.value)'> <option value='0'>--select games--</option>"
		htm=htm+"<option value='0'>--select games--</option>";
		$.each(list, function(index, gameapp) {
			$.each(gameapp.console, function(index,console) {
				consolesarray[console.console_id]=console.console_name;
			});
			htm=htm+"<option value='"+gameapp.console_id+"__"+gameapp.game_id+"'>"+gameapp.game_name+"</option>";
			htmx=htmx+"<option value='"+gameapp.game_id+"'>"+gameapp.game_name+"</option>";
			htmn=htmn+"<option value='"+gameapp.game_id+"'>"+gameapp.game_name+"</option>";
			htmnt=htmnt+"<option value='"+gameapp.game_id+"'>"+gameapp.game_name+"</option>";
		});
		htm=htm+"</select>"
		$('#game-drop-down').html(htm);
		$("#game-fr-down").html(htmn);
		  htmx=htmx+"</select>"
		$('#game_drop').html(htm);
		$('#game_drop_team').html(htmn+"</select>");
		
		$('#game_drop_team-x').html(htmnt+"</select>");
		
		
}
/**
* @name:seletedgame
* @uses: get console name from consolesarray
* @param:val
* @return:none
*
*/
function seletedgame(val){
	if(val){
		var cg=val.split('__');
	$('#console_nms').text(consolesarray[cg[0]]);
	$('#console_nms_div').show()
	}else{
			$('#console_nms_div').hide()
	}
	

}
/**
* @name:loadUsers
* @uses: get all user  list from api using ajax
* @param:none
* @return:none
*
*/
function loadUsers(){
	console.log('findAlluser');
	$.ajax({
		type: 'GET',
		url: apiURL+'/user',
		dataType: "json", // data type of response
		success: function(data){
			var res="";
			res=data;
			renderUser(res);	
		}
	});
	
}


/**
* @name:loadUsers
* @uses: get all user  list from api using ajax
* @param:none
* @return:none
*
*/
function loadTiers(){
	console.log('findAlluser');
	$.ajax({
		type: 'GET',
		url: apiURL+'/tiers',
		dataType: "json", // data type of response
		success: function(data){
			var res="";
			res=data;
			renderTiers(res);	
		}
	});
	
}

/**
* @name:loadUserBAn
* @uses: get all user  list from api using ajax
* @param:none
* @return:none
*
*/
function loadUserBAn(){
	console.log('findAlluser');
	$.ajax({
		type: 'GET',
		url: apiURL+'/userbans',
		dataType: "json", // data type of response
		success: function(data){
			var res="";
			res=data;
			renderUserBAn(res);	
		}
	});
	
}

/**
* @name:loadUserBAn
* @uses: get all user  list from api using ajax
* @param:none
* @return:none
*
*/
function editBanuser(id){
	$('input').val('');
	Uid=id;
	$('#update_b').show();
    $('#add_b').hide();
	$("#banusermodal").modal('show');
	console.log('findAlluser');
	$.ajax({
		type: 'GET',
		url: apiURL+'/userbans/'+id,
		dataType: "json", // data type of response
		success: function(xdata){
	var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
    var console="";	
	$.each(list, function(index, gameapp) {
		$("#ban_users_dropdown_data").val(gameapp.user_id);
		$("#ban_users_dropdown_data").chosen();
		$("#ban_users_dropdown_data").trigger('chosen:updated');
		$("#e_date").val(gameapp.ban_end);
		$("#s_date").val(gameapp.ban_start);
		$("#reason").val(gameapp.ban_reason);
		if(gameapp.ban_all>0){
			$('#limitban').val(0);
		}else if(gameapp.ban_console>0){
			$('#limitban').val(1);
			$('#user_b_1').show();
			$('#console_idub').val(gameapp.ban_console);
			
		}else{
			$('#limitban').val(2);
		    $('#user_b_2').show();
			$('#game_idub').val(gameapp.ban_game);
			
		}

		});
		}
	});
	
}


/**
* @name:loadGame
* @uses:hiperlink action to call games page
* @param:id
* @return:none
*
*/
function loadGame(id){
	$('.nav-tabs a[href=#game]').tab('show') ;
	 window.location.hash='game';
	$('tr').css({'background':'#f7f7f7'})
	$('#gm'+id).css({'background':'#51A351'})	
}

/**
* @name:loadConsole
* @uses:hiperlink action to call console page
* @param:id
* @return:none
*
*/
function loadConsole(id){

	$('.nav-tabs a[href=#console]').tab('show');
	 window.location.hash='console';
	$('tr').css({'background-color':'#f7f7f7'});
	$('tr#'+id).css({'background-color':'#51A351'})
}

/**
* @name:newConsole
* @uses:send request to api for creating new console using ajax
* @param:none
* @return:none
*
*/
function newConsole() {	
	console.log('addgameapp');
	$.ajax({
		type: 'POST',
		url: apiURL+'/console',
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
		   $.ambiance({message: "Console Added Succesfully!", 
            type: "success"});
			window.location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addgameapp error: ' + textStatus);
		}
	});
}


/**
* @name:deleteConsole
* @uses:send request to api for deleting  console using ajax
* @param:val console_id
* @return:none
*
*/
function deleteConsole(val) {
	console.log('deletegameapp');
	if(confirm("Are you sure to delete this record")){
	$.ajax({
		type: 'DELETE',
		url: apiURL + '/console/'+val,
		success: function(data, textStatus, jqXHR){
			$('#'+val).remove();
				$.ambiance({message: "Console Deleted Succesfully!", 
            type: "success"});
				},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on Console Delete !", 
            type: "error"});
		}
	});
			
	}
}


/**
* @name:deleteGame
* @uses:send request to api for deleting  game using ajax
* @param:val game_id
* @return:none
*
*/
function deleteGame(val) {
	console.log('deletegameapp');
	if(confirm("Are you sure to delete this record")){
	$.ajax({
		type: 'DELETE',
		url: apiURL + '/game/'+val,
		success: function(data, textStatus, jqXHR){
			$('#gm'+val).remove();
				$.ambiance({message: "Game Deleted Succesfully!", 
            type: "success"});
				},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on  Delete !", 
            type: "error"});
		}
	});
			
	}
}

/**
* @name:deleteGame
* @uses:send request to api for deleting  game using ajax
* @param:val game_id
* @return:none
*
*/
function deleteTiers(val) {
	console.log('deletegameapp');
	if(confirm("Are you sure to delete this record")){
	$.ajax({
		type: 'DELETE',
		url: apiURL + '/tiers/'+val,
		success: function(data, textStatus, jqXHR){
			$('#tier'+val).remove();
				$.ambiance({message: "Tiers Deleted Succesfully!", 
            type: "success"});
				},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on  Delete !", 
            type: "error"});
		}
	});
			
	}
}


/**
* @name:deleteGame
* @uses:send request to api for deleting  game using ajax
* @param:val game_id
* @return:none
*
*/
function deleteBanuser(val) {
	console.log('deletegameapp');
	if(confirm("Are you sure to delete this record")){
	$.ajax({
		type: 'DELETE',
		url: apiURL + '/userbans/'+val,
		success: function(data, textStatus, jqXHR){
			$('#uban'+val).remove();
				$.ambiance({message: "User bans Deleted Succesfully!", 
            type: "success"});
				},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on  Delete !", 
            type: "error"});
		}
	});
			
	}
}

/**
* @name:renderList
* @uses:render console data to table from json
* @param:xdata
* @return:none
*
*/
function renderList(xdata) {
$.fn.editable.defaults.mode = 'inline';
var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
var games="";	
	$.each(list, function(index, gameapp) {
	games="";	
	$.each(gameapp.game, function(index,game) {
		games=games+"<span class='v-space' onclick=loadGame('"+game.game_id+"')>"+game.game_name+"</span>,";
		});
		var checkme;
		if(gameapp.active==1){
			 checkme="checked ='true'";
		}else{
			 checkme="";
		}
	$('#console-body').append('<tr class="remove-tr" id="'+gameapp.console_id+'"><td><span id="td_'+gameapp.console_id+'">'+gameapp.console_name+'</span> <span onclick="editCn('+gameapp.console_id+',event)" class="ope opee"><i class="icon-edit"></i>edit</span></td><td id="tdac_'+gameapp.console_id+'"><input type="checkbox" '+checkme+' onclick=updateactive('+gameapp.console_id+',this.checked)> active</td><td>'+games+'</td></td><td><span class="ope" onclick="deleteConsole('+gameapp.console_id+')"><i class="icon-trash"></i>Delete</span></td></tr>');
	$('#td_'+gameapp.console_id).editable({
							type: 'text',
							success: function(response, newValue) {
							var dat=JSON.stringify({
							"console_name":newValue, 
							});
							var jsn= '{"console": '+dat+'}';
							updateConsol(apiURL+'/console/'+gameapp.console_id,jsn);
							},
							url:apiURL+'/'+gameapp.console_id 
							});
	});

		tablsdata('console_table_grid');
	
	
}

/**
* @name:editCn
* @uses:toggle inline edit of console 
* @param:id,e {{console_id,event}}
* @return:none
*
*/
function editCn(id,e){
	e.stopPropagation();
	e.preventDefault();
	$('#td_'+id).editable('toggle');
}


/**
* @name:editTr
* @uses:toggle inline edit of tiers 
* @param:id,e {{tier_id,event}}
* @return:none
*
*/
function editTr(id,e){
	e.stopPropagation();
	e.preventDefault();
	$('#'+id).editable('toggle');
}

/**
* @name:editUB
* @uses:toggle inline edit of tiers 
* @param:id,e {{editale_id,event}}
* @return:none
*
*/
function editUB(id,e){
	e.stopPropagation();
	e.preventDefault();
	$('#'+id).editable('toggle');
}




/**
* @name:renderUser
* @uses:render user data to table from json
* @param:xdata
* @return:none
*
*/
function renderUser(xdata){
	var trs="";
	var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
    var console="";	
	var drop=""
	var drop2=""
	var drop3="";
	$.each(list, function(index, gameapp) {
		trs=trs+'<tr><td>'+gameapp.user_login+'</td><td>'+gameapp.user_nicename+'</td><td>'+gameapp.user_email+'</td></tr>';
		drop=drop+"<option value='"+gameapp.ID+"'>"+gameapp.user_login+"</option>";
		drop2=drop2+"<option value='"+gameapp.ID+"'>"+gameapp.user_login+"</option>";
		drop3=drop3+"<option value='"+gameapp.ID+"'>"+gameapp.user_login+"</option>";
    });
	drop="<select id='ban_users_dropdown_data' style='width:220px'  class='chosen-select'>"+drop+"</select>";
	
	drop2="<select id='users_dropdown_data_team' multiple style='width:220px'  class='chosen-select'>"+drop2+"</select>";
	drop3="<select id='users_dropdown_data_teamm' multiple style='width:220px'  class='chosen-select'>"+drop3+"</select>";
	$('#user-drop-down').html(drop);
	$('#user-drop-down-team').html(drop2);
	$('#user-drop-down-teamm').html(drop3);
	$('#user-body').html(trs)
	tablsdata('user_table_grid');
	setTimeout(function(){
	    $("#ban_users_dropdown_data").chosen({"width":"220px"});
		$("#users_dropdown_data_team").chosen({"width":"220px"});
		$("#users_dropdown_data_teamm").chosen({"width":"220px"});
	},800)
	
}


/**
* @name:renderUser
* @uses:render user data to table from json
* @param:xdata
* @return:none
*
*/
function renderTiers(xdata){
	$.fn.editable.defaults.mode = 'inline';
	var checkme='';
	var trs="";
	var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
    var console="";	
	$.each(list, function(index, gameapp) {
		if(gameapp.active==1){
			 checkme="checked ='true'";
		}else{
			 checkme="";
		}
		trs='<tr id="tier'+gameapp.tier_id+'" ><td>'+gameapp.console_name+'</td><td>'+gameapp.game_name+'</td><td><span data-name="console_namex" id="tdtir_'+gameapp.tier_id+'">'+gameapp.tier_name+'</span> <span onclick=editTr("tdtir_'+gameapp.tier_id+'",event) class="ope opee"><i class="icon-edit"></i>edit</span></td><td><span id="tdtirso_'+gameapp.tier_id+'">'+gameapp.sort_order+'</span> <span onclick=editTr("tdtirso_'+gameapp.tier_id+'",event) class="ope opee"><i class="icon-edit"></i>edit</span></td><td><input type="checkbox" '+checkme+' onclick=updatetieractive('+gameapp.tier_id+',this.checked)> active</td><td><span class="ope" onclick="deleteTiers('+gameapp.tier_id+')"><i class="icon-trash"></i>Delete</span></td></tr>';
		$('#tiers-body').append(trs);
		
			$('#tdtir_'+gameapp.tier_id).editable({
							type: 'text',
							success: function(response, newValue) {
							var dat=JSON.stringify({
							"tier_name":newValue, 
							});
							var jsn= '{"tier": '+dat+'}';
							updateTier(apiURL+'/tiers/'+gameapp.tier_id,jsn);
							},
							url:apiURL+'tiers/'+gameapp.tier_id 
							});
							
							$('#tdtirso_'+gameapp.tier_id).editable({
							type: 'text',
							success: function(response, newValue) {
							var dat=JSON.stringify({
							"sort_order":newValue, 
							});
							var jsn= '{"tier": '+dat+'}';
							updateTier(apiURL+'/tiers/'+gameapp.tier_id,jsn);
							},
							url:apiURL+'/'+gameapp.tier_id 
							});
    });
	
	tablsdata('tiers_table_grid');
}

/**
* @name:renderUser
* @uses:render user data to table from json
* @param:xdata
* @return:none
*
*/
function renderUserBAn(xdata){
	$.fn.editable.defaults.mode = 'inline';
	var checkme='';
	var trs="";
	var limits="";
	var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
    var console="";	
	$.each(list, function(index, gameapp) {
		limits=""
		if(gameapp.active==1){
			 checkme="checked ='true'";
		}else{
			 checkme="";
		}
		
		if(gameapp.type=='Console'){
			
			    limits="<span class='hesd-spaz'>Console : </span>"+gameapp.console.console_name+"<br><span><span class='hesd-spaz'>Games :</span>";
				
				$.each(gameapp.limits, function(index, lim){
					limits=limits+lim.game_name+",";					
					});
			
			
		}
		else if(gameapp.type=='Game'){
			    limits="<span class='hesd-spaz'>Game : </span>";
				$.each(gameapp.limits, function(index, lim) {
					limits=limits+lim.game_name+",";
					});
		}else{
			limits="N/A";
		}
		trs='<tr id="uban'+gameapp.ban_id+'"><td>'+gameapp.user_id.user_login+'</td><td>'+gameapp.type+'</td><td>'+limits+'</td><td><span data-name="console_namex" id="tdub_'+gameapp.ban_id+'">'+gameapp.ban_start+'</span> <span onclick=editUB("tdub_'+gameapp.ban_id +'",event) class="ope opee"><i class="icon-edit"></i>edit</span></td><td><span id="tdube_'+gameapp.ban_id +'">'+gameapp.ban_end+'</span> <span onclick=editTr("tdube_'+gameapp.ban_id+'",event) class="ope opee"><i class="icon-edit"></i>edit</span></td><td>'+gameapp.ban_reason+'</td><td>'+gameapp.banned_by.user_login+'</td><td><span onclick=manage_notes(2,'+gameapp.ban_id+',"userbans") class="ope"><i class="icon-tasks"></i>manage notes</span></td><td><span class="ope" onclick="deleteBanuser('+gameapp.ban_id+')"><i class="icon-trash"></i>Delete</span>&nbsp;&nbsp;<span class="ope" onclick="editBanuser('+gameapp.ban_id+')"><i class="icon-edit"></i>Edit</span></td></tr>';
		$('#userban-body').append(trs);
			$('#tdub_'+gameapp.ban_id ).editable({
							type: 'date',
							format:'dd/mm/yyyy',
							success: function(response, newValue) {
							var dat=JSON.stringify({
							"ban_start":newValue, 
							});
							var jsn= '{"userban": '+dat+'}';
							updateUserban(apiURL+'/userbans/'+gameapp.ban_id ,jsn);
							},
							url:apiURL+'userbans/'+gameapp.ban_id  
							});
							
							$('#tdube_'+gameapp.ban_id).editable({
							type: 'date',
							format:'dd/mm/yyyy',
							success: function(response, newValue) {
							//var nd= newValue.split('-')
							var dat=JSON.stringify({
							"ban_end":newValue, 
							});
							var jsn= '{"userban": '+dat+'}';
							updateUserban(apiURL+'/userbans/'+gameapp.ban_id ,jsn);
							},
							url:apiURL+'/'+gameapp.ban_id  
							});
    });
	
	tablsdata('banuser_table_grid');
}
/**
* @name:renderGameList
* @uses:render user data to table from json
* @param:xdata
* @return:none
*
*/
function renderGameList(xdata) {
$.fn.editable.defaults.mode = 'inline';
var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
var console="";	
	$.each(list, function(index, gameapp) {
	consoles="";
$.each(gameapp.console, function(index,console) {
	
		consoles=consoles+"<span id='cnm_"+gameapp.game_id+"' class='v-space' onclick=loadConsole('"+console.console_id+"')>"+console.console_name+"</span><span id='gamec_"+gameapp.game_id+"' onclick='editGcon("+gameapp.game_id+")' class='ope opee'><i class='icon-edit'></i>edit</span>";
		});
		var checkme;
		if(gameapp.active==1){
			 checkme="checked ='true'";
		}else{
			 checkme="";
		}
	$('#console-game').append('<tr class="remove-tr" id="gm'+gameapp.game_id+'"><td><span id="tdgm_'+gameapp.game_id+'" data-name="console_namex" >'+gameapp.game_name+'</span> <span onclick="editGm('+gameapp.game_id+',event)" class="ope opee"><i class="icon-edit"></i>edit</span></td><td id="tdac_'+gameapp.game_id+'"><input type="checkbox" '+checkme+' onclick=updategameactive('+gameapp.game_id+',this.checked)> active</td><td>'+consoles+'</td></td><td><span class="ope" onclick="deleteGame('+gameapp.game_id+')"><i class="icon-trash"></i>Delete</span></td></tr>');
	$('#tdgm_'+gameapp.game_id).editable({
							type: 'text',
							success: function(response, newValue) {
							var dat=JSON.stringify({
							"game_name":newValue, 
							});
							var jsn= '{"game": '+dat+'}';
							updateGame(apiURL+'/game/'+gameapp.game_id,jsn);
							},
							url:apiURL+'/'+gameapp.game_id 
							});
	});

		tablsdata('game_table_grid');
	
	
}

/**
* @name:editGm
* @uses:toggle inline edit of game 
* @param:id,e {{game_id,event}}
* @return:none
*
*/
function editGm(id,e){
	e.stopPropagation();
	e.preventDefault();
	$('#tdgm_'+id).editable('toggle');
}

/**
* @name:updateactive
* @uses:update console active status using api 
* @param:id,staus {{console_id,active-1:inactive-0}}
* @return:none
*
*/
function updateactive(id,status){
	var val=1;
	if(status){
		val=1;
	}else{
		val=0;
	}
	 var dat=JSON.stringify({
		"active":val, 
		});
		
		var jsn= '{"console": '+dat+'}';
	updateConsol(apiURL+'/console/'+id,jsn);
}

/**
* @name:updatetieractive
* @uses:update tier active status using api 
* @param:id,staus {{tier_id,active-1:inactive-0}}
* @return:none
*
*/
function updatetieractive(id,status){
	var val=1;
	if(status){
		val=1;
	}else{
		val=0;
	}
	 var dat=JSON.stringify({
		"active":val, 
		});
		
		var jsn= '{"tier": '+dat+'}';
	updateTier(apiURL+'/tiers/'+id,jsn);
}

/**
* @name:updategameactive
* @uses:update game active status using api 
* @param:id,staus {{game_id,active-1:inactive-0}}
* @return:none
*
*/
function updategameactive(id,status){
	var val=1;
	if(status){
	val=1;
	}else{
	val=0;
	}
		 var dat=JSON.stringify({
		"active":val, 
		});
		
		var jsn= '{"game": '+dat+'}';
		
	updateGame(apiURL+'/game/'+id,jsn);
}

/**
* @name:updateGameconsole
* @uses:update game console_id  using api 
* @param:val {{console_id}}
* @return:none
*
*/
function updateGameconsole(val){
	 var dat=JSON.stringify({
		"console_id":val, 
		});
	var jsn= '{"game": '+dat+'}';	
	updateGame(apiURL+'/game/'+Game_id,jsn);
	$('.popover ').hide(100);
	var text =$('#updateGameconsole_id option:selected').text();
	$('#cnm_'+Game_id).text(text);
}


/**
* @name:updateGame
* @uses:update game acording passed params 
* @param:urs,dt {{api url,json encoded data}}
* @return:none
*
*/
function updateGame(urs,dt){

	$.ajax({
		   url:urs,
		   type: 'put',
		   data:dt,
		   success:function(data){
		   	$.ambiance({message: "Game Updated Succesfully!", 
            type: "success"});
		   }
	})
}

/**
* @name:updateTier
* @uses:update game acording passed params 
* @param:urs,dt {{api url,json encoded data}}
* @return:none
*
*/
function updateTier(urs,dt){

	$.ajax({
		   url:urs,
		   type: 'put',
		   data:dt,
		   success:function(data){
		   	$.ambiance({message: "Tier Updated Succesfully!", 
            type: "success"});
		   }
	})
}

/**
* @name:updateUserban
* @uses:update Userban acording passed params 
* @param:urs,dt {{api url,json encoded data}}
* @return:none
*
*/
function updateUserban(urs,dt){

	$.ajax({
		   url:urs,
		   type: 'put',
		   data:dt,
		   success:function(data){
		   	$.ambiance({message: "Userban Updated Succesfully!", 
            type: "success"});
		   }
	})
}

/**
* @name:updateConsol
* @uses:update console acording passed params 
* @param:urs,dt {{api url,json encoded data}}
* @return:none
*
*/
function updateConsol(urs,dt){

	$.ajax({
		   url:urs,
		   type: 'put',
		   data:dt,
		   success:function(data){
		   	$.ambiance({message: "Console Updated Succesfully!", 
            type: "success"});
		   }
	})
}


/**
* @name:newGame
* @uses:send request to api for creating new game using ajax
* @param:none
* @return:none
*
*/
function newGame(){
	
$.ajax({
		type: 'POST',
		url:apiURL+'/game',
		data: formToJSONG(),
		success: function(data, textStatus, jqXHR){
			$('input').val('');
		   $.ambiance({message: "Game Added Succesfully!", 
            type: "success"});
			window.location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on adding game!", 
            type: "success"});
		
		}
	});
}


/**
* @name:newGame
* @uses:send request to api for creating new game using ajax
* @param:none
* @return:none
*
*/
function saveTiers(){
$.ajax({
		type: 'POST',
		url:apiURL+'/tiers',
		data: formToJSONT(),
		success: function(data, textStatus, jqXHR){
			$('input').val('');
		   $.ambiance({message: "Tiers Added Succesfully!", 
            type: "success"});
			
			window.location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on adding Tiers!", 
            type: "success"});
		
		}
	});
}

/**
* @name:newGame
* @uses:send request to api for creating new game using ajax
* @param:none
* @return:none
*
*/
function saveUserbans(){
$.ajax({
		type: 'POST',
		url:apiURL+'/userbans',
		data: formToJSONUB(),
		success: function(data, textStatus, jqXHR){
			$('input').val('');
		   $.ambiance({message: "User Banned Succesfully!", 
            type: "success"});
			window.location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on submiting!", 
            type: "success"});
		
		}
	});
}


/**
* @name:newGame
* @uses:send request to api for creating new game using ajax
* @param:none
* @return:none
*
*/
function save_Userbans(){
$.ajax({
		type: 'PUT',
		url:apiURL+'/userbans/'+Uid,
		data: formToJSONUB(),
		success: function(data, textStatus, jqXHR){
			$('input').val('');
		   $.ambiance({message: "User Banned Updated Succesfully!", 
            type: "success"});
			window.location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on submiting!", 
            type: "success"});
		
		}
	});
}


/**
* @name:editGcon
* @uses:open popover for editing console of game
* @param:gid
* @return:none
*
*/
function editGcon(gid){
	Game_id=gid;
	$('#gamec_'+gid).popover({
		placement : 'right',
		trigger: 'manual',
		animation:true,
		html:true,
		title : 'Select Console <span style="margin-left:105px" title="close"  onclick="close_this('+gid+')"><i class=" icon-remove-circle"></span>',
		content :$('#console-drop-game').html()
		});		
		$('#gamec_'+gid).popover('show');
		setTimeout(function(){	
		$('#gamec_'+gid).popover('hide');	
		},15000)
		
}
/**
* @name:close_this
* @uses:close open popover
* @param:gid
* @return:none
*
*/
function close_this(gid){
	$('#gamec_'+gid).popover('hide');
}

/**
* @name:formToJSON
* @uses:convert console form data to json
* @param:none
* @return:console form  to json encode
*
*/
function formToJSON() {
	 var dat=JSON.stringify({
		"console_name": $('#console_name').val(), 
		});
		
		return '{"console": '+dat+'}';
}
/**
* @name:formToJSONG
* @uses:convert game form data to json
* @param:none
* @return:game form  to json encode
*
*/
function formToJSONG() {
	var jsn= JSON.stringify({
		"game_name": $('#game_name').val(), 
		"console_id": $('#console_ids').val(), 
		});
		return '{"game": '+jsn+'}';	
}

/**
* @name:formToJSONT
* @uses:convert tiers form data to json
* @param:none
* @return:tiers form  to json encode
*
*/
function formToJSONT() {
	var gid=$('#gamedrop_ids').val().split('__');
	var jsn= JSON.stringify({
		"tier_name": $('#tier_name').val(), 
		"game_id":gid[1], 
		"sort_order": $('#sort_order').val(), 
		});
		return '{"tier": '+jsn+'}';	
}



/**
* @name:formToJSONUB
* @uses:convert userban form data to json
* @param:none
* @return:userban form  to json encode
*
*/
function formToJSONUB() {
	var val=$('#limitban').val()
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
		CON_ID=0;
		GM_ID=0;
	}
	
	var All="";
	var con="";
	var gm="";
	if($('#limitban').val()==0){
	con=0;
	gm=0;
		All=1;
	}else{
		con=CON_ID;
	    gm=GM_ID;
		All=0;
	}
	var sdate="";
	var edate="";
	var ss=$('#s_date').val().split('/');
	var ee=$('#e_date').val().split('/');
	sdate=ss[2]+'-'+ss[1]+'-'+ss[0];
	edate=ee[2]+'-'+ee[1]+'-'+ee[0];
	var jsn= JSON.stringify({
		"user_id":$('#ban_users_dropdown_data').val(),
		"ban_all":All,
		"ban_console":con,
		"ban_game":gm,
		"ban_start":sdate,
		"ban_end":edate,
		"ban_reason":$('#reason').val(),
		"banned_by" :1
		});
		return '{"userban": '+jsn+'}';	
}

/**
* @name:tablsdata
* @uses:aplly tale shorter on given table in params
* @param:idsx{{tables id}}
* @return:none
*
*/
function tablsdata(idsx){
		$.extend($.tablesorter.themes.bootstrap, {
		// these classes are added to the table. To see other table classes available,
		// look here: http://twitter.github.com/bootstrap/base-css.html#tables
		table      : 'table table-bordered',
		header     : 'bootstrap-header', // give the header a gradient background
		footerRow  : '',
		footerCells: '',
		icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
		sortNone   : 'bootstrap-icon-unsorted',
		sortAsc    : 'icon-chevron-up',
		sortDesc   : 'icon-chevron-down',
		active     : '', // applied when column is sorted
		hover      : '', // use custom css here - bootstrap class may not override it
		filterRow  : '', // filter row class
		even       : '', // odd row zebra striping
		odd        : ''  // even row zebra striping
	});

	// call the tablesorter plugin and apply the uitheme widget
	$("#"+idsx).tablesorter({
		// this will apply the bootstrap theme if "uitheme" widget is included
		// the widgetOptions.uitheme is no longer required to be set
		theme : "bootstrap",

		widthFixed: true,

		headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!

		// widget code contained in the jquery.tablesorter.widgets.js file
		// use the zebra stripe widget if you plan on hiding any rows (filter widget)
		widgets : [ "uitheme", "filter", "zebra" ],

		widgetOptions : {
			// using the default zebra striping class name, so it actually isn't included in the theme variable above
			// this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
			zebra : ["even", "odd"],

			// reset filters button
			filter_reset : ".reset"

			// set the uitheme widget to use the bootstrap theme class names
			// this is no longer required, if theme is set
			// ,uitheme : "bootstrap"

		}
	})
	.tablesorterPager({

		// target the pager markup - see the HTML block below
		container: $(".pager"+idsx),

		// target the pager page select dropdown - choose a page
		cssGoto  : ".pagenum"+idsx,

		// remove rows from the table to speed up the sort of large tables.
		// setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
		removeRows: false,

		// output string - default is '{page}/{totalPages}';
		// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
		output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'

	});

}

function manage_notes(type,ref,nf){
	tinyMCE.get('notesdetail').setContent('');
	 ntype=type;
     nref=ref;
	 nfor=nf
	$('#notesmodel').modal('show');
	loadnotes(nfor,ref);
}

function loadnotes(fromd,ref){
	
	 upd=0;
	$.ajax({
		type: 'GET',
		url: apiURL+'/'+fromd+'/'+ref,
		dataType: "json", // data type of response
		success: function(xdata){
	$('.notes_list_ul').empty();
	var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
    var console="";	
	$.each(list, function(index, gameapp) {
	$.each(gameapp.notes, function(index, gameappx) {
$('.notes_list_ul').append('<li  id="nnt'+gameappx.note_id+'" class="list-group-item" style="border: 1px solid #aaa;padding: 5px;margin:5px"><div>'+gameappx.note+'</div><div class="mic-info">By: <a href="#">Paul</a> on '+gameappx.entered_time+'</div><div style="text-align: right;margin-right: 25px"><div class="action"><span onclick="edtnote('+gameappx.note_id+')" title="Edit"><i class="icon icon-pencil"></i>Edit</span> &nbsp;&nbsp;<span onclick="delnote('+gameappx.note_id+')"  title="Delete"><i class="icon icon-trash"></i>Delete</span></div></div></li>');
	});
		});
		}
	});
}

function addnotes(){
	
	var dat=JSON.stringify({
							"note":tinyMCE.get('notesdetail').getContent(),
							"note_type":ntype, 
							"note_ref":nref, 
							"user_id":user_id,
							});
							var jsn= '{"note": '+dat+'}';
							//updateTeam(apiURL+'/teams/'+team_id,jsn);
	if(upd){
		$.ajax({
		url:apiURL+'/notes/'+nid,
		data:jsn,
		type:'PUT',
		success:function(data){
			$.ambiance({message: "Notes Updated Succesfully!", 
            type: "success"});
			tinyMCE.get('notesdetail').setContent('');
		loadnotes(nfor,nref);
		}
	})	
	}else{
	$.ajax({
		url:apiURL+'/notes',
		data:jsn,
		type:'POST',
		success:function(data){
			$.ambiance({message: "Notes Added Succesfully!", 
            type: "success"});
			tinyMCE.get('notesdetail').setContent('');
		loadnotes(nfor,nref);
		}
	})
	}
	
}

function delnote(val) {
	console.log('deletegameapp');
	if(confirm("Are you sure to delete this record")){
	$.ajax({
		type: 'DELETE',
		url: apiURL + '/notes/'+val,
		success: function(data, textStatus, jqXHR){
			$('#nnt'+val).remove();
				$.ambiance({message: "Notes Deleted Succesfully!", 
            type: "success"});
				},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on  Delete !", 
            type: "error"});
		}
	});
			
	}
}

function edtnote(id) {
	nid=id;
	$.ajax({
		url:apiURL+'/notes/'+id,
		type:'get',
		dataType:'json',
		success:function(xdata){
		var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
			$.each(list, function(index, gameapp) {
		tinyMCE.get('notesdetail').setContent(gameapp.note);
		ntype=gameapp.note_type;
        nref=gameapp.note_ref;
		})
      
		 upd=1;
		}
	})
}