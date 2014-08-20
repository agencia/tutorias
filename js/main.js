
window.TUTORIAS = {
    site: "tutorias.medrano.in",
    views: {},
    models: {
        enProceso: {},
        alumno: {},
        grupo: {}
    },
    collections: {
        enProceso: {},
        grupos: {},
        alumnos : {}
        
    },
    token: null
};

TUTORIAS.views.Layout = Backbone.View.extend({
    el: $("#app"),
    template: _.template($("#dashboard-template").html()),
    events : {
    },
    initialize: function() {
        this.render();
        TUTORIAS.collections.enProceso.grupos.each(this.agregarGrupo, this);
        TUTORIAS.collections.enProceso.alumnos.each(this.agregarAlumno, this);
    },
    buscar : function(){
    	var filtro = $("#buscar-alumno-activo").val();
    },
    agregarAlumno: function(alumno) {
        var view = new TUTORIAS.views.AlumnoActivo({model: alumno});
        this.$("#table-alumnos > tbody").append(view.render().el);
    },
    agregarGrupo: function(grupo) {
        var view = new TUTORIAS.views.GrupoActivo({model: grupo});
        this.$("#table-grupos > tbody").append(view.render().el);
    },
    render: function() {
        new TUTORIAS.views.NavBar();
        this.$el.html(this.template());
    }

});

TUTORIAS.views.Grupos = Backbone.View.extend({
    el: $("#app"),
    template: _.template($("#grupos-template").html()),
    initialize: function() {
        this.render();
        TUTORIAS.collections.grupos.each(this.agregarGrupo, this);

    },
    agregarGrupo: function(grupo) {
        var view = new TUTORIAS.views.Grupo({model: grupo});
        this.$("#table-grupos > tbody").append(view.render().el);
    },
    render: function() {
        this.$el.html(this.template());
    }
});

