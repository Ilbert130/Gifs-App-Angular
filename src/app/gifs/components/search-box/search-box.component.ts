import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifts-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

  // Hacemos referencia a la referencia local del elemento que es un identificador
  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService){}

  // Con el ViewChild ya no es necesario pasar el string al metodo, debido a que hacemos referencia
  // directamente al input
  // searchTag(newTag:string){
  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
