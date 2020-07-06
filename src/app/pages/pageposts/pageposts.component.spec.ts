import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagepostsComponent } from './pageposts.component';

describe('PagepostsComponent', () => {
  let component: PagepostsComponent;
  let fixture: ComponentFixture<PagepostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagepostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagepostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
