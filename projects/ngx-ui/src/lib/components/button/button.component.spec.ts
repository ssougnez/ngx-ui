import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorScheme, IconAnimation, IconBrush, Size } from '../../common';
import { ButtonModule } from './button.module';

describe('ButtonComponents', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule],
      declarations: [TestApp]
    })

    TestBed.compileComponents();
  }));

  it('should apply class based on color attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const buttonDebugElement = fixture.debugElement.query(By.css('button'));

    testComponent.color = 'primary';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-primary');

    testComponent.color = 'secondary';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-secondary');

    testComponent.color = 'success';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-success');

    testComponent.color = 'information';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-information');

    testComponent.color = 'warning';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-warning');

    testComponent.color = 'error';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-error');

    testComponent.color = null;
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-primary');
  });

  it('should apply class based on light attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const buttonDebugElement = fixture.debugElement.query(By.css('button'));

    testComponent.light = true;
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-light');

    testComponent.light = false;
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).not.toContain('ngx-ui-button-light');

    testComponent.light = null;
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).not.toContain('ngx-ui-button-light');
  });

  it('should apply class based on size attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const buttonDebugElement = fixture.debugElement.query(By.css('button'));

    testComponent.size = 'xs';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-xs');

    testComponent.size = 's';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-s');

    testComponent.size = 'm';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-m');

    testComponent.size = 'l';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-l');

    testComponent.size = 'xl';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-xl');

    testComponent.size = 'fw';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-fw');

    testComponent.size = null;
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('ngx-ui-button-auto');
  });

  it('should apply disabled based on isDisabled attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const buttonDebugElement = fixture.debugElement.query(By.css('button'));

    testComponent.isDisabled = false;
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.disabled).toBeFalsy();

    testComponent.isDisabled = true;
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.disabled).toBeTruthy();

    testComponent.isDisabled = null;
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.disabled).toBeFalsy();
  });

  it('should display an icon based on icon attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const buttonDebugElement = fixture.debugElement.query(By.css('button'));

    let iconDebugElement = fixture.debugElement.query(By.css('ngx-ui-icon'));

    fixture.detectChanges();

    expect(iconDebugElement).toBeNull();

    testComponent.icon = 'plus';
    fixture.detectChanges();

    iconDebugElement = fixture.debugElement.query(By.css('ngx-ui-icon'));

    expect(iconDebugElement).not.toBeNull();
    expect(iconDebugElement.nativeElement.classList).toContain('fa-plus');

    testComponent.icon = null;
    fixture.detectChanges();

    iconDebugElement = fixture.debugElement.query(By.css('ngx-ui-icon'));

    expect(iconDebugElement).toBeNull();
  });

  it('should display an icon based on icon and brush attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;

    testComponent.icon = 'plus';
    testComponent.iconBrush = 's';

    fixture.detectChanges();

    const iconDebugElement = fixture.debugElement.query(By.css('ngx-ui-icon'));

    expect(iconDebugElement.nativeElement.classList).toContain('fa-plus');
    expect(iconDebugElement.nativeElement.classList).toContain('fas');

    testComponent.iconBrush = 'r';
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('far');

    testComponent.iconBrush = null;
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('fas');
  });

  it('should display an icon based on icon and position attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;

    testComponent.icon = 'plus';

    fixture.detectChanges();

    const iconDebugElement = fixture.debugElement.query(By.css('ngx-ui-icon'));

    expect(iconDebugElement.nativeElement.classList).toContain('ngx-ui-button-icon-left');

    testComponent.iconPosition = 'right';
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('ngx-ui-button-icon-right');

    testComponent.iconPosition = null;
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('ngx-ui-button-icon-left');
  });

  it('should display an icon based on icon and animation attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;

    testComponent.icon = 'plus';
    testComponent.iconAnimation = 'spin';

    fixture.detectChanges();

    const iconDebugElement = fixture.debugElement.query(By.css('ngx-ui-icon'));

    expect(iconDebugElement.nativeElement.classList).toContain('fa-spin');

    testComponent.iconAnimation = 'pulse';
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('fa-pulse');

    testComponent.iconAnimation = null;
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).not.toContain('fa-spin');
    expect(iconDebugElement.nativeElement.classList).not.toContain('fa-pulse');
  });

  it('should handle click event', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const buttonDebugElement = fixture.debugElement.query(By.css('button'));

    fixture.detectChanges();

    expect(testComponent.counter).toBe(0);

    buttonDebugElement.nativeElement.click();
    fixture.detectChanges();

    expect(testComponent.counter).toBe(1);
  });

  it('should not handle the click event when disabled', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const buttonDebugElement = fixture.debugElement.query(By.css('button'));

    testComponent.isDisabled = true;

    fixture.detectChanges();

    expect(testComponent.counter).toBe(0);

    buttonDebugElement.nativeElement.click();
    fixture.detectChanges();

    expect(testComponent.counter).toBe(0);
  });
});

@Component({
  selector: 'test-app',
  template: `
    <button ngx-ui-button [color]="color"
                          [light]="light"
                          [size]="size"
                          [icon]="icon"
                          [iconBrush]="iconBrush"
                          [iconPosition]="iconPosition"
                          [iconAnimation]="iconAnimation"
                          [isDisabled]="isDisabled"
                          (click)="clicked()">Button</button>
  `
})
class TestApp {
  public color!: ColorScheme;
  public light!: boolean;
  public size!: Size;
  public icon!: string;
  public iconBrush!: IconBrush;
  public iconPosition!: string;
  public iconAnimation!: IconAnimation;
  public isDisabled!: boolean;
  public counter: number = 0;

  public clicked() {
    this.counter++;
  }
}
