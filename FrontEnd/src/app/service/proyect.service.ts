import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { proyect } from '../model/proyect.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {
  private url = 'https://portfoliobknd.herokuapp.com/api/proyect/';

  constructor(private http:HttpClient) { }

  public getProyect(): Observable<proyect[]> {
    return this.http.get<proyect[]>(this.url + 'bring');
  }

  public createProyect(proyect:proyect): Observable<proyect[]> {
    return this.http.post<proyect[]>(this.url + 'create', proyect);
  }

  public deleteProyect(id:number): Observable<void> {
    return this.http.delete<void>(this.url + 'delete/' + id);
  }

  public editProyect(proyect:proyect): Observable<proyect> {
    return this.http.put<proyect>(this.url + 'edit', proyect);
  }
}
