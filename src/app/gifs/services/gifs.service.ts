import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gisf.interfaces';

// const GIFS_API_KEY = '0M6BF5dXf4dVjB2Fydz9E4UF5qyAlHU9';

@Injectable({
  // Para que sea globar y no haya que colocarlo como un provider
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory:string[]=[];
  public gifList:Gif[] =[]
  private apiKey:string = '0M6BF5dXf4dVjB2Fydz9E4UF5qyAlHU9';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  public searchTag(tag:string){
    if(tag.length===0) return;
    this.organizeHistory(tag);

    // Tambien con este podemos setiar los parametros de la peticion
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag);

    // Observable
    // Nos suscribimos ahi ya tenemos la respuesta
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(resp => {
        this.gifList = resp.data;
      });

  }

  // Grabar en el localStorage
  private saveLocalStorage():void {
    // key, valor
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  // Cargar en el localStorage
  private loadLocalStorage():void {

    if(!localStorage.getItem('history')) return;
    // key
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    this.searchTag(this._tagsHistory[0]);
  }

  //Para organizar el historial de busqueda
  private organizeHistory(tag:string){
    tag = tag.toLocaleLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }
}
