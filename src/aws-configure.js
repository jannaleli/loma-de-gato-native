import Amplify, { API, Auth } from 'aws-amplify';
export const LOMA_API_NAME = 'lomadegato';
export const EVENTS_PATH = '/event';
export const COMPLAINT_PATH = '/complaint';
export const DOCUMENT_PATH = '/document';
export const PERMIT_PATH = '/permit';
export const USER_PATH = '/user';
Amplify.configure({
    // OPTIONAL - if your API requires authentication 
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'ap-southeast-1:d31cf569-2c5b-42da-b021-185fe95ecc44',
        // REQUIRED - Amazon Cognito Region
        region: 'ap-southeast-1', 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'ap-southeast-1_lvUalkT6e', 
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '3rb0qsnbdgqr5p5v1vsfvc6md',
    },
    API: {
        endpoints: [
            {
                name: "lomadegato",
                endpoint: "https://mjdjlvb5x9.execute-api.ap-southeast-1.amazonaws.com/prod"
            }
        ]
    },
    Storage: {
        AWSS3: {
            bucket: 'barangay-api', //REQUIRED -  Amazon S3 bucket
            region: 'ap-southeast-1', //OPTIONAL -  Amazon service region
        }
    }
});