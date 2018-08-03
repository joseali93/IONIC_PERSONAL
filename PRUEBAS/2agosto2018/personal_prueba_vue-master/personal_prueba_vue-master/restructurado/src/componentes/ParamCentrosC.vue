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
            <b-card class="border mt-2" header="Centro de costos" header-bg-variant="primary" header-tag="h3" no-body>
                <b-card-body>
                  <b-row>
                    <b-col md="6">
                      <v-select v-model="Cliente" label="nombre" placeholder="Cliente"
                        :options="clientes" @input="SelectedClient()"></v-select>
                    </b-col>
                    <b-col md="6">
                      <b-input-group>
                        <b-form-input v-model="Centro" type="text" placeholder="Nombre del Centro de Costo">
                        </b-form-input>
                        <b-btn variant="outline-success" v-show="Centro!=''&&Cliente!=null" @click="nuevocc">
                          <i class="fa fa-plus"></i>
                        </b-btn>
                      </b-input-group>
                    </b-col>
                  </b-row>
                    <b-table class="mt-3" striped hover :items="CentrosTabla" v-if="CentrosTabla.length" :current-page="currentPage" :per-page="perPage"
                        :fields="fields" :filter="Centro" >
                        
                         <template slot="codigo" slot-scope="data">
                        <label class="text-capitalize">{{data.item.codigo_cc}}</label>
                        </template>
                        <template slot="editar" slot-scope="data">
                        <i class="btn btn-success fa fa-pencil" @click="editar(data)"></i>
                        </template>
                        <template slot="nombre" slot-scope="data">
                        <label class="text-capitalize">{{data.item.nombre}}</label>
                        </template>
                    </b-table>
                <b-pagination size="md" v-if="CentrosTabla.length" :total-rows="CentrosTabla.length" v-model="currentPage" :per-page="perPage">
                    </b-pagination>
                </b-card-body>
            </b-card>
        </b-container>
        <!-- Modal Crear Centro logistico -->
        <b-modal id="modalNuevo" ref="modalNuevo" size="lg"
        no-close-on-backdrop
        no-close-on-esc>
            <b-container fluid>
                <b-form-checkbox id="status_nuevo"
                     v-model="status"
                     value="accepted"
                     class=""
                     unchecked-value="not_accepted"
                     @change="esPadre()">
                    Es Centro de Costo Padre
                </b-form-checkbox>
                <v-select
                    v-show="status=='not_accepted'"
                    v-model="centrocostopadre" label="nombre" placeholder="Centro de Costo Padre"

                    :options="CentrosPadre" ></v-select>
                <b-form-group id="fieldsetHorizontal"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        description="Nombre del Centro de Costo"
                        label="Nombre"
                        label-for="nombreCentroC">
                            <b-form-input id="nombreCentroC" v-model="ModalNew.nombre"
                            :state="statusnombre"
                            maxlength="100"
                            @input="ValidarTexto('nombreCentroC','nuevo')"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        description="Dirección del Centro de Costo"
                        label="Dirección Centro de Costo"
                        label-for="direccionCC">
                            <b-form-input id="direccionCC" v-model="ModalNew.direccion"
                            :state="statusdireccion"
                            maxlength="100"
                            @input="ValidarTexto('direccionCC','nuevo')"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        description="Codigo Centro de Costo x Cliente"
                        label="Codigo Centro de Costo   "
                        label-for="CCxCliente">
                            <b-form-input id="CCxCliente" v-model="ModalNew.CCxCliente"
                            :state="statusCCxCliente"
                            maxlength="20"
                            @input="ValidarTexto('CCxCliente','nuevo')"></b-form-input>
                </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        description="Descripción del Centro de Costo"
                        label="Descripción"
                        label-for="descripcionCC">
                        <b-form-textarea id="descripcionCC"
                            v-model="ModalNew.descripcion"
                            placeholder="Descripción del centro de costo"
                            :rows="3"
                            :max-rows="6"
                            :state="statusdescripcion"
                            maxlength="400"
                            @input="ValidarTexto('descripcionCC','nuevo')">
                        </b-form-textarea>
                </b-form-group>
            </b-container>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="primary" @click="crearcentrocosto()">
                Guardar
                </b-btn>
                <b-btn size="sm" class="float-left" variant="danger" @click="cerrarModal()">
                Cancelar
                </b-btn>
            </div>
        </b-modal>
        <!-- Modal Editar Centro Costo -->
        <b-modal id="modalEditar" ref="modalEditar" size="lg"
        no-close-on-backdrop
        no-close-on-esc >
            <b-container fluid>
                <b-form-checkbox id="status_editar"
                     v-model="status_editar"
                     value="accepted"
                     class=""
                     unchecked-value="not_accepted"
                     @change="esPadreEditar()">
                    Es Centro de Costo Padre
                </b-form-checkbox>
                <v-select
                    v-show="status_editar=='not_accepted'"
                    v-model="centrocostopadreEditar" label="nombre" placeholder="Centro de Costo Padre"
                    :options="CentrosPadreEditar" ></v-select>
            <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Nombre del Centro de Costo"
                    label="Nombre"
                    label-for="nombreCentroCED">
                        <b-form-input id="nombreCentroCED" v-model="ModalEdit.nombre"
                        :state="statusnombre"
                        maxlength="100"
                        @input="ValidarTexto('nombreCentroCED','editar')"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Dirección del Centro de Costo"
                    label="Dirección Centro de Costo"
                    label-for="direccionCCED">
                        <b-form-input id="direccionCCED" v-model="ModalEdit.direccion"
                        :state="statusdireccion"
                        maxlength="100"
                        @input="ValidarTexto('direccionCCED','editar')"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                        horizontal
                        :label-cols="4"
                        breakpoint="md"
                        description="Codigo Centro de Costo x Cliente"
                        label="Codigo Centro de Costo   "
                        label-for="direccionCC">
                            <b-form-input id="CCxCliente" v-model="ModalEdit.codigo_cc"
                            :state="statusCCxCliente"
                            maxlength="20"
                            @input="ValidarTexto('CCxCliente','editar')"></b-form-input>
                </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Descripción del Centro de Costo"
                    label="Descripción"
                    label-for="descripcionCCED">
                    <b-form-textarea id="descripcionCCED"
                        v-model="ModalEdit.descripcion"
                        :state="statusdescripcion"
                        placeholder="Descripción del Centro de Costo"
                        :rows="3"
                        :max-rows="6"
                        maxlength="400"
                        @input="ValidarTexto('descripcionCCED','editar')">
                    </b-form-textarea>
            </b-form-group>
            </b-container>
            <div slot="modal-footer" class="w-100">
            <b-btn size="sm" class="float-right" variant="primary" @click="actualizar()">
            Guardar
            </b-btn>
            <b-btn size="sm" class="float-left" variant="danger" @click="cerrarModal()">
            Cerrar
            </b-btn>
            </div>
        </b-modal>
    </b-container>
