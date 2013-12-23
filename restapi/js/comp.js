var competition_id;
      var i = 1;
	  var match_id;	 
	   var ladder_id;
findAllC();
loadmatch();
loadLadders();
/**
*  @name:findAllT
*  @params:non
*  @return:non
*  @uses:call api using  ajax and get console and call another two funtcion renderList findList 
*   
*/
function findAllC() {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: apiURL+'/competitions',
		dataType: "json", // data type of response
		success: function(data){
			var res="";
			res=data;
			renderListCo(res);	
			compDrop(res);			
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
function renderListCo(xdata) {
var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
var checkme="";
var fixtures="";	
	$.each(list, function(index, gameapp) {
		fixtures="";
			$.each(gameapp.fixtures, function(index,fixturesd) {
				    fixtures=fixtures+'<span>'+fixturesd.game_time+'</span><br>';				
				});
		fixtures=fixtures+'<br><span class="ope" onclick=fixt('+gameapp.competition_id+') ><i class="icon-tasks"></i>Manage fixtures</span>';
		
	teamm="";	
		if(gameapp.active==1){
			 checkme="checked ='true'";
		}else{
			 checkme="";
		}
		if(gameapp.can_join==1){
			 cjcheckme="checked ='true'";
		}else{
			 cjcheckme="";
		}
	$('#comp-body').append('<tr class="remove-tr" id="comp'+gameapp.competition_id+'"><td>'+gameapp.console.console_name+'</td> <td>'+gameapp.game.game_name+'</td> <td>'+gameapp.tier.tier_name+'</td><td>'+gameapp.competition_name+'</td><td><input type="checkbox" '+checkme+' onclick=updateCompactive('+gameapp.competition_id+',this.checked)> active</td><td><input type="checkbox" '+cjcheckme+' onclick=updateCompcj('+gameapp.competition_id+',this.checked)> can join </td><td>'+fixtures+'</td><td> <span class="ope" onclick="loadComp('+gameapp.competition_id+')"><i class="icon-edit"></i>Edit</span> <span class="ope" onclick="deletComp('+gameapp.competition_id+')"><i class="icon-trash"></i>Delete</span></td></tr>');
	});

		tablsdata('comp_table_grid');
	
	
}




function addnewcomp(){
newComp();
}


/**
* @name:newGame
* @uses:send request to api for creating new game using ajax
* @param:none
* @return:none
*
*/
function newComp(){
	
$.ajax({
		type: 'POST',
		url:apiURL+'/competitions',
		data: formToJSONC(),
		success: function(data, textStatus, jqXHR){
			$('input').val('');
		   $.ambiance({message: "Competitions   Added Succesfully!", 
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
function addlad(){
	
$.ajax({
		type: 'POST',
		url:apiURL+'/ladders',
		data: formToJSONLA(),
		success: function(data, textStatus, jqXHR){
			$('input').val('');
		   $.ambiance({message: "Ladders   Added Succesfully!", 
            type: "success"});
			window.location.reload();
		},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on adding !", 
            type: "success"});
		
		}
	});
}


/**
* @name:formToJSONT
* @uses:convert tiers form data to json
* @param:none
* @return:tiers form  to json encode
*
*/
function formToJSONC() {
	var jsn= JSON.stringify({
		"tier_id": $('#team_tire_c').val(), 
		"competition_name": $('#competition_name').val(), 
		"players_per_team":$('#ppt').val(), 
		"points_detail":tinyMCE.get('point').getContent(),
		"rules_detail": tinyMCE.get('rule').getContent(),
		"prizes_detail":tinyMCE.get('pez').getContent() , 
		"other_detail": tinyMCE.get('otr').getContent(), 
		});
		return '{"compet": '+jsn+'}';	
}



/**
* @name:formToJSONT
* @uses:convert tiers form data to json
* @param:none
* @return:tiers form  to json encode
*
*/
function formToJSONLA() {
	var jsn= JSON.stringify({
		"team_id": $('#team_id_la').val(), 
		"matches_played": $('#matches_played').val(),
		"match_wins": $('#match_wins').val(), 	
		"match_losses": $('#match_losses').val(), 	
		"match_draws": $('#match_draws').val(),	
		"match_points_for": $('#match_points_for').val(),	
		"match_points_against": $('#match_points_against').val(),
		"ladder_points": $('#ladder_points').val(),
		"competition_id": $('#competition_id_l').val()
		});
		return '{"lader": '+jsn+'}';	
}


function updateCompactive(id,status){
	var val=1;
	if(status){
		val=1;
	}else{
		val=0;
	}
	 var dat=JSON.stringify({
		"active":val, 
		});
		
	var jsn= '{"compet": '+dat+'}';
	updateComp(apiURL+'/competitions/'+id,jsn);
}


function updateCompcj(id,status){
	var val=1;
	if(status){
		val=1;
	}else{
		val=0;
	}
	 var dat=JSON.stringify({
		"can_join":val, 
		});
		
	var jsn= '{"compet": '+dat+'}';
	updateComp(apiURL+'/competitions/'+id,jsn);
}



/**
* @name:updateComp
* @uses:update console acording passed params 
* @param:urs,dt {{api url,json encoded data}}
* @return:none
*
*/
function updateComp(urs,dt){

	$.ajax({
		   url:urs,
		   type:'put',
		   data:dt,
		   success:function(data){
		   	$.ambiance({message: "Comptetion Updated Succesfully!", 
            type: "success"});
		   }
	})
}



/**
* @name:deleteConsole
* @uses:send request to api for deleting  console using ajax
* @param:val console_id
* @return:none
*
*/
function deletComp(val) {
	console.log('deletegameapp');
	if(confirm("Are you sure to delete this record")){
	$.ajax({
		type: 'DELETE',
		url: apiURL + '/competitions/'+val,
		success: function(data, textStatus, jqXHR){
			$('#comp'+val).remove();
				$.ambiance({message: "Comptetion Deleted Succesfully!", 
            type: "success"});
				},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on Comptetion Delete !", 
            type: "error"});
		}
	});
			
	}
}

function loadComp(id){
	competition_id=id;
	$('#compmodal').modal('show');
	$('#adc').hide();
	$('#udc').show();
	$.ajax({
		type: 'GET',
		url: apiURL+'/competitions/'+id,
		dataType: "json", // data type of response
		success: function(data){
			var res="";
			res=data;
		 loadTir(res.gameapp.game_id);
		 $('#game_idteam option[value="'+res.gameapp.game_id+'"]').attr('selected', 'selected');
		 $('#team_tire_c option[value="'+res.gameapp.tier_id+'"]').attr('selected', 'selected');
		$('#competition_name').val(res.gameapp.competition_name);
		$('#ppt').val(res.gameapp.players_per_team);
		competition_name
		tinyMCE.get('point').setContent(res.gameapp.points_detail)
		tinyMCE.get('rule').setContent(res.gameapp.rules_detail)
		tinyMCE.get('pez').setContent(res.gameapp.prizes_detail)
		tinyMCE.get('otr').setContent(res.gameapp.other_detail)
				
		}
	});
}
function updatnewcomp(){
	$.ajax({
		   url:apiURL+'/competitions/'+competition_id,
		   type:'put',
		   data:formToJSONC(),
		   success:function(data){
		   	
		   	$.ambiance({message: "Comptetion Updated Succesfully!", 
            type: "success"});
			window.location.reload();
		   }
	})
}

(function($) {
	$.fn.clonebox = function() {
      $('document').ready(function () {
$('.clone_me:last').append('<span style="cursor:pointer;text-decoration:none;color:#fff;border:1px solid;border-radius:3px;background:#A1CB2F; padding:5px;font-size:12px;" class="clickme" href="#"  onclick="add_n()">Add  </span>');
  });
    

	}
})(jQuery);


  $(document).ready(function() {
        $('#xform').clonebox();
	jQuery('#datetimepicker_1').datetimepicker();
    jQuery('#datetimepickerm').datetimepicker();
	
	
 });
	
function fixt(id){
	i=1;
	$('.remove-x').remove();
	competition_id=id;
	$.ajax({
		url:apiURL+'/fixtures/'+competition_id,
		dataType: "json",
		success:function(xdata){
			var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
			
			for(var z=1;z<list.length;z++){
				add_n();
			}
			setTimeout(function(){
			var inx=1;
			$.each(list, function(index, gameapp) {
				$('#datetimepicker_'+inx).val(gameapp.game_time);
				$('#datetimepicker_'+inx).data("xval",gameapp.game_time);
				//$( "body" ).data( "xval", 52 );
				$('#datetimepicker_'+inx).focus(function(){
				$(this).val($(this).data('xval'));
					
				})
				inx++;
			});
			},200);
		}
		
	})
	
	$('#fixtures').modal('show')
}

 
        function remove_m(th) {
     
		    if(i!=0){
            $(th).closest('.clone_me').remove();
			 i--;
			 }
			 
          }
  
    function add_n(){
		//alert(i)
   i++;
           var clone="<div class='clone_me remove-x'> <input type='text' name='fixture[]'  id='datetimepicker_"+i+"' placeholder='dd/mm/yyyy' ></div>"
		 $('.clone_me').last().after(clone);
      $('.clone_me:last').append('<span style="cursor:pointer;text-decoration:none;color:#fff;border:1px solid;border-radius:3px;background:#A1CB2F; padding:5px;font-size:12px;" class="clickme" href="#" onclick="add_n()">Add  </span>');
      $('.clone_me:last').append('<span style="cursor:pointer;text-decoration:none;color:#fff;border:1px solid;border-radius:3px; margin-right:5px;background:#cb1111; padding:5px; font-size:12px;" class="remove" href="#" onclick="remove_m(this)">Remove </span>');
			 
			$('#datetimepicker_'+i).datetimepicker();
}
    

function addfixture(){
	var x=Array();
	$('div.clone_me input').each(function(){
	
		x.push($(this).val());
	})
	
	 var dat=JSON.stringify({
		"fixture":x, 
		});
		
			var jsn= '{"fixtur": '+dat+'}'; 
$.ajax({
	 url:apiURL+'/fixtures/'+competition_id,
	 type:'put',
	 data:jsn,
	 success:function(data){
	 $.ambiance({message: "Fixture  created  Succesfully!", 
	 type: "success"});
	 window.location.reload();
	}
	})
}

function compDrop(xdata) {
		var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
		var htm="<select id='ma-console_ids'>";
			var htm2="<select id='competition_id_l'>";
		$.each(list, function(index, gameapp) {
			htm=htm+"<option value='"+gameapp.competition_id+"'>"+gameapp.competition_name+"</option>";
			htm2=htm2+"<option value='"+gameapp.competition_id+"'>"+gameapp.competition_name+"</option>";
		});
		htm=htm+"</select>";
		$('#game-comp-down').html(htm);
		$('#lcompdrop').html(htm2);
		
		
	
}

function updateMatch(){


if($('#ma-console_ids-1').val()==$('#ma-console_idub').val()){
	 $.ambiance({message: "Please select diffrent teams..", 
	 type: "error"});
	return false;
}
     var d=$('#datetimepickerm').val();
	
	var dat=JSON.stringify({		
	"competition_id":$('#ma-console_ids').val(),
	"match_time":d,
	"team1_id":	$('#ma-console_ids-1').val(),
	"team2_id":$('#ma-console_idub').val(),
	"winner":$('#winer').val(),
	"result_summary":$('#ress').val(),	
	"result_detail":tinyMCE.get('resdetail').getContent(),
	});
	
	var jsn= '{"match": '+dat+'}';
	
	
	$.ajax({
		 url:apiURL+'/matches/'+match_id,
		data:jsn,
		type:'PUT',
		success:function(data){
	 $.ambiance({message: "Match updated Succesfully!", 
	 type: "success"});
	 window.location.reload();
		}
	})
	
	
}


function addMatch(){


if($('#ma-console_ids-1').val()==$('#ma-console_idub').val()){
	 $.ambiance({message: "Please select diffrent teams..", 
	 type: "error"});
	return false;
}
var match_c=0;

     if($('#match_completed').val()){
	 	match_c=1
	 }else{
	 	match_c=0;
	 }
	    var d=$('#datetimepickerm').val();
	
	var dat=JSON.stringify({		
	"competition_id":$('#ma-console_ids').val(),
	"match_time":d,
	"team1_id":	$('#ma-console_ids-1').val(),
	"team2_id":$('#ma-console_idub').val(),
	"winner":$('#winer').val(),
	"result_summary":$('#ress').val(),	
	"result_detail":tinyMCE.get('resdetail').getContent(),
	"team1_score" :$('#team1s').val(),
	"team2_score" :$('#team2s').val(),
	"team1_acceptance":$('#t1ac').val(),	
	"team2_acceptance":$('#t2ac').val(),	
	"match_completed":match_c,
	});
	
	var jsn= '{"match": '+dat+'}';
	
	
	$.ajax({
		 url:apiURL+'/matches/',
		data:jsn,
		type:'POST',
		success:function(data){
	 $.ambiance({message: "Match added Succesfully!", 
	 type: "success"});
	 window.location.reload();
		}
	})
	
	
}

function loadmatch(){
		$.ajax({
		 url:apiURL+'/matches/',
		type:'GET',
		success:function(data){
            rendermatch(data)
		}
	})
}

function loadLadders(){
		$.ajax({
		 url:apiURL+'/ladders/',
		type:'GET',
		success:function(data){
            renderladders(data)
		}
	})
}

function editMatch(id){
	$('#aduo').show();
	$('#adcm').hide();
	match_id=id;
	$('#matchmodal').modal('show');
		$.ajax({
		 url:apiURL+'/matches/'+id,
		 dataType: "json", // data type of response
		type:'GET',
		success:function(data){
			var xdata=data;
          var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
        $.each(list, function(index, gameapp) {  
		     
				$('#ma-console_ids').val(gameapp.competition_id);
				$('#datetimepickerm').val(gameapp.match_timen);
				$('#ma-console_ids-1').val(gameapp.team1_id);
				$('#ma-console_idub').val(gameapp.team2_id);
				$('#winer').val(gameapp.winner);
				$('#ress').val(gameapp.result_summary);	
				tinyMCE.get('resdetail').setContent(gameapp.result_detail);
				$('#team1s').val(gameapp.team1_score);
				$('#team2s').val(gameapp.team2_score);
				$('#t1ac').val(gameapp.team1_acceptance);
				$('#t2ac').val(gameapp.team2_acceptance);
				//alert(gameapp.match_completed)
				if(gameapp.match_completed==1){
					$('#match_completed').attr("checked",true)
				}else{
					$('#match_completed').removeAttr("checked");
					$('#match_completed').attr("checked",false)
				}		
	      });
		}
	})
}


function updateLad(){
$.ajax({
		 url:apiURL+'/ladders/'+ladder_id,
		data:formToJSONLA(),
		type:'PUT',
		success:function(data){
	 $.ambiance({message: "Ladders updated Succesfully!", 
	 type: "success"});
	 window.location.reload();
		}
	})
	}
function editLad(id){
	$('#aduol').show();
	$('#adcml').hide();
	ladder_id=id;
	$('#laddersmodal').modal('show');
		$.ajax({
		 url:apiURL+'/ladders/'+id,
		type:'GET',
		success:function(data){
			var xdata=data;
          var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
        $.each(list, function(index, gameapp) {  
		 $('#team_id_la option[value="'+gameapp.team_id+'"]').attr('selected', 'selected');
		 $('#competition_id_l option[value="'+gameapp.competition_id+'"]').attr('selected', 'selected');
		 
			$('#matches_played').val(gameapp.matches_played);
			$('#match_wins').val(gameapp.match_wins);	
 			$('#match_losses').val(gameapp.match_losses);
			$('#match_draws').val(gameapp.match_draws);
			$('#match_points_for').val(gameapp.match_points_for);
			$('#match_points_against').val(gameapp.match_points_against);
			$('#ladder_points').val(gameapp.ladder_points);
				
				
				
 	
 	
 	
 	
 	

	
	      });
		}
	})
}



function rendermatch(xdata) {
	var ar=['No Result','Team 1','Team 2','Draw'];
var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
var checkme="";	
	$.each(list, function(index, gameapp) {
	teamm="";	
 	 	var match_completed="";
		if(gameapp.match_completed==1){
			match_completed="Yes";
		}else{
			match_completed="No";
		} 	
	$('#match-body').append('<tr class="remove-tr" id="matc-dh'+gameapp.match_id +'"><td>'+gameapp.competition_id.competition_name+'</td> <td>'+gameapp.team1_id.team_name+'</td> <td>'+gameapp.team2_id.team_name+'</td> <td>'+gameapp.match_time+'</td>  <td>'+ar[gameapp.winner]+'</td> <td>'+gameapp.team2_score+'</td><td>'+gameapp.team2_score+'</td> <td>'+match_completed+'</td> <td><span onclick=manage_notes(1,'+gameapp.match_id+',"matches") class="ope"><i class="icon-tasks"></i>manage notes</span></td><td> <span onclick=editMatch('+gameapp.match_id+')><i class="icon-edit"></i>Edit</span> &nbsp <span onclick="deleteMatch('+gameapp.match_id+')"><i class="icon-trash"></i>Delete</span> </td></tr>');
	});

		tablsdata('match_table_grid');
	
	
}
function deleteMatch(id){
	
		if(confirm("Are you sure to delete this record")){
	$.ajax({
		type: 'DELETE',
		url:apiURL+'/matches/'+id,
		success: function(data, textStatus, jqXHR){
			$('#matc-dh'+id).remove();
				$.ambiance({message: "Match Deleted Succesfully!", 
            type: "success"});
				},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on  Delete !", 
            type: "error"});
		}
	});
			
	}
}


