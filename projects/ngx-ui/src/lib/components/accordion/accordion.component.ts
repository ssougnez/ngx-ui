import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ColorScheme, IconBrush } from '../../common';

type ItemState = 'expanded' | 'collapsed';
type StateBehavior = 'single' | 'multiple';

let nextUniqueId = 0;

enum FocusPosition {
  First,
  Next,
  Previous,
  Last
}

export type AccordionItemStateChangedEventData = {
  item: AccordionItemComponent;
  index: number;
}

@Directive({
  selector: '[ngx-ui-accordion-item-title]'
})
export class AccordionItemTitleDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}

@Directive({
  selector: '[ngx-ui-accordion-item-content]'
})
export class AccordionItemContentDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}

@Component({
  selector: 'ngx-ui-accordion',
  template: '<ng-content></ng-content>',
  styleUrls: ['./accordion.component.scss'],
  host: {
    '[class]': '"ngx-ui-accordion-" + (color || "primary")',
    '(keydown.home)': 'moveFocus(FocusPosition.First, $event)',
    '(keydown.end)': 'moveFocus(FocusPosition.Last, $event)',
    '(keydown.arrowdown)': 'moveFocus(FocusPosition.Next, $event)',
    '(keydown.arrowup)': 'moveFocus(FocusPosition.Previous, $event)'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AccordionComponent implements AfterContentInit {

  /****************************************************************** BINDINGS ******************************************************************/

  @Input()
  public behavior: StateBehavior = 'multiple';

  @Input()
  public color: ColorScheme | 'neutral' | 'none' = 'primary';

  @Input()
  public iconExpanded: string = 'chevron-up';

  @Input()
  public iconCollapsed: string = 'chevron-down';

  @Input()
  public iconBrush: IconBrush = 's';

  @Output()
  public itemStateChanged: EventEmitter<AccordionItemStateChangedEventData> = new EventEmitter<AccordionItemStateChangedEventData>();

  @ContentChildren(forwardRef(() => AccordionItemComponent))
  public children!: QueryList<AccordionItemComponent>;

  /****************************************************************** ENUMERATIONS ******************************************************************/

  public FocusPosition: typeof FocusPosition = FocusPosition;

  /****************************************************************** LIFE CYCLE ******************************************************************/

  /** */
  public ngAfterContentInit() {
    if (this.behavior === 'single') {
      this.children
        .filter(c => c.state === 'expanded')
        .slice(1)
        .forEach(c => c.updateState('collapsed'));
    }
  }

  /****************************************************************** PUBLIC ******************************************************************/

  /**
   * 
   * @param trigger
   */
  public ensureState(trigger: AccordionItemComponent) {
    if (this.behavior === 'single') {
      this.children
        .filter(c => c !== trigger)
        .forEach(c => c.updateState('collapsed'));
    }
  }

  /** */
  public moveFocus(position: FocusPosition, event: KeyboardEvent) {
    if (this.children.length !== 0) {
      const children = this.children.toArray();
      const focusedIndex = children.findIndex(c => c.hasFocus === true);
      const focused = children[focusedIndex];

      if (position === FocusPosition.First) {
        this.children.first.focus();
      }
      else if (position === FocusPosition.Next && focused !== this.children.last) {
        children[focusedIndex + 1].focus();
      }
      else if (position === FocusPosition.Previous && focused !== this.children.first) {
        children[focusedIndex - 1].focus();
      }
      else if (position === FocusPosition.Last) {
        this.children.last.focus();
      }

      event.preventDefault();
    }
  }

  /**
   * 
   * @param item
   */
  public propagateChange(item: AccordionItemComponent) {
    this.itemStateChanged.emit({ item: item, index: this.children.toArray().findIndex(c => c === item) });
  }
}

@Component({
  selector: 'ngx-ui-accordion-item',
  templateUrl: './accordion-item.component.html',
  host: {
    'class': 'ngx-ui-accordion-item',
    '[class.ngx-ui-accordion-item-expanded]': 'state === "expanded"'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AccordionItemComponent implements OnInit {

  /****************************************************************** BINDINGS ******************************************************************/

  @Input()
  public uid = `ngx-ui-accordion-item-${nextUniqueId++}`;

  @Input()
  public icon: string | null = null;

  @Input()
  public initialState: ItemState = 'expanded';

  @ContentChild(AccordionItemTitleDirective)
  public titleDirective!: AccordionItemTitleDirective;

  @ContentChild(AccordionItemContentDirective)
  public contentDirective!: AccordionItemContentDirective;

  /****************************************************************** VARIABLES ******************************************************************/

  public hasFocus = false;
  public state: ItemState = 'expanded';

  /****************************************************************** LIFE CYCLE ******************************************************************/

  constructor(public parent: AccordionComponent, private _elementRef: ElementRef, private _cdr: ChangeDetectorRef) { }

  /** */
  public ngOnInit() {
    this.state = this.initialState || 'expanded';
  }

  /****************************************************************** PUBLIC ******************************************************************/

  /** */
  public focus() {
    this._elementRef.nativeElement.firstChild.focus();
  }

  /**
   * 
   * @param hasFocus
   */
  public focusChanged(hasFocus: boolean) {
    this.hasFocus = hasFocus;
  }

  /**
   * 
   * @param state
   */
  public updateState(state: ItemState) {
    if (this.state !== state) {
      this.state = state;

      if (state === 'expanded') {
        this.parent.ensureState(this);
      }

      this.parent.propagateChange(this);

      this._cdr.markForCheck();
    }
  }
}
