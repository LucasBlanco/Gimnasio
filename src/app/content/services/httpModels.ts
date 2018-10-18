export class Post {
	url: string;
	data: any;
	mensajeExito?: string;
	mensajeError?: any;
	constructor(url, data, mensajeExito?, mensajeError?) {
		this.url = url;
		this.data = data;
		this.mensajeExito = mensajeExito;
		this.mensajeError = mensajeError;
	}
}

export class Get {
	url: string;
	mensajeError: string;
	constructor(url, mensajeError) {
		this.url = url;
		this.mensajeError = mensajeError;
	}
}
