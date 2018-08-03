<template>
    <b-card v-if="consulta.length" class="mt-2 border" header="Primary" header-bg-variant="primary">
        <h3 slot="header" class="mb-0 encabezado">Lista de detalles</h3>
            <b-row>
                <b-table  :items="consulta" :fields="fields"
                :per-page="5" :current-page="currentPage" :bordered="true"
                thead-class=text-center tbody-class="text-center text-capitalize">
                    <template slot="cliente" slot-scope="data">
                        {{data.item.cliente.nombre}}
                    </template>
                    <template slot="id" slot-scope="data">
                        {{data.item.consec}}
                    </template>
                    nombre_proceso
                    <template slot="nombre_proceso" slot-scope="data">
                        {{data.item.trazabilidad[0].nombre}}
                    </template>
                    <template slot="nmovilizado" slot-scope="data">
                        {{data.item.id}}
                    </template>
                    <template slot="doc_referencia" slot-scope="data">
                        {{data.item.detalleslocal.referencia}}
                    </template>
                    <template slot="fecha_creacion" slot-scope="data">
                       <p > {{data.item.fecha_estado |formatdate}}</p>
                    </template>
                    <template slot="productoslocal" slot-scope="data" >
                        {{data.item.productoslocal.nombre}}
                    </template>
                                  ,
                     <template slot="courier_actual" slot-scope="data" v-if="data.item.id_courier_actual">
                        {{data.item.id_courier_actual.nombre}}  {{data.item.id_courier_actual.apellido}}
                    </template>
                    <template slot="servicioslocal" slot-scope="data">
                        {{data.item.servicioslocal.nombre}}
                    </template>
                    <template slot="imagenes" slot-scope="data" >
                        <i class="btn btn-success fa fa-picture-o" @click="image(data.item)" v-show="data.item.trazabilidad[0].EsCierre=='true'"></i>
                    </template>
                    <template slot="detalles" slot-scope="data">
                        <i class="btn btn-success fa fa-info" @click="actualizar(data.item)"></i>
                    </template>
                </b-table>
                <b-pagination size="md" :total-rows="consulta.length" v-model="currentPage" :per-page="5">
                </b-pagination>
            </b-row>
            <b-row>
                <b-button @click="exportarxls()" class="btn-warning text-white rounded">
                    <i class="fa fa-file-excel-o" aria-hidden="true"></i>
                    Exportar a excel
                </b-button>
            </b-row>
        <!-- the modal -->
        <b-modal id="myModal" size="lg"  ref="myModalRef" lazy>
            <b-container>
                <b-row>
                    <b-col cols="6">
                        <h1>Cliente :</h1>
                    </b-col>
                    <b-col>
                        {{cliente.nombre}}
                    </b-col>
                </b-row>
                <b-row>
                   <b-col cols="6" >
                       <h1>Centro de Costo :</h1>
                    </b-col>
                    <b-col >
                        nombre centro de costo
                       <!-- {{centro.nombre}}
                       -->
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="6" >
                       <h3>Numero de Orden :</h3>
                    </b-col>
                    <b-col >
                        {{consultaactualizar.consec}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="6" >
                       <h3>Numero de Movilizado :</h3>
                    </b-col>
                    <b-col >
                        {{consultaactualizar.id}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="6" >
                       <h3>Producto :</h3>
                    </b-col>
                    <b-col >
                        {{consultaactualizar.productoslocal.nombre}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="6" >
                       <h3>Producto :</h3>
                    </b-col>
                    <b-col >
                        {{consultaactualizar.servicioslocal.nombre}}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="6" >
                       <h3>Informacion :</h3>
                    </b-col>
                </b-row>
                <b-row v-for="(data,indice) in final">

                        <b-col cols="5">
                            <label  class="col-sm-2 col-form-label col-form-label-sm">{{data.nombre}}: </label>
                        </b-col>
                        <template >
                            <b-col cols="6">
                                <b-form-input  :value="data.valores"
                                    type="text"
                                    :disabled="true">
                            </b-form-input>
                            </b-col>
                        </template>
                </b-row>
                <b-row>
                    <b-form-group id="traza"
                            label="Trazabilidad:"
                            >
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-table :items="consultaactualizar.trazabilidad" :fields="campostra">
                        <template slot="fecha" slot-scope="data">
                            {{data.item.fecha |formatdate}}
                        </template>
                        <template slot="nombre" slot-scope="data">
                            {{data.item.nombre}}
                        </template>
                        <template slot="imagen" slot-scope="data">
                                <i class="btn btn-success fa fa-picture-o" @click="imagenmodal(data.item)" v-show="data.item.imagenes.length>0">
                                </i>
                        </template>
                    </b-table>
                </b-row>
            </b-container>
        </b-modal>
        <!-- Modal Component 1 imagen -->
        <b-modal id="modalimagen" ref="ModalImaguni" title="Evidencia Digital" no-close-on-backdrop>
            <b-container>
                <!--
                   <b-img :src="variableServidor+modalima.trazabilidad[0].imagenes[0].url" fluid alt="Fluid image" />

                    -->
                <b-img :src="funcionimagen()" fluid alt="Fluid image" />
            </b-container>
            <div slot="modal-header" class="w-100">
                <b-btn @click="showCollapse = !showCollapse"
                    :class="showCollapse ? 'collapsed' : null"
                    aria-controls="collapse4"
                    :aria-expanded="showCollapse ? 'true' : 'false'"
                    variant="primary">
                    <i class="fa fa-envelope-o" aria-hidden="true"></i>

                Enviar Correo
                </b-btn>
                <b-collapse class="mt-2" id="todo" v-model="showCollapse">
                            <b-card class="border">
                                 <b-form inline>
                                <b-form-input v-model="emailT"
                                    type="email"
                                    placeholder="Email"
                                    @input="validacorreoT" :state="estadoT"></b-form-input>
                                    <b-btn  active-class class="fa fa-envelope-o algo" @click="enviarcorreoT(modalima)" >
                                    </b-btn>
                                 </b-form>
                            </b-card>
                    </b-collapse>
            </div>
            <div slot="modal-footer" class="w-100">


                <b-btn size="sm" class="float-right" variant="primary" @click="closemodal">
                Close
                </b-btn>
            </div>
        </b-modal>
        <!-- Modal Component 2 imagenes -->
        <b-modal id="modalimagenes" ref="ModalImagenes" title="Evidencia Digital" lazy no-close-on-backdrop>
            <b-container>
                <template v-for="(data,indice) in modalima.trazabilidad[0].imagenes">
                    <b-card no-body class="mb-1 border">
                        <b-card-header header-tag="header" class="p-1 joseperso" role="tab">
                            <b-row>
                                <b-col cols="8">
                                    <b-btn block v-b-toggle="data.id" variant="info">
                                        Evidencia {{indice+1}}
                                    </b-btn>
                                </b-col>
                                <b-col cols="4">
                                    <b-btn v-b-toggle="data.email" >
                                        <span class="when-opened"></span>
                                         <span class="when-closed"></span>
                                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                    </b-btn>
                                    <b-btn  active-class :href="variableServidor+data.url" target="_blank" >
                                        <i class="fa fa-download" aria-hidden="true"></i>
                                    </b-btn>
                                </b-col>
                            </b-row>

                        </b-card-header>
                        <b-collapse :id="data.id" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                            <p class="card-text">
                                <b-img :src="variableServidor+data.url" fluid alt="Fluid image" />
                            </p>
                            </b-card-body>
                        </b-collapse>
                        <b-collapse class="mt-2" :id="data.email" @click="algo">
                            <b-card class="border">
                                 <b-form inline>
                                <b-form-input v-model="email"
                                    type="email"
                                    placeholder="Email"
                                    @input="validacorreo" :state="estado"></b-form-input>
                                    <b-btn  active-class class="fa fa-arrow-right algo" @click="enviarcorreo(data)"  v-b-toggle="data.email">
                                    </b-btn>
                                 </b-form>
                            </b-card>
                    </b-collapse>
                    </b-card>
                </template>
            </b-container>
            <div slot="modal-header" class="w-100">
                <b-btn @click="showCollapse = !showCollapse"
                    :class="showCollapse ? 'collapsed' : null"
                    aria-controls="todo"
                    :aria-expanded="showCollapse ? 'true' : 'false'"
                    variant="primary">
                    <i class="fa fa-envelope-o" aria-hidden="true"></i>

                Enviar Correo
                </b-btn>
                <b-collapse class="mt-2" id="todo" v-model="showCollapse">
                            <b-card class="border">
                                 <b-form inline>
                                <b-form-input v-model="emailT"
                                    type="email"
                                    placeholder="Email"
                                    @input="validacorreoT" :state="estadoT"></b-form-input>
                                    <b-btn  active-class class="fa fa-arrow-right algo" @click="enviarcorreoT(modalima)" >
                                    </b-btn>
                                 </b-form>
                            </b-card>
                    </b-collapse>
            </div>
            <div slot="modal-footer" class="w-100">

                <!--<b-btn size="sm" class="float-left" variant="primary" v-b-toggle.todo>
                Enviar todas
                </b-btn>-->

                <b-btn size="sm" class="float-right" variant="danger" @click="closemodal">
                Cerrar
                </b-btn>
            </div>
        </b-modal>
        <!-- Modal Component 1 imagen modal
        <b-modal id="modalimagen" ref="ModalImagunidetalle" title="Evidencia Digital">
            <b-container>
                <b-img :src="imgmodal.imagenes[0].url" fluid alt="Fluid image" />
            </b-container>
        </b-modal>
        <!-- Modal Component 2 imagenes modal
        <b-modal id="modalimagenes" ref="ModalImagenesdetalle" title="Evidencia Digital" lazy>
            <b-container>
                <template v-for="(data,indice) in imgmodal.imagenes">
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-row>
                                <b-col cols="8">
                                    <b-btn block v-b-toggle="data.id" variant="info">
                                        Evidencia {{indice+1}}
                                    </b-btn>
                                </b-col>
                                <b-col cols="4">
                                     <b-btn v-b-toggle="data.email">
                                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                    </b-btn>
                                    <b-btn  active-class :href="data.url" target="_blank" >
                                        <i class="fa fa-download" aria-hidden="true"></i>
                                    </b-btn>
                                </b-col>
                            </b-row>

                        </b-card-header>
                        <b-collapse :id="data.id" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                            <p class="card-text">
                                <b-img :src="data.url" fluid alt="Fluid image" />
                            </p>
                            </b-card-body>
                        </b-collapse>

                    </b-card>
                </template>
            </b-container>
        </b-modal>  -->
</b-card>
</template>

<script>
import $ from 'jquery'

import {bus} from '../main'
import moment from 'moment'
import Preload from '../componentes/preload.vue'
import {urlservicios} from '../main'
import detallesVue from './detalles.vue';


export default {
    components:{
        Preload
    },
    filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY, h:mm:ss a')
        }
        }
    },
    watch: {

    },
    methods:{
        funcionimagen(){
            //console.log(this.modalima.trazabilidad[0].imagenes[0]);
            if(this.modalima.trazabilidad[0].imagenes[0]==null||
            this.modalima.trazabilidad[0].imagenes[0]==undefined||
            this.modalima.trazabilidad[0].imagenes[0]==""||
            this.modalima.trazabilidad[0].imagenes[0]=="undefined"){
                //console.log("invoco url");
                return null
            }
            else{
                return this.variableServidor+this.modalima.trazabilidad[0].imagenes[0].url
            }
        },
        algo(){
            //console.log("invoco");
        },
        validacorreo(value){
           if(value.length==0){
               this.emailvalido=null
               return(this.estado=null)
           }
           if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            {
                this.emailvalido=true
                return (this.estado=true)
            }
                this.emailvalido=false
                return (this.estado=false)


       },
        enviarcorreo(value){
            this.acor=true
            var objeto
            if(this.emailvalido==null||this.email==''){
                swal(
                    'Falta Completar el Email',
                    'Complete el e-mail',
                    'error'
                    )
            }
            if(this.emailvalido==false){
                swal(
                    'Formato Ivalido',
                    'Ingrese un e-mail valido',
                    'warning'
                    )
            }
            if(this.emailvalido==true){

                var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })

                        }, )
                objeto={
                    correo:this.email,
                    norden:this.modalima.consec,
                    nmovilizado:this.modalima.id,
                    nomproceso:this.modalima.nombre_proceso,
                    imagenes:[{
                        ruta:value.ruta,
                        id:value.id
                    }]

                }

                this.axios.post(urlservicios+"EnviarCorreoImagen", objeto)
                .then(response => {
                    this.respuesta = response.data;
                    var load=false
                        setTimeout(() => {
                            bus.$emit('load', {
                                load
                            })
                            }, )
                            this.acor=false
                    swal(
                        "Excelente!",
                        " " + this.respuesta,
                        "success"
                    );
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

            this.email=''
            this.acor=false

        },
        validacorreoT(value){
            if(value.length==0){
               this.emailvalidoT=null
               return(this.estadoT=null)
           }
           if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            {
                this.emailvalidoT=true
                return (this.estadoT=true)
            }
                this.emailvalidoT=false
                return (this.estadoT=false)
        },
        enviarcorreoT(value){
            if(this.emailvalidoT==null||this.emailT==''){
                swal(
                    'Falta Completar el Email',
                    'Complete el e-mail',
                    'error'
                    )
            }
            if(this.emailvalidoT==false){
                swal(
                    'Formato Ivalido',
                    'Ingrese un e-mail valido',
                    'warning'
                    )
            }
            if(this.emailvalidoT==true){
                //this.load=true
                var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                var objeto
                var objetoimanes=[]
                value.trazabilidad[0].imagenes.map((obj,ind)=>{
                    objeto={
                        ruta:obj.ruta,
                        id:obj.id
                    }
                    objetoimanes.push(objeto)
                })
                var objeT={
                        correo:this.emailT,
                        norden:this.modalima.consec,
                        nmovilizado:this.modalima.id,
                        nomproceso:this.modalima.nombre_proceso,
                        imagenes:objetoimanes
                }
                this.axios.post(urlservicios+"EnviarCorreoImagen", objeT)
                    .then(response => {
                        this.respuesta = response.data;
                        //this.load=false
                        var load=false
                        setTimeout(() => {
                            bus.$emit('load', {
                                load
                            })
                            }, )
                            this.showCollapse=false
                        swal(
                            "Excelente!",
                            " " + this.respuesta,
                            "success"
                        );
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
            this.emailT=''
        },
        closemodal(){
            this.$refs.ModalImaguni.hide()
            this.$refs.ModalImagenes.hide()
        },
        cerrar(value){
            this.$refs.myModalRef.hide();
        },
        imagenmodal(data){
            if(data.imagenes.length==1)
            {
                this.imgmodal=data
                 this.$refs.ModalImagunidetalle.show()
            }
            if(data.imagenes.length>1)
            {
                this.imgmodal=data
                this.$refs.ModalImagenesdetalle.show()
            }
        },
        image(value){
            this.modalima=value
            if(this.modalima.trazabilidad[0].imagenes.length==0)
            {
                swal(
                    "No se tienen Imagenes",
                    "No hay imagenes disponibles",
                    "warning"
                )
            }
            if(this.modalima.trazabilidad[0].imagenes.length==1)
            {
                this.$refs.ModalImaguni.show()

            }
            if(this.modalima.trazabilidad[0].imagenes.length>1)
            {
                this.$refs.ModalImagenes.show()
            }
        },
        values(value){
            return eval("this.consultaactualizar.detalleslocal.infor."+value)
        },
        exportarxls(){
            var centro,cliente,inicio,fin,detalle,orden,refere
            //centro=this.envios.centro
            cliente=this.envios.cliente
            var test2 = localStorage.getItem("storedData");
            var test = JSON.parse(test2);
            if(this.envios.centro==undefined||this.envios.centro==''
                ||this.envios.centro===undefined){
                centro='null'
            }
            else{
                centro=this.envios.centro
            }
            if(this.envios.inicio==undefined||this.envios.inicio==''
                ||this.envios.inicio===undefined){
                inicio='null'
            }
            else{
                inicio=this.envios.inicio
            }
            if(this.envios.fin==undefined||this.envios.fin===undefined
                ||this.envios.fin==''){
                fin='null'
            }
            else{
                fin=this.envios.fin
            }
            if(this.envios.orden==undefined||this.envios.orden===undefined
                ||this.envios.orden==''){
                orden='null'
            }
            else{
                orden=this.envios.orden
            }
            if(this.envios.referencia==undefined||this.envios.referencia===undefined||
            this.envios.referencia==''){
                refere='null'
            }
            else{
                refere=this.envios.referencia
            }
            if(this.envios.nmovilizado==undefined||this.envios.nmovilizado===undefined||
            this.envios.nmovilizado==''){
                detalle='null'
            }
            else{
                detalle=this.envios.nmovilizado
            }

            var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
            console.log(urlservicios+"ConsultaExcel/"+test.id_OperadorLogistico._id+"/"+centro+"/"+cliente+"/"+orden+"/"+detalle+"/"+refere+"/"+inicio+"/"+fin+"/"+this.envios.tipo);
            this.axios.get(urlservicios+"ConsultaExcel/"+test.id_OperadorLogistico._id+"/"+centro+"/"+cliente+"/"+orden+"/"+detalle+"/"+refere+"/"+inicio+"/"+fin+"/"+this.envios.tipo)
            .then(response => {
                console.log(response);
                var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                alasql.fn.fechas= function(date)
                {
                //return date.toLocaleString()
                return moment(date).format('DD/MM/YYYY')
                }
                alasql.fn.horas= function(date)
                {
                //return date.toLocaleString()
                return moment(date).format('h:mm:ss')
                }
                var consulta=response.data.select
                this.resul=response.data.movilizadosobjet
                alasql(consulta,[this.resul])
            })
            .catch(function(error){
                var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                swal(
                'Error al descargar el reporte!',
                'Intente Nuevamente',
                'warning'
                )
            })



        },
        actualizar(value){
            this.consultaactualizar=value
            var llaves
            llaves=Object.keys(this.consultaactualizar.detalleslocal.infor)
            if(this.valores.length==0)
            {
            llaves.map((obj,ind)=>{
                if(typeof(eval('value.detalleslocal.infor.'+obj))=='object'){
                    if(obj=='trayectoobj'){
                      var objetogrande={
                        nombre:'Trayecto',
                        valores:eval('value.detalleslocal.infor.'+obj+'.nombre')
                    }
                    this.final.push(objetogrande)
                    }

                }else{
                    if(obj=='id_trayecto'){

                    }else{
                    this.valores.push(eval('value.detalleslocal.infor.'+obj))
                    this.llavesv.push(obj)
                    var objetogrande={
                        nombre:obj,
                        valores:eval('value.detalleslocal.infor.'+obj)
                    }
                    this.final.push(objetogrande)
                    }
                }
            })

            }
            //this.$refs.myModalRef.show()
            //openModal();
            var load = true;
                  setTimeout(() => {
                    bus.$emit("load", {
                      load
                    });
                  });
            this.axios.get(urlservicios+"estructuraf/" +this.consultaactualizar.productoslocal._id +
            "/" +this.consultaactualizar.servicioslocal._id)
            .then(response => {
                this.inputs = response.data;
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

            var client=this.cliente
            var centro=this.centro
            var personal={
                cliente:client,
                //centro:centro,
                inputs:this.final
            }
            //var proce = this.procesosLogisticos
            setTimeout(() => {
                bus.$emit('resultado', {
                    value ,personal
                })
                }, )
            this.$router.replace('/inicio/trazabilidad/resultado')
            var ocultartra=false
            setTimeout(() => {
                bus.$emit('ocultartra', {
                    ocultartra
                })
                }, )
        },
    },
    mounted: function() {
    var servi =localStorage.getItem("servidor")
        var servicios = JSON.parse(servi)
        this.variableServidor=servicios
    },
    beforeCreate: function() {

    },
    props:['consulta','centro','cliente', 'envios'],
    data () {
        return {
            variableServidor:'',
            resul:[],
            acor:false,
            load:false,
            showCollapse: false,
            respuesta:'',
            email:'',
            emailT:'',
            emailvalido: null,
            emailvalidoT: null,
            estado:null,
            estadoT:null,
            mostrar: false,
            imgmodal: {
                fecha:'',
                EsCierre:'',
                nombre:'',
                id_ProcesoLogistico:'',
                imagenes:[
                {
                    id: '',
                    url: ''
                }
                ]
            },
            final:[],
            valores: [],
            llavesv:[],
            campostra:[
                { key: "fecha", label: "Fecha" },
                { key: "nombre", label: "Nombre" },
                { key: "imagen", label: "Imagenes" },

            ],
            inputs:{},
            consultaactualizar: {
                consec:'',
                id:'',
                url:'',
                trazabilidad:[
                    {
                        imagenes:[{
                            url:'',
                            id:'',
                        }]
                    }
                    ],
                detalleslocal: {
                    referencia: '',
                    observaciones: '',
                    infor: {},
                    destinatario:{}
                },
                productoslocal: {},
                servicioslocal: {},
                fecha_estado: ''

            },
            modalima: {
                consec:'',
                id:'',
                url:'',
                trazabilidad:[
                    {
                        imagenes:[{
                            url:'',
                            id:'',
                        }]
                    }
                    ],
                detalleslocal: {
                    referencia: '',
                    observaciones: '',
                    infor: {},
                    destinatario:{}
                },
                productoslocal: {},
                servicioslocal: {},
                fecha_estado: ''

            },
            prueba: {},
            currentPage: 1,
            imagen: false,
            consu: {},
            existe: true,
            fields: [
                
                { key: 'id', sortable: true , label: 'N° Orden de Servicio'},
                {key:'nmovilizado',  label: 'N° Movilizado'},
                { key: 'doc_referencia' , label: 'Doc Referencia'},
                { key: 'cliente' , label: 'Cliente'},
                {key:'nombre_proceso', label: 'Estado'},
                {key:'fecha_creacion', label: 'Fecha Ultima Actualización'},
                {key:'productoslocal', label: 'Producto'},
                {key:'servicioslocal', label: 'Servicio'},
                {key:'courier_actual', label: 'Courier Actual'},
                {key:'imagenes', label: 'Prueba de Entrega'},
                'detalles'
            ],
        }
    },


}
</script>

<style scoped>
.joseperso{
      background-color: #ebeaea ;
  border-bottom-color: #495057;
  border-top: none;
}
.card-header {
  background-color: #ebeaea ;
  border-bottom-color: #495057;
  border-top: none;
}
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</styl>
