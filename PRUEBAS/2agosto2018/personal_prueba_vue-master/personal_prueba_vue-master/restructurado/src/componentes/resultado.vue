<template>
      <b-card v-if="consulta.length" class="mt-2 border" header="Primary" header-bg-variant="primary">
        <h3 slot="header" class="mb-0 encabezado">Lista de ordenes de servicio</h3>
        <b-table :fields="fields" :per-page="5" :current-page="currentPage" :items="consulta" :bordered="true"
        thead-class=text-center tbody-class=text-center>
            <template slot="index" slot-scope="data">
                {{data.index + 1}}
            </template>
            <template slot="estado" slot-scope="data">
                {{data.item.estado}}
            </template>
             <template slot="punto_recoleccion" slot-scope="data">
                {{data.item.remitente.nombre_contacto}}
            </template>
            <template slot="observaciones" slot-scope="data">
                {{data.item.observaciones}}
            </template>
            <template slot="tipo_servicio" slot-scope="data">
                {{data.item.detalle[0].servicioslocal.nombre}}
            </template>
            
            <template slot="Cancelar" slot-scope="data">
                <b-button variant="danger" class="fa fa-ban" @click="cancelarOrden(data)"
                v-show="data.item.estado!='orden de servicio cancelada'"></b-button>

            </template>
            <template slot="centro_costo" slot-scope="data" >
                {{data.item.id_centro_costo.nombre_concatenado}}
            </template>
             <template slot="con_cancelacion" slot-scope="data" v-if="data.item.estados[0].id_concepto">
                {{data.item.estados[0].id_concepto.nombre}}
            </template>
            <template slot="fecha_creacion" slot-scope="data">
                {{data.item.fecha_creacion | formatdate}}
            </template>

            <template slot="detalles" slot-scope="data">

                <b-button variant="success" class="fa fa-info"  @click="actualizar(data)"></b-button>

                <!--<router-link  to="/inicio/consultar"  tag="button" class-active="active" class="btn btn-warning fa fa-cogs"></router-link>
                -->
            </template>
        </b-table>
        <b-pagination size="md" :total-rows="consulta.length" v-model="currentPage" :per-page="5">
        </b-pagination>
      </b-card>
</template>

<script>
import $ from 'jquery'
import {bus} from '../main'
import {urlservicios} from '../main'
import moment from 'moment'
import Preload from '../componentes/preload.vue'

