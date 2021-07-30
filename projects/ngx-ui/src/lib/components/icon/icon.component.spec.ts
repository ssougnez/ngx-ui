import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconModule } from './icon.module';

let fixture: ComponentFixture<TestApp>;
let icons: DebugElement[];

describe('IconComponents', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [TestApp]
    })

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestApp);

    fixture.detectChanges();

    icons = fixture.debugElement.queryAll(By.css('ngx-ui-icon'));
  })

  it('should support the icon input', () => {
    expect(icons[0].nativeElement.classList).toContain('fa-plus');
  });

  it('should support the brush input', () => {
    expect(icons[1].nativeElement.classList).toContain('far');
  });

  it('should support the fw input', () => {
    expect(icons[2].nativeElement.classList).not.toContain('fa-fw');
    expect(icons[3].nativeElement.classList).toContain('fa-fw');
  });

  it('should support the color input', () => {
    expect(icons[4].nativeElement.classList).toContain('ngx-ui-fgc-error');
  });

  it('should support the animation input', () => {
    expect(icons[5].nativeElement.classList).toContain('fa-pulse');
  });
});

@Component({
  selector: 'test-app',
  template: `
    <ngx-ui-icon icon="plus"></ngx-ui-icon>
    <ngx-ui-icon icon="plus" brush="r"></ngx-ui-icon>
    <ngx-ui-icon icon="plus" [fw]="false"></ngx-ui-icon>
    <ngx-ui-icon icon="plus" [fw]="true"></ngx-ui-icon>
    <ngx-ui-icon icon="plus" color="error"></ngx-ui-icon>
    <ngx-ui-icon icon="plus" animation="pulse"></ngx-ui-icon>
  `
})
class TestApp { }
