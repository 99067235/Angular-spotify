import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsOverviewComponent } from './songs-overview.component';

describe('SongsOverviewComponent', () => {
  let component: SongsOverviewComponent;
  let fixture: ComponentFixture<SongsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
