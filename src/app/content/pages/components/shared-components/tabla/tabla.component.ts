import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { FileUploadModalComponent } from "../file-upload/file-upload-modal.component";
import * as $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-responsive-dt";
import "datatables.net-buttons-dt";

@Component({
  selector: "m-tabla",
  templateUrl: "./tabla.component.html"
})
export class TablaComponent
  implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() filtered: boolean = true; // Si la tabla contiene filtros
  @Input() datos: Array<any> = []; // Los datos que se mostraran en la tabla. Ejemplo: [{'name': Lucas, 'lastName': Blanco}]
  @Input() estilos = {};
  @Input() nombreColumnas: Array<any>; // Los nombres ordenados de cada una de las columnas. Ejemplo: ['Nombre', 'Apellido']
  @Input() valorColumnas: Array<string>; // Los nombres de las variables de los datos, en el mismo orden que el nombre de la columna correspondiente. Ejemplo: ['name', 'lastName']
  @Input() acciones: Array<{
    callback: Function;
    class: string;
    name: string;
  }> = []; // El nombre de la accion a realizar un coma y el icono del boton.
  @Input() totalesACalcular: Array<string> = [];
  @Input() promediosACalcular: Array<string> = [];
  @Input() imagen: Array<string>;
  @Input() fallbackImagen: string;
  @Input() checked: boolean = false;
  @Output() onCheck: EventEmitter<number> = new EventEmitter();
  @ViewChild(FileUploadModalComponent) modalImg;
  inputs = {};
  columnas;
  totales: Array<any> = [];
  tabla;
  options = {
    columnDefs: [],
    responsive: !0,
    language: {
      sProcessing: "Procesando...",
      sLengthMenu: "Mostrar _MENU_ registros",
      sZeroRecords: "No se encontraron resultados",
      sEmptyTable: "Ningún dato disponible en esta tabla",
      sInfo: "Mostrando del _START_ al _END_ de  _TOTAL_ ",
      sInfoEmpty: "",
      sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
      sInfoPostFix: "",
      sSearch: "Buscar:",
      sUrl: "",
      sInfoThousands: ",",
      sLoadingRecords: "Cargando...",
      oPaginate: {
        sFirst: "<<",
        sLast: ">>",
        sNext: ">",
        sPrevious: "<"
      },
      oAria: {
        sSortAscending:
          ": Activar para ordenar la columna de manera ascendente",
        sSortDescending:
          ": Activar para ordenar la columna de manera descendente"
      }
    }
  };
  imagenExpandida: string = null;

  constructor(private chRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line:no-unused-expression
    this.tabla && this.tabla.clear();
    let priority = 0;
    this.iniciarOptions();
    if (this.checked) {
      this.datos["checked"] = (this.datos as any).checked || false;
    }
    let offset = 0;
    if (this.checked) {
      this.options.columnDefs.push({
        responsivePriority: ++priority,
        orderable: false,
        targets: 0
      });
      offset += 1;
    }
    if (this.imagen) {
      this.options.columnDefs.push({
        responsivePriority: 20,
        orderable: false,
        targets: this.checked ? 1 : 0
      });
      offset += 1;
    }
    this.nombreColumnas.forEach((n, i) => {
      if (n.includes("*")) {
        this.options.columnDefs.push({
          responsivePriority: ++priority,
          targets: i + offset
        });
      }
      if (!n.includes("/")) {
        this.options.columnDefs.push({
          searchable: false,
          targets: i + offset
        });
      }
      if (n.includes("<input>")) {
        this.inputs[this.valorColumnas[i]] = {
          tipo: typeof this.valorColumnas[i] === "string" ? "text" : "number"
        };
      }
    });
    this.columnas = this.nombreColumnas.map(n =>
      n
        .replace("*", "")
        .replace("/", "")
        .replace("<input>", "")
    );

    if (($.fn as any).DataTable.isDataTable("#m_table_1")) {
      this.tabla.destroy();
    }
    if (this.hayAcciones()) {
      this.options.columnDefs.push({ responsivePriority: 0, targets: -1 });
    }
    this.chRef.detectChanges();

    this.tabla = ($("#m_table_1") as any).DataTable(this.options);
  }

  ngOnInit() {
    this.iniciarOptions();
  }
  ngOnDestroy(): void {
    this.tabla.destroy();
  }
  emitOnCheck(dato) {
    this.onCheck.emit(dato);
  }

  ngAfterViewInit() {}

  seleccionarTodos = bool => this.datos.forEach(dato => (dato.checked = bool));

  hayAcciones = () => this.acciones.length > 0;

  iniciarOptions = () => {
    this.options = {
      columnDefs: [],
      responsive: !0,
      language: {
        sProcessing: "Procesando...",
        sLengthMenu: "Mostrar _MENU_ registros",
        sZeroRecords: "No se encontraron resultados",
        sEmptyTable: "Ningún dato disponible en esta tabla",
        sInfo: "Mostrando del _START_ al _END_ de  _TOTAL_ ",
        sInfoEmpty: "",
        sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
        sInfoPostFix: "",
        sSearch: "Buscar:",
        sUrl: "",
        sInfoThousands: ",",
        sLoadingRecords: "Cargando...",
        oPaginate: {
          sFirst: "<<",
          sLast: ">>",
          sNext: ">",
          sPrevious: "<"
        },
        oAria: {
          sSortAscending:
            ": Activar para ordenar la columna de manera ascendente",
          sSortDescending:
            ": Activar para ordenar la columna de manera descendente"
        }
      }
    };
  };

  expandirImagen(imagen) {
    this.imagenExpandida = imagen;
    this.modalImg.show();
  }
}
