import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymnetinfoComponent } from './paymnetinfo.component';

describe('PaymnetinfoComponent', () => {
  let component: PaymnetinfoComponent;
  let fixture: ComponentFixture<PaymnetinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymnetinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymnetinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
