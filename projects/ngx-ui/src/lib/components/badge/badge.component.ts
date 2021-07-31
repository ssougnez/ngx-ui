import { formatNumber } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ColorScheme } from '../../common';

@Component({
  selector: 'ngx-ui-badge',
  template: '{{ formattedValue }}',
  styleUrls: ['./badge.component.scss'],
  host: {
    '[class]': '"ngx-ui-bgc-" + (color || "primary") + " ngx-ui-brc-" + (color || "primary")'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BadgeComponent {

  /****************************************************************** BINDINGS ******************************************************************/

  @Input()
  public color: ColorScheme = 'primary';

  @Input()
  public get max(): number { return this._max };
  public set max(value: number) {
    this._max = value;

    this._formatValue();
  }

  @Input()
  public get value(): number | string { return this._value; }
  public set value(value: number | string) {
    this._value = value;

    this._formatValue();
  }

  /****************************************************************** VARIABLES ******************************************************************/

  public formattedValue!: string;

  private _max: number = 100;
  private _value!: number | string;

  /****************************************************************** LIFE CYCLE ******************************************************************/

  constructor(@Inject(LOCALE_ID) private _locale: string) { }

  /****************************************************************** PRIVATE ******************************************************************/

  /** */
  private _formatValue() {
    const valueAsNumber = Number(this._value);

    if (!!this.max && !Number.isNaN(valueAsNumber)) {
      this.formattedValue = valueAsNumber > this.max ? `${formatNumber(this.max, this._locale)}+` : formatNumber(valueAsNumber, this._locale);
    }
    else {
      this.formattedValue = this._value.toString();
    }
  }
}
