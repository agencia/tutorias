
window.TUTORIAS = {
    site: "tutorias.medrano.in",
    views: {},
    models: {
        enProceso: {},
        alumno: {},
        grupo: {},
        usuario :{},
        posibleUsuario:{},
        dimension:{},
        factor:{},
        dimensionFactores:{},
        solicitudes: {}

    },
    collections: {
        enProceso: {},
        grupos: {},
        alumnos: {},
        usuarios: {},
        posiblesUsuarios:{},
        dimensiones:{},
        factores:{},
        dimensionesFactores:{},
        solicitudes: {}
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
        $(".tooltips").tooltip();
    }
});

TUTORIAS.views.TutoriaAlumno = Backbone.View.extend({
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
        $(".tooltips").tooltip();
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
        $(".tooltips").tooltip();
    },
    agregarGrupo: function(grupo) {
        var view = new TUTORIAS.views.GrupoActivo({model: grupo});
        this.$("#table-grupos > tbody").append(view.render().el);
        $(".tooltips").tooltip();
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
        $(".tooltips").tooltip();
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
        $(".tooltips").tooltip();
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
        $(".tooltips").tooltip();
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
        $(".tooltips").tooltip();
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

TUTORIAS.views.Footer = Backbone.View.extend({
    el: $("#footer"),
    template: _.template($("#footer-template").html()),
    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template());
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
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        $(".tooltips").tooltip();
        return this;
    }
});

TUTORIAS.views.Dimensiones = Backbone.View.extend({
    el: $("#app"),
    template: _.template($("#dimensiones-template").html()),
    events: {
    'click #agregar-nueva-dimension' : 'agregarNuevaDimension'
    },
    initialize: function() {
        this.render();
        TUTORIAS.collections.dimensiones.each(this.agregarDimension, this);

    },
    buscarDimension: function() {
        var filtro = $("#buscar-dimension").val();
    },
    agregarDimension: function(dimension) {
        var view = new TUTORIAS.views.Dimension({model: dimension});
        this.$("#table-dimensiones > tbody").append(view.render().el);
        $(".tooltips").tooltip();
    },
    agregarNuevaDimension: function(e){
        e.preventDefault();
        new TUTORIAS.views.agregarNuevaDimension();
    },
    render: function() {
        this.$el.html(this.template());
    }
});

