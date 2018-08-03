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
              <h3 slot="header" class="mb-0 encabezado">Usuarios</h3>
                <b-card-body>
                    <b-row>
                        <b-col md="2" offset-md="10">
                          <div class="float-right mb-3">
                            <b-btn variant="outline-success" @click="UsuarioNuevo()">
                              <i class="fa fa-plus"></i>
                            </b-btn>
                            <b-btn variant="outline-success" @click="refrescarUsuarios()">
                              <i class="fa fa-refresh"></i>
                            </b-btn>
                          </div>
                        </b-col>
                    </b-row>

                    <b-form-group id="fieldsetHorizontal"
                                    horizontal
                                    :label-cols="4"
                                    breakpoint="md"
                                    description="Filtrara del listado de usuarios existentes"
                                    label="Buscar Usuario "
                                    label-for="inputHorizontal">
                        <b-form-input   id="inputHorizontal"
                                        v-model="usuario"
                                        placeholder="Nombre del Usuario"

                                        ></b-form-input>
                    </b-form-group>

                   
                </b-card-body>
               
            </b-card>
            <b-card class="border mt-2" no-body header="Primary" header-bg-variant="primary">
                <h3 slot="header" class="mb-0 encabezado">Usuarios</h3>
                    <b-card-body>
                        <b-table responsive fixed :items="UsuariosTabla" :fields="fields"
                            :current-page="currentPage" :per-page="10" ref="table" 
                             :filter="usuario"
                            class="my-2">
                                <template slot="editar" slot-scope="data">
                                    <i class="btn btn-success fa fa-pencil" @click="EditarUsuario(data)"></i>
                                </template>
                                <template slot="nombre" slot-scope="data">
                                    {{data.item.nombre}} {{data.item.apellido}}
                                </template>
                                
                                <template slot="tipo" slot-scope="data">
                                    {{data.item.tipo}}
                                </template>
                                <template slot="numero_identificacion" slot-scope="data">
                                    {{data.item.numero_identificacion}}
                                </template>
                                <template slot="correo" slot-scope="data">
                                    {{data.item.correo}}
                                </template>
                                 <template slot="password" slot-scope="data">
                                   <i class="btn btn-success fa fa-key" @click="cambioPassword(data)"></i>
                                </template>
                                 <template slot="inactivar" slot-scope="data">
                                    <i class="btn btn-success fa fa-lock" v-show="data.item.estado==0"  @click="Inactivar(data)"></i>
                                    <i class="btn btn-danger fa fa-unlock" v-show="data.item.estado==1"  @click="Inactivar(data)"></i>
                                </template>     
                                <template slot="estado" slot-scope="data">
                                    <p v-if="data.item.estado==0"> Activo</p>
                                    <p v-else>Inactivo</p>
                                </template>         
                                estado                   
                        </b-table>
                        <b-pagination size="md" :total-rows="UsuariosTabla.length" v-model="currentPage" :per-page="10">
                        </b-pagination>
                    </b-card-body>
            </b-card>
        </b-container>

        <!-- Modal Create Component -->
        <b-modal id="modal1" ref="Crear" size="lg" no-close-on-backdrop
         no-close-on-esc >
            <div slot="modal-header"
                class="w-100">
                <b-btn class="rounded text-white"
                    variant="danger"
                    @click="hideModal">
                    <i class="fa fa-times-circle"
                        aria-hidden="true"></i>&#32;Cancelar
                </b-btn>
                <b-btn
                        class="rounded float-right text-white"
                        variant="warning"
                        v-on:click="guardar()">
                        <i class="fa fa-floppy-o"></i>&#32;Guardar
                </b-btn>
            </div>
            <div slot="modal-footer"
            class="w-100">
            </div>
                <b-container fluid>
                    <b-row class="mb-1">
                        <b-col>
                            <v-select v-model="tipoUsu" placeholder="Seleccione el tipo de usuario a crear"  label="nombre" :options="optionsRoles" @input="tipoUsuario()"></v-select>
                        </b-col>
                    </b-row>
                    
                    <b-row class="w-100" v-show="admin">
                        <b-col>
                            <b-card  class="w-100">
                                <b-form-group horizontal
                                                breakpoint="lg"
                                                label="Administrador"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                label="Nombre :"
                                                label-class="text-sm-right"
                                                label-for="nombre1">
                                    <b-form-input id="nombre1" v-model="usu.nombre" 
                                       @input="ValidarTexto('nombre1','nuevo')"
                                       maxlength="50"
                                       :state="estadonombre"    ></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Apellido :"
                                                label-class="text-sm-right"
                                                label-for="apellido1"
                                                >
                                    <b-form-input id="apellido1" v-model="usu.apellido"
                                        @input="ValidarTexto('apellido1','nuevo')"
                                       maxlength="50"
                                       :state="estadoapellido"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Contraseña :"
                                                label-class="text-sm-right"
                                                label-for="password1">

                                      <password :toggle	="true" id="password1"
                                      :secureLength=9 v-model="password"/>
                                    </b-form-group>
                                     <b-form-group horizontal
                                                label="Correo:"
                                                label-class="text-sm-right"
                                                label-for="email1">
                                    <b-form-input id="email1" v-model="usu.correo"
                                         @input="validacorreoT" :state="estadoT"
                                        ></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Numero de Identificación:"
                                                label-class="text-sm-right"
                                                label-for="numIdent1">
                                    <b-form-input id="numIdent1"
                                    :state="estadoNumeroIden" v-model="usu.numero_identificacion" @keyup.native="numeros(this,'numIdent2')" ></b-form-input>
                                    </b-form-group>

                                </b-form-group>
                            </b-card>
                        </b-col>
                    </b-row>
                    
                    <b-row class="w-100" v-show="cliente">
                        <b-col>
                            <b-card class="w-100">
                                <b-form-group horizontal
                                                :label-cols="1"
                                                label="Cliente"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                label="Nombre :"
                                                label-class="text-sm-right"
                                                label-for="nombre2">
                                    <b-form-input id="nombre2" v-model="usu.nombre" 
                                       @input="ValidarTexto('nombre2','nuevo')"
                                       maxlength="50"
                                       :state="estadonombre"    ></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Apellido :"
                                                label-class="text-sm-right"
                                                label-for="apellido2"
                                                >
                                    <b-form-input id="apellido2" v-model="usu.apellido"
                                        @input="ValidarTexto('apellido2','nuevo')"
                                       maxlength="50"
                                       :state="estadoapellido"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Contraseña :"
                                                label-class="text-sm-right"
                                                label-for="password">

                                      <password :toggle	="true" id="password" 
                                      :secureLength=9 v-model="password"/>
                                    </b-form-group>
                                     <b-form-group horizontal
                                                label="Correo:"
                                                label-class="text-sm-right"
                                                label-for="email2">
                                    <b-form-input id="email2" v-model="usu.correo"
                                         @input="validacorreoT" :state="estadoT"
                                        ></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Numero de Identificación:"
                                                label-class="text-sm-right"
                                                label-for="numIdent2">
                                    <b-form-input id="numIdent2"
                                    :state="estadoNumeroIden" v-model="usu.numero_identificacion" @keyup.native="numeros(this,'numIdent2')" ></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Cliente :"
                                                label-class="text-sm-right"
                                                label-for="MedioT">
                                        <v-select id="MedioT" v-model="VM_clientes" placeholder="Seleccione el tipo de usuario a crear"  label="nombre" :options="optionsClientes"></v-select>
                                    </b-form-group>
                                   
                                </b-form-group>
                            </b-card>
                        </b-col>                  
                    </b-row>
                    <b-row class="w-100" v-show="courier">
                        <b-col>
                            <b-card  class="w-100">
                                <b-form-group horizontal
                                                breakpoint="lg"
                                                label="Courier"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                label="Nombre :"
                                                label-class="text-sm-right"
                                                label-for="nombre3">
                                    <b-form-input id="nombre3" v-model="usu.nombre" 
                                       @input="ValidarTexto('nombre3','nuevo')"
                                       maxlength="50"
                                       :state="estadonombre"    ></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Apellido :"
                                                label-class="text-sm-right"
                                                label-for="apellido3"
                                                >
                                    <b-form-input id="apellido3" v-model="usu.apellido"
                                        @input="ValidarTexto('apellido3','nuevo')"
                                       maxlength="50"
                                       :state="estadoapellido"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Contraseña :"
                                                label-class="text-sm-right"
                                                label-for="password2">

                                      <password id="password2" :toggle="true" 
                                      :secureLength=9 v-model="password"/>
                                    </b-form-group>
                                     <b-form-group horizontal
                                                label="Correo:"
                                                label-class="text-sm-right"
                                                label-for="email3">
                                    <b-form-input id="email3" v-model="usu.correo"
                                         @input="validacorreoT" :state="estadoT"
                                        ></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Numero de Identificación:"
                                                label-class="text-sm-right"
                                                label-for="numIdent3">
                                    <b-form-input id="numIdent3"
                                    :state="estadoNumeroIden" v-model="usu.numero_identificacion" @keyup.native="numeros(this,'numIdent3')" ></b-form-input>
                                    </b-form-group>
                                    <!--
                                    <b-form-group horizontal
                                                label="Medio de Transporte:"
                                                label-class="text-sm-right"
                                                label-for="MedioT">
                                        <v-select id="MedioT" v-model="VM_medios" placeholder="Seleccione el tipo de usuario a crear"  
                                        label="tipo" :options="optionsMedios"  @input="MedioSeleccionado()"></v-select>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Vehiculo :"
                                                label-class="text-sm-right"
                                                label-for="Vehiculo">
                                        <v-select id="Vehiculo" v-model="VM_vehiculos" placeholder="Seleccione el tipo de usuario a crear" 
                                             label="nombre" :options="optionsVehiculos"  :disabled="disabled_vehiculo"  ></v-select>
                                    </b-form-group>
                                    -->
                                </b-form-group>
                            </b-card>
                        </b-col>
                        
                    </b-row>
                </b-container>
        </b-modal>
         <!-- Modal Edit Component -->
         
        <b-modal id="modal2" ref="Editar" size="lg" no-close-on-backdrop
         no-close-on-esc >
            <div slot="modal-header"  class="w-100">
                
                <b-btn class="rounded text-white"
                    variant="danger"
                    @click="hideModal">
                    <i class="fa fa-times-circle"
                        aria-hidden="true"></i>&#32;Cancelar
                </b-btn>
                <b-btn
                        class="rounded float-right text-white"
                        variant="warning"
                        v-on:click="ActualizarUsuario()">
                        <i class="fa fa-floppy-o"></i>&#32;Guardar
                </b-btn>
            </div>
            <div slot="modal-footer"
            class="w-100">
            </div>
                <b-container fluid>
                    <b-row class="mb-1">
                        <b-col>
                            <v-select v-model="usuEditar.tipo" placeholder="Seleccione el tipo de usuario a editar"  label="nombre" :options="optionsRoles" @input="tipoUsuarioEditar()"
                                :disabled="true"></v-select>
                        </b-col>
                    </b-row>
                    <b-row class="w-100" v-show="admin">
                        <b-col>
                            <b-card  class="w-100">
                                <b-form-group horizontal
                                                breakpoint="lg"
                                                label="Administrador"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                label="Nombre:"
                                                label-class="text-sm-right"
                                                label-for="nombreED1">
                                    <b-form-input id="nombreED1"
                                        v-model="usuEditar.nombre" 
                                        @input="ValidarTexto('nombreED1','Editar')"
                                       maxlength="50"
                                       :state="estadonombre"   ></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Apellido:"
                                                label-class="text-sm-right"
                                                label-for="apellidoED1">
                                    <b-form-input id="apellidoED1"
                                    v-model="usuEditar.apellido"
                                     @input="ValidarTexto('apellidoED1','Editar')"
                                       maxlength="50"
                                       :state="estadoapellido"></b-form-input>
                                    </b-form-group>
                                     <b-form-group horizontal
                                                label="Correo :"
                                                label-class="text-sm-right"
                                                label-for="correoED1">
                                    
                                    <b-form-input id="correoED1" v-model="usuEditar.correo"
                                         @input="validacorreoT" :state="estadoT"
                                        ></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Numero de Identificación:"
                                                label-class="text-sm-right"
                                                label-for="numidentidadED">
                                    <b-form-input id="numidentidadED" v-model="usuEditar.numero_identificacion"
                                    :state="estadoNumeroIden"  @keyup.native="numeros(this,'numidentidadED')" ></b-form-input>
                                    </b-form-group>

                                </b-form-group>
                            </b-card>
                        </b-col>
                    </b-row>
                    <b-row class="w-100" v-show="cliente">
                        <b-col>
                            <b-card class="w-100">
                                <b-form-group horizontal
                                                :label-cols="1"
                                                label="Cliente"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                   <b-form-group horizontal
                                                label="Nombre :"
                                                label-class="text-sm-right"
                                                label-for="nombreED2">
                                    <b-form-input id="nombreED2"
                                        v-model="usuEditar.nombre"
                                         @input="ValidarTexto('nombreED2','Editar')"
                                       maxlength="50"
                                       :state="estadonombre"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Apellido :"
                                                label-class="text-sm-right"
                                                label-for="apellidoED2">
                                    <b-form-input id="apellidoED2" 
                                     v-model="usuEditar.apellido"
                                       @input="ValidarTexto('apellidoED2','Editar')"
                                       maxlength="50"
                                       :state="estadonombre"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Correo :"
                                                label-class="text-sm-right"
                                                label-for="correoED2">
                                    <b-form-input id="correoED2"
                                    v-model="usuEditar.correo"
                                      @input="validacorreoT" :state="estadoT" ></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Numero de Identificación:"
                                                label-class="text-sm-right"
                                                label-for="numidentED2">
                                    <b-form-input id="numidentED2"
                                     v-model="usuEditar.numero_identificacion" 
                                     :state="estadoNumeroIden"  @keyup.native="numeros(this,'numidentED2')"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Cliente :"
                                                label-class="text-sm-right"
                                                label-for="MedioT">
                                        <v-select id="MedioT" v-model="usuEditar.id_cliente" placeholder="Seleccione el tipo de usuario a crear"  label="nombre" :options="optionsClientes"
                                           ></v-select>
                                    </b-form-group>
                                   
                                </b-form-group>
                            </b-card>
                        </b-col>
                        
                    </b-row>
                    <b-row class="w-100" v-show="courier">
                        <b-col>
                            <b-card  class="w-100">
                                <b-form-group horizontal
                                                breakpoint="lg"
                                                label="Courier"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                label="Nombre :"
                                                label-class="text-sm-right"
                                                label-for="nombreED3">
                                    <b-form-input id="nombreED3"
                                        v-model="usuEditar.nombre"
                                         @input="ValidarTexto('nombreED3','Editar')"
                                       maxlength="50"
                                       :state="estadonombre" ></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Apellido :"
                                                label-class="text-sm-right"
                                                label-for="apellidoED3">
                                    <b-form-input id="apellidoED3" 
                                     v-model="usuEditar.apellido"
                                       @input="ValidarTexto('apellidoED3','Editar')"
                                       maxlength="50"
                                       :state="estadoapellido"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Correo :"
                                                label-class="text-sm-right"
                                                label-for="correoED3">
                                    <b-form-input id="correoED3"
                                    v-model="usuEditar.correo"
                                         @input="validacorreoT" :state="estadoT"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Numero de Identificación:"
                                                label-class="text-sm-right"
                                                label-for="numidentED3">
                                    <b-form-input id="numidentED3"
                                     v-model="usuEditar.numero_identificacion"
                                      :state="estadoNumeroIden"  @keyup.native="numeros(this,'numidentED3')" ></b-form-input>
                                    </b-form-group>
                                    <!--
                                    <b-form-group horizontal
                                                label="Medio de Transporte:"
                                                label-class="text-sm-right"
                                                label-for="MedioT">

                                        <v-select id="MedioT" v-model="usuEditar.id_transporte" placeholder="Seleccione el tipo de usuario a crear"  
                                        label="tipo" :options="optionsMedios"></v-select>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                label="Vehiculo :"
                                                label-class="text-sm-right"
                                                label-for="Vehiculo">
                                        <v-select id="Vehiculo" v-model="usuEditar.vehiculo" placeholder="Seleccione el tipo de usuario a crear"  label="nombre" :options="optionsVehiculos"></v-select>
                                    </b-form-group>
                                    -->
                                </b-form-group>
                            </b-card>
                        </b-col>
                        
                    </b-row>
                </b-container>
        </b-modal>
         <!-- Modal Password Component -->
         
        <b-modal id="modal3" ref="modalpassword" size="lg" no-close-on-backdrop
         no-close-on-esc >
            <div slot="modal-header"  class="w-100">
                
                <b-btn class="rounded text-white"
                    variant="danger"
                    @click="hideModal">
                    <i class="fa fa-times-circle"
                        aria-hidden="true"></i>&#32;Cancelar
                </b-btn>
                <b-btn
                        class="rounded float-right text-white"
                        variant="warning"
                        v-on:click="ActualizarPassword()">
                        <i class="fa fa-floppy-o"></i>&#32;Guardar
                </b-btn>
            </div>
            <div slot="modal-footer"
            class="w-100">
            </div>
                <b-container fluid>
                    <b-row class="w-100" >
                        <b-col>
                            <b-card  class="w-100">
                                <b-form-group horizontal
                                                breakpoint="lg"
                                                label="Courier"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                    label="Contraseña :"
                                                    label-class="text-sm-right"
                                                    label-for="changepass">

                                        <password id="changepass" :toggle="true" 
                                        :secureLength=9 v-model="password"/>
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-container>
        </b-modal>
        
    </b-container>
