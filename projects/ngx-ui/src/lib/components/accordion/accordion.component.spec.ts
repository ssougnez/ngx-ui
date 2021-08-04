import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AccordionItemState, AccordionStateBehavior, ColorScheme, IconBrush } from '../../common';
import { AccordionItemStateChangedEventData } from './accordion.component';
import { AccordionModule } from './accordion.module';

describe('AccordionComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AccordionModule],
      declarations: [TestApp]
    })

    TestBed.compileComponents();
  }));

  it('should display as many items as specified', () => {
    const fixture = TestBed.createComponent(TestApp);
    const accordionDebugElement = fixture.debugElement.query(By.css('ngx-ui-accordion'));
    const accordionItemsDebugElement = fixture.debugElement.queryAll(By.css('ngx-ui-accordion-item'));

    fixture.detectChanges();

    expect(accordionItemsDebugElement.length).toBe(4);
  });

  it('should allow to only open one item when behavior is set on single', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const accordionItemsDebugElement = fixture.debugElement.queryAll(By.css('ngx-ui-accordion-item'));

    testComponent.title = 'title';
    testComponent.content = 'content';
    testComponent.behavior = 'single';
    fixture.detectChanges();

    expect(accordionItemsDebugElement[0].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[1].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[2].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[3].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');

    accordionItemsDebugElement[1].nativeElement.querySelector('.ngx-ui-accordion-item-header').click();
    fixture.detectChanges();

    expect(accordionItemsDebugElement[0].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[1].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[2].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[3].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');

    accordionItemsDebugElement[2].nativeElement.querySelector('.ngx-ui-accordion-item-header').click();
    fixture.detectChanges();

    expect(accordionItemsDebugElement[0].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[1].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[2].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[3].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');

    accordionItemsDebugElement[3].nativeElement.querySelector('.ngx-ui-accordion-item-header').click();
    fixture.detectChanges();

    expect(accordionItemsDebugElement[0].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[1].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[2].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[3].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');

    accordionItemsDebugElement[3].nativeElement.querySelector('.ngx-ui-accordion-item-header').click();
    fixture.detectChanges();

    expect(accordionItemsDebugElement[0].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[1].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[2].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[3].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
  });

  it('should allow to only all items when behavior is set on multiple', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const accordionItemsDebugElement = fixture.debugElement.queryAll(By.css('ngx-ui-accordion-item'));

    testComponent.title = 'title';
    testComponent.content = 'content';
    testComponent.behavior = 'multiple';
    fixture.detectChanges();

    expect(accordionItemsDebugElement[0].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[1].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[2].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[3].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');

    accordionItemsDebugElement[0].nativeElement.querySelector('.ngx-ui-accordion-item-header').click();
    fixture.detectChanges();

    expect(accordionItemsDebugElement[0].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[1].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[2].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[3].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');

    accordionItemsDebugElement[1].nativeElement.querySelector('.ngx-ui-accordion-item-header').click();
    fixture.detectChanges();

    expect(accordionItemsDebugElement[0].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[1].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[2].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[3].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');

    accordionItemsDebugElement[2].nativeElement.querySelector('.ngx-ui-accordion-item-header').click();
    fixture.detectChanges();

    expect(accordionItemsDebugElement[0].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[1].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[2].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[3].nativeElement.classList).toContain('ngx-ui-accordion-item-expanded');

    accordionItemsDebugElement[3].nativeElement.querySelector('.ngx-ui-accordion-item-header').click();
    fixture.detectChanges();

    expect(accordionItemsDebugElement[0].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[1].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[2].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
    expect(accordionItemsDebugElement[3].nativeElement.classList).not.toContain('ngx-ui-accordion-item-expanded');
  });
});

@Component({
  selector: 'test-app',
  template: `
    <ngx-ui-accordion [behavior]="behavior" [color]="color" [iconExpanded]="iconExpanded" [iconCollapsed]="iconCollapsed" [iconBrush]="iconBrush">
      <ngx-ui-accordion-item [icon]="itemIcon" [initialState]="itemInitialState">
        <ng-container *ngx-ui-accordion-item-title>{{ title }}</ng-container>
        <ng-container *ngx-ui-accordion-item-content>{{ content }}</ng-container>
      </ngx-ui-accordion-item>
      <ngx-ui-accordion-item icon="exclamation-circle">
        <ng-container *ngx-ui-accordion-item-title>Title</ng-container>
        <ng-container *ngx-ui-accordion-item-content>Content</ng-container>
      </ngx-ui-accordion-item>
      <ngx-ui-accordion-item icon="bath">
        <ng-container *ngx-ui-accordion-item-title>Title</ng-container>
        <ng-container *ngx-ui-accordion-item-content>Content</ng-container>
      </ngx-ui-accordion-item>
      <ngx-ui-accordion-item icon="cloud">
        <ng-container *ngx-ui-accordion-item-title>Title</ng-container>
        <ng-container *ngx-ui-accordion-item-content>Content</ng-container>
      </ngx-ui-accordion-item>
    </ngx-ui-accordion>
  `
})
class TestApp {

  public behavior!: AccordionStateBehavior;
  public color!: ColorScheme;
  public iconExpanded!: string;
  public iconCollapsed!: string;
  public iconBrush!: IconBrush;

  public itemIcon!: string;
  public itemInitialState!: AccordionItemState;
  public title!: string;
  public content!: string;

  public index = 0;

  public stateChanged(event: AccordionItemStateChangedEventData) {
    this.index = event.index;
  }

}
