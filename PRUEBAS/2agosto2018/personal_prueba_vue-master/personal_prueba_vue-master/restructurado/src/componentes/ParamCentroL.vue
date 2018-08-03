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
          <b-card class="border mt-2" header="Centros logísticos" header-bg-variant="primary" header-tag="h3" no-body>
            <b-card-body>
              <b-row >
                <b-col md="2" offset-md="10">
                  <div class="float-right mb-3">
                    <b-btn variant="outline-success" @click="nuevocl">
                      <i class="fa fa-plus"></i>
                    </b-btn>
                    <b-btn variant="outline-success"  @click="refrescarCentrosLogisticos()">
                      <i class="fa fa-refresh"></i>
                    </b-btn>
                  </div>
                </b-col>

              </b-row>
                <b-form-group id="fieldsetHorizontal"
                                          horizontal
                                          :label-cols="4"
                                          breakpoint="md"
                                          description="Filtrara del listado de centros logisticos asociados."
                                          label="Buscar Centro Logistico "
                                          label-for="inputHorizontal">
                              <b-form-input   id="inputHorizontal"
                                              v-model="CentroL"
                                              placeholder="Nombre del Centro de Logistico"

                                              ></b-form-input>
                          </b-form-group>
              <b-row>
                <b-table  fixed :items="centrosLogisticos"
                :current-page="currentPage" :per-page="perPage"
                :fields="fields"
                :filter="CentroL">
                  <template slot="editar" slot-scope="data">
                    <i class="btn btn-success fa fa-pencil" @click="editar(data)"></i>
                  </template>
                </b-table>
                <b-pagination size="md" :total-rows="centrosLogisticos.length" v-model="currentPage" :per-page="perPage">
                    </b-pagination>
              </b-row>



            </b-card-body>
          </b-card>
        </b-container>
    <!-- Modal Nuevo Centro Logistico -->
    <b-modal id="ModalNuevo" size="lg" ref="ModalNuevo"
      no-close-on-backdrop
      no-close-on-esc		>
      <b-container fluid>
        <b-row class="mb-3">
          <b-col sm="3"><label for="Nnombre">Nombre Centro Logistico</label></b-col>
          <b-col sm="9">
            <b-form-input id="Nnombre" type="text" v-model="ModalNew.nombre"
            :state="statusnombre"
            @input=" ValidarTexto('Nnombre','nuevo')"
            maxlength="100"></b-form-input>
          </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3"><label for="Ndireccion">Dirección</label></b-col>
            <b-col sm="9"><b-form-input id="Ndireccion" type="text" v-model="ModalNew.direccion"
            :state="statusdireccion"
            @input=" ValidarTexto('Ndireccion','nuevo')"
            maxlength="100"></b-form-input></b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3"><label for="Nciudad">Ciudad</label></b-col>
            <b-col sm="9"><b-form-input id="Nciudad" type="text" v-model="ModalNew.ciudad"
            :state="statusciudad"
            @input=" ValidarTexto('Nciudad','nuevo')"
            maxlength="100"></b-form-input></b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3"><label for="Npais">Pais</label></b-col>
            <b-col sm="9"><b-form-input id="Npais" type="text" v-model="ModalNew.pais"
            :state="statuspais"
            @input=" ValidarTexto('Npais','nuevo')"
            maxlength="100"></b-form-input></b-col>
          </b-row>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <b-btn size="sm" class="float-right" variant="primary" @click="CrearNuevoCL()">
        Guardar
        </b-btn>
        <b-btn size="sm" class="float-left" variant="danger" @click="cerrarModal()">
        Cerrar
        </b-btn>
      </div>
      <div slot="modal-header" class="w-100">
        <strong >Crear Centro Logistico</strong>
        <b-btn size="sm" class="float-right" variant="outline-danger" @click="cerrarModal()">
        X
        </b-btn>
      </div>
    </b-modal>
    <!-- Modal Editar Centro Logistico -->
    <b-modal id="ModalEditar" ref="ModalEditar" size="lg"
      no-close-on-backdrop
      no-close-on-esc>
     <b-container fluid>
        <b-row class="mb-3">
          <b-col sm="3"><label for="NnombreED">Nombre Centro Logistico</label></b-col>
          <b-col sm="9">
            <b-form-input id="NnombreED" type="text" v-model="ModalEdit.nombre"
            :state="statusnombre"
            @input=" ValidarTexto('NnombreED','editar')"
            maxlength="100"></b-form-input>
          </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3"><label for="NdireccionED">Dirección</label></b-col>
            <b-col sm="9"><b-form-input id="NdireccionED" type="text" v-model="ModalEdit.direccion"
            :state="statusdireccion"
            @input=" ValidarTexto('NdireccionED','editar')"
            maxlength="100"></b-form-input></b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3"><label for="NciudadED">Ciudad</label></b-col>
            <b-col sm="9"><b-form-input id="NciudadED" type="text" v-model="ModalEdit.ciudad"
            :state="statusciudad"
            @input=" ValidarTexto('NciudadED','editar')"
            maxlength="100"></b-form-input></b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3"><label for="NpaisED">Pais</label></b-col>
            <b-col sm="9"><b-form-input id="NpaisED" type="text" v-model="ModalEdit.pais"
            :state="statuspais"
            @input=" ValidarTexto('NpaisED','editar')"
            maxlength="100"></b-form-input></b-col>
          </b-row>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <b-btn size="sm" class="float-right" variant="primary" @click="ActualizarCentroLogistico()">
        Guardar
        </b-btn>
        <b-btn size="sm" class="float-left" variant="danger" @click="cerrarModal()">
        Cerrar
        </b-btn>
      </div>
      <div slot="modal-header" class="w-100">
        <strong >Actualizar Centro Logistico</strong>
        <b-btn size="sm" class="float-right" variant="outline-danger" @click="cerrarModal()">
        X
        </b-btn>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import { urlservicios } from "../main";

