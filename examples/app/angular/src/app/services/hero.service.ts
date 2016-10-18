import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Hero } from '../models/hero';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HeroService {
  private tohUrl = 'http://localhost:3000/tour_of_heroes';
  private format = '.json';

  constructor(public http: Http) {}

  errorHandler(error: any) {
    return Observable.throw(error.json().error || 'Server Error')
  }
  
  getHeroes() {
    return this.http.get(this.tohUrl + this.format)
      .map((res: Response) => res.json())
      .catch(this.errorHandler)
  }

  getHero(id: number) {
    return this.http.get(this.tohUrl + '/' + id + this.format)
      .map((res: Response) => res.json())
      .catch(this.errorHandler)
  }

  create(body: Object) {
    let payload = JSON.stringify({hero: body});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.tohUrl + this.format, payload, options)
      .map((res: Response) => res.json())
      .catch(this.errorHandler)
  }
  
  update(body: Hero) {
    let payload = JSON.stringify({hero: body});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.tohUrl + '/' + body.id + this.format, payload, options)
      .map((res: Response) => res.json())
      .catch(this.errorHandler)
  }
  
  delete(id: number) {
    return this.http.delete(this.tohUrl + '/' + id + this.format)
      .map((res: Response) => res.json())
      .catch(this.errorHandler)
  
  }
}