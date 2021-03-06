import { Injectable } from "@angular/core";
import { HttpServiceSocios } from "../../../services/httpServiceSocios";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SociosService {
  public idSocio: number = 0;
  subjectId = new BehaviorSubject<Number>(0);

  constructor(
    private httpSrvSocio: HttpServiceSocios,
    private router: Router
  ) {}

  public getIdSubscription(): Observable<any> {
    return this.subjectId.asObservable();
  }

  private updateIdObservers() {
    this.subjectId.next(this.idSocio);
  }

  public changeIdSocio = (id: number) => {
    this.idSocio = id;
    this.updateIdObservers();
  };

  public findUser = id => {
    this.idSocio = id;
    this.router.navigate(["socio/compras", id]);
  };
}
