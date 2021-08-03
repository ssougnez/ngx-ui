import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorScheme, IconBrush } from '../../common';
import { MessageModule } from './message.module';

describe('MessageComponents', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MessageModule],
      declarations: [TestApp]
    })

    TestBed.compileComponents();
  }));

  it('should apply class based on color attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const messageDebugElement = fixture.debugElement.query(By.css('ngx-ui-message'));

    testComponent.color = 'primary';
    fixture.detectChanges();

    expect(messageDebugElement.nativeElement.classList).toContain('ngx-ui-message-primary');

    testComponent.color = 'success';
    fixture.detectChanges();

    expect(messageDebugElement.nativeElement.classList).toContain('ngx-ui-message-success');

    testComponent.color = 'information';
    fixture.detectChanges();

    expect(messageDebugElement.nativeElement.classList).toContain('ngx-ui-message-information');

    testComponent.color = 'warning';
    fixture.detectChanges();

    expect(messageDebugElement.nativeElement.classList).toContain('ngx-ui-message-warning');

    testComponent.color = 'error';
    fixture.detectChanges();

    expect(messageDebugElement.nativeElement.classList).toContain('ngx-ui-message-error');

    testComponent.color = null;
    fixture.detectChanges();

    expect(messageDebugElement.nativeElement.classList).toContain('ngx-ui-message-primary');
  });

  it('should apply an icon based on the icon attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;

    testComponent.icon = 'bell';
    fixture.detectChanges();

    let iconDebugElement = fixture.debugElement.query(By.css('.ng-ui-message-icon'));

    expect(iconDebugElement.nativeElement.classList).toContain('fa-bell');

    testComponent.icon = 'times';
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('fa-times');

    testComponent.icon = null;
    fixture.detectChanges();

    iconDebugElement = fixture.debugElement.query(By.css('ngx-ui-icon'));

    expect(iconDebugElement).toBeNull();
  });

  it('should apply an icon brush based on the iconBrush attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;

    testComponent.icon = 'bell';
    testComponent.iconBrush = 's';
    fixture.detectChanges();

    let iconDebugElement = fixture.debugElement.query(By.css('.ng-ui-message-icon'));

    expect(iconDebugElement.nativeElement.classList).toContain('fa-bell');
    expect(iconDebugElement.nativeElement.classList).toContain('fas');

    testComponent.iconBrush = 'r';
    fixture.detectChanges();

    expect(iconDebugElement.nativeElement.classList).toContain('fa-bell');
    expect(iconDebugElement.nativeElement.classList).toContain('far');
  });

  it('should display a cross to dismiss based on the dismissable attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    let crossDebugElement = fixture.debugElement.query(By.css('.ngx-ui-message-cross-icon'));

    expect(crossDebugElement).toBeNull();

    testComponent.dismissable = true;
    fixture.detectChanges();

    crossDebugElement = fixture.debugElement.query(By.css('.ngx-ui-message-cross-icon'));

    expect(crossDebugElement).not.toBeNull();
  });

  it('should be dismissable', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const messageDebugElement = fixture.debugElement.query(By.css('ngx-ui-message'));

    testComponent.dismissable = true;
    fixture.detectChanges();

    let crossDebugElement = fixture.debugElement.query(By.css('.ngx-ui-message-cross-icon'));

    crossDebugElement.nativeElement.click();

    fixture.detectChanges();

    expect(messageDebugElement.nativeElement.classList).toContain('ngx-ui-hidden');
  });

  it('should insert the title', () => {
    const title = "I'm the title";
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;

    testComponent.title = title;
    fixture.detectChanges();

    let titleDebugElement = fixture.debugElement.query(By.css('.ngx-ui-message-title'));

    expect(titleDebugElement.nativeElement.innerText).toEqual(title.toUpperCase());
  });

  it('should insert the content', () => {
    const content = "I'm the content";
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;

    testComponent.content = content;
    fixture.detectChanges();

    let contentDebugElement = fixture.debugElement.query(By.css('.ngx-ui-message-content'));

    expect(contentDebugElement.nativeElement.innerText).toEqual(content);
  });

});

@Component({
  selector: 'test-app',
  template: `
    <ngx-ui-message [color]="color" [icon]="icon" [iconBrush]="iconBrush" [dismissable]="dismissable">
      <ng-container *ngx-ui-message-title>{{ title }}</ng-container>
      <ng-container *ngx-ui-message-content>{{ content }}</ng-container>
    </ngx-ui-message>
  `
})
class TestApp {

  public color!: ColorScheme;
  public icon!: string;
  public iconBrush!: IconBrush;
  public dismissable = false;
  public title!: string;
  public content!: string;

}