</template>

<script>

import {urlservicios} from '../main'

export default {

     data () {

    return {
        currentPage:0,
        perPage:5,
         items: [
        {
          text: "Inicio",
          to: "/inicio"
        },
        {
          text: "Configuración Centros de Costo",
          to: "/inicio/configcliente",
          active: true
        }
      ],
        CentrosPadreEditar:[],
        CentrosPadre:[],
        centrocostopadre:null,
        centrocostopadreEditar:null,
        status:'accepted',
        status_editar:'accepted',
        indice:null,
        Cliente: null,
        clientes:[],
        Centro:'',
        CentrosTabla:[],
        fields:[
          { key: 'editar', label: 'Editar', sortable: false },
          { key: 'nombre', label: 'Nombre', sortable: false },
           { key: 'codigo', label: 'Codigo Centro de Costo', sortable: false },
          { key: 'direccion', label: 'Dirección', sortable: false },

        ],
        ModalEdit:{},
        ModalNew:{
          nombre:'',
          direccion:'',
          descripcion:'',
          CCxCliente:''
        },
        statusCCxCliente:null,
        statusnombre:null,
        statusdireccion:null,
        statusdescripcion:null
    }
    },
    methods:{
        esPadreEditar(){
            console.log("editar");
            console.log(this.status_editar);
            if(this.status_editar=='accepted'){
                this.axios.get(urlservicios+"CentrosPorClientePadre/"+this.Cliente._id)
                .then((response) => {
                    console.log(response);
                    this.CentrosPadreEditar=response.data
                })
            }
        },
        esPadre(){
            console.log(this.status);
            if(this.status=='accepted'){
                this.axios.get(urlservicios+"CentrosPorClientePadre/"+this.Cliente._id)
                .then((response) => {
                    console.log(response);
                    this.CentrosPadre=response.data
                })
            }
        },
      ValidarTexto(id,accion){
            var key,tecla,tecla_especial,letras,especiales
            var e = document.getElementById(eval('id')).value;
            ////console.log(id);

            if(accion=='nuevo')
            {
                    if(id=='direccionCC')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){

                        if(e.length>=100){
                            this.statusdireccion=false
                        }
                        else{
                            this.statusdireccion=null
                        }
                    }
                    else{
                        this.statusdireccion=false
                    }
                }
                if(e.match(/^[0-9a-zA-Z\s\-]*$/)){
                    if(id=='CCxCliente')
                    {
                        if(e.length>20){
                            this.statusCCxCliente=false
                        }
                        else{
                            this.statusCCxCliente=null
                        }
                    }
                    if(id=='nombreCentroC')
                    {
                        if(e.length>100){
                            this.statusnombre=false
                        }
                        else{
                            this.statusnombre=null
                        }
                    }

                    if(id=='descripcionCC')
                    {
                        if(e.length>400){
                            this.statusdescripcion=false
                        }
                        else{
                            this.statusdescripcion=null
                        }
                    }
                }
                else{
                    if(id=='nombreCentroC')
                    {
                        this.statusnombre=false
                    }

                    if(id=='descripcionCC')
                    {
                        this.statusdescripcion=false
                    }

                }
            }
            if(accion=='editar')
            {
                if(id=='nombreCentroCED'){
                    if(this.ModalEdit.nombre.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.ModalEdit.nombre.length>=100){
                            this.statusnombre=false
                        }
                        else{
                            this.statusnombre=null
                        }
                    }
                    else{
                        if(id=='nombreCentroCED')
                        {
                            this.statusnombre=false
                        }
                    }
                }
                 if(id=='CCxCliente')
                    {
                        if(e.length>20){
                            this.statusCCxCliente=false
                        }
                        else{
                            this.statusCCxCliente=null
                        }
                    }
                if(id=='direccionCCED'){

                    if(this.ModalEdit.direccion.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        //console.log("coincide");
                        if(this.ModalEdit.direccion.length>=100){
                            this.statusdireccion=false
                        }
                        else{
                            this.statusdireccion=null
                        }
                    }
                    else{
                        this.statusdireccion=false
                    }
                }
                if(id=='descripcionCCED'){
                    if(this.ModalEdit.descripcion.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.ModalEdit.descripcion.length>=400){
                            this.statusdescripcion=false
                        }
                        else{
                            this.statusdescripcion=null
                        }
                    }
                    else{
                        if(id=='empresaED')
                        {
                            this.statusdescripcion=false
                        }
                    }
                }

            }


      },
      nuevocc(){
        console.log("entro a nuevo cc");
        console.log();
        this.ModalNew.nombre=this.Centro
        this.$refs.modalNuevo.show()
      },
      crearcentrocosto(){
        var bandera= true
        if (
          this.ModalNew.nombre == "" ||
          this.ModalNew.direccion == "" ||
          this.ModalNew.ciudad == "" ||
          this.ModalNew.pais == ""
        ) {
          if (this.ModalNew.nombre == "") {
            this.statusnombre = false;
          }
          if (this.ModalNew.direccion == "") {
            this.statusdireccion = false;
          }
          if (this.ModalNew.ciudad == "") {
            this.statusciudad = false;
          }
          if (this.ModalNew.pais == "") {
            this.statuspais = false;
          }
          swal(
            "Error!",
            "Para Actualizar deben estar completos todos los campos",
            "error"
          );
        }
        if( this.statusnombre==false||
          this.statusdireccion==false||
          this.statuspais==false||
          this.statusciudad==false){
          swal(
            'Error!',
            'Para la Creación debe cumplirse el formato establecido',
            'error'
            )
        }
        if(this.centrocostopadre==null&&this.status=='not_accepted'){
            swal(
            'Error!',
            'Debe Completar la información del Centro de Costo Padre',
            'warning'
            )
        }
        else{
        var objeto
        //console.log(this.ModalNew);
        //console.log(this.Cliente);
        //console.log(this.status);
        if(this.status=='not_accepted'){
            console.log("sera hijo");
            objeto ={
                id_cliente:this.Cliente._id,
                id_padre: this.centrocostopadre._id,
                nombre:this.ModalNew.nombre,
                descripcion:this.ModalNew.descripcion,
                codigo_cc:this.ModalNew.CCxCliente,
                direccion:this.ModalNew.direccion,
                nombre_concatenado:this.centrocostopadre.nombre+' - '+this.ModalNew.CCxCliente+' - '+this.ModalNew.nombre
            }

        }
        if(this.status=='accepted'){
            console.log("sera papa");
            objeto ={
                id_cliente:this.Cliente._id,
                id_padre: null,
                nombre:this.ModalNew.nombre,
                descripcion:this.ModalNew.descripcion,
                codigo_cc:this.ModalNew.CCxCliente,
                direccion:this.ModalNew.direccion,
                nombre_concatenado:this.ModalNew.nombre
            }
        }

        console.log(objeto);

        this.axios.post(urlservicios+"CreacionCentrosCostos/",objeto)
                .then((response) => {
                    console.log(response);
                    if(response.data.validar==true)
                    {
                        swal({
                        title: 'Creado Exitosamente',
                        timer: 1500,
                        type:'success'})
                        this.CentrosTabla.push(response.data.centro)
                        this.ModalNew={}
                        this.$refs.modalNuevo.hide()

                    }else{
                         swal({
                        title: 'No se pudo actualizar',
                        timer: 1000,
                        type:'error'})
                    }

                })


       //this.$refs.modalNuevo.hide()
        }
      },
      cerrarModal(){
        this.ModalNew.nombre=''
        this.ModalNew.descripcion=''
        this.ModalNew.direccion=''
        this.ModalEdit.nombre=''
        this.ModalEdit.direccion=''
        this.ModalEdit.descripcion=''
        this.centrocostopadre=null
        this.centrocostopadreEditar=null
        this.CentrosPadreEditar=[]
        this.CentrosPadre=[]
        this.$refs.modalEditar.hide()
        this.$refs.modalNuevo.hide()
      },
      actualizar(){
        if(this.ModalEdit.nombre==''||
                this.ModalEdit.direccion=='')//||
                //this.ModalEdit.descripcion==''
               {
                    if(this.ModalEdit.nombre==''){
                        this.statusnombre=false
                    }
                    if(this.ModalEdit.direccion==''){
                        this.statusdireccion=false
                    }
                    /*
                    if(this.ModalEdit.descripcion==''){
                        this.statusdescripcion=false
                    }
                    */
                    swal(
                    'Error!',
                    'Para Actualizar deben estar completos todos los campos',
                    'error'
                    )
            }
            if(this.statusnombre==false||
            this.statusdireccion==false//||
            //this.statusdescripcion==false
           ){
                //console.log("alguno no cumple formato");
                 swal(
                    'Error!',
                    'Para Actualizar debe cumplirse el formato establecido',
                    'error'
                    )
            }
            else{
               console.log("entro a actualizar");
                //console.log(this.ModalEdit);
                console.log("id papa");
                console.log(this.centrocostopadreEditar);
                var objeto
                if(this.centrocostopadreEditar==null){
                    console.log("edito pade");
                    objeto ={
                        id_centro_costo:this.ModalEdit._id,
                        id_cliente:this.ModalEdit.id_cliente,
                        id_padre: this.centrocostopadreEditar,
                        nombre:this.ModalEdit.nombre,
                        descripcion:this.ModalEdit.descripcion,
                        direccion:this.ModalEdit.direccion,
                        codigo_cc:this.ModalEdit.codigo_cc,
                          nombre_concatenado:this.ModalEdit.nombre

                    }
                }
                else{
                    console.log("edito hijo");
                    objeto ={
                        id_centro_costo:this.ModalEdit._id,
                    id_cliente:this.ModalEdit.id_cliente,
                    id_padre: this.centrocostopadreEditar._id,
                    nombre:this.ModalEdit.nombre,
                    descripcion:this.ModalEdit.descripcion,
                    direccion:this.ModalEdit.direccion,
                    codigo_cc:this.ModalEdit.codigo_cc,
                    nombre_concatenado:this.centrocostopadreEditar.nombre+' - '+this.ModalEdit.codigo_cc+' - '+this.ModalEdit.nombre

                }
                }

                console.log(objeto);

                console.log(urlservicios+"ActualizarCentroCostos/"+this.ModalEdit._id);
                this.axios.post(urlservicios+"ActualizarCentroCostos/"+this.ModalEdit._id,objeto)
                        .then((response) => {
                          console.log(response.data);
                          if(response.data.validar==true)
                            {
                                swal({
                                title: 'Actualizado Exitosamente',
                                timer: 1500,
                                type:'success'})
                                this.CentrosTabla.splice(this.indice, 1);
                                this.CentrosTabla.splice(this.indice, 0, response.data.centro);
                                //this.centrocostopadreEditar=null
                                this.cerrarModal()

                            }else{
                                swal({
                                title: 'No se pudo actualizar',
                                timer: 1000,
                                type:'error'})
                            }
                        })

                //this.$refs.modalEditar.hide()
            }


      },
      editar(value){
        console.log("entro a editar");
        //console.log(value.item);
        this.indice=value.index
        this.ModalEdit=Object.assign({},value.item)
        console.log(this.ModalEdit);
        if(this.ModalEdit.id_padre==null){
            console.log("es padre")
            this.status_editar='accepted'
            this.$refs.modalEditar.show()
            //al editar se debe validar que no sea padre de hijos
        }
        else{
            console.log("es hijo");
            this.status_editar='not_accepted'
            this.axios.get(urlservicios+"CentrosPorClientePadre/"+this.Cliente._id)
                .then((response) => {
                    //console.log(response);
                    this.CentrosPadreEditar=response.data
                    this.CentrosPadreEditar.forEach(element => {
                        //console.log(element);
                        if(this.ModalEdit.id_padre==element._id){
                            console.log(element);
                            this.centrocostopadreEditar=element
                        }
                    });
                })
            this.$refs.modalEditar.show()
        }

      },
      SelectedClient(){
        if(this.Cliente==null||this.Cliente=='null'||this.Cliente==''){
            this.CentrosTabla=[]

        }
        else{
            this.axios.get(urlservicios+"CentrosTodosPorCliente/"+this.Cliente._id)
                .then((response) => {
                    this.CentrosTabla=response.data
                })
        }
        /*
        if(this.Cliente==null)
        {
        console.log("no hago peticion");
        this.CentrosTabla=[]
        }
        else
        {
        this.axios.get(urlservicios+"CentrosPorCliente/"+this.Cliente)
                    .then((response) => {
                        this.CentrosTabla=response.data
                    })
        }
        */
        }
    },
    created: function(){
        var test2 = localStorage.getItem("storedData");
        var test =JSON.parse(test2);
        var id_cliente

        id_cliente='null'
        this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico._id+'/'+id_cliente)
                .then((response) => {
                    this.clientes=response.data
                })
    }

}
</script>

<style>

</style>
