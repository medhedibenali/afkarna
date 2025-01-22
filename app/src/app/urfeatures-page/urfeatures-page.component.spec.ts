import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrfeaturesPageComponent } from './urfeatures-page.component';

describe('UrfeaturesPageComponent', () => {
  let component: UrfeaturesPageComponent;
  let fixture: ComponentFixture<UrfeaturesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrfeaturesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrfeaturesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
