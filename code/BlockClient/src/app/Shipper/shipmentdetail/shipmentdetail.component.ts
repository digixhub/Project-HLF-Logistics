
import { Component, OnInit, ViewChild, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ShipmentlistDataSource } from '../shipments/shipment.datasource';
import { BlockService } from '../../block.service';
import { Key } from 'protractor';


@Component({
  selector: 'app-shipmentdetail',
  templateUrl: './shipmentdetail.component.html',
  styleUrls: ['./shipmentdetail.component.css']
})
export class ShipmentdetailComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: ShipmentlistDataSource;
    @Input() updatelist: Date;
    @Output() selectshipment: EventEmitter<any> = new EventEmitter();

    constructor(private service: BlockService) {
      this.loadShipments();
    }
    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['bookingNumber', 'manufacturer', 'retailer', 'pickupdate', 'pickuplocation', "deliverydate","deliverylocation","action"];
  
    ngOnInit() {
    }
    ngOnChanges(changes: SimpleChanges) {
      if (changes['updatelist'])
        this.loadShipments();
    }
 
    loadShipments() {
      this.service.getShipmentList().subscribe(res => {
        let shipments = [];
        JSON.parse(res).forEach(element => {
          shipments.push({          
            bookingNumber: element.bookingNumber
            , manufacturer: element.Record.manufacturer
            , retailer: element.Record.retailer
            , pickupdate: element.Record.pickupdate
            , pickuplocation: element.Record.pickuplocation
            , deliverydate: element.Record.deliverydate
            , deliverylocation: element.Record.deliverylocation
            , action: element.Record.action
          });
        });
        this.service.updatedAssetCount(shipments.length);
  
        this.dataSource = new ShipmentlistDataSource(this.paginator, this.sort, shipments);
        this.dataSource.connect()
      });
   }
  }
