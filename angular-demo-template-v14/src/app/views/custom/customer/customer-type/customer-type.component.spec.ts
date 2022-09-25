import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// icon
import { CardModule, GridModule, PaginationModule, TableModule, UtilitiesModule, ButtonModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from 'src/app/icons/icon-subset';
import { DocsComponentsModule } from 'src/components';
import { IconModule } from '@coreui/icons-angular';

import { CustomerTypeComponent } from './customer-type.component';


describe('CustomerTypeComponent', () => {
  let component: CustomerTypeComponent;
  let fixture: ComponentFixture<CustomerTypeComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTypeComponent ],
      imports: [GridModule, CardModule, TableModule, GridModule, UtilitiesModule, DocsComponentsModule, RouterTestingModule, PaginationModule, IconModule],
      providers: [IconSetService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(CustomerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
