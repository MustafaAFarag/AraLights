import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMapComponent } from './company-map.component';

describe('CompanyMapComponent', () => {
  let component: CompanyMapComponent;
  let fixture: ComponentFixture<CompanyMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