TUTORIAS.views.Dimension = Backbone.View.extend({
    tagName: "tr",
    className: 'primary',
    template: _.template($("#dimension-template").html()),
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    events:{
    'click .editar-dimension' : 'editarDimension'
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    editarDimension:function(e){
        e.preventDefault();
        new TUTORIAS.views.editarDimension({model:this.model});
    }
});

TUTORIAS.views.editarDimension = Backbone.View.extend({
    el: $("#mod"),
    template: _.template($("#modal-template").html()),
    templateBody: _.template($("#editar-dimension-form-template").html()),
    templateFooter: _.template($("#editar-dimension-footer-template").html()),
    modal:{
        title : 'Editar dimension'
    },
    events: {
        'click .btnok' : 'editarDimension'
    },
    initialize : function(){
        this.render();
    },
    render : function(){
        this.modal.body = this.templateBody({dimension: this.model.toJSON()});
        this.modal.footer = this.templateFooter();
        this.$el.html(this.template({modal:this.modal}));
        this.$("#myModal").modal('show');
    },
    editarDimension:function(){
        //this.$("#myModal").modal('hide');
        this.$(".modal-footer > .btn").hide();
        this.$("textarea").hide();
        this.$(".helper-while-saving").html("Informacion nueva dimension...").removeClass("hide");
        this.$("div.saving-label").removeClass("hide");
        setTimeout(function(){
            this.$("div.saving-label").hide();
            this.$("div.ok-saving-label").removeClass("hide");
        },5000);
    }
});

TUTORIAS.views.agregarNuevaDimension = Backbone.View.extend({
    el: $("#mod"),
    template: _.template($("#modal-template").html()),
    templateBody: _.template($("#agregar-dimension-form-template").html()),
    templateFooter: _.template($("#agregar-dimension-footer-template").html()),
    modal:{
        title : 'Agregar dimension'
    },
    events: {
        'click .btnok' : 'agregarNuevaDimension'
    },
    initialize : function(){
        this.render();
    },
    render : function(){
        console.log(this.model);
        this.modal.body = this.templateBody();
        this.modal.footer = this.templateFooter();
        this.$el.html(this.template({modal:this.modal}));
        this.$("#myModal").modal('show');
    },
    agregarNuevaDimension:function(){
        //this.$("#myModal").modal('hide');
        this.$(".modal-footer > .btn").hide();
        this.$("textarea").hide();
        this.$(".helper-while-saving").html("Informacion nueva dimension...").removeClass("hide");
        this.$("div.saving-label").removeClass("hide");
        setTimeout(function(){
            this.$("div.saving-label").hide();
            this.$("div.ok-saving-label").removeClass("hide");
        },5000);
    }
});

TUTORIAS.views.Factores = Backbone.View.extend({
    el: $("#app"),
    template: _.template($("#factores-template").html()),
    events: {
    'click #agregar-nuevo-factor' : 'agregarNuevoFactor'
    },
    initialize: function() {
        this.render();
        TUTORIAS.collections.factores.each(this.agregarFactor, this);

    },
    buscarFactor: function() {
        var filtro = $("#buscar-factor").val();
    },
    agregarFactor: function(factor) {
        console.log(factor);
        var view = new TUTORIAS.views.Factor({model: factor});
        this.$("#table-factores > tbody").append(view.render().el);
        $(".tooltips").tooltip();
    },
    agregarNuevoFactor: function(e){
        e.preventDefault();
        new TUTORIAS.views.agregarNuevoFactor();
    },
    render: function() {
        this.$el.html(this.template());
    }
});

TUTORIAS.views.Factor = Backbone.View.extend({
    tagName: "tr",
    className: 'primary',
    template: _.template($("#factor-template").html()),
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    events:{
    'click .editar-factor' : 'editarFactor'
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    editarFactor:function(e){
        e.preventDefault();
        new TUTORIAS.views.editarFactor({model:this.model});
    }
});

TUTORIAS.views.agregarNuevoFactor = Backbone.View.extend({
    el: $("#mod"),
    template: _.template($("#modal-template").html()),
    templateBody: _.template($("#agregar-factor-form-template").html()),
    templateFooter: _.template($("#agregar-factor-footer-template").html()),
    modal:{
        title : 'Agregar factor'
    },
    events: {
        'click .btnok' : 'agregarNuevoFactor'
    },
    initialize : function(){
        this.render();
    },
    render : function(){
        console.log(this.model);
        this.modal.body = this.templateBody();
        this.modal.footer = this.templateFooter();
        this.$el.html(this.template({modal:this.modal}));
        this.$("#myModal").modal('show');
    },
    agregarNuevoFactor:function(){
        //this.$("#myModal").modal('hide');
        this.$(".modal-footer > .btn").hide();
        this.$(".helper-while-saving").html("Informacion nueva factor...").removeClass("hide");
        this.$("div.saving-label").removeClass("hide");
        setTimeout(function(){
            this.$("div.saving-label").hide();
            this.$("div.ok-saving-label").removeClass("hide");
        },5000);
    }
});
TUTORIAS.views.editarFactor = Backbone.View.extend({
    el: $("#mod"),
    template: _.template($("#modal-template").html()),
    templateBody: _.template($("#editar-factor-form-template").html()),
    templateFooter: _.template($("#editar-factor-footer-template").html()),
    modal:{
        title : 'Editar factor'
    },
    events: {
        'click .btnok' : 'editarFactor'
    },
    initialize : function(){
        this.render();
    },
    render : function(){
        console.log(this.model);
        this.modal.body = this.templateBody({factor: this.model.toJSON()});
        this.modal.footer = this.templateFooter();
        this.$el.html(this.template({modal:this.modal}));
        this.$("#myModal").modal('show');
    },
    editarFactor:function(){
        //this.$("#myModal").modal('hide');
        this.$(".modal-footer > .btn").hide();
        this.$(".helper-while-saving").html("Informacion nueva factor...").removeClass("hide");
        this.$("div.saving-label").removeClass("hide");
        setTimeout(function(){
            this.$("div.saving-label").hide();
            this.$("div.ok-saving-label").removeClass("hide");
        },5000);
    }
});

TUTORIAS.views.Tutoria = Backbone.View.extend({
    el: $("#app"),
    //definimos  la matrícula como null
    matricula : null,
    iddimension : null,
    self : this,
    //template que mandaremos llamar con la vista
    template: _.template($("#tutoria-template").html()),
    initialize: function(options) {
        self = this;
        //Agarramos la matrícula de que viene desde la url...
        this.matricula = options.matricula;
        //agarramos la información del alumno... en el modelo modelAlumno
        this.modelAlumno = TUTORIAS.collections.enProceso.alumnos.findWhere({matricula:this.matricula});
        //agarramos todas las dimensiones que sean de tutoría individual
        this.dimensionesFactores = TUTORIAS.collections.dimensionesFactores.where({tipo : 'Tutoría Individual'});
        //Los console.log te envían las variables a la consola del navegador para ver qué valor traen..
        //console.log(this.modelAlumno);
        console.log(this.dimensionesFactores);        
        //renderizamos la vista
        this.render();
        //y ejecutamos este proceso que nos va a recorrer todas las dimensiones para irlas agregando
        //con la función de abajo agregarDimension
        _.each(this.dimensionesFactores,this.agregarDimension);
    },
    render: function() {
        //acá en el render envío el puro alumno ya al template base
        this.$el.html(this.template({alumno : this.modelAlumno.toJSON()}));
    },
    // y acá apenas voy a mandar llamar la otra vista de cada dimensión
    //Recibe cada una de las dimensiones para irlas metiendo a la lista
    agregarDimension:function(dimension){

        self.iddimension = dimension.get("iddimension"); 

        var view_menu = new TUTORIAS.views.menuDimensionTutoriaIndividual({model:dimension});
        var view_container = new TUTORIAS.views.containerDimensionTutoriaIndividual({model:dimension});
        var dim = dimension;
        //console.log(dim);

        this.$("#lista-dimensiones-tutoria-individual").append(view_menu.render().el);
        this.$("#container-dimensiones-tutoria-individual").append(view_container.render().el);

        _.each(dim.get("factores"), self.agregarFactor);

    },
    agregarFactor:function(factor){
       var view_factor = new TUTORIAS.views.factorDimension ({model:factor});
       console.log(self.iddimension);
       var div = "#lista-factores-dimension-" + self.iddimension;
       console.log(div);
       this.$(div).append(view_factor.render().el);

    }
});

TUTORIAS.views.menuDimensionTutoriaIndividual = Backbone.View.extend({
    tagName : 'li',
    template : _.template($("#menu-dimension-tutoria-template").html()),
    render : function(){
        //console.log(this.model.toJSON());
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

TUTORIAS.views.containerDimensionTutoriaIndividual = Backbone.View.extend({
    tagName : 'div',
    className: 'tab-pane',
    template : _.template($("#container-dimension-tutoria-template").html()),
    render : function(){
        //console.log(this.model.toJSON());
       $(this.el).attr('id', this.model.toJSON().iddimension ) ;
       this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

TUTORIAS.views.factorDimension = Backbone.View.extend({
    tagName : 'div',
    className : 'checkbox',
    template : _.template($("#factor-tutoria-template").html()),
    render : function(){
        console.log(this.model);
        this.$el.html(this.template(this.model));
        return this;
    }
});

TUTORIAS.views.TutoriaGrupal = Backbone.View.extend({
    el: $("#app"),
    idgrupo : null,
    iddimension : null,
    self : this,
    template: _.template($("#tutoriaGrupal-template").html()),
    initialize: function(options) {
        self = this;
        this.idgrupo = parseInt(options.idgrupo);
        console.log(options);
        this.modelgrupo = TUTORIAS.collections.enProceso.grupos.findWhere({idgrupo:this.idgrupo});
        console.log(this.idgrupo + "HOLA");
        this.dimensionesFactores = TUTORIAS.collections.dimensionesFactores.where({tipo : 'Tutoría Grupal'});
        console.log(this.dimensionesFactores);        
        this.render();
        _.each(this.dimensionesFactores,this.agregarDimension);
    },
    render: function() {
        console.log(this.modelgrupo);
        this.$el.html(this.template({grupo : this.modelgrupo.toJSON()}));
    },
    agregarDimension:function(dimension){

        self.iddimension = dimension.get("iddimension"); 

        var view_menu = new TUTORIAS.views.menuDimensionTutoriaGrupal({model:dimension});
        var view_container = new TUTORIAS.views.containerDimensionTutoriaGrupal({model:dimension});
        var dim = dimension;

        this.$("#lista-dimensiones-tutoria-grupal").append(view_menu.render().el);
        this.$("#container-dimensiones-tutoria-grupal").append(view_container.render().el);

        _.each(dim.get("factores"), self.agregarFactor);

    },
    agregarFactor:function(factor){
       var view_factor = new TUTORIAS.views.factorDimension ({model:factor});
       console.log(self.iddimension);
       var div = "#lista-factores-dimension-" + self.iddimension;
       console.log(div);
       this.$(div).append(view_factor.render().el);

    }
});

TUTORIAS.views.menuDimensionTutoriaGrupal = Backbone.View.extend({
    tagName : 'li',
    template : _.template($("#menu-dimension-tutoria-template").html()),
    render : function(){
        //console.log(this.model.toJSON());
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

TUTORIAS.views.containerDimensionTutoriaGrupal = Backbone.View.extend({
    tagName : 'div',
    className: 'tab-pane',
    template : _.template($("#container-dimension-tutoria-template").html()),
    render : function(){
        //console.log(this.model.toJSON());
       $(this.el).attr('id', this.model.toJSON().iddimension ) ;
       this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

TUTORIAS.views.SolicitudAlumnos = Backbone.View.extend({
    el: $("#app"),
    template: _.template($("#solicitud-alumnos-template").html()),
    events: {
    },
    initialize: function() {
        this.render();
        TUTORIAS.collections.solicitudes.alumnos.each(this.agregarAlumno, this);
    },
    buscarAlumno: function() {
        var filtro = $("#buscar-alumno").val();
    },
    agregarAlumno: function(alumno) {
        //console.log(alumno.toJSON());
        var view = new TUTORIAS.views.SolicitudAlumno({model: alumno});
        this.$("#table-solicitudes-alumnos > tbody").append(view.render().el);
        $(".tooltips").tooltip();
    },
    render: function() {
        this.$el.html(this.template());
    }
});

TUTORIAS.views.SolicitudAlumno = Backbone.View.extend({
    tagName: "tr",
    className: 'primary',
    template: _.template($("#solicitud-alumno-template").html()),
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});

TUTORIAS.views.SolicitudGrupos = Backbone.View.extend({
    el: $("#app"),
    template: _.template($("#solicitud-grupos-template").html()),
    events: {
    },
    initialize: function() {
        this.render();
        TUTORIAS.collections.solicitudes.grupos.each(this.agregarGrupo, this);
    },
    buscarGrupo: function() {
        var filtro = $("#buscar-grupo").val();
    },
    agregarGrupo: function(grupo) {
        console.log(parseInt(grupo));
        var view = new TUTORIAS.views.SolicitudGrupo({model: grupo});
        this.$("#table-solicitudes-grupos > tbody").append(view.render().el);
        $(".tooltips").tooltip();
    },
    render: function() {
        this.$el.html(this.template());
    }
});

TUTORIAS.views.SolicitudGrupo = Backbone.View.extend({
    tagName: "tr",
    className: 'primary',
    template: _.template($("#solicitud-grupo-template").html()),
    initialize: function() {
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

window.TUTORIAS.models.solicitudes.alumno = Backbone.Model.extend({
   
});

window.TUTORIAS.collections.solicitudes.alumnos = new (Backbone.Collection.extend({
    // Reference to this collection's model.
    model: TUTORIAS.models.solicitudes.alumno

}));

window.TUTORIAS.models.solicitudes.grupo = Backbone.Model.extend({
   
});

window.TUTORIAS.collections.solicitudes.grupos = new (Backbone.Collection.extend({
    // Reference to this collection's model.
    model: TUTORIAS.models.solicitudes.grupo

}));


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

window.TUTORIAS.models.dimension = Backbone.Model.extend({
   
});
window.TUTORIAS.collections.dimensiones = new (Backbone.Collection.extend({
    // Reference to this collection's model.
    model: TUTORIAS.models.dimension,
    buscarDimension: function(filtro) {
        filtered = this.filter(function(dimension) {
            return dimension.get("iddimension") === filtro || dimension.get("dimension") === filtro;
        });menu
        return filtered;
    }

}));
window.TUTORIAS.models.factor = Backbone.Model.extend({
   
});

window.TUTORIAS.collections.factores = new (Backbone.Collection.extend({
    // Reference to this collection's model.
    model: TUTORIAS.models.factor,
    buscarFactor: function(filtro) {
        filtered = this.filter(function(factor) {
            return factor.get("idfactor") === filtro || factor.get("factor") === filtro;
        });menu
        return filtered;
    }

}));

window.TUTORIAS.models.dimensionFactores = Backbone.Model.extend({
   
});
window.TUTORIAS.collections.dimensionesFactores = new (Backbone.Collection.extend({
    // Reference to this collection's model.
    model: TUTORIAS.models.dimensionFactores

}));

/////////// ROUTER

window.TUTORIAS.router = Backbone.Router.extend({
    initialize: function() {
        new TUTORIAS.views.NavBar();
        new TUTORIAS.views.Footer();

    },
    routes: {
        "": "home",
        "home": "home",
        "alumnos": "alumnos",
        "grupos": "grupos",
        "tutorial/alumno/:matricula": "tutoriaAlumno",
        "permisos/posibles_usuarios": "posiblesUsuarios",
        "permisos/usuarios": "usuarios",
        "editar/usuario/:idPersona" : 'editarUsuario',
        "agregar/usuario/:idPersona" : 'editarUsuario',
        "historial/alumno/:matricula": "historialAlumno",
        "dimensiones" : "dimensiones",
        "dimension/factores/:iddimension" : "factoresDimension",
        "dimension/editar/:iddimension" : "editarDimension",
        "factor/editar/:idfactor" : "editarFactor",
        "aplicar_tutoria/alumno/:matricula": "aplicarTutoria",
        "tutoria/grupo/:idgrupo" : "aplicarTutoriaGrupal",
        "solicitudes/alumnos" : "solicitudAlumnos",
        "solicitudes/grupos" : "solicitudGrupos"
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
    posiblesUsuarios: function() {
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
    tutoriaAlumno : function(matricula){
        TUTORIAS.app = new TUTORIAS.views.TutoriaAlumno({matricula:matricula});
    },
    dimensiones : function(){
        TUTORIAS.app = new TUTORIAS.views.Dimensiones();
        this.nav("dimensiones");
    },
    factoresDimension : function(iddimension){
        TUTORIAS.app = new TUTORIAS.views.Factores({iddimension:iddimension});
    },    
    nav: function(activate) {
        $("#navbar > div > div.navbar-collapse.collapse > ul:nth-child(1) > li").removeClass("active");
        $("#navbar > div > div.navbar-collapse.collapse > ul:nth-child(1) > li." + activate).addClass("active");
    },
    aplicarTutoria: function(matricula) {
        TUTORIAS.app = new TUTORIAS.views.Tutoria({matricula:matricula});
    },
    aplicarTutoriaGrupal : function(idgrupo) {
        TUTORIAS.app = new TUTORIAS.views.TutoriaGrupal({idgrupo:idgrupo});
    },
    solicitudAlumnos : function() {
        TUTORIAS.app = new TUTORIAS.views.SolicitudAlumnos();
        this.nav("solicitudes");
    },
    solicitudGrupos : function() {
        TUTORIAS.app = new TUTORIAS.views.SolicitudGrupos();
        this.nav("solicitudes");
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
            TUTORIAS.collections.dimensiones.add(data.dimensiones);
            TUTORIAS.collections.factores.add(data.factores);
            TUTORIAS.collections.dimensionesFactores.add(data.dimensionesFactores);
            TUTORIAS.collections.solicitudes.alumnos.add(data.solicitudes.alumnos);
            TUTORIAS.collections.solicitudes.grupos.add(data.solicitudes.grupos);
            console.log(data.solicitudes.grupos);

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
