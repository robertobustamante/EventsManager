import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IEvent, ISession, EventService } from '../shared/index'

let event: any

@Component({
    templateUrl: './event-details.component.html',
    styles: [`
        .container { padding-left:20px; padding-right: 20px; }
        .event-image { height: 100px; }
        a { cursor: pointer;}
    `]
})
export class EventDetailsComponent implements OnInit {
    event:IEvent
    addMode:boolean
    filterBy: string = 'all'
    sortBy:string = 'votes'

    constructor (private eventService:EventService, private route:ActivatedRoute, private router:Router){

    }
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.event = this.eventService.getEvent(+params['id'])
            this.addMode = false
            this.filterBy = 'all'
            this.sortBy = 'votes'
        })
    }
    addSession(){
        this.addMode = true
    }
    saveNewSession(session:ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = nextId + 1
        this.event.sessions.push(session)
        this.eventService.updateEvent(this.event)
        this.addMode = false
    }
    cancelNewSession(){
        this.addMode = false
    }
}