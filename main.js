let gridApi;

class CustomButtonComponent {
  init() {
    this.eGui = document.createElement("div");
    let eButton = document.createElement("button");
    eButton.className = "btn-simple";
    eButton.innerText = "Push Me!";
    this.eventListener = () => alert("clicked");
    eButton.addEventListener("click", this.eventListener);
    this.eGui.appendChild(eButton);
  }

  getGui() {
    return this.eGui;
  }

  refresh() {
    return true;
  }

  destroy() {
    if (this.eButton) {
      this.eButton.removeEventListener("click", this.eventListener);
    }
  }
}



const gridOptions = {
  pagination: true,
  paginationPageSize: 500,
  paginationPageSizeSelector: [200, 500, 1000],
  rowData: getData(),
  columnDefs: [
    {
      field: "Interesado",
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      cellDataType: 'boolean',
      editable: true,
      hide: true,
      type: "editableColumn",
    },
    {
      field: "Posicion",
      cellDataType: 'number',
      editable: true,
      hide: true,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0,
        max: 300
      }
    },
    {
      field: "Codigo",
      hide: false,
    },
    {
      field: "Denominacion",
      headerName: "Centro",
    },
    { field: "Direccion" },
    {
      field: "Codigo_postal",
      headerName: "Codigo postal",
      hide: true,
    },
    {
      field: "Localidad",
    },
    {
      field: "Provincia",
    },
    {
      field: "Telefono",
      hide: true,
    },
    {
      field: "Comarca",
    },
    {
      field: "maps",
      cellRenderer: MapsRenderer,
    },
  ],


  defaultColDef: {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    flex: 1,
  },

  /*rowClassRules: {
    "rag-green": (params) => params.data.Localidad === "PATERNA",
  },*/
  rowSelection: "multiple",
};

function onBtnExport() {
  gridApi.exportDataAsCsv();
}

function onBtnUpdate() {
  document.querySelector("#csvResult").value = gridApi.getDataAsCsv();
}

function MapsRenderer(params) {
  const link = `<a href="https://www.google.com/maps/search/?api=1&query=${params.value}" target="_blank">Maps</a>`
  return link
}





const gridDiv = document.querySelector("#myGrid");
gridApi = agGrid.createGrid(gridDiv, gridOptions);