export default {
  data() {
    return {
       currentPage:0,
        perPage:5,
       items: [
        {
          text: "Inicio",
          to: "/inicio"
        },
        {
          text: "Configuración Centros Logisticos",
          to: "/inicio/configcliente",
          active: true
        }
      ],
      indice:null,
      statusciudad: null,
      statusdireccion: null,
      statusnombre: null,
      statuspais: null,
      CentroL: "",
      ModalNew: {
        ciudad: "",
        direccion: "",
        nombre: "",
        pais: ""
      },
      ModalEdit: {},
      centrosLogisticos: [],
      fields: [
        { key: "ciudad", label: "Ciudad", sortable: false },
        { key: "nombre", label: "Nombre", sortable: false },
        { key: "direccion", label: "Dirección", sortable: false },
        { key: "editar", label: "Editar", sortable: false }
      ]
    };
  },
  methods: {
    ActualizarCentroLogistico() {
      console.log("actualizar");
      if (
        this.ModalEdit.nombre == "" ||
        this.ModalEdit.direccion == "" ||
        this.ModalEdit.ciudad == "" ||
        this.ModalEdit.pais == ""
      ) {
        if (this.ModalEdit.nombre == "") {
          this.statusnombre = false;
        }
        if (this.ModalEdit.direccion == "") {
          this.statusdireccion = false;
        }
        if (this.ModalEdit.ciudad == "") {
          this.statusciudad = false;
        }
        if (this.ModalEdit.pais == "") {
          this.statuspais = false;
        }
        swal(
          "Error!",
          "Para Actualizar deben estar completos todos los campos",
          "error"
        );
      }
      if (
        this.statusnombre == false ||
        this.statusdireccion == false ||
        this.statuspais == false ||
        this.statusciudad == false
      ) {
        swal(
          "Error!",
          "Para Actualizar debe cumplirse el formato establecido",
          "error"
        );
      } else {
        var objeto = {
          nombre: this.ModalEdit.nombre,
          direccion: this.ModalEdit.direccion,
          pais: this.ModalEdit.pais,
          ciudad: this.ModalEdit.ciudad
        };
        //this.$refs.ModalEditar.hide();
        console.log(this.ModalEdit._id);
        console.log(objeto);
        this.axios
          .post(
            urlservicios+ "ActualizaCentrosLogisticos/" + this.ModalEdit._id,
            objeto
          )
          .then(response => {
            console.log(response);

            if (response.data.validar == true) {
              swal({
                title: "Actualizado Exitosamente",
                timer: 1500,
                type: "success"
              });
              this.centrosLogisticos.splice(this.indice, 1);
              this.centrosLogisticos.splice(this.indice, 0, response.data.centro);
              this.$refs.ModalEditar.hide();

            } else {
              swal({
                title: "No se pudo actualizar",
                timer: 1000,
                type: "error"
              });
            }
          });
      }
    },
    editar(value) {
      console.log(value);
      this.indice=value.index
      this.ModalEdit=Object.assign({},value.item)
      //this.ModalEdit = value.item;
      console.log(this.ModalEdit._id);
      if(this.ModalEdit._id!=undefined){
      this.$refs.ModalEditar.show();

      }
    },
    ValidarTexto(id, accion) {
      var key, tecla, tecla_especial, letras, especiales;
      var e = document.getElementById(eval("id")).value;
      //console.log(id);

      if (accion == "nuevo") {
        if (id == "Ndireccion") {
          if (e.match(/^[0-9a-zA-Z\s\#\-]+$/)) {
            if (e.length > 100) {
              this.statusdireccion = false;
            } else {
              this.statusdireccion = null;
            }
          } else {
            this.statusdireccion = false;
          }
        }
        if (e.match(/^[0-9a-zA-Z\s\-]*$/)) {
          if (id == "Nnombre") {
            if (e.length > 100) {
              this.statusnombre = false;
            } else {
              this.statusnombre = null;
            }
          }

          if (id == "Nciudad") {
            if (e.length > 100) {
              this.statusciudad = false;
            } else {
              this.statusciudad = null;
            }
          }
          if (id == "Npais") {
            if (e.length > 100) {
              this.statuspais = false;
            } else {
              this.statuspais = null;
            }
          }
        } else {
          if (id == "Nnombre") {
            this.statusnombre = false;
          }

          if (id == "Nciudad") {
            this.statusciudad = false;
          }
          if (id == "Npais") {
            this.statuspais = false;
          }
        }
      }
      if (accion == "editar") {
        //console.log("editar");
        if (id == "NnombreED") {
          if (this.ModalEdit.nombre.match(/^[0-9a-zA-Z\s\-]*$/)) {
            if (this.ModalEdit.nombre.length > 100) {
              this.statusnombre = false;
            } else {
              this.statusnombre = null;
            }
          } else {
            if (id == "NnombreED") {
              this.statusnombre = false;
            }
          }
        }
        if (id == "NdireccionED") {
          if (this.ModalEdit.direccion.match(/^[0-9a-zA-Z\s\#\-\.]+$/)) {
            if (this.ModalEdit.direccion.length > 100) {
              this.statusdireccion = false;
            } else {
              this.statusdireccion = null;
            }
          } else {
            this.statusdireccion = false;
          }
        }
        if (id == "NciudadED") {
          if (this.ModalEdit.ciudad.match(/^[0-9a-zA-Z\s\-]*$/)) {
            if (this.ModalEdit.ciudad.length > 100) {
              this.statusciudad = false;
            } else {
              this.statusciudad = null;
            }
          } else {
            if (id == "NciudadED") {
              this.statusciudad = false;
            }
          }
        }
        if (id == "NpaisED") {
          if (this.ModalEdit.pais.match(/^[0-9a-zA-Z\s\-]*$/)) {
            if (this.ModalEdit.pais.length > 100) {
              this.statuspais = false;
            } else {
              this.statuspais = null;
            }
          } else {
            if (id == "NpaisED") {
              this.statuspais = false;
            }
          }
        }
      }
    },
    cerrarModal() {
      console.log("cerrar modal");
      this.ModalNew.ciudad = "";
      this.ModalNew.direccion = "";
      this.ModalNew.nombre = "";
      this.ModalNew.pais = "";
      (this.statusciudad = null),
        (this.statusdireccion = null),
        (this.statusnombre = null),
        (this.statuspais = null),

        this.$refs.ModalNuevo.hide();
      this.$refs.ModalEditar.hide();
    },
    refrescarCentrosLogisticos() {
      var test2 = localStorage.getItem("storedData");
      var test = JSON.parse(test2);
      var id_cliente;
      id_cliente = "null";
      this.axios
        .get(
          urlservicios+ "centroslogisticos/" + test.id_OperadorLogistico._id
        )
        .then(response => {
          console.log(response);
          this.centrosLogisticos = response.data;
        });
    },
    nuevocl() {
      this.ModalNew.nombre = this.CentroL;
      this.ModalNew.ciudad = "";
      this.ModalNew.direccion = "";
      this.ModalNew.pais = "";
      (this.statusciudad = null),
        (this.statusdireccion = null),
        (this.statusnombre = null),
        (this.statuspais = null),
        this.$refs.ModalNuevo.show();
    },
    CrearNuevoCL() {
      console.log("guardo");
      var test2 = localStorage.getItem("storedData");
      var test = JSON.parse(test2);
      var objeto;
      var bandera;
      objeto = this.ModalNew;
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
      if (
        this.statusnombre == false ||
        this.statusdireccion == false ||
        this.statuspais == false ||
        this.statusciudad == false
      ) {
        swal(
          "Error!",
          "Para la Creación debe cumplirse el formato establecido",
          "error"
        );
      } else {
        var objenvio = {
          nombre: objeto.nombre,
          direccion: objeto.direccion,
          ciudad: objeto.ciudad,
          pais: objeto.pais,
          id_operadorlogistico: test.id_OperadorLogistico._id
        };
        console.log(objenvio);

        this.axios
          .post(urlservicios+ "CrearCentrosLogisticos", objenvio)
          .then(response => {
            console.log(response);
            if (response.data.validar == true) {
              this.centrosLogisticos.push(response.data.centro);
              swal(
                "Creado Correctamente!",
                "Centro Logistico Creado Correctamente",
                "success"
              );
              this.$refs.ModalNuevo.hide();
            } else {
              swal(
                "Upps!",
                "Ya existe un Centro Logistico con esas caracteristicas , revise la informacion diligenciada",
                "error"
              );
            }
          });
      }
    }
  },

  created: function() {
    var test2 = localStorage.getItem("storedData");
    var test = JSON.parse(test2);
    var id_cliente;
    id_cliente = "null";

    this.axios
      .get(urlservicios+ "centroslogisticos/" + test.id_OperadorLogistico._id)
      .then(response => {
        console.log(response.data);
        this.centrosLogisticos = response.data;
      });
  }
};
</script>

<style>

</style>
