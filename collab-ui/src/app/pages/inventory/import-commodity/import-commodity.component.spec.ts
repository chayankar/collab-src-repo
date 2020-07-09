import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCommodityComponent } from './import-commodity.component';

describe('ImportCommodityComponent', () => {
  let component: ImportCommodityComponent;
  let fixture: ComponentFixture<ImportCommodityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportCommodityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
