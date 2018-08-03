import io from 'socket.io-client';
import { urlsocket } from '../../main';



class CreateSocket {

  constructor(params) {

    if (typeof params !== 'object')

        throw new TypeError('Se debe especificar un objeto para obtener los parámetros');

    this.eventList = [];

    this.params = (params);

    this.instance = (io.connect(urlsocket, {
      //this.instance = (io.connect('http://18.220.107.151:8080', {

      query: params,

    }));

  }

  on(name, callback) {

    if (typeof name !== 'string')

        throw new TypeError('Nombre de evento no valido');

    if (typeof callback !== 'function')

        throw new TypeError('Callback no valido');

    this.instance.on(name, callback);

  }

  emit(name, data) {

    if (typeof name !== 'string')

        throw new TypeError('Nombre de evento no valido');

    if (!data)

        throw new Error('Datos no proporcionados');

    this.instance.emit(name, data);

  }

}

 

export { CreateSocket };