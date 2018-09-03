import {Component, OnInit, Input, OnChanges, ViewChildren, Renderer2} from '@angular/core';
import {Socio} from "../../../../models/socio";

declare var $: any

@Component({
  selector: 'm-ficha-socio',
  templateUrl: './ficha-socio.component.html',
})
export class FichaSocioComponent implements OnChanges, OnInit {
	@ViewChildren('bold') elemsABoldear
	@Input() socio: Socio = new Socio('...', '...', '...', '...', '...', '...', '...')

  constructor( private renderer: Renderer2) { }

  ngOnInit(){
  }

  ngOnChanges(changes){
		console.log(this.elemsABoldear)
		if(changes.socio.currentValue.dni !== null){
			this.elemsABoldear._results.forEach(elem =>{
				this.renderer.addClass(elem.nativeElement,'m--font-bolder' )
				})
		}else{
			if(this.elemsABoldear){
				this.elemsABoldear._results.forEach(elem =>{
					this.renderer.removeClass(elem.nativeElement,'m--font-bolder' )
				})
			}
			this.socio = new Socio('...', '...', '...', '...', '...', '...', '...')
		}
  }

}
