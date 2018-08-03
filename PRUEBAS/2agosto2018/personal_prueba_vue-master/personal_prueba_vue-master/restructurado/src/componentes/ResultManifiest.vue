<template>
  <b-container>
        <b-table :items="consulta" :fields="fields"
            :per-page="5" :current-page="currentPage" :bordered="true">
            <template slot="id_manifiesto" slot-scope="data">
                        {{data.item.id}}
            </template>
            <template slot="estado_manifiesto" slot-scope="data">
                 <label class=" text-capitalize">
                        {{data.item.estado_manifiesto}}
                 </label>
            </template>

             <template slot="NombresYApellidoCourier" slot-scope="data" class=" text-capitalize">
                 <label class=" text-capitalize">
                     {{data.item.nombre_courier}} {{data.item.apellido_courier}}
                 </label>

            </template>
            <template slot="detalles" slot-scope="data">
                 <i class="btn btn-success fa fa-info"  @click="actualizar(data.item)"></i>
            </template>
            <template slot="imprimir" slot-scope="data">
                <i class="btn btn-success fa fa-print" v-show="data.item.modal"  @click="imprimir(data.item)"></i>
            </template>
            <template slot="cantmovilizados" slot-scope="data">
                {{data.item.listaMovilizados.length}}
            </template>
            <template slot="fecha_creacion" slot-scope="data">
                {{data.item.fecha_creacion |formatdate}}
            </template>
        </b-table>
        <b-pagination size="md" :total-rows="consulta.length" v-model="currentPage" :per-page="5">
        </b-pagination>
        <!-- Modal Component -->
        <b-modal id="modal1" size="lg" ref="myModalRef" title="Información" class="text-primary"

        no-close-on-backdrop
        no-close-on-esc>
            <div slot="modal-header" class="w-100">
                <b-btn size="sm" class="float-left" variant="primary" @click="cerrarModal">
                Cerrar
                </b-btn>

            </div>
            <b-container>
                <b-row>
                    <b-col class=" text-primary text-capitalize">
                        <label>Ciudad: <strong>{{detalle.ciudad}}</strong></label>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class=" text-primary text-capitalize">
                        <label>Bodega: <strong>{{detalle.nombre_centro}}</strong></label>
                    </b-col>
                </b-row>

                <b-row class="text-primary">
                    <b-col>
                        <label >Fecha: <strong>{{detalle.fecha_creacion | formatdate}}</strong></label>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class=" text-primary text-capitalize">
                        <label>Conductor: <strong>{{detalle.nombre_courier}} {{detalle.apellido_courier}}</strong></label>
                    </b-col>
                </b-row>
                <b-row>

                    <b-col>
                        <b-table bordered fixed hover
                        :items="detalle.listaMovilizados"  :fields="fields2">

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
        </b-modal>
  </b-container>
</template>

<script>
import moment from 'moment'
import {bus} from "../main"
import {urlservicios} from '../main'
import Preload from '../componentes/preload.vue'
export default {
    data(){

        return{
            detalle: '',
            currentPage:1,
            fields:[
                { key: 'id_manifiesto', sortable: true , label: 'N° Manifiesto'},
                {key:'NombresYApellidoCourier',  label: 'Courier'},
                {key:'fecha_creacion', sortable: true ,label: 'Fecha'},
                {key:'estado_manifiesto', label: 'Estado'},
                {key:'cantmovilizados', label: 'Cantidad de Movilizados'},
                {key:'imprimir', label: 'Imprimir'},
                'detalles'
            ],
             fields2:[
                {key:'id_orden',  label: 'N° Orden'},
                {key:'id_movilizado', label:'N° Movilizado'},
                {key:'unidades', label: 'Unidades'},
                {key:'peso', label: 'Peso'},
            ],
        }
    },
    props:['consulta'],
    filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY')
        }
        }
    },
    methods:{
        cerrarModal(){
             this.$refs.myModalRef.hide()
        },
        imprimir(value){
            console.log("entro a imprimir");
            var items=value.listaMovilizados
            var inforvaria=[
                {
                    ciudad:value.ciudad,
                    nombre:value.nombre_centro,
                },
                {
                    nombre:value.nombre_courier,
                    apellido:value.apellido_courier
                }
            ]
            console.log(items.length);
            console.log(items);
            var normalizado
            var itemsmodal=[]
            for(var x=0;x<items.length;x++){
                console.log(items[x]);
                normalizado={
                    id:items[x].id_movilizado,
                    nombre:items[x].nombre_cliente,
                    nombre_centro:items[x].nombre_centro,
                    direccion_entrega:items[x].direccion_entrega,
                    referencia:items[x].referencia,
                    numeroOrden:items[x].id_orden,
                    peso:items[x].peso,
                    unidades:items[x].unidades
                }
                itemsmodal.push(normalizado)
            }
            console.log(itemsmodal);

             setTimeout(() => {
                        bus.$emit('modalinfo', {
                            itemsmodal,inforvaria
                        })

                        }, )
            this.$router.push(value.modal)

        },
        actualizar(value){
            console.log("entro a actualizar");
            console.log(value);
            var detalles=value
            this.detalle=value
            var ocultar=false
            setTimeout(() => {
                bus.$emit('detallemanifiesto', {
                    detalles
                })
                }, )
                /*
            setTimeout(() => {
                bus.$emit('ocultar', {
                    ocultar
                })
                }, )

            this.$router.replace('/inicio/manifiestos/detalle')
                */
                this.$refs.myModalRef.show()
        }
    }
}
</script>

<style>

</style>
