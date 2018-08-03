<template>
<!-- CONTENEDOR DE NAVBAR Y ASIDE-BAR-->
<div>
    <preload v-if="load" :mensaje="mensaje"></preload>
    <nav id="nav-prueba" class="side-navbar bg-dark mCustomScrollbar _mCS_1 mCS_no_scrollbar">
        <div id="mCSB_1" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" style="max-height: none;" tabindex="0">
            <div id="mCSB_1_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position: relative; top: 0px; left: 0px;" dir="ltr">
                <div class="side-navbar-wrapper">
                    <div class="sidenav-header d-flex align-items-center justify-content-center">
                        <div class="sidenav-header-inner text-center">
                            <b-link to="/inicio">
                                <b-img :src="servidor+imagen" fluid alt="Responsive image" />
                            </b-link>
                        </div>
                        <div class="sidenav-header-logo">
                            <a class="brand-small text-center"><b-link to="/inicio"> <strong class="text-dark">W</strong><strong class="text-primary">L</strong></b-link></a></div>
                    </div>
                    <div class="main-menu">
                        <!-- ASIDE BAR -->
                        <ul id="side-main-menu" class="side-menu list-unstyled">
                            <li v-for="(ruta,indice) in rutas">
                                <b-link :to="ruta" v-if="indice=='ruta_uno'" class="pintar">
                                    <!--<i class="fa fa-wpforms"></i> /lib/icons/generacion_orden.svg -->
                                    <b-img src="../../lib/icons/generar_orden.svg" fluid alt="G_O" width="25%" />
                                    <span>Generar orden de servicio</span>
                                </b-link>
                            </li>
                            <li v-for="(ruta,indice) in rutas" @click="orden()">
                                <b-link :to="ruta" v-if="indice=='ruta_dos'">
                                    <!--<i class="fa fa-truck " ></i>-->
                                    <b-img src="../../lib/icons/consulta_orden.svg" fluid alt="C_O" width="25%" />
                                    <span>Consultar ordenes de servicio</span>
                                </b-link>
                            </li>
                            <li v-for="(ruta,indice) in rutas" @click="Traza()">
                                <b-link :to="ruta" v-if="indice=='ruta_tres'">
                                    <!--<i class="fa fa-map-signs" >-->
                                    <b-img src="../../lib/icons/trazabilidad.svg" fluid alt="C_T" width="25%" />
                                    <span>Consultar trazabilidad</span>
                                </b-link>
                            </li>
                            <li v-for="(ruta,indice) in rutas">
                                <b-link :to="ruta" v-if="indice=='ruta_cuatro'">

                                    <b-img src="../../lib/icons/entradas_salidas.svg" fluid alt="C_T" width="25%" />
                                    <span>Gestionar entradas y salidas</span>
                                </b-link>
                            </li>
                            <li v-for="(ruta,indice) in rutas">
                                <b-link :to="ruta" v-if="indice=='ruta_cinco'">

                                    <b-img src="../../lib/icons/documento.svg" fluid alt="C_T" width="25%" />
                                    <span>Consultar manifiestos</span>
                                </b-link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div id="mCSB_1_scrollbar_vertical" class="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical" style="display: none;">
                <div class="mCSB_draggerContainer">
                    <div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 30px; height: 0px; top: 0px; display: block; max-height: 724.4px;">
                        <div class="mCSB_dragger_bar" style="line-height: 30px;">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </nav>
    <div id="div-prueba" class="page home-page">
        <!-- NAVBAR -->
        <header class="header " id="headerpersonalizado">
            <nav class="navbar bg-dark">
                <div class="container-fluid">
                    <div class="navbar-holder d-flex align-items-center justify-content-between">
                        <div class="navbar-header">
                            <a id="toggle-btn" class="menu-btn bg-dark text-white" @click="menu()" style="font-size:20px">		  <i class="fa fa-bars"></i>		</a>

                            <a class="navbar-brand">		  <b-link to="/inicio">		  <div class="brand-text d-none d-md-inline-block">		<span> </span><strong class="text-primary"></strong>		  </div>		  </b-link>		  </a>
                        </div>
                        <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                            <li class="nav-item">
                                <b-dropdown id="ddown-header" variant="dark" size="lg" v-show="config">
                                    <template slot="button-content">
                                        <i class="fa fa-cogs" aria-hidden="true"></i><span class="sr-only">Search</span>
                                    </template>
                                    <b-dropdown-header>Configuración WayLogistic</b-dropdown-header>
                                    
                                    <b-dropdown-item-button @click="configUsuarios">Usuarios</b-dropdown-item-button>
                                    <b-dropdown-item-button @click="configVehiculos">Vehiculos</b-dropdown-item-button>
                                    
                                    <b-dropdown-item-button @click="confiCliente">Clientes</b-dropdown-item-button>
                                    <b-dropdown-item-button @click="confiCentroC">Centros de Costo</b-dropdown-item-button>
                                    <b-dropdown-item-button @click="confiCentroL">Centros Logísticos </b-dropdown-item-button>
                                </b-dropdown>
                            </li>
                            <li class="nav-item">
                                <b-link variant="link" class="nav-link logout" @click="Salir()">
                                    Cerrar
                                    <i class="fa fa-sign-out"></i>
                                </b-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <!-- SECCION DEL HEADER Y CONTENIDO DIV-->
        <section class="dashboard-header section-padding" style="		padding-top: 1px;padding-bottom: 0px;">

            <router-view v-bind:nombreusu="nombreusu">
            </router-view>

        </section>

        <!-- FOOTER  -->
        <footer class="main-footer bg-dark">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6">
                        <p>WayLogistic &copy; 2017 Developed by <a href="http://www.waysolutions.co/" class="external">WaySolutions Technology</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        <!-- <footer class="main-footer">		<div class="container-fluid">		  <div class="row">		<div class="col-sm-6">		  <p>WaySolutions Technology © 2017</p>		</div>		<div class="col-sm-6 text-right">		  <p>Developed by <a href="" class="external">WaySolutions Tecnology</a></p>		</div>		  </div>		</div>		  </footer> -->
    </div>
