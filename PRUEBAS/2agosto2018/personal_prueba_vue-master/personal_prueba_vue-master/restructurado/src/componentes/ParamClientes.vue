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
            <b-card class="border mt-2" no-body header="Primary" header-bg-variant="primary">
              <h3 slot="header" class="mb-0 encabezado">Clientes</h3>
                <b-card-body>
                    <b-row>
                        <b-col md="2" offset-md="10">
                          <div class="float-right mb-3">
                            <b-btn variant="outline-success" @click="ClienteNuevo()">
                              <i class="fa fa-plus"></i>
                            </b-btn>
                            <b-btn variant="outline-success" @click="refrescarClientes()">
                              <i class="fa fa-refresh"></i>
                            </b-btn>
                          </div>
                        </b-col>
                    </b-row>

                    <b-form-group id="fieldsetHorizontal"
                                    horizontal
                                    :label-cols="4"
                                    breakpoint="md"
                                    description="Filtrara del listado de clientes asociados."
                                    label="Buscar Cliente "
                                    label-for="inputHorizontal">
                        <b-form-input   id="inputHorizontal"
                                        v-model="Cliente"
                                        placeholder="Nombre del Cliente"

                                        ></b-form-input>
                    </b-form-group>

                    <b-table responsive fixed :items="ClientesTabla" :fields="fields"
                    :filter="Cliente" :current-page="currentPage" :per-page="10"
                    class="my-2">
                        <template slot="editar" slot-scope="data">
                            <i class="btn btn-success fa fa-pencil" @click="editar(data)"></i>
                        </template>
                        <template slot="nombre" slot-scope="data">
                            {{data.item.nombre}}
                        </template>
                        <template slot="direccion" slot-scope="data">
                            {{data.item.direccion}}
                        </template>
                        <template slot="nit" slot-scope="data">
                            {{data.item.nit}}
                        </template>
                        <template slot="correo" slot-scope="data">
                            {{data.item.correo}}
                        </template>

                    </b-table>
                    <b-pagination size="md" :total-rows="ClientesTabla.length" v-model="currentPage" :per-page="10">
                    </b-pagination>
                </b-card-body>
            </b-card>
        </b-container>


        <!-- Modal Nuevo Cliente -->
        <b-modal id="modalNuevo" size="lg" ref="modalNuevo"
            title="Crear Clientes"
            no-close-on-esc
            no-close-on-backdrop>
            <b-container fluid>
                <b-form-group id="nombre"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Nombre Cliente"
                    label="Cliente"
                    label-for="nombreCliente">
                    <b-form-input id="nombreCliente" v-model="ModalNew.nombre"
                    maxlength="100"
                    @input="ValidarTexto('nombreCliente','nuevo')"
                    :state="statusnombre"></b-form-input>
                </b-form-group>
                <b-form-group id="direccionlabel"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Dirección del Cliente"
                    label="Dirección Cliente"
                    label-for="direccionCliente">
                    <b-form-input id="direccionCliente" v-model="ModalNew.direccion"
                    maxlength="100"
                    @input="ValidarTexto('direccionCliente','nuevo')"
                    :state="statusdireccion"></b-form-input>
                </b-form-group>
                <b-form-group id="telefonolabel"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Teléfono del Cliente"
                    label="Teléfono"
                    label-for="telefono">

                    <b-form-input id="telefono" v-model="ModalNew.telefono"
                    maxlength="20"
                    @input="ValidarTelefono('telefono','nuevo')"
                    :state="statustelefono"></b-form-input>
                </b-form-group>
                <b-form-group id="empresalabel"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Nombre de la Empresa a la que pertenece"
                    label="Empresa"
                    label-for="empresa">
                    <b-form-input id="empresa" v-model="ModalNew.empresa"
                    maxlength="100"
                    @input="ValidarTexto('empresa','nuevo')"
                    :state="statusempresa"></b-form-input>
                </b-form-group>
                <b-form-group id="nit"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="NIT de la empresa"
                    label="NIT"
                    label-for="nitEmpresa">
                    <b-form-input id="nitEmpresa" v-model="ModalNew.nit"
                    maxlength="20"
                    @input="ValidarTelefono('nitEmpresa','nuevo')"
                    :state="statusnit"></b-form-input>
                </b-form-group>
                <b-form-group id="email"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Correo de contacto"
                    label="Correo Electronico"
                    label-for="emailContacto">
                    <b-form-input id="emailContacto" v-model="ModalNew.correo"
                    maxlength="100"
                    @input="validacorreo" :state="statusCorreo"></b-form-input>
                </b-form-group>
           </b-container>
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right text-white rounded" variant="warning" @click="adicionarCliente()">
                  <i class="fa fa-floppy-o"></i>&#32;Guardar
                </b-btn>
                <b-btn size="sm" class="float-left text-white rounded" variant="danger" @click="cerrarModal()">
                  <i class="fa fa-times-circle"></i>&#32;Cerrar
                </b-btn>
            </div>
            <div slot="modal-header" class="w-100">
                <strong >Crear Cliente</strong>
                <b-btn size="sm" class="float-right rounded" variant="danger" @click="cerrarModal()">&times;</b-btn>
            </div>
        </b-modal>
        <!-- Modal Editar Cliente -->
        <b-modal id="modalEditar" size="lg" ref="modalEditar" title="Editar Clientes">
           <b-container fluid>
                <b-form-group id="ClienteED"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Nombre Cliente"
                    label="Cliente"
                    label-for="nombreCliente">
                    <b-form-input id="nombreClienteED" v-model="ModalEdit.nombre"
                     maxlength="100"
                    @input="ValidarTexto('nombreClienteED','editar')"
                    :state="statusnombre"></b-form-input>
                </b-form-group>
                <b-form-group id="DireccionED"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Dirección del Cliente"
                    label="Direccion Cliente"
                    label-for="direccionCliente">
                        <b-form-input id="direccionClienteED" v-model="ModalEdit.direccion"
                        maxlength="100"
                        @input="ValidarTexto('direccionClienteED','editar')"
                        :state="statusdireccion"></b-form-input>
                </b-form-group>
                <b-form-group id="telefonoEdicion"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Telefono del Cliente"
                    label="Telefono"
                    label-for="telefono">
                    <b-form-input id="telefonoED" v-model="ModalEdit.telefono"
                    @input="ValidarTelefono('telefonoED','editar')"
                    :state="statustelefono"
                    maxlength="20"></b-form-input>
                </b-form-group>
                <b-form-group id="EmpresaEdicion"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="Nombre de la Empresa a la que pertenece"
                    label="Empresa"
                    label-for="empresa">
                    <b-form-input id="empresaED" v-model="ModalEdit.empresa"
                    maxlength="100"
                    @input="ValidarTexto('empresaED','editar')"
                    :state="statusempresa"></b-form-input>
                </b-form-group>
                <b-form-group id="NITedicion"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    description="NIT de la compañia"
                    label="NIT"
                    label-for="nitEmpresa">
                    <b-form-input id="nitEmpresaED" v-model="ModalEdit.nit"
                    @input="ValidarTelefono('nitEmpresaED','editar')"
                    maxlength="20"
                     :state="statusnit"></b-form-input>
            </b-form-group>
                <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
                description="Correo de contacto"
                label="Correo Electronico"
                label-for="emailContacto">
                    <b-form-input id="emailContactoED" v-model="ModalEdit.correo"
                    maxlength="100"
                    @input="validacorreo" :state="statusCorreo"></b-form-input>
                </b-form-group>
           </b-container>
           <div slot="modal-header" class="w-100">
              <strong>Editar Cliente</strong>
            </div>

           <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right text-white rounded" variant="warning" @click="actualizarCliente()">
                  <i class="fa fa-floppy-o"></i>&#32;Guardar
                </b-btn>
                <b-btn size="sm" class="float-left text-white rounded" variant="danger" @click="cerrarModal()">
                  <i class="fa fa-times-circle"></i>&#32;Cerrar
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
        items: [
        {
          text: "Inicio",
          to: "/inicio"
        },
        {
          text: "Configuración Clientes",
          to: "/inicio/configcliente",
          active: true
        }
      ],
        indice:null,
        statustelefono:null,
        statusnombre:null,
        statusdireccion:null,
        statusempresa:null,
        statusnit:null,
        statusCorreo: null,
        Cliente: '',
        ClientesTabla:[],
        fields: [
          { key: 'editar', label: 'Editar', sortable: false },
            { key: 'nombre', label: 'Nombre Cliente', sortable: true },
            { key: 'direccion', label: 'Dirección Cliente', sortable: false },
            { key: 'nit', label: 'NIT', sortable: false },
            { key: 'telefono', label: 'Teléfono Contacto', sortable: false },
            { key: 'empresa', label: 'Empresa', sortable: false },
            { key: 'correo', label: 'Correo Contacto', sortable: false },
        ],
        ModalEdit:{},
        ModalNew:{
            nombre:'',
            direccion:'',
            empresa:'',
            nit:'',
            correo:'',
            telefono:''
        }
    }
    },
    methods:{
        ValidarTexto(id,accion){
            //console.log("entro a validar");
            var key,tecla,tecla_especial,letras,especiales
            var e = document.getElementById(eval('id')).value;
            ////console.log(id);

            if(accion=='nuevo')
            {
                    if(id=='direccionCliente')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){

                        if(e.length>=100){
                            this.statusdireccion=null

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
                    if(id=='nombreCliente')
                    {
                        if(e.length>100){
                            this.statusnombre=null
                            console.log("tiene mas o 100");
                        }
                        else{
                            this.statusnombre=null
                        }
                    }

                    if(id=='empresa'||id=='empresaED')
                    {
                        if(e.length>100){
                            this.statusempresa=null
                        }
                        else{
                            this.statusempresa=null
                        }
                    }
                }
                else{
                    if(id=='nombreCliente')
                    {
                        this.statusnombre=false
                    }

                    if(id=='empresa')
                    {
                        this.statusempresa=false
                    }

                }
            }
            if(accion=='editar')
            {
                if(id=='nombreClienteED'){
                    if(this.ModalEdit.nombre.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.ModalEdit.nombre.length>100){
                            this.statusnombre=false
                        }
                        else{
                            this.statusnombre=null
                        }
                    }
                    else{
                        if(id=='nombreClienteED')
                        {
                            this.statusnombre=false
                        }
                    }
                }
                if(id=='direccionClienteED'){

                    if(this.ModalEdit.direccion.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        //console.log("coincide");
                        if(this.ModalEdit.direccion.length>=100){
                            this.statusdireccion=null
                        }
                        else{
                            this.statusdireccion=null
                        }
                    }
                    else{
                        this.statusdireccion=false
                    }
                }
                if(id=='empresaED'){
                    if(this.ModalEdit.empresa.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.ModalEdit.empresa.length>=100){
                            this.statusempresa=null
                        }
                        else{
                            this.statusempresa=null
                        }
                    }
                    else{
                        if(id=='empresaED')
                        {
                            this.statusempresa=false
                        }
                    }
                }

            }


        },
        ValidarTelefono(id,action){
            //console.log("entro a validar tel");
            if(action=='nuevo')
            {
                if(id=='nitEmpresa'){
                var a = document.getElementById(id).value;
                var vacio=''
                //var x=check.which;
                //var x = a.charCode;
                var x = a.keyCode;
                if (!(a >= 48 || a <= 57)) {
                    swal("Oops...", "Solo deben ser numeros !", "error");
                    this.statusnit=false
                    return document.getElementById(id).value = ""
                } else if (a.length > 20) {
                    // if no is more then the value
                    swal("Oops...", "Maximo 20 digitos!", "error");
                    this.statusnit=null
                    return (document.getElementById(id).value = "");
                }
                else{
                        this.statusnit=null
                    }
                }
                else{
                    this.statusnit=null
                }
                if(id=='telefono'){
                    //console.log("telefono");
                    var a = document.getElementById(id).value;
                    var vacio=''
                    //var x=check.which;
                    //var x = a.charCode;
                    var x = a.keyCode;
                    if (!(a >= 48 || a <= 57)) {
                        swal("Oops...", "Solo deben ser numeros !", "error");
                        this.statustelefono=false
                        return document.getElementById("telefono").value = ""
                    } else if (a.length >= 20) {
                        // if no is more then the value
                        swal("Oops...", "Maximo 20 digitos!", "error");
                        this.statustelefono=null
                        return (document.getElementById("telefono").value = "");
                    }
                    else{
                        this.statustelefono=null
                    }
                }
                else{
                    this.statustelefono=null
                }
            }
            if(action=='editar')
            {
                if(id=='nitEmpresaED'){
                var a = this.ModalEdit.nit;
                var vacio=''
                //var x=check.which;
                //var x = a.charCode;
                var x = a.keyCode;
                if (!(a >= 48 || a <= 57)) {
                    swal("Oops...", "Solo deben ser numeros !", "error");
                    this.statusnit=false
                    return document.getElementById(id).value = ""
                } else if (a.length >= 20) {
                    // if no is more then the value
                    swal("Oops...", "Maximo 20 digitos!", "error");
                    this.statusnit=null
                    return (document.getElementById(id).value = "");
                }
                else{
                        this.statusnit=null
                    }
                }
                else{
                    this.statusnit=null
                }
                if(id=='telefonoED'){
                    //console.log("telefono");
                    var a = this.ModalEdit.telefono
                    var vacio=''
                    //var x=check.which;
                    //var x = a.charCode;
                    var x = a.keyCode;
                    if (!(a >= 48 || a <= 57)) {
                        swal("Oops...", "Solo deben ser numeros !", "error");
                        this.statustelefono=false
                        return document.getElementById("telefono").value = ""
                    } else if (a.length >= 20) {
                        // if no is more then the value
                        swal("Oops...", "Maximo 20 digitos!", "error");
                        this.statustelefono=null
                        return (document.getElementById("telefono").value = "");
                    }
                    else{
                        this.statustelefono=null
                    }
                }
                else{
                    this.statustelefono=null
                }
            }


        },
        refrescarClientes(){
           var test2 = localStorage.getItem("storedData");
            var test =JSON.parse(test2);
            var id_cliente
            id_cliente='null'
            this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico._id+'/'+id_cliente)
                    .then((response) => {
                        ////console.log(response);
                        this.ClientesTabla=response.data
                    })
        },
        actualizarCliente(){
            //console.log("entro a actualizar cliente");
            if(this.ModalEdit.nombre==''||
                this.ModalEdit.direccion==''||
                this.ModalEdit.nit==''||
                this.ModalEdit.telefono==''||
                this.ModalEdit.empresa==''||
                this.ModalEdit.correo==''){
                    if(this.ModalEdit.nombre==''){
                        this.statusnombre=false
                    }
                    if(this.ModalEdit.direccion==''){
                        this.statusdireccion=false
                    }
                    if(this.ModalEdit.nit==''){
                        this.statusnit=false
                    }
                    if( this.ModalEdit.telefono==''){
                        this.statustelefono=false
                    }
                    if(this.ModalEdit.empresa==''){
                        this.statusempresa=false
                    }
                    if(this.ModalEdit.correo==''){
                        this.statusCorreo=false
                    }
                    swal(
                    'Error!',
                    'Para Actualizar deben estar completos todos los campos',
                    'error'
                    )
            }
            if(this.statusnombre==false||
            this.statusdireccion==false||
            this.statusnit==false||
            this.statustelefono==false||
            this.statusempresa==false||
            this.statusCorreo==false){
                //console.log("alguno no cumple formato");
                 swal(
                    'Error!',
                    'Para Actualizar debe cumplirse el formato establecido',
                    'error'
                    )
            }
            else
            {
                var objeto ={
                nombre:this.ModalEdit.nombre,
                direccion:this.ModalEdit.direccion,
                nit:this.ModalEdit.nit,
                telefono:this.ModalEdit.telefono,
                empresa:this.ModalEdit.empresa,
                correo:this.ModalEdit.correo
                }
                this.axios.post(urlservicios+"ActulizarCliente/"+this.ModalEdit._id,objeto)
                    .then((response) => {

                        //console.log(response);

                        if(response.data.validar==true)
                        {
                            swal({
                            title: 'Actualizado Exitosamente',
                            timer: 1500,
                            type:'success'})
                            this.ClientesTabla.splice(this.indice, 1);
                            this.ClientesTabla.splice(this.indice, 0, objeto);
                            this.$refs.modalEditar.hide()

                        }else{
                            swal({
                            title: 'No se pudo actualizar',
                            timer: 1000,
                            type:'error'})
                        }

                    })
            }
            ////console.log(this.ModalEdit);


        },
        validacorreo(value){
            //console.log(value);
           if(value.length==0){
               return(this.statusCorreo=false)
           }
           //if(value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i))
           if (value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
            {
                return (this.statusCorreo=null)
            }
                return (this.statusCorreo=false)


        },
        adicionarCliente(){
            var bandera=true
            if(this.ModalNew.nombre==''||this.statusnombre==false){
                this.statusnombre=false
                bandera=false
            }
            else{
                this.statusnombre=null

            }
            if(this.ModalNew.direccion==''||this.statusdireccion==false){
                this.statusdireccion=false
                bandera=false
            }
            else{
                this.statusdireccion=null
            }
            if(this.ModalNew.empresa==''||this.statusempresa==false){
                this.statusempresa=false
                bandera=false
            }
            else{
                this.statusempresa=null
            }
            if(this.ModalNew.nit==''||this.statusnit==false){
                this.statusnit=false
                bandera=false
            }
            else{
                this.statusnit=null
            }
            if(this.ModalNew.telefono==''||this.statustelefono==false){
                this.statustelefono=false
                bandera=false
            }
            else{
                this.statustelefono=null
            }
            if(this.ModalNew.correo==''||this.statusCorreo==false){
                this.statusCorreo=false
                bandera=false
            }
            if(bandera==false){
                swal(
                'Upps!',
                'Algun campo no cumple con las caracteristicas establecidas',
                'error'
                )
            }
            else{
                //console.log("hacemos peticion");
                var test2 = localStorage.getItem("storedData");
                var test =JSON.parse(test2);
                var objeto={
                    nombre:this.ModalNew.nombre,
                    correo:this.ModalNew.correo,
                    empresa:this.ModalNew.empresa,
                    direccion:this.ModalNew.direccion,
                    telefono:this.ModalNew.telefono,
                    nit:this.ModalNew.nit,
                    id_OperadorLogistico:test.id_OperadorLogistico._id

                }
                //console.log(objeto);
                this.axios.post(urlservicios+"GuardarCliente", objeto)
                        .then(response => {
                            //console.log(response);
                            if(response.data.creado==true)
                            {
                                this.ClientesTabla.push(response.data.orden)
                                swal(
                                'Creado Correctamente!',
                                'Cliente Creado Correctamente',
                                'success'
                                )
                                this.cerrarModal()
                                //this.$refs.modalNuevo.hide()

                            }
                            else
                            {
                                swal(
                                'Upps!',
                                'Ya existe un cliente con esas caracteristicas , revise el correo',
                                'error'
                                )
                            }
                        })



            }
        },
        ClienteNuevo(){
            this.ModalNew.nombre=this.Cliente
            this.$refs.modalNuevo.show()
        },
        cerrarModal(){
            //console.log("entro a cerra");
            this.Cliente=''
            this.statusnombre=null,
            this.statusdireccion=null,
            this.statusempresa=null,
            this.statusnit=null,
            this.statusCorreo= null,
            this.statustelefono=null
            this.ModalNew.nombre=''
            this.ModalNew.direccion=''
            this.ModalNew.telefono=''
            this.ModalNew.empresa=''
            this.ModalNew.nit=''
            this.ModalNew.correo=''

            this.$refs.modalEditar.hide()
            this.$refs.modalNuevo.hide()

        },
        editar(value){
            ////console.log("entro a editar");
            //console.log(value);
            this.indice=value.index
            this.ModalEdit=Object.assign({},value.item)
            this.$refs.modalEditar.show()
        }
    },
    created: function(){
        var test2 = localStorage.getItem("storedData");
        var test =JSON.parse(test2);
        var id_cliente
        id_cliente='null'

        this.axios.get(urlservicios+"clientesOperador/"+test.id_OperadorLogistico._id+'/'+id_cliente)
                .then((response) => {
                    //console.log(response);
                    this.ClientesTabla=response.data
                })
    }

}
</script>

<style>

</style>
