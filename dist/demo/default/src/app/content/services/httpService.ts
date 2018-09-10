import { Injectable } from '@angular/core';
import * as Modelos from './httpModels';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import swal from 'sweetalert2'

@Injectable()
export class HttpService {

	constructor(private http: Http) {
		let token = localStorage.getItem('token');
		 this.headerPOST = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
		this.optionsPOST = new RequestOptions({ headers: this.headerPOST });
		this.headerGET = new Headers({'Authorization': 'Bearer ' + token, 'Access-Control-Allow-Origin': '*'});
		this.optionsGET = new RequestOptions({ headers: this.headerGET });
		// this.ip = localStorage.getItem('currentServerIP');
		this.ip = 'http://localhost:8000'
	}
	public usuario
	private loading: boolean = false;
	private ip: string;
	private headerPOST = new Headers();
	private optionsPOST = new RequestOptions();
	private headerGET = new Headers();
	private optionsGET = new RequestOptions();

	sendMessage(mensaje: string, tipo: string) {
		if (tipo === 'success') {
			swal({
				title: '<div style="color:#575962; font-weight:500; font-size:1.35rem">Exito!</div>',
				html: '<div style="color:#6f727d; font-weight:300; font-size:1.05rem">' + mensaje + '</div>',
				type: 'success',
				padding: 50,
				showConfirmButton: false,
				timer: 2000
			})
		} else {
			swal({
				title: '<div style="color:#575962; font-weight:500; font-size:1.35rem">Error!</div>',
				html: '<div style="color:#6f727d; font-weight:300; font-size:1.05rem">' + mensaje + '</div>',
				type: 'error',
				padding: 50,
				showConfirmButton: false,
				timer: 2000
			})
		}
	}

	public post(post: Modelos.Post) {
		/*Object.entries(post.data).forEach(entry => {
			post.data[entry[0]] = (typeof entry[1] === 'string') ? (entry[1] as string).toUpperCase() : entry[1]
		});*/
		console.log(post)
		// Helpers.setLoading(true);
		return new Promise((resolve, reject) => {
			this.http.post(this.ip + post.url, post.data, this.optionsPOST)
				.toPromise()
				.then((response: any) => {
					// Helpers.setLoading(false);
					if(post.mensajeExito !== undefined){
						this.sendMessage(post.mensajeExito, 'success');
					}
					resolve()
				})
				.catch((response: any) => {
					// Helpers.setLoading(false);
					if(post.mensajeError !== undefined){
						this.sendMessage(post.mensajeError, 'error');
					}
					reject()
				});
		})
	}

	public get(get: Modelos.Get) {
		// // Helpers.setLoading(true);
		return new Promise((resolve, reject) => {
			this.http.get(this.ip + get.url, this.optionsGET)
				.toPromise()
				.then((response: any) => {
					// Helpers.setLoading(false);
					resolve(JSON.parse(response._body))
				})
				.catch((response: any) => {
					// Helpers.setLoading(false);
					this.sendMessage(get.mensajeError, 'error');
					reject(response)
				});
		})
	}

	private getEstados() {
		// Helpers.setLoading(true);
		return this.http.get(this.ip + "/estadistica/estados", this.optionsGET)
			.toPromise()
			.then((response: any) => {
				// Helpers.setLoading(false); return JSON.parse(response._body)
			});
	}

	private putVenta(venta) {
		// Helpers.setLoading(true);
		return this.http.put(this.ip + "/validacion/updateVenta/" + venta.id, venta, this.optionsPOST)
			.toPromise()
			.then((response: any) => {
				// Helpers.setLoading(false);
				this.sendMessage("La venta fue modifcada correctamente.", 'success');
			});
	}

	private deleteUsuario(nombreUsuario) {
		// Helpers.setLoading(true);
		return this.http.delete(this.ip + "/usuario/delete/" + nombreUsuario, this.optionsGET)
			.toPromise()
			.then((response: any) => {
				// Helpers.setLoading(false);
				this.sendMessage("El usuario fue eliminado correctamente.", 'success');

			});
	}

	private postVentasPagadasArchivos(archivos: FormData) {
		// Helpers.setLoading(true);
		let headers = new Headers();
		headers.delete("Content-Type");
		let options = new RequestOptions({ headers: headers });
		return new Promise((resolve, reject) => {
			this.http.post("http://gestionarturnos.com/ventas/uploadAdmin.php", archivos, options)
				.toPromise()
				.then((response: any) => {
					// Helpers.setLoading(false);
					resolve()
				})
				.catch((response: any) => {
					// Helpers.setLoading(false);
					this.sendMessage("Hubo un error al guardar los archivos. Intente nuevamente.", 'error');
					reject()
				});
		})
	}




}
