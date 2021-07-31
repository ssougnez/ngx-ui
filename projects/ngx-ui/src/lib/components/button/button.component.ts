import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ColorScheme, IconAnimation, IconBrush, Size } from '../../common';

@Component({
  selector: '[ngx-ui-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"ngx-ui-button-" + (color || "primary") + " ngx-ui-button-" + (size || "auto")',
    '[class.ngx-ui-button-light]': 'light === true',
    '[attr.disabled]': 'isDisabled === true ? "disabled" : null'
  }
})
export class ButtonComponent {

  /******************************************************** BINDINGS ********************************************************/

  @Input()
  public color: ColorScheme | 'secondary' = 'primary';

  @Input()
  public light = false;

  @Input()
  public size: Size = 'auto';

  @Input()
  public icon: string | null = null;

  @Input()
  public iconBrush: IconBrush = 's';

  @Input()
  public iconPosition: 'left' | 'right' = 'left';

  @Input()
  public iconAnimation: IconAnimation | null = null;

  @Input()
  public isDisabled = false;

}
