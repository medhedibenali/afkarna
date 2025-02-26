import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FeaturesPageComponent } from "./features-page.component";

describe("FeaturesPageComponent", () => {
  let component: FeaturesPageComponent;
  let fixture: ComponentFixture<FeaturesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesPageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeaturesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
