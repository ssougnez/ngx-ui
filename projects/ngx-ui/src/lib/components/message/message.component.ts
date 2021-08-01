import { ChangeDetectionStrategy, Component, ContentChild, Directive, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ColorScheme, IconBrush } from '../../common';

@Directive({
  selector: '[ngx-ui-message-title]'
})
export class MessageTitleDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}

@Directive({
  selector: '[ngx-ui-message-content]'
})
export class MessageContentDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}

@Component({
  selector: 'ngx-ui-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  host: {
    '[class]': '"ngx-ui-message-" + (color || "primary")',
    '[class.ngx-ui-hidden]': 'dismissed === true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent {

  /****************************************************************** BINDINGS ******************************************************************/

  @ContentChild(MessageTitleDirective)
  public titleDirective: MessageTitleDirective | null = null;

  @ContentChild(MessageContentDirective)
  public contentDirective: MessageContentDirective | null = null;

  @Input()
  public color: ColorScheme = 'primary';

  @Input()
  public icon: string | null = null;

  @Input()
  public iconBrush: IconBrush = 's';

  @Input()
  public dismissable = false;

  /****************************************************************** VARIABLES ******************************************************************/

  public dismissed = false;

  /****************************************************************** PUBLIC ******************************************************************/

  /** */
  public dismiss() {
    this.dismissed = true;
  }
}
