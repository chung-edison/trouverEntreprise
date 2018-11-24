import { Component } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trouver une enterprise';
  company = {};
  companies = [];
  results: any[];
  search = false;
  resultNum = 0;

  constructor(private _ActivatedRoute: ActivatedRoute, private http: HttpClient) {

  }

  searchCompany(form: NgForm) {
    let params = new HttpParams();
    console.log(form.value.name);
    console.log(form.value.country);
    params = params.append('name', form.value.name);
    params = params.append('jurisdiction_code', form.value.country);
    params = params.append('inactive', 'false');
    if (form.value.city != null && form.value.city !== '') {
      params = params.append('registered_address', form.value.city);
    }

    this.http.get('https://api.opencorporates.com/companies/search', {params: params})
      .subscribe(
        (res) => {
          console.log(res);
          this.companies = res['results'].companies;
          this.resultNum = res['results'].total_count;
          this.search = true;
          console.log(this.resultNum);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