</template>

<script>
  import Password from 'vue-password-strength-meter'
import   {bus} from "../main";
import {urlservicios} from '../main'

export default {
    components: { Password },
    data () {

    return {
              password: null,

        //Estados
        estadoNumeroIden:null,
        estadoT:null,
        estadonombre:null,
        estadoapellido:null,
        //
        usuEditar:{},
        usu:{},
        tipoUsu:'',
        currentPage:1,
        usuario:'',
        items: [
        {
          text: "Inicio",
          to: "/inicio"
        },
        {
          text: "Configuración usuarios",
          to: "/inicio/configcliente",
          active: true
        }
      ],
       fields: [
            { key: 'editar', label: 'Editar', sortable: false },
            { key: 'nombre', label: 'Nombre Usuario', sortable: false },
            { key: 'tipo', label: 'Tipo de Usuario', sortable: true },
            { key: 'numero_identificacion', label: 'Documento Identificación', sortable: true },
            { key: 'correo', label: 'Correo Contacto', sortable: false },
            { key: 'password', label: 'Cambio Contraseña', sortable: false },
            { key: 'estado', label: 'Estado', sortable: false },
            { key: 'inactivar', label: 'Inactivar', sortable: false },

        ],
        optionsRoles:[],
        optionsMedios:[],
        optionsClientes:[],
        optionsVehiculos:[],
        VM_clientes:'',
        VM_medios:'',
        VM_vehiculos:'',
      UsuariosTabla:[],
        indice:null,
        admin:'',
        cliente:'',
        courier:'',
        disabled_vehiculo:true,
        UsuarioCambioPasswd:''
    }
    },
    methods:{
        ActualizarPassword(){
            var load = true;
            setTimeout(() => {
                bus.$emit("load", {
                    load
                });
            });  
            var update={
                password:this.password
            }
            this.axios.post(urlservicios+"updateUser/"+this.UsuarioCambioPasswd._id, update)
                    .then(response =>{
                        if(response.data.estado){
                            swal(
                            "",
                            response.data.message,
                            "success"
                            );
                            this.hideModal()
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });  
                        }
                        else{
                            swal(
                            "",
                            response.data.message,
                            "success"
                            );
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });  
                        }
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
        },
        cambioPassword(data){
            this.UsuarioCambioPasswd=data.item
            this.$refs.modalpassword.show()
  
        },
        ClienteED(){
        },
        ActualizarUsuario(){
            if(this.usuEditar.tipo=="administrador"){
                if(this.estadoNumeroIden==false||this.estadoT==false||this.estadonombre==false||this.estadoapellido==false){
                    swal(
                    "Por favor complete correctamente los campos e intente nuevamente",
                    "",
                    "warning"
                    );
                }
                else{
                    var EditUser={
                        nombre: this.usuEditar.nombre,
                        apellido:this.usuEditar.apellido,
                        numero_identificacion:this.usuEditar.numero_identificacion,
                        correo:this.usuEditar.correo,
                    }
                    var load = true;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                    this.axios.post(urlservicios+"/updateUser/"+this.usuEditar._id, EditUser)
                    .then(response =>{

                        if(response.data.estado){
                            this.refrescarUsuarios()
                            swal(
                            "",
                            response.data.message,
                            "success"
                            );
                            this.hideModal()
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        }else{
                            swal(
                            
                            response.data.message,
                            response.data.causa.message,
                            "warning"
                            );  
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
            if(this.usuEditar.tipo=="cliente"){
                if(this.estadoNumeroIden==false||this.estadoT==false||this.estadonombre==false||this.estadoapellido==false){
                    swal(
                    "Por favor complete correctamente los campos e intente nuevamente",
                    "",
                    "warning"
                    );
                }
                else{
                    var EditUser={
                        nombre: this.usuEditar.nombre,
                        apellido:this.usuEditar.apellido,
                        numero_identificacion:this.usuEditar.numero_identificacion,
                        correo:this.usuEditar.correo,
                        id_cliente:this.usuEditar._id
                    }
                    this.axios.post(urlservicios+"/updateUser/"+this.usuEditar._id, EditUser)
                    .then(response =>{
                        console.log(response);
                        if(response.data.estado){
                            this.refrescarUsuarios()
                            swal(
                            response.data.message,
                            "",
                            "success"
                            );
                            this.hideModal()
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        }else{
                            swal(
                            response.data.message,
                            response.data.causa.message,
                            "warning"
                            );  
                        }
                        var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                                load
                            });
                        });
                        this.refrescarUsuarios()
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
            if(this.usuEditar.tipo=="courier"){
                if(this.estadoNumeroIden==false||this.estadoT==false||this.estadonombre==false||this.estadoapellido==false){
                    swal(
                    "Por favor complete correctamente los campos e intente nuevamente",
                    "",
                    "warning"
                    );
                }
                else{
                    var EditUser={
                        nombre: this.usuEditar.nombre,
                        apellido:this.usuEditar.apellido,
                        numero_identificacion:this.usuEditar.numero_identificacion,
                        correo:this.usuEditar.correo,
                    }
                    this.axios.post(urlservicios+"/updateUser/"+this.usuEditar._id, EditUser)
                    .then(response =>{
                        if(response.data.estado){
                            this.refrescarUsuarios()
                            swal(
                            "",
                            response.data.message,
                            "success"
                            );
                            this.hideModal()
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        }else{
                            swal(
                            response.data.message,
                            response.data.causa.message,
                            "warning"
                            );  
                        }
                        var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                                load
                            });
                        });
                        this.refrescarUsuarios()
                        console.log(response);
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
        Inactivar(value){
             var test2 = localStorage.getItem("storedData");
            var test =JSON.parse(test2);
            var cliente =value.item
            var estado
            //"/InactivarUsuario/:id_usuario",
            var load = true;
            setTimeout(() => {
                bus.$emit("load", {
                    load
                });
            });        
            if(cliente.estado==1){
                estado=0
            }
            else{
                estado=1
            }

            this.axios.get(urlservicios+"InactivarUsuario/"+cliente._id+"/"+estado)
                .then((response) => {
                    console.log(response);
                    if(response.data.estado){
                        swal(
                            "",
                            response.data.message,
                            "success"
                        );
                        this.refrescarUsuarios()
                        this.$refs.table.refresh();
                    }
                    else{
                        swal(
                            "",
                            response.data.message,
                            "success"
                        );
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
                
        },
        guardar(){
            var load = true;
            setTimeout(() => {
                bus.$emit("load", {
                    load
                });
            });
            var test2 = localStorage.getItem("storedData");
            var test =JSON.parse(test2);
            if(this.tipoUsu.nombre=='courier'){
                var llaves=Object.keys(this.usu)
                if(llaves.length==0){
                    this.estadoNumeroIden=false,
                    this.estadoT=false,
                    this.estadonombre=false,
                    this.estadoapellido=false
                    swal(
                    "Por favor complete correctamente los campos e intente nuevamente",
                    "",
                    "warning"
                    );
                }
                else{
                    console.log(this.password.length);
                    if(this.estadoNumeroIden==false||this.estadoT==false||this.estadonombre==false||this.estadoapellido==false||
                    this.VM_medios||this.VM_vehiculos||this.password.length<9){
                        if(this.VM_medios==''){
                            swal(
                            "Por favor seleccione el medio de transporte",
                            "",
                            "warning"
                            );
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        }
                        if(this.VM_vehiculos==''){
                            swal(
                            "Por favor seleccione el vehiculo",
                            "",
                            "warning"
                            );
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        }
                        if(this.password.length<9){
                            swal(
                            "",
                            "La contraseña debe tener minimo 9 caracteres   ",
                            "warning"
                            );  
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        }
                        else{
                            swal(
                            "Por favor complete correctamente los campos e intente nuevamente",
                            "",
                            "warning"
                            );
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        }
                        
                    }
                    else{
                        var newUser={
                            id_OperadorLogistico:test.id_OperadorLogistico._id,
                            nombre: this.usu.nombre,
                            apellido:this.usu.apellido,
                            numero_identificacion:this.usu.numero_identificacion,
                            tipo:this.tipoUsu.nombre,
                            id_rol:this.tipoUsu._id,
                            correo:this.usu.correo,
                            password: this.password,
                            //id_vehiculo:this.VM_vehiculos._id,
                            //id_transporte:this.VM_medios._id
                        }
                       
                        this.axios.post(urlservicios+"/GuardarUsuario/", newUser)
                        .then(response =>{
                            if(response.data.estado){
                            swal(
                            "",
                            response.data.message,
                            "success"
                            );
                            this.hideModal()
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });  
                        }
                        else{
                            swal(
                            response.data.message,
                            response.data.causa.message,
                            "warning"
                            );
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });  
                        }
                        })
                         .catch(function (error) {
                             console.log(error);
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
                
            }
            if(this.tipoUsu.nombre=='cliente'){
                 var llaves=Object.keys(this.usu)
                if(llaves.length==0){
                    this.estadoNumeroIden=false,
                    this.estadoT=false,
                    this.estadonombre=false,
                    this.estadoapellido=false
                    swal(
                    "Por favor complete correctamente los campos e intente nuevamente",
                    "",
                    "warning"
                    );
                }
                else{
                    if(this.estadoNumeroIden==false||this.estadoT==false||this.estadonombre==false||this.estadoapellido==false||this.VM_clientes==''||
                     this.password.length<9){
                          if(this.password.length<9){
                            swal(
                            "",
                            "La contraseña debe tener minimo 9 caracteres   ",
                            "warning"
                            );  
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        }
                        if(this.VM_clientes==''){
                            swal(
                            "Por favor complete el campo cliente",
                            "",
                            "warning"
                            );
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        }else{
                            swal(
                            "Por favor complete correctamente los campos e intente nuevamente",
                            "",
                            "warning"
                            );
                            var load = false;
                                setTimeout(() => {
                                    bus.$emit("load", {
                                        load
                                    });
                                });
                        }
                        
                    }
                    else{
                        var newUser={
                            id_OperadorLogistico:test.id_OperadorLogistico._id,
                            nombre: this.usu.nombre,
                            apellido:this.usu.apellido,
                            numero_identificacion:this.usu.numero_identificacion,
                            tipo:this.tipoUsu.nombre,
                            id_rol:this.tipoUsu._id,
                            correo:this.usu.correo,
                            password: this.password,
                            id_cliente:this.VM_clientes._id
                        }
                        this.axios.post(urlservicios+"/GuardarUsuario/", newUser)
                        .then(response =>{
                           if(response.data.estado){
                            swal(
                            "",
                            response.data.message,
                            "success"
                            );
                            this.hideModal()
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });  
                        }
                        else{
                            swal(
                            response.data.message,
                            response.data.causa.message,
                            "warning"
                            );
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });  
                        }
                        })
                         .catch(function (error) {
                             console.log(error);
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

            }
            if(this.tipoUsu.nombre=='administrador'){
                var llaves=Object.keys(this.usu)
                if(llaves.length==0){
                    this.estadoNumeroIden=false,
                    this.estadoT=false,
                    this.estadonombre=false,
                    this.estadoapellido=false
                    swal(
                    "Por favor complete correctamente los campos e intente nuevamente",
                    "",
                    "warning"
                    );
                }
                else{
                    if(this.estadoNumeroIden==false||this.estadoT==false||this.estadonombre==false||this.estadoapellido==false||
                    this.password.length<9){
                         if(this.password.length<9){
                            swal(
                            "",
                            "La contraseña debe tener minimo 9 caracteres   ",
                            "warning"
                            );  
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        }
                        else{
                            swal(
                            "Por favor complete correctamente los campos e intente nuevamente",
                            "",
                            "warning"
                            );
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                        }
                        
                    }
                    else{
                        console.log();
                        var newUser={
                            id_OperadorLogistico:test.id_OperadorLogistico._id,
                            nombre: this.usu.nombre,
                            apellido:this.usu.apellido,
                            numero_identificacion:this.usu.numero_identificacion,
                            tipo:this.tipoUsu.nombre,
                            id_rol:this.tipoUsu._id,
                            correo:this.usu.correo,
                            password: this.password,
                        }
                            //this.hideModal()
                        this.axios.post(urlservicios+"GuardarUsuario/", newUser)
                        .then(response =>{
                            if(response.data.estado){
                            swal(
                            "",
                            response.data.message,
                            "success"
                            );
                            this.hideModal()
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });  
                        }
                        else{
                            console.log(response);
                            swal(
                            response.data.message,
                            response.data.causa.message,
                            "warning"
                            );
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });  
                        }
                        })
                        .catch(function (error) {
                            console.log(error);
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
            }
        },
        ValidarTexto(id,accion){
           
            var key,tecla,tecla_especial,letras,especiales
            var e = document.getElementById(eval('id')).value;

            if(accion=='nuevo')
            {
                if(id=='nombre3')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        if(e.length>=50){
                            this.estadonombre=null

                        }
                        else{
                            this.estadonombre=null
                        }
                    }
                    else{
                        this.estadonombre=false
                    }
                }
                
                if(id=='apellido3')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        if(e.length>=50){
                            this.estadoapellido=null

                        }
                        else{
                            this.estadoapellido=null
                        }
                    }
                    else{
                        this.estadoapellido=false
                    }
                }

                if(id=='nombre2')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        if(e.length>=50){
                            this.estadonombre=null

                        }
                        else{
                            this.estadonombre=null
                        }
                    }
                    else{
                        this.estadonombre=false
                    }
                }
                
                if(id=='apellido2')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        if(e.length>=50){
                            this.estadoapellido=null

                        }
                        else{
                            this.estadoapellido=null
                        }
                    }
                    else{
                        this.estadoapellido=false
                    }
                }

                 if(id=='nombre1')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        if(e.length>=50){
                            this.estadonombre=null

                        }
                        else{
                            this.estadonombre=null
                        }
                    }
                    else{
                        this.estadonombre=false
                    }
                }
                
                if(id=='apellido1')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        if(e.length>=50){
                            this.estadoapellido=null

                        }
                        else{
                            this.estadoapellido=null
                        }
                    }
                    else{
                        this.estadoapellido=false
                    }
                }

            }
            if(accion=='Editar')
            {
                if(id=='nombreED1'&&this.usuEditar.nombre){
                    if(this.usuEditar.nombre.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.usuEditar.nombre.length>100){
                            this.estadonombre=false
                        }
                        else{
                            this.estadonombre=null
                        }
                    }
                    else{
                        if(id=='nombreED1')
                        {
                            this.estadonombre=false
                        }
                    }
                }
                if(id=='apellidoED1'&&this.usuEditar.apellido){
                    if(this.usuEditar.apellido.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.usuEditar.apellido.length>100){
                            this.estadoapellido=false
                        }
                        else{
                            this.estadoapellido=null
                        }
                    }
                    else{
                        if(id=='apellidoED1')
                        {
                            this.estadoapellido=false
                        }
                    }
                }
                if(id=='nombreED2'&&this.usuEditar.nombre){
                    if(this.usuEditar.nombre.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.usuEditar.nombre.length>100){
                            this.estadonombre=false
                        }
                        else{
                            this.estadonombre=null
                        }
                    }
                    else{
                        if(id=='nombreED2')
                        {
                            this.estadonombre=false
                        }
                    }
                }
                if(id=='apellidoED2'&&this.usuEditar.apellido){
                    if(this.usuEditar.apellido.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.usuEditar.apellido.length>100){
                            this.estadoapellido=false
                        }
                        else{
                            this.estadoapellido=null
                        }
                    }
                    else{
                        if(id=='apellidoED2')
                        {
                            this.estadoapellido=false
                        }
                    }
                }
                if(id=='nombreED3'&&this.usuEditar.nombre){
                    if(this.usuEditar.nombre.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.usuEditar.nombre.length>100){
                            this.estadonombre=false
                        }
                        else{
                            this.estadonombre=null
                        }
                    }
                    else{
                        if(id=='nombreED3')
                        {
                            this.estadonombre=false
                        }
                    }
                }
                if(id=='nombreED3'&&this.usuEditar.apellido){
                    if(this.usuEditar.apellido.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.usuEditar.apellido.length>100){
                            this.estadoapellido=false
                        }
                        else{
                            this.estadoapellido=null
                        }
                    }
                    else{
                        if(id=='nombreED3')
                        {
                            this.estadoapellido=false
                        }
                    }
                }
                
                

            }


        },
        numeros(valor, id) {
        
            if(id=='numIdent1'){
                
                var a = document.getElementById("numIdent1").value;
                //var x=check.which;
                //var x = a.charCode;
                var x = a.keyCode;
                if (!(a >= 48 || a <= 57)) {
                    swal("Oops...", "Solo deben ser numeros !", "error");

                    this.estadoNumeroIden=false
                    return (document.getElementById("telefono").value );
                } else if (a.length >= 20) {
                    // if no is more then the value
                    swal("Oops...", "Maximo 10 digitos!", "error");
                    this.estadoNumeroIden=false
                    return (document.getElementById("numIdent1").value );
                }else
                {
                    this.estadoNumeroIden=null
                }
            }
            if(id=='numIdent3'){
                
                var a = document.getElementById("numIdent3").value;
                //var x=check.which;
                //var x = a.charCode;
                var x = a.keyCode;
                if (!(a >= 48 || a <= 57)) {
                    swal("Oops...", "Solo deben ser numeros !", "error");

                    this.estadoNumeroIden=false
                    return (document.getElementById("numIdent3").value );
                } else if (a.length >= 20) {
                    // if no is more then the value
                    swal("Oops...", "Maximo 10 digitos!", "error");
                    this.estadoNumeroIden=false
                    return (document.getElementById("numIdent3").value );
                }else
                {
                    this.estadoNumeroIden=null
                }
            }
            if(id=='numIdent2'){
                
                var a = document.getElementById("numIdent2").value;
                //var x=check.which;
                //var x = a.charCode;
                var x = a.keyCode;
                if (!(a >= 48 || a <= 57)) {
                    swal("Oops...", "Solo deben ser numeros !", "error");

                    this.estadoNumeroIden=false
                    return (document.getElementById("numIdent2").value );
                } else if (a.length >= 20) {
                    // if no is more then the value
                    swal("Oops...", "Maximo 10 digitos!", "error");
                    this.estadoNumeroIden=false
                    return (document.getElementById("numIdent2").value );
                }else
                {
                    this.estadoNumeroIden=null
                }
            }
            if(id=='numidentidadED'){
                
                var a = document.getElementById("numidentidadED").value;
                //var x=check.which;
                //var x = a.charCode;
                var x = a.keyCode;
                if (!(a >= 48 || a <= 57)) {
                    swal("Oops...", "Solo deben ser numeros !", "error");

                    this.estadoNumeroIden=false
                    return (document.getElementById("numidentidadED").value );
                } else if (a.length >= 20) {
                    // if no is more then the value
                    swal("Oops...", "Maximo 10 digitos!", "error");
                    this.estadoNumeroIden=false
                    return (document.getElementById("numidentidadED").value );
                }else
                {
                    this.estadoNumeroIden=null
                }
            }
            if(id=='numidentED2'){
                
                var a = document.getElementById("numidentED2").value;
                //var x=check.which;
                //var x = a.charCode;
                var x = a.keyCode;
                if (!(a >= 48 || a <= 57)) {
                    swal("Oops...", "Solo deben ser numeros !", "error");

                    this.estadoNumeroIden=false
                    return (document.getElementById("numidentED2").value );
                } else if (a.length >= 20) {
                    // if no is more then the value
                    swal("Oops...", "Maximo 10 digitos!", "error");
                    this.estadoNumeroIden=false
                    return (document.getElementById("numidentED2").value );
                }else
                {
                    this.estadoNumeroIden=null
                }
            }
            if(id=='numidentED3'){
                
                var a = document.getElementById("numidentED3").value;
                //var x=check.which;
                //var x = a.charCode;
                var x = a.keyCode;
                if (!(a >= 48 || a <= 57)) {
                    swal("Oops...", "Solo deben ser numeros !", "error");

                    this.estadoNumeroIden=false
                    return (document.getElementById("numidentED3").value );
                } else if (a.length >= 20) {
                    // if no is more then the value
                    swal("Oops...", "Maximo 10 digitos!", "error");
                    this.estadoNumeroIden=false
                    return (document.getElementById("numidentED3").value );
                }else
                {
                    this.estadoNumeroIden=null
                }
            }
        },
        validacorreoT(value){

            if(value){
                if(value.length==0){
               this.emailvalidoT=null
               return(this.estadoT=null)
                }
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
                    {
                        this.emailvalidoT=true
                        return (this.estadoT=null)
                    }
                        this.emailvalidoT=false
                        return (this.estadoT=false)
            }
            
        },
        MedioSeleccionado(){
            var test2 = localStorage.getItem("storedData");
            var test = JSON.parse(test2);
            if(this.VM_medios){
                this.disabled_vehiculo=false
                 this.axios.get(urlservicios+"getVehicles/" +test.id_OperadorLogistico._id +"/"+this.VM_medios._id)
                        .then(response =>{
                            this.optionsVehiculos=response.data
                            this.optionsVehiculos.forEach(element => {
                                element.nombre=element.placa+" - "+element.marca
                                
                            });
                        })
            }
            else{
                this.disabled_vehiculo=true
            }
        },
        tipoUsuarioEditar(){
            var test2 = localStorage.getItem("storedData");
            var test = JSON.parse(test2);
            if(this.usuEditar.tipo){
                if(this.usuEditar.tipo=='administrador'){
                    this.courier=false
                    this.admin=true
                    this.cliente=false
                }
                if(this.usuEditar.tipo=='cliente'){
                    this.courier=false
                    this.admin=false
                    this.cliente=true
                    this.axios.get(urlservicios+"clientesOperador/" +test.id_OperadorLogistico._id +"/null")
                        .then(response =>{
                            this.optionsClientes=response.data
                            this.optionsClientes.forEach(element => {
                                if(this.usuEditar.id_cliente==element._id){
                                    this.usuEditar.id_cliente=element.nombre
                                    this.usuEditar.id_cliente={}
                                    this.usuEditar.id_cliente=element
                                }
                            });
                        })
                     
                }
                if(this.usuEditar.tipo=='courier'){
                    this.courier=true
                    this.admin=false
                    this.cliente=false
                    this.axios.get(urlservicios+ "medios/")
                            .then(response => {
                                this.optionsMedios=response.data
                                this.optionsMedios.forEach(element => {
                                   
                                    if(this.usuEditar.id_transporte==element._id){
                                        this.usuEditar.id_transporte=element.tipo
                                        this.usuEditar.id_transporte={}
                                        this.usuEditar.id_transporte=element
                                    }
                                });
                            })
                    /*     
                    this.axios.get(urlservicios+"getVehicles/" +test.id_OperadorLogistico._id +"/"+this.usuEditar.id_transporte)
                        .then(response =>{
                            this.optionsVehiculos=response.data
                            this.optionsVehiculos.forEach(element => {
                                element.nombre=element.placa+" - "+element.marca
                                
                            });
                        })
                    */
                    this.axios.get(urlservicios+ "getVehicleUser/"+this.usuEditar._id)
                            .then(response => {
                                this.usuEditar.vehiculo=response.data.id_vehiculo
                                if(typeof(this.usuEditar.id_transporte)=='string'){
                                    this.axios.get(urlservicios+"getVehicles/" +test.id_OperadorLogistico._id +"/"+this.usuEditar.id_transporte)
                                        .then(response =>{
                                            this.optionsVehiculos=response.data
                                            this.optionsVehiculos.forEach(element => {
                                                element.nombre=element.placa+" - "+element.marca
                                                if(this.usuEditar.vehiculo==element._id){
                                                    this.usuEditar.vehiculo=element
                                                }  
                                                
                                            });

                                        })
                                }
                                else{
                                this.axios.get(urlservicios+"getVehicles/" +test.id_OperadorLogistico._id +"/"+this.usuEditar.id_transporte._id)
                                    .then(response =>{
                                        this.optionsVehiculos=response.data
                                        this.optionsVehiculos.forEach(element => {
                                            element.nombre=element.placa+" - "+element.marca
                                            if(this.usuEditar.vehiculo==element._id){
                                                this.usuEditar.vehiculo=element
                                            }  
                                            
                                        });

                                    })
                                }
                               

                            
                            })
                            
                }
            }else{
                    this.courier=false
                    this.admin=false
                    this.cliente=false
            }
        },
        tipoUsuario(value){
            var test2 = localStorage.getItem("storedData");
            var test = JSON.parse(test2);
            if(this.tipoUsu){
                if(this.tipoUsu.nombre=='administrador'){
                    this.courier=false
                    this.admin=true
                    this.cliente=false
                }
                if(this.tipoUsu.nombre=='cliente'){
                    this.courier=false
                    this.admin=false
                    this.cliente=true
                    this.axios.get(urlservicios+"clientesOperador/" +test.id_OperadorLogistico._id +"/null")
                        .then(response =>{
                            this.optionsClientes=response.data
                        })
                     
                }
                if(this.tipoUsu.nombre=='courier'){
                    this.courier=true
                    this.admin=false
                    this.cliente=false
                    this.axios.get(urlservicios+ "medios/")
                            .then(response => {
                                this.optionsMedios=response.data
                            })
                }
            }else{
                    this.courier=false
                    this.admin=false
                    this.cliente=false
            }
        },
        EditarUsuario(data){
            this.usuEditar=Object.assign({}, data.item);
            this.$refs.Editar.show()
        },
        UsuarioNuevo(){
            this.$refs.Crear.show()
        },
        hideModal(){
            this.admin=false
            this.cliente=false
            this.courier=false
            this.optionsMedios=[]
            this.optionsClientes=[]
            this.VM_clientes=''
            this.VM_medios=''
            this.tipoUsu=''
            this.usu={}
            this.usuEditar={}
            this.$refs.Crear.hide()
            this.$refs.Editar.hide()
            this.password=null
            //------
            this.$refs.modalpassword.hide()
            this.password=null
        },
        refrescarUsuarios(){
            var test2 = localStorage.getItem("storedData");
            var test =JSON.parse(test2);
            this.axios.get(urlservicios+"UsuariosPorOperador/"+test.id_OperadorLogistico._id)
                .then((response) => {
                    this.UsuariosTabla=response.data
                    this.$refs.table.refresh();

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
    created: function(){
        var load = true;
        setTimeout(() => {
            bus.$emit("load", {
                load
            });
        });
        var test2 = localStorage.getItem("storedData");
        var test =JSON.parse(test2);
        var id_cliente
        id_cliente='null'
        this.axios.get(urlservicios+"ROLES/"+test.id_OperadorLogistico._id)
            .then((response) => {
                console.log("roles");
                console.log(response);
                this.optionsRoles=response.data
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
        this.axios.get(urlservicios+"UsuariosPorOperador/"+test.id_OperadorLogistico._id)
                .then((response) => {
                    this.UsuariosTabla=response.data
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
        var load = false;
        setTimeout(() => {
            bus.$emit("load", {
                load
            });
        });
    }

}
</script>

<style>

</style>