</div>
</template>

<script>

import $ from "jquery";

import Preload from "../componentes/preload.vue";
import {
    bus
} from "../main";

export default {
    data() {
        return {
            config: false,
            items: [{
                text: "Inicio",
                to: "/inicio",
                active: true
            }],
            servidor: "",
            nombreusu: "",
            load: "",
            imagen: "",
            rutas: "",
            estado: true,
            mensaje: ""
        };
    },

    updated: function () {
        bus.$on(
            "load",
            function (userObject) {
                this.load = userObject.load;
                this.mensaje = userObject.mensaje;
            }.bind(this)
        );
        bus.$on(
            "items",
            function (userObject) {
                this.items = userObject.items;
            }.bind(this)
        );
    },
    methods: {
        orden() {
			/*
			BLANQUEAMOS EL LOCALSTORAGE EXISTENTE
			*/
            localStorage.removeItem("orden");
            localStorage.removeItem("remitente");
            localStorage.removeItem("fecha_orden");
            var ocultar = true;
            var eliminar = this.vali;
            setTimeout(() => {
                bus.$emit("ocultar", {
                    ocultar,
                    eliminar
                });
            });
            this.$router.replace("/inicio/consultar/resultado");
        },
        Traza() {
			/*
			SE REALIZA EL RUTEO AL COMPONENTE CONSULTA TRAZABILIDAD
			*/
            var ocultartra = true;
            setTimeout(() => {
                bus.$emit("ocultartra", {
                    ocultartra
                });
            });
            this.$router.replace("/inicio/trazabilidad/listado");
        },
        configVehiculos(){
            /*
			SE REALIZA EL RUTEO AL COMPONENTE CONFIGURACION DE USUARIOS
			*/     
			this.$router.replace("/inicio/configVehiculos");
        },
        configUsuarios() {
			/*
			SE REALIZA EL RUTEO AL COMPONENTE CONFIGURACION DE USUARIOS
			*/     
			this.$router.replace("/inicio/ConfigUsuarios");
        },
        confiCliente() {
			/*
			SE REALIZA EL RUTEO AL COMPONENTE CONFIGURACION DE CLIENTES
			*/            this.$router.replace("/inicio/configcliente");
        },
        confiCentroC() {
			/*
			SE REALIZA EL RUTEO AL COMPONENTE CONFIGURACION DE CENTROS DE COSTO
			*/ 
            this.$router.replace("/inicio/configcentroc");
        },
        confiCentroL() {
			/*
			SE REALIZA EL RUTEO AL COMPONENTE CONFIGURACION DE CENTROS lOGISTICOS
			*/ 
            this.$router.replace("/inicio/configcentrol");
        },
        menu() {
			/*
			FUNCION REALIZADA PARA LA FUNCIONALIDAD DE MINIMIZAR EL MENU
			*/
            if (this.estado == true) {
                $("#toggle-btn").click(function (e) {
                    e.preventDefault();
                    $("#div-prueba").addClass("page home-page active");
                    $("#nav-prueba").addClass(
                        "side-navbar mCustomScrollbar _mCS_1 shrink"
                    );
                    $("#div-prueba").css({
                        width: "96%"
                    });
                    $("footer").css({
                        width: "96%"
                    });
                });
                this.estado = false;
            } else {
                this.estado = true;
                $("#toggle-btn").click(function (e) {
                    e.preventDefault();
                    $("#div-prueba")
                        .removeClass("page home-page active")
                        .addClass("page home-page");
                    $("#div-prueba").css({
                        width: "95%"
                    });
                    $("#nav-prueba")
                        .removeClass("side-navbar mCustomScrollbar _mCS_1 shrink")
                        .addClass("side-navbar mCustomScrollbar _mCS_1");
                    $("#div-prueba").css({
                        width: "87%"
                    });
                    $("footer").css({
                        width: "87%"
                    });
                });
            }
        },

        Salir(val) {
            console.log("entro a salir");
            localStorage.clear();
            this.$router.replace("/");
        }
    },
    components: {
        Preload
    },

    mounted: function () {
		/*
		Apenas de se monta el componente, consulto que tipo de usuario tengo
		*/
        var test2 = localStorage.getItem("storedData");
        var test = JSON.parse(test2);
        var servi = localStorage.getItem("servidor");
        var servicios = JSON.parse(servi);
        this.nombreusu = test.nombre;
        this.imagen = test.url_logo;
        this.servidor = servicios;
        if (test.id_rol.nombre == "courier") {
            this.config = false;

            swal({
                title: "Es un Courier!",
                text: "No tiene funcionalidades en el aplicativo Web",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Salir"
            }).then(result => {
                if (result.value) {
                    localStorage.clear(); //borra todo lo que tiene el localstorage
                    this.$router.replace("/");
                } else {
                }
            });
        }
        if (test.id_rol.nombre == "cliente") {
            this.config = false;
            this.rutas = test.id_rol.rutas;
        } else {
            this.rutas = test.id_rol.rutas;
            this.config = true;
        }

    },
    beforeCreate: function () {}
};
</script>

