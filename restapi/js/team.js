var Team_ID;

findAllT();
/**
*  @name:findAllT
*  @params:non
*  @return:non
*  @uses:call api using  ajax and get console and call another two funtcion renderList findList 
*   
*/
function findAllT() {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: apiURL+'/teams',
		dataType: "json", // data type of response
		success: function(data){
			var res="";
			res=data;
			renderListT(res);			
			teamDrop(res);	
		}
	});
}

/**
* @name:renderListT
* @uses:render console data to table from json
* @param:xdata
* @return:none
*
*/
function renderListT(xdata) {
$.fn.editable.defaults.mode = 'inline';
var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
var games="";	
var teamm="";
	$.each(list, function(index, gameapp) {
		teamm="";
		$.each(gameapp.team_mem, function(index,team_mem) {
		if(gameapp.captain_user_id==team_mem.user_id){
			
			teamm=teamm+"<span id='teamm_"+team_mem.team_member_id+"'><div class='udiv' style='width:100px;float:left;overflow:hidden;color:#297626'>"+team_mem.user_login+"</div><span onclick='setcapt("+team_mem.user_id+","+gameapp.team_id+","+team_mem.team_member_id+")' class='ope  opee' title='set as captain'><i class='icon-star'></i></span><span onclick='deleteTemmem("+team_mem.team_member_id+")' class='ope  opee'><i class='icon-trash'></i></span></span><br>";
		}else{
		teamm=teamm+"<span  id='teamm_"+team_mem.team_member_id+"'><div class='udiv' id='cpat_"+team_mem.user_id+"-"+team_mem.team_id+"' style='width:100px;float:left;overflow:hidden'>"+team_mem.user_login+"</div> <span onclick='setcapt("+team_mem.user_id+","+gameapp.team_id+","+team_mem.team_member_id+")' class='ope  opee' title='set as captain'><i class='icon-star'></i></span> <span onclick='deleteTemmem("+team_mem.team_member_id+")' class='ope  opee' ><i class='icon-trash'></i></span> </span><br>";
		}
		
		});
		
	$('#team-body').append('<tr class="remove-tr" id="team'+gameapp.team_id+'"> <td>'+gameapp.console.console_name+'</td> <td>'+gameapp.game_id.game_name+'</td> <td><span id="tdx_'+gameapp.team_id+'">'+gameapp.team_name+'</span> <span onclick="editTm('+gameapp.team_id+',event)" class="ope opee"><i class="icon-edit"></i>edit</span></td><td>'+gameapp.tier.tier_name+'&nbsp; <span class="ope" onclick="edtTeam('+gameapp.team_id+','+gameapp.tier.tier_id+','+gameapp.game_id.game_id+')"><i class="icon-edit"></i>Edit</span></td><td>'+teamm+'<br><span onclick="add_mem('+gameapp.team_id+')"><i class="icon-plus"></i>Member</span></td><td><span class="ope" onclick="deleteTeam('+gameapp.team_id+')"><i class="icon-trash"></i>Delete</span> &nbsp; </td></tr>');
	$('#tdx_'+gameapp.team_id).editable({
							type: 'text',
							success: function(response, newValue) {
							var dat=JSON.stringify({
							"team_name":newValue, 
							});
							var jsn= '{"team": '+dat+'}';
							updateTeam(apiURL+'/teams/'+gameapp.team_id,jsn);
							},
							url:apiURL+'/'+gameapp.console_id 
							});
	});

		tablsdata('team_table_grid');
	
	
}

function loadTir(val)
{
	$.ajax({
			type: 'GET',
			url: apiURL+'/tiers/'+val,
			dataType: "json", 
			async:false,
			success: function(data)
			{
				var xdata="";
				xdata=data;
				var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
				var htm="<select id='team_tire'><option value='0'>--select Tire--</option>";
				var htmn="<select id='team_tire_c'><option value='0'>--select Tire--</option>";
					var htmnt="<select id='team_tire_c-t'><option value='0'>--select Tire--</option>";	
					
				$.each(list, function(index, gameapp)
					{
						htm=htm+"<option value='"+gameapp.tier_id+"'>"+gameapp.tier_name+"</option>";
						htmn=htmn+"<option value='"+gameapp.tier_id+"'>"+gameapp.tier_name+"</option>";
						htmnt=htmnt+"<option value='"+gameapp.tier_id+"'>"+gameapp.tier_name+"</option>";
					});
				htm=htm+"</select>";
					htm=htm+"</select>";
				$('#tirs_lists').show();
				$("#tier_drop_team").html(htm);
				
				$("#riers-drop-down-c").html(htmn);
				
				$("#tier_drop_team-x").html(htmnt);
				
				
				
				
			}
		});


}

function add_userTo(val){
	//alert(val);
	//var text =$('#updateGameconsole_id option:selected').text();
}


	/**
*  @name:addGame
*  @params:non
*  @return:false
*  @uses:validate form and submit form data 
*   
*/
function addTeam(){
		$('#team-form').validate();
		if(!$("#users_dropdown_data_team").val()){
			$.ambiance({message: "Please select User", 
            type: "error"});
			return false;
		}else if($("#game_idteam").val()==0){
			$.ambiance({message: "Please select a game", 
            type: "error"});
			return false;
		}else if($("#team_tire").val()==0){
			$.ambiance({message: "Please select a Tier", 
            type: "error"});
			return false;
		}
		if($('#team-form').valid()){
			saveTeam();
	        return false;
		}
	}
	
