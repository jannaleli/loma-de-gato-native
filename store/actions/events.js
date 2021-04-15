import Events from '../../models/Events';
import { EVENTS_PATH, LOMA_API_NAME } from '../../aws-configure';
import { API, Storage } from 'aws-amplify';
import  getImage   from '../../shared/api';

export const GET_EVENTS = 'GET_EVENTS'; 
export const SUCCESS_EVENT = 'SUCCESS_EVENT';
export const GET_EVENT_FAIL = 'GET_EVENT_FAIL';

export const getEvents = (events) => {
    return {
        type: actionTypes.GET_EVENTS,
        events: events
    };
};


export const getEventstFail = (error) => {
    return {
        type: actionTypes.GET_EVENT_FAIL,
        error: error
    };
};


export const callGetEvents= () => {
           
    console.log('callGetevent() called')
    const params = {
        headers : {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Host': 'mjdjlvb5x9.execute-api.ap-southeast-1.amazonaws.com',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Length': '243',
            'Connection': 'keep-alive'
        }

    };
    return dispatch => {
        API
        .get(LOMA_API_NAME, EVENTS_PATH, params)
        .then(response => {

            const promise = (response) => {
                return  new Promise( (resolve, reject) => {
                    
                    response.map((row, index) => {
                        Storage.get(row.attachment_id)
                        .then(result => {
                         
                            row.attachment_id = result
                       
                           if (index === Object.keys(response).length - 1){
                            resolve(response);
                           }
                        })
                        .catch(err => {
                            reject(err);   
                        });
                    })
                  
                
                 });
               }



        
                promise(response).then( result => {

                    dispatch(getEvents(result));
                  
                   }, function(error) {
                    
                   });
                 
   
          
         
       
        })
        .catch(error => {
          console.log('error')


                 // Error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            dispatch(getEventstFail(error.response))
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            dispatch(getEventstFail(error.response))
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            dispatch(getEventstFail(error.response))
        }
        console.log(error.config);
       });
    };

};


