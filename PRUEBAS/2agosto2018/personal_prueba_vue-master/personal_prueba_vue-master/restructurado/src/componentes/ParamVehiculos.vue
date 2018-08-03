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
              <h3 slot="header" class="mb-0 encabezado">Vehiculos</h3>
                <b-card-body>
                    <b-row>
                        <b-col md="2" offset-md="10">
                          <div class="float-right mb-3">
                            <b-btn variant="outline-success" @click="VehiculoNuevo()">
                              <i class="fa fa-plus"></i>
                            </b-btn>
                            <b-btn variant="outline-success" @click="refrescarVehiculos()">
                              <i class="fa fa-refresh"></i>
                            </b-btn>
                          </div>
                        </b-col>
                    </b-row>

                    <b-form-group id="fieldsetHorizontal"
                                    horizontal
                                    :label-cols="4"
                                    breakpoint="md"
                                    description="Filtrara del listado los vehiculos existentes"
                                    label="Buscar Vehiculo "
                                    label-for="inputHorizontal">
                        <b-form-input   id="inputHorizontal"
                                        v-model="vehiculos"
                                        placeholder="Vehiculo"
                                        ></b-form-input>
                    </b-form-group>

                   
                </b-card-body>
               
            </b-card>
            <b-card class="border mt-2" no-body header="Primary" header-bg-variant="primary">
                <h3 slot="header" class="mb-0 encabezado">Usuarios</h3>
                    <b-card-body>
                        <b-table   :items="VehiculosTablas" :fields="fields"
                            :current-page="currentPage" :per-page="10" ref="table" 
                            class="my-2">
                                <template slot="editar" slot-scope="data">
                                    <i class="btn btn-success fa fa-pencil" @click="EditarVehiculo(data)"></i>
                                </template>
                                <template slot="placa" slot-scope="data">
                                    {{data.item.placa}} 
                                </template>
                                
                                <template slot="marca" slot-scope="data">
                                    {{data.item.marca}}
                                </template>
                                <template slot="cilindraje" slot-scope="data">
                                    {{data.item.cilindraje}}
                                </template>
                                <template slot="color" slot-scope="data">
                                    {{data.item.color}}
                                </template>
                                 <template slot="tripulacion" slot-scope="data">
                                   <i class="btn btn-success fa fa-users" @click="Tripulacion(data)"></i>
                                </template>
                                      
                                                   
                        </b-table>
                        <b-pagination size="md" :total-rows="VehiculosTablas.length" v-model="currentPage" :per-page="10">
                        </b-pagination>
                    </b-card-body>
            </b-card>
        </b-container>
        <!-- Modal nuevo Component -->
        <b-modal id="modal3" ref="Nuevo" size="lg" no-close-on-backdrop
         no-close-on-esc>
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
                        v-on:click="CrearVehiculo()">
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
                                                label="Información Vehiculo"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                            label="Medio Transporte :"
                                            label-class="text-sm-right"
                                            label-for="medioT">
                                       <v-select id="medioT" v-model="vm_medios" placeholder="Seleccione el tipo de usuario a crear" 
                                             label="tipo" :options="optionsMedios"  ></v-select>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                    label="Placa :"
                                                    label-class="text-sm-right"
                                                    label-for="placa">
                                         <b-form-input v-model="vehi.placa"
                                            :state="estadoplaca"
                                            @input="ValidarTexto('placa','nuevo')"
                                          id="placa"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                    label="marca :"
                                                    label-class="text-sm-right"
                                                    label-for="marca">

                                         <b-form-input v-model="vehi.marca" 
                                         @input="ValidarTexto('marca','nuevo')"
                                         :state="estadomarca" id="marca"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                    label="cilindraje :"
                                                    label-class="text-sm-right"
                                                    label-for="cilindraje">

                                         <b-form-input v-model="vehi.cilindraje"
                                         @input="ValidarTexto('cilindraje','nuevo')"
                                         :state="estadocilindraje" id="cilindraje"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                    label="color :"
                                                    label-class="text-sm-right"
                                                    label-for="color">

                                         <b-form-input v-model="vehi.color" 
                                              @input="ValidarTexto('color','nuevo')"
                                         :state="estadocolor" id="color"></b-form-input>
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-container>
        </b-modal>
        <!-- Modal Edit Component -->
        <b-modal id="modal1" ref="Editar" size="lg" no-close-on-backdrop
         no-close-on-esc>
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
                        v-on:click="ActualizarVehiculo()">
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
                                                label="Editar Información Vehiculo"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                    label="Placa :"
                                                    label-class="text-sm-right"
                                                    label-for="placaED">

                                         <b-form-input v-model="vehiEditar.placa" 
                                             :state="estadoplaca"
                                            @input="ValidarTexto('placaED','Editar')"
                                         id="placaED"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                    label="marca :"
                                                    label-class="text-sm-right"
                                                    label-for="marcaED">

                                         <b-form-input v-model="vehiEditar.marca" id="marcaED"
                                          :state="estadomarca"
                                            @input="ValidarTexto('marcaED','Editar')"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                    label="cilindraje :"
                                                    label-class="text-sm-right"
                                                    label-for="cilindrajeED">

                                         <b-form-input v-model="vehiEditar.cilindraje" 
                                            :state="estadocilindraje"
                                            @input="ValidarTexto('cilindrajeED','Editar')"
                                         id="cilindrajeED"></b-form-input>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                    label="color :"
                                                    label-class="text-sm-right"
                                                    label-for="colorED">

                                         <b-form-input v-model="vehiEditar.color" 
                                          :state="estadocolor"
                                            @input="ValidarTexto('colorED','Editar')"
                                             id="colorED"></b-form-input>
                                    </b-form-group>
                                </b-form-group>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-container>
        </b-modal>
        
        <!-- Modal Tripulacion Component -->
        <b-modal id="modal2" ref="Tripulacion" size="lg" no-close-on-backdrop
         no-close-on-esc>
            <div slot="modal-header"  class="w-100">
                
                <b-btn class="rounded text-white"
                    variant="danger"
                    @click="hideModal">
                    <i class="fa fa-times-circle"
                        aria-hidden="true"></i>&#32;Cancelar
                </b-btn>
                <label class="float-right ">    Vehiculo :    {{titulo_tripu}}</label>
                <!--
                <b-btn
                        class="rounded float-right text-white"
                        variant="warning"
                        v-on:click="EditarVehiculo()">
                        <i class="fa fa-floppy-o"></i>&#32;Guardar
                </b-btn>
                -->
            </div>
            <div slot="modal-footer"
            class="w-100">
            </div>
                <b-container fluid>
                    <b-row class="w-100" >
                        <b-col>
                            <b-card  class="w-100">
                                <b-form-group 
                                                breakpoint="lg"
                                                label="Adicionar Tripulantes"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                    <b-form-group horizontal
                                                    label="Tipo de tripulante :"
                                                    label-class="text-sm-right"
                                                    label-for="color">
                                        <v-select v-model="tipoTripu" placeholder="Seleccione el tipo de tripulación"  label="nombre"
                                         :options="optionsTipoTripulante" @input="TipoTripulante()"></v-select>
                                    </b-form-group>
                                    <b-form-group horizontal
                                                    label="Nombre :"
                                                    label-class="text-sm-right"
                                                    label-for="color">
                                         <v-select v-model="usuario_vehiculo" placeholder="Seleccione el usuario"  label="nombre"
                                         :options="optionUsuarios"  :disabled="disable_user"></v-select>
                                    </b-form-group>
                                     <b-btn
                                            class="rounded float-right text-white"
                                            variant="warning"
                                            v-on:click="adicionarUsuxVehiculo()">
                                            <i class="fa fa-floppy-o"></i>&#32;Guardar
                                    </b-btn>
                                    
                                </b-form-group>
                                <b-form-group 
                                                breakpoint="lg"
                                                label="Editar Tripulación"
                                                label-size="lg"
                                                label-class="font-weight-bold pt-0"
                                                class="mb-0">
                                     <b-table striped hover :items="tripu" :fields="fields_tripulacion">
                                        <template slot="tipo" slot-scope="data">
                                            {{data.item.tipo}} 
                                        </template>
                                        
                                        <template slot="nombre" slot-scope="data">
                                            {{data.item.id_usuario.nombre}}   {{data.item.id_usuario.apellido}}
                                        </template>
                                        <template slot="eliminar" slot-scope="data">
                                            <i class="btn btn-danger fa fa-trash-o" @click="EliminarTripulacion(data)"></i>  
                                        </template>
                                     </b-table>
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
        items: [
            {
            text: "Inicio",
            to: "/inicio"
            },
            {
            text: "Configuración Vehiculos",
            to: "/inicio/configcliente",
            active: true
            }
        ],
        currentPage:1,
        fields_tripulacion:[
             {key: 'tipo', label: 'Tipo', sortable: true },
            { key: 'nombre', label: 'Nombre Usuario', sortable: false },
            { key: 'eliminar', label: 'Eliminar', sortable: false },
            { key: 'editarT', label: 'Editar', sortable: false },

            
        ],
       fields: [
            { key: 'editar', label: 'Editar', sortable: false },
            { key: 'placa', label: 'Marca', sortable: false },
            { key: 'marca', label: 'Vehiculo', sortable: true },
            { key: 'cilindraje', label: 'Cilindraje', sortable: true },
            { key: 'color', label: 'Color', sortable: false },
            { key: 'tripulacion', label: 'Actualizar Tripulación', sortable: false }
            

        ],
        //estados
        estadoplaca:null,
        estadomarca:null,
        estadocilindraje:null, 
        estadocolor:null,
        //--------
        optionsTipoTripulante:[
            {nombre:'conductor',_id:0},
            {nombre:'auxiliar',_id:1}
        ],
        tipoTripu:'',
        VehiculosTablas:[],
        vehiculos:'',
        vehiEditar:{},
        tripu:[],
        vehi:{},
        titulo_tripu:'',
        usuario_vehiculo:'',
        disable_user:true,
        //++++++
        optionUsuarios:[],
        vm_medios:'',
        optionsMedios:[]

    }
    },
    methods:{
        refrescarVehiculos(){
            var test2 = localStorage.getItem("storedData");
            var test =JSON.parse(test2);
            this.axios.get(urlservicios+"ObtenerTodosLosVehiculos/"+test.id_OperadorLogistico._id)
                .then((response) => {
                    this.VehiculosTablas=response.data
                    
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
        ValidarTexto(id,accion){
        
            var key,tecla,tecla_especial,letras,especiales
            var e = document.getElementById(eval('id')).value;

            if(accion=='nuevo')
            {
                if(id=='placa')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        if(e.length>=10){
                            this.estadoplaca=false

                        }
                        else{
                            this.estadoplaca=null
                        }
                    }
                    else{
                        this.estadoplaca=false
                    }
                }
                if(id=='marca')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        if(e.length>=10){
                            this.estadomarca=false

                        }
                        else{
                            this.estadomarca=null
                        }
                    }
                    else{
                        this.estadomarca=false
                    }
                }
                if(id=='cilindraje')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        if(e.length>=10){
                            this.estadocilindraje=false

                        }
                        else{
                            this.estadocilindraje=null
                        }
                    }
                    else{
                        this.estadocilindraje=false
                    }
                }
                if(id=='color')
                {
                    if(e.match(/^[0-9a-zA-Z\s\#\-]+$/)){
                        if(e.length>=10){
                            this.estadocolor=false

                        }
                        else{
                            this.estadocolor=null
                        }
                    }
                    else{
                        this.estadocolor=false
                    }
                }
                
            }
             if(accion=='Editar')
            {
                if(id=='placaED'&&this.vehiEditar.placa){
                    if(this.vehiEditar.placa.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.vehiEditar.placa.length>100){
                            this.estadoplaca=false
                        }
                        else{
                            this.estadoplaca=null
                        }
                    }
                    else{
                        if(id=='placaED')
                        {
                            this.estadoplaca=false
                        }
                    }
                }
                if(id=='marcaED'&&this.vehiEditar.marca){
                    if(this.vehiEditar.marca.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.vehiEditar.marca.length>100){
                            this.estadomarca=false
                        }
                        else{
                            this.estadomarca=null
                        }
                    }
                    else{
                        if(id=='marcaED')
                        {
                            this.estadomarca=false
                        }
                    }
                }
                if(id=='cilindrajeED'&&this.vehiEditar.cilindraje){
                    if(this.vehiEditar.cilindraje.toString().match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.vehiEditar.marca.length>100){
                            this.estadocilindraje=false
                        }
                        else{
                            this.estadocilindraje=null
                        }
                    }
                    else{
                        if(id=='cilindrajeED')
                        {
                            this.estadocilindraje=false
                        }
                    }
                }
                if(id=='colorED'&&this.vehiEditar.color){
                    if(this.vehiEditar.color.match(/^[0-9a-zA-Z\s\-]*$/)){
                        if(this.vehiEditar.color.length>100){
                            this.estadocolor=false
                        }
                        else{
                            this.estadocolor=null
                        }
                    }
                    else{
                        if(id=='colorED')
                        {
                            this.estadocolor=false
                        }
                    }
                }

            }
        },
        CrearVehiculo(){
            var llaves=Object.keys(this.vehi)
            if(llaves.length==0){
                this.estadoplaca=false,
                this.estadocilindraje=false, 
                this.estadomarca=false,
                this.estadocolor=false,
                swal(
                    "Por favor complete correctamente los campos e intente nuevamente",
                    "",
                    "warning"
                    );
            }
            else{
                if(this.estadoplaca==false||this.estadocilindraje==false||this.estadomarca==false||this.estadocolor==false||this.vm_medios==''){
                    if(this.vm_medios==''){
                        swal(
                            "",
                            "Por favor seleccione el medio de transporte",
                            "warning"
                            );
                    }
                    else{
                        swal(
                            "",
                            "Por favor complete correctamente los campos e intente nuevamente",
                            "warning"
                            );
                    }
                }
                else{
                    var test2 = localStorage.getItem("storedData");
                    var test =JSON.parse(test2);
                    var envio ={
                        id_operador_logistico:test.id_OperadorLogistico._id,
                        id_medio_transporte:this.vm_medios._id, 
                        placa:this.vehi.placa,
                        cilindraje:this.vehi.cilindraje,
                        marca:this.vehi.marca,
                        color:this.vehi.color

                    }
                    this.axios.post(urlservicios+"GuadarVehiculo/", envio)
                        .then(response =>{
                            if(response.data.estado=true){
                                swal(
                                "",
                                response.data.message,
                                "success"
                                );
                                this.hideModal()
                                this.refrescarVehiculos()
                            }
                            else{
                                swal(
                                "",
                                response.data.message,
                                "warning"
                                );
                            }
                        })
                }

            }
        },
        VehiculoNuevo(){
            this.axios.get(urlservicios+ "medios/")
                            .then(response => {
                                this.optionsMedios=response.data
                                this.$refs.Nuevo.show()

                            })

        },
        EliminarTripulacion(data){
            var userRemove=data.item
            var envio={
                        id_vehiculo:this.vehiculo_tripulacion._id,
                        id_usuario:userRemove.id_usuario._id,
                        tipo:userRemove.tipo
                    }
             this.axios.post(urlservicios+"agregarTrapulacion/0", envio)
                    .then(response =>{
                        if(response.data.estado=true){
                            swal(
                            "",
                            response.data.message,
                            "success"
                            );
                            this.tripu.forEach((element,indice) => {
                                if(element.id_usuario._id==userRemove.id_usuario._id&&element.tipo==userRemove.tipo){
                                    this.tripu.splice(indice,1)

                                }
                            });
                            this.refrescarVehiculos()
                        }
                        else{
                            swal(
                            "",
                            response.data.message,
                            "warning"
                            );
                        }
                    })
            /*
           
            */
        },
        adicionarUsuxVehiculo(){
            console.log("entro");
            var bandera=false
            if(this.usuario_vehiculo){
                this.tripu.forEach(element => {
                    
                    if(element.tipo==this.tipoTripu.nombre&&element.id_usuario._id==this.usuario_vehiculo._id){
                       bandera=true
                    }
                });
                if(bandera==false){
                    console.log(bandera);
                    var addUser ={
                        id_usuario:{
                            "_id":this.usuario_vehiculo._id,
                            "nombre":this.usuario_vehiculo.nombre,
                            "apellido":this.usuario_vehiculo.apellido
                        },
                        tipo:this.tipoTripu.nombre
                    }
                    
                    var envio={
                        id_vehiculo:this.vehiculo_tripulacion._id,
                        id_usuario:this.usuario_vehiculo._id,
                        tipo:this.tipoTripu.nombre
                    }
                    console.log(envio);
                    console.log(urlservicios+"agregarTrapulacion/1");
                    this.axios.post(urlservicios+"agregarTrapulacion/1", envio)
                    .then(response =>{
                        console.log(response);
                        if(response.data.estado=true){
                            swal(
                            "",
                            response.data.message,
                            "success"
                            );
                            this.tripu.push(addUser)
                            this.refrescarVehiculos()
                        }
                        else{
                            swal(
                            "",
                            response.data.message,
                            "warning"
                            );
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
                else{
                    swal(
                            "Intente nuevamente, por favor",
                            "Ya se encuentra en el listado",
                            "warning"
                        ); 
                }
            }
            else{
                swal(
                        "Deben completarse los campos",
                        "Seleccione de la informacion faltante",
                        "warning"
                    );
            }
            console.log(bandera);
        },
        TipoTripulante(){
            if(this.tipoTripu){
                this.disable_user=false
                var test2 = localStorage.getItem("storedData");
                var test =JSON.parse(test2);
                var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                        load
                    });
                });
                this.axios.get(urlservicios+"UsuariosCurierOperador/"+test.id_OperadorLogistico._id)
                        .then((response) => {
                            this.optionUsuarios=response.data
                            this.optionUsuarios.forEach(element => {
                                element.nombre=element.nombre+' '+element.apellido
                            });
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
            else{
                this.disable_user=true
            }
        },
        Tripulacion(data){
            this.vehiculo_tripulacion=data.item
            this.tripu=data.item.tripulacion
            this.titulo_tripu=data.item.marca+' '+data.item.placa
            this.$refs.Tripulacion.show()
        },
        ActualizarVehiculo(){
            if(this.estadoplaca==false||this.estadocilindraje==false||this.estadomarca==false||this.estadocolor==false){ 
                swal(
                    "",
                    "Por favor complete correctamente los campos e intente nuevamente",
                    "warning"
                    );
            }
            else{
                var test2 = localStorage.getItem("storedData");
                var test =JSON.parse(test2);
                var envio ={
                   
                    placa:this.vehiEditar.placa,
                    cilindraje:this.vehiEditar.cilindraje,
                    marca:this.vehiEditar.marca,
                    color:this.vehiEditar.color

                }

                
                this.axios.post(urlservicios+"UpdateVehiculo/"+this.vehiEditar._id, envio)
                    .then(response =>{
                        if(response.data.estado=true){
                            swal(
                            "",
                            response.data.message,
                            "success"
                            );
                            this.hideModal()
                            this.refrescarVehiculos()
                        }
                        else{
                            swal(
                            "",
                            response.data.message,
                            "warning"
                            );
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
                    
            }

        },
        EditarVehiculo(data){
            this.vehiEditar=Object.assign({}, data.item);
            this.$refs.Editar.show()
        },
        hideModal(){
            this.vehiEditar={}
            this.$refs.Editar.hide()
            this.$refs.Tripulacion.hide()
            //CREACION
            this.vm_medios=''
            this.vehi={}
            this.$refs.Nuevo.hide()


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

        this.axios.get(urlservicios+"ObtenerTodosLosVehiculos/"+test.id_OperadorLogistico._id)
                .then((response) => {
                    this.VehiculosTablas=response.data
                    
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
