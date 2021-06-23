// export const GET_EVENTS = 'GET_EVENTS'; 
// export const SUCCESS_EVENT = 'SUCCESS_EVENT';
// export const GET_EVENT_FAIL = 'GET_EVENT_FAIL';

import { GET_EVENTS } from '../actions/events';
import { SUCCESS_EVENT } from '../actions/events';
import { GET_EVENT_FAIL } from '../actions/events';
import Events from '../../models/Events';



const initialState = {
    events: []
};


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:

            //const eventArray = Object.values(action);
            const newEventArray = [];
            console.log("Rendering the events in reducers");
            const eventArray = Object.keys(action).map(key => {
                return action[key];
            })

            console.log(eventArray)
            eventArray[1].map((event) => {
                console.log(event.event_id);
                const newEvents = new Events(
                    event.event_id,
                    event.attachment_id,
                    event.end_date,
                    event.event_desc,
                    event.event_title,
                    event.start_date,
                    event.type)

                newEventArray.push(newEvents);



            }


            );
            console.log("New Event Array done")
            //console.log(newEventArray);
            //We should change this because I'm giving out an array for this particular problem. 

            return {
                ...state,
                events: newEventArray
            }
    }
    return state;
};