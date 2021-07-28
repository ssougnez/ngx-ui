import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ColorScheme, Size } from '../../common';

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
  public color: ColorScheme = 'primary';

  @Input()
  public size: Size = 'auto';

  /******************************************************** VARIABLES ********************************************************/

  /******************************************************** LIFE CYCLE ********************************************************/

  constructor() { }

}
