
window.TUTORIAS = {
    site: "tutorias.medrano.in",
    views: {},
    models: {
        enProceso: {},
        alumno: {},
        grupo: {},
        usuario :{},
        posibleUsuario:{}
    },
    collections: {
        enProceso: {},
        grupos: {},
        alumnos: {},
        usuarios: {},
        posiblesUsuarios:{}

    },
    token: null
};

TUTORIAS.views.Solicitar= Backbone.View.extend({
    el: $("#mod"),
    template: _.template($("#modal-template").html()),
    templateBody: _.template($("#solicitar-form-template").html()),
    templateFooter: _.template($("#solicitar-footer-template").html()),
    modal:{
        title : 'Solicitar Tutoria Para Alumno'
    },
    events: {
        'click .btnok' : 'solicitar'
    },
    initialize : function(){
        this.render();
    },
    render : function(){
        this.modal.body = this.templateBody({alumno: this.model.toJSON()});
        this.modal.footer = this.templateFooter();
        this.$el.html(this.template({modal:this.modal}));
        this.$("#myModal").modal('show');
    },
    solicitar:function(){
        //this.$("#myModal").modal('hide');
        this.$(".modal-footer > .btn").hide();
        this.$("textarea").hide();
        this.$(".helper-while-saving").html(this.$("textarea").val()).removeClass("hide");
        this.$("div.saving-label").removeClass("hide");
        setTimeout(function(){
            this.$("div.saving-label").hide();
            this.$("div.ok-saving-label").removeClass("hide");
        },5000);
    }
});

TUTORIAS.views.Layout = Backbone.View.extend({
    el: $("#app"),
    template: _.template($("#dashboard-template").html()),
    events: {
    },
    initialize: function() {
        this.render();
        TUTORIAS.collections.enProceso.grupos.each(this.agregarGrupo, this);
        TUTORIAS.collections.enProceso.alumnos.each(this.agregarAlumno, this);
    },
    buscar: function() {
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
        $(".tooltips").tooltip();
    }
});

TUTORIAS.views.Permisos = Backbone.View.extend({
    el: $("#app"),
    template: _.template($("#permisos-template").html()),
    events: {
    },
    initialize: function() {
        this.render();
        TUTORIAS.collections.usuarios.each(this.agregarUsuario, this);
        TUTORIAS.collections.posiblesUsuarios.each(this.agregarPosibleUsuario, this);
    },
    buscarUsuario: function() {
        var filtro = $("#buscar-usuario").val();
    },
    buscarPosibleUsuario: function() {
        var filtro = $("#buscar-posible-usuario").val();
    },
    agregarUsuario: function(usuario) {
        var view = new TUTORIAS.views.Usuario({model: usuario});
        this.$("#table-usuarios > tbody").append(view.render().el);
    },
    agregarPosibleUsuario: function(posibleUsuario) {
        var view = new TUTORIAS.views.posibleUsuario({model: posibleUsuario});
        this.$("#table-posibles-usuarios > tbody").append(view.render().el);
    },
    render: function() {
        this.$el.html(this.template());
    }
});


TUTORIAS.views.Usuario = Backbone.View.extend({
    tagName: "tr",
    className: 'primary',
    template: _.template($("#usuario-template").html()),
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        $(".tooltips").tooltip();
        return this;
    }
});

TUTORIAS.views.posibleUsuario = Backbone.View.extend({
    tagName: "tr",
    className: 'primary',
    template: _.template($("#posible-usuario-template").html()),
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        $(".tooltips").tooltip();
        return this;
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
        $(".tooltips").tooltip();

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
    events : {
        'click .solicitar' : 'solicitar'
    },
    initialize: function() {
        console.log("Actvo");
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        $(".tooltips").tooltip();
        return this;
    },
    solicitar:function(e){
        e.preventDefault();
        new TUTORIAS.views.Solicitar({model:this.model});
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
        $(".tooltips").tooltip();
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
        $(".tooltips").tooltip();
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

window.TUTORIAS.models.usuario = Backbone.Model.extend({
   
});
window.TUTORIAS.collections.usuarios = new (Backbone.Collection.extend({
    // Reference to this collection's model.
    model: TUTORIAS.models.usuario,
    buscarUsuario: function(filtro) {
        filtered = this.filter(function(usuario) {
            return usuario.get("idPersona") === filtro || usuario.get("nombre") === filtro;
        });menu
        return filtered;
    }

}));


window.TUTORIAS.models.posibleUsuario = Backbone.Model.extend({
   
});
window.TUTORIAS.collections.posiblesUsuarios = new (Backbone.Collection.extend({
    // Reference to this collection's model.
    model: TUTORIAS.models.posibleUsuario,
    buscarPosibleUsuario: function(filtro) {
        filtered = this.filter(function(posibleUsuario) {
            return posibleUsuario.get("idPersona") === filtro || posibleUsuario.get("nombre") === filtro;
        });menu
        return filtered;
    }

}));



window.TUTORIAS.models.enProceso.alumno = Backbone.Model.extend({
});

window.TUTORIAS.collections.enProceso.alumnos = new (Backbone.Collection.extend({
    // Reference to this collection's model.
    model: TUTORIAS.models.enProceso.alumno,
    buscar: function(filtro) {
        filtered = this.filter(function(alumno) {
            return alumno.get("matricula") === filtro || alumno.get("nombre") === filtro;
        });menu
        return filtered;
    }

}));
window.TUTORIAS.models.grupo = Backbone.Model.extend({
    defaults: {
        "ultima": ''
    }
});
window.TUTORIAS.collections.grupos = new (Backbone.Collection.extend({
    //Reference to this collections's model.
    model: TUTORIAS.models.grupo
}));
window.TUTORIAS.models.alumno = Backbone.Model.extend({
    defaults: {
        "ultima": ''
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
        "solicitar/alumno/:matricula" : 'solicitarAlumno',
        "grupos": "grupos",
        "permisos": "permisos"
    },
    home: function() {
        TUTORIAS.app = new TUTORIAS.views.Layout();
        this.nav("home");
    },
    alumnos: function() {
        TUTORIAS.app = new TUTORIAS.views.Alumnos();
        this.nav("alumnos");
    },
    grupos: function() {
        TUTORIAS.app = new TUTORIAS.views.Grupos();
        this.nav("grupos");
    },
    permisos: function() {
        TUTORIAS.app = new TUTORIAS.views.Permisos();
        this.nav("permisos");
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
            TUTORIAS.collections.usuarios.add(data.usuarios);
            TUTORIAS.collections.posiblesUsuarios.add(data.posiblesUsuarios);
            new TUTORIAS.router();
            Backbone.history.start();
        }).fail(function(jqxhr, settings, exception) {
            console.log(exception);
            console.log(jqxhr)
        });

    } else {
        TUTORIAS.app = new TUTORIAS.views.Login();
        $.backstretch("img/loginbg.jpg");
    }


});