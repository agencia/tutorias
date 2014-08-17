
window.TUTORIAS = {
	site: "tutorias.medrano.in",
	views: {},
	models : {},
	collections : {},
	token: null
};

TUTORIAS.views.Layout = Backbone.View.extend({
	el : $("#app"),
	template :  _.template($("#dashboard-template").html()),
	render : function(){
		new TUTORIAS.views.NavBar();
		this.$el.html(this.template());
	}

});

TUTORIAS.views.NavBar = Backbone.View.extend({
	el : $("#nav"),
	template : _.template($("#nav-bar").html()),
	
	events : {
		"click .logout" : 'logout'
	},
	initialize: function() {
		this.collection = TUTORIAS.collections.menus;
		this.render();
	},
	render : function(){
		this.$el.html(this.template({menus : this.collection.toJSON()}));
		console.log(this.collection.toJSON());
	},
	logout : function(event){
		event.preventDefault();
		localStorage.removeItem("token");
	  	window.location.reload();
	}

});

TUTORIAS.views.Login = Backbone.View.extend({
	el : $("#app"),
	template :  _.template($("#login-template").html()),
	events: {
	  	"submit #form-login" : "login"
	  },
	render: function(){
		this.$el.html(this.template);
  		return this;
	},

	login: function(event){
	  	event.preventDefault();
	  	var setvar = true;
	  	if($("#form-login").find("input[type=email]").val().match(/^docente/)){
	  		TUTORIAS.token = 'docente';
	  	} else if($("#form-login").find("input[type=email]").val().match(/^tutor/)){
	  		TUTORIAS.token = 'tutor';
	  	} else if($("#form-login").find("input[type=email]").val().match(/^administrador/)){
	  		TUTORIAS.token = 'administrador';
	  	} else {
	  		setvar = false;
	  	}
	  	if(setvar){
		  	localStorage.setItem("token", TUTORIAS.token);
		  	window.location.reload();
		}
	  }

});

////////// MODELOS ////////
window.TUTORIAS.models.menu = Backbone.Model.extend({
    });

window.TUTORIAS.collections.menus = new (Backbone.Collection.extend({
        // Reference to this collection's model.
        model: TUTORIAS.models.menu

    }));

$(function(){
		console.log("token " + localStorage["token"]);
	if(localStorage.getItem("token")){
		var dataurl = '';
		if(localStorage["token"] == 'docente'){
			dataurl ='js/data/docente.js';
		} else if(localStorage["token"] == 'tutor'){
			dataurl ='js/data/tutor.js';
		} else if(localStorage["token"] == 'administrador'){
			dataurl ='js/data/administrador.js';
		}
		$.getJSON(dataurl, function(data, textStatus, jqxhr ){
			TUTORIAS.collections.menus.add(data.menus);
			TUTORIAS.app = new TUTORIAS.views.Layout();
			TUTORIAS.app.render();
		}).fail(function( jqxhr, settings, exception ) {
		    console.log(exception);
		});
		
	} else {
		TUTORIAS.app = new TUTORIAS.views.Login();
	TUTORIAS.app.render();
		$.backstretch("img/loginbg.jpg");
	}


});