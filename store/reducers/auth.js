import { GET_USER, GET_FAIL_USER, GET_SUCCESS_USER } from '../actions/auth';
import { updateObject } from '../../shared/utility';


const initialState = {
    user: null,
    userloginerror: false,
    userloginsuccess: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER: 
        return {
            user: action.users
        }
        default: 
        return state;
    }
};