import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CommonService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonService {

  constructor(public http: Http) {
    console.log('Hello CommonService Provider');
  }
  wikimediaURL(){
   return "https://en.wikipedia.org/w/api.php?action=query&titles=harvard&prop=images&imlimit=20&format=jsonfm"
  }

}
