import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreSongsOverviewComponent } from './genre-songs-overview.component';

describe('GenreSongsOverviewComponent', () => {
  let component: GenreSongsOverviewComponent;
  let fixture: ComponentFixture<GenreSongsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreSongsOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreSongsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
