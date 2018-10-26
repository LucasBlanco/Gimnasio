import { Injectable } from '@angular/core';
import * as Modelos from './httpModels';
import { Http,  RequestOptions, Headers } from '@angular/http';
import toastr from 'toastr';
declare var $: any;

@Injectable()
export class HttpService {

	constructor(private http: Http) {
		const token = localStorage.getItem('token');
		 this.headerPOST = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
		this.optionsPOST = new RequestOptions({ headers: this.headerPOST });
		this.headerGET = new Headers({'Authorization': 'Bearer ' + token, 'Access-Control-Allow-Origin': '*'});
		this.optionsGET = new RequestOptions({ headers: this.headerGET });
		// this.ip = localStorage.getItem('currentServerIP');
		this.ip = 'http://localhost:8000';
	}
	public usuario;
	private loading: boolean = false;
	private ip: string;
	private headerPOST = new Headers();
	private optionsPOST = new RequestOptions();
	private headerGET = new Headers();
	private optionsGET = new RequestOptions();

	sendMessage(mensaje: string, tipo: string) {
		toastr.options = {
			'closeButton': true,
			'debug': true,
			'newestOnTop': true,
			'progressBar': false,
			'positionClass': 'toast-bottom-right',
			'preventDuplicates': false,
			'showDuration': '300',
			'hideDuration': '1000',
			'timeOut': '5000',
			'extendedTimeOut': '1000',
			'showEasing': 'swing',
			'hideEasing': 'linear',
			'showMethod': 'fadeIn',
			'hideMethod': 'fadeOut'
		};
		if (tipo === 'success') {
			toastr.success(mensaje, 'Exelente!');
		} else if (tipo === 'warning') {
            toastr.warning(mensaje, 'Advertencia!');
        } else {
			toastr.error(mensaje, 'Error!');
		}
	}

	private showLoadingMessage() {
		$.blockUI({ message: '<div style=" display: flex; justify-content: center;">' +
				'<div class="m-blockui " style="margin-left:-80px;">' +
				'<span>Cargando...</span>' +
				'<span><div class="m-loader  m-loader--success m-loader--lg"></div></span>' +
				'</div>' +
				'</div>',
			css: {border: 'none', backgroundColor: 'none'}});
	}

	private hideLoadingMessage() {
		$.unblockUI();
	}

	public mapper(httpServiceFunction, mapFunction): Promise<any> {
		return new Promise((resolve, reject) => {
			httpServiceFunction.then( respuesta => {
				resolve(mapFunction(respuesta));
			});
		});
	}

	public post(post: Modelos.Post) {
		console.log('Post', post);
		return new Promise((resolve, reject) => {
			this.http.post(this.ip + post.url, post.data, this.optionsPOST)
				.toPromise()
				.then((response: any) => {
					if (post.mensajeExito) {
						this.sendMessage(post.mensajeExito, 'success');
					}
                    let respuesta
					try{
                        respuesta= JSON.parse(response._body)
                    }
                    catch(err){
					    respuesta = response._body
                    }
					resolve(respuesta);
				})
				.catch((response: any) => {
					if (post.mensajeError !== undefined) {
						this.sendMessage(post.mensajeError, 'error');
					}
					reject();
				});
		});
	}

	public put(post: Modelos.Post) {

		console.log('Put', post);
		return new Promise((resolve, reject) => {
			this.http.put(this.ip + post.url, post.data, this.optionsPOST)
				.toPromise()
				.then((response: any) => {
					if (post.mensajeExito) {
						this.sendMessage(post.mensajeExito, 'success');
					}
					resolve();
				})
				.catch((response: any) => {
					if (post.mensajeError) {
						this.sendMessage(post.mensajeError, 'error');
					}
					reject();
				});
		});


	}

	public get(get: Modelos.Get) {
		console.log('Get', get);
		this.showLoadingMessage();
		return new Promise((resolve, reject) => {
			this.http.get(this.ip + get.url, this.optionsGET)
				.toPromise()
				.then((response: any) => {
					this.hideLoadingMessage();
					response = JSON.parse(response._body);
                    console.log('Respose', response);
					resolve(response);

				})
				.catch((response: any) => {
					this.hideLoadingMessage();
					this.sendMessage(get.mensajeError, 'error');
					reject(response);
				});
		});
	}

	private getEstados() {
		// Helpers.setLoading(true);
		return this.http.get(this.ip + '/estadistica/estados', this.optionsGET)
			.toPromise()
			.then((response: any) => {
				// Helpers.setLoading(false); return JSON.parse(response._body)
			});
	}

	private putVenta(venta) {
		// Helpers.setLoading(true);
		return this.http.put(this.ip + '/validacion/updateVenta/' + venta.id, venta, this.optionsPOST)
			.toPromise()
			.then((response: any) => {
				// Helpers.setLoading(false);
				this.sendMessage('La venta fue modifcada correctamente.', 'success');
			});
	}

	private deleteUsuario(nombreUsuario) {
		// Helpers.setLoading(true);
		return this.http.delete(this.ip + '/usuario/delete/' + nombreUsuario, this.optionsGET)
			.toPromise()
			.then((response: any) => {
				// Helpers.setLoading(false);
				this.sendMessage('El usuario fue eliminado correctamente.', 'success');

			});
	}

	private postVentasPagadasArchivos(archivos: FormData) {
		// Helpers.setLoading(true);
		const headers = new Headers();
		headers.delete('Content-Type');
		const options = new RequestOptions({ headers: headers });
		return new Promise((resolve, reject) => {
			this.http.post('http://gestionarturnos.com/ventas/uploadAdmin.php', archivos, options)
				.toPromise()
				.then((response: any) => {
					// Helpers.setLoading(false);
					resolve();
				})
				.catch((response: any) => {
					// Helpers.setLoading(false);
					this.sendMessage('Hubo un error al guardar los archivos. Intente nuevamente.', 'error');
					reject();
				});
		});
	}




}
