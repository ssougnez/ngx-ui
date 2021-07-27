import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[ngx-ui-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {

  }
})
export class ButtonComponent  {

  /******************************************************** BINDINGS ********************************************************/

  /******************************************************** VARIABLES ********************************************************/

  /******************************************************** LIFE CYCLE ********************************************************/

  constructor() { }

}
