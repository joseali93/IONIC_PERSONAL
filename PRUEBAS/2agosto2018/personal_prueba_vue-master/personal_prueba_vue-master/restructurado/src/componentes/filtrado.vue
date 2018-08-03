<template>

  <b-container fluid class="contenedorTotal">

    <div class="breadcrumb-holder">
      <div class="container-fluid">
        <b-breadcrumb :items="items" />
        <!-- <ul class="breadcrumb">
          <li v-for="(item, i) in items" :key="i" class="breadcrumb-item">
            <a :href="item.to">{{item.text}}</a>
          </li>
        </ul> -->
      </div>
    </div>

    <b-container fluid>
      <b-card class="mt-2 border" v-show="ocultar" header="Primary" header-bg-variant="primary">
        <h3 slot="header" class="mb-0">Información de filtrado</h3>
        <!--

        <header class="content-heading" slot="header">

          <h3>Consultar Ordenes de Servicio</h3>

        </header>

        -->

        <div class="form-row">
          <b-form-group class="text-primary col-md-6" >
          <h3 class="text-primary">Clientes</h3>
            <!--

            <b-form-select v-model="selectedCL" class="mb-3" :options="clientes"

            text-field="nombre" value-field="_id" @change.native="SelectCC"

            :disabled="disabled_selectedCL">

            </b-form-select>

            -->

            <v-select v-model="selectedCL" label="nombre" placeholder="Cliente"

            :options="clientes" @input="seleccionCliente()"

            :disabled="disabled_selectedCL"></v-select>

          </b-form-group>

          <b-form-group class="text-primary col-md-6" >
          <h3 class="text-primary">Centros de costo</h3>
            <!--

            <b-form-select v-model="selectedCC" class="mb-3" :options="centros"

            text-field="nombre" value-field="_id" :disabled="habilitar">

            </b-form-select>

            -->

            <v-select v-model="selectedCC" label="nombre_concatenado" placeholder="Centro de Costo"

              :options="centros"

              :disabled="habilitar">

            </v-select>

          </b-form-group>

        </div>

        <div class="form-row">

          <b-form-group class="text-primary col-md-6" >
            <h3 class="text-primary">Rango de fechas</h3>
            <date-picker class="w-100" v-model="time1" range lang="es" :shortcuts="shortcuts" :confirm="true" @confirm="dateSelected">

            </date-picker>

          </b-form-group>

          <b-form-group class="text-primary col-md-6" >
            <h3 class="text-primary">Orden de servicio</h3>
            <b-input-group>

              <b-form-input v-model="filter" type="number" @keyup="numeros(this)"

                placeholder="Número Orden de Servicio"/>

            </b-input-group>

          </b-form-group>

        </div>

        <div class="form-row">

          <b-form-group  class="text-primary col-md-6">
            <h3 class="text-primary">Estado</h3>
            <b-input-group>

              <!--

              <b-form-select  v-model="selected_state" :options="estados" text-field="nombre"

              value-field="nombre" @change.native="selestado">

              </b-form-select>

              -->

              <v-select v-model="selected_state" class="w-100" label="nombre" placeholder="Estado" :options="estados">

              </v-select>

            </b-input-group>

          </b-form-group>

        </div>

        <b-btn class="my-1 rounded float-right text-white" variant="warning" exact-active-class v-on:click="consultar()">
          <i class="fa fa-search" aria-hidden="true"></i>&#32;Consultar
        </b-btn>

      </b-card>
      <router-view :consulta="consulta" :peticion="peticion"></router-view>
    </b-container>
  </b-container>

</template>

<script>
import DatePicker from "vue2-datepicker";
import {bus} from "../main"
import {urlservicios} from '../main'
import Preload from '../componentes/preload.vue'
import moment from 'moment'
import { GetDatesRange } from './utils/datesRange.js';

