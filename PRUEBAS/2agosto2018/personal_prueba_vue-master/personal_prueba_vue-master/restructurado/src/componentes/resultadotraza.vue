<template>
    <b-container fluid class=" w-100">

                <b-btn @click="volver" variant="success" class=" mb-3">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    Volver
                </b-btn>

        <b-card class="border my-2" header="Primary" header-bg-variant="primary">
               <div slot="header" class="w-100">
                    <strong class="float-left ">Información de Remitente </strong>
                </div>
                <b-row>
                    <b-col>
                        <h3  class="text-primary ">Cliente :</h3>
                    </b-col>
                    <b-col>
                        <p> {{otro.cliente.nombre}}</p>
                    </b-col>
                </b-row>
                 <b-row>
                    <b-col>
                        <h3  class="text-primary ">Centro de Costos:</h3>
                    </b-col>
                    <b-col>
                        <p>{{otro.centro_costos.nombre}}</p>

                    </b-col>
                </b-row>
                 <b-row>
                    <b-col>
                        <h3  class="text-primary ">Contacto :</h3>
                    </b-col>
                    <b-col>
                        <p>{{otro.remitente.nombre_contacto}}</p>

                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h3  class="text-primary ">Dirección :</h3>
                    </b-col>
                    <b-col>
                        <p>{{otro.remitente.direccion_recogida}}</p>

                    </b-col>
                </b-row>
        </b-card>

        <b-card class="border my-2" header="Primary" header-bg-variant="primary">
             <div slot="header" class="w-100">
                    <strong class="float-left ">Información de Destinatario </strong>
                </div>
                    <b-row>
                    <b-col>
                        <h3 class="text-primary" >Nombre:</h3>
                    </b-col>
                    <b-col>
                        <p>{{info.detalleslocal.destinatario.nombre}}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h3 class="text-primary">Dirección:</h3>
                    </b-col>
                    <b-col>
                        <p>{{info.detalleslocal.destinatario.direccion}}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h3 class="text-primary">Telefono:</h3>
                    </b-col>
                    <b-col>
                        <p>{{info.detalleslocal.destinatario.telefono}}</p>
                    </b-col>
                </b-row>
        </b-card>

        <b-card class="border my-2" header="Primary" header-bg-variant="primary">
                <div slot="header" class="w-100">
                    <strong class="float-left ">Detalle  Movilizado</strong>
                </div>
        <b-col>
        <b-row>
                <b-col>
                    <h3 class="text-primary">Numero Orden de Servicio:</h3>
                </b-col>
                <b-col>
                    <label class="font-weight-bold " style="    font-size: 25px;">{{info.consec}}</label>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h3 class="text-primary">Numero de Movilizado:</h3>
                </b-col>
                <b-col>
                    <label class="font-weight-bold " style="    font-size: 25px;">{{info.id}}</label>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h3 class="text-primary">Producto :</h3>
                </b-col>
                <b-col>
                    <p>{{info.productoslocal.nombre}}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h3 class="text-primary">Servicio :</h3>
                </b-col>
                <b-col>
                    <p>{{info.servicioslocal.nombre}}</p>
                </b-col>
            </b-row>
            
            <b-row>
                <b-col>
                    <h3 class="text-primary">Documento de Referencia :</h3>
                </b-col>
                <b-col>
                    <p>{{info.detalleslocal.referencia}}</p>
                </b-col>
            </b-row>
             <b-row>
                <b-col>
                    <h3 class="text-primary">Observaciones del Envio :</h3>
                </b-col>
                <b-col>
                    <p>{{info.detalleslocal.observaciones}}</p>
                </b-col>
            </b-row>
        <b-row>
            <b-col>

            </b-col>
        </b-row>

        <b-row v-for="(data,indice) in inputs" class="my-1">

                        <b-col >
                            <h3  class=" text-primary">{{data.nombre}}: </h3>
                        </b-col>

                        <template >
                            <b-col cols="6">
                                <p> {{data.valores}} 
                            </p>
                            </b-col>
                        </template>
        </b-row>

                <hr>
                <b-row>
                     <b-col>
                    <h3 class="text-primary">Courier:</h3>
                    </b-col>
                    <b-col>
                        <p :value="curieractualFun()">{{curieractualFinal}}</p>
                        <!--
                        {{curier.nombre}} {{curier.apellido}}
                        -->
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                     <b-table striped hover :items="info.detalleslocal.infor.objetoUnidades" 
                         :current-page="currentPage"
                             :per-page="5">
                        
                     </b-table>
                     <b-pagination v-show="info.detalleslocal.infor.objetoUnidades.length>0" size="md" :total-rows="info.detalleslocal.infor.objetoUnidades.length" v-model="currentPage" :per-page="5">
                    </b-pagination>
                    </b-col>
                </b-row>

        </b-col>
            </b-card>
  <b-card class="border my-2" header="Primary" header-bg-variant="primary">
                <div slot="header" class="w-100">
                    <strong class="float-left ">Seguimiento del Detalle:</strong>
                </div>

        <b-row>


            <b-table :items="info.trazabilidad" :fields="campostra" thead-class=text-center tbody-class=text-center>
                        <template slot="fecha" slot-scope="data" >
                            {{data.item.fecha |formatdate}}
                        </template>
                        <template slot="nombre" slot-scope="data"  class="text-center">
                            <p class="text-center">{{data.item.nombre}}</p>
                        </template>
                        <template slot="imagen" slot-scope="data" >
                                <i class="btn btn-success fa fa-picture-o" @click="imagenmodal(data.item)" v-show="data.item.imagenes.length>0">
                                </i>
                        </template>
                         <template slot="recibido" slot-scope="data" >
                            <i class="btn btn-success fa fa-address-card-o" @click="contactoModal(data.item)" v-show="data.item.datosRecibidos">

                            </i>

                        </template>
                        <template slot="conceptos" slot-scope="data">
                            <i class="btn btn-success fa fa-info text-center" @click="conceptoModal(data.item)" v-show="data.item.conceptos">

                            </i>

                        </template>
                    </b-table>
                    <!--
                    <b-table :items="valorestabla()" :fields="campostra" thead-class=text-center tbody-class=text-center>

                    </b-table>
                    -->
        </b-row>
    </b-card>

        <!-- Modal Component -->
        <b-modal id="ModalConcepto" ref="ModalConcepto" title="Concepto ">
             <div slot="modal-header" class="w-100">
                <b-btn size="sm" class="float-right " variant="danger" @click="closemodal">
                X
                </b-btn>
             </div>
            <b-container fluid>
                <b-row>
                    <b-col>
                        <h3>Nombre</h3>
                    </b-col>
                    <b-col>
                        <p>{{concepto}}</p>
                    </b-col>
                </b-row>

            </b-container>
            <div slot="modal-footer" class="w-100">
                 <b-btn size="sm" class="float-right " variant="danger" @click="closemodal">
                Cerrar
                </b-btn>
            </div>
        </b-modal>
        <!-- Modal Component -->
        <b-modal id="modalContacto" ref="ModalContacto" title="Recibido por: ">
             <div slot="modal-header" class="w-100">
                <b-btn size="sm" class="float-right " variant="danger" @click="closemodal">
                X
                </b-btn>
             </div>
            <b-container fluid>
                <b-row>
                    <b-col>
                        <h3>Nombre</h3>
                    </b-col>
                    <b-col>
                        <p>{{recibido.nombre}}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h3>Documento Identificación</h3>
                    </b-col>
                    <b-col>
                        <p>{{recibido.documento}}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h3>Observaciones</h3>
                    </b-col>
                    <b-col>
                        <p>{{recibido.observaciones}}</p>
                    </b-col>
                </b-row>
            </b-container>
            <div slot="modal-footer" class="w-100">
                 <b-btn size="sm" class="float-right " variant="danger" @click="closemodal">
                Cerrar
                </b-btn>
            </div>
        </b-modal>
        <!-- Modal Component 1 imagen modal -->
        <b-modal id="modalimagen" ref="ModalImagunidetalle" title="Evidencia Digital">
            <b-container>
                <b-img :src="variableServidor+imgmodal.imagenes[0].url" fluid alt="Fluid image" />
            </b-container>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-left" variant="primary" v-b-toggle.todo>
                Enviar Correo
                </b-btn>
                <b-collapse class="mt-2" id="todo">
                            <b-card class="border">
                                 <b-form inline>
                                <b-form-input v-model="emailT"
                                    type="email"
                                    placeholder="Email"
                                    @input="validacorreoT" :state="estadoT"></b-form-input>
                                    <b-btn  active-class class="fa fa-arrow-right algo" @click="enviarcorreoT(imgmodal)" >
                                    </b-btn>
                                 </b-form>
                            </b-card>
                    </b-collapse>
                <b-btn size="sm" class="float-right " variant="danger" @click="closemodal">
                Cerrar
                </b-btn>
            </div>
        </b-modal>
        <!-- Modal Component 2 imagenes modal  -->
        <b-modal id="modalimagenes" ref="ModalImagenesdetalle" title="Evidencia Digital"
            data-toggle="modal" lazy>
            <b-container>
                <template v-for="(data,indice) in imgmodal.imagenes">
                    <b-card no-body class="mb-1 border">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-row>
                                <b-col cols="8">
                                    <b-btn block v-b-toggle="data.id" variant="primary">
                                        Evidencia {{indice+1}}
                                    </b-btn>
                                </b-col>
                                <b-col cols="4">
                                    <b-btn v-b-toggle="data.email">
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
                        <b-collapse class="mt-2" :id="data.email">
                            <b-card class="border">
                                 <b-form inline>
                                <b-form-input v-model="email"
                                    type="email"
                                    placeholder="Email"
                                    @input="validacorreo" :state="estado"></b-form-input>
                                    <b-btn  active-class class="fa fa-arrow-right algo" @click="enviarcorreo(data)" v-b-toggle="data.email">
                                    </b-btn>
                                 </b-form>
                            </b-card>
                    </b-collapse>
                    </b-card>
                </template>

            </b-container>
            <div slot="modal-header" class="w-100">
                <b-btn size="sm" class="float-left" variant="success" v-b-toggle.todo>
                Enviar Correo
                </b-btn>
                <b-collapse class="mt-2" id="todo">
                            <b-card class="border">
                                 <b-form inline>
                                <b-form-input v-model="emailT"
                                    type="email"
                                    placeholder="Email"
                                    @input="validacorreoT" :state="estadoT"></b-form-input>
                                    <b-btn  active-class class="fa fa-arrow-right algo" @click="enviarcorreoT(imgmodal)" >
                                    </b-btn>
                                 </b-form>
                            </b-card>
                    </b-collapse>
            </div>
           <div slot="modal-footer" class="w-100">

                <b-btn size="sm" class="float-right" variant="danger" @click="closemodal">
                Cerrar
                </b-btn>
            </div>
        </b-modal>

    </b-container>
