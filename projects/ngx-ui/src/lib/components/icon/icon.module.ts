import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconDirective } from './icon.component';

@NgModule({
  declarations: [IconDirective],
  imports: [CommonModule],
  exports: [IconDirective]
})
export class IconModule { }