function deleteLad(id){
	
		if(confirm("Are you sure to delete this record")){
	$.ajax({
		type: 'DELETE',
		url:apiURL+'/ladders/'+id,
		success: function(data, textStatus, jqXHR){
			$('#ladders-dh'+id).remove();
				$.ambiance({message: "ladders Deleted Succesfully!", 
            type: "success"});
				},
		error: function(jqXHR, textStatus, errorThrown){
		$.ambiance({message: "Error on  Delete !", 
            type: "error"});
		}
	});
			
	}
}


function renderladders(xdata) {
var list = xdata == null ? [] : (xdata.gameapp instanceof Array ? xdata.gameapp : [xdata.gameapp]);
var checkme="";	
	$.each(list, function(index, gameapp) {
	teamm="";	
 	 	 	
	$('#ladders-body').append('<tr class="remove-tr" id="ladders-dh'+gameapp.ladder_id +'"><td>'+gameapp.competition_id.competition_name+'</td><td>'+gameapp.team_id.team_name+'</td>  <td>'+gameapp.matches_played+'</td> <td>'+gameapp.match_wins+'</td> <td>'+gameapp.match_losses+'</td> <td>'+gameapp.match_draws+'</td> <td>'+gameapp.match_points_for+'</td> <td>'+gameapp.match_points_against+'</td><td>'+gameapp.ladder_points+'</td><td> <span onclick=editLad('+gameapp.ladder_id+')><i class="icon-edit"></i>Edit</span> &nbsp <span onclick="deleteLad('+gameapp.ladder_id+')"><i class="icon-trash"></i>Delete</span> </td></tr>');
	});

		tablsdata('ladders_table_grid');
	
	
	
}