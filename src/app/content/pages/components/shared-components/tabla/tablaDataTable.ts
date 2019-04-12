import * as $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-responsive-dt";
import "datatables.net-buttons-dt";

export class TablaDataTable {
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

  constructor(iniciadores: Function[]) {
    const { options } = iniciadores.reduce(
      (semilla, iniciador) => iniciador(semilla),
      { priority: 0, offset: 0, options: this.options }
    );
    this.options = options;
  }
}
/*
    El objetivo del builder es contener la logica de construccion de la tabla de Datatables
    y guardar una referencia a la misma para poder destruirla 
*/
export class TablaDataTableBuilder {
  dataTable;
  table;
  chRef;
  checked: boolean;
  imagen: boolean;
  acciones: boolean;
  nombreColumnas: string[];
  idTabla: string;

  constructor(
    chRef,
    checked: boolean,
    imagen: boolean,
    acciones: boolean,
    nombreColumnas: string[],
    idTabla: string
  ) {
    this.chRef = chRef;
    this.checked = checked;
    this.imagen = imagen;
    this.acciones = acciones;
    this.nombreColumnas = nombreColumnas;
    this.idTabla = idTabla;
  }

  createTable() {
    this.destruirTabla();
    this.crearTabla(this.checked, this.imagen, this.acciones, this.idTabla);
    return this.table;
  }

  destruirTabla() {
    if (this.table) {
      this.dataTable.destroy();
      this.table = null;
    }
  }

  crearTabla(checked, imagen, acciones, idTabla) {
    const iniciadores: Function[] = [];
    iniciadores.push(loadPrioridadesYSearchables(this.nombreColumnas));
    checked && iniciadores.push(loadChecked);
    imagen && iniciadores.push(loadImagen(checked));
    acciones && iniciadores.push(loadAcciones);

    this.table = new TablaDataTable(iniciadores);
    /*
    La tabla de Datatables se esta contuyendo en funcion al html que se genera dinamicamente con Angular.
    Se tiene que esperar a que se tenrmine de actualizar el html para construir la tabla con Datatable.
    this.chRef.detectChanges(); asegura que se espere a que el template se termine de construir
    */
    this.chRef.detectChanges();

    this.dataTable = ($(`#${idTabla}`) as any).DataTable(this.table.options);
  }
}

const loadPrioridadesYSearchables = nombreColumnas => ({
  priority,
  offset,
  options
}) => {
  nombreColumnas.forEach((n, i) => {
    if (n.includes("*")) {
      options.columnDefs.push({
        responsivePriority: ++priority,
        targets: i + offset
      });
    }
    if (!n.includes("/")) {
      options.columnDefs.push({
        searchable: false,
        targets: i + offset
      });
    }
  });
  return { priority, offset, options };
};

const loadChecked = ({ priority, offset, options }) => {
  options.columnDefs.push({
    responsivePriority: ++priority,
    orderable: false,
    targets: 0
  });
  return { priority, offset, options };
};

const loadImagen = checked => ({ priority, offset, options }) => {
  options.columnDefs.push({
    responsivePriority: 20,
    orderable: false,
    targets: checked ? 1 : 0
  });
  return { priority, offset, options };
};

const loadAcciones = ({ priority, offset, options }) => {
  options.columnDefs.push({ responsivePriority: 0, targets: -1 });
  return { priority, offset, options };
};
