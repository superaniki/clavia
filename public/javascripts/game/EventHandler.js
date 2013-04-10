
(function() {
	CL.Event = function(){
		return this;	
	};

	CL.Event.prototype= {
			id:	null, // string
			groupid:	null, // string
			callback:	null, // function
			active:			false, // boolean
			initialize : function(id, groupid, target, callback){
				this.id=		id;
				this.groupid=		groupid;
				this.callback=		callback;
				this.target=		target;
				this.active=		true;
				return this;
			},
			fire :function(args)  { // eventsträng
				if(this.active)
					if(this.callback !== undefined && this.callback !== null)
						this.callback.call(this.target, args);
					else
						console.log("Callback for group '"+this.groupid+"' with id '"+this.id+"' is not defined!")
					return this;
			},
			pause : function(){
					this.active = false;
					return this;
			},
			resume: function(){
				this.active = true;
				return this;
			}
	};
})();

(function() {
	CL.EventHandler_ = function() {
		return this;
	};

	CL.EventHandler_.prototype = {
		listener: [], //	
		addListener : function(id, groupid, target, callback){
			var newEvent= new CL.Event().initialize(id, groupid, target, callback);
			this.listener.push(newEvent);
			return(newEvent);
		},
		fire : function(id, args)  { // eventsträng
			for(var i=0;i<this.listener.length;i++)
				if(this.listener[i].id === id)
					this.listener[i].callback.call(this.listener[i].target, args); // kör funktionen
		},

		fireGroup : function(groupid, args)  { // eventsträng
			for(var i=0;i<this.listener.length;i++){
				if(this.listener[i].groupid === groupid)
					this.listener[i].callback.call(this.listener[i].target, args); // kör funktionen
			}
		},
		pauseGroup : function(groupid){ 
			for(var i=0;i<this.listener.length;i++)
				if(this.listener[i].groupid  === groupid)
					this.listener[i].pause();
		},
		resumeGroup : function(groupid){ 
			for(var i=0;i<this.listener.length;i++)
				if(this.listener[i].groupid  === groupid)
					this.listener[i].resume();
		},
		removeGroup : function(groupid){
			var len = this.listener.length
			while (len--)
				if(this.listener[len].groupid  === groupid)
					this.listener.splice(len,1);
		},
		numberOfListeners : function(){
			return this.listener.length;
		}
	
	};

	CL.EventHandler = new CL.EventHandler_();
})();