function updateTTeam(){
	
	
	 if($("#game_idteam-t").val()==0){
			$.ambiance({message: "Please select a game", 
            type: "error"});
			return false;
		}else if($("#team_tire_c-t").val()==0){
			$.ambiance({message: "Please select a Tier", 
            type: "error"});
			return false;
		}else{
			update_ntier();
		}
}

function update_ntier(){
		var jsn= JSON.stringify({
		"tier_id":$('#team_tire_c-t').val(), 
		});
		
		var dt='{"team": '+jsn+'}';	
		
		var urs=apiURL+'/teamtiers/'+Team_ID
		
		
	$.ajax({
		   url:urs,
		   type: 'put',
		   data:dt,
		   success:function(data){
		   	$.ambiance({message: "Team Updated Succesfully!", 
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
function saveTeam(){
$.ajax({
		type: 'POST',
		url:apiURL+'/teams',
		data: formToJSONTe(),
		success: function(data, textStatus, jqXHR){
		   $.ambiance({message: "Team Added Succesfully!", 
            type: "success"});
			window.location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on adding Team!", 
            type: "success"});
		
		}
	});
}

	
	function formToJSONTe() {
	var gid=$('#game_idteam').val();
	var jsn= JSON.stringify({
		"team_name":$('#team_nm').val(), 
		"game_id":gid, 
		"team_member":$('#users_dropdown_data_team').val(),
		"tier_id": $('#team_tire').val(), 
		});
		return '{"team": '+jsn+'}';	
}

function updateTeam(urs,dt){
	$.ajax({
		   url:urs,
		   type: 'put',
		   data:dt,
		   success:function(data){
		   	$.ambiance({message: "Team Updated Succesfully!", 
            type: "success"});
		   }
	})
}

function editTm(id,e){
	e.stopPropagation();
	e.preventDefault();
	$('#tdx_'+id).editable('toggle');
}

/**
* @name:deleteGame
* @uses:send request to api for deleting  game using ajax
* @param:val game_id
* @return:none
*
*/
function deleteTeam(val) {
	console.log('deletegameapp');
	if(confirm("Are you sure to delete this record")){
	$.ajax({
		type: 'DELETE',
		url: apiURL + '/teams/'+val,
		success: function(data, textStatus, jqXHR){
			$('#team'+val).remove();
				$.ambiance({message: "Team Deleted Succesfully!", 
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
function deleteTemmem(val) {
	console.log('deleteTemmem');
	if(confirm("Are you sure to delete this record")){
	$.ajax({
		type: 'DELETE',
		url: apiURL + '/teammembers/'+val,
		success: function(data, textStatus, jqXHR){
			$('#teamm_'+val).remove();
				$.ambiance({message: "Team Member Deleted Succesfully!", 
            type: "success"});
				},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on  Delete !", 
            type: "error"});
		}
	});
			
	}
}



function setcapt(value,team_id){

	$('.udiv').css({'color':'#000'});
	$('#cpat_'+value+'-'+team_id).css({'color':'#297626'});
	var dat=JSON.stringify({
							"captain_user_id":value, 
							});
							var jsn= '{"team": '+dat+'}';
							updateTeam(apiURL+'/teams/'+team_id,jsn);
}


function add_mem(id){
	Team_ID=id;
	$("#teammmodal").modal("show");
	
}

function addnewMem(){
	var jsn= JSON.stringify({
		"team_id":Team_ID, 
		"team_member":$('#users_dropdown_data_teamm').val(), 
		});
		
		var dt='{"team": '+jsn+'}';	
		$.ajax({
		   url:apiURL+'/teammembers',
		   type: 'post',
		   data:dt,
		   success:function(data){
		   	$.ambiance({message: "Team member Added Succesfully!", 
            type: "success"});
	         window.location.reload();
		   }
	})
}

function edtTeam(id,tier_id,gid){
	Team_ID=id;
	$('#moda-tedit').modal('show');
	loadTir(gid);
			 $('#team_tire_c-t option[value="'+tier_id+'"]').attr('selected', 'selected');
		 $('#game_idteam-t option[value="'+gid+'"]').attr('selected', 'selected');
	
}

function teamDrop(xdata) {
		var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
		var htm="<select id='ma-console_ids-1'>";
		var html="<select id='ma-console_idub'>";
		var htmnt2="<select id='team_id_la'>";
		$.each(list, function(index, gameapp) {
			htm=htm+"<option value='"+gameapp.team_id+"'>"+gameapp.team_name+"</option>";
			html=html+"<option value='"+gameapp.team_id+"'>"+gameapp.team_name+"</option>";
			htmnt2=htmnt2+"<option value='"+gameapp.team_id+"'>"+gameapp.team_name+"</option>";	
		});
		htm=htm+"</select>";
		$('#team-1-list').html(htm);
		html=html+"</select>";
		htmnt2=htmnt2+"</select>";
		
		$('#team-2-list').html(html);	
		$("#lteamdrop").html(htmnt2);
}