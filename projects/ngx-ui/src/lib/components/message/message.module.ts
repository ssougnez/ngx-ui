import { NgModule } from '@angular/core';
import { InternalModule } from '../../internal/internal.module';
import { IconModule } from '../icon/icon.module';
import { MessageComponent, MessageContentDirective, MessageTitleDirective } from './message.component';

@NgModule({
  declarations: [MessageComponent, MessageTitleDirective, MessageContentDirective],
  imports: [InternalModule, IconModule],
  exports: [MessageComponent, MessageTitleDirective, MessageContentDirective]
})
export class MessageModule { }
