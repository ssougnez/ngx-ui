import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ColorScheme } from '../../common';

@Component({
  selector: '[ngx-ui-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ngx-ui-button-primary]': 'color === "primary"',
    '[class.ngx-ui-button-success]': 'color === "success"',
    '[class.ngx-ui-button-information]': 'color === "information"',
    '[class.ngx-ui-button-warning]': 'color === "warning"',
    '[class.ngx-ui-button-error]': 'color === "error"',
  }
})
export class ButtonComponent {

  /******************************************************** BINDINGS ********************************************************/

  @Input()
  public color: ColorScheme = 'primary';

  /******************************************************** VARIABLES ********************************************************/

  /******************************************************** LIFE CYCLE ********************************************************/

  constructor() { }

}
