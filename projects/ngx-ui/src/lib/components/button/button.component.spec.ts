import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonModule } from './button.module';

let fixture: ComponentFixture<TestApp>;
let component: TestApp;

let buttons: DebugElement[];

describe('ButtonComponents', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule],
      declarations: [TestApp]
    })

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestApp);
    component = fixture.componentInstance;

    fixture.detectChanges();

  })

});

@Component({
  selector: 'test-app',
  template: `

  `
})
class TestApp {

}
