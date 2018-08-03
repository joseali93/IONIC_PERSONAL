<template>
    <b-container>
        <b-row class="my-3">
            <b-btn @click="volver" variant="success">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                Volver
            </b-btn>
        </b-row>
        <b-row>
        </b-row>
        <b-row>
            <b-col>
                <h3>Ciudad:</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h3>Bodega:</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h3>Ciudad:</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h3>Fecha:</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h3>Conductor:</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-table bordered fixed hover
                 :items="valores.listaMovilizados"  :fields="fields">
                <template slot="nmanifiesto" slot-scope="data">
                        {{data.item.id_manifiesto}}
                </template>
                <template slot="id_orden" slot-scope="data">
                        {{data.item.id_orden}}
                </template>
                <template slot="id_movilizado" slot-scope="data">
                        {{data.item.id_movilizado}}
                </template>

                 </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {bus} from "../main"
import {urlservicios} from '../main'
import Preload from '../componentes/preload.vue'

export default {
    data(){
        return{
            valores:'',
            fields:[
                {key:'nmanifiesto', label:'N° Manifiesto'},
                {key:'id_orden',  label: 'N° Orden'},
                {key:'id_movilizado', label:'N° Movilizado'},
                {key:'unidades', label: 'Unidades'},
                {key:'peso', label: 'Peso'},
            ],

        }
    },
    methods:{
        volver()
        {
            console.log("entro a volver");

            var ocultar=true
            setTimeout(() => {
                bus.$emit('ocultar', {
                    ocultar
                })
                }, )

            this.$router.replace('/inicio/manifiestos/resultado')
        }
    },
    beforeCreate: function() {
        var load=true
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                }, )
        bus.$on('detallemanifiesto', function (userObject) {
            //console.log(userObject);
        this.valores=userObject.detalles
         for(var x=0;x<this.valores.listaMovilizados.length;x++){
             this.valores.listaMovilizados[x].id_manifiesto=this.valores.id
         }

        }.bind(this))
       var load=false
                    setTimeout(() => {
                        bus.$emit('load', {
                            load
                        })
                }, )
    }
}
</script>

<style>

</style>
