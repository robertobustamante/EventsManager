import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
   EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver, 
    CreateSessionComponent, 
    SessionListComponent, DurationPipe
} from './events/index'

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { JQ_TOKEN, TOASTR_TOKEN, Toastr, CollapsibleWellComponent, SimpleModalComponent, ModalTriggerDirective} from './common/index'
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let toastr:Toastr = window['toastr']
let jQuery = window['$']

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    NavBarComponent,
    Error404Component,
    CreateSessionComponent,
    SimpleModalComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    ModalTriggerDirective,
    DurationPipe
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, 
      useValue: toastr
    },
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    },
    EventRouteActivator,
    EventListResolver,
    AuthService,
    { 
      provide:'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent){
  if(component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true
}