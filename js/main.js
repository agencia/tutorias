
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
TUTORIAS.views.editarUsuario = Backbone.View.extend({
    el: $("#mod"),
    template: _.template($("#modal-template").html()),
    templateBody: _.template($("#editar-usuario-form-template").html()),
    templateFooter: _.template($("#editar-usuario-footer-template").html()),
    modal:{
        title : 'Editar usuario'
    },
    events: {
        'click .btnok' : 'editarUsuario'
    },
    initialize : function(){
        this.render();
    },
    render : function(){
        this.modal.body = this.templateBody({usuario: this.model.toJSON()});
        this.modal.footer = this.templateFooter();
        this.$el.html(this.template({modal:this.modal}));
        this.$("#myModal").modal('show');
    },
    editarUsuario:function(){
        //this.$("#myModal").modal('hide');
        this.$(".modal-footer > .btn").hide();
        this.$("textarea").hide();
        this.$(".helper-while-saving").html("Informacion nueva usuario...").removeClass("hide");
        this.$("div.saving-label").removeClass("hide");
        setTimeout(function(){
            this.$("div.saving-label").hide();
            this.$("div.ok-saving-label").removeClass("hide");
        },5000);
    }
});

TUTORIAS.views.agregarUsuario = Backbone.View.extend({
    el: $("#mod"),
    template: _.template($("#modal-template").html()),
    templateBody: _.template($("#agregar-usuario-form-template").html()),
    templateFooter: _.template($("#agregar-usuario-footer-template").html()),
    modal:{
        title : 'Agregar usuario'
    },
    events: {
        'click .btnok' : 'agregarUsuario'
    },
    initialize : function(){
        this.render();
    },
    render : function(){
        this.modal.body = this.templateBody({usuario: this.model.toJSON()});
        this.modal.footer = this.templateFooter();
        this.$el.html(this.template({modal:this.modal}));
        this.$("#myModal").modal('show');
    },
    agregarUsuario:function(){
        //this.$("#myModal").modal('hide');
        this.$(".modal-footer > .btn").hide();
        this.$("textarea").hide();
        this.$(".helper-while-saving").html("Informacion nueva usuario...").removeClass("hide");
        this.$("div.saving-label").removeClass("hide");
        setTimeout(function(){
            this.$("div.saving-label").hide();
            this.$("div.ok-saving-label").removeClass("hide");
        },5000);
    }
});

TUTORIAS.views.HistorialAlumno = Backbone.View.extend({
    el : $("#app"),
    matricula : null,
    template : _.template($("#historial-alumno-template").html()),
    initialize : function(options){
        console.log(options);
        //this.matricula = options.matricula;
        this.matricula = "UP90077";
        this.modelAlumno = TUTORIAS.collections.alumnos.findWhere({matricula:this.matricula});
        console.log(this.modelAlumno);
        this.modelTutorias = TUTORIAS.collections.tutorias.where({matricula:this.matricula});
        this.render();
        _.each(this.modelTutorias,this.agregarTutoria);
    },
    render:function(){
        this.$el.html(this.template({alumno:this.modelAlumno.toJSON()}));
    },
    agregarTutoria:function(tutoria){
        var view = new TUTORIAS.views.HistorialAlumnoTutoria({model:tutoria});
        this.$("#tbl-historial > tbody").append(view.render().el);
    }
});

TUTORIAS.views.HistorialAlumnoTutoria = Backbone.View.extend({
    tagName : 'tr',
    template : _.template($("#historial-alumno-tutoria-template").html()),
    render : function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

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


TUTORIAS.views.SolicitarGrupo= Backbone.View.extend({
    el: $("#mod"),
    template: _.template($("#modal-template").html()),
    templateBody: _.template($("#solicitar-grupo-form-template").html()),
    templateFooter: _.template($("#solicitar-footer-template").html()),
    modal:{
        title : 'Solicitar Tutoria Para Grupo'
    },
    events: {
        'click .btnok' : 'solicitar'
    },
    initialize : function(){
        this.render();
    },
    render : function(){
        this.modal.body = this.templateBody({grupo: this.model.toJSON()});
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

TUTORIAS.views.Usuarios = Backbone.View.extend({
    el: $("#app"),
    template: _.template($("#usuarios-template").html()),
    events: {
    },
    initialize: function() {
        this.render();
        TUTORIAS.collections.usuarios.each(this.agregarUsuario, this);
    },
    buscarUsuario: function() {
        var filtro = $("#buscar-usuario").val();
    },
    agregarUsuario: function(usuario) {
        var view = new TUTORIAS.views.Usuario({model: usuario});
        this.$("#table-usuarios > tbody").append(view.render().el);
    },
    render: function() {
        this.$el.html(this.template());
    }
});

TUTORIAS.views.posiblesUsuarios = Backbone.View.extend({
    el: $("#app"),
    template: _.template($("#posibles-usuarios-template").html()),
    events: {
    },
    initialize: function() {
        this.render();
        TUTORIAS.collections.posiblesUsuarios.each(this.agregarPosibleUsuario, this);
    },
     buscarPosibleUsuario: function() {
      var filtro = $("#buscar-posible-usuario").val();
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
    events:{
    'click .editar-usuario' : 'editarUsuario'
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        $(".tooltips").tooltip();
        return this;
    },
    editarUsuario:function(e){
        e.preventDefault();
        console.log(this.model);
        new TUTORIAS.views.editarUsuario({model:this.model});
    }
});

TUTORIAS.views.posibleUsuario = Backbone.View.extend({
    tagName: "tr",
    className: 'primary',
    template: _.template($("#posible-usuario-template").html()),
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    events:{
    'click .agregar-usuario' : 'agregarUsuario'
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        $(".tooltips").tooltip();
        return this;
    },
    agregarUsuario:function(e){
        e.preventDefault();
        new TUTORIAS.views.agregarUsuario({model:this.model});
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
    events : {
        'click .solicitar' : 'solicitar'
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        $(".tooltips").tooltip();

        return this;
    },
    solicitar:function(e){
        e.preventDefault();
        new TUTORIAS.views.SolicitarGrupo({model:this.model});
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
        this.$("ul.navbar-right").find("p.perfil").html(this.$("ul.navbar-right").find("p.perfil").html()+ " " + TUTORIAS.token);
        //console.log(this.collection.toJSON()); #navbar > div > div.navbar-collapse.collapse > ul.nav.navbar-nav.navbar-right > li:nth-child(1) > p.navbar-text.perfil
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

window.TUTORIAS.models.tutoria = Backbone.Model.extend({});

window.TUTORIAS.collections.tutorias = new(Backbone.Collection.extend({
    model: TUTORIAS.models.tutoria
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
        "grupos": "grupos",
        "permisos/posibles_usuarios": "posibles_usuarios",
        "permisos/usuarios": "usuarios",
        "editar/usuario/:idPersona" : 'editarUsuario',
        "agregar/usuario/:idPersona" : 'editarUsuario',
        "historial/alumno/:matricula": "historialAlumno"
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
    posibles_usuarios: function() {
        TUTORIAS.app = new TUTORIAS.views.posiblesUsuarios();
        this.nav("permisos");
    },
    usuarios: function() {
        TUTORIAS.app = new TUTORIAS.views.Usuarios();
        this.nav("permisos");
    },
    historialAlumno : function(matricula){
        TUTORIAS.app = new TUTORIAS.views.HistorialAlumno({matricula:matricula});
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
            TUTORIAS.collections.tutorias.add(data.tutorias);
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
        var bg = Math.floor(Math.random() * 18);
        $.backstretch("img/loginbg-" + bg + ".jpg");
    }
});
