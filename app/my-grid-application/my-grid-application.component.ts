// src/app/my-grid-application/my-grid-application.component.ts
import {Component} from "@angular/core";
import {GridOptions} from "ag-grid";
import {RedComponentComponent} from "../red-component/red-component.component";


@Component({
    selector: 'app-my-grid-application',
    templateUrl: './my-grid-application.component.html'
})
export class MyGridApplicationComponent {
    private gridOptions: GridOptions;
    private components;
    private gridApi;
    private gridColumnApi;
    private rowData;
    private columnDefs;

    constructor() {
        this.gridOptions = <GridOptions>{
          enableSorting: true,
          // enable filtering 
          enableFilter: true
        };
        
        this.columnDefs = [
            {
                headerName: "ID",
                field: "id",
                width: 100
            },
            {
                headerName: "Value",
                field: "value",
                cellRendererFramework: RedComponentComponent,
                width: 100
            },
            //   {
            //     headerName: "Date",
            //     field: "Date",
            //     cellRenderer:function(params) {
            //         return '<input type="date"  >';
            //     },
            //     width: 160,
            //     editable: true
            // }
            {
                headerName: "Date",
                field: 'date',
                editable: true,
                cellEditor: 'datePicker',
           },

        ];
        
        this.components = { datePicker: this.getDatePicker() };
    }


  onGridReady(params) {
    //console.log("Grid said ready");
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = [
            {id: 5, value: 10},
            {id: 10, value: 15},
            {id: 15, value: 20}
        ]
    }

  // callbackCheck(){
  //     var cellDefs = this.gridOptions.api.getEditingCells();
  //     cellDefs.forEach(function(cellDef) {
  //         console.log(cellDef.rowIndex);
  //         console.log(cellDef.column.getId());
  //         console.log(cellDef.floating);
  //     });
  //   }    


  getDatePicker() {
    function Datepicker() { }
    var eInput: any;
    var rowId: number;
    Datepicker.prototype.init = function (params) {
      this.eInput = document.createElement('input');
      this.eInput.classList.add('ag-input');
       this.eInput.setAttribute("type", "date");
      this.eInput.style.height = '100%';
      console.log(params);
      this.rowIndex = params.rowIndex;
     //this.eInput ='<input type="date"  class="ag-input">';
    };
    Datepicker.prototype.getGui = function () {
      return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function () {
      this.eInput.focus();
      this.eInput.select();
    };
    Datepicker.prototype.getValue = function (params) {
      return this.eInput.value;
    };
    Datepicker.prototype.destroy = function () { };
    Datepicker.prototype.isPopup = function () {
      return true;
    };
    return Datepicker;
  }
}