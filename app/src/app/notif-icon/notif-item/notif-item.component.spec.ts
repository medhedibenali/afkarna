import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifItemComponent } from './notif-item.component';

describe('NotifItemComponent', () => {
  let component: NotifItemComponent;
  let fixture: ComponentFixture<NotifItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
