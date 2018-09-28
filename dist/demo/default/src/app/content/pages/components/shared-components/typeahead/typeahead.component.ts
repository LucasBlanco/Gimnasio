import {Component, Input, Output, EventEmitter,OnInit} from '@angular/core';

@Component({
  selector: 'm-typeahead',
  template: `
	  
		  <div class="search-results">
			  <div style="position: relative">
				  <div class="m-input-icon m-input-icon--right">
					  <input class="form-control m-input"
							 [value]="search"
							 ngxTypeahead
							 [taList]="datosBuscables"
							 [taItemTpl]="itemTpl"
							 (taSelected)="handleResultSelected($event)"
							 [taDisplayOnFocus]="true"
							 [taAllowEmpty]="true"
					  >
					  <ng-template #itemTpl let-result>
						  <div style="text-align: left">
							  <span>- {{ result.result }}</span>
						  </div>
					  </ng-template>
					  <span class="m-input-icon__icon m-input-icon__icon--right">
            				<span>
              					<i class="la la-search"></i>
            				</span>
				  		</span>
				  </div>
			  </div>
	  </div>
	  
    `,
})
export class TypeaheadComponent implements OnInit{
	@Input() callbackFunction: Promise<any>
	@Input() datos: Array<any> = []
	@Input() filtro: string = 'nombre'
	@Output() selectedItems: EventEmitter<Array<any>> = new EventEmitter()
	search: string = ''
	datosBuscables: Array<string> = []

	generarArray(){
		let algo = this.datos.map( dato => dato[this.filtro] )
		return algo
	}

	ngOnInit() {
		if (this.callbackFunction) {
			this.callbackFunction.then(response => {
				this.datos = response
				this.datosBuscables = this.generarArray()
			})
		}else{
			this.datosBuscables = this.generarArray()
		}
	}

	handleResultSelected(result) {
		this.search = result
		let objectToReturn = this.datos.filter( dato => Object.entries(dato).some( ([key, value]) => key === this.filtro && value === result))
		this.selectedItems.emit(objectToReturn)
	}
}
