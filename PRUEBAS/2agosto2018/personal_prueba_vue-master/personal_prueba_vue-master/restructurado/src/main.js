require('./assets/libs/style.default.css')
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import { rutas } from './rutas/rutas.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from "moment";
import VueMomentJS from "vue-momentjs";
import vSelect from 'vue-select';
Vue.component('v-select', vSelect)
Vue.use(VueMomentJS, moment);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios)
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import VueGmaps from 'vue-gmaps'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGmaps, {
  key: 'AIzaSyDZgUCkS2mQWKHQiHfT_O9DQ56DAb1YhJ0'
})




const enrutador = new VueRouter({
        routes: rutas,
        mode: 'history'
    })

export var urlsocket = 'http://18.220.107.151:8080'
//export var urlsocket = 'http://200.116.52.29:8080'
//export var urlsocket = 'http://192.168.1.100:8080';
//export var urlsocket = 'http://192.168.1.79:8080';

//export var urlservicios = 'http://200.116.52.29:3000/logistica/';

//export var urlservicios = 'http://192.168.1.79:3000/logistica/';
//export var urlservicios = 'http://192.168.1.100:3000/logistica/';
export var urlservicios = 'http://18.220.107.151:3000/logistica/';
//export var urlservicios = 'http://localhost:3000/logistica/';



export var bus = new Vue();

new Vue({
    el: '#app',
    router: enrutador,
    render: h => h(App)
})
