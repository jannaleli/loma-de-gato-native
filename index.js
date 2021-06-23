import { Amplify, API } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);
API.configure(awsExports);