export default {
    components :{
    Preload
  },
    props:['consulta','peticion'],
    filters: {
        formatdate: function(value) {
        if (value) {
            return moment(String(value)).format('MM/DD/YYYY, h:mm:ss a')
        }
        }
    },
    data(){
        return{
            cantidades:0,
            algo:'',
            currentPage: 1,
            fields: [
                'Cancelar',
                { key: 'id', label:'# Orden de Servicio', sortable: true },
                { key: 'tipo_servicio',label:'Tipo de Servicio', sortable: false },
                { key: 'punto_recoleccion',label:'Punto Recolección', sortable: false },
                { key: 'fecha_creacion',label:'Fecha creación orden', sortable: false },
                'estado',
               { key: 'observaciones',label:'Observaciones', sortable: false },
                { key: 'con_cancelacion',label:'Concepto Cancelación', sortable: false },

                { key: 'centro_costo',label:'Centro de Costo', sortable: false },
                'detalles',

            ],
        }
    },
    methods: {
        cancelarOrden(value){
            console.log(value);
            var login = localStorage.getItem("storedData");
            var infologin =JSON.parse(login);
            console.log(infologin.id_cliente);
            console.log(this.consulta);
            if (infologin.id_cliente == undefined || infologin.id_cliente == null) {
              if (typeof value.item === 'object') {
                const { _id, estado, id_OperadorLogistico } = (value.item);
                if (/^(Orden De Servicio Creada|Orden De Servicio Asignada|Orden de servicio en parada en ruta)$/i.test(estado)) {
                  const url = (urlservicios+`/ConceptoProcesoSistema/${id_OperadorLogistico}/2`);
                  this.axios.get(url).then((response) => {
                    const { conceptos } = (response.data);
                    if (!conceptos || conceptos && !conceptos.length) {
                      swal({
                        type: 'warning',
                        title: 'No se encontraron conceptos',
                        text: 'Comunicarse con soporte',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        timer: 5000
                      });
                    } else {
                      (function conceptList() {
                        this.conceptos = (conceptos);
                        const list = ($('<div class="list-group">'));
                        let currentConcept = (null);
                        console.log('conceptos :', this.conceptos);
                        this.conceptos.forEach((c) => {
                          const concepto = ($(`
                            <a href="javascript:void(0)"
                              class="rounded-0 list-group-item list-group-item-action p-2">
                                ${c.nombre}
                            </a>
                          `));
                          concepto.hover(() => {
                            concepto.not('.active').css('background-color', 'lightcyan');
                          }, () => {
                            concepto.not('.active').css('background-color', 'white');
                          }).click((event) => {
                            if (currentConcept !== c) {
                              concepto.css('background-color', '');
                              list.children().filter('.active')
                                .removeClass('active');
                              concepto.addClass('active');
                              currentConcept = (c);
                            }
                          });
                          list.append(concepto);
                        });
                        const content = ($(`
                          <div class="card">
                            <div class="card-body text-white bg-primary p-2">
                              <div class="card-title mb-0">
                                <h5 class="mb-0">Conceptos</h5>
                              </div>
                            </div>
                          </div>
                        `));
                        content.append(list);
                        swal({
                          html: '',
                          confirmButtonText: 'Continuar',
                          onOpen() {
                            const card = ($(swal.getContent()));
                            card.prev('.swal2-header').remove();
                            card.children('#swal2-content').append(content).show();
                          }
                        }).then((next) => {
                          if (next.value && !currentConcept) {
                            swal({
                              type: 'question',
                              title: 'Concepto no seleccionado',
                              allowEscapeKey: false,
                              allowOutsideClick: false,
                              showConfirmButton: false,
                              timer: 2000
                            }).then(() => {
                              conceptList.call(this);
                            });
                          } else if (next.value && currentConcept) {
                            const { id_concepto } = (currentConcept);
                            const url = (urlservicios+`/CancelarOrden/${_id}/${id_concepto}`);
                            this.axios.get(url).then((response) => {
                              const { message } = (response.data);
                              swal({
                                type: 'info',
                                title: message,
                                confirmButtonText: 'Cerrar'
                              });
                              // const index = (this.consulta.findIndex((c) => (c._id === _id)));
                              // if (index >= 0)
                              //     this.consulta.splice(index, 1);
                              setTimeout(() => {
                                value.item.estado = ('orden de servicio cancelada');
                              }, 10);
                            }, (error) => {
                              swal({
                                type: 'error',
                                title: 'Ocurrió un error en el servicio CancelarOrden',
                                text: JSON.stringify(error, null, 1),
                                confirmButtonText: 'Cerrar'
                              }).then(() => {
                                conceptList.call(this);
                              });
                            });
                          } else {
                            currentConcept = (null);
                          }
                        });
                        setTimeout(() => {
                          if (list.height() >= 150) {
                            list.css({
                              display: 'block',
                              maxHeight: '150px',
                              overflowY: 'scroll',
                              overflowX: 'hidden'
                            });
                          }
                        }, 10);
                      }).call(this);
                    }
                  }, (error) => {
                    swal({
                      type: 'error',
                      title: 'Ocurrió un error en el servicio ConceptoProcesoSistema',
                      text: JSON.stringify(error, null, 1),
                      confirmButtonText: 'Cerrar'
                    });
                  });
                } else {
                  swal({
                    type: 'warning',
                    title: 'No se puede Cancelar',
                    text: 'Porque el estado actual de la Orden no lo permite',
                    confirmButtonText: 'Cerrar'
                  });
                }
              }
            }
            else{
                console.log("hay cliente");
                if (typeof value.item === 'object') {
                const { _id, estado, id_OperadorLogistico } = (value.item);
                if (/^(Orden De Servicio Creada|Orden De Servicio Asignada|Orden de servicio en parada en ruta)$/i.test(estado)) {
                  const url = (urlservicios+`/ConceptoProcesoSistema/${id_OperadorLogistico}/2`);
                  this.axios.get(url).then((response) => {
                    const { conceptos } = (response.data);
                    if (!conceptos || conceptos && !conceptos.length) {
                      swal({
                        type: 'warning',
                        title: 'No se encontraron conceptos',
                        text: 'Comunicarse con soporte',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        timer: 5000
                      });
                    } else {
                      (function conceptList() {
                        this.conceptos = (conceptos);
                        const list = ($('<div class="list-group">'));
                        let currentConcept = (null);
                        console.log('conceptos :', this.conceptos);
                        this.conceptos.forEach((c) => {
                          const concepto = ($(`
                            <a href="javascript:void(0)"
                              class="rounded-0 list-group-item list-group-item-action p-2">
                                ${c.nombre}
                            </a>
                          `));
                          concepto.hover(() => {
                            concepto.not('.active').css('background-color', 'lightcyan');
                          }, () => {
                            concepto.not('.active').css('background-color', 'white');
                          }).click((event) => {
                            if (currentConcept !== c) {
                              concepto.css('background-color', '');
                              list.children().filter('.active')
                                .removeClass('active');
                              concepto.addClass('active');
                              currentConcept = (c);
                            }
                          });
                          list.append(concepto);
                        });
                        const content = ($(`
                          <div class="card">
                            <div class="card-body text-white bg-primary p-2">
                              <div class="card-title mb-0">
                                <h5 class="mb-0">Conceptos</h5>
                              </div>
                            </div>
                          </div>
                        `));
                        content.append(list);
                        swal({
                          html: '',
                          confirmButtonText: 'Continuar',
                          onOpen() {
                            const card = ($(swal.getContent()));
                            card.prev('.swal2-header').remove();
                            card.children('#swal2-content').append(content).show();
                          }
                        }).then((next) => {
                          if (next.value && !currentConcept) {
                            swal({
                              type: 'question',
                              title: 'Concepto no seleccionado',
                              allowEscapeKey: false,
                              allowOutsideClick: false,
                              showConfirmButton: false,
                              timer: 2000
                            }).then(() => {
                              conceptList.call(this);
                            });
                          } else if (next.value && currentConcept) {
                            const { id_concepto } = (currentConcept);
                            const url = (urlservicios+`/CancelarOrden/${_id}/${id_concepto}`);
                            this.axios.get(url).then((response) => {
                              const { message } = (response.data);
                              swal({
                                type: 'info',
                                title: message,
                                confirmButtonText: 'Cerrar'
                              });
                              // const index = (this.consulta.findIndex((c) => (c._id === _id)));
                              // if (index >= 0)
                              //     this.consulta.splice(index, 1);
                              setTimeout(() => {
                                value.item.estado = ('orden de servicio cancelada');
                              }, 10);
                            }, (error) => {
                              swal({
                                type: 'error',
                                title: 'Ocurrió un error en el servicio CancelarOrden',
                                text: JSON.stringify(error, null, 1),
                                confirmButtonText: 'Cerrar'
                              }).then(() => {
                                conceptList.call(this);
                              });
                            });
                          } else {
                            currentConcept = (null);
                          }
                        });
                        setTimeout(() => {
                          if (list.height() >= 150) {
                            list.css({
                              display: 'block',
                              maxHeight: '150px',
                              overflowY: 'scroll',
                              overflowX: 'hidden'
                            });
                          }
                        }, 10);
                      }).call(this);
                    }
                  }, (error) => {
                    swal({
                      type: 'error',
                      title: 'Ocurrió un error en el servicio ConceptoProcesoSistema',
                      text: JSON.stringify(error, null, 1),
                      confirmButtonText: 'Cerrar'
                    });
                  });
                } else {
                  swal({
                    type: 'warning',
                    title: 'No se puede Cancelar',
                    text: 'Porque el estado actual de la Orden no lo permite',
                    confirmButtonText: 'Cerrar'
                  });
                }
              }
            }


        },
        /*
        cancelarOrden(value){
            console.log(value);
            var login = localStorage.getItem("storedData");
            var infologin =JSON.parse(login);
            console.log(infologin.id_cliente);
            console.log(this.consulta);
            if (infologin.id_cliente == undefined || infologin.id_cliente == null) {
              if (typeof value.item === 'object') {
                const { _id, estado, id_OperadorLogistico } = (value.item);
                if (/^(Orden De Servicio Creada|Orden De Servicio Asignada)$/i.test(estado)) {
                  const url = (`${urlservicios}ConceptoProcesoSistema/${id_OperadorLogistico}/2`);
                  this.axios.get(url).then((response) => {
                    const { conceptos } = (response.data);
                    if (!conceptos || conceptos && !conceptos.length) {
                      swal({
                        icon: 'error',
                        title: 'No se encontraron conceptos',
                        text: 'Comunicarse con soporte',
                        buttons: false,
                        closeOnEsc: false,
                        closeOnClickOutside: false,
                        timer: 5000
                      });
                    } else {
                      (function conceptList() {
                        this.conceptos = (conceptos);
                        const list = ($('<div class="list-group">'));
                        let currentConcept = (null);
                        this.conceptos.forEach((c) => {
                          const concepto = ($(`
                            <a href="javascript:void(0)"
                              class="rounded-0 list-group-item list-group-item-action p-2">
                                ${c.nombre}
                            </a>
                          `));
                          concepto.hover(() => {
                            concepto.not('.active').css('background-color', 'lightcyan');
                          }, () => {
                            concepto.not('.active').css('background-color', 'white');
                          }).click((event) => {
                            if (currentConcept !== c) {
                              concepto.css('background-color', '');
                              list.children().filter('.active')
                                .removeClass('active');
                              concepto.addClass('active');
                              currentConcept = (c);
                            }
                          });
                          list.append(concepto);
                        });
                        const content = ($(`
                          <div class="card">
                            <div class="card-body text-white bg-primary p-2">
                              <div class="card-title mb-0">
                                <h5 class="mb-0">Conceptos</h5>
                              </div>
                            </div>
                          </div>
                        `));
                        content.append(list);
                        swal({
                          content: content.get(0),
                          button: {
                            text: 'Continuar',
                            value: true,
                            closeModal: false
                          }
                        }).then((next) => {
                          if (next && !currentConcept) {
                            swal('Concepto no seleccionado', '', 'error', {
                              buttons: false,
                              closeOnEsc: false,
                              closeOnClickOutside: false,
                              className: 'swal-padding',
                              timer: 2000
                            }).then(() => {
                              conceptList.call(this);
                            });
                          } else if (next && currentConcept) {
                            const { id_concepto } = (currentConcept);
                            const url = (`${urlservicios}CancelarOrden/${_id}/${id_concepto}`);
                            this.axios.get(url).then((response) => {
                              const { message } = (response.data);
                              swal(message, '', 'info', {
                                button: 'Cerrar'
                              });
                              // const index = (this.consulta.findIndex((c) => (c._id === _id)));
                              // if (index >= 0)
                              //     this.consulta.splice(index, 1);
                              setTimeout(() => {
                                value.item.estado = ('orden de servicio cancelada');
                              }, 10);
                            }, (error) => {
                              swal('Ocurrió un error en el servicio CancelarOrden',
                                JSON.stringify(error, null, 1), 'error', {
                                button: 'Cerrar'
                              }).then(() => {
                                conceptList.call(this);
                              });
                            });
                          } else {
                            currentConcept = (null);
                          }
                        });
                        setTimeout(() => {
                          if (list.height() >= 150) {
                            list.css({
                              display: 'block',
                              maxHeight: '150px',
                              overflowY: 'scroll',
                              overflowX: 'hidden'
                            });
                          }
                        }, 10);
                      }).call(this);
                    }
                  }, (error) => {
                    swal('Ocurrió un error en el servicio ConceptoProcesoSistema',
                      JSON.stringify(error, null, 1), 'error', {
                      button: 'Cerrar'
                    });
                  });
                } else {
                  swal('No se puede Cancelar', 'Porque el estado actual de la Orden no lo permite',
                    'error', {
                    button: 'Cerrar'
                  });
                }
              }
                // swal({
                // title: 'Esta seguro que desea Cancelar la orden de servicio? ',
                // text: "Luego no se podrá revertir el estado de la orden",
                // type: 'warning',
                // showCancelButton: true,
                // confirmButtonColor: '#3085d6',
                // cancelButtonColor: '#d33',
                // cancelButtonText:'Salir',
                // confirmButtonText: 'Confirmar'
                // }).then((result) => {
                //     if (result.value) {
                //         console.log("elimino");
                //         this.consulta.map((obj,ind)=>{
                //     if(obj.id==value.item.id)
                //         {
                //             if(obj.estado=="Orden De Servicio Creada"||obj.estado=="Orden De Servicio Asignada")
                //             {
                //                 this.axios.get(urlservicios+"CancelarOrden/"+value.item._id)
                //                     .then((response) => {
                //                         console.log(response.data);
                //                         if(response.data.message=="orden de servicio actualizada")
                //                         {
                //                             swal("Orden de servicio Cancelada!",'', "success");

                //                         }
                //                     })
                //                 this.consulta.splice(ind,1)
                //             }
                //             else
                //             {
                //                 swal(
                //                     "No se puede Eliminar",
                //                     "Por que el estado actual de la Orden no lo permite",
                //                     "error"
                //                 );
                //             }
                //         }
                //         })
                //     }
                //     else{
                //         console.log("no elimino");
                //     }
                //     })
            }
            else{
                console.log("hay cliente");
                swal({
                title: 'Esta seguro ?',
                text: "Luego no se podra revertir el estado de la orden!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:'Cancelar',
                confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.value) {
                        console.log("elimino");
                        this.consulta.map((obj,ind)=>{
                    if(obj.id==value.item.id)
                        {
                            if(obj.estado=="Orden De Servicio Creada")
                            {
                                this.axios.get(urlservicios+"CancelarOrden/"+value.item._id)
                                    .then((response) => {
                                        console.log(response.data);
                                        if(response.data.message=="orden de servicio actualizada")
                                        {
                                            this.consulta.splice(ind,1)
                                            swal("Orden Eliminada!", "Orden de Servicio Cancelada!", "success");

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
                            else
                            {
                                swal(
                                    "No se puede Eliminar",
                                    "Por que el estado actual de la Orden no lo permite",
                                    "error"
                                );
                            }
                        }
                        })
                    }
                    else{
                        console.log("no elimino");
                    }
                    })
            }


        },
        /*
        cancelarOrden(value){
            console.log(value);
            var login = localStorage.getItem("storedData");
            var infologin =JSON.parse(login);
            console.log(infologin.id_cliente);
            console.log(this.consulta);
            if(infologin.id_cliente==undefined||
            infologin.id_cliente==null){
                swal({
                title: 'Esta seguro que desea Cancelar la orden de servicio? ',
                text: "Luego no se podrá revertir el estado de la orden",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:'Salir',
                confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.value) {
                        console.log("elimino");
                        this.consulta.map((obj,ind)=>{
                    if(obj.id==value.item.id)
                        {
                            if(obj.estado=="Orden De Servicio Creada"||obj.estado=="Orden De Servicio Asignada")
                            {
                                this.axios.get(urlservicios+"CancelarOrden/"+value.item._id)
                                    .then((response) => {
                                        console.log(response.data);
                                        if(response.data.message=="orden de servicio actualizada")
                                        {
                                            swal("Orden de servicio Cancelada!",'', "success");

                                        }
                                    })
                                this.consulta.splice(ind,1)
                            }
                            else
                            {
                                swal(
                                    "No se puede Eliminar",
                                    "Por que el estado actual de la Orden no lo permite",
                                    "error"
                                );
                            }
                        }
                        })
                    }
                    else{
                        console.log("no elimino");
                    }
                    })
            }
            else{
                console.log("hay cliente");
                swal({
                title: 'Esta seguro ?',
                text: "Luego no se podra revertir el estado de la orden!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:'Cancelar',
                confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.value) {
                        console.log("elimino");
                        this.consulta.map((obj,ind)=>{
                    if(obj.id==value.item.id)
                        {
                            if(obj.estado=="Orden De Servicio Creada")
                            {
                                this.axios.get(urlservicios+"CancelarOrden/"+value.item._id)
                                    .then((response) => {
                                        console.log(response.data);
                                        if(response.data.message=="orden de servicio actualizada")
                                        {
                                            this.consulta.splice(ind,1)
                                            swal("Orden Eliminada!", "Orden de Servicio Cancelada!", "success");

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
                            else
                            {
                                swal(
                                    "No se puede Eliminar",
                                    "Por que el estado actual de la Orden no lo permite",
                                    "error"
                                );
                            }
                        }
                        })
                    }
                    else{
                        console.log("no elimino");
                    }
                    })
            }


        },
        */
        actualizar(inde){
            var test2 = localStorage.getItem("storedData");
            var test = JSON.parse(test2);
            //console.log(inde);
            var ocultar=false
            var inputstotales=[]
             for(var a=0;a<inde.item.detalle.length;a++)
            {
                var desti= inde.item.detalle[a].detalleslocal.destinatario

                var informacion = inde.item.detalle[a].detalleslocal.infor
                var produc= inde.item.detalle[a].productoslocal._id
                var serv = inde.item.detalle[a].servicioslocal._id
                var estructura
                var llavesInfor
                var llavesDesti
                var respuestatrayectos
                /*
                if(desti.propiedadesDinamicas){

                    llavesInfor=Object.keys(informacion)
                    llavesDesti=Object.keys(desti.propiedadesDinamicas)
                    llavesInfor.forEach(infor => {
                        llavesDesti.forEach(destinatario => {
                            if(infor==destinatario){
                                if(eval('informacion.'+destinatario)=="000000000000000000000000"){
                                    eval('informacion.'+destinatario+'='+'desti.propiedadesDinamicas.'+destinatario)
                                    this.axios.get(urlservicios+"estructuraf/" +produc +"/" +serv)
                                        .then(response=>{
                                            estructura=response.data
                                            estructura.campos.forEach(element => {

                                                if(element.vmodel==destinatario){
                                                    this.axios.get(element.urlobjeto+test.id_OperadorLogistico._id)
                                                        .then(responseurl =>{
                                                            console.log(responseurl);
                                                            respuestatrayectos=responseurl.data
                                                            respuestatrayectos.forEach(elementosT => {

                                                                if(eval('informacion.'+destinatario)==elementosT._id){
                                                                    informacion.trayectoobj={},
                                                                    informacion.trayectoobj={
                                                                        nombre:elementosT.nombre,
                                                                        id_trayecto:elementosT._id
                                                                    }
                                                                }

                                                            });
                                                        })
                                                }
                                            });
                                        });
                                }

                            }
                            else{
                                console.log("no son iguales");
                            }
                        });
                    });
                    console.log("itemmm");
                    console.log(inde.item);

                }
                else{
                    console.log("no existe");
                }
                */


                var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                    load
                    });
                });

                this.axios.get(urlservicios+"estructuraf/" +produc +
                "/" +serv).
                then(response => {
                    var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                        load
                        });
                    });
                        inputstotales.push(response.data)
                        bus.$emit('items',inde,inputstotales)
                setTimeout(() => {
                bus.$emit('thisEvent', {
                    inde, inputstotales,
                })
                }, )
                var load=true
                setTimeout(() => {
                    bus.$emit('load', {
                        load
                    })
                    }, )
                bus.$emit('ocul',ocultar)
                setTimeout(() => {
                    bus.$emit('ocultar', {
                        ocultar
                    })
                    }, )
                    var load=false
                setTimeout(() => {
                    bus.$emit('load', {
                        load
                    })
                    }, )
                this.$router.replace('/inicio/consultar/detalles')
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
         mounted: function () {
             bus.$on('ocultar', function (userObject) {

            this.algo = userObject
            console.log(this.algo);
        }.bind(this))

        },
    }

}
</script>

<style>

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
</style>
