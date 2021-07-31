import { Directive, Input, OnChanges } from '@angular/core';
import { ColorScheme, IconAnimation, IconBrush } from '../../common';

@Directive({
  selector: 'ngx-ui-icon',
  host: {
    '[class]': 'className'
  }
})
export class IconDirective implements OnChanges {

  /******************************************************** BINDINGS ********************************************************/

  @Input()
  public icon: string | null = null;

  @Input()
  public brush: IconBrush = 's';

  @Input()
  public fw = true;

  @Input()
  public color: ColorScheme | null = null;

  @Input()
  public animation: IconAnimation | null = null;

  /******************************************************** VARIABLES ********************************************************/

  public className: string | null = null;

  private _stylesClasses = {
    s: 'fas',
    r: 'far',
    l: 'fal',
    d: 'fad',
    b: 'fab'
  }

  /******************************************************** LIFE CYCLE ********************************************************/

  /** */
  public ngOnChanges() {
    const classes = [this._stylesClasses[this.brush] || 'fas'];

    this.icon && classes.push(`fa-${this.icon}`);
    this.fw !== false && classes.push('fa-fw');
    this.color && classes.push(`ngx-ui-fgc-${this.color}`);
    this.animation && classes.push(`fa-${this.animation}`);

    this.className = classes.join(' ');
  }

}
