// src/app/my-grid-application/my-grid-application.component.ts
import {Component} from "@angular/core";
import {GridOptions} from "ag-grid";
import {RedComponentComponent} from "../red-component/red-component.component";


@Component({
    selector: 'app-my-grid-application',
    templateUrl: './my-grid-application.component.html',
    styleUrls: ['./my-grid-application.component.css']
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
          enableFilter: true,
         
          getRowStyle(params) {
            if (params.data.thisEdited) {
                return {'color': 'orange'}
            }
            return null;
          },
          onCellValueChanged: function(event) {
            event.data.thisEdited=true;
            console.log(event);
            console.log(event.rowIndex);

            let row = event.api.getDisplayedRowAtIndex(event.rowIndex);
            event.api.redrawRows({ rowNodes: [row] });
          }
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
        ];

    }   


    private isEditedRow() {
      return (params) => {
          return params.data.thisEdited;
      }
    }


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
      //params.data.thisEdited=true;
      return this.eInput.value;
    };
    Datepicker.prototype.destroy = function () { };
    Datepicker.prototype.isPopup = function () {
      return true;
    };
    return Datepicker;
  }
}