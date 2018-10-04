import {Component, NgZone, OnInit} from '@angular/core';
import {HttpService} from "../../../services/httpService";


@Component({
  selector: 'm-pruebita',
  templateUrl: './pruebita.component.html'
})
export class PruebitaComponent implements OnInit {
	b= 3
  constructor(private srv: HttpService, private ngZone: NgZone) { }

  ngOnInit() {
	this.srv.prueba().then(response => {
		this.ngZone.run(() => {
			console.log(response); this.b = response
		})
	})

  }

}
