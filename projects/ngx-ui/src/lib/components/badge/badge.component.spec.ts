import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorScheme } from '../../common';
import { BadgeModule } from './badge.module';

describe('BadgeComponents', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BadgeModule],
      declarations: [TestApp]
    })

    TestBed.compileComponents();
  }));

  it('should display the value', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const badgeDebugElement = fixture.debugElement.query(By.css('ngx-ui-badge'));

    testComponent.value = 50;
    fixture.detectChanges();

    expect(badgeDebugElement.nativeElement.innerText).toBe('50');
  });

  it('should truncate the value if higher than max', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const badgeDebugElement = fixture.debugElement.query(By.css('ngx-ui-badge'));

    testComponent.value = 50;
    testComponent.max = 25;
    fixture.detectChanges();

    expect(badgeDebugElement.nativeElement.innerText).toBe('25+');
  });

  it('should apply class based on color attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const badgeDebugElement = fixture.debugElement.query(By.css('ngx-ui-badge'));

    testComponent.color = 'primary';
    testComponent.value = 50;

    fixture.detectChanges();

    expect(badgeDebugElement.nativeElement.classList).toContain('ngx-ui-bgc-primary');

    testComponent.color = 'success';

    fixture.detectChanges();

    expect(badgeDebugElement.nativeElement.classList).toContain('ngx-ui-bgc-success');

    testComponent.color = 'information';

    fixture.detectChanges();

    expect(badgeDebugElement.nativeElement.classList).toContain('ngx-ui-bgc-information');

    testComponent.color = 'warning';

    fixture.detectChanges();

    expect(badgeDebugElement.nativeElement.classList).toContain('ngx-ui-bgc-warning');

    testComponent.color = 'error';

    fixture.detectChanges();

    expect(badgeDebugElement.nativeElement.classList).toContain('ngx-ui-bgc-error');

    testComponent.color = null;

    fixture.detectChanges();

    expect(badgeDebugElement.nativeElement.classList).toContain('ngx-ui-bgc-primary');
  });
});

@Component({
  selector: 'test-app',
  template: `
    <ngx-ui-badge [color]="color" [value]="value" [max]="max"></ngx-ui-badge>
  `
})
class TestApp {

  public color!: ColorScheme;
  public value!: number;
  public max!: number;

}
