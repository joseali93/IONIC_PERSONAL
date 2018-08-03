<template>
<b-container
    fluid
    class="contenedorTotal"
>

    <div class="breadcrumb-holder">

        <div class="container-fluid">

            <b-breadcrumb :items="itemsbr" />


        </div>

    </div>



    <b-container fluid>

        <b-card
            class="mt-2 border"
            header="Primary"
            header-bg-variant="primary"
        >
            <h3
                slot="header"
                class="mb-0 encabezado"
            >Entradas y salidas de proceso logístico</h3>

                <b-row>

                    <b-col md="6">

                        <h3 class="text-primary">Proceso Logistico</h3>

                    </b-col>

                    <b-col md="6">

                    </b-col>

                </b-row>

                <b-row>

                    <b-col md="6">

                        <b-form-select
                            v-model="selected"
                            text-field="nombre"
                            value-field="_id"
                            :options="procesosLog"
                            @input="procesoseleccionado"
                        >

                            </b-form-select>

                    </b-col>

                    <b-col md="6">

                        <b-btn
                            class="rounded btn-warning text-white"
                            variant="success"
                            @click="MostrarModal()"
                        >

                            <i
                                class="fa fa fa-plus"
                                aria-hidden="true"
                            ></i>&#32;Agregar movilizado

                                </b-btn>

                    </b-col>

                </b-row>

                <div class="mt-2">

                    <template v-for="(data,indice) in inputs.campos">

                        <template v-if="data.type=='text'">
                            <label class=" text-primary">{{ data.placeholder }}:</label>
                            <b-form-input
                                :id="data.id"
                                :type="data.type"
                                :placeholder="data.placeholder"
                                @input="digitar(data)"
                                :state="data.estado"
                            ></b-form-input>
                        </template>
                        <template v-if="data.type=='number'">
                            <label class=" text-primary">{{ data.placeholder }}:</label>
                            <b-form-input
                                :id="data.id"
                                :type="data.type"
                                :placeholder="data.placeholder"
                                @input="digitar(data)"
                                :state="data.estado"
                            >
                                </b-form-input>
                        </template>
                        <template v-if="data.type=='select'">
                            <h3 class=" text-primary">{{data.placeholder}}</h3>
                            <b-form-select
                                :id="data.id"
                                :value="valores(indice,data)"
                                text-field="nombre"
                                value-field="_id"
                                :options="opciones[indice]"
                                @change="seleccionado(data)"
                                :state="data.estado"
                            >
                                </b-form-select>
                        </template>
                    </template>

                </div>

                <b-row v-show="proceSeleccionado.atencion_courier==true">

                    <b-col>

                        <h3 class="text-primary">Courier</h3>

                        <b-form-select
                            v-model="curier"
                            text-field="nombre"
                            value-field="_id"
                            :options="curiers2"
                            class="mb-3"
                            :state="Scurier"
                        >

                            </b-form-select>

                    </b-col>

                </b-row>

                <b-row class="my-1 text-primary">

                    <b-col class="my-3">

                        Total de Movilizados :

                        <strong>

                        {{itemsmovilizados.length}}

                        </strong>

                    </b-col>

                    <b-col class="my-3">

                        Total de Unidades :

                        <strong>

                        {{mostrar()}}

                        </strong>

                    </b-col>

                </b-row>

                <b-row v-show="itemsmovilizados.length>0">

                    <b-btn
                        variant="success"
                        @click="generarManifiesto"
                        :disabled="manifiesto"
                    >

                        Generar

                        </b-btn>

                </b-row>

                </b-card>

    </b-container>




    <router-view></router-view>

    <!-- Modal Component -->

    <b-modal
        id="modal1"
        ref="myModalRef"
        size="lg"
        :no-close-on-esc="true"
    >
        <div slot="modal-header">
            <h2 class="text-secondary m-0">Movilizados</h2>
        </div>
        <b-container fluid>
            <b-row class="my-1">
                <b-col>
                    <b-form-select
                        v-model="concepto"
                        :options="listadoconcepto"
                        text-field="nombre"
                        value-field="_id"
                        class="my-1"
                    >
                        </b-form-select>
                </b-col>
            </b-row>
            <b-row class="my-1">
                <b-col>
                    <b-form-input
                        v-model="text1"
                        class="float-left"
                        type="number"
                        id="nmovilizado"
                        placeholder="Número Movilizado"
                        @keyup.enter.native="adicionar(text1)"
                        v-b-tooltip.hover
                        title="Número de Movilizado!"
                    ></b-form-input>
                </b-col>
            </b-row>
            <b-row class="mt-3 text-primary text-center font-weight-normal">
                <b-col md="6">
                    <h3 class="mb-0">Total de Movilizados:</h3>
                    <h4 class="mb-0 mt-1">{{ itemsmovilizados.length }}</h4>
                </b-col>
                <b-col md="6">
                    <h3 class="mb-0">Total de Unidades:</h3>
                    <h4 class="mb-0 mt-1">{{ mostrar() }}</h4>
                </b-col>
            </b-row>
            <b-card
                v-if="itemsmovilizados.length"
                header="Primary"
                header-bg-variant="primary"
                class="my-2 border"
            >
                <h3
                    slot="header"
                    class="mb-0"
                >Listado de movilizados</h3>
                    <b-table
                        striped
                        hover
                        :fields="fields"
                        :items="itemsmovilizados"
                        :per-page="5"
                        :current-page="currentPage"
                    >
                        <template
                            slot="elimnar"
                            slot-scope="data"
                        >
                            <b-btn
                                variant="danger"
                                @click="borrar(data)"
                            >
                                <i
                                    class="fa fa-trash-o"
                                    aria-hidden="true"
                                ></i>
                                    </b-btn>
                                    </template>
                                    <template
                                        slot="nmovilizado"
                                        slot-scope="data"
                                    >
                                        {{data.item.id}}
                                        </template>
                                        <template
                                            slot="unidades"
                                            slot-scope="data"
                                        >
                                            {{data.item.unidades}}
                                            </template>
                                            <template
                                                slot="concepto"
                                                slot-scope="data"
                                            >
                                                {{data.item.concepto.nombre}}
                                                </template>
                                                </b-table>
                                                <b-pagination
                                                    size="md"
                                                    :total-rows="itemsmovilizados.length"
                                                    v-model="currentPage"
                                                    :per-page="5"
                                                >
                                                    </b-pagination>
                                                    </b-card>
        </b-container>
        <div slot="modal-footer">
            <b-button
                class="rounded"
                size="md"
                variant="info"
                @click="$refs.myModalRef.hide()"
            >
                <i class="fa fa-times-circle"></i>&#32;Cerrar
                </b-button>
        </div>
        </b-modal>



        </b-container>
</template>


<script>
import {
    bus
} from "../main";
import {
    urlservicios
} from "../main";
import Preload from "../componentes/preload.vue";
import io from 'socket.io-client'
import {
    CreateSocket
} from './utils/socket'

