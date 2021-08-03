import { NgModule } from '@angular/core';
import { InternalModule } from '../../internal/internal.module';
import { IconModule } from '../icon/icon.module';
import { AccordionComponent, AccordionItemComponent, AccordionItemContentDirective, AccordionItemTitleDirective } from './accordion.component';

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemTitleDirective,
    AccordionItemContentDirective
  ],
  imports: [
    InternalModule,
    IconModule
  ],
  exports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemTitleDirective,
    AccordionItemContentDirective
  ]
})
export class AccordionModule { }
