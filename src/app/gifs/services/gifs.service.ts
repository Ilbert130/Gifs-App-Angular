import { Injectable } from '@angular/core';

@Injectable({
  // Para que sea globar y no haya que colocarlo como un provider
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory:string[]=[];

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  public searchTag(tag:string):void{
   this._tagsHistory.unshift(tag);
  }
}
