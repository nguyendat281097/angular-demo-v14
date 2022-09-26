import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Page } from 'src/app/models/page';
import { CustomerType } from 'src/app/models/customer-type';
import { CustomerTypeService } from 'src/app/services/customer-type/customer-type.service';
import * as alertifyjs from 'alertifyjs';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-type',
  templateUrl: './customer-type.component.html',
  styleUrls: ['./customer-type.component.scss']
})
export class CustomerTypeComponent implements OnInit {

  // alert
  alert = undefined;
  // modal
  modalRef!: BsModalRef;

  message: string = '';

  closeResult: string = '';
  action: string = '';
  page: Page = { pageNumber: 0, pageSize: 5 } as Page;

  id: string = '';
  customerTypes: CustomerType[] = [];
  customerType: CustomerType = {} as CustomerType;
  columns = [
    { name: 'Name', prop: 'name', sortTable: true },
    { name: 'Commission', sortTable: true },

  ];

  constructor(private customerTypeService: CustomerTypeService, private modalService: BsModalService) { }
  // route: lay tham so , routeService chuyen huong
  ngOnInit(): void {
    //
    this.loadDatas();
    alertifyjs.set('notifier', 'position', 'top-right');
  }

  // load list
  loadDatas(page: any = null) {
    if (page != null) {
      this.page.pageNumber = page.offset;
    }
    this.customerTypeService.list(this.page).subscribe(res => {
      this.page = res.pageInfo;
      this.customerTypes = res.data;
    });
  }
  // load a data
  loadData(id: any) {
    this.customerTypeService.get(id).subscribe(res => {
      this.customerType = res.data;
    });
  }

  // save
  save() {
    if(this.customerType.name && this.customerType.commission) {
      this.customerTypeService.save(this.customerType).subscribe((res => {
        if (res.errorCode === 0) {
          this.modalService.hide();
          this.loadDatas();
          this.customerType = {} as CustomerType;
          alertifyjs.success('Update susess');
        } else {
          alertifyjs.error('Update failed');
        }
      }), err => {
        alertifyjs.error('Update failed');
      });
    } else {
      this.message = 'Name and commission are required!';
    }
  }

  // delete
  delete(event: any, id: any) {
    event.preventDefault();
    alertifyjs.confirm('Remove Alert', 'Do you want to remove?', () => {
      this.customerTypeService.delete(id).subscribe(res => {
        if (res.errorCode === 0) {
          this.loadDatas();
          alertifyjs.success('Remove sucessfully');
        } else {
          if (res.errorCode === 200) {
            alertifyjs.error('Remove failed. Data is associated with other objects');
          } else {
            alertifyjs.error('Remove failed');
          }
        }
      });
    }, function () { }).set({ 'transation': 'zoom', 'resizable': 'true', 'movable': 'false', 'labels': { ok: 'Yes', cancel: 'No' } });
  }

  // modals
  hideModal() {
    this.modalService.hide();
  }
  // show modal
  openAdd(template: TemplateRef<any>) {
    this.action = 'Add';
    this.customerType = { id: 0 } as CustomerType;
    this.modalRef = this.modalService.show(template);
  }
  openEdit(event: { preventDefault: () => void; }, id: any, template: TemplateRef<any>) {
    // event.preventDefault();
    this.action = 'Edit';
    // load data here by id, then show dialog
    this.customerTypeService.get(id).subscribe(res => {
      this.customerType = res.data;
      this.modalRef = this.modalService.show(template);
    });
  }

}