<style>
.imagenpersonalizada:hover {
    transition-duration: 3s;
    transform: rotate(360deg);
}

nav.side-navbar span {
    display: initial;
}

nav.side-navbar .sidenav-header {
    background: white;
}

nav.side-navbar .sidenav-header img {
    width: 100px;
    height: auto;
}

nav.side-navbar .sidenav-header a:hover {
    background-color: transparent !important;
}

imagen {
    width: 50px;
    height: 18.462px;
}

ul>li>a:hover {
    text-decoration: none;
}

.cards {
    box-shadow: 1px 5px 7px 5px rgba(0, 0, 0, 0.1);
    /*margin: 2%;		/*border-top-width: 3px;		*/
    border-left-width: 0px;
    padding-left: 55px;
    padding-right: 50px;
    padding-top: 15px;
    border-bottom-width: 30px;
    padding-bottom: 30px;
    border-color: 15px gray;
}

.textb {
    color: white;
    font-size: 18px;
}

.menu {
    margin-top: 100px;
    padding: 5px;
}

.menu:hover {
    background-color: #aed6f1;
}

.navbar-custom {
    background-color: #024464;
}

/*
.jumbotron {
  background-color: white;
}
*/

.sidemenu {
    height: 900px;
}

.listado {
    padding-right: 0px;
}

.contenido {
    padding-left: 0px;
}

.logo {
    width: 10%;
    height: 5%;
}
</style>
