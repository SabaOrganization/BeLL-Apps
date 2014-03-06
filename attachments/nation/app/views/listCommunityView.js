$(function () {

    App.Views.listCommunityView = Backbone.View.extend({

        id: "invitationForm",

        events: {
            "click #cancelButton": "hidediv",
            "click #formButton":"syncData"
        },
        hidediv: function () {
            $('#invitationdiv').fadeOut(1000)
            
            setTimeout(function () {
                $('#invitationdiv').hide()
            }, 1000);
        },
        render: function () {
                
                var $button = $('<h6>Select Community(\'ies)</h6><select multiple id="comselect"></select><br><br><a class="btn btn-success" id="formButton">Send</button>')
                this.$el.append($button)
                this.$el.append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
                this.$el.append('<a class="btn btn-warning" id="cancelButton">Cancel</button>')
        },
        syncData: function(){

        	alert("Sending data")
        	var selectedValues = $('#comselect').val();
    		if(selectedValues.length>0)
    		{
    			for (var i = 0; i < selectedValues.length; i++) {
    			var communityUrl=selectedValues[i]
    			var communityName=$("#comselect option[value='"+selectedValues[i]+"']").text()
    			this.synchResCommunityWithURL(communityUrl,communityName)
				this.synchPubCommunityWithURL(communityUrl,communityName)
				}
    		
    		}
    		
    		console.log(selectedValues)
    		
    		$("#list option[value='2']").text()
        	$('#invitationdiv').fadeOut(1000)
            setTimeout(function () {
                $('#invitationdiv').hide()
            }, 1000);
        },
        synchResCommunityWithURL : function(communityurl,communityname) 
        {
        	console.log('https://'+ communityname +':oleoleole@'+ communityurl + ':5984/resources')
        	$.ajax({
            	// headers: {
//                 	'Accept': 'application/json',
//                     'Content-Type': 'application/json; charset=utf-8'
//                 },
//             	
            	url : 'http://'+ communityname +':oleoleole@'+communityurl+':5984/resources/_all_docs?include_docs=true',
               // url: '/_replicate',
               type: 'GET',
                dataType: 'jsonp',
                // data: JSON.stringify({
//                 	"source": "resources",
//                     "target": 'https://'+ communityname +':oleoleole@'+ communityurl + ':5984/resources'
//             	}),
                success: function (json) {
                
    				for(var i=0 ; i<json.rows.length ; i++)
    				{
    					var community = json.rows[i]
    					var communityurl = community.doc.url
    					var communityname = community.doc.name
    					msg = waitMsg
    					waitMsg = waitMsg + '<br>Replicating to ' + communityname + '. Please wait…'
    					App.$el.children('.body').html(waitMsg)
    					that.synchCommunityWithURL(communityurl,communityname)
    					waitMsg = msg
    					waitMsg = waitMsg + '<br>Replication to ' + communityname + ' is complete.'
    					App.$el.children('.body').html(waitMsg)
      				}
      				if(type!="nation")
      				{
      					msg = waitMsg
    					waitMsg = waitMsg + '<br>Replicating to ' + communityname + '. Please wait…'
    					that.synchCommunityWithURL(nationURL,nationName)
    					waitMsg = msg
    					waitMsg = waitMsg + '<br>Replication to ' + communityname + ' is complete.<br>Replication completed.'	
      				}
    			

                },
                async: false
            })
        },
        synchPubCommunityWithURL : function(communityurl,communityname) 
        {
        	console.log('http://'+ communityname +':oleoleole@'+ communityurl + ':5984/publications')
        	$.ajax({
            	// headers: {
//                 	'Accept': 'application/json',
//                     'Content-Type': 'application/json; charset=utf-8'
//                 },
            	type: 'GET',
                url: 'http://'+ communityname +':oleoleole@'+ communityurl + ':5984/publications',
                dataType: 'jsonp',
                // data: JSON.stringify({
//                 	"source": "publications",
//                     "target": 'http://'+ communityname +':oleoleole@'+ communityurl + ':5984/publications'
//             	}),
                success: function (json) {
				
    				for(var i=0 ; i<json.rows.length ; i++)
    				{
    					var community = json.rows[i]
    					var communityurl = community.doc.url
    					var communityname = community.doc.name
    					msg = waitMsg
    					waitMsg = waitMsg + '<br>Replicating to ' + communityname + '. Please wait…'
    					App.$el.children('.body').html(waitMsg)
    					that.synchCommunityWithURL(communityurl,communityname)
    					waitMsg = msg
    					waitMsg = waitMsg + '<br>Replication to ' + communityname + ' is complete.'
    					App.$el.children('.body').html(waitMsg)
      				}
      				if(type!="nation")
      				{
      					msg = waitMsg
    					waitMsg = waitMsg + '<br>Replicating to ' + communityname + '. Please wait…'
    					that.synchCommunityWithURL(nationURL,nationName)
    					waitMsg = msg
    					waitMsg = waitMsg + '<br>Replication to ' + communityname + ' is complete.<br>Replication completed.'	
      				}
    			
                },
                async: false
            })
        },
        /*
        
        Replicate: function () {
        
          App.startActivityIndicator()
          
           var that = this
           var temp = $.url().attr("host").split(".")
           var currentHost=$.url().attr("host")
           
           var nationURL=''
           var nationName=''
           var type=''
    
    	    var configurations=Backbone.Collection.extend({

    				url: App.Server + '/configurations/_all_docs?include_docs=true'
    		})	
    	    var config=new configurations()
    	      config.fetch({async:false})
    	    var currentConfig=config.first()
            var cofigINJSON=currentConfig.toJSON()
        
    	    
    	    type=cofigINJSON.rows[0].doc.type

//    	      if(type=='nation')
//    	       {
//    	       	   nationURL= App.Server
//    	       	   nationName=cofigINJSON.rows[0].doc.name
//    	       }
//    	        else{
//    	     	   	nationURL=cofigINJSON.rows[0].doc.nationUrl
//    	        	nationName=cofigINJSON.rows[0].doc.nationName
//    	       }
    	    
				nationURL=cofigINJSON.rows[0].doc.nationUrl
    	        nationName=cofigINJSON.rows[0].doc.nationName
    			App.$el.children('.body').html('Please Wait…')
    			var waitMsg = ''
    			var msg = ''
    			
            $.ajax({
    			url : 'http://'+ nationName +':oleoleole@'+nationURL+':5984/communities/_all_docs?include_docs=true',
    			type : 'GET',
    			dataType : "jsonp",
    			success : function(json) {
    				for(var i=0 ; i<json.rows.length ; i++)
    				{
    					var community = json.rows[i]
    					var communityurl = community.doc.url
    					var communityname = community.doc.name
    					msg = waitMsg
    					waitMsg = waitMsg + '<br>Replicating to ' + communityname + '. Please wait…'
    					App.$el.children('.body').html(waitMsg)
    					that.synchCommunityWithURL(communityurl,communityname)
    					waitMsg = msg
    					waitMsg = waitMsg + '<br>Replication to ' + communityname + ' is complete.'
    					App.$el.children('.body').html(waitMsg)
      				}
      				if(type!="nation")
      				{
      					msg = waitMsg
    					waitMsg = waitMsg + '<br>Replicating to ' + communityname + '. Please wait…'
    					that.synchCommunityWithURL(nationURL,nationName)
    					waitMsg = msg
    					waitMsg = waitMsg + '<br>Replication to ' + communityname + ' is complete.<br>Replication completed.'	
      				}
    			}
  			 })
  			App.stopActivityIndicator()
        },
        synchCommunityWithURL : function(communityurl,communityname) 
        {
        	console.log('http://'+ communityname +':oleoleole@'+ communityurl + ':5984/resources')
        	$.ajax({
            	headers: {
                	'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
            	type: 'POST',
                url: '/_replicate',
                dataType: 'json',
                data: JSON.stringify({
                	"source": "resources",
                    "target": 'http://'+ communityname +':oleoleole@'+ communityurl + ':5984/resources'
            	}),
                success: function (response) {

                },
                async: false
            })
        },
        */
        
    })

})