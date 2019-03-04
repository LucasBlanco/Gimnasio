import * as moment from "moment";

export class Fecha {
  front: string;
  back: string;

  constructor(fecha?: string) {
    if (!fecha) {
      this.back = moment().format("YYYY-MM-DD");
      this.front = moment().format("DD/MM/YYYY");
      return;
    }
    if (fecha.includes("/")) {
      this.front = fecha;
      this.back = this.toBack(fecha);
    } else {
      this.back = fecha;
      this.front = this.toFront(fecha);
    }
  }

  public change(fecha: string) {
    this.back = fecha;
    this.front = this.toFront(fecha);
  }

  private toFront(fecha: string) {
    return moment(fecha, "YYYY-MM-DD").format("DD/MM/YYYY");
  }

  private toBack(fecha: string) {
    return moment(fecha, "DD/MM/YYYY").format("YYYY-MM-DD");
  }

  add(cant: number, tiempo: "days" | "months" | "years") {
    const fecha = moment(this.back)
      .add(cant, tiempo)
      .format("YYYY-MM-DD");
    this.back = fecha;
    this.front = this.toFront(fecha);
    return this;
  }
}
