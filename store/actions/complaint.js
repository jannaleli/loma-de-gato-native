import Complaints from '../../models/Complaint';
import { COMPLAINT_PATH, LOMA_API_NAME } from '../../aws-configure';
import { API } from 'aws-amplify';

import S3 from 'aws-sdk/clients/s3';
import { Credentials } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
 

export const POST_COMPLAINT = 'POST_COMPLAINT';     
export const GET_COMPLAINTS = 'GET_COMPLAINTS'; 
export const SET_COMPLAINT_FAIL = 'SET_COMPLAINT_FAIL';
export const GET_COMPLAINT_FAIL = 'GET_COMPLAINT_FAIL';
export const SET_COMPLAINT_SUCCESS = 'SET_COMPLAINT_SUCCESS';
export const getComplaints = (complaints) => {
    return {
        type: actionTypes.GET_COMPLAINTS,
        complaints: complaints
    };
};

export const postComplaint = (
    complaint_id,
    attachment_id,
    complaint_desc,
    create_date,
    latitude,
    longitude,
    status,
    type,
    user_id) => {
        return {
            type: actionTypes.POST_COMPLAINT,
            complaint_id:complaint_id,
            attachment_id:attachment_id,
            complaint_desc:complaint_desc,
            create_date:create_date,
            latitude:latitude,
            longitude:longitude,
            status:status,
            type:type,
            user_id:user_id

        };

};

export const getComplaintFail = (error) => {
    return {
        type: actionTypes.GET_COMPLAINT_FAIL,
        error: error
    };
};

export const postComplaintFail = (error) => {
    return {
        type: actionTypes.SET_COMPLAINT_FAIL,
        error: error
    };
};

export const postComplaintSuccess = (error) => {
    return {
        type: actionTypes.SET_COMPLAINT_SUCCESS
    };
};

export const callPostComplaint = ( complaint_id,
    attachment_id,
    complaint_desc,
    create_date,
    latitude,
    longitude,
    status,
    type,
    user_id) => {

   

    const params = {
        body : {
            'complaint_id': complaint_id,
            'attachment_id': '4',
            'complaint_desc': complaint_desc,
            'latitude': latitude,
            'longitude': longitude,
            'type': type,
            'user_id': user_id,
            'status': 'NEW',
            'create_date': create_date
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
        .post(LOMA_API_NAME, COMPLAINT_PATH, params)
        .then(response => {
          // Add your code here
          //add success!!!!
        })
        .catch(error => {
          console.log(error.response);
          dispatch(postComplaintFail(error.response));
        });
    };
};

export const callGetComplaint = () => {
           

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
        API
        .get(LOMA_API_NAME, COMPLAINT_PATH, params)
        .then(response => {
          // Add your code here
          console.log('Getting Complaint Success')
          console.log(response)
          dispatch(getComplaints(response));
        })
        .catch(error => {
          console.log(error);
          dispatch(getComplaintFail(error));
       });
    };

};

export const  uploadImage = (image) => {
//This is where we upload the image to AWS
const access = new Credentials({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET,
  });
  
  const s3 = new S3({
    credentials: access,
    region: process.env.S3_REGION, //"us-west-2"
    signatureVersion: "v4",
  });
};
