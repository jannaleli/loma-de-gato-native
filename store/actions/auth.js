import { AsyncStorage } from 'react-native';
export const GET_USER = 'GET_USER';
export const GET_FAIL_USER = 'GET_FAIL_USER';
export const GET_SUCCESS_USER = 'GET_SUCCESS_USER';
import { Auth, actionButton } from 'aws-amplify';
import { API } from 'aws-amplify';
import { USER_PATH, LOMA_API_NAME } from '../../src/aws-configure';



let timer;



export const getUserFail = (error) => {
    return {
        type: actionTypes.GET_FAIL_USER,
        error: error
    };
};

export const callGetUser = (username) => {
    const queryParams = USER_PATH + '/' + username
    console.log(queryParams);
    const params = {
        headers : {
            'Content-Type': 'application/json',
            'Accept' : '*/*',
            'Host' : 'mjdjlvb5x9.execute-api.ap-southeast-1.amazonaws.com',
            'Accept-Encoding' : 'gzip, deflate',
            'Content-Length' : '243',
            'Connecion' : 'keep-alive'
        },
    };

    return dispatch => {
        API
        .get(LOMA_API_NAME, queryParams, params)
        .then(response => {
                console.log(response);
                dispatch(getUser(response));
        })
        .catch(error => { 
            console.log(error);
            dispatch(getUserFail(error));
        });
    };
};

export const signIn = (email, password) => {
    return async dispatch => {
        const user = await Auth.signIn(email, password);
        console.log(user)
        dispatch(callGetUser(email))
    }
};

