$(document).ready(function(){
	var grant; // pre-initialized for JSONWish
	var viewport = $('body')
	
	function out(line){
		viewport.append(line);
		viewport.append('<br>');
	};
	
	
	
	function GenBtnMaker(id,value,context){
		var context = context || $('body');
		context.append("<input type='button' id='"+id+"' value='"+value+"'>");
	};
	
	function cb(msg){
		console.debug(msg);
	};
	
	$.getJSON('/cic/immigration',function(data){
//		cb(data);
	});
	
	
	
	function JSONWish(name,args,sfunc){
		wish = (function (name,args){
			var wish = {} 
			wish.name = name;
			wish.wishargs = args;
			return wish;
		})(name,args);
		
//		cb(JSON.stringify(wish));
		$.getJSON('/cic/jsonwish',{wish: JSON.stringify(wish)},function(grant){
			console.debug(grant);
		}).done(sfunc);
	};
	
	
	function binder(pretext,name,suftext){
		suftext = (typeof suftext === "undefined") ? "" : suftext;
		return pretext + '<boundtext data-bind="text: ' + name + '"></boundtext>' + suftext;
	};

	
	out('hello world...');
	function AppViewModel() {
	    var self = this
		self.name = ko.observable('???');
	    self.xID = ko.observable('???');
//	    out('First name: <strong data-bind="text: firstName">gfdgdf</strong>')
//	    out('Welcome <strong data-bind="text: name">gfdgdf</strong> (<lala data-bind="text: xID">gfdgdf</lala>)');
//	    out('Welcome ' +binder("name")+ ' (' +binder("xID")+ ')');
	    out(binder('Welcome ','name','!'));
	    out(binder('You have ','xID',' new messages!'));
		JSONWish('lPIXEL','',function(grant){
				self.name(grant.name);
				self.xID(grant.xID);
			});
	}
	

	// Activates knockout.js
	ko.applyBindings(new AppViewModel());
	
// EXAMPLE CALLS -	
//	JSONWish('lPIXEL',{'pixel':'PIXEL20'}); //Call with multiple arguments, returns python function lPIXEL()
//	JSONWish('lPIXEL','PIXEL20'); // with single argument, returns python function lPIXEL('PIXEL20')
//	JSONWish('lPIXEL'); // call with no arguments, returns python function lPIXEL()
//	JSONWish('lPIXEL','PIXEL19',function(grant){cb('JSONWish promise example: '+grant.xID);}); // with onsuccess, returns lPIXEL('PIXEL19') then does stuff with data according to function
	JSONWish('aORB','Test Orb'); // actualize an orb
	
});