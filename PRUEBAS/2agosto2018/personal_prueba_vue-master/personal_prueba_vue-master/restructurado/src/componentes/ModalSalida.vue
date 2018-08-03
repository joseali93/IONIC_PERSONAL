<template>
    <b-container>

        
        <b-row id="ejemplo">
             
        </b-row>
        <b-modal id="modallg2" size="lg" v-model="modal" no-close-on-backdrop
        no-close-on-esc>
            <div slot="modal-header" class="w-100 non-printableE">
                <b-btn size="sm" class="float-left" variant="primary" @click="volver">
                Volver
                </b-btn>
                <b-btn size="sm" class="float-right" variant="primary" @click="imprimir">
                Imprimir
                </b-btn>
            </div>
            <div slot="modal-footer"  class="w-100 footerimpresion" >
               
            </div>
            

            <b-container  id="prueba" class="non-printableE " >
                
                <b-row>
                <b-col class="my-2">
                    <b-img :src="servicios+imagen"  fluid alt="Fluid image" class="imgpr" />
                    <!--
            <b-img src="https://lorempixel.com/300/150/" fluid alt="Fluid image" />

                        -->
                </b-col>
                <b-col class="my-2">
                    <b-row>

                    <h1>MANIFIESTO DE BODEGA SALIDA</h1>
                    </b-row>
                     <b-row>
                    <label class="labels">Numero de Manifiesto: <strong class="text-capitalize">{{nmanifiesto}}</strong></label>
                    </b-row>
                    <b-row>
                    <h1>Ciudad: <strong class="text-capitalize"> {{otrainfo[0].ciudad}}</strong></h1> 
                    </b-row>
                    <b-row>
                    <h2>Bodega: <strong class="text-capitalize"> {{otrainfo[0].nombre}}</strong></h2> 
                    </b-row>
                    <b-row>
                    <h3>fecha: <strong>{{fecha}}</strong></h3>  
                    </b-row>
                    <b-row v-if="otrainfo[1]">
                    <h3>Conductor: <strong class="text-uppercase"> {{otrainfo[1].nombre}} {{otrainfo[1].apellido}}</strong></h3> 
                    </b-row>
                    <b-row>
                    <h3>Auxiliar:</h3>
                    </b-row>
                </b-col>
                </b-row>
                <b-row class="my-5">
                <b-col class="my-5">
                <b-table id="mitablita" responsive="sm"  bordered :fixed="true"	
                    outlined  :items="itemsmodal"
                 :fields="fields2" class="juana">
                    <template slot="referencia" slot-scope="data">
                        
                        {{data.item.referencia}}
                        <!--
                        {{referencias(data.item)}}
                        -->
                    </template>
                 
                 </b-table>
                </b-col>
                </b-row>
                <b-row>
                <b-col>
                </b-col>
                <b-col>
                <b-row class="impresion">
                <h2>Total de Envios:  <strong>{{itemsmodal.length}}</strong></h2>
                </b-row>
                <b-row class="impresion">
                <h2>Total de Unidades: <strong>{{Tunidades()}}</strong></h2> 
                </b-row>
                </b-col>
                </b-row>
                <b-row class="my-5 impresion"> 
                <p class="center-button">
                RECIBE: ____________________________________________________________________________
                </p>
                </b-row>
                <b-row class="my-5 impresion">
                <p class="center-button">
                ENTREGA: ___________________________________________________________________________
                </p>
                </b-row>
                
            <footer>
           <b-row>
                <b-col>
                    RPL LOGISTICA- IMPRIME: {{infoimpresion()}}
                </b-col>
                <b-col>
                    FECHA: {{fechaimpre}}
                </b-col>
                </b-row>
            </footer>
            </b-container>
        </b-modal>
    </b-container>
</template>

<script>
import $ from 'jquery'
import {urlservicios} from '../main'
import {bus} from '../main'
import moment from 'moment'
        moment.locale('es');

export default {
    filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY')
        }
        }
    },
    data(){
        return{
            nmanifiesto:'',
            servicios:'',
            imagen:'',
            fecha:  moment().format("DD/MM/YYYY"),
            fechaimpre:moment().format('MMMM Do YYYY, h:mm:ss a'),
            otrainfo:'',
            modal:false,
            itemsmodal:[],
           fields2: [
              { key: 'id', label: 'N° Movilizado' },
              { key: 'nombre', label: 'Cliente' },
              { key: 'direccion_entrega', label: 'Dirección de Entrega' },
              { key: 'referencia', label: 'Referencia' },
              { key: 'numeroOrden', label: 'N° Orden' },
              { key: 'peso', label: 'Peso' },
              { key: 'unidades', label: 'Unidades' },
         ],
        }   
    },
    methods:{
        referencias(value){
        console.log("entro a prueba");
        console.log(value);
        var valoresretornar=[]
        var prue=''
        for(var x=0;x<value.referencia.length;x++){
          //console.log(value.referencia[x].referencia);
          valoresretornar.push(value.referencia[x].referencia)
          prue=''+value.referencia[x].referencia+'--'+prue
        }
        console.log(prue);
        return prue
      },
        infoimpresion(){
            var login = localStorage.getItem("storedData");
            var infologin = JSON.parse(login);
            return infologin.nombre+' '+infologin.apellido
        },
        Tunidades(){
            var retornar=0
            //console.log("entro a Total unidades");

            for(var x=0;x<this.itemsmodal.length;x++){
                if(this.itemsmodal[x].unidades==undefined||this.itemsmodal[x].unidades===undefined||
                    this.itemsmodal[x].unidades==''||this.itemsmodal[x].unidades===''){
                retornar=retornar+0
                }
                else{
                retornar=retornar+parseInt(this.itemsmodal[x].unidades)
                }
            }
            return retornar
        },
      volver(){
          console.log("entro a volver");
          this.$router.go(-1)
       //this.$router.replace('/inicio/entradasalida')
      },
      imprimir(){
          console.log("entro aimprimir");
        if($("#print").length == 0)
        {
            var print =null
            print = document.createElement('div');
            print.setAttribute('id', 'print');
            print.setAttribute('class', 'printable');
            $(print).appendTo('body');

        }
          //$("#print").html($("#footerimpresion").html());

          $("#print").html($("#prueba").html());
          window.print();

        $("#print").remove();
      }
    },
    mounted: function() {
        var servi =localStorage.getItem("servidor")
      var servicios = JSON.parse(servi)
      var test2 = localStorage.getItem("storedData");
    var test = JSON.parse(test2);
    this.imagen = test.url_logo;
      this.servicios = servicios
       bus.$on('modalinfo', function (userObject) {
        console.log("evento modalinfo");

        this.itemsmodal = userObject.itemsmodal
        console.log(this.itemsmodal);
        this.otrainfo= userObject.inforvaria

        this.nmanifiesto=userObject.nmanifiesto
        
        if(this.otrainfo){

        }
        console.log("informacion que da error");
        console.log(this.otrainfo);
        this.modal=true
      }.bind(this))

        moment.locale('es');
    },
}
</script>
<style  scopped>
            /*
            @import url("../css/PrintManifest.css") print;
            */
        </style>
