

jQuery( document ).ready(function() {
	
	jQuery(".sse-color-field").wpColorPicker();

	jQuery("select").select2({ width: "25%" });
	
	jQuery(".form-settings").submit(function(e) {

		var data ={};
	
		jQuery(".switch").each(function(i, obj) {
			var value = jQuery(this).children("input").prop("checked");
			var name  = jQuery(this).children("input").attr("name");
			data[name] = value;
		});
		
		jQuery(".checkbox").each(function(i, obj) {

			var name  = jQuery(this).children("input").attr("name");
			var array = {};

			jQuery("."+name).each(function(i, obj) {
				var value = jQuery(this).prop("checked");
				var key = jQuery(this).val();
				array[key] = value;
			
			});
			data[name] = array;
			
		});
		
		jQuery(".text, .number").each(function(i, obj) {
			var value = jQuery(this).children("input").val();
			var name  = jQuery(this).children("input").attr("name");
			data[name] = value;
		});
		
		jQuery(".color").each(function(i, obj) {
			var value = jQuery(this).find(".wp-color-picker").val();
			var name  = jQuery(this).find(".wp-color-picker").attr("name");
			data[name] = value;
		});
		
		jQuery(".image_select").each(function(i, obj) {
			var value = jQuery(this).find("input:checked").val();
			var name  = jQuery(this).find("input").attr("name");
			data[name] = value;
		});
		
		jQuery(".select").each(function(j, obj) {

			var radioButton  = jQuery(this).children("input").length;
			
			var name;
			var value;
			
			if(radioButton >= 1){
				name  = jQuery(this).children("input").attr("name");
				value = jQuery(this).children("input:checked").val();
				data[name] = value;
			}else{
				value  = jQuery(this).children("select").val();
				name  = jQuery(this).children("select").attr("name");

				if(value != null && value !== undefined && value.length){
					var size = value.length;
					var array = {};
					for(var i=0;i<size;i++){
						array[i] = value[i];
					}
					data[name] = array;
				}else{
					data[name] = "";
				}
			}
		});
		
		var page = jQuery("#page").val();
		var token = jQuery("#wordpress-token").val();
		var section = jQuery(".nav-tab-active").attr("data-section");
		
		jQuery("#settings-spinner").addClass("is-active");
		
		/** global: ajaxurl */
		
		jQuery.ajax({
           type: "POST",
           url: ajaxurl,
		   dataType: "json",
		   data: ({ 
			   action: "sse_save_options", 
			   data:data,
			   page:page,
			   security:token,
			   section:section
			   }
		   ), // serializes the form"s elements.
           success: function(response)
           {
			   if(response.value === 1){
				   
				   successAlert(response.message);
				   
			   }else if(response.value === 0){
				   
				   errorAlert(response.message);
			   }
			   
			   jQuery("#settings-spinner").removeClass("is-active");
           }
        });
		
		e.preventDefault();
	});
	
	
	function showAllfields(tag){
		
			var level = jQuery(tag).parent().attr("data-level");
			var initial = level;
			level++;
			
			var par = jQuery(tag).parent();
			
			while(1){
				var nextE =	par.next().find(".sse-switch");
				var nextL = par.next().attr("data-level");
				
				var nextelement = par.next();
			
				var value = jQuery(nextelement).find(".sse-switch").prop("checked");
			
				if(nextelement.attr("data-level") === undefined || nextelement.attr("data-level") <= initial){
					break;
				}
				
				if(value === true && nextL == level){
					showAllfields(nextE);
				}
				
				if(nextL == level){
					nextelement.show();
				}
					
				par = par.next();
			}
	}

	
    jQuery(".sse-switch").change(function() {
		
		if(this.checked){
			
			showAllfields(this);

		}else{
			
			var level = jQuery(this).parent().attr("data-level");
			
			var par = jQuery(this).parent();
			
			while(1){
					
				var nextelement = par.next();
				
				if(nextelement.attr("data-level") === undefined || nextelement.attr("data-level") <= level){
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