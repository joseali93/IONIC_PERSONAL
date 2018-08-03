<!--
<template>
    <div class="center ">
        <img src="https://www.ole.com.ar/static/OLEOleV2/images/loading.gif"  class="imagen ">
        <label>holaaaaa</label>
    </div>
</template>
-->
<template>
    <div class="d-flex justify-content-center align-items-center flex-column center">
        <img src="https://www.ole.com.ar/static/OLEOleV2/images/loading.gif">
        <h1 class="text-dark text-center my-3">Cargando...</h1>
       <h1 class="text-dark text-center my-3">{{mensaje}}</h1>

    </div>
</template>

<script>
export default {
    data() {
    return {
        //mensaje:'',
        prueba:'jose alirio'
    }
    },
    props: ['mensaje'],
    mounted() {

    }
}
</script>

<style> 
.center {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: gray;
  z-index: 9000;
  opacity : 0.5;
  /*---------------*/
  /* position: fixed;
  width: 100%;
  height: 100%;
  display: block;
    top: 0;
    bottom: 0;      */
}
.imagen{
  display: block;
    position: relative;
    margin: auto;
}
</style>

