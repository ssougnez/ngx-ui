import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

    buttons = fixture.debugElement.queryAll(By.css('ng-ui-button'));
  })

  it('should use the content as the button label', () => {
    expect(buttons[0].query(By.css('.ng-ui-button-label')).nativeElement.innerText).toBe('NORMAL');
  });
});

@Component({
  selector: 'test-app',
  template: `
    <ng-ui-button>Normal</ng-ui-button>
    <ng-ui-button [disabled]="true">Disabled</ng-ui-button>
  `
})
class TestApp {

}
