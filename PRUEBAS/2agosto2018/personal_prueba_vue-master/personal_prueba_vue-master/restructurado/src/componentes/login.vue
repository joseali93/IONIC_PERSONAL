<template>
<!-- Contenedor para el Login-->
<div class="page login-page">
      <div class="container">
        <div class="form-outer text-center d-flex align-items-center">
          <div class="form-inner m-auto">
            <div class="logo text-uppercase"><span> Way </span><strong class="text-primary"> Logistic </strong></div>
            <p>Aplicativo para el manejo de procesos logísticos</p>
            <form id="login-form" method="post">
              <div class="form-group">
                <label for="login-username">Correo electrónico</label>
                <b-form-input v-model="correo"
                  autocomplete
                  id="login-username"
                  :state="estadoT"
                  type="text"
                  @input="ValidarCorreo"
                  placeholder="Correo Electronico"></b-form-input>
              </div>
              <div class="form-group">
                <label for="login-password">Contraseña</label>
                 <b-form-input v-model="password"
                  id="login-password"
                  type="password"
                  autocomplete

                  placeholder="Contraseña"
                  :state="estadoClave"
                  @input="ValidarClave"
                  v-b-popover.hover="'Debe contener letras o numeros unicamente'" title="Estructura Valida"
                  ></b-form-input>
              </div>

              <a  v-on:click="autenticar" class="btn btn-lg btn-success btn-block rounded"> <span class="boton">Ingresar</span> </a>
            </form>
          </div>
          <div class="copyrights text-center">
            <p>Developed By <a href="http://www.waysolutions.co/" class="external">WaySolutions Technology</a></p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
//Se inportan lo necesario el bus de servicios y la url de servicios
import {bus} from '../main'
import {urlservicios} from '../main'

export default {
  data(){
      return{
        estadoClave:null,
        estadoT:null,
        usuario: '',
        correo: '',
        password: '',
        estado: '',
        msg: '',
      usuario: {

      },
      }
  },
  methods:{
    ValidarCorreo: function(value){
      if(value.length==0){
               return(this.estadoT=null)
           }
           if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            {
                return (this.estadoT=true)
            }
                return (this.estadoT=false)

    },
     ValidarClave: function(value){
      if(value.length==0){
               return(this.estadoClave=null)
           }
           if (/^[-_\w\.]+$/i.test(value))
            {
                return (this.estadoClave=true)
            }
                return (this.estadoClave=false)

    },
      autenticar: function(){
        let config = {
        headers: {
          Authorization: 'Basic YWRtaW46YWRtaW4=',
        }
      }
        var urlf='https://caro-chatboot.de-c1.cloudhub.io/api/1.1/employees/dpbotero/validate'
            this.axios.get(urlf,config)
            .then((response) => {
             console.log(response)


            }).catch(function(error){
                //console.log(JSON.stringify(error));

                console.log(error);
            })

          }

  },

  }
</script>

<style>
.body{
  background-color: #eee;
  margin-top: 100px;
  }


.icono {
      margin: auto;
    width: 60%;
    padding: 10px;
    width:180px;
    line-height: 180px;
    text-align: center;
}
.form-actions {
    margin: 0;
    background-color: transparent;
    text-align: center;
}
.boton{
  color: white
}
.bn{
  margin-top: 15px;
}
</style>
