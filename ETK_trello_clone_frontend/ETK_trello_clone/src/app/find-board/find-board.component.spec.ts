import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindBoardComponent } from './find-board.component';

describe('FindBoardComponent', () => {
  let component: FindBoardComponent;
  let fixture: ComponentFixture<FindBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindBoardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FindBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