export default {

      components :{
    Preload,
    DatePicker
  },

    data() {
        return {
            sel_conslta: false,
            items : [
            {
                text: "Inicio",
                to: "/inicio"
            },
            {
                text: "Consultar Ordenes de Servicio",
                href: "#"
            }
            ],
                peticion:'',
             shortcuts: [
                {
                text: 'Hoy',
                start: new Date(),
                end: new Date()
                },
                {
                text: 'Semana',
                start: new Date(),
                end: new Date()
                },
                {
                text: 'Mes',
                start: new Date(),
                end: new Date()
                },
            ],
            disabled_selectedCL: false,
            ocultar: true,
            /*
            items: [{
                text: 'Consultar Ordenes de Servicio',
                active: true
            }],
            */
            habilitar: true,
            load: false,
            consulta: [],
            estados: [],
            selected_state: null,
            time1: [

            ],
            selectedCL: null,
            clientes: [],
            selectedCC: null,
            centros: [],
            filter: '',
            getDatesRange: new GetDatesRange()
        };
    },
    methods:{
        seleccionCliente(){
            if(this.selectedCL!=null){
                var load=true
                setTimeout(() => {
                    bus.$emit('load', {
                        load
                    })
                    }, )
                this.axios.get(urlservicios+"CentrosPorCliente/"+this.selectedCL._id)
                    //this.axios.get(urlservicios+"centros/")
                    .then((response) => {
                        this.centros=response.data

                    //this.load=false
                    var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                    this.habilitar= false
                    })
                    .catch(function(error) {
                    var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                            load
                            });
                        });
                        swal(
                            'Se presento un problema',
                            'Intente nuevamente, por favor',
                            'warning'
                            )
        })
            }
            else{
                this.habilitar= true
            }


        },
        selestado(value){
            this.selected_state=value.target.value
        },
        numeros(valor) {
            var a = document.getElementById("telefono").value;
            var x = a.keyCode;
            if (!(a >= 48 || a <= 57)) {
                swal("Oops...", "Solo deben ser numeros :)!", "error");
                return (document.getElementById("telefono").value = "");
            } else if (a.length >= 9) {
                // if no is more then the value
                swal("Oops...", "Maximo 10 digitos!", "error");
                return (document.getElementById("telefono").value = "");
            }
        },
        detalles(indice){

            bus.$emit('actualizar',indice)
        },
        consultar: function(){
            const getDates = (this.getDatesRange.getRange());
            const startOfToday = (getDates[0]);
            const endOfToday = (getDates[1]);

            this.sel_conslta=true

            ///ObtenerOrdenesFiltrado/:consecutivo/:estado/:id_remitente/:id_centro/:fecha_inicio/:fecha_final
            var cliente
            var centrocosto
            var inicio
            var fin
            var esadoconsulta
             var fecha=new Date();
            var _this=this
            var d =new Date()
            var year = d.getFullYear()
            var month = d.getMonth()
            var day = d.getDate()
            var ant = new Date()
            var monthante = ant.getMonth()-1
            var dayante =ant.getDate()
            d.setFullYear(year,month,day)
            ant.setFullYear(year,monthante,dayante)

            var mana=new Date(fecha.getTime() + 24*60*60*1000);
            var fechainicial= moment(this.time1[0])
            var finalfinal= moment(this.time1[1])

            var cantidaddias=finalfinal.diff(fechainicial, 'days')


            if(cantidaddias>32||this.time1=='')
            {
                if(cantidaddias>32){
                    swal(
                    'Advertencia',
                    'Solo puede seleccionarse maximo 30 días',
                    'warning'
                    )
                }
                else{
                    if(this.time1==''||this.time1===''||this.time1===undefined){
                         this.time1=[]
                         this.time1[0]=ant
                         this.time1[1]=mana
                        /*
                        this.time1 = [
                            startOfToday,
                            endOfToday
                        ]*/
                    }
                    if(this.time1[0]===''||this.time1[0]===undefined){
                    inicio=ant
                    }
                    else{
                            inicio=this.time1[0]
                    }
                    if(this.time1[1]===''||this.time1[1]===undefined){
                        fin=mana
                    }
                    else{
                            fin=this.time1[1]
                        }
                    if(this.filter===''){
                        this.filter="null"
                        }
                    if(this.selected_state===''|| this.selected_state==null){
                        //this.selected_state="null"
                        //queda pendiente de juan
                        esadoconsulta='null'
                        }
                        else{
                            esadoconsulta=this.selected_state.nombre
                        }
                    if(this.selectedCL===''||this.selectedCL===null){
                        cliente="null"
                        }
                        else{
                        cliente=this.selectedCL._id
                        }
                    if(this.selectedCC===''||this.selectedCC===null){
                        centrocosto="null"
                        }
                        else{
                        centrocosto=this.selectedCC._id
                        }

                    var login = localStorage.getItem("storedData");
                    var infologin =JSON.parse(login);
                    var load=true
                        setTimeout(() => {
                            bus.$emit('load', {
                                load
                            })
                            }, )
                    this.axios.get(urlservicios+"ObtenerOrdenesFiltrado/"+infologin.id_OperadorLogistico._id+"/"+this.filter+"/"+esadoconsulta+
                    "/"+cliente+"/"+centrocosto+"/"+inicio+"/"+fin+"null")
                    .then((response) => {
                        this.consulta=response.data
                        if(this.consulta==''){
                            var load=false
                            setTimeout(() => {
                                bus.$emit('load', {
                                    load
                                })
                                }, )
                            swal(
                                'Oops...',
                                'No se encontro ninguna Orden!',
                                'error'
                                )

                        }
                        else{
                            var load=false
                        setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                                this.$router.replace('/inicio/consultar/resultado')
                        }
                    })
                    .catch(function(error) {
                    var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                            load
                            });
                        });
                        swal(
                            'Se presento un problema',
                            'Intente nuevamente, por favor',
                            'warning'
                            )
                         })

                }


            }
            else{
                if(this.time1[0]===''||this.time1[0]===undefined){
                inicio=ant
                }
                else{
                        inicio=this.time1[0]
                }
                if(this.time1[1]===''||this.time1[1]===undefined){
                    fin=mana
                }
                else{
                        fin=this.time1[1]
                    }
                if(this.filter===''){
                    this.filter="null"
                    }
                if(this.selected_state===''|| this.selected_state==null){
                    //this.selected_state="null"
                    //queda pendiente de juan
                    esadoconsulta='null'
                    }
                    else{
                        esadoconsulta=this.selected_state.nombre
                    }
                if(this.selectedCL===''||this.selectedCL===null){
                    cliente="null"
                    }
                    else{
                    cliente=this.selectedCL._id
                    }
                if(this.selectedCC===''||this.selectedCC===null){
                    centrocosto="null"
                    }
                    else{
                    centrocosto=this.selectedCC._id
                    }

                var login = localStorage.getItem("storedData");
                var infologin =JSON.parse(login);
                var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )

                this.axios.get(urlservicios+"ObtenerOrdenesFiltrado/"+infologin.id_OperadorLogistico._id+"/"+this.filter+"/"+esadoconsulta+
                "/"+cliente+"/"+centrocosto+"/"+inicio+"/"+fin+"/null")
                .then((response) => {
                    this.consulta=response.data
                    if(this.consulta==''){
                        var load=false
                        setTimeout(() => {
                            bus.$emit('load', {
                                load
                            })
                            }, )
                        swal(
                            'Oops...',
                            'No se encontro ninguna Orden!',
                            'error'
                            )

                    }
                    else{
                        var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                            this.$router.replace('/inicio/consultar/resultado')
                    }
                })
                .catch(function(error) {
                    var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                            load
                            });
                        });
                        swal(
                            'Se presento un problema',
                            'Intente nuevamente, por favor',
                            'warning'
                            )
        })

            }

        },
        SelectCC(value){
            var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Centro de Costo' };
            if(this.disabled_selectedCL==true)
            {
                this.selectedCL=value
                var load=true
                setTimeout(() => {
                    bus.$emit('load', {
                        load
                    })
                    }, )
                this.axios.get(urlservicios+"CentrosPorCliente/"+this.selectedCL)
                //this.axios.get(urlservicios+"centros/")
                .then((response) => {
                    this.centros=response.data
                    //this.centros.unshift(vacio)
                    //this.load=false
                    var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                    this.habilitar= false
                })
                .catch(function(error) {
                    var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                            load
                            });
                        });
                        swal(
                            'Se presento un problema',
                            'Intente nuevamente, por favor',
                            'warning'
                            )
        })
            }else{
                this.selectedCL=value.target.value
                  //this.load = true;
                var load=true
                setTimeout(() => {
                    bus.$emit('load', {
                        load
                    })
                    }, )
                this.axios.get(urlservicios+"CentrosPorCliente/"+value.target.value)
                //this.axios.get(urlservicios+"centros/")
                .then((response) => {
                    this.centros=response.data
                        //this.centros.unshift(vacio)
                    //this.load=false
                    var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                        }, )
                    this.habilitar= false
                })
                .catch(function(error) {
                    var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                            load
                            });
                        });
                        swal(
                            'Se presento un problema',
                            'Intente nuevamente, por favor',
                            'warning'
                            )
        })
            }



        },
      dateSelected(dateList = null) {
        this.time1 = (this.getDatesRange.getRange(dateList));
      }
    },
    updated: function () {
      bus.$on('ocultar', function (userObject) {
        this.ocultar = userObject.ocultar
      }.bind(this))
      bus.$on('consultar', function () {
        this.consultar()
      }.bind(this))
      
    },
    mounted: function () {
      const getDates = (this.getDatesRange.getRange());
      const startOfToday = (getDates[0]);
      const endOfToday = (getDates[1]);

      const fecha = (new Date());
      // var d =new Date()
      // var year = d.getFullYear()
      // var month = d.getMonth()
      // var day = d.getDate()
      // var ant = new Date()
      // var monthante = ant.getMonth()-1
      // var dayante =ant.getDate()
      // d.setFullYear(year,month,day)
      // ant.setFullYear(year,monthante,dayante)
      // var mana=new Date(instance.getTime() + 24*60*60*1000);

      var HaceUnaSemana=new Date(fecha.getTime() - (24*60*60*1000)*7);
      var HaceUnaSemanaDia = HaceUnaSemana.getDate()
      var HaceUnaSemanaMes = HaceUnaSemana.getMonth()
      var HaceUnaSemanaYear = HaceUnaSemana.getFullYear()
      HaceUnaSemana.setFullYear(HaceUnaSemanaYear,HaceUnaSemanaMes,HaceUnaSemanaDia)
      for(var p = 0;p < this.shortcuts.length; p++) {
        if(p==1)
        {
          this.shortcuts[p].start = HaceUnaSemana;
          this.shortcuts[p].end = endOfToday;
        }
        if(p==2)
        {
          this.shortcuts[p].start = startOfToday;
          this.shortcuts[p].end = endOfToday;
        }
      }
      // this.shortcuts[3].start = startOfToday;
      // this.shortcuts[3].end = endOfToday;
      this.time1 = [
        startOfToday,
        endOfToday
      ];
        var concatday
        var bandera=true

        var vacio=  { _id: null, nombre: 'Por Favor Seleccione un Cliente' };
        var vacio2= { nombre: 'Por Favor Seleccione un Cliente' };
        var login = localStorage.getItem("storedData");
        var infologin =JSON.parse(login);
        var id_cliente
        if(infologin.id_cliente==undefined||infologin.id_cliente==null){
            id_cliente='null'
            var load=true
            setTimeout(() => {
                bus.$emit('load', {
                    load
                })
                }, )
            this.axios.get(urlservicios+"clientesOperador/"+infologin.id_OperadorLogistico._id
            +'/null')
            .then((response) => {
                var load=false
            setTimeout(() => {
                bus.$emit('load', {
                    load
                })
                }, )
                this.clientes=response.data

            }).catch(function(error) {
             var load = false;
                setTimeout(() => {
                    bus.$emit("load", {
                    load
                    });
                });
                swal(
                    'Error',
                    'Intente nuevamente, por favor',
                    'warning'
                    )
        })
        }else{
            id_cliente=infologin.id_cliente
            var load=true
            setTimeout(() => {
                bus.$emit('load', {
                    load
                })
            }, )
            this.axios.get(urlservicios+"clientesOperador/"+infologin.id_OperadorLogistico._id
            +'/'+id_cliente)
            .then((response) => {
                this.clientes=response.data
                this.selectedCL=Object.assign({},this.clientes[0])
                //this.clientes.unshift(vacio)
            }).catch(function(error) {
             var load = false;
                setTimeout(() => {
                    bus.$emit("load", {
                    load
                    });
                });
                swal(
                    'Error',
                    'Intente nuevamente, por favor',
                    'warning'
                    )
        })
            this.disabled_selectedCL=true
            //this.SelectCC(id_cliente)
        }
         var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                    load
                    });
                });
        this.axios.get(urlservicios+"estados/")
        .then((response) => {
            this.estados=response.data
            var load = false;
                setTimeout(() => {
                    bus.$emit("load", {
                    load
                    });
                })
             //var vacio3=  { nombre: 'Por Favor Seleccione un Estado' ,disabled:true};
             //this.selected_state='Por Favor Seleccione un Estado'
             //this.estados.unshift(vacio3)
        })
        .catch(function(error) {
             var load = false;
                setTimeout(() => {
                    bus.$emit("load", {
                    load
                    });
                });
                swal(
                    'Error',
                    'Intente nuevamente, por favor',
                    'warning'
                    )
        })


    },
}
</script>

