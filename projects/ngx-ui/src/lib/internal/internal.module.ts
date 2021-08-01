import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickableDirective } from './directives/clickable.directive';

@NgModule({
  declarations: [ClickableDirective],
  imports: [CommonModule],
  exports: [CommonModule, ClickableDirective]
})
export class InternalModule { }
