import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalTitleDirective } from '@coreui/angular';
import { Page } from 'src/app/models/page';
import { CustomerType } from 'src/app/models/customer-type';
import { CustomerTypeService } from 'src/app/services/customer-type/customer-type.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-customer-type',
  templateUrl: './customer-type.component.html',
  styleUrls: ['./customer-type.component.scss']
})
export class CustomerTypeComponent implements OnInit {

  alert = undefined;

  @ViewChild('editModal', { static: false })
  editModal: ModalTitleDirective = new ModalTitleDirective;
  closeResult: string = '';
  action: string = '';
  page: Page = { pageNumber: 0, pageSize: 5} as Page;

  id: string = '';
  customerTypes: CustomerType[] = [];
  customerType: CustomerType = {} as CustomerType;
  columns = [
    {name: 'Name', prop: 'name', sortTable: true},
    {name: 'Commission', sortTable: true},

  ];

  constructor(private customerTypeService: CustomerTypeService) {}
    // route: lay tham so , routeService chuyen huong
  ngOnInit(): void {
    //
    this.loadDatas();
    alertifyjs.set('notifier', 'position', 'top-right');
  }

  // load list
loadDatas(page: any = null) {
  if ( page != null) {
    this.page.pageNumber = page.offset;
  }
  this.customerTypeService.list(this.page).subscribe(res => {
    this.page = res.pageInfo;
    this.customerTypes = res.data;
  });
}
// load a data
loadData(id: any) {
  this.customerTypeService.get(id).subscribe( res => {
    this.customerType = res.data;
  });
}

// save
// save() {
//   this.customerTypeService.save(this.customerType).subscribe(( res => {
//     if (res.errorCode === 0) {
//       this.editModal.hide();
//       this.loadDatas();
//       this.customerType = {} as CustomerType;
//       this.pnotifyService.success('Info', 'Update susess');
//     } else {
//       this.pnotifyService.error('Info', 'Update failed');
//     }
//   }), err => {
//     this.pnotifyService.error('Info', 'Update failed');
//   });
// }

// delete
delete(event: any, id: any) {
  event.preventDefault();
  alertifyjs.confirm('Remove Alert','Do you want to remove?', () =>{
    this.customerTypeService.delete(id).subscribe( res => {
      if ( res.errorCode === 0) {
        this.loadDatas();
        alertifyjs.success('Remove sucessfully');
      } else {
        if ( res.errorCode === 200) {
          alertifyjs.error('Remove failed. Data is associated with other objects');
        } else {
          alertifyjs.error('Remove failed');
        }
      }
    });
  }, function(){}).set({'transation':'zoom', 'resizable':'true', 'movable': 'false', 'labels':{ok:'Yes', cancel:'No'}});
}

// // modals
// hideModal() {
//   this.editModal.hide();
//   }
//   // show modal
//   openAdd() {
//     this.action = 'Add';
//     this.customerType = { id: 0 } as CustomerType;
//     this.editModal.show();
//   }
//   openEdit(event, id) {
//     event.preventDefault();
//     this.action = 'Edit';
//     // load data here by id, then show dialog
//     this.customerTypeService.get(id).subscribe( res => {
//       this.customerType = res.data;
//       this.editModal.show();
//     });
//   }

//   getAlert(text: any) {
//     this.alert = this.pnotifyService.getPNotifyAlert();
//     this.alert({
//       text: 'Notice me, senpai!'
//     });
//   }

}
