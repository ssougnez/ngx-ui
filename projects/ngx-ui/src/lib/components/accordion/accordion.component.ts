import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { AccordionItemState, AccordionStateBehavior, ColorScheme, IconBrush } from '../../common';
import { FocusPosition } from '../../internal/enumerations';

export type AccordionItemStateChangedEventData = {
  item: AccordionItemComponent;
  index: number;
}

let nextUniqueId = 0;

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
    '[class]': '"ngx-ui-accordion-" + (color || "primary")'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AccordionComponent implements AfterContentInit {

  /****************************************************************** BINDINGS ******************************************************************/

  @Input()
  public behavior: AccordionStateBehavior = 'multiple';

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

  /****************************************************************** LIFE CYCLE ******************************************************************/

  /** */
  public ngAfterContentInit() {
    if (this.behavior === 'single') {
      this.children
        .filter(c => c._state === 'expanded')
        .slice(1)
        .forEach(c => c._updateState('collapsed'));
    }
  }

  /****************************************************************** INTERNAL ******************************************************************/

  /**
   * 
   * @param trigger
   */
  public _ensureState(trigger: AccordionItemComponent) {
    if (this.behavior === 'single') {
      this.children
        .filter(c => c !== trigger)
        .forEach(c => c._updateState('collapsed'));
    }
  }

  /**
   * 
   * @param position
   * @param event
   */
  public _moveFocus(position: FocusPosition, event: Event) {
    if (this.children.length !== 0) {
      const children = this.children.toArray();
      const focusedIndex = children.findIndex(c => c._hasFocus === true);
      const focused = children[focusedIndex];

      if (position === FocusPosition.First) {
        this.children.first._focus();
      }
      else if (position === FocusPosition.Next && focused !== this.children.last) {
        children[focusedIndex + 1]._focus();
      }
      else if (position === FocusPosition.Previous && focused !== this.children.first) {
        children[focusedIndex - 1]._focus();
      }
      else if (position === FocusPosition.Last) {
        this.children.last._focus();
      }

      event.preventDefault();
    }
  }

  /**
   * 
   * @param item
   */
  public _propagateChange(item: AccordionItemComponent) {
    this.itemStateChanged.emit({ item, index: this.children.toArray().findIndex(c => c === item) });
  }
}

@Component({
  selector: 'ngx-ui-accordion-item',
  templateUrl: './accordion-item.component.html',
  host: {
    'class': 'ngx-ui-accordion-item',
    '[class.ngx-ui-accordion-item-expanded]': '_state === "expanded"'
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
  public initialState: AccordionItemState = 'expanded';

  @ContentChild(AccordionItemTitleDirective)
  public titleDirective!: AccordionItemTitleDirective;

  @ContentChild(AccordionItemContentDirective)
  public contentDirective!: AccordionItemContentDirective;

  /****************************************************************** VARIABLES ******************************************************************/

  public _hasFocus = false;
  public _state: AccordionItemState = 'expanded';

  /****************************************************************** ENUMERATIONS ******************************************************************/

  public _FocusPosition: typeof FocusPosition = FocusPosition;

  /****************************************************************** LIFE CYCLE ******************************************************************/

  constructor(public parent: AccordionComponent, private _elementRef: ElementRef, private _cdr: ChangeDetectorRef) { }

  /** */
  public ngOnInit() {
    this._state = this.initialState || 'expanded';
  }

  /****************************************************************** INTERNAL ******************************************************************/

  /** */
  public _focus() {
    this._elementRef.nativeElement.firstChild.focus();
  }

  /**
   * 
   * @param hasFocus
   */
  public _focusChanged(hasFocus: boolean) {
    this._hasFocus = hasFocus;
  }

  /**
   * 
   * @param state
   */
  public _updateState(state: AccordionItemState) {
    if (this._state !== state) {
      this._state = state;

      state === 'expanded' && this.parent._ensureState(this);

      this.parent._propagateChange(this);

      this._cdr.markForCheck();
    }
  }
}
