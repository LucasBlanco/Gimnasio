import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'm-clases',
  template: `
    <div class="row">
      <div class="col-lg-12" *ngIf="verTomarPresente">
        <m-tomar-presente></m-tomar-presente>
      </div>
    </div>
  `
})
export class PresenteComponent implements OnInit {
  verTomarPresente: boolean;
  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.verTomarPresente = params['view'] === 'tomarPresente';
    });
  }
}
