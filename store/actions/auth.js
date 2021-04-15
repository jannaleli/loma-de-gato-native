import { AsyncStorage } from 'react-native';

export const POST_USER = 'POST_USER'; 
export const GET_USER = 'GET_USER'; 
export const GET_FAIL_USER = 'GET_FAIL_USER';
export const GET_SUCCESS_USER = 'GET_SUCCESS_USER';
export const SET_SUCCESS_USER = 'SET_SUCCESS_USER';
export const SET_FAIL_USER = 'SET_FAIL_USER';
export const CONFIRM_SIGN_UP = 'CONFIRM_SIGN_UP'; 
export const CONFIRM_SIGN_UP_SUCCESS = 'CONFIRM_SIGN_UP_SUCCESS';
export const CONFIRM_SIGN_UP_ERROR = 'CONFIRM_SIGN_UP_ERROR';
export const SAVE_DATA_SUCCESS = 'SAVE_DATA_SUCCESS';
export const SAVE_DATA_ERROR = 'SAVE_DATA_ERROR';
export const SET_ERROR_SIGN_UP = 'SET_ERROR_SIGN_UP';
export const SET_SUCCESS_SIGN_UP = 'SET_SUCCESS_SIGN_UP';

export const SIGN_IN_USER = 'SIGN_IN_USER'; 
export const SIGN_IN_USER_FAIL = 'SIGN_IN_USER_FAIL';

import User from '../../models/User';

import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';
import { USER_PATH, LOMA_API_NAME } from '../../src/aws-configure';





let timer;

export const setUserFail = (error) => {
    return {
        type: actionTypes.SET_FAIL_USER,
        error: error
    };
};

export const loginUserSuccess = () => {
    return {
        type: actionTypes.GET_SUCCESS_USER
    };
};

export const registerUserSuccess = () => {
    console.log('Register User Access')
    return {
        type: actionTypes.SET_SUCCESS_USER
    };
};

export const getUserFail = (error) => {
    return {
        type: actionTypes.GET_FAIL_USER,
        error: error
    };
};

export const setUserFail = (error) => {
    return {
        type: actionTypes.SET_FAIL_USER,
        error: error
    };
};

export const confirmSignUp = () => {
    return {
        type: actionTypes.CONFIRM_SIGN_UP,
        status: true
    };
};

export const confirmSignUpSuccess = ()  => {
    return {
        type: actionTypes.CONFIRM_SIGN_UP_SUCCESS
    }
}

export const confirmSignUp = () => {
    return {
        type: actionTypes.CONFIRM_SIGN_UP,
        status: true
    };
};
//This will be called from the UI itself. 

export  const confirmTheSignUp =  (userInfo,code) => {
    return async (dispatch) => {
        try {
            await Auth.confirmSignUp(userInfo.email, code);
            console.log('when did you happen')
            dispatch(callRegisterUser(userInfo));
          } catch (error) {
              console.log('error confirming sign up', error);
              dispatch(setUserFail(error))
          }
    }

}

export const signUp =  (email, password) => {

    return async (dispatch) => {
        try {
            console.log('register')
            console.log(email)
            console.log(password)
            const user = await Auth.signUp({
              username:  email,
              password:  password
            });
            console.log({ user });
     
            dispatch(confirmSignUp())
           
        } catch (error) {
            console.log('error signing up:', error);
            dispatch(setUserFail(error))
        }
    }

}


export const callRegisterUser = ( userInfo) => {
    console.log(userInfo.email)
    console.log(userInfo.password)
    console.log(userInfo.address)
    console.log( userInfo.birthDate)
    console.log(userInfo.firstName)
    console.log(userInfo.lastName)
    console.log(userInfo.phone)
    console.log(userInfo.zipNumber)
    console.log(userInfo.civilStatus)
    console.log(userInfo.tinNumber)
    console.log(userInfo.birthPlace)
    console.log(userInfo.weight)
    console.log(userInfo.height)
    console.log(userInfo.phone)
    console.log(userInfo.profession)
    console.log(userInfo.grossIncome)
    console.log( userInfo.gender)



const params = {
 body : {
     'user_id': userInfo.email,
     'username': userInfo.email ,
     'password': userInfo.password,
     'address': userInfo.address,
     'birthdate': userInfo.birthDate,
     'createdate': userInfo.birthDate,
     'firstname': userInfo.firstName,
     'lastname': userInfo.lastName,
     'mobilenumber': userInfo.phone,
     'zipcode': userInfo.zipNumber,
     'civil_status': userInfo.civilStatus,
     'ctc_no': randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
     'tin_no': userInfo.tinNumber,
     'place_of_birth': userInfo.birthPlace,
     'weight': userInfo.weight,
     'height': userInfo.height,
     'control_no': randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
     'contact_no': userInfo.phone,
     'profession': userInfo.profession,
     'gross_income': userInfo.grossIncome,
     'attachment_id': 'hello',
     'gender': userInfo.gender,
     'status': 'NEW'
    
 },
 headers : {
     'Content-Type': 'application/json',
     'Accept': '*/*',
     'Host': 'mjdjlvb5x9.execute-api.ap-southeast-1.amazonaws.com',
     'Accept-Encoding': 'gzip, deflate',
     'Content-Length': '243',
     'Connection': 'keep-alive',
 },
};
console.log( params);
return dispatch => {
 console.log( 'calling the API')
 console.log( LOMA_API_NAME)
 console.log( USER_PATH)
 API
 .post(LOMA_API_NAME, USER_PATH, params)
 .then(response => {
   // Add your code here
   console.log(response)
   console.log('what is happening here')
   dispatch(registerUserSuccess());
 })
 .catch(error => {
   console.log(error);
   dispatch(setUserFail(error));
 });
};

};





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
        console.log("Entering sign in!!!");
        try {
            const  response = await Auth.signIn(email, password);

            if(!response.ok) {
                throw new Error ('Something went wrong!')
            }
            console.log("SUCCESS!!!");
            console.log(response);
          //  dispatch(callGetUser(email))
        }catch (error) {
            throw error;
        }
       
    }
};