</template>

<script>
import $ from 'jquery'
import {bus} from '../main'
import moment from 'moment'
import Preload from '../componentes/preload.vue'
import {urlservicios} from '../main'
export default {
    data () {
        return {
            currentPage:1,
            curieractualFinal:'',
            curieractual:'',
            procesos:{},
            variableServidor:'',
            concepto:'',
            recibido:{
                nombre:null,
                documento:null,
                obser:null
            },
            respuesta:'',
                  email:'',
                  emailT:'',
                  emailvalido: null,
                  emailvalidoT: null,
                  estado:null,
                  estadoT:null,

            info: '',
            curier:{},
            otro:'',
            inputs:'',
            campostra:[
                { key: "fecha", label: "Fecha" },
                { key: "nombre", label: "Nombre" },
                { key: "imagen", label: "Imágenes" },
                {key:"conceptos",label:"Concepto"},
                {key:"recibido",label:"Recibido"}

            ],
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
        }
    },
        filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY, h:mm:ss a')
        }
        }
    },
    methods: {
        curieractualFun(){
            console.log("-------------");
            console.log(this.curieractual);
            if(this.curieractual==''||this.curieractual==undefined||this.curieractual=='undefined'){
                this.curieractualFinal='No tiene curier actual asignado'
            }
            else{
                var apellido,nombre
                apellido=this.curieractual.apellido
                nombre=this.curieractual.nombre
                this.curieractualFinal=this.curieractual.nombre+ ' ' +this.curieractual.apellido
            }


        },

        conceptoModal(value){
            this.concepto=value.conceptos.nombre
            this.$refs.ModalConcepto.show()
        },
        contactoModal(value){
            this.recibido=value.datosRecibidos
            this.$refs.ModalContacto.show()
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
                var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                var objeT
                var objeto
                var objetoimanes=[]
                value.imagenes.map((obj,ind)=>{
                    objeto={
                        ruta:obj.ruta,
                        id:obj.id
                    }
                    objetoimanes.push(objeto)
                })
                objeT={
                        correo:this.emailT,
                        norden:this.info.consec,
                        nmovilizado:this.info.id,
                        nomproceso:this.info.nombre_proceso,
                        imagenes:objetoimanes
                    }
                this.axios.post(urlservicios+"EnviarCorreoImagen", objeT)
                    .then(response => {
                        this.respuesta = response.data;
                        var load=false
                        setTimeout(() => {
                            bus.$emit('load', {
                                load
                            })
                            }, )
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
        },
        closemodal(){
            this.$refs.ModalImagenesdetalle.hide()
            this.$refs.ModalImagunidetalle.hide()
            this.$refs.ModalContacto.hide()
            this.$refs.ModalConcepto.hide()
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
                    norden:this.info.consec,
                    nmovilizado:this.info.id,
                    nomproceso:this.info.nombre_proceso,
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
        volver(){
            var ocultartra=true
            setTimeout(() => {
                bus.$emit('ocultartra', {
                    ocultartra
                })
                }, )
            this.$router.replace('/inicio/trazabilidad/listado')
        }
    },
    mounted: function () {
        var llaves
        var servi =localStorage.getItem("servidor")
        var servicios = JSON.parse(servi)
        this.variableServidor=servicios
    },
    beforeCreate: function() {

        bus.$on('resultado', function (userObject) {
        this.info=userObject.value
        this.otro=this.info
        //this.otro=userObject.personal
        //this.procesos=userObject.proce
        this.inputs=userObject.personal.inputs
        this.curier=userObject.value.courier
        this.curieractual=userObject.value.id_courier_actual

        if(this.curier==undefined||this.curier=='undefined'||
            this.curier==''){
                this.curier={}
        }
      }.bind(this))
    }
}
</script>

<style scoped>
.contenedorTotal{
  padding-top: 0px;
  padding-right: 0%;
  padding-bottom: 0px;
  padding-left: 0%;
  background-color: #ffffff;
}
.borderF {
    border: 1px solid #DCDCDC;
    margin: 1%;
    padding: 1%
}

.card-deck{
        padding-bottom: 15px;
}
.card2{
    box-shadow: 1px 5px 7px 5px rgba(0,0,0,0.1);
    margin-top: 15px;
    /* border-left-width: 0px; */
    /* padding-left: 55px; */
    /* padding-right: 50px; */
    padding-top: 39px;
    /* border-bottom-width: 30px; */
    /* padding-bottom: 30px; */
    border-color: 15px gray;
}
.card-header {
    background-color: #4db35a;
    color: white;
}
</style>
