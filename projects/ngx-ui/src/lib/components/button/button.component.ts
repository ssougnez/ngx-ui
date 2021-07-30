import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ColorScheme, IconBrush, Size } from '../../common';

@Component({
  selector: '[ngx-ui-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"ngx-ui-button-" + color + " ngx-ui-button-" + size'
  }
})
export class ButtonComponent {

  /******************************************************** BINDINGS ********************************************************/

  @Input()
  public color: ColorScheme | 'secondary' = 'primary';

  @Input()
  public size: Size = 'auto';

  @Input()
  public icon: string | null = null;

  @Input()
  public brush: IconBrush = 's';

  @Input()
  public iconPosition: 'left' | 'right' = 'left';

  /******************************************************** VARIABLES ********************************************************/

  /******************************************************** LIFE CYCLE ********************************************************/

  constructor() { }

}
