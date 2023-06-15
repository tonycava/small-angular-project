import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogsComponent } from './dogs.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DogsComponent', () => {
  let component: DogsComponent;
  let fixture: ComponentFixture<DogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DogsComponent],
      providers: []
    });
    fixture = TestBed.createComponent(DogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
