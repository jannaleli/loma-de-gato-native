import Permit from '../../models/Permit';
import { PERMIT_PATH, LOMA_API_NAME } from '../../aws-configure';
import { API } from 'aws-amplify';
export const GET_PERMITS = 'GET_PERMITS'; 
export const POST_PERMIT = 'POST_PERMIT'; 
export const GET_USER_PERMIT = 'GET_USER_PERMIT'; 
export const POST_PERMIT_FAIL  = 'POST_PERMIT_FAIL';
export const GET_FAIL_PERMIT = 'GET_FAIL_PERMIT';
export const SET_SUCCESS_PERMIT = 'SET_SUCCESS_PERMIT';


export const getPermit = (permits) => {
    return {
        type: actionTypes.GET_PERMITS,
        permits: permits
    };
};



export const postPermits = (
    username,
    user_id,
    approval_date,
    business_activity,
    business_building_no,
    business_name,
    business_street,
    capitalization,
    ctc_no,
    gross_sale,
    lessor_barangay,
    lessor_bldg_no,
    lessor_city,
    lessor_emailaddr,
    lessor_name,
    lessor_province,
    lessor_street,
    lessor_subdv,
    monthly_rental,
    sec_no,
    status

    ) => {
        return {
            type: actionTypes.POST_DOCUMENT,
            username: username,
            user_id:user_id,
            approval_date:approval_date,
            business_activity:business_activity,
            business_building_no:business_building_no,
            business_name:business_name,
            business_street:business_street,
            capitalization:capitalization,
            ctc_no:ctc_no,
            gross_sale:gross_sale,
            lessor_barangay:lessor_barangay,
            lessor_bldg_no:lessor_bldg_no,
            lessor_city:lessor_city,
            lessor_street:lessor_street,
            sec_no: sec_no,
            lessor_emailaddr:lessor_emailaddr,
            lessor_name:lessor_name,
            lessor_province:lessor_province,
            lessor_street:username,
            lessor_subdv:lessor_subdv,
            monthly_rental:monthly_rental,
            sec_no:sec_no,
            status:status

        };

};

export const getPermitsFail = (error) => {
    return {
        type: actionTypes.GET_FAIL_PERMIT,
        error: error
    };
};

export const postPermitsFail = (error) => {
    return {
        type: actionTypes.POST_PERMIT_FAIL,
        error: error
    };
};


export const postPermitsSuccess = () => {
    return {
        type: actionTypes.SET_SUCCESS_PERMIT
    };
};


export const callPostPermit = (  permitInfo ) => {
    console.log('sending out the username out')
   console.log(permitInfo.username)

    const params = {
        body : {
            'user_id': permitInfo.user_id,
            'username': permitInfo.username,
            'attachment_id': 'attachment_id',
            'sec_no': permitInfo.sec_no,
            'business_building_no': permitInfo.business_building_no,
            'business_street': permitInfo.business_street,
            'business_activity': permitInfo.business_activity,
            'business_name': permitInfo.business_name,
            'capitalization': permitInfo.capitalization,
            'ctc_no': permitInfo.ctc_no,
            'lessor_barangay': permitInfo.lessor_barangay,
            'lessor_bldg_no': permitInfo.lessor_bldg_no,
            'lessor_city': permitInfo.lessor_city,
            'lessor_emailaddr': permitInfo.lessor_emailaddr,
            'lessor_name': permitInfo.lessor_name,
            'lessor_province': permitInfo.lessor_province,
            'lessor_street': permitInfo.lessor_street,
            'lessor_subdv': permitInfo.lessor_subdv,
            'monthly_rental': permitInfo.monthly_rental,
            'no_units': permitInfo.no_of_unit,
            'status': permitInfo.status,
            'gross_sale': permitInfo.gross_sale,
            'approval_date': permitInfo.approval_date
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
    return dispatch => {
        API
        .post(LOMA_API_NAME, PERMIT_PATH, params)
        .then(response => {
          // Add your code here
          console.log(response);
        })
        .catch(error => {
          console.log(error);
          dispatch(postPermitsFail(error));
        });
    };
};

export const callGetPermit = (username) => {
           

    const params = {
        headers : {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Host': 'mjdjlvb5x9.execute-api.ap-southeast-1.amazonaws.com',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Length': '243',
            'Connection': 'keep-alive',
        },

    };
    return dispatch => {
        //console.log(username)
        const queryParams =  PERMIT_PATH  + '/' +  'bom@gmail.com'
        API
        .get(LOMA_API_NAME, queryParams, params)
        .then(response => {
          // Add your code here
          console.log(response);
          dispatch(getPermit(response));
        })
        .catch(error => {
          console.log(error);
          dispatch(getPermitsFail(error));
       });
    };

};