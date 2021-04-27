// export const GET_EVENTS = 'GET_EVENTS'; 
// export const SUCCESS_EVENT = 'SUCCESS_EVENT';
// export const GET_EVENT_FAIL = 'GET_EVENT_FAIL';

import  { GET_EVENTS } from '../actions/events';
import { SUCCESS_EVENT } from '../actions/events';
import { GET_EVENT_FAIL } from '../actions/events';
import Events from '../../models/Events';

const initialState = {
    events: []
};


export default (state  = initialState, action) => {
    switch(action.type) {
        case GET_EVENTS:
            const newEvents = new Events(
                action.event_id, 
                action.attachment_id, 
                action.end_date, 
                action.event_desc, 
                action.event_title, 
                action.start_date, 
                action.type

            );

            return {
                ...state,
                events: newEvents
            }
    }
    return state;
};