<style>
.contenedorTotal {
    padding-top: 0px;
    padding-right: 0%;
    padding-bottom: 0px;
    padding-left: 0%;
    background-color: #f8f8ff;
}
.cards2 {
box-shadow: 1px 5px 7px 5px rgba(0,0,0,0.1);
  /*margin: 2%;
    /*border-top-width: 3px;
    */
    margin-top: 15px;

  border-left-width:0px;
  padding-left: 55px;
  padding-right: 50px;
  padding-top: 39px;
  border-bottom-width: 30px;
  padding-bottom: 30px;
  border-color: 15px gray;
}
.contenedor {
  padding-top: 0px;
  padding-right: 2%;
  padding-bottom: 0px;
  padding-left: 4%;
  background-color: #f8f8ff;
}
.cards{
    /*
    margin-top: 2%;
    border-top-width: 3px;
    border-color: gray
    */
    box-shadow: 1px 5px 7px 5px rgba(0,0,0,0.1);
  /*margin: 2%;
    /*border-top-width: 3px;
    */

  border-left-width:px;
  padding-left: 55px;
  padding-right: 50px;
  padding-top: 30px;
  border-bottom-width: 30px;
  padding-bottom: 30px;
  border-color: 15px gray;


}
.car{
    border: 1px solid transparent;
    border-color: #c4c4c4
}
</style>
