import InicioComponent from '../componentes/login.vue'
import NavComponent from '../componentes/nav.vue'
import InicializaComponent from '../componentes/inicializacion.vue'
import OrdenComponent from '../componentes/orden.vue'
import OrdenServiceComponent from '../componentes/ordenservicio.vue'
import ConsultComponent from '../componentes/filtrado.vue'
import DetailComponent from '../componentes/detalles.vue'
import ResultComponent from '../componentes/resultado.vue'
import preloadComponent from '../componentes/preload.vue'
import ConsultTraceComponent from '../componentes/filtradoTraza.vue'
import ListadoComponent from '../componentes/listadoTraza.vue'
import ResultTraceComponent from '../componentes/resultadotraza.vue'
import NotFoundComponent from '../componentes/NotFound.vue'
import Blank from '../componentes/componentInBlank.vue'
import prueba from '../componentes/prueba.vue'
import MEntrada from '../componentes/ModalEntrada.vue'
import MSalida from '../componentes/ModalSalida.vue'
import ManifiestComponent from '../componentes/ConsultManifiestos.vue'
import ResultManifiest from '../componentes/ResultManifiest.vue'
import DetailManifiest from '../componentes/detalleManifiesto.vue'
import ConfigCliente from '../componentes/ParamClientes.vue'
import ConfigCentroCosto from '../componentes/ParamCentrosC.vue'
import ConfigCentroLogistico from '../componentes/ParamCentroL.vue'
import ConfigUsuarios from '../componentes/ParamUsuarios.vue'
import configVehiculos from '../componentes/ParamVehiculos.vue'



import EnterExitComponent from '../componentes/EntradaSalidas.vue'
mode: 'history'

export const rutas = [
    {
        path: '/prueba',
        component: prueba,
    },
    {
        path: '/',
        component: InicioComponent,
    },
    {
        path: '/inicio/',
        component: NavComponent,
        children: [{
                path: 'configcentrol',
                component: ConfigCentroLogistico,

            },
            {
                path: 'configcliente',
                component: ConfigCliente,

            },
            {
                path: 'configcentroc',
                component: ConfigCentroCosto,

            },
            {
                path: 'configusuarios',
                component: ConfigUsuarios,

            },
            {
                path: 'configvehiculos',
                component: configVehiculos,

            },
            {
                path: '',
                component: InicializaComponent,

            },
            {
                path: 'orden',
                component: OrdenComponent,

            },
            {
                path: 'ordenservicio',
                component: OrdenServiceComponent,

            },
            {
                path: 'consultar',
                component: ConsultComponent,
                props: true,
                children: [{
                        path: '',
                        component: Blank,
                        props: true,

                    },
                    {
                        path: 'resultado',
                        component: ResultComponent,
                        props: true,

                    },
                    {
                        path: 'detalles',
                        component: DetailComponent,
                        props: true,

                    },
                    {
                        path: '*',
                        redirect: '/404'
                    }

                ]
            },
            {
                path: 'trazabilidad',
                component: ConsultTraceComponent,
                props: true,
                children: [{
                        path: '',
                        component: Blank,
                        props: true,

                    },
                    {
                        path: 'listado',
                        component: ListadoComponent,
                        props: true,

                    },
                    {
                        path: 'resultado',
                        component: ResultTraceComponent,
                        props: true,

                    },

                    {
                        path: '*',
                        redirect: '/404'
                    }
                ]
            },
            {
                path: 'entradasalida',
                component: EnterExitComponent,
                props: true,
                children: [{
                        path: '',
                        component: Blank,
                        props: true,

                    },
                    {
                        path: 'ModalEntrada',
                        component: MEntrada,
                    },
                    {
                        path: 'ModalSalida',
                        component: MSalida,
                    },
                    {
                        path: '*',
                        redirect: '/404'
                    }
                ]
            },
            {
                path: 'manifiestos',
                component: ManifiestComponent,
                props: true,
                children: [{
                        path: '',
                        component: Blank,
                        props: true,

                    },
                    {
                        path: 'resultado',
                        component: ResultManifiest,
                    },
                    {
                        path: 'detalle',
                        component: DetailManifiest,
                    },
                    {
                        path: 'entradasalida',
                        component: EnterExitComponent,
                        props: true,
                        children: [{
                                path: '',
                                component: Blank,
                                props: true,

                            },
                            {
                                path: 'ModalEntrada',
                                component: MEntrada,
                            },
                            {
                                path: 'ModalSalida',
                                component: MSalida,
                            },
                            {
                                path: '*',
                                redirect: '/404'
                            }
                        ]
                    }

                ]
            }

        ]
    },
    {
        path: '/404',
        component: NotFoundComponent
    },

]