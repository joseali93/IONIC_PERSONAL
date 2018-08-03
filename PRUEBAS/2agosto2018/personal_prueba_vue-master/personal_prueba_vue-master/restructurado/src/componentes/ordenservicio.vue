<template>
<!-- EN ESTE SE PERMITE LA GENERACION DE LOS DETALLES ASOCIADOS A UN CLIENTE Y CENTOR DE COSTO -->
<b-container
    fluid
    class="contenedorTotal"
>
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
        <b-row>
            <b-col
                md="6"
                offset-md="6"
            >
                <div class="d-inline-block float-right mt-3">
                    <b-btn
                        class="rounded text-white"
                        variant="info"
                        @click="volver"
                        v-b-tooltip.hover
                        title="Anterior"
                    >
                        <i class="fa fa-arrow-left"></i>&#32;Anterior
                        </b-btn>
                        <!--
                        <b-btn
                        class="rounded text-white"
                        variant="info"
                        to="/inicio/orden"
                        v-b-tooltip.hover
                        title="Anterior"
                            >
                        <i class="fa fa-arrow-left"></i>&#32;Anterior
                        </b-btn>
                            -->
                        <b-btn
                            class="rounded text-white"
                            variant="warning"
                            @click="envioServicio"
                            v-b-tooltip.hover
                            title="Finalizar"
                        >
                            <i class="fa fa-check"></i>&#32;Finalizar
                            </b-btn>
                </div>
                </b-col>
        </b-row>
        <b-card-group
            deck
            class="mt-3"
        >
            <b-card
                class="border"
                no-body
                header="Primary"
                header-bg-variant="primary"
            >
                <div
                    slot="header"
                    class="mb-0 encabezado"
                >
                    <b-row>
                        <b-col md="6">
                            <h3 class="my-2">Detalle de servicios</h3>
                        </b-col>
                        <b-col md="6">
                            <b-btn
                                class="rounded float-right text-white"
                                variant="warning"
                                v-b-tooltip.hover
                                title="Adicionar"
                                @click="abirmodal()"
                            >
                                <i class="fa fa-plus"></i>&#32;Adicionar
                                </b-btn>
                        </b-col>
                    </b-row>
                    </div>
                    <b-card-body v-if="DetalleServicio && DetalleServicio.length">
                        <b-row>
                            <b-table
                                class="mt-2"
                                :fields="fields"
                                :per-page="5"
                                :current-page="currentPage"
                                :items="DetalleServicio"
                            >

                                <template
                                    slot="eliminar"
                                    slot-scope="data"
                                >
                                    <i
                                        class="btn btn-danger fa fa-trash"
                                        v-on:click="eliminar(data.index)"
                                    ></i>
                                        </template>
                                        <template
                                            slot="productoslocal"
                                            slot-scope="data"
                                        >
                                            {{data.value.nombre}}
                                            </template>
                                            <template
                                                slot="servicioslocal"
                                                slot-scope="data"
                                            >
                                                {{data.value.nombre}}
                                                </template>
                                                <template
                                                    slot="editar"
                                                    slot-scope="data"
                                                >
                                                    <i
                                                        class="btn btn-success fa fa-pencil"
                                                        v-on:click="editar(data.index)"
                                                    ></i>

                                                        <!--
                          <i class="btn btn-success fa fa-pencil"  v-on:click="editar(data.index)" v-b-modal.modaleditar></i>

                            -->
                                                        </template>
                                                        </b-table>
                                                        <b-pagination
                                                            size="md"
                                                            :total-rows="DetalleServicio.length"
                                                            v-model="currentPage"
                                                            :per-page="5"
                                                        >
                                                            </b-pagination>
                        </b-row>
                    </b-card-body>
                    </b-card>
                    <b-card
                        class="border"
                        header="Primary"
                        header-bg-variant="primary"
                    >
                        <h3
                            slot="header"
                            class="mb-0 encabezado"
                        >Observaciones generales de recolección</h3>
                            <b-row>
                                <h3 class="text-primary">Observaciones</h3>
                            </b-row>
                            <b-row>
                                <b-form-textarea
                                    id="textarea1"
                                    v-model="observacionesGeneral"
                                    placeholder="Instrucciones a tener en cuenta para recolección"
                                    :rows="3"
                                    :max-rows="6"
                                    maxlength="2000"
                                >
                                    </b-form-textarea>
                            </b-row>
                            </b-card>
                            </b-card-group>
    </b-container>
    <!-- Modal Adicionar -->
    <b-modal
        id="modalcrear"
        ref="Modal"
        title="Adicionar Registro"
        no-close-on-backdrop
        no-close-on-esc
        size="lg"
    >
        <div
            slot="modal-header"
            class="w-100"
        >
            <b-btn
                class="rounded text-white"
                variant="danger"
                @click="hideModal"
            >
                <i
                    class="fa fa-times-circle"
                    aria-hidden="true"
                ></i>&#32;Cancelar
                    </b-btn>
                    <b-btn
                        class="rounded float-right text-white"
                        variant="warning"
                        v-on:click="ingresarOrden"
                    >
                        <i class="fa fa-floppy-o"></i>&#32;Guardar
                        </b-btn>
                        </div>
                        <b-container fluid>
                            <b-row class="mb-1">
                                <b-col>
                                    <v-select
                                        v-model="selectproduct"
                                        label="nombre"
                                        placeholder="Producto"
                                        :options="productosurl"
                                        @input="seleccionarServicio()"
                                    >
                                        </v-select>

                                </b-col>
                                <b-col>
                                    <v-select
                                        v-model="selectservice"
                                        label="nombre"
                                        placeholder="Servicio"
                                        :disabled="habilitar"
                                        :options="serviciosurl"
                                        @input="camposNversion()"
                                    >
                                        </v-select>
                                </b-col>
                            </b-row>
                            <b-card
                                no-body
                                v-show="selectservice"
                                class="border"
                            >
                                <b-tabs
                                    card
                                    v-model="tabIndex"
                                    class="cabecera-tabs"
                                >
                                    <b-tab title="Información">
                                        <b-row class="my-2">
                                            <b-col md="4">
                                                <h5 class="text-primary mt-2">Documento de referencia:</h5>
                                            </b-col>
                                            <b-col md="8">
                                                <b-form-input
                                                    type="text"
                                                    class="form-control form-control-sm"
                                                    placeholder=" Factura, remisión, orden de compra..."
                                                    v-model="detalles.referencia"
                                                    :state="estado.referencia"
                                                />
                                            </b-col>
                                        </b-row>
                                        <b-row
                                            v-for="(data,indice) in inputs.campos"
                                            :key="indice"
                                            v-if="data.type != 'select' && data.espieza == false"
                                            class="my-2"
                                        >
                                            <b-col md="4">
                                                <h5 class="text-primary mt-2">{{data.nombre}}:</h5>
                                            </b-col>
                                            <b-col md="8">
                                                <input
                                                    class="form-control form-control-sm"
                                                    :maxlength="data.maxlength"
                                                    :type="data.type"
                                                    :id="data.id"
                                                    :style="[data.style,validatecampo]"
                                                    :max="data.max"
                                                    :min="data.min"
                                                    :placeholder="data.placeholder"
                                                    @keyup="Presiono(indice)"
                                                    required
                                                >
                                            </b-col>
                                            </b-row>
                                            <b-row
                                                v-show="selectservice"
                                                class="my-2"
                                            >
                                                <b-col md="4">
                                                    <h5 class="text-primary mt-2">Contenido:</h5>
                                                </b-col>
                                                <b-col md="8">
                                                    <b-form-input
                                                        id="textarea1"
                                                        type="text"
                                                        v-model="detalles.contenido"
                                                        class="form-control-sm"
                                                        placeholder="Medicamentos, facturas, mercancías especiales, ...etc"
                                                        maxlength="50"
                                                    >
                                                        </b-form-input>
                                                </b-col>
                                                </b-row>
                                                <b-form-textarea
                                                    id="textarea1"
                                                    v-model="detalles.observaciones"
                                                    class="form-control-sm"
                                                    placeholder="Ingrese las instrucciones a tener en cuenta para entrega, recolección y transporte."
                                                    :rows="3"
                                                    :max-rows="6"
                                                />
                                                <b-form-row v-show="selectservice">
                                                    <b-col>
                                                    </b-col>
                                                </b-form-row>
                                    </b-tab>
                                    <b-tab
                                        title="Detalle"
                                        :disabled="tabdinamico"
                                    >
                                        <b-row
                                            v-for="(data,indice) in inputs.campos"
                                            v-show="camposdinamicos"
                                        >
                                            <template v-if="data.type!='select'">
                                                <template v-if="data.espieza==true">
                                                    <b-col md="4">
                                                        <h5
                                                            class="text-primary mt-2"
                                                            :style="[data.style]"
                                                        >{{data.placeholder}}:</h5>
                                                    </b-col>
                                                    <b-col md="8">
                                                        <!--
                                        @keyup="Presiono(indice)"
                                        -->
                                                        <input
                                                            focus
                                                            class="form-control form-control-sm"
                                                            :maxlength="data.maxlength"
                                                            :type="data.type"
                                                            :id="data.id"
                                                            :style="[data.style,validatecampo]"
                                                            :max="data.max"
                                                            :min="data.min"
                                                            :placeholder="data.placeholder"
                                                            @keyup="Presiono(indice)"
                                                            @keyup.enter.tab="adicionarRef"
                                                            @keydown.tab="adicionarRef"
                                                            required
                                                        >
                                                    </b-col>
                                                </template>

                                            </template>
                                            </b-row>
                                            <b-row v-show="ocultardicionar">
                                                <b-col class="d-flex flex-row-reverse my-2">
                                                    <b-btn
                                                        variant="outline-success"
                                                        active-class
                                                        class="float-right"
                                                        @click="adicionarRef"
                                                        v-show="camposdinamicos"
                                                    >
                                                        <i class="fa fa-plus"></i>
                                                        </b-btn>
                                                </b-col>
                                            </b-row>
                                            <b-row v-show="ocultareditar">
                                                <b-col class="d-flex flex-row-reverse">
                                                    <b-btn
                                                        variant="outline-success"
                                                        active-class
                                                        class="float-right"
                                                        @click="UpdateDinamico"
                                                        v-show="camposdinamicos"
                                                    >
                                                        <i class="fa fa-pencil"></i>
                                                        </b-btn>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-table
                                                    striped
                                                    hover
                                                    :items="itemsdinamicos"
                                                    :fields="fieldsdinamicos"
                                                    :per-page="3"
                                                    :current-page="currentPageRef"
                                                    v-show="camposdinamicos && itemsdinamicos.length"
                                                >
                                                    <!--
                                        <template slot="eliminar" slot-scope="data">
                                          <b-btn variant="danger"  v-on:click="eliminarRef(data)" v-show="ocultardicionar"
                                           v-b-popover.hover="'Eliminar'">
                                          <i class="fa fa-trash" v-on:click="eliminarRef(data)" v-show="ocultardicionar"
                                          ></i>
                                        </b-btn>

                                            <i class="btn btn-danger fa fa-trash" v-on:click="eliminarRef(data)" v-show="ocultardicionar"></i>

                                        </template>
                                         -->
                                                    <template
                                                        slot="acciones"
                                                        slot-scope="data"
                                                    >
                                                        <b-btn
                                                            variant="primary"
                                                            v-on:click="ActualizarRef(data,data.index)"
                                                            v-show="ocultardicionar"
                                                            v-b-popover.hover="'Actulizar'"
                                                        >
                                                            <i
                                                                class="fa fa-pencil"
                                                                v-on:click="ActualizarRef(data,data.index)"
                                                                v-show="ocultardicionar"
                                                            ></i>
                                                                </b-btn>
                                                                <b-btn
                                                                    variant="danger"
                                                                    v-on:click="eliminarRef(data)"
                                                                    v-show="ocultardicionar"
                                                                    v-b-popover.hover="'Eliminar'"
                                                                >
                                                                    <i
                                                                        class="fa fa-trash"
                                                                        v-on:click="eliminarRef(data)"
                                                                        v-show="ocultardicionar"
                                                                    ></i>
                                                                        </b-btn>
                                                                        <!--
                                            <i class="btn btn-primary fa fa-pencil" v-on:click="ActualizarRef(data,data.index)" v-show="ocultardicionar"></i>
                                        -->
                                                                        </template>


                                                                        </b-table>
                                                                        <b-pagination
                                                                            size="md"
                                                                            :total-rows="itemsdinamicos.length"
                                                                            v-model="currentPageRef"
                                                                            :per-page="3"
                                                                            v-show="camposdinamicos && itemsdinamicos.length"
                                                                        >
                                                                            </b-pagination>
                                            </b-row>
                                            </b-tab>
                                            <b-tab title="Destinatario">
                                                <b-form-row
                                                    v-show="selectservice"
                                                    class="my-1"
                                                >
                                                    <b-col md="4">
                                                        <h5 class="text-primary mt-2">Nombre:</h5>
                                                    </b-col>
                                                    <b-col md="8">
                                                        <v-select
                                                            maxHeight="500px"
                                                            label="nombre"
                                                            :filterable="false"
                                                            v-model=nombre_remitente
                                                            placeholder="Nombre"
                                                            :options="optionsremitentes"
                                                            @input="Seleccionado"
                                                            v-show="MostrarFiltro"
                                                            @search="onSearch"
                                                              v-bind:style="validatecamponombre"
                                                        >
                                                            <template slot="no-options">
                                                                <p>Nombre del destinatario..</p>
                                                            </template>
                                                            <template
                                                                slot="option"
                                                                slot-scope="option"
                                                            >
                                                                <div class="d-center">
                                                                    {{ option.nombre }}
                                                                </div>
                                                                </template>
                                                                <template
                                                                    slot="selected-option"
                                                                    scope="option"
                                                                >
                                                                    <div class="selected d-center">
                                                                        {{ option.nombre }}
                                                                    </div>
                                                                    </template>
                                                                    </v-select>
                                                    </b-col>
                                                    </b-form-row>
                                                   
                        <!--
                                                    <b-form-row
                                                        v-show="selectservice&&mostrardestinatario"
                                                        class="my-1"
                                                    >
                                                        <b-col md="4">
                                                            <h5 class="text-primary mt-2">Identificación:</h5>
                                                        </b-col>
                                                        <b-col md="8">
                                                            <b-form-input
                                                                type="number"
                                                                class="form-control form-control-sm"
                                                                placeholder="Identificación"
                                                                v-model="detalles.destinatario.numero_identificacion"
                                                                v-b-popover.hover="'Se debe diligenciar sin puntos, en caso de NIT sin número de validación, ni guión'"
                                                                title="Número de identificación"
                                                            />
                                                            
                                                        </b-col>
                                                        </b-form-row>
                                                        -->
                                                        <!-- {{nombre_remitente}} -->
                                                        <b-form-row v-show="selectservice&&mostrardestinatario ">
                                                            <b-col md="4">
                                                                <h5 class="text-primary mt-2">Dirección:</h5>
                                                            </b-col>
                                                            <b-col md="8">
                                                                <b-form-input
                                                                    v-if="GeoReferenciacion==true"
                                                                    ref="focusDireccion"
                                                                    id="direccionGoogle2"
                                                                    type="text"
                                                                    placeholder="Dirección"
                                                                    required
                                                                    maxlength="100"
                                                                    @change="initAutocomplete"
                                                                    @input="initAutocomplete"
                                                                    v-model="detalles.destinatario.direccion"
                                                                    class="form-control form-control-sm"
                                                                    :state="estado.direccion"
                                                                />
                                                                <b-form-input
                                                                    v-if="GeoReferenciacion==false"
                                                                    ref="focusDireccion"
                                                                    id="direccion"
                                                                    type="text"
                                                                    placeholder="Dirección"
                                                                    required
                                                                    maxlength="100"
                                                                    v-model="detalles.destinatario.direccion"
                                                                    class="form-control form-control-sm"
                                                                    :state="estado.direccion"
                                                                />
                                                              

                                                            </b-col>

                                                        </b-form-row>
                                                         <b-form-row
                                                            v-show="selectservice&&mostrardestinatario"
                                                            class="my-1">
                                                            <b-col md="4">
                                                                <h5 class="text-primary mt-2">Contacto:</h5>
                                                            </b-col>
                                                            <b-col md="8">
                                                                <input
                                                                    type="text"
                                                                    :style="validatecampoTel"
                                                                    class="form-control form-control-sm"
                                                                    id="nombreContacto"
                                                                    
                                                                    placeholder="Nombre de Contacto"
                                                                    
                                                                    v-model="detalles.destinatario.nombreContacto"
                                                                >
                                                            </b-col>
                                                        </b-form-row>
                                                        <b-form-row
                                                            v-show="selectservice&&mostrardestinatario"
                                                            class="my-1">
                                                            <b-col md="4">
                                                                <h5 class="text-primary mt-2">Teléfono:</h5>
                                                            </b-col>
                                                            <b-col md="8">
                                                                <input
                                                                    type="number"
                                                                    :style="validatecampoTel"
                                                                    class="form-control form-control-sm"
                                                                    id="telefono"
                                                                    @keyup="numeros(this)"
                                                                    placeholder="Teléfono"
                                                                    maxlength="10"
                                                                    pattern="\d*"
                                                                    v-model="detalles.destinatario.telefono"
                                                                >
                                                            </b-col>
                                                        </b-form-row>
                                            </b-tab>
                                            </b-tabs>
                                            <b-card-footer>
                                                <div
                                                    class="text-center"
                                                    v-show="selectservice"
                                                    variant="success"
                                                >
                                                    <b-button-group class="mt-2">
                                                        <b-btn
                                                            @click="tabIndex--"
                                                            variant="success"
                                                        >
                                                            <i
                                                                class="fa fa-chevron-left"
                                                                aria-hidden="true"
                                                            ></i>
                                                                </b-btn>
                                                                <b-btn
                                                                    @click="tabIndex++"
                                                                    variant="success"
                                                                >
                                                                    <i
                                                                        class="fa fa-chevron-right"
                                                                        aria-hidden="true"
                                                                    ></i>
                                                                        </b-btn>
                                                    </b-button-group>
                                                    </div>
                                            </b-card-footer>
                                            </b-card>

                                            <!-- <b-tabs card v-show="selectservice" v-model="tabIndex">
                            <b-tab  title="Información" class="cardPersonalizada" >
                            </b-tab>
                            <b-tab title="Detalle" :disabled="tabdinamico">
                            <b-card-body>
                            </b-card-body>
                            </b-tab>
                            <b-tab title="Destinatario">
                            <b-card-body>
                            </b-card-body>
                            </b-tab>
                    </b-tabs>
          -->

                        </b-container>
                        <div
                            slot="modal-footer"
                            class="w-100"
                        >


                            </div>
                            </b-modal>
                            <!-- Modal Editar -->
                            <b-modal
                                id="modaleditar"
                                ref="ModalEdit"
                                title="Editar Registro"
                                no-close-on-backdrop
                                no-close-on-esc
                                size="lg"
                            >
                                <div
                                    slot="modal-header"
                                    class="w-100"
                                >
                                    <b-btn
                                        class="rounded text-white"
                                        variant="danger"
                                        @click="hideModal"
                                    >
                                        <i
                                            class="fa fa-times-circle"
                                            aria-hidden="true"
                                        ></i>&#32;Cancelar
                                            </b-btn>
                                            <b-btn
                                                class="rounded float-right text-white"
                                                variant="warning"
                                                v-on:click="actualizar()"
                                            >
                                                <i class="fa fa-floppy-o"></i>&#32;Guardar
                                                </b-btn>
                                                </div>
                                                <b-container fluid>
                                                    <b-row class=" my-1">
                                                        <b-col>

                                                            <v-select
                                                                v-model="selectproductED"
                                                                label="nombre"
                                                                placeholder="Producto"
                                                                :options="productosurlED"
                                                                @input="seleccionarServicioED()"
                                                                :disabled="true"
                                                            >
                                                                </v-select>

                                                        </b-col>
                                                        <b-col>

                                                            <v-select
                                                                v-model="selectserviceED"
                                                                label="nombre"
                                                                placeholder="Servicio"
                                                                :disabled="true"
                                                                :options="serviciosurlED"
                                                                @input="camposNversionED()"
                                                            >
                                                                <!--
                      :options="serviciosurl" @input="camposNversion()">
                            -->
                                                                </v-select>
                                                        </b-col>
                                                    </b-row>
                                                    <b-card
                                                        no-body
                                                        v-show="selectserviceED"
                                                        class="border my-2"
                                                    >
                                                        <b-tabs
                                                            card
                                                            v-model="tabIndex"
                                                            class="cabecera-tabs"
                                                        >
                                                            <b-tab title="Información">
                                                                <b-row class="my-2">
                                                                    <b-col md="4">
                                                                        <h5 class="text-primary mt-2">Documento de referencia:</h5>
                                                                    </b-col>
                                                                    <b-col md="8">
                                                                        <b-form-input
                                                                            type="text"
                                                                            class="form-control form-control-sm"
                                                                            placeholder="Referencia"
                                                                            v-model="detalleseditar.referencia"
                                                                            :state="estado.referencia"
                                                                        />
                                                                    </b-col>
                                                                </b-row>
                                                                <b-row
                                                                    v-for="(data,indice) in inputsED.campos"
                                                                    :key="indice"
                                                                    v-if="data.type != 'select' && data.espieza == false"
                                                                    class="my-2"
                                                                >
                                                                    <b-col md="4">
                                                                        <h5 class="text-primary mt-2">{{data.nombre}}:</h5>
                                                                    </b-col>
                                                                    <b-col md="8">
                                                                        <input
                                                                            class="form-control form-control-sm"
                                                                            :type="data.type"
                                                                            :id="data.id"
                                                                            :style="[data.style,validatecampo]"
                                                                            :max="data.max"
                                                                            :placeholder="data.placeholder"
                                                                            @keyup="PresionoED(indice)"
                                                                            :value="valores(data.id)"
                                                                            required
                                                                        >
                                                                    </b-col>
                                                                    </b-row>
                                                                    <b-row class="my-2">
                                                                        <b-col md="4">
                                                                            <h5 class="text-primary mt-2">Contenido:</h5>
                                                                        </b-col>
                                                                        <b-col md="8">
                                                                            <b-form-input
                                                                                id="textarea1"
                                                                                type="text"
                                                                                v-model="detalleseditar.contenido"
                                                                                class="form-control-sm"
                                                                                placeholder="Contenido"
                                                                                maxlength="50"
                                                                            >
                                                                                </b-form-input>
                                                                        </b-col>
                                                                    </b-row>
                                                                    <b-form-textarea
                                                                        id="textarea1"
                                                                        v-model="detalleseditar.observaciones"
                                                                        class="form-control-sm"
                                                                        placeholder="Instrucciones a tener en cuenta para entrega, recolección y transporte."
                                                                        :rows="3"
                                                                        :max-rows="6"
                                                                    />
                                                                    <b-form-row v-show="selectservice">
                                                                        <b-col>
                                                                        </b-col>
                                                                    </b-form-row>
                                                            </b-tab>
                                                            <b-tab
                                                                title="Detalle"
                                                                :disabled="tabdinamicoED"
                                                            >
                                                                <b-row
                                                                    v-for="(data,indice) in inputsED.campos"
                                                                    :key="indice"
                                                                    v-if="data.type != 'select' && data.espieza == true"
                                                                    class="my-2"
                                                                >
                                                                    <b-col md="4">
                                                                        <h5
                                                                            class="text-primary mt-2"
                                                                            :style="[data.style]"
                                                                        >{{data.nombre}}:</h5>
                                                                    </b-col>
                                                                    <b-col md="8">
                                                                        <input
                                                                            class="form-control form-control-sm"
                                                                            :type="data.type"
                                                                            :id="data.id"
                                                                            :style="[data.style,validatecampo]"
                                                                            :max="data.max"
                                                                            :placeholder="data.placeholder"
                                                                            @keyup="PresionoED(indice)"
                                                                            required
                                                                        >
                                                                    </b-col>
                                                                    </b-row>
                                                                    <b-row v-show="ocultardicionarED">
                                                                        <b-col class="d-flex flex-row-reverse">
                                                                            <b-btn
                                                                                variant="outline-success"
                                                                                active-class
                                                                                class="float-right"
                                                                                @click="adicionarRefED"
                                                                                v-show="camposdinamicos"
                                                                            >
                                                                                <i class="fa fa-plus"></i>
                                                                                </b-btn>
                                                                        </b-col>
                                                                    </b-row>
                                                                    <b-row v-show="ocultareditarED">
                                                                        <b-col class="d-flex flex-row-reverse">
                                                                            <b-btn
                                                                                variant="outline-success"
                                                                                active-class
                                                                                class="float-right"
                                                                                @click="UpdateDinamicoED"
                                                                                v-show="camposdinamicos"
                                                                            >
                                                                                <i class="fa fa-pencil"></i>
                                                                                </b-btn>
                                                                        </b-col>
                                                                    </b-row>
                                                                    <b-row>
                                                                        <b-table
                                                                            striped
                                                                            hover
                                                                            :items="itemsdinamicos"
                                                                            :fields="fieldsdinamicos"
                                                                            :per-page="3"
                                                                            :current-page="currentPageRef"
                                                                            v-show="camposdinamicos"
                                                                        >
                                                                            <template
                                                                                slot="eliminar"
                                                                                slot-scope="data"
                                                                            >
                                                                                <b-btn
                                                                                    v-on:click="eliminarRef(data)"
                                                                                    v-show="ocultardicionarED"
                                                                                >
                                                                                    <i
                                                                                        class="fa fa-trash"
                                                                                        v-on:click="eliminarRef(data)"
                                                                                        v-show="ocultardicionarED"
                                                                                    ></i>
                                                                                        </b-btn>
                                                                                        <!--
                              <i class="btn btn-danger fa fa-trash" v-on:click="eliminarRef(data)" v-show="ocultardicionarED"
                              v-b-popover.hover="'Permite eliminar'" title="Popover Title" ></i>
                              -->
                                                                                        </template>
                                                                                        <template
                                                                                            slot="actualizar"
                                                                                            slot-scope="data"
                                                                                        >
                                                                                            <i
                                                                                                class="btn btn-primary fa fa-pencil"
                                                                                                v-on:click="ActualizarRefED(data,data.index)"
                                                                                                v-show="ocultardicionarED"
                                                                                                v-b-popover.hover="'Permite Actualizar'"
                                                                                            ></i>
                                                                                                </template>
                                                                                                </b-table>
                                                                                                <b-pagination
                                                                                                    size="md"
                                                                                                    :total-rows="itemsdinamicos.length"
                                                                                                    v-model="currentPageRef"
                                                                                                    :per-page="3"
                                                                                                    v-show="camposdinamicos"
                                                                                                >
                                                                                                    </b-pagination>
                                                                    </b-row>
                                                                    </b-tab>
                                                                    <b-tab title="Destinatario">
                                                                        <b-form-row class="my-1">
                                                                            <b-col>
                                                                                <h5 class="text-primary mt-2">Nombre:</h5>
                                                                            </b-col>
                                                                            <b-col cols="9">
                                                                                <v-select
                                                                                    maxHeight="500px"
                                                                                    label="nombre"
                                                                                    :filterable="false"
                                                                                    v-model=destinatarioED
                                                                                    placeholder="Nombre"
                                                                                    :options="optionsremitentes"
                                                                                    @input="SeleccionadoED"
                                                                                    @search="onSearchED"
                                                                                >
                                                                                    <template slot="no-options">
                                                                                        <p>Nombre del destinatario..</p>
                                                                                    </template>
                                                                                    <template
                                                                                        slot="option"
                                                                                        slot-scope="option"
                                                                                    >
                                                                                        <div class="d-center">
                                                                                            {{ option.nombre }}
                                                                                        </div>
                                                                                        </template>
                                                                                        <template
                                                                                            slot="selected-option"
                                                                                            scope="option"
                                                                                        >
                                                                                            <div class="selected d-center">
                                                                                                {{ option.nombre }}
                                                                                            </div>
                                                                                            </template>
                                                                                            </v-select>
                                                                            </b-col>
                                                                        </b-form-row>
                                                                        
                                                                    <b-form-row class="my-1">
                                                                        <b-col>
                                                                            <h5 class="text-primary mt-2">Direccion:</h5>
                                                                        </b-col>
                                                                        <b-col>
                                                                            <b-form-input
                                                                                type="text"
                                                                                class="form-control form-control-sm"
                                                                                placeholder="Indentidicación"
                                                                                v-model="detalleseditar.destinatario.direccion"
                                                                                
                                                                                :state="null"
                                                                                v-b-popover.hover="'Se debe diligenciar sin puntos, en caso de NIT sin numero de validación, ni guion'"
                                                                                title="Num. Identificacion"
                                                                            ></b-form-input>
                                                                                
                                                                        </b-col>
                                                                    </b-form-row>
                                                                    <b-form-row class="my-1">
                                                            <b-col md="4">
                                                                <h5 class="text-primary mt-2">Dirección:</h5>
                                                            </b-col>
                                                            <b-col md="8">
                                                                <b-form-input
                                                                    v-if="GeoReferenciacion==true"
                                                                    ref="focusDireccion"
                                                                    id="direccionGoogle3"
                                                                    type="text"
                                                                    placeholder="Dirección"
                                                                    required
                                                                    maxlength="100"
                                                                    @change="initAutocomplete"
                                                                    @input="initAutocomplete"
                                                                    v-model="detalleseditar.destinatario.direccion"
                                                                    class="form-control form-control-sm"
                                                                    :state="estado.direccion"
                                                                />
                                                                <b-form-input
                                                                    v-if="GeoReferenciacion==false"
                                                                    ref="focusDireccion"
                                                                    id="direccion"
                                                                    type="text"
                                                                    placeholder="Dirección"
                                                                    required
                                                                    maxlength="100"
                                                                    v-model="detalleseditar.destinatario.direccion"
                                                                    class="form-control form-control-sm"
                                                                    :state="estado.direccion"
                                                                />
                                                              

                                                            </b-col>

                                                        </b-form-row>

                                                                        <b-form-row class="my-1">
                                                                            <b-col>
                                                                                <h5 class="text-primary mt-2">Contacto:</h5>
                                                                            </b-col>
                                                                            <b-col>
                                                                                <b-form-input
                                                                                    type="text"
                                                                                    class="form-control form-control-sm"
                                                                                    placeholder="Indentidicación"
                                                                                    v-model="detalleseditar.destinatario.nombreContacto"
                                                                                   
                                                                                    :state="null"
                                                                                    v-b-popover.hover="'Se debe diligenciar sin puntos, en caso de NIT sin numero de validación, ni guion'"
                                                                                    title="Num. Identificacion"
                                                                                ></b-form-input>
                                                                                   
                                                                            </b-col>
                                                                        </b-form-row>
                                                                        <b-form-row class="my-1">
                                                                            <b-col>
                                                                                <h5 class="text-primary mt-2">Teléfono:</h5>
                                                                            </b-col>
                                                                            <b-col>
                                                                                <input
                                                                                    type="text"
                                                                                    :style="validatecampoTel"
                                                                                    class="form-control form-control-sm"
                                                                                    id="telefonoedit"
                                                                                    @keyup="numeroseditar(this)"
                                                                                    placeholder="Telefono"
                                                                                    v-model="detalleseditar.destinatario.telefono"
                                                                                >
                                                                            </b-col>
                                                                        </b-form-row>
                                                                    </b-tab>
                                                                    </b-tabs>
                                                                    </b-card>
                                                </b-container>
                                                <div
                                                    slot="modal-footer"
                                                    class="w-100"
                                                ></div>
                                                    </b-modal>
                                                    </b-container>
