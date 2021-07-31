import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorScheme, IconAnimation, IconBrush } from '../../common';
import { IconModule } from './icon.module';

describe('IconComponents', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [TestApp]
    })

    TestBed.compileComponents();
  }));

  it('should apply class based on icon attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const iconDebugElement = fixture.debugElement.query(By.css('ngx-ui-icon'));

    testComponent.icon = "plus";
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('fa-plus');

    testComponent.icon = "bell";
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('fa-bell');
  });

  it('should apply class based on brush attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const iconDebugElement = fixture.debugElement.query(By.css('ngx-ui-icon'));

    testComponent.brush = "s";
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('fas');

    testComponent.brush = "r";
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('far');

    testComponent.brush = null;
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('fas');
  });

  it('should apply class based on fw attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const iconDebugElement = fixture.debugElement.query(By.css('ngx-ui-icon'));

    testComponent.fw = true;
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('fa-fw');

    testComponent.fw = false
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).not.toContain('fa-fw');

    testComponent.fw = null;
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('fa-fw');
  });

  it('should apply class based on color attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const iconDebugElement = fixture.debugElement.query(By.css('ngx-ui-icon'));

    testComponent.color = "primary";
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('ngx-ui-fgc-primary');

    testComponent.color = "success";
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('ngx-ui-fgc-success');

    testComponent.color = "information";
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('ngx-ui-fgc-information');

    testComponent.color = "warning";
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('ngx-ui-fgc-warning');

    testComponent.color = "error";
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('ngx-ui-fgc-error');
  });

  it('should apply class based on animation attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const iconDebugElement = fixture.debugElement.query(By.css('ngx-ui-icon'));

    testComponent.animation = "pulse";
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('fa-pulse');

    testComponent.animation = "spin"
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('fa-spin');

    testComponent.animation = null;
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).not.toContain('fa-pulse');
    expect(iconDebugElement.nativeElement.classList).not.toContain('fa-spin');
  });
});

@Component({
  selector: 'test-app',
  template: `
    <ngx-ui-icon [icon]="icon" [brush]="brush" [fw]="fw" [color]="color" [animation]="animation"></ngx-ui-icon>
  `
})
class TestApp {

  public icon!: string;
  public brush!: IconBrush;
  public fw!: boolean;
  public color!: ColorScheme;
  public animation!: IconAnimation;

}
