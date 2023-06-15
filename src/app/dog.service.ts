import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dog } from './types';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  dogUrl = 'api/dogs'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.dogUrl)
  }

  getDog(id: number): Observable<Dog> {
    return this.http.get<Dog>(`${this.dogUrl}/${id}`)
  } 

  updateDog(dog: Dog): Observable<any> {
    return this.http.put(this.dogUrl, dog, this.httpOptions)
  }

  addDog(dog: Dog): Observable<Dog> {
    return this.http.post<Dog>(this.dogUrl, dog, this.httpOptions)
  }

  deleteDog(id: number): Observable<Dog> {
    return this.http.delete<Dog>(`${this.dogUrl}/${id}`, this.httpOptions)
  }
}
