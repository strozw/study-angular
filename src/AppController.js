
import fetch from 'isomorphic-fetch';

export default class AppController {
    constructor() {
      fetch('http://localhost:3000/')
      .then(function(response) {
        console.log(response);
        return response;
      });
    }
}
