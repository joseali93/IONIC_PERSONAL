<template>
   <b-container fluid class="contenedorTotal">
      <!-- <div class="breadPersonalizado">
         <b-breadcrumb :items="items" />
      </div> -->
      <div class="breadcrumb-holder">
        <div class="container-fluid">
          <ul class="breadcrumb">
            <li v-for="(item, i) in items" :key="i" class="breadcrumb-item">
              <a :to="item.to">{{item.text}}</a>
            </li>
          </ul>
        </div>
      </div>
       <b-container fluid class="m-2">
          <b-card class="cards">
            <header class="row">
              Bienvenido {{nombreusu}}
            </header>
            <b-row>
              <h3>
                <strong >Way</strong>
                <strong class="text-primary">Logistic</strong>
                es un aplicativo para el manejo logístico de su empresa
            </h3>
            </b-row>
          </b-card>
       </b-container>
   </b-container>


</template>

<script>
export default {
 props: ['nombreusu'],
  data() {
    return {
      items: [
        {
          text: "Inicio",
          to: "/inicio"
        }
      ],
    }
  }
}
</script>

<style>
.breadPersonalizado{

}
.contenedorTotal {
  padding-top: 0px;
  padding-right: 0%;
  padding-bottom: 0px;
  padding-left: 0%;
  background-color: #f8f8ff;
}
.contenedorNavegacion {
  padding-top: 0px;
  padding-right: 2%;
  padding-bottom: 0px;
  padding-left: 4%;
  background-color: #f8f8ff;
}
.titulo {
  padding: 5%;
  border: 5px;
  border-color: black;
}
.cards {
  box-shadow: 1px 5px 7px 5px rgba(0, 0, 0, 0.1);
  /*margin: 2%;
    /*border-top-width: 3px;
    */

  border-left-width: 0px;
  padding-left: 55px;
  padding-right: 50px;
  padding-top: 15px;
  border-bottom-width: 30px;
  padding-bottom: 30px;
  border-color: 15px gray;
}
.panel.panel-default{
  padding: 5%
}
.dashboard-header section-padding{
    padding-top: 1px;
    padding-bottom: 01px;
}
</style>