</template>


<script>
import {
    bus
} from "../main";
import {
    urlservicios
} from "../main";
import Preload from "../componentes/preload.vue";
let detallepr;
import moment from 'moment'
import moment2 from 'moment-timezone';
export default {
    components: {
        Preload
    },
    data() {
        return {
            validatecamponombre:'',
            GeoReferenciacion: false,
            validacionDireccion: true,
            observacionesGeneral: '',
            MostrarFiltro: true,
            monstrarNombre: true,
            destinatarioED: "",
            lati: '',
            longi: '',
            posta: '',
            nombre_remitente: {
                _id: (""),
                numero_identificacion: '',
                direccion: "",
                nombre: "",
                telefono: "",
                id_cliente: '',
                __v: 0,
                latitud: '',
                longitud: '',
                codigo_postal: ""
            },
            optionsremitentes: [],
            pruebas: {
                "background-color": "#ebeaea",
                " border-bottom-color": "#495057",
                " border-top": "none"
            },
            tabIndexED: 0,
            tabdinamico: false,
            tabIndex: 0,
            items: [{
                    text: "Inicio",
                    to: "/inicio"
                },
                {
                    text: "Generación Orden",
                    to: "/inicio/orden",
                    active: true
                },
                {
                    text: "Detalle Orden de Servicio",
                    to: "/inicio/ordenservicio",
                    active: true
                }
            ],
            ocultardicionarED: true,
            ocultareditarED: false,
            ocultardicionar: true,
            ocultareditar: false,
            indicedinamico: "",
            camposdinamicos: false,
            currentPageRef: 1,
            itemsdinamicos: [],
            fieldsdinamicos: [],
            prueba: "",
            mostrardestinatario: true,
            creaciondestinatarios: "",
            identificacion: "",
            estado: {
                direccion: null,
                nombre: null,
                telefono: null,
                referencia: null
            },
            validatecampo: "",
            validatecampoTel: "",
            mostrar: true,
            habilitar: true,
            load: false,
            selection: "",
            pruebas: "",
            currentPage: 1,
            fields: [
                "eliminar",
                {
                    key: "productoslocal",
                    label: "Productos"
                },
                {
                    key: "servicioslocal",
                    label: "Servicios"
                },
                "editar"
            ],
            DetalleServicio: [],
            remitentes: [],
            tabdinamicoED: false,
            productosurl: [],
            selectproducto: {},
            productosurlED: [],
            selectproductED: null,
             validatecampo: "", 
            selectserviceED: null,
            serviciosurlED: [],
            selectservice: null,
            serviciosurl: [],
            selectservice: null,
            selectproduct: null,
            selectservicio: {},
            inputs: "",
            objeto: "",
            detallesc: "",
            detalles: {
                destinatario: {
                    numero_identificacion: "",
                    _id: "",
                    nombre: "",
                    direccion: "",
                    telefono: "",
                    latitud: '',
                    longitud: '',
                    codigo_postal: ''
                },
                infor: {},
                referencia: "",
                observaciones: "",
                contenido: ""
            },
            detalleseditar: {
                destinatario: {
                    numero_identificacion: "",
                    _id: "",
                    nombre: "",
                    direccion: "",
                    telefono: "",
                    latitud: '',
                    longitud: '',
                    codigo_postal: ''
                },
                infor: {},
                referencia: "",
                observaciones: "",
                contenido: ""
            },
            inputsED: ""
        };
    },
    watch: {},
    methods: {
        volver(){
            console.log("entro a volver");
            console.log(this.DetalleServicio);
            localStorage.setItem("DetalleServicio", JSON.stringify(this.DetalleServicio));
            localStorage.setItem("ObservacionesGenerales", JSON.stringify(this.observacionesGeneral));
            this.$router.replace("/inicio/orden");

        },
        cambiotab(tabIndex) {
            console.log("cambio tab");

            console.log(tabIndex);
            this.initAutocomplete()

        },
        initAutocompleteED() {
            var options = {
                componentRestrictions: {
                    country: 'co'
                }
            };
            var longi
            var latit
            var codpostal
            var input = document.getElementById('direccionGoogle3');
            var searchBox = new google.maps.places.Autocomplete(input);
            searchBox.setComponentRestrictions({
                'country': ['co']
            })
            //console.log(searchBox);
            searchBox.addListener('place_changed', function () {
                input.value = input.value.split(',')[0];
                var places = searchBox.getPlace();

                if (places.length == 0) {
                    return;
                } else {
                    if (!places.geometry) {
                        console.log("no tengo latitud");
                    } else {
                        console.log("tengo lati y longi");
                        this.lati = places.geometry.location.lat()
                        this.longi = places.geometry.location.lng()
                    }
                    for (var i = 0; i < places.address_components.length; i++) {
                        for (var j = 0; j < places.address_components[i].types.length; j++) {
                            if (places.address_components[i].types[j] == "postal_code") {
                                console.log("tengo codigo");
                                this.posta = places.address_components[i].long_name;

                            }
                        }
                    }
                }

                /*
                places.forEach(function(place){
                    if(!place.geometry) {
                        return;
                    }
                    console.log(place);
                    console.log("----------------");
                    latit=place.geometry.location.lat()
                    longi=place.geometry.location.lng()

                    //this.lati=place.geometry.location.lat()
                    //this.longi=place.geometry.location.lng()
                    //this.posta
                    for (var i = 0; i < place.address_components.length; i++) {
                    for (var j = 0; j < place.address_components[i].types.length; j++) {
                        if (place.address_components[i].types[j] == "postal_code") {
                      //  this.posta = place.address_components[i].long_name;

                        }
                    }
                    }
                    console.log("-----------");
                    console.log(latit);
                    console.log(longi);
                    console.log(this.posta);
                    this.lati=latit
                    this.longi=longi

                   // document.getElementById('lat').innerHTML = place.geometry.location.lat();
                    //document.getElementById('lng').innerHTML = place.geometry.location.lng();
                }.bind(this));
                */
            }.bind(this));
            //input.value=input.value.split(',')[0];


        },
        initAutocomplete() {

            var longi
            var latit
            var codpostal
            var input = document.getElementById('direccionGoogle2');
            var searchBox = new google.maps.places.Autocomplete(input);
            //console.log(searchBox);
            searchBox.setComponentRestrictions({
                'country': ['co']
            })
            searchBox.addListener('place_changed', function () {
                input.value = input.value.split(',')[0];
                var places = searchBox.getPlace();
                console.log(places);
                if (places.length == 0) {
                    return;
                } else {
                    if (!places.geometry) {
                        console.log("no tengo latitud");
                    } else {
                        console.log("tengo lati y longi");
                        this.lati = places.geometry.location.lat()
                        this.longi = places.geometry.location.lng()
                    }
                    for (var i = 0; i < places.address_components.length; i++) {
                        for (var j = 0; j < places.address_components[i].types.length; j++) {
                            if (places.address_components[i].types[j] == "postal_code") {
                                console.log("tengo codigo");
                                this.posta = places.address_components[i].long_name;

                            }
                        }
                    }
                }

                /*
                places.forEach(function(place){
                    if(!place.geometry) {
                        return;
                    }
                    console.log(place);
                    console.log("----------------");
                    latit=place.geometry.location.lat()
                    longi=place.geometry.location.lng()

                    //this.lati=place.geometry.location.lat()
                    //this.longi=place.geometry.location.lng()
                    //this.posta
                    for (var i = 0; i < place.address_components.length; i++) {
                    for (var j = 0; j < place.address_components[i].types.length; j++) {
                        if (place.address_components[i].types[j] == "postal_code") {
                      //  this.posta = place.address_components[i].long_name;

                        }
                    }
                    }
                    console.log("-----------");
                    console.log(latit);
                    console.log(longi);
                    console.log(this.posta);
                    this.lati=latit
                    this.longi=longi

                   // document.getElementById('lat').innerHTML = place.geometry.location.lat();
                    //document.getElementById('lng').innerHTML = place.geometry.location.lng();
                }.bind(this));
                */
            }.bind(this));
            //input.value=input.value.split(',')[0];


        },
        localizarED() {
            var dir
            var longi
            var latit
            var codpostal
            if (this.detalleseditar.destinatario.direccion == undefined || this.detalleseditar.destinatario.direccion == '') {} else {
                setTimeout(function () {
                    dir = this.detalleseditar.destinatario.direccion + ', Colombia'
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        'address': dir,
                        country: "CO"
                    }, function (results, status) {
                        if (status === 'OK') {
                            results[0].address_components.forEach(element => {
                                if (element.types[0] == 'postal_code') {
                                    codpostal = results[0].address_components[7].long_name
                                }
                            });
                            var resultados = results[0].geometry.location,

                                resultados_lat = resultados.lat(),
                                resultados_long = resultados.lng();

                            longi = resultados_long
                            latit = resultados_lat
                            //codpostal=results[0].address_components[7].long_name

                            this.lati = latit
                            this.longi = longi
                            this.posta = codpostal
                        } else {
                            var mensajeError = "";
                            if (status === "ZERO_RESULTS") {
                                mensajeError = "No hubo resultados para la dirección ingresada.";
                            } else if (status === "OVER_QUERY_LIMIT" || status === "REQUEST_DENIED" || status === "UNKNOWN_ERROR") {
                                mensajeError = "Error general del mapa.";
                            } else if (status === "INVALID_REQUEST") {
                                mensajeError = "Error de la web. Contacte con Name Agency.";
                            }
                            alert(mensajeError);
                        }

                    }.bind(this));
                }.bind(this), 399)
            }



        },

        SeleccionadoED() {
            console.log(this.destinatarioED);
            if (this.destinatarioED == null || this.destinatarioED == 'null') {
                //this.detalleseditar.destinatario.numero_identificacion = ''
                this.detalleseditar.destinatario.direccion = ''
                this.detalleseditar.destinatario.telefono = ''
                this.detalleseditar.destinatario.nombre = ''
                this.detalleseditar.destinatario.latitud = ''
                this.detalleseditar.destinatario.longitud = ''
                this.detalleseditar.destinatario.codigo_postal = ''
            } else {
                this.detalleseditar.destinatario = this.destinatarioED
                this.$nextTick(() => {
                    //this.$refs.focusDireccionED.focus();
                });
            }
            /*
            this.detalleseditar.destinatario.identificacion = this.nombre_remitente.numero_identificacion;
            this.detalleseditar.destinatario.direccion = this.nombre_remitente.direccion;
            this.detalleseditar.destinatario.telefono = this.nombre_remitente.telefono;
            this.detalleseditar.destinatario.nombre = this.nombre_remitente.nombre;
            this.detalleseditar.destinatario.latitud = this.nombre_remitente.latitud;
            this.detalleseditar.destinatario.longitud = this.nombre_remitente.longitud;
            this.detalleseditar.destinatario.codigo_postal = this.nombre_remitente.codigo_postal;
            */
        },
        onSearchED(search) {
            //this.nombre_remitente=search
            //loading(true);
            if (search.length >= 3) {
                 this.searchED(search, this);
            }
           
        },
        searchED(search) {
            setTimeout(function () {
                this.axios.get(urlservicios+ `/obtenerDestinatarioNombre/${escape(search)}`)
                    .then(response => {
                        if (response.data.destinatarios.length == 0) {
                            this.optionsremitentes = []

                            //this.remitente={}
                            this.detalleseditar.destinatario.nombre = search
                            //this.destinatarioED.numero_identificacion = ''
                            this.destinatarioED.direccion = ''
                            this.destinatarioED.telefono = ''
                        } else {

                            this.optionsremitentes = response.data.destinatarios
                        }
                        /*
                        this.optionsdestinatarios=response.data.destinatarios
                        loading(false);
                        */
                    })

            }.bind(this), 1000);


        },

        localizar() {
            var dir
            var longi
            var latit
            var codpostal
            if (this.detalles.destinatario.direccion == undefined || this.detalles.destinatario.direccion == '') {} else {
                setTimeout(function () {
                    dir = this.detalles.destinatario.direccion + ', Colombia'
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        'address': dir,
                        country: "CO"
                    }, function (results, status) {
                        if (status === 'OK') {
                            results[0].address_components.forEach(element => {
                                if (element.types[0] == 'postal_code') {
                                    codpostal = results[0].address_components[7].long_name
                                }
                            });
                            var resultados = results[0].geometry.location,

                                resultados_lat = resultados.lat(),
                                resultados_long = resultados.lng();

                            longi = resultados_long
                            latit = resultados_lat
                            //codpostal=results[0].address_components[7].long_name

                            this.lati = latit
                            this.longi = longi
                            this.posta = codpostal
                        } else {
                            var mensajeError = "";
                            if (status === "ZERO_RESULTS") {
                                mensajeError = "No hubo resultados para la dirección ingresada.";
                            } else if (status === "OVER_QUERY_LIMIT" || status === "REQUEST_DENIED" || status === "UNKNOWN_ERROR") {
                                mensajeError = "Error general del mapa.";
                            } else if (status === "INVALID_REQUEST") {
                                mensajeError = "Error de la web. Contacte con Name Agency.";
                            }
                            alert(mensajeError);
                        }

                    }.bind(this));
                }.bind(this), 300)
            }



        },

        Seleccionado() {
            if (this.nombre_remitente == null || this.nombre_remitente == "null") {

                //this.detalles.destinatario.numero_identificacion = ''
                this.detalles.destinatario.nombre = ''
                this.detalles.destinatario.direccion = ''
                this.detalles.destinatario.telefono = ''

            } else {
                this.detalles.destinatario = this.nombre_remitente
                this.$nextTick(() => {
                    //this.$refs.focusDireccion.focus();
                });

            }
            console.log(this.nombre_remitente);
            /*
      this.detalles.destinatario.numero_identificacion = this.nombre_remitente.numero_identificacion;
      this.detalles.destinatario.direccion = this.nombre_remitente.direccion;
      this.detalles.destinatario.telefono = this.nombre_remitente.telefono;
      //this.detalles.destinatario.nombre = this.nombre_remitente.nombre;
      this.detalles.destinatario.latitud = this.nombre_remitente.latitud;
      this.detalles.destinatario.longitud = this.nombre_remitente.longitud;
      this.detalles.destinatario.codigo_postal = this.nombre_remitente.codigo_postal;
       this.detalles.destinatario._id =this.nombre_remitente._id
       */
        },
        onSearch(search) {
            //this.nombre_remitente=search
            //loading(true);
            if (search.length >= 3) {
                this.search(search, this);
            }
            
        },
        search(search) {
            setTimeout(function () {
                this.axios.get(urlservicios+ `/obtenerDestinatarioNombre/${escape(search)}`)
                    .then(response => {
                        if (response.data.destinatarios.length == 0) {
                            this.optionsremitentes = []
                            this.nombre_remitente = {}
                            this.nombre_remitente.nombre = search
                            this.nombre_remitente.direccion = ''
                            this.nombre_remitente.telefono = ''
                            //this.remitente={}
                            //this.detalles.destinatario.nombre=search
                            //this.monstrarNombre=true
                            //this.MostrarFiltro=false
                            //this.nombre_remitente=search
                        } else {
                            this.optionsremitentes = response.data.destinatarios
                            //this.monstrarNombre=false
                            //his.MostrarFiltro=true
                        }
                        /*
                        this.optionsdestinatarios=response.data.destinatarios
                        loading(false);
                        */
                    })

            }.bind(this), 1000);


        },
        abirmodal() {
            this.selectservice = null;
            this.selectproduct = null;
            var login = localStorage.getItem("storedData");
            var infologin = JSON.parse(login);

            var load = true;
            setTimeout(() => {
                bus.$emit("load", {
                    load
                });
            });
            this.axios
                .get(urlservicios+ "productos/" + infologin.id_OperadorLogistico._id)
                .then(response => {
                    this.productosurl = response.data;
                    //this.productosurl.unshift(vacio);
                    var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });

                    this.$refs.Modal.show();
                })
                .catch(function (error) {
                    var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                    swal("Error", "Intente nuevamente, por favor", "warning");
                });
        },
        UpdateDinamico(value) {
            var objellaves = Object.keys(this.itemsdinamicos[0]);
            var tituloopciones = {};

            for (var x = 0; x < this.inputs.campos.length; x++) {
                if (this.inputs.campos[x].espieza == true) {
                    for (var y = 0; y < objellaves.length; y++) {
                        if (this.inputs.campos[x].vmodel == objellaves[y]) {
                            eval(
                                "this.objeto." +
                                this.inputs.campos[x].vmodel +
                                "=" +
                                document.getElementById(this.inputs.campos[x].id).value
                            );
                            tituloopciones[objellaves[y]] = eval(
                                "this.objeto." + objellaves[y]
                            );
                            document.getElementById(this.inputs.campos[x].id).value = "";
                        }
                    }
                }
            }

            if (this.indicedinamico == 0 && this.currentPageRef == 1) {
                this.itemsdinamicos.splice(this.indicedinamico, 1);
                this.itemsdinamicos.splice(this.indicedinamico, 0, tituloopciones);
            } else {
                if (this.currentPageRef == 1) {
                    this.itemsdinamicos.splice(this.indicedinamico, 1);
                    this.itemsdinamicos.splice(this.indicedinamico, 0, tituloopciones);
                } else {
                    this.itemsdinamicos.splice(this.indicedinamico + 3, 1);
                    this.itemsdinamicos.splice(
                        this.indicedinamico + 3,
                        0,
                        tituloopciones
                    );
                }
            }
            this.ocultardicionar = true;
            this.ocultareditar = false;
        },
        UpdateDinamicoED(value) {
            var objellaves = Object.keys(
                this.DetalleServicio[this.indices].detalleslocal.infor
            );
            var indiceobjdina;
            if (this.currentPageRef == 1) {
                indiceobjdina = this.indicedinamico;
            } else {
                indiceobjdina = 3 + this.indicedinamico;
            }
            for (var x = 0; x < this.inputsED.campos.length; x++) {
                if (this.inputsED.campos[x].espieza == true) {
                    for (var y = 0; y < objellaves.length; y++) {
                        if (this.inputsED.campos[x].vmodel == objellaves[y]) {
                            eval(
                                "this.DetalleServicio[this.indices].detalleslocal.infor.objetoUnidades[indiceobjdina]." +
                                objellaves[y] +
                                "=" +
                                document.getElementById(this.inputsED.campos[x].id).value
                            );
                            document.getElementById(this.inputsED.campos[x].id).value = "";
                        }
                    }
                }
            }
            this.ocultardicionarED = true;
            this.ocultareditarED = false;
        },
        ActualizarRefED(value, value2) {
            this.indicedinamico = value2;
            var objellaves = Object.keys(value.item);
            this.ocultardicionarED = false;
            this.ocultareditarED = true;
            for (var x = 0; x < this.inputsED.campos.length; x++) {
                if (this.inputsED.campos[x].espieza == true) {
                    for (var y = 0; y < objellaves.length; y++) {
                        if (this.inputsED.campos[x].vmodel == objellaves[y]) {
                            document.getElementById(this.inputsED.campos[x].id).value = eval(
                                "value.item." + objellaves[y]
                            );
                        }
                    }
                }
            }
        },
        ActualizarRef(value, value2) {
            this.indicedinamico = value2;
            var objellaves = Object.keys(value.item);
            this.ocultardicionar = false;
            this.ocultareditar = true;
            for (var x = 0; x < this.inputs.campos.length; x++) {
                if (this.inputs.campos[x].espieza == true) {
                    for (var y = 0; y < objellaves.length; y++) {
                        if (this.inputs.campos[x].vmodel == objellaves[y]) {
                            document.getElementById(this.inputs.campos[x].id).value = eval(
                                "value.item." + objellaves[y]
                            );
                        }
                    }
                }
            }
        },
        eliminarRef(value) {
            this.itemsdinamicos.splice(value.index, 1);
        },
        adicionarRefED() {
            var objetollaves = Object.keys(this.inputsED.objeto);
            var tituloopciones = {};
            var bandera = true;
            var resumen = this.DetalleServicio[this.indices].detalleslocal.infor
                .objetoUnidades;
            for (var x = 0; x < this.inputsED.campos.length; x++) {
                if (this.inputsED.campos[x].espieza == true) {
                    for (var y = 0; y < objetollaves.length; y++) {
                        if (this.inputsED.campos[x].vmodel == objetollaves[y]) {
                            if (
                                document.getElementById(this.inputsED.campos[x].id).value ==
                                "" ||
                                document.getElementById(this.inputsED.campos[x].id).value ==
                                null
                            ) {
                                bandera = false;
                            } else {
                                tituloopciones[objetollaves[y]] = eval(
                                    "this.DetalleServicio[this.indices].detalleslocal.infor." +
                                    objetollaves[y]
                                );
                                document.getElementById(this.inputsED.campos[x].id).value = "";
                            }
                        }
                    }
                }
            }
            if (bandera == false) {
                swal("Error!", "Revise los campos", "error");
            } else {
                bandera = true;
                this.itemsdinamicos.unshift(tituloopciones);
            }
        },
        adicionarRef() {
            var objetollaves = Object.keys(this.inputs.objeto);
            var tituloopciones = {};
            var opciones = [];
            var bandera = true;
            for (var x = 0; x < this.inputs.campos.length; x++) {
                if (this.inputs.campos[x].espieza == true) {
                    for (var y = 0; y < objetollaves.length; y++) {
                        if (this.inputs.campos[x].vmodel == objetollaves[y]) {
                            //aca creamos la llave y le asignamos el valor correspondiente
                            tituloopciones[objetollaves[y]] = eval(
                                "this.objeto." + objetollaves[y]
                            );
                            if (
                                document.getElementById(this.inputs.campos[x].id).value == "" ||
                                document.getElementById(this.inputs.campos[x].id).value == null
                            ) {
                                bandera = false;
                            } else {
                                document.getElementById(this.inputs.campos[x].id).value = "";
                                eval("this.objeto." + this.inputs.campos[x].vmodel + '=""');

                                /*

                                  if(this.inputs.campos[x].vmodel=='unidades'){
                                  if(this.itemsdinamicos.length==0)
                                  {
                                    eval('this.objeto.'+objetollaves[y]+'='+1)
                                  }
                                  else{
                                    eval('this.objeto.'+objetollaves[y]+'='+this.itemsdinamicos.length+ eval('this.objeto.'+objetollaves[y]))
                                  }

                                }
                                */
                            }
                        }
                    }
                }
            }
            if (bandera == false) {
                swal("Error !", "Revise los campos", "error");
            } else {
                bandera = true;
                var fields = Object.keys(tituloopciones);
                //fields.push("eliminar");
                fields.push("acciones");

                this.fieldsdinamicos = fields;
                this.itemsdinamicos.unshift(tituloopciones);
            }
        },
        
        numeroseditar(valor) {
            var a = document.getElementById("telefonoedit").value;
            //var x=check.which;
            //var x = a.charCode;
            var x = a.keyCode;
            if (!(a >= 48 || a <= 57)) {
                swal("Oops...", "Solo deben ser numeros !", "error");
                this.validatecampoTel = {
                    border: "1px solid  #ff8080"
                };
                return (document.getElementById("telefonoedit").value = "");
            } else if (a.length >= 11) {
                // if no is more then the value
                swal("Oops...", "Maximo 10 digitos!", "error");
                this.validatecampoTel = {
                    border: "1px solid  #ff8080"
                };
                return (document.getElementById("telefonoedit").value = "");
            }
        },
        numeros(valor) {
            var a = document.getElementById("telefono").value;
            //var x=check.which;
            //var x = a.charCode;
            var x = a.keyCode;
            if (!(a >= 48 || a <= 57)) {
                swal("Oops...", "Solo deben ser numeros !", "error");
                this.validatecampoTel = {
                    border: "1px solid  #ff8080"
                };
                return (document.getElementById("telefono").value = "");
            } else if (a.length >= 11) {
                // if no is more then the value
                swal("Oops...", "Maximo 10 digitos!", "error");
                this.validatecampoTel = {
                    border: "1px solid  #ff8080"
                };
                return (document.getElementById("telefono").value = "");
            }
        },
        PresionoED(index) {
            this.validatecampo = "";
            var cero = "";
            setTimeout(
                function () {
                    if (this.inputsED.campos[index].type == "text") {
                        if (
                            document.getElementById(this.inputsED.campos[index].id).value ==
                            ""
                        ) {
                            //eval("this.objeto." + this.inputs.campos[index].vmodel + "= null");
                            eval(
                                "this.detalleseditar.infor." +
                                this.inputsED.campos[index].vmodel +
                                "= null"
                            );
                        } else {
                            eval(
                                "this.detalleseditar.infor." +
                                this.inputsED.campos[index].vmodel +
                                "=" +
                                "document.getElementById(this.inputsED.campos[index].id).value"
                            );
                        }
                    } else {
                        if (
                            document.getElementById(this.inputsED.campos[index].id).value ==
                            ""
                        ) {
                            eval(
                                "this.detalleseditar.infor." +
                                this.inputsED.campos[index].vmodel +
                                "= null"
                            );
                        } else {
                            eval(
                                "this.detalleseditar.infor." +
                                this.inputsED.campos[index].vmodel +
                                "=" +
                                document.getElementById(this.inputsED.campos[index].id).value
                            );
                        }
                    }
                }.bind(this)
            );
        },
        valores(dato) {
            return eval("this.detalleseditar.infor." + dato);
        },
        actualizar() {
            this.validatecampoTel = "";
            var pivoteedi = false;
            this.estado.nombre = null;
            this.estado.direccion = null;
            this.estado.referencia = null;

            if (this.detalleseditar.infor.objetoUnidades.length == 0) {} else {
                var objetollaves = Object.keys(this.detalleseditar.infor);

                var objdinamico = Object.keys(
                    this.detalleseditar.infor.objetoUnidades[0]
                );
                var totales = {};
                var algo = 0;

                for (var y = 0; y < this.itemsdinamicos.length; y++) {
                    for (var x = 0; x < this.inputsED.campos.length; x++) {
                        for (var z = 0; z < objdinamico.length; z++) {
                            if (
                                this.inputsED.campos[x].espieza == true &&
                                this.inputsED.campos[x].type == "number"
                            ) {
                                if (objdinamico[z] == this.inputsED.campos[x].vmodel) {
                                    if (y == 0) {
                                        algo = eval(
                                            "this.itemsdinamicos[y]." +
                                            this.inputsED.campos[x].acumulaen
                                        );
                                        totales[this.inputsED.campos[x].acumulaen] = algo;
                                        algo = 0;
                                    } else {
                                        var anterior = totales[this.inputsED.campos[x].acumulaen];

                                        anterior =
                                            anterior +
                                            eval(
                                                "this.itemsdinamicos[y]." +
                                                this.inputsED.campos[x].acumulaen
                                            );

                                        totales[this.inputsED.campos[x].acumulaen] = anterior;
                                    }
                                }

                                //algo=algo+eval('this.itemsdinamicos[y].'+this.inputsED.campos[x].acumulaen)
                                //totales[this.inputsED.campos[x].acumulaen]=algo
                                //totales[this.inputs.campos[x].acumulaen]=eval('this.itemsdinamicos[y].'+this.inputs.campos[x].acumulaen)+totales[this.inputs.campos[x].acumulaen]
                            }
                            if (
                                this.inputsED.campos[x].espieza == true &&
                                this.inputsED.campos[x].type == "text"
                            ) {
                                //algo=algo+eval('this.itemsdinamicos[y].'+this.inputs.campos[x].acumulaen)
                                totales[
                                    this.inputsED.campos[x].acumulaen
                                ] = this.itemsdinamicos.length;
                                //totales[this.inputs.campos[x].acumulaen]=eval('this.itemsdinamicos[y].'+this.inputs.campos[x].acumulaen)+totales[this.inputs.campos[x].acumulaen]
                            }
                        }
                    }
                }
                var objtotal = Object.keys(totales);

                for (var x = 0; x < objtotal.length; x++) {
                    eval(
                        "this.detalleseditar.infor." +
                        objtotal[x] +
                        "=" +
                        totales[objtotal[x]]
                    );
                }
            }

            if (
                this.detalleseditar.destinatario.nombre == "" ||
                this.detalleseditar.destinatario.direccion == "" ||
                //this.detalleseditar.referencia==""||
                pivoteedi == true ||
                this.detalleseditar.destinatario.telefono == ""
            ) {
                if (this.detalleseditar.destinatario.telefono == "") {
                    this.validatecampoTel = {
                        border: "1px solid  #ff8080"
                    };
                    swal("Oops...", "Falto algun campo por completar!", "error");
                }
                if (this.detalleseditar.destinatario.nombre == "") {
                    this.estado.nombre = false;
                    swal("Oops...", "Falto algun campo por completar!", "error");
                }
                if (this.detalleseditar.destinatario.direccion == "") {
                    this.estado.direccion = false;
                    swal("Oops...", "Falto algun campo por completar!", "error");
                }
            } else {
                var detalleslocal = this.detalleseditar;
                var productoslocal = this.selectproducto;
                var servicioslocal = this.selectservicio;
                var detalles = {
                    trazabilidad: [],
                    servicioslocal: servicioslocal,
                    productoslocal: productoslocal,
                    detalleslocal: detalleslocal
                };
                var inforemitente = localStorage.getItem("orden");
                var inforemi = JSON.parse(inforemitente);
                if (this.optionsremitentes.length == 0) {
                    var load = true;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });

                    });
                    var objetocrear = {
                        //numero_identificacion: this.detalleseditar.destinatario.numero_identificacion,
                        direccion: this.detalleseditar.destinatario.direccion,
                        nombre: this.detalleseditar.destinatario.nombre,
                        telefono: this.detalleseditar.destinatario.telefono,
                        nombreContacto: this.detalleseditar.destinatario.nombreContacto,
                        //id_cliente: this.remitente.id_cliente,
                        latitud: this.lati,
                        longitud: this.longi,
                        codigo_postal: this.posta,
                        id_cliente: inforemi.selected_client._id
                    };
                    console.log("creo destinatario");
                    console.log(objetocrear);
                    this.axios.post(urlservicios+ "CrearDestinatario", objetocrear)
                        .then(response => {
                            console.log("se creo correcto");
                            console.log(response);
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });

                            });
                        })
                } else {
                    //detallepr=Object.assign({},this.detalles.destinatario);
                    var load = true;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });

                    });
                    var objetoactualizar = {
                        //numero_identificacion: this.detalleseditar.destinatario.numero_identificacion,
                        direccion: this.detalleseditar.destinatario.direccion,
                        //nombre: this.detalleseditar.destinatario.nombre,
                        nombreContacto: this.detalleseditar.destinatario.nombreContacto,
                        telefono: this.detalleseditar.destinatario.telefono,
                        //id_cliente: this.remitente.id_cliente,
                        latitud: this.lati,
                        longitud: this.longi,
                        codigo_postal: this.posta,
                        id_cliente: inforemi.selected_client._id
                    };
                    this.axios.post(urlservicios+ "ActualizarDestinatario" + "/" + this.detalleseditar.destinatario._id, objetoactualizar)
                        .then(response => {
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
                        });
                }
                this.DetalleServicio.splice(this.indices, 1);
                this.DetalleServicio.splice(this.indices, 0, detalles);
                (this.objeto = ""),
                (this.inputs = ""),
                toastr.success("Se edito exitosamente");
                this.selectservice = "";
                this.selectproduct = "";
                (this.objeto = ""),
                (this.detalleseditar = {
                    destinatario: {
                        nombre: "",
                        direccion: "",
                        telefono: ""
                    },
                    infor: {},
                    observaciones: ""
                });
                this.selectservice = null;
                this.selectproduct = null;
                (this.camposdinamicos = false),
                (this.fieldsdinamicos = []),
                (this.itemsdinamicos = []),
                (this.tabIndex = 0);
                this.camposdinamicos = false;
                this.fieldsdinamicos = [];
                this.itemsdinamicos = [];
                this.identificacion = "";
                (this.habilitar = true),
                //this.mostrardestinatario = false),
                //pendiente para correcion error de cambio de servicio
                //this.selectproducto=''
                //this.selectservicio=''
                (this.objeto = ""),
                (this.inputs = ""),
                // toastr.success("Se agrego exitosamente");
                //this.selectservice = null
                //this.selectproduct = null
                //this.selectproducto=null
                //this.selectservicio=null

                (this.objeto = ""),
                (this.detalles = {
                    destinatario: {
                        nombre: "",
                        direccion: "",
                        telefono: ""
                    },
                    infor: {},
                    observaciones: ""
                });
                this.$refs.ModalEdit.hide();
            }
        },
        eliminar: function (indice) {
            console.log(indice);
            swal({
                title: "Esta seguro ?",
                text: "No podrá recuperarlo después de realizado",
                icon: "warning",
                type: "warning",
                /*
                buttons: {
                  cancel: true,
                  confirm: true,
                },
                */
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si"
            }).then(result => {
                console.log(result.value);
                if (result.value) {
                    this.DetalleServicio.splice(indice, 1);
                    toastr.error("Se elmino exitosamente");
                    swal(
                        "Eliminado !",
                        "Detalle de la Orden de servicio elimado correctamente.",
                        "success"
                    );
                }
            });
        },
        editar(index) {


            (this.tabIndexED = 0), (this.tabIndex = 0);
            this.validatecampo = "";
            this.validatecampoTel = "";
            this.estado.nombre = null;
            this.estado.direccion = null;
            this.estado.referencia = null;
            this.indices = index;
            this.detalleseditar = this.DetalleServicio[index].detalleslocal;
            this.selectproduct = this.DetalleServicio[index].productoslocal;
            this.destinatarioED = this.detalleseditar.destinatario
            this.selectproducto = this.DetalleServicio[index].productoslocal;
            this.selectservice = this.DetalleServicio[index].servicioslocal;
            this.selectservicio = this.DetalleServicio[index].servicioslocal;

            //this.detalleseditar = this.DetalleServicio[index].detalleslocal;
            this.selectproductED = this.DetalleServicio[index].productoslocal;
            this.selectproducto = this.DetalleServicio[index].productoslocal;
            this.selectserviceED = this.DetalleServicio[index].servicioslocal;
            this.selectservicio = this.DetalleServicio[index].servicioslocal;
            this.seleccionarServicioED();
            this.itemsdinamicos = this.DetalleServicio[

                index
            ].detalleslocal.infor.objetoUnidades;
            //this.selectservice=true
            if (this.itemsdinamicos.length == 0) {
                this.tabdinamicoED = true
            } else {
                var fields = Object.keys(
                    this.DetalleServicio[index].detalleslocal.infor.objetoUnidades[0]
                );
                fields.push("eliminar");
                fields.push("actualizar");
                this.fieldsdinamicos = fields;
            }
            var load = true;
            setTimeout(() => {
                bus.$emit("load", {
                    load
                });
            });

            this.axios
                .get(
                    urlservicios+
                    "estructuraf/" +
                    this.selectproduct._id +
                    "/" +
                    this.selectservice._id
                )
                .then(response => {
                    this.inputsED = response.data;

                    for (var x = 0; x < this.inputsED.campos.length; x++) {
                        if (this.inputsED.campos[x].espieza == true) {
                            this.camposdinamicos = true;
                            this.tabdinamicoED = false;
                        } else {
                            this.camposdinamicos = true;
                            //this.tabdinamicoED=true
                        }
                    }
                    //this.camposNversion()
                    var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                    this.$refs.ModalEdit.show();
                })
                .catch(function (error) {
                    var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                    swal("Error", "Intente nuevamente, por favor", "warning");
                });
        },
        hideModal() {
            //this.tabIndexED=0,
            //this.tabIndex
            (this.habilitar = true),
            //(this.mostrardestinatario = false),
            (this.camposdinamicos = false),
            (this.fieldsdinamicos = []),
            (this.itemsdinamicos = []),
            (this.identificacion = null),
            (this.objeto = ""),
            (this.inputs = ""),
            //this.serviciosurl=null
            //this.productosurl=null
            // this.tabdinamico=false
            (this.selectservice = null);
            this.selectproduct = null;
            (this.objeto = ""),
            (this.detalles = {
                destinatario: {
                    nombre: "",
                    direccion: "",
                    telefono: ""
                },
                infor: {},
                observaciones: ""
            });
            this.$refs.Modal.hide();
            this.$refs.ModalEdit.hide();
        },
        ingresarOrden() {
            //var inforemitente = localStorage.getItem("orden");
            //var inforemi = JSON.parse(inforemitente);
            var test2 = localStorage.getItem("storedData");
            var test = JSON.parse(test2);
            this.validatecampoTel = "";
            this.estado.nombre = null;
            this.estado.direccion = null;
            this.estado.referencia = null;
            var pivote = false;
            var inforemitente = localStorage.getItem("orden");
            var inforemi = JSON.parse(inforemitente);
           

            if (this.objeto == undefined) {} else {
                var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                        load
                    });
                });
                var llaves = "";
                var objllaves;
                llaves = Object.keys(this.objeto);
                if (this.itemsdinamicos.length > 0) {
                    objllaves = Object.keys(this.itemsdinamicos[0]);
                    var totales = {};
                    var algo = 0;
                    var prsuma;
                    for (var y = 0; y < this.itemsdinamicos.length; y++) {
                        for (var x = 0; x < this.inputs.campos.length; x++) {
                            for (var z = 0; z < objllaves.length; z++) {
                                if (
                                    this.inputs.campos[x].espieza == true &&
                                    this.inputs.campos[x].type == "number"
                                ) {
                                    if (objllaves[z] == this.inputs.campos[x].vmodel) {
                                        if (y == 0) {
                                            algo = eval(
                                                "this.itemsdinamicos[y]." +
                                                this.inputs.campos[x].acumulaen
                                            );
                                            totales[this.inputs.campos[x].acumulaen] = algo;
                                            algo = 0;
                                        } else {
                                            var anterior = totales[this.inputs.campos[x].acumulaen];

                                            anterior =
                                                anterior +
                                                eval(
                                                    "this.itemsdinamicos[y]." +
                                                    this.inputs.campos[x].acumulaen
                                                );

                                            totales[this.inputs.campos[x].acumulaen] = anterior;
                                        }
                                    }

                                    //totales[this.inputs.campos[x].acumulaen]=eval('this.itemsdinamicos[y].'+this.inputs.campos[x].acumulaen)+totales[this.inputs.campos[x].acumulaen]
                                }
                                if (
                                    this.inputs.campos[x].espieza == true &&
                                    this.inputs.campos[x].type == "text"
                                ) {
                                    //algo=algo+eval('this.itemsdinamicos[y].'+this.inputs.campos[x].acumulaen)
                                    totales[
                                        this.inputs.campos[x].acumulaen
                                    ] = this.itemsdinamicos.length;
                                    //totales[this.inputs.campos[x].acumulaen]=eval('this.itemsdinamicos[y].'+this.inputs.campos[x].acumulaen)+totales[this.inputs.campos[x].acumulaen]
                                }
                            }
                        }
                    }
                    var objtotales = Object.keys(totales);
                    for (var x = 0; x < objtotales.length; x++) {
                        eval("this.objeto." + objtotales[x] + "=" + totales[objtotales[x]]);
                    }

                    for (var x = 0; x < this.inputs.campos.length; x++) {
                        if (this.inputs.campos[x].espieza == false) {
                            if (
                                eval("this.objeto." + this.inputs.campos[x].vmodel) == "" ||
                                eval("this.objeto." + this.inputs.campos[x].vmodel == "null") ||
                                eval("this.objeto." + this.inputs.campos[x].vmodel == null)
                            ) {
                                this.validatecampo = {
                                    border: "1px solid  #ff8080"
                                };
                                pivote = true;
                            } else {}
                        }
                    }
                } else {
                    for (var x = 0; x < this.inputs.campos.length; x++) {
                        if (this.inputs.campos[x].espieza == false) {
                            if (
                                eval("this.objeto." + this.inputs.campos[x].vmodel) == "" ||
                                eval("this.objeto." + this.inputs.campos[x].vmodel == "null") ||
                                eval("this.objeto." + this.inputs.campos[x].vmodel == null)
                            ) {
                                this.validatecampo = {
                                    border: "1px solid  #ff8080"
                                };
                                pivote = true;
                            } else {}
                        }
                    }
                }

                if (pivote == false) {
                    this.validatecampo = "";
                }

                var load = false;
                setTimeout(() => {
                    bus.$emit("load", {
                        load
                    });
                });
            }
             this.validatecamponombre=''
            if (
                this.selectproduct == "" ||
                this.selectservice == "" ||
                this.detalles.destinatario.nombre == "" ||
                this.detalles.destinatario.telefono == "" ||
                this.detalles.destinatario.direccion == "" ||
                pivote == true //  ||
                //this.detalles.referencia==''
            ) {
                if (this.detalles.destinatario.telefono == "") {
                    this.validatecampoTel = {
                        border: "1px solid  #ff8080"
                    };
                }
                if (this.detalles.destinatario.nombre == "") {
                    this.estado.nombre = false;
                    this.validatecamponombre = {
                    border: "2px solid red"
                    };
                }
                if (this.detalles.destinatario.direccion == "") {
                    this.estado.direccion = false;
                }
                if (this.detalles.referencia == "") {
                    this.estado.referencia = false;
                }

                swal("Oops...", "Falto completar algun campo", "error");
            } else {
                this.validatecamponombre=''
                  if (this.optionsremitentes.length == 0) {
                    var objetocrear = {
                        //numero_identificacion: this.detalles.destinatario.numero_identificacion,
                        direccion: this.detalles.destinatario.direccion,
                        nombre: this.detalles.destinatario.nombre,
                        nombreContacto: this.detalles.destinatario.nombreContacto,
                        telefono: this.detalles.destinatario.telefono,
                        //id_cliente: this.remitente.id_cliente,
                        latitud: this.lati,
                        longitud: this.longi,
                        codigo_postal: this.posta,
                        id_cliente: inforemi.selected_client._id
                    };
                    console.log("creo destinatario");
                    console.log(objetocrear);
                    this.axios.post(urlservicios+ "CrearDestinatario", objetocrear)
                        .then(response => {
                            console.log("se creo correcto");
                            console.log(response);
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });

                            });
                        })
                } else {
                    //detallepr=Object.assign({},this.detalles.destinatario);
                    var objetoactualizar = {
                        direccion: this.detalles.destinatario.direccion,
                        // nombre: this.detalles.destinatario.nombre,
                        telefono: this.detalles.destinatario.telefono,
                        nombreContacto: this.detalles.destinatario.nombreContacto,
                        //id_cliente: this.remitente.id_cliente,
                        latitud: this.lati,
                        longitud: this.longi,
                        codigo_postal: this.posta,
                        id_cliente: inforemi.selected_client._id
                    };
                    this.axios.post(urlservicios+ "ActualizarDestinatario" + "/" + this.nombre_remitente._id, objetoactualizar)
                        .then(response => {
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
                        });
                }
                this.validatecampo=''
                this.objeto.objetoUnidades;
                this.objeto.objetoUnidades = this.itemsdinamicos;
                var servicioslocal = this.selectservicio;
                this.detallesc = this.detalles;
                this.detallesc.infor = this.objeto;
                var productoslocal = this.selectproducto;
                var detalleslocal = this.detalles;
                console.log("----objeto----");
                console.log(this.objeto);
                //CMBIOS ASIGNACION TRAYECTO AUTOMATICA
                var desti = detalleslocal.destinatario
                var informacion = detalleslocal.infor
                var produc = productoslocal._id
                var serv = servicioslocal._id
                var estructura
                var llavesInfor
                var llavesDesti
                var respuestatrayectos
                if (desti.propiedadesDinamicas) {

                    llavesInfor = Object.keys(informacion)
                    llavesDesti = Object.keys(desti.propiedadesDinamicas)
                    llavesInfor.forEach(infor => {
                        llavesDesti.forEach(destinatario => {
                            if (infor == destinatario) {
                                if (eval('informacion.' + destinatario) == "000000000000000000000000") {
                                    eval('informacion.' + destinatario + '=' + 'desti.propiedadesDinamicas.' + destinatario)
                                    this.axios.get(urlservicios+ "estructuraf/" + produc + "/" + serv)
                                        .then(response => {

                                            estructura = response.data
                                            estructura.campos.forEach(element => {

                                                if (element.vmodel == destinatario) {
                                                    this.axios.get(element.urlobjeto + test.id_OperadorLogistico._id)
                                                        .then(responseurl => {
                                                            console.log(responseurl);
                                                            respuestatrayectos = responseurl.data
                                                            respuestatrayectos.forEach(elementosT => {

                                                                if (eval('informacion.' + destinatario) == elementosT._id) {
                                                                    informacion.trayectoobj = {},
                                                                        informacion.trayectoobj = {
                                                                            nombre: elementosT.nombre,
                                                                            id_trayecto: elementosT._id
                                                                        }
                                                                }

                                                            });
                                                        })
                                                }
                                            });
                                        });
                                }

                            } else {
                                console.log("no son iguales");
                            }
                        });
                    });
                    console.log("itemmm");
                    console.log(informacion);

                } else {
                    console.log("no existe");
                }



                //this.detalles.destinatario=
                /*

                cambios de immpresion
                */
                this.inputs.campos.forEach(element => {
                    if (element.esImprimible == true || element.esImprimible === true) {
                        detalleslocal.Imprime = element.acumulaen;
                    } else {
                        //detalleslocal.Imprime=''
                    }
                });

                var detalles = {
                    trazabilidad: [],
                    servicioslocal: servicioslocal,
                    productoslocal: productoslocal,
                    detalleslocal: detalleslocal
                };
                this.DetalleServicio.push(detalles);
                console.log(detalles);

                //BLANQUEAR DATOS
                this.optionsremitentes = []
                this.nombre_remitente = ''
                this.tabIndex = 0;
                this.camposdinamicos = false;
                this.fieldsdinamicos = [];
                this.itemsdinamicos = [];
                this.identificacion = "";
                (this.habilitar = true),
                //(this.mostrardestinatario = false),

                (this.objeto = ""),
                (this.inputs = ""),
                toastr.success("Se agrego exitosamente");

                (this.objeto = ""),
                (this.detalles = {
                    destinatario: {
                        nombre: "",
                        direccion: "",
                        telefono: ""
                    },
                    infor: {},
                    observaciones: ""
                });
                this.$refs.Modal.hide();
            }
        },
        Presiono(index) {
            var cero = "";
            setTimeout(
                function () {
                    if (this.inputs.campos[index].type == "text") {
                        if (
                            document.getElementById(this.inputs.campos[index].id).value == ""
                        ) {
                            //eval("this.objeto." + this.inputs.campos[index].vmodel + "= null");
                            eval(
                                "this.objeto." + this.inputs.campos[index].vmodel + "=" + cero
                            );
                        } else {
                            eval(
                                "this.objeto." +
                                this.inputs.campos[index].vmodel +
                                "=" +
                                "document.getElementById(this.inputs.campos[index].id).value"
                            );
                            document.getElementById(this.inputs.campos[index].id).focus();
                        }
                    } else {
                        if (
                            document.getElementById(this.inputs.campos[index].id).value == ""
                        ) {
                            eval(
                                "this.objeto." + this.inputs.campos[index].vmodel + "= null"
                            );
                            eval(
                                "this.objeto." +
                                this.inputs.campos[index].vmodel +
                                "=" +
                                this.inputs.campos[index].min
                            );
                        } else {
                            if (
                                document.getElementById(this.inputs.campos[index].id).value >
                                this.inputs.campos[index].max
                            ) {
                                eval(
                                    "this.objeto." +
                                    this.inputs.campos[index].vmodel +
                                    "=" +
                                    this.inputs.campos[index].min
                                );
                                document.getElementById(
                                    this.inputs.campos[index].id
                                ).value = eval(
                                    "this.objeto." +
                                    this.inputs.campos[index].vmodel +
                                    "=" +
                                    this.inputs.campos[index].min
                                );
                            } else {
                                eval(
                                    "this.objeto." +
                                    this.inputs.campos[index].vmodel +
                                    "=" +
                                    document.getElementById(this.inputs.campos[index].id).value
                                );
                            }
                        }
                    }
                }.bind(this)
            );
        },
        seleccionarServicioED() {
            this.axios
                .get(urlservicios+ "servicios/" + this.selectproducto._id)
                .then(response => {
                    this.serviciosurlED = response.data;
                    //this.load=false
                    var load2 = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load2
                        });
                    });
                    this.habilitar = false;
                })
                .catch(function (error) {
                    var load = false;
                    setTimeout(() => {
                        bus.$emit("load", {
                            load
                        });
                    });
                    swal("Advertencia", "Intente nuevamente, por favor", "warning");
                });
        },
        seleccionarServicio() {
            if (
                this.selectproduct == null ||
                (this.selectproduct == "null") | (this.selectproduct == "")
            ) {
                this.habilitar = true;
                this.serviciosurl = [];
                this.selectservice = null;
            } else {
                var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                        load
                    });
                });
                this.habilitar = true;
                this.serviciosurl = [];
                this.selectservice = null;
                //this.habilitar = false;
                this.selectproducto = this.selectproduct;
                this.axios
                    .get(urlservicios+ "servicios/" + this.selectproducto._id)
                    .then(response => {
                        this.serviciosurl = response.data;
                        //this.load=false
                        var load2 = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                                load2
                            });
                        });
                        this.habilitar = false;
                    })
                    .catch(function (error) {
                        var load = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                                load
                            });
                        });
                        swal("Advertencia", "Intente nuevamente, por favor", "warning");
                    });
            }
        },
        camposNversionED() {
            this.axios
                .get(
                    urlservicios+
                    "estructuraf/" +
                    this.selectproductED._id +
                    "/" +
                    this.selectserviceED._id
                )
                .then(response => {
                    this.inputsED = response.data;

                    for (var x = 0; x < this.inputsED.campos.length; x++) {
                        if (this.inputsED.campos[x].espieza == true) {
                            this.camposdinamicos = true;
                            this.tabdinamicoED = false;
                        } else {
                            //this.tabdinamicoED=true
                        }
                    }
                    this.$refs.ModalEdit.show();
                });
        },
        camposNversion() {
            if (
                this.selectservice == null ||
                this.selectservice == "" ||
                this.selectservice == "null"
            ) {
                this.inputs = "";
                this.objeto = "";
                this.tabdinamico = true;
            } else {
                this.selectservicio = this.selectservice;
                var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                        load
                    });
                });
                this.axios
                    .get(
                        urlservicios+
                        "estructuraf/" +
                        this.selectproducto._id +
                        "/" +
                        this.selectservicio._id
                    )
                    .then(response => {
                        this.inputs = response.data;

                        this.objeto = this.inputs.objeto;

                        var bandera_dinamico = false;
                        for (var x = 0; x < this.inputs.campos.length; x++) {
                            if (this.inputs.campos[x].espieza == true) {
                                bandera_dinamico = true;
                                this.camposdinamicos = true;
                            } else {
                                this.camposdinamicos = true;
                            }
                        }
                        if (this.camposdinamicos == true && bandera_dinamico == true) {
                            this.tabdinamico = false;
                        } else {
                            this.camposdinamicos = false;
                            this.tabdinamico = true;
                        }

                        //this.load=false
                        var load2 = false;
                        setTimeout(() => {
                            bus.$emit("load", {
                                load2
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
                        swal("Error", "Intente nuevamente, por favor", "warning");
                    });
            }
        },

        envioServicio() {
            if (
                this.DetalleServicio == "" ||
                this.DetalleServicio == null ||
                this.DetalleServicio == undefined
            ) {
                swal("Atencion!", "La Orden debe tener minimo un detalle ", "error");
            } else {
                var login = localStorage.getItem("storedData");
                var infologin = JSON.parse(login);

                var selec = localStorage.getItem("orden");
                var selecc = JSON.parse(selec);
                var inforemitente = localStorage.getItem("infoorden");
                var inforemi = JSON.parse(inforemitente);
                var localremitente = localStorage.getItem("remitente");
                var localremijson = JSON.parse(localremitente);


                var fechareal = localStorage.getItem("fecha_orden");
                var jsonfechareal = JSON.parse(fechareal);

                var franja = localStorage.getItem("Franja");
                var jsonfranja = JSON.parse(franja);
                if (!fechareal) {
                    var objeto = {
                        id_OperadorLogistico: infologin.id_OperadorLogistico._id,
                        id_usuario: infologin._id,
                        id_centro_costo: selecc.selected_center,
                        fecha_creacion: null,

                        //fecha_creacion:moment().tz('America/Bogota').format('MMMM DD YYYY, hh:mm:ss'),
                        //fecha_real:
                        //fecha_creacion: today.toISOString(),
                        id_cliente: selecc.selected_client,
                        remitente: {
                            direccion_recogida: localremijson.direccion,
                            telefono_contacto: localremijson.telefono,
                            nombre_contacto: localremijson.nombre,
                            //latitud: localremijson.latitud,
                            //longitud: localremijson.longitud,
                            //codigo_postal: localremijson.codigo_postal
                            nombreContacto:localremijson.nombreContacto
                        },
                        observaciones: this.observacionesGeneral,
                        detalle: this.DetalleServicio
                    };

                } else {
                    var now, hour,minute,second
                    now = new Date();
                    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
                    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
                    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
                    var objeto = {
                        id_OperadorLogistico: infologin.id_OperadorLogistico._id,
                        id_usuario: infologin._id,
                        id_centro_costo: selecc.selected_center,
                        //fecha_creacion:'2017-06-06',
                        fecha_creacion: jsonfechareal.fecha+' '+'00'+':'+'00'+':'+'00'+'-05:00',//+ " 00:00:00.000Z UTC",
                        //fecha_real:
                        //fecha_creacion: today.toISOString(),
                        id_cliente: selecc.selected_client,
                        remitente: {
                            direccion_recogida: localremijson.direccion,
                            telefono_contacto: localremijson.telefono,
                            nombre_contacto: localremijson.nombre,
                            latitud: localremijson.latitud,
                            longitud: localremijson.longitud,
                            codigo_postal: localremijson.codigo_postal
                        },
                        observaciones:jsonfranja.franja+" - "+ this.observacionesGeneral,
                        detalle: this.DetalleServicio
                    };
                }


                var load = true;
                setTimeout(() => {
                    bus.$emit("load", {
                        load
                    });
                });
                console.log("OBJETO");
                console.log(objeto);
                var validacion
                var mensaje
                this.axios
                    .post(urlservicios+ "GuardarOrden", objeto)
                    .then(response => {
                        console.log(response);

                        validacion=response.data.validacion
                        if(validacion==true){
                           var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                            this.Documento = response.data.ducumento;
                            swal(
                                "Excelente!",
                                "La Orden de Servicio Generada es: " + this.Documento,
                                "success"
                            );
                            this.$router.replace("/inicio");
                            localStorage.removeItem("orden");
                            localStorage.removeItem("observaciones_orden");
                            localStorage.removeItem("remitente");
                            localStorage.removeItem("fecha_orden"); 
                            localStorage.removeItem("DetalleServicio")
                            
                            localStorage.removeItem("ObservacionesGenerales")

                            
                        }
                        else{
                            var load = false;
                            setTimeout(() => {
                                bus.$emit("load", {
                                    load
                                });
                            });
                            mensaje=response.data.message
                             swal(
                                "Advertencia!",
                                  mensaje,
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
                        swal("Error", "Intente nuevamente, por favor", "warning");
                    });
            }
        }
    },
    updated: function () {
        //this.initAutocomplete();
    },
    created: function () {
        var test2 = localStorage.getItem("storedData");
        var test = JSON.parse(test2);
        if (test.id_OperadorLogistico.geolocalizaciónGoogle == true) {
            this.GeoReferenciacion = true
        } else {
            this.GeoReferenciacion = false
            this.validacionDireccion = true
        }
        var DetalleSer=localStorage.getItem("DetalleServicio");
        var DetalleSerjson=JSON.parse(DetalleSer)
        console.log(DetalleSerjson);
        if(DetalleSer){
            console.log("existe");
        this.DetalleServicio=DetalleSerjson
            
        }
        var Obser = localStorage.getItem("ObservacionesGenerales");
        var Obserjson= JSON.parse(Obser)
        if(Obser){
            this.observacionesGeneral=Obserjson
        }
    },
    beforeCreate: function () {
        /*
        var login = localStorage.getItem("storedData");
        var infologin = JSON.parse(login);
        this.axios
          .get(urlservicios+ "productos/" + infologin.id_OperadorLogistico._id)
          .then(response => {
            this.productosurl = response.data;
            //this.productosurl.unshift(vacio);
          });
          */
    }
};
</script>


<style>
#cardHeader {
    background-color: #ffffff !important;
}

#card1 .card-header {
    background-color: #ffffff !important;
    color: #4db35a;
}

