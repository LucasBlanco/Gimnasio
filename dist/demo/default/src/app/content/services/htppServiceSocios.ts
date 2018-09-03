import { Injectable } from '@angular/core';
import * as Modelos from './httpModels';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import swal from 'sweetalert2'

@Injectable()
export class HttpServiceSocios {

	constructor(private http: Http) {
		/*this.usuario = JSON.parse(localStorage.getItem('currentUser'));
		this.headerPOST = new Headers({ 'Content-Type': 'application/json', 'My-Authorization': 'Bearer ' + this.usuario.token });
		this.optionsPOST = new RequestOptions({ headers: this.headerPOST });
		this.headerGET = new Headers({
			'My-Authorization': 'Bearer ' +
				this.usuario.token
		});
		this.optionsGET = new RequestOptions({ headers: this.headerGET });
		this.ip = localStorage.getItem('currentServerIP');*/
	}
	public usuario
	public loading: boolean = false;
	public ip: string;
	public headerPOST = new Headers();
	public optionsPOST = new RequestOptions();
	public headerGET = new Headers();
	public optionsGET = new RequestOptions();

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
		Object.entries(post.data).forEach(entry => {
			post.data[entry[0]] = (typeof entry[1] === 'string') ? (entry[1] as string).toUpperCase() : entry[1]
		});
		console.log(post)
		// Helpers.setLoading(true);
		return new Promise((resolve, reject) => {
			this.http.post(this.ip + post.url, post.data, this.optionsPOST)
				.toPromise()
				.then((response: any) => {
					// Helpers.setLoading(false);
					this.sendMessage(post.mensajeExito, 'success');
					resolve()
				})
				.catch((response: any) => {
					// Helpers.setLoading(false);
					this.sendMessage(post.mensajeError, 'error');
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

	public getEstados() {
		// Helpers.setLoading(true);
		return this.http.get(this.ip + "/estadistica/estados", this.optionsGET)
			.toPromise()
			.then((response: any) => {
				// Helpers.setLoading(false); return JSON.parse(response._body)
			});
	}

	public putVenta(venta) {
		// Helpers.setLoading(true);
		return this.http.put(this.ip + "/validacion/updateVenta/" + venta.id, venta, this.optionsPOST)
			.toPromise()
			.then((response: any) => {
				// Helpers.setLoading(false);
				this.sendMessage("La venta fue modifcada correctamente.", 'success');
			});
	}

	public deleteUsuario(nombreUsuario) {
		// Helpers.setLoading(true);
		return this.http.delete(this.ip + "/usuario/delete/" + nombreUsuario, this.optionsGET)
			.toPromise()
			.then((response: any) => {
				// Helpers.setLoading(false);
				this.sendMessage("El usuario fue eliminado correctamente.", 'success');

			});
	}

	public postVentasPagadasArchivos(archivos: FormData) {
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

	public postCobrarSocio(idVenta) {
		this.sendMessage('El cobro fue realizado con exito', 'success')
		/*let post = new Modelos.Post("/administracionVenta/digitalizarArchivos", {'idVenta': idVenta},
			"Los archivos fueron guardador correctamente",
			"Hubo un error al guardar los archivos. Intente nuevamente.")
		return this.post(post)*/
	}

}