export default {
    data() {
        return {
            validacionsockets:'',
            procesoSelected: '',
            observacionesManifiesto: '',
            socket: null,
            manifiesto: false,
            itemsbr: [{
                    text: "Inicio",
                    to: "/inicio"
                },
                {
                    text: "Entradas y Salidas",
                    to: "/inicio/entradasalida",
                    active: true
                },

            ],
            medios: [],
            model_medios: '',
            errores: [],
            bandera: 0,
            value: [],
            id_centrologistico: null,
            validacionModal: "",
            Scurier: null,
            processSelected: "",
            concepto: null,
            listadoconcepto: [],
            opciones: [],
            curier: null,
            centrologistico: {},
            curiers: {},
            curiers2: {},
            objeto: "",
            pre: "",
            procesosLog: {},
            inputs: "",
            currentPage: 1,
            fields: [
                "elimnar",
                "nombre",
                {
                    key: "nmovilizado",
                    label: "N Movilizado"
                },
                {
                    key: "unidades",
                    label: "Unidades"
                },
                {
                    key: "concepto",
                    label: "Concepto"
                }
            ],
            items: [{
                nmovilizado: "",
                nombre: ""
            }],
            itemsmovilizados: [],
            text1: "",
            selected: null,
            proceSeleccionado: "",
            selected2: null,
            mensaje: ""
        };
    },
    methods: {

        metodo(errores) {
            for (var o = 0; o < this.itemsmovilizados.length; o++) {
                for (var x = 0; x < errores.length; x++) {
                    if (errores[x].id == this.itemsmovilizados[o].id) {
                        this.itemsmovilizados.splice(o, 1)
                    }
                }
            }
        },
        valores(valores, inputs) {
            var guardadoManifiesto = localStorage.getItem("Manifiesto");
            var infoguardadoManifiesto = JSON.parse(guardadoManifiesto);
            //this.objeto=infoguardadoManifiesto.inputs
            if (infoguardadoManifiesto == null || infoguardadoManifiesto == "null") {
                return null;
            } else {
                var llaves = Object.keys(infoguardadoManifiesto.inputs);
                if (this.bandera == 0 || this.bandera == 1) {
                    this.bandera = this.bandera + 1;
                    eval(
                        "this.objeto." +
                        llaves[valores] +
                        "=" +
                        "infoguardadoManifiesto.inputs." +
                        llaves[valores]
                    );
                    return eval("this.objeto." + llaves[valores]);
                } else {
                    return eval("this.objeto." + llaves[valores]);
                }
            }
        },
        MostrarModal() {
            var bandera;
            if (this.objeto == undefined || this.objeto == "") {
                if (this.inputs == "") {
                    if (this.curier == "null" || this.curier == null) {
                        swal("Debe completarse", "Seleccione los campos previos", "error", {
                            allowEnterKey: true
                        });
                    } else {
                        this.$refs.myModalRef.show();
                    }
                } else {
                    swal("Debe completarse", "Seleccione los campos previos", "error", {
                        allowEnterKey: true
                    });
                }
            } else {
                var llaves = Object.keys(this.objeto);

                for (var x = 0; x < llaves.length; x++) {
                    if (
                        eval("this.objeto." + llaves[x]) == "null" ||
                        eval("this.objeto." + llaves[x]) == null
                    ) {
                        bandera = true;
                    }
                }
                if (bandera == true) {
                    swal(
                        "Debe completarse",
                        "Algun Campo esta pendiente de Seleccionar",
                        "error", {
                            allowEnterKey: true
                        }
                    );
                } else {
                    this.$refs.myModalRef.show();
                }
            }
        },
        mostrar() {
            var unidades = 0;
            if (this.itemsmovilizados.length <= 0) {
                return 0;
            } else {
                for (var x = 0; x < this.itemsmovilizados.length; x++) {
                    if (
                        this.itemsmovilizados[x].unidades == 0 ||
                        this.itemsmovilizados[x].unidades == "0" ||
                        this.itemsmovilizados[x].unidades == null ||
                        this.itemsmovilizados[x].unidades == "null"
                    ) {
                        unidades = unidades + 1;
                    } else {
                        unidades = unidades + parseInt(this.itemsmovilizados[x].unidades);
                    }
                }
                return unidades;
            }
        },
        borrar(value) {
            this.itemsmovilizados.splice(value.index, 1);
        },
        generarManifiesto() {

            var login = localStorage.getItem("storedData");
            var infologin = JSON.parse(login);
            if (infologin.id_OperadorLogistico.confirmacionSocket == true) {
                if (this.proceSeleccionado.atencion_courier == true) {
                    var load = true;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                    this.socket.emit('new-message', {
                        idOperador: infologin.id_OperadorLogistico._id, //per logistico
                        idOrigen: infologin._id, //id usuario
                        idDestino: this.curier, //id courier seleccionado
                        mensaje: {
                            contacto: '', //nombre remitente
                            direccion: '', //direccion remitente
                            observaciones: " Ruta",
                            num_movilizados: this.itemsmovilizados.length, //cantidad movilizados orden
                            tipo_proceso: 2
                        }
                    })
                    this.validacionsockets=setTimeout(function(){
                        swal(
                        'No se obtuvo respuesta del courier!',
                        '',
                        'warning'
                        )
                        var load = false;
                        var mensaje = 'Esperando respuesta del courier'
                        setTimeout(() => {
                        bus.$emit("load", {
                            load,mensaje
                        });
                        });
                        }, 35000)
                } else {
                    console.log("manifiesto de entrada");
                    var load = true;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                    this.Scurier = null
                    var objvario = [{},
                        {}
                    ]
                    if (this.objeto == undefined) {

                        this.objeto = []
                        for (var j = 0; j < this.curiers2.length; j++) {
                            if (this.curier == this.curiers2[j]._id) {
                                objvario[0] = [null]
                                objvario[1] = this.curiers2[j]
                            }
                        }
                    } else {
                        var llaves = Object.keys(this.objeto)
                        var bandera
                        for (var x = 0; x < llaves.length; x++) {
                            this.inputs.campos[x].estado = null
                        }
                        for (var x = 0; x < llaves.length; x++) {
                            if (eval('this.objeto.' + llaves[x]) == '' || eval('this.objeto.' + llaves[x]) == null) {
                                this.inputs.campos[x].estado = false
                                swal("Debe completarse",
                                    "Seleccione " + this.inputs.campos[x].placeholder,
                                    "error", {
                                        allowEnterKey: true,
                                    });
                                bandera = true
                            }
                        }
                    }

                    var inforinputs = []
                    if (this.objeto == undefined) {
                        this.objeto = []
                    } else {
                        for (var x = 0; x < this.opciones.length; x++) {
                            var llaves = Object.keys(this.objeto)
                            for (var y = 0; y < this.opciones[x].length; y++) {
                                if (this.opciones[x][y]._id == eval('this.objeto.' + llaves[x])) {
                                    inforinputs[x] = this.opciones[x][y]
                                }
                            }
                        }
                    }
                    var inforvaria
                    if (inforinputs.length == 0) {
                        inforvaria = objvario
                    } else {
                        inforvaria = inforinputs
                    }

                    var itemsmodal = this.itemsmovilizados
                    var varios = []
                    var listMovilizados = {}
                    for (var x = 0; x < this.itemsmovilizados.length; x++) {
                        if (this.itemsmovilizados[x].concepto._id == null ||
                            this.itemsmovilizados[x].concepto._id == undefined) {
                            var listMovilizados = {
                                numeroMovilizado: this.itemsmovilizados[x].id
                            }
                            varios.push(listMovilizados)
                        } else {
                            var listMovilizados = {
                                nombre_concepto: this.itemsmovilizados[x].concepto.nombre,
                                id_concepto: this.itemsmovilizados[x].concepto._id,
                                numeroMovilizado: this.itemsmovilizados[x].id
                            }
                            varios.push(listMovilizados)
                        }
                    }
                
                
                var envio = {
                    listadoMovilizados: varios,
                    infoManifiesto: this.objeto,
                    id_procesoLogistico: this.processSelected._id
                }
                var validacion
                var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                        load
                    });
                });
                this.axios
                    .post(urlservicios+ "GenerarManifiestoWeb", envio)
                    .then(response => {
                        if (response.data.validacion == true) {
                            this.manifiesto = true
                            localStorage.removeItem('Manifiesto');
                            var nmanifiesto = response.data.manifiesto
                            setTimeout(() => {
                                bus.$emit('modalinfo', {
                                    itemsmodal,
                                    inforvaria,
                                    nmanifiesto
                                })
                            }, )
                            this.selected=null
                            this.$router.push(this.processSelected.modal)
                        }
                        if (response.data.validacion == false) {
                            this.manifiesto = false
                            var Movilizados = response.data.listaMovilizadoConManifiesto
                            this.errores = response.data.listaMovilizadoConManifiesto
                            var n_movilizados = ''
                            for (var o = 0; o < Movilizados.length; o++) {
                                if (o == Movilizados.length - 1) {
                                    n_movilizados = n_movilizados + Movilizados[o].id
                                } else {
                                    n_movilizados = n_movilizados + Movilizados[o].id + ', '

                                }

                            }
                            this.errores = Movilizados
                            //this.$refs.myModalRef2.show()
                            var titulo1_inicio = '<div class="prueba"><ul>'
                            var conten_1 = ''
                            var conten_2 = ''
                            var titulo1_fin = '</ul></div><br><h3><strong>Desea Retirarlos del Manifiesto?</strong></h3>'
                            var prueba
                            var total
                            for (var y = 0; y < this.errores.length; y++) {
                                conten_1 = conten_1 + '<li>' + this.errores[y].id + ' - ' + this.errores[y].NombreProceso + '</li>'
                                conten_2 = conten_2 + '<li>' + this.errores[y].NombreProceso + '</li>'


                            }
                            total = titulo1_inicio + conten_1 + titulo1_fin
                            swal({
                                title: 'El manifiesto no se puede generar por que los movilizados ya se encuentran procesados',
                                type: 'info',
                                html: total,
                                showCloseButton: true,
                                showCancelButton: true,
                                focusConfirm: false,
                                confirmButtonText: 'Si',
                                confirmButtonAriaLabel: '',
                                cancelButtonText: 'No',
                                cancelButtonAriaLabel: '',
                            }).then((result) => {
                                if (result.value) {
                                    this.metodo(this.errores); // this should execute now

                                }

                            });

                        }
                        var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                                load
                            });
                        });
                    })
                    .catch(function (error) {
                        var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                                load
                            });
                        });
                        swal(
                            "Se presento un problema",
                            "Intente nuevamente, por favor",
                            "warning"
                        );
                    });
                }
                /*

                */
                
            } else {
                this.Scurier = null
                var objvario = [{},
                    {}
                ]
                if (this.objeto == undefined) {

                    this.objeto = []
                    for (var j = 0; j < this.curiers2.length; j++) {
                        if (this.curier == this.curiers2[j]._id) {
                            objvario[0] = [null]
                            objvario[1] = this.curiers2[j]
                        }
                    }
                } else {
                    var llaves = Object.keys(this.objeto)
                    var bandera
                    for (var x = 0; x < llaves.length; x++) {
                        this.inputs.campos[x].estado = null
                    }
                    for (var x = 0; x < llaves.length; x++) {
                        if (eval('this.objeto.' + llaves[x]) == '' || eval('this.objeto.' + llaves[x]) == null) {
                            this.inputs.campos[x].estado = false
                            swal("Debe completarse",
                                "Seleccione " + this.inputs.campos[x].placeholder,
                                "error", {
                                    allowEnterKey: true,
                                });
                            bandera = true
                        }
                    }
                }

                var inforinputs = []
                if (this.objeto == undefined) {
                    this.objeto = []
                } else {
                    for (var x = 0; x < this.opciones.length; x++) {
                        var llaves = Object.keys(this.objeto)
                        for (var y = 0; y < this.opciones[x].length; y++) {
                            if (this.opciones[x][y]._id == eval('this.objeto.' + llaves[x])) {
                                inforinputs[x] = this.opciones[x][y]
                            }
                        }
                    }
                }
                var inforvaria
                if (inforinputs.length == 0) {
                    inforvaria = objvario
                } else {
                    inforvaria = inforinputs
                }

                var itemsmodal = this.itemsmovilizados
                var varios = []
                var listMovilizados = {}
                for (var x = 0; x < this.itemsmovilizados.length; x++) {
                    if (this.itemsmovilizados[x].concepto._id == null ||
                        this.itemsmovilizados[x].concepto._id == undefined) {
                        var listMovilizados = {
                            numeroMovilizado: this.itemsmovilizados[x].id
                        }
                        varios.push(listMovilizados)
                    } else {
                        var listMovilizados = {
                            nombre_concepto: this.itemsmovilizados[x].concepto.nombre,
                            id_concepto: this.itemsmovilizados[x].concepto._id,
                            numeroMovilizado: this.itemsmovilizados[x].id
                        }
                        varios.push(listMovilizados)
                    }
                }

                if (this.proceSeleccionado.atencion_courier == true) {

                    if (this.curier != "null" && this.curier != '' && this.curier != null) {
                        this.Scurier = null
                    } else {
                        swal("Debe completarse",
                            "Seleccione un curier",
                            "error", {
                                allowEnterKey: true,
                            });
                        this.Scurier = false
                    }
                    var envio = {
                        listadoMovilizados: varios,
                        infoManifiesto: this.objeto,
                        id_procesoLogistico: this.processSelected._id,
                        id_courier: this.curier
                    }
                } else {
                    var envio = {
                        listadoMovilizados: varios,
                        infoManifiesto: this.objeto,
                        id_procesoLogistico: this.processSelected._id
                    }
                }
                var validacion
                var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                        load
                    });
                });
                this.axios
                    .post(urlservicios+ "GenerarManifiestoWeb", envio)
                    .then(response => {
                        if (response.data.validacion == true) {
                            this.manifiesto = true
                            localStorage.removeItem('Manifiesto');
                            var nmanifiesto = response.data.manifiesto
                            setTimeout(() => {
                                bus.$emit('modalinfo', {
                                    itemsmodal,
                                    inforvaria,
                                    nmanifiesto
                                })
                            }, )
                            this.$router.push(this.processSelected.modal)

                        }
                        if (response.data.validacion == false) {
                            this.manifiesto = false
                            var Movilizados = response.data.listaMovilizadoConManifiesto
                            this.errores = response.data.listaMovilizadoConManifiesto
                            var n_movilizados = ''
                            for (var o = 0; o < Movilizados.length; o++) {
                                if (o == Movilizados.length - 1) {
                                    n_movilizados = n_movilizados + Movilizados[o].id
                                } else {
                                    n_movilizados = n_movilizados + Movilizados[o].id + ', '

                                }

                            }
                            this.errores = Movilizados
                            //this.$refs.myModalRef2.show()
                            var titulo1_inicio = '<div class="prueba"><ul>'
                            var conten_1 = ''
                            var conten_2 = ''
                            var titulo1_fin = '</ul></div><br><h3><strong>Desea Retirarlos del Manifiesto?</strong></h3>'
                            var prueba
                            var total
                            for (var y = 0; y < this.errores.length; y++) {
                                conten_1 = conten_1 + '<li>' + this.errores[y].id + ' - ' + this.errores[y].NombreProceso + '</li>'
                                conten_2 = conten_2 + '<li>' + this.errores[y].NombreProceso + '</li>'


                            }
                            total = titulo1_inicio + conten_1 + titulo1_fin
                            swal({
                                title: 'El manifiesto no se puede generar por que los movilizados ya se encuentran procesados',
                                type: 'info',
                                html: total,
                                showCloseButton: true,
                                showCancelButton: true,
                                focusConfirm: false,
                                confirmButtonText: 'Si',
                                confirmButtonAriaLabel: '',
                                cancelButtonText: 'No',
                                cancelButtonAriaLabel: '',
                            }).then((result) => {
                                if (result.value) {
                                    this.metodo(this.errores); // this should execute now

                                }

                            });

                        }
                        var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                                load
                            });
                        });
                    })
                    .catch(function (error) {
                        var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                                load
                            });
                        });
                        swal(
                            "Se presento un problema",
                            "Intente nuevamente, por favor",
                            "warning"
                        );
                    });

            }
        },
        /*
        generarManifiesto() {
          var login = localStorage.getItem("storedData");
          var infologin = JSON.parse(login);
                this.Scurier
                var objvario=[
                  {},
                  {}
                ]
                if(this.objeto==undefined){
                    this.objeto=[]
                    for(var j=0;j<this.curiers2.length;j++){
                      if(this.curier==this.curiers2[j]._id){
                        objvario[0]=[null]
                        objvario[1]=this.curiers2[j]
                      }
                    }
                }
                else{
                    var llaves=Object.keys(this.objeto)
                    var bandera
                    for(var x=0;x<llaves.length;x++){
                    this.inputs.campos[x].estado=null
                    }
                    for(var x=0;x<llaves.length;x++){
                        if(eval('this.objeto.'+llaves[x])==''||eval('this.objeto.'+llaves[x])==null)
                        {
                            this.inputs.campos[x].estado=false
                            swal("Debe completarse",
                            "Seleccione "+this.inputs.campos[x].placeholder,
                            "error",{
                                  allowEnterKey: true,
                            });
                            bandera=true
                        }
                    }
                    if(bandera==true)
                    {
                    }
                    else
                    {
                    }
                }

                var inforinputs=[]
                if(this.objeto==undefined){
                    this.objeto=[]
                }else{
                    for(var x=0;x<this.opciones.length;x++){
                    var llaves=Object.keys(this.objeto)
                    for(var y=0;y<this.opciones[x].length;y++)
                    {
                        if(this.opciones[x][y]._id==eval('this.objeto.'+llaves[x]))
                        {
                            inforinputs[x]=this.opciones[x][y]
                        }
                    }
                    }
                }
               var inforvaria
               if(inforinputs.length==0){
                inforvaria=objvario
               }else{
                 inforvaria=inforinputs
               }

                var itemsmodal=this.itemsmovilizados
                var varios=[]
                var listMovilizados={
                }
                for(var x=0;x<this.itemsmovilizados.length;x++){
                    if(this.itemsmovilizados[x].concepto._id==null||
                    this.itemsmovilizados[x].concepto._id==undefined)
                    {
                         var listMovilizados={
                         numeroMovilizado:this.itemsmovilizados[x].id
                         }
                        varios.push(listMovilizados)
                    }
                    else{
                         var listMovilizados={
                             nombre_concepto:this.itemsmovilizados[x].concepto.nombre,
                        id_concepto:this.itemsmovilizados[x].concepto._id,
                        numeroMovilizado:this.itemsmovilizados[x].id
                         }
                                         varios.push(listMovilizados)
                    }
                }

                if(this.proceSeleccionado.atencion_courier==true){

                    if(this.curier!="null"&&this.curier!=''&&this.curier!=null)
                    {
                       this.Scurier=null
                    }
                    else{
                        swal("Debe completarse",
                            "Seleccione un curier",
                            "error",{
                                  allowEnterKey: true,
                            });
                        this.Scurier=false
                    }
                  var envio ={
                      listadoMovilizados:varios,
                      infoManifiesto:this.objeto,
                      id_procesoLogistico:this.processSelected._id,
                      //procesoSistena:5,
                      id_courier:this.curier
                  }
                }
                else{

                }
                var validacion


              if(infologin.id_OperadorLogistico.confirmacionSocket==true&&this.proceSeleccionado.atencion_courier==true){
                if(this.curier!="null"&&this.curier!=''&&this.curier!=null)
                {
                    this.Scurier=null
                }
                else{
                    swal("Debe completarse",
                        "Seleccione un curier",
                        "error",{
                              allowEnterKey: true,
                        });
                    this.Scurier=false
                }
                var load = true;
                setTimeout(() => {
                  bus.$emit("load", {
                    load
                  });
                });
                const swalWithBootstrapButtons = swal.mixin({
                  confirmButtonClass: 'btn btn-success',
                  cancelButtonClass: 'btn btn-danger',
                  buttonsStyling: true,
                })
                 var load = false;
                setTimeout(() => {
                  bus.$emit("load", {
                    load
                  });
                });
                swalWithBootstrapButtons({
                  //title: 'Desea adicionar un comentario extra para el courier',
                  text: "Desea adicionar un comentario extra para el courier",
                  type: 'info',
                  showCancelButton: true,
                  confirmButtonText: 'Si',
                  cancelButtonText: 'No',
                  reverseButtons: false
                }).then((result) => {
                  if (result.value) {

                          swal({
                      title: 'Observaciones al courier',
                      input: 'text',
                      inputAttributes: {
                        autocapitalize: 'on'
                      },
                      showCancelButton: false,
                      confirmButtonText: 'Aceptar',
                      showLoaderOnConfirm: true,
                      preConfirm: (login) => {

                      },
                      allowOutsideClick: () => !swal.isLoading()
                    }).then((result) => {
                      var load = true;
                      setTimeout(() => {
                        bus.$emit("load", {
                          load
                        });
                      });
                      this.socket.emit('new-message', {
                        idOperador:infologin.id_OperadorLogistico._id,//per logistico
                        idOrigen:infologin._id,//id usuario
                        idDestino:this.curier,//id courier seleccionado
                        mensaje :{
                            contacto:'',//nombre remitente
                            direccion:'',//direccion remitente
                            observaciones:result.value,
                            num_movilizados:varios.length,//cantidad movilizados orden
                            tipo_proceso:2
                          }
                      })

                    })

                  } else if (
                    // Read more about handling dismissals
                    result.dismiss === swal.DismissReason.cancel
                  ) {
                      var load = true;
                      setTimeout(() => {
                        bus.$emit("load", {
                          load
                        });
                      });
                    this.socket.emit('new-message', {
                        idOperador:infologin.id_OperadorLogistico._id,//per logistico
                        idOrigen:infologin._id,//id usuario
                        idDestino:this.curier,//id courier seleccionado
                        mensaje :{
                            contacto:"",//nombre remitente
                            direccion:"",//direccion remitente
                            observaciones:'',
                            num_movilizados:varios.length,//cantidad movilizados orden
                            tipo_proceso:2
                          }
                      })
                  }
                })
                /*
                this.socket.emit('new-message', {
                  idOperador:infologin.id_OperadorLogistico._id,//per logistico
                  idOrigen:infologin._id,//id usuario
                  idDestino:this.curier,//id courier seleccionado
                  mensaje :{
                      contacto:"this.currentUser.remitente.nombre_contacto",//nombre remitente
                      direccion:"this.currentUser.remitente.direccion_recogida",//direccion remitente
                      observaciones:"this.currentUser.remitente.direccion_recogida",
                      num_movilizados:varios.length,//cantidad movilizados orden
                      tipo_proceso:2
                    }
                })
              }
              else {

                if(this.proceSeleccionado.atencion_courier==true){
                  var envio ={
                    listadoMovilizados:varios,
                    infoManifiesto:this.objeto,
                    id_procesoLogistico:this.processSelected._id,
                    id_courier:this.curier
                  }
                  var load = true;
                            setTimeout(() => {
                                bus.$emit("load", {
                                load
                                });
                            });
                this.axios
                .post(urlservicios+"GenerarManifiestoWeb", envio)
                .then(response => {
                    if(response.data.validacion==true){
                      this.manifiesto=true
                       localStorage.removeItem('Manifiesto');
                        var nmanifiesto=response.data.manifiesto
                        setTimeout(() => {
                            bus.$emit('modalinfo', {
                                itemsmodal,inforvaria,nmanifiesto
                            })
                            }, )

                        this.$router.push(this.processSelected.modal)
                    }
                    if(response.data.validacion==false){
                      this.manifiesto=false
                      var Movilizados=response.data.listaMovilizadoConManifiesto
                      this.errores=response.data.listaMovilizadoConManifiesto
                      var n_movilizados=''
                      for(var o=0;o<Movilizados.length;o++){
                        if(o==Movilizados.length-1){
                          n_movilizados=n_movilizados+ Movilizados[o].id
                        }
                        else{
                        n_movilizados=n_movilizados+ Movilizados[o].id+', '

                        }

                      }
                      this.errores=Movilizados
                      //this.$refs.myModalRef2.show()
                      var titulo1_inicio='<div class="prueba"><ul>'
                      var conten_1=''
                      var conten_2=''
                      var titulo1_fin='</ul></div><br><h3><strong>Desea Retirarlos del Manifiesto?</strong></h3>'
                      var prueba
                      var total
                       for(var y=0;y<this.errores.length;y++){
                      conten_1=conten_1+'<li>'+this.errores[y].id+' - '+this.errores[y].NombreProceso+'</li>'
                      conten_2=conten_2+'<li>'+this.errores[y].NombreProceso+'</li>'


                    }
                  total=titulo1_inicio+conten_1+titulo1_fin
                                        swal({
                    title: 'El manifiesto no se puede generar por que los movilizados ya se encuentran procesados',
                    type: 'info',
                    html: total,
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText:
                      'Si',
                    confirmButtonAriaLabel: '',
                    cancelButtonText:
                    'No',
                    cancelButtonAriaLabel: '',
                  }).then((result)=> {
                    if(result.value){
                    this.metodo(this.errores); // this should execute now

                    }

                  });

                    }
                    var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                load
                                });
                            });
                })
                .catch(function(error) {
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                load
                                });
                            });
                            swal(
                                "Se presento un problema",
                                "Intente nuevamente, por favor",
                                "warning"
                            );
                });
                }
                else{
                  var envio ={
                    listadoMovilizados:varios,
                    infoManifiesto:this.objeto,
                    id_procesoLogistico:this.processSelected._id,
                    //id_courier:this.curier
                  }
                  var load = true;
                            setTimeout(() => {
                                bus.$emit("load", {
                                load
                                });
                            });
                this.axios
                .post(urlservicios+"GenerarManifiestoWeb", envio)
                .then(response => {
                    if(response.data.validacion==true){
                      this.manifiesto=true
                       localStorage.removeItem('Manifiesto');
                        var nmanifiesto=response.data.manifiesto
                        setTimeout(() => {
                            bus.$emit('modalinfo', {
                                itemsmodal,inforvaria,nmanifiesto
                            })
                            }, )

                        this.$router.push(this.processSelected.modal)
                    }
                    if(response.data.validacion==false){
                      this.manifiesto=false
                      var Movilizados=response.data.listaMovilizadoConManifiesto
                      this.errores=response.data.listaMovilizadoConManifiesto
                      var n_movilizados=''
                      for(var o=0;o<Movilizados.length;o++){
                        if(o==Movilizados.length-1){
                          n_movilizados=n_movilizados+ Movilizados[o].id
                        }
                        else{
                        n_movilizados=n_movilizados+ Movilizados[o].id+', '

                        }

                      }
                      this.errores=Movilizados
                      //this.$refs.myModalRef2.show()
                      var titulo1_inicio='<div class="prueba"><ul>'
                      var conten_1=''
                      var conten_2=''
                      var titulo1_fin='</ul></div><br><h3><strong>Desea Retirarlos del Manifiesto?</strong></h3>'
                      var prueba
                      var total
                       for(var y=0;y<this.errores.length;y++){
                      conten_1=conten_1+'<li>'+this.errores[y].id+' - '+this.errores[y].NombreProceso+'</li>'
                      conten_2=conten_2+'<li>'+this.errores[y].NombreProceso+'</li>'


                    }
                  total=titulo1_inicio+conten_1+titulo1_fin
                                        swal({
                    title: 'El manifiesto no se puede generar por que los movilizados ya se encuentran procesados',
                    type: 'info',
                    html: total,
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText:
                      'Si',
                    confirmButtonAriaLabel: '',
                    cancelButtonText:
                    'No',
                    cancelButtonAriaLabel: '',
                  }).then((result)=> {
                    if(result.value){
                    this.metodo(this.errores); // this should execute now

                    }

                  });

                    }
                    var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                load
                                });
                            });
                })
                .catch(function(error) {
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                load
                                });
                            });
                            swal(
                                "Se presento un problema",
                                "Intente nuevamente, por favor",
                                "warning"
                            );
                });
                }



              }


        },
        */
        digitar(value) {
            setTimeout(
                function () {
                    var x = document.getElementById(value.id).value;
                    if (x == "" || x == null || x == "") {
                        eval("this.objeto." + value.vmodel + "=" + value.min);
                        document.getElementById(value.id).value = value.min;
                    } else {
                        if (x > value.max) {
                            document.getElementById(value.id).value = value.min;
                            eval("this.objeto." + value.vmodel + "=" + value.min);
                        } else {
                            eval("this.objeto." + value.vmodel + "=" + "x");
                        }
                    }
                }.bind(this)
            );
        },
        seleccionado(value) {
            var x = document.getElementById(value.id).value;
            eval("this.objeto." + value.vmodel + "=" + "x");
        },
        adicionar(value) {
            var agregar = true;
            var infoconcepto;
            var algo;
            if (this.concepto == null) {
                infoconcepto = {};
            } else {
                for (var x = 0; x < this.listadoconcepto.length; x++) {
                    if (this.listadoconcepto[x]._id == this.concepto) {
                        infoconcepto = this.listadoconcepto[x];
                    }
                }
            }
            if (value == null || value == "") {

                swal({
                    title: "Error!",
                    text: "Ingrese un valor por favor",
                    type: "error",
                    focusConfirm: true,
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: true,
                    timer: 3000
                });
            } else {
                var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                        load
                    });
                });
                if (this.processSelected.Entrada == true) {
                    this.inputs.campos.forEach(element => {
                        if (element.EnvioServicio == true) {
                            this.axios.get(
                                    urlservicios+
                                    "MovilizadoProcesosLogistico/" +
                                    value +
                                    "/" +
                                    this.selected + '/' + this.objeto.id_curier)
                                .then(response => {

                                    this.mensaje = response.data;
                                    if (this.mensaje.message) {
                                        swal({
                                            title: "Error!",
                                            text: "" + this.mensaje.message,
                                            type: "error",
                                            focusConfirm: true,
                                            showConfirmButton: true,
                                            allowOutsideClick: false,
                                            allowEscapeKey: false,
                                            allowEnterKey: true,
                                            timer: 3000
                                        });
                                    }
                                    if (this.mensaje.estado == true) {
                                        if (this.itemsmovilizados.length == 0) {
                                            swal({
                                                position: "center",
                                                type: "success",
                                                title: "Agregado correctamente",
                                                showConfirmButton: false,
                                                timer: 1000
                                            });
                                            this.text1 = "";
                                            this.mensaje.concepto = infoconcepto;
                                            this.itemsmovilizados.push(this.mensaje);
                                            var guardado = {
                                                itemsmovilizados: this.itemsmovilizados,
                                                inputs: this.objeto,
                                                curier: this.curier,
                                                ProSeleccionado: this.selected
                                            };
                                            localStorage.setItem("Manifiesto", JSON.stringify(guardado));
                                        } else {
                                            for (var x = 0; x < this.itemsmovilizados.length; x++) {
                                                if (this.itemsmovilizados[x].id == this.mensaje.id) {
                                                    agregar = false;
                                                }
                                            }
                                            if (agregar == false) {
                                                swal({
                                                    position: "center",
                                                    type: "error",
                                                    title: "Ya se encuentra en el Listado",
                                                    showConfirmButton: false,
                                                    timer: 1000
                                                });
                                            } else {
                                                swal({
                                                    position: "center",
                                                    type: "success",
                                                    title: "Agregado correctamente",
                                                    showConfirmButton: false,
                                                    timer: 1000
                                                });
                                                this.mensaje.concepto = infoconcepto;
                                                this.itemsmovilizados.push(this.mensaje);
                                                this.text1 = "";
                                                var guardado = {
                                                    itemsmovilizados: this.itemsmovilizados,
                                                    inputs: this.objeto,
                                                    curier: this.curier,
                                                    ProSeleccionado: this.selected
                                                };
                                                localStorage.setItem("Manifiesto", JSON.stringify(guardado));
                                            }
                                        }
                                    }
                                    if (this.mensaje.estado == false) {
                                        if (this.mensaje.message == "esta en ruta") {
                                            swal({
                                                title: "Error!",
                                                text: "El N° Movilizado " +
                                                    this.mensaje.id +
                                                    " se encuentra en ruta",
                                                type: "error",
                                                focusConfirm: true,
                                                showConfirmButton: true,
                                                allowOutsideClick: false,
                                                allowEscapeKey: false,
                                                allowEnterKey: true,
                                                timer: 4000
                                            });
                                        } else {
                                            swal({
                                                title: "Error!",
                                                text: "El N° Movilizado " +
                                                    this.mensaje.id +
                                                    " se encuentra en el siguiente proceso " +
                                                    this.mensaje.proceso,
                                                type: "error",
                                                focusConfirm: true,
                                                showConfirmButton: true,
                                                allowOutsideClick: false,
                                                allowEscapeKey: false,
                                                allowEnterKey: true,
                                                timer: 4000
                                            });
                                        }

                                    }
                                    var load = false;
                                    setTimeout(() => {
                                        bus.$emit("load", {
                                            load
                                        });
                                    });
                                })
                                .catch(function (error) {
                                    var load = false;
                                    setTimeout(() => {
                                        bus.$emit("load", {
                                            load
                                        });
                                    });
                                    swal(
                                        "Se presento un problema",
                                        "Intente nuevamente, por favor",
                                        "warning"
                                    );
                                });
                        }
                    });
                } else {
                    this.axios.get(
                            urlservicios+
                            "MovilizadoProcesosLogistico/" +
                            value +
                            "/" +
                            this.selected + '/null')
                        .then(response => {

                            this.mensaje = response.data;
                            if (this.mensaje.message) {
                                swal({
                                    title: "Error!",
                                    text: "" + this.mensaje.message,
                                    type: "error",
                                    focusConfirm: true,
                                    showConfirmButton: true,
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    allowEnterKey: true,
                                    timer: 3000
                                });
                            }
                            if (this.mensaje.estado == true) {
                                if (this.itemsmovilizados.length == 0) {
                                    swal({
                                        position: "center",
                                        type: "success",
                                        title: "Agregado correctamente",
                                        showConfirmButton: false,
                                        timer: 1000
                                    });
                                    this.text1 = "";
                                    this.mensaje.concepto = infoconcepto;
                                    this.itemsmovilizados.push(this.mensaje);
                                    var guardado = {
                                        itemsmovilizados: this.itemsmovilizados,
                                        inputs: this.objeto,
                                        curier: this.curier,
                                        ProSeleccionado: this.selected
                                    };
                                    localStorage.setItem("Manifiesto", JSON.stringify(guardado));
                                } else {
                                    for (var x = 0; x < this.itemsmovilizados.length; x++) {
                                        if (this.itemsmovilizados[x].id == this.mensaje.id) {
                                            agregar = false;
                                        }
                                    }
                                    if (agregar == false) {
                                        swal({
                                            position: "center",
                                            type: "error",
                                            title: "Ya se encuentra en el Listado",
                                            showConfirmButton: false,
                                            timer: 1000
                                        });
                                    } else {
                                        swal({
                                            position: "center",
                                            type: "success",
                                            title: "Agregado correctamente",
                                            showConfirmButton: false,
                                            timer: 1000
                                        });
                                        this.mensaje.concepto = infoconcepto;
                                        this.itemsmovilizados.push(this.mensaje);
                                        this.text1 = "";
                                        var guardado = {
                                            itemsmovilizados: this.itemsmovilizados,
                                            inputs: this.objeto,
                                            curier: this.curier,
                                            ProSeleccionado: this.selected
                                        };
                                        localStorage.setItem("Manifiesto", JSON.stringify(guardado));
                                    }
                                }
                            }
                            if (this.mensaje.estado == false) {
                                if (this.mensaje.message == "esta en ruta") {
                                    swal({
                                        title: "Error!",
                                        text: "El N° Movilizado " +
                                            this.mensaje.id +
                                            " se encuentra en ruta",
                                        type: "error",
                                        focusConfirm: true,
                                        showConfirmButton: true,
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                        allowEnterKey: true,
                                        timer: 4000
                                    });
                                } else {
                                    swal({
                                        title: "Error!",
                                        text: "El N° Movilizado " +
                                            this.mensaje.id +
                                            " se encuentra en el siguiente proceso " +
                                            this.mensaje.proceso,
                                        type: "error",
                                        focusConfirm: true,
                                        showConfirmButton: true,
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                        allowEnterKey: true,
                                        timer: 4000
                                    });
                                }

                            }
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        })
                        .catch(function (error) {
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                            swal(
                                "Se presento un problema",
                                "Intente nuevamente, por favor",
                                "warning"
                            );
                        });
                }



            }
        },
        procesoseleccionado(value) {
            this.opciones = [];
            var guardadoManifiesto = localStorage.getItem("Manifiesto");
            var infoguardadoManifiesto = JSON.parse(guardadoManifiesto);

            this.manifiesto = false
            if (infoguardadoManifiesto == null || infoguardadoManifiesto == "null") {
                var nvacio = {
                    _id: null,
                    nombre: "Seleccione un concepto"
                };
                this.selected = value;
                this.itemsmovilizados = [];
                this.listadoconcepto = [];
                if (this.selected == null) {} else {
                    for (var x = 0; x < this.procesosLog.length; x++) {
                        if (this.procesosLog[x]._id == this.selected) {
                            this.processSelected = this.procesosLog[x];
                            if (
                                this.procesosLog[x].conceptos == null ||
                                this.procesosLog[x].conceptos == undefined
                            ) {
                                this.listadoconcepto.unshift(nvacio);
                            } else {
                                this.listadoconcepto = this.procesosLog[x].conceptos;
                                this.listadoconcepto.unshift(nvacio);
                            }
                        }
                    }
                }
            } else {
                this.itemsmovilizados = infoguardadoManifiesto.itemsmovilizados;
                var nvacio = {
                    _id: null,
                    nombre: "Por Favor Seleccione un Concepto"
                };
                this.selected = value;
                this.listadoconcepto = [];
                if (this.selected == null) {} else {
                    for (var x = 0; x < this.procesosLog.length; x++) {
                        if (this.procesosLog[x]._id == this.selected) {
                            this.processSelected = this.procesosLog[x];
                            if (
                                this.procesosLog[x].conceptos == null ||
                                this.procesosLog[x].conceptos == undefined
                            ) {
                                this.listadoconcepto.unshift(nvacio);
                            } else {
                                this.listadoconcepto = this.procesosLog[x].conceptos;
                                this.listadoconcepto.unshift(nvacio);
                            }
                        }
                    }
                }
            }

            var login = localStorage.getItem("storedData");
            var infologin = JSON.parse(login);
            var load = true;
            setTimeout(() => {
                bus.$emit("load", {
                    load
                });
            });

            this.axios.get(urlservicios+ "CamposProcesoLogisticosOperadores/" + infologin.id_OperadorLogistico._id + "/" + this.selected)
                .then(response => {

                    this.inputs = response.data;
                    this.objeto = this.inputs.objeto;
                    if (this.objeto == undefined || this.objeto == "undefined") {} else {
                        var llaves = Object.keys(this.objeto);
                        //llaves.forEach(ele=>{
                        var errore
                        this.inputs.campos.forEach((element, indice) => {
                            if (element.urlobjeto == undefined) {} else {
                                setTimeout(function () {
                                    this.axios
                                        .get(element.urlobjeto + infologin.id_OperadorLogistico._id)
                                        .then(resp1 => {
                                            //this.value[indice]=null
                                            var vacio = {
                                                _id: "null",
                                                nombre: "Por Favor Seleccione un Campo"
                                            };

                                            var respuesta = resp1.data;
                                            respuesta.unshift(vacio);
                                            this.opciones.push(respuesta);
                                        })
                                        .catch(e => {
                                            /*
                                            swal({
                                            type: 'error',
                                            title: 'Oops...',
                                            text: 'Se presento un error, intente nuevamente',
                                            footer: 'Intente nuevamente',

                                            })
                                            */
                                            swal({
                                                type: 'warning',
                                                title: 'Oops',
                                                text: 'Se presento un problema en el servicio',
                                                footer: 'Intente nuevamente',
                                            })
                                        })
                                }.bind(this), 10)




                            }
                        });
                        //});
                    }
                    var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                })
                .catch(function (error) {
                    var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                    swal(
                        "Se presento un problema",
                        "Intente nuevamente, por favor",
                        "warning"
                    );
                });

            for (var x = 0; x < this.procesosLog.length; x++) {
                if (this.procesosLog[x]._id == this.selected) {
                    this.proceSeleccionado = this.procesosLog[x];
                    if (this.proceSeleccionado.atencion_courier == true) {
                        var login = localStorage.getItem("storedData");
                        var infologin = JSON.parse(login);
                        var load = true;
                        setTimeout(() => {
                            bus.$emit("load", {
                                load
                            });
                        });
                        var jose = {
                            id_operadorlogistico: infologin.id_OperadorLogistico._id,
                            id_cliente: infologin._id,
                            medio_transporte: "",
                            descripcion: 'manifiesto'
                        }
                        if (infologin.id_OperadorLogistico.confirmacionSocket == true) {
                            this.socket.emit('MedioCourier', {
                                id_operadorlogistico: infologin.id_OperadorLogistico._id,
                                id_cliente: infologin._id,
                                medio_transporte: "5adf56ce6034679c466fc9dd",
                                descripcion: 'manifiesto'
                            });

                            this.socket.on('CouriersActivos', (connectionList) => {
                                this.curiers2 = connectionList
                            });
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        } else {

                            var load = true;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                            this.axios
                                .get(
                                    urlservicios+
                                    "UsuariosCurierOperador/" +
                                    infologin.id_OperadorLogistico._id
                                )
                                .then(response => {
                                    this.curiers2 = response.data;
                                    var vacio = {
                                        _id: "null",
                                        nombre: "Por Favor Seleccione un Curier"
                                    };
                                    this.curiers2.unshift(vacio);
                                    var load = false;
                                    setTimeout(() => {
                                        bus.$emit("load", {
                                            load
                                        });
                                    });
                                })
                                .catch(function (error) {
                                    var load = false;
                                    setTimeout(() => {
                                        bus.$emit("load", {
                                            load
                                        });
                                    });
                                    swal(
                                        "Se presento un problema",
                                        "Intente nuevamente, por favor",
                                        "warning"
                                    );
                                });
                        }
                        /*
                          var load = true;
                                      setTimeout(() => {
                                          bus.$emit("load", {
                                          load
                                          });
                                      });
                          this.axios
                            .get(
                              urlservicios+
                                "UsuariosCurierOperador/" +
                                infologin.id_OperadorLogistico._id
                            )
                            .then(response => {
                              this.curiers2 = response.data;
                              var vacio = {
                                _id: "null",
                                nombre: "Por Favor Seleccione un Curier"
                              };
                              this.curiers2.unshift(vacio);
                              var load = false;
                                      setTimeout(() => {
                                          bus.$emit("load", {
                                          load
                                          });
                                      });
                            })
                            .catch(function(error) {
                                      var load = false;
                                      setTimeout(() => {
                                          bus.$emit("load", {
                                          load
                                          });
                                      });
                                      swal(
                                          "Se presento un problema",
                                          "Intente nuevamente, por favor",
                                          "warning"
                                      );
                                  });
                        */
                    }
                }
            }

        },
        generarManifiestoFinal(value) {
            var load = false;
            setTimeout(() => {
                bus.$emit("load", {
                    load
                });
                // this.socket.instance.disconnect(true);
            });
            
            if (value.mensaje.respuesta == "true") {
                this.Scurier = null
                var objvario = [{},
                    {}
                ]
                if (this.objeto == undefined) {
                    this.objeto = []
                    for (var j = 0; j < this.curiers2.length; j++) {
                        if (this.curier == this.curiers2[j]._id) {
                            objvario[0] = [null]
                            objvario[1] = this.curiers2[j]
                        }
                    }
                } else {
                    var llaves = Object.keys(this.objeto)
                    var bandera
                    for (var x = 0; x < llaves.length; x++) {
                        this.inputs.campos[x].estado = null
                    }
                    for (var x = 0; x < llaves.length; x++) {
                        if (eval('this.objeto.' + llaves[x]) == '' || eval('this.objeto.' + llaves[x]) == null) {
                            this.inputs.campos[x].estado = false
                            bandera = true
                        }
                    }

                }

                var inforinputs = []
                if (this.objeto == undefined) {
                    this.objeto = []
                } else {
                    for (var x = 0; x < this.opciones.length; x++) {
                        var llaves = Object.keys(this.objeto)
                        for (var y = 0; y < this.opciones[x].length; y++) {
                            if (this.opciones[x][y]._id == eval('this.objeto.' + llaves[x])) {
                                inforinputs[x] = this.opciones[x][y]
                            }
                        }
                    }
                }
                var inforvaria
                if (inforinputs.length == 0) {
                    inforvaria = objvario
                } else {
                    inforvaria = inforinputs
                }

                var itemsmodal = this.itemsmovilizados
                var varios = []
                var listMovilizados = {}
                for (var x = 0; x < this.itemsmovilizados.length; x++) {
                    if (this.itemsmovilizados[x].concepto._id == null ||
                        this.itemsmovilizados[x].concepto._id == undefined) {
                        var listMovilizados = {
                            numeroMovilizado: this.itemsmovilizados[x].id
                        }
                        varios.push(listMovilizados)
                    } else {
                        var listMovilizados = {
                            nombre_concepto: this.itemsmovilizados[x].concepto.nombre,
                            id_concepto: this.itemsmovilizados[x].concepto._id,
                            numeroMovilizado: this.itemsmovilizados[x].id
                        }
                        varios.push(listMovilizados)
                    }
                }




                var envio = {
                    listadoMovilizados: varios,
                    infoManifiesto: this.objeto,
                    id_procesoLogistico: this.processSelected._id,
                    //procesoSistena:5,
                    id_courier: this.curier
                }
                var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                        load
                    });
                });
                this.axios
                    .post(urlservicios+ "GenerarManifiestoWeb", envio)
                    .then(response => {
                        if (response.data.validacion == true) {
                            this.manifiesto = true
                            localStorage.removeItem('Manifiesto');
                            var nmanifiesto = response.data.manifiesto
                            setTimeout(() => {
                                bus.$emit('modalinfo', {
                                    itemsmodal,
                                    inforvaria,
                                    nmanifiesto
                                })
                            }, )
                            this.selected=null
                            swal({
                                title: 'Servicio Aceptado',
                                text: "El servicio se encuentra asignado al courier seleccionado",
                                type: 'warning',
                                showCancelButton: false,
                                showConfirmButton:false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                  timer: 1500,

                                confirmButtonText: ''

                                }).then((result) => {
                                if (result.value) {
                                    setTimeout(function(){ }, 1000);
                                   
                                }
                                })
                            this.$router.push(this.processSelected.modal)
                        }
                        if (response.data.validacion == false) {
                            this.manifiesto = false
                            var Movilizados = response.data.listaMovilizadoConManifiesto
                            this.errores = response.data.listaMovilizadoConManifiesto
                            var n_movilizados = ''
                            for (var o = 0; o < Movilizados.length; o++) {
                                if (o == Movilizados.length - 1) {
                                    n_movilizados = n_movilizados + Movilizados[o].id
                                } else {
                                    n_movilizados = n_movilizados + Movilizados[o].id + ', '

                                }

                            }
                            this.errores = Movilizados
                            //this.$refs.myModalRef2.show()
                            var titulo1_inicio = '<div class="prueba"><ul>'
                            var conten_1 = ''
                            var conten_2 = ''
                            var titulo1_fin = '</ul></div><br><h3><strong>Desea Retirarlos del Manifiesto?</strong></h3>'
                            var prueba
                            var total
                            for (var y = 0; y < this.errores.length; y++) {
                                conten_1 = conten_1 + '<li>' + this.errores[y].id + ' - ' + this.errores[y].NombreProceso + '</li>'
                                conten_2 = conten_2 + '<li>' + this.errores[y].NombreProceso + '</li>'


                            }
                            total = titulo1_inicio + conten_1 + titulo1_fin
                            swal({
                                title: 'El manifiesto no se puede generar por que los movilizados ya se encuentran procesados',
                                type: 'info',
                                html: total,
                                showCloseButton: true,
                                showCancelButton: true,
                                focusConfirm: false,
                                confirmButtonText: 'Si',
                                confirmButtonAriaLabel: '',
                                cancelButtonText: 'No',
                                cancelButtonAriaLabel: '',
                            }).then((result) => {
                                if (result.value) {
                                    this.metodo(this.errores); // this should execute now

                                }

                            });

                        }
                        var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                                load
                            });
                        });
                    })
                    .catch(function (error) {
                        var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                                load
                            });
                        });
                        swal(
                            "Se presento un problema",
                            "Intente nuevamente, por favor",
                            "warning"
                        );
                    });


            } else {
                console.log("respuesta false");
                swal(
                    'Advertencia',
                    value.mensaje.message,
                    'warning'
                )
            }

        }
    },
    beforeCreate: function () {
        var bandera = true;
        var _this = this;
        var vacio = {
            _id: null,
            nombre: "Seleccione un proceso logistico"
        };
        var login = localStorage.getItem("storedData");
        var infologin = JSON.parse(login);
        var guardadoManifiesto = localStorage.getItem("Manifiesto");
        var infoguardadoManifiesto = JSON.parse(guardadoManifiesto);

        if (infoguardadoManifiesto == null || infoguardadoManifiesto == "null") {
            var load = true;
            setTimeout(() => {
                bus.$emit("load", {
                    load
                });
            });
            this.axios
                .get(urlservicios+ "Procesos/" + infologin.id_OperadorLogistico._id)
                .then(response => {
                    var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                    this.procesosLog = response.data;
                    this.procesosLog.unshift(vacio);
                })
                .catch(function (error) {
                    bandera = false;
                    var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                    //onsole.log(JSON.stringify(error));
                    //this.$router.replace('/inicio')
                    if (bandera == false) {
                        swal({
                            title: "No hay Internet",
                            text: "Revise su conexion",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Ok, Entiendo"
                        }).then(result => {
                            if (result.value) {
                                swal(
                                    "Se Redireccionara a la pagina de inicio",
                                    "Buen Rato",
                                    "warning"
                                );
                                _this.$router.replace("/inicio");
                            }
                        });
                    }
                });
        } else {
            var load = true;
            setTimeout(() => {
                bus.$emit("load", {
                    load
                });
            });
            this.axios
                .get(urlservicios+ "Procesos/" + infologin.id_OperadorLogistico._id)
                .then(response => {
                    var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                    this.procesosLog = response.data;
                    this.procesosLog.unshift(vacio);
                })
                .catch(function (error) {
                    bandera = false;
                    var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                    //onsole.log(JSON.stringify(error));
                    //this.$router.replace('/inicio')
                    if (bandera == false) {
                        swal({
                            title: "No hay Internet",
                            text: "Revise su conexion",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Ok, Entiendo"
                        }).then(result => {
                            if (result.value) {
                                swal(
                                    "Se Redireccionara a la pagina de inicio",
                                    "Buen Rato",
                                    "warning"
                                );
                                _this.$router.replace("/inicio");
                            }
                        });
                    }
                });
            swal({
                title: "Hay un Manifiesto Pendiente?",
                text: "Quiere continuar",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Si, Continuar"
            }).then(result => {
                if (result.value) {
                    this.selected = infoguardadoManifiesto.ProSeleccionado;
                    this.itemsmovilizados = infoguardadoManifiesto.itemsmovilizados;
                    swal("Actualizado!", "Puede continuar con el proceso.", "success");
                } else {
                    localStorage.removeItem("Manifiesto");
                }
            });
        }

    },
    created: function () {
        var login = localStorage.getItem("storedData");
        var infologin = JSON.parse(login);
        this.socket = (new CreateSocket({

            id_cliente: infologin._id,

            id_operador: infologin.id_OperadorLogistico._id

        }));
        this.socket.on('connect', () => {})
        this.socket.on('ListaConexiones', (data) => {
        if(this.model_medios!=undefined&&this.model_medios!='undefined'&&
            this.model_medios!=null){
            this.socket.emit('MedioCourier', {
                id_operadorlogistico: infologin.id_OperadorLogistico._id,
                id_cliente: infologin._id,
                medio_transporte: "5adf56ce6034679c466fc9dd",
                descripcion: 'manifiesto'
            });
        }

      })
        this.socket.on('messages', (data) => {
            //$.cbSpinner("hide");
            clearTimeout(this.validacionsockets)
            var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
            this.generarManifiestoFinal(data)
            //this.message = (data.mensaje);
            var load = false;
            setTimeout(() => {
                bus.$emit("load", {
                    load
                });
                // this.socket.instance.disconnect(true);
            });
        });

    }
};
</script>




<style>
.contenedorTotal {
    padding-top: 0px;
    padding-right: 0%;
    padding-bottom: 0px;
    padding-left: 0%;
    background-color: #f8f8ff;
}

.center-button {
    display: block;
    margin: auto;
}

.prueba ul li {
    list-style-type: none;
}
</style>
