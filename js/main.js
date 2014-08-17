
window.TUTORIAS = {
	site: "tutorias.medrano.in",
	views: {},
	token: null
}

TUTORIAS.views.Layout = Backbone.View.extend({

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
	  	TUTORIAS.token = 'xWZmin';
	  }

});


$(function(){
	if(TUTORIAS.token){
		TUTORIAS.app = new TUTORIAS.views.Layout();
	} else {
		TUTORIAS.app = new TUTORIAS.views.Login();
	}
});