TUTORIAS.views.Grupo = Backbone.View.extend({
    tagName: "tr",
    className: 'primary',
    template: _.template($("#grupo-template").html()),
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

TUTORIAS.views.Alumnos = Backbone.View.extend({
    el: $("#app"),
    template: _.template($("#alumnos-template").html()),
    initialize: function() {
        this.render();
        TUTORIAS.collections.alumnos.each(this.agregarAlumno, this);
    },
    agregarAlumno: function(alumno) {
        var view = new TUTORIAS.views.Alumno({model: alumno});
        this.$("#table-alumnos > tbody").append(view.render().el);
    },
    render: function() {
        this.$el.html(this.template());
    }

});

TUTORIAS.views.Alumno = Backbone.View.extend({
    tagName: "tr",
    className: 'primary',
    template: _.template($("#alumno-template").html()),
    initialize: function() {
        console.log("Actvo");
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

TUTORIAS.views.NavBar = Backbone.View.extend({
    el: $("#nav"),
    template: _.template($("#nav-bar").html()),
    events: {
        "click .logout": 'logout'
    },
    initialize: function() {
        this.collection = TUTORIAS.collections.menus;
        this.render();
    },
    render: function() {
        this.$el.html(this.template({menus: this.collection.toJSON()}));
        this.$("ul.navbar-right").prepend("<li><a class='glyphicon glyphicon-user'> " + TUTORIAS.token + "</a></li>");
        console.log(this.collection.toJSON());
    },
    logout: function(event) {
        event.preventDefault();
        localStorage.removeItem("token");
        window.location.reload();
    }

});

TUTORIAS.views.Login = Backbone.View.extend({
    el: $("#app"),
    template: _.template($("#login-template").html()),
    events: {
        "submit #form-login": "login"
    },
    initialize: function() {

        this.render();
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    login: function(event) {
        event.preventDefault();
        var setvar = true;
        if ($("#form-login").find("input[type=email]").val().match(/^docente/)) {
            TUTORIAS.token = 'docente';
        } else if ($("#form-login").find("input[type=email]").val().match(/^tutor/)) {
            TUTORIAS.token = 'tutor';
        } else if ($("#form-login").find("input[type=email]").val().match(/^administrador/)) {
            TUTORIAS.token = 'administrador';
        } else {
            setvar = false;
        }
        if (setvar) {
            localStorage.setItem("token", TUTORIAS.token);
            window.location.reload();
        }
    }

});

TUTORIAS.views.AlumnoActivo = Backbone.View.extend({
    tagName: "tr",
    className: 'primary',
    template: _.template($("#alumno-activo-template").html()),
    initialize: function() {
        console.log("Actvo");
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

TUTORIAS.views.GrupoActivo = Backbone.View.extend({
    tagName: "tr",
    className: 'primary',
    template: _.template($("#grupo-activo-template").html()),
    initialize: function() {
        console.log("Actvo");
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

////////// MODELOS ////////
window.TUTORIAS.models.menu = Backbone.Model.extend({
});

window.TUTORIAS.collections.menus = new (Backbone.Collection.extend({
    // Reference to this collection's model.
    model: TUTORIAS.models.menu

}));

window.TUTORIAS.models.enProceso.alumno = Backbone.Model.extend({
});

window.TUTORIAS.collections.enProceso.alumnos = new (Backbone.Collection.extend({
        // Reference to this collection's model.
        model: TUTORIAS.models.enProceso.alumno,
        buscar: function(filtro) {
		    filtered = this.filter(function(alumno) {
		      return alumno.get("matricula") === filtro || alumno.get("nombre") === filtro;
		      });
		    return filtered;
		  }

}));
window.TUTORIAS.models.grupo = Backbone.Model.extend({
	defaults:{
		"ultima" : ''
	}
});
window.TUTORIAS.collections.grupos = new (Backbone.Collection.extend({
    //Reference to this collections's model.
    model: TUTORIAS.models.grupo
}));
window.TUTORIAS.models.alumno = Backbone.Model.extend({
	defaults:{
		"ultima" : ''
	}
});

window.TUTORIAS.collections.alumnos = new (Backbone.Collection.extend({
    // Reference to this collection's model.
    model: TUTORIAS.models.alumno

}));

window.TUTORIAS.models.enProceso.grupo = Backbone.Model.extend({
});

window.TUTORIAS.collections.enProceso.grupos = new (Backbone.Collection.extend({
    // Reference to this collection's model.
    model: TUTORIAS.models.enProceso.grupo

}));


/////////// ROUTER

window.TUTORIAS.router = Backbone.Router.extend({
    initialize: function() {
        new TUTORIAS.views.NavBar();
    },
    routes: {
        "": "home",
        "home": "home",
        "alumnos": "alumnos",
        "grupos": "grupos"
    },
    home: function() {
        TUTORIAS.app = new TUTORIAS.views.Layout();
        this.nav("home");
    },
    alumnos: function() {
        TUTORIAS.app = new TUTORIAS.views.Alumnos();
        this.nav("alumnos");
    },
    grupos : function(){
        TUTORIAS.app = new TUTORIAS.views.Grupos();
        this.nav("grupos");
    },
    nav: function(activate) {
        $("#navbar > div > div.navbar-collapse.collapse > ul:nth-child(1) > li").removeClass("active");
        $("#navbar > div > div.navbar-collapse.collapse > ul:nth-child(1) > li." + activate).addClass("active");
    }

});


////////////// INICIO

$(function() {
    console.log("token " + localStorage["token"]);
    TUTORIAS.token = localStorage["token"];
    if (localStorage.getItem("token")) {
        var dataurl = '';
        if (localStorage["token"] == 'docente') {
            dataurl = 'js/data/docente.js';
        } else if (localStorage["token"] == 'tutor') {
            dataurl = 'js/data/docente.js';
        } else if (localStorage["token"] == 'administrador') {
            dataurl = 'js/data/administrador.js';
        }
        $.getJSON(dataurl, function(data, textStatus, jqxhr) {
            TUTORIAS.collections.menus.add(data.menus);
            TUTORIAS.collections.alumnos.add(data.alumnos);
            TUTORIAS.collections.grupos.add(data.enProceso.grupos);
            TUTORIAS.collections.enProceso.alumnos.add(data.enProceso.alumnos);
            TUTORIAS.collections.enProceso.grupos.add(data.enProceso.grupos);
            new TUTORIAS.router();
            Backbone.history.start();
        }).fail(function(jqxhr, settings, exception){
            console.log(exception);
        });

    } else {
        TUTORIAS.app = new TUTORIAS.views.Login();
        $.backstretch("img/loginbg.jpg");
    }


});