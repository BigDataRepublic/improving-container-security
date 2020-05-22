import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PredictionData }    from '../prediction_data';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const ENDPOINTURL = 'http://localhost:5000/';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.css']
})
@Injectable()
export class ModelFormComponent implements OnInit {
  model: PredictionData;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.clear()
  }

  clear() {
    this.model = new PredictionData(0, 0, null);
  }

  onSubmit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      }),
      responseType: 'json' as const
    }
    this.httpClient.post(ENDPOINTURL, this.model.requestData(), httpOptions).subscribe(
      (response) => {
        console.log(response);
        this.setOutput(response)
      },
      (error) => console.log(error)
    )
  }
  setOutput(response: Object) { this.model.outputValue = response['value']; }

  submitted = false;

  get diagnostic() { return JSON.stringify(this.model); }

  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: any) {
    return form && form.controls['inputValue1'] &&
    form.controls['inputValue1'].value;
  }

  /////////////////////////////

}
