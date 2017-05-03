import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  csvUrl: string = '../assets/cwurData.csv';  // URL to web API
  csvData: any = [];


  constructor(public navCtrl: NavController,public http: Http) {
  	// this.http.get('../assets/cwurData.csv')
    //             .subscribe(res => this.data = res);
    //     this.http.get(this.csvUrl)
    // .subscribe(
    //   data => this.csvData = this.extractData(data),
    //   err => this.handleError(err)
    // );
    this.readCsvData();
  }

    readCsvData () {
     this.http.get(this.csvUrl)
    // .map(this.extractData)
    //  .catch(this.handleError);
    .subscribe(
      res => this.csvData = this.extractData(res),
      err => this.handleError(err)
    );
  }
//  private extractData(res: Response) {
//     let body = res;
//     return body || { };
//   }
  private extractData(res: any) {

    let csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for ( let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let tarr = {};
            for ( let j = 0; j < headers.length; j++) {
               // tarr.push(data[j]);
                tarr[headers[j]] = data[j];
            }
            lines.push(tarr);
        }
    }
    return lines;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }

}