#card2 .card-header {
    background-color: #ffffff !important;
    color: #4db35a;
}

.headerPersonalizado {
    background-color: #ffffff !important;
}

.contenedorTotal {
    padding-top: 0px;
    padding-right: 0%;
    padding-bottom: 0px;
    padding-left: 0%;
    background-color: #f8f8ff;
}

.card-header-tabs {
    background-color: #ebeaea;
}

.nav-link {
    border-left-width: 13px;
}

.contenedor {
    padding-top: 0px;
    padding-right: 5px;
    padding-bottom: 0px;
    padding-left: 5px;
    background-color: #f8f8ff;
}

.prueba {
    display: inline-table;
    margin-left: 15px;
}

.cards {
    box-shadow: 2px 2px 8px 4px rgba(0, 0, 0, 0.1);
    /*margin: 2%;
    /*border-top-width: 3px;
    */
    border-left-width: 0px;
    padding-left: 55px;
    padding-right: 50px;
    padding-top: 30px;
    border-bottom-width: 30px;
    padding-bottom: 30px;
    border-color: 15px gray;
}

/*
.card-header{
    background-color: #ebeaea !important;
    color: white;
}

.cardPersonalizada card-header{
    background-color: #ebeaea;

    color: white;
}
#josecard{
    background-color: #ebeaea;
  border-bottom-color: #495057;
  border-top: none;
}
*/

#tarjeta .card-header {
    background-color: #ebeaea !important;
    color: white;
}

.pac-container {
    z-index: 100000 !important;
    border-color: aqua
}

.pac-controls {
    display: inline-block;
    padding: 5px 11px;
    border-color: red
}

.pac-controls label {
    font-family: Roboto;
    font-size: 13px;
    font-weight: 300;
    border-color: red
}

#pac-input {
    background-color: #fff;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 300;
    margin-left: 12px;
    padding: 0 11px 0 13px;
    text-overflow: ellipsis;
    width: 400px;
}

.card-header {
    height: auto;
}
</style>
