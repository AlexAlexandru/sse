

jQuery( document ).ready(function() {
	
	jQuery('select').select2({ width: '25%' });
	
	jQuery(".form-settings").submit(function(e) {

		var data ={};
	
		jQuery('.switch').each(function(i, obj) {
			var value = jQuery(this).children("input").prop('checked');
			var name  = jQuery(this).children("input").attr('name');
			data[name] = value;
		});
		
		jQuery('.checkbox').each(function(i, obj) {

			var name  = jQuery(this).children("input").attr('name');
			var array = {};

			jQuery("."+name).each(function(i, obj) {
				var value = jQuery(this).prop('checked');
				var key = jQuery(this).val();
				array[key] = value;
			
			});
			data[name] = array;
			
		});
		
		jQuery('.text').each(function(i, obj) {
			var value = jQuery(this).children("input").val();
			var name  = jQuery(this).children("input").attr('name');
			data[name] = value;
		});
		
		jQuery('.number').each(function(i, obj) {
			var value = jQuery(this).children("input").val();
			var name  = jQuery(this).children("input").attr('name');
			data[name] = value;
		});
		
		jQuery('.color').each(function(i, obj) {
			var value = jQuery(this).children("input").spectrum('get').toHexString();
			var name  = jQuery(this).children("input").attr('name');
			data[name] = value;
		});
		
		jQuery('.image_select').each(function(i, obj) {
			var value = jQuery(this).find("input:checked").val();
			var name  = jQuery(this).find("input").attr('name');
			data[name] = value;
		});
		
		jQuery('.select').each(function(i, obj) {

			var radioButton  = jQuery(this).children("input").length;
			
			if(radioButton >= 1){
				var name  = jQuery(this).children("input").attr('name');
				var value = jQuery(this).children("input:checked").val();
				data[name] = value;
			}else{
				var value  = jQuery(this).children("select").val();
				var name  = jQuery(this).children("select").attr('name');
				if(value != null && value != undefined && value.length){
					var size = value.length;
					var array = {};
					for(var i=0;i<size;i++){
						array[i] = value[i];
					}
					
					data[name] = array;
				}
			}
		});
		
		var page = jQuery("#page").val();
		var token = jQuery("#wordpress-token").val();
		
		jQuery("#settings-spinner").addClass("is-active");
		console.log(data);
		jQuery.ajax({
           type: "POST",
           url: ajaxurl,
		   data: ({ 
			   action: 'sse_save_options', 
			   data:data,
			   page:page,
			   security:token
			   }
		   ), // serializes the form's elements.
           success: function(response)
           {
			   jQuery("#ajax-messages").get(0).scrollIntoView();
			   jQuery("#ajax-messages").html(response);
			   jQuery("#settings-spinner").removeClass("is-active");
           }
        });
		
		e.preventDefault();
	});
	
    jQuery(".sse-switch").change(function() {
		
		if(this.checked){
			var level = jQuery(this).parent().attr("data-level");
			var initial = level;
			level++;
			
			var par = jQuery(this).parent();
			
			while(1){
					
				var nextL = par.next().attr("data-level");
				var nextelement = par.next();
					
				if(nextelement.attr("data-level") == undefined || nextelement.attr("data-level") <= initial){
					break;
				}	
					
				if(nextL == level){
					nextelement.show();
				}
					
				par = par.next();
			}
			
		}else{
			
			var level = jQuery(this).parent().attr("data-level");
			
			var par = jQuery(this).parent();
			
			while(1){
					
				var nextL = par.next().attr("data-level");
				var nextelement = par.next();
				
				if(nextelement.attr("data-level") == undefined || nextelement.attr("data-level") <= level){
					break;
				}
					
				if(level < nextelement){
					nextelement.hide();
				}
		
				par = par.next();

			}
			
		}
		
	});
});