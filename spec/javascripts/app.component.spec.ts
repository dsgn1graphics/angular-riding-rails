import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../../app/assets/angular/src/app/components/app.component';
describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AppComponent]});
  });
  it ('should work', async(() => {
    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(AppComponent);
      expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    })
  }));
});