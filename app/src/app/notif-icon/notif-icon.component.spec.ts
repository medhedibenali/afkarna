import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifIconComponent } from './notif-icon.component';

describe('NotifIconComponent', () => {
  let component: NotifIconComponent;
  let fixture: ComponentFixture<NotifIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
