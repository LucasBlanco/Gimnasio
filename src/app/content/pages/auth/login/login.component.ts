import {
  Component,
  OnInit,
  Output,
  Input,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { AuthenticationService } from "../../../../core/auth/authentication.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthNoticeService } from "../../../../core/auth/auth-notice.service";
import { NgForm } from "@angular/forms";
import * as objectPath from "object-path";
import { TranslateService } from "@ngx-translate/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import * as JWT from "jwt-decode";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "m-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  public model: any = { user: "prueba", password: "prueba" };
  @Output() actionChange = new Subject<string>();
  public loading = false;

  @Input() action: string;

  @ViewChild("f") f: NgForm;
  errors: any = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public authNoticeService: AuthNoticeService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private http: Http
  ) {}

  login(usuario: string, password: string) {
    const userlogin: any = {};
    userlogin.name = usuario;
    userlogin.password = password;
    const header = new Headers({ "Content-Type": "application/json" });
    const options = new RequestOptions({ headers: header });
    // https://back.thenewfit.com.ar
    // ng build --prod --base-href ./ --aot=false --build-optimizer=false --watch
    this.http
      .post(environment.ip + "/login", userlogin, options)
      .toPromise()
      .then((response: any) => {
        const token = JSON.parse(response._body).data.token;
        const permisos = JWT(token).permisos;
        const user = JWT(token).user_id;
        localStorage.setItem("token", "");
        localStorage.setItem("username", JSON.stringify(usuario));
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        this.router.navigate(["/"]);
      });
  }

  submit() {
    if (this.validate(this.f)) {
      this.authService.login(this.model).subscribe(response => {
        if (typeof response !== "undefined") {
          this.router.navigate(["/"]);
        } else {
          this.authNoticeService.setNotice(
            this.translate.instant("AUTH.VALIDATION.INVALID_LOGIN"),
            "error"
          );
        }
        this.cdr.detectChanges();
      });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.authNoticeService.setNotice(null);
  }

  validate(f: NgForm) {
    if (f.form.status === "VALID") {
      return true;
    }

    this.errors = [];
    if (objectPath.get(f, "form.controls.email.errors.email")) {
      this.errors.push(
        this.translate.instant("AUTH.VALIDATION.INVALID", {
          name: this.translate.instant("AUTH.INPUT.EMAIL")
        })
      );
    }
    if (objectPath.get(f, "form.controls.email.errors.required")) {
      this.errors.push(
        this.translate.instant("AUTH.VALIDATION.REQUIRED", {
          name: this.translate.instant("AUTH.INPUT.EMAIL")
        })
      );
    }

    if (objectPath.get(f, "form.controls.password.errors.required")) {
      this.errors.push(
        this.translate.instant("AUTH.VALIDATION.INVALID", {
          name: this.translate.instant("AUTH.INPUT.PASSWORD")
        })
      );
    }
    if (objectPath.get(f, "form.controls.password.errors.minlength")) {
      this.errors.push(
        this.translate.instant("AUTH.VALIDATION.MIN_LENGTH", {
          name: this.translate.instant("AUTH.INPUT.PASSWORD")
        })
      );
    }

    if (this.errors.length > 0) {
      this.authNoticeService.setNotice(this.errors.join("<br/>"), "error");
    }

    return false;
  }

  forgotPasswordPage(event: Event) {
    this.action = "forgot-password";
    this.actionChange.next(this.action);
  }

  register(event: Event) {
    this.action = "register";
    this.actionChange.next(this.action);
  }
}
