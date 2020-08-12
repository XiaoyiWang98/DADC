import {CognitoUserPool} from 'amazon-cognito-identity-js'

const poolData = {
    UserPoolId: 'us-east-1_JJYvrldef',
    ClientId: '6cfmmdsp89o2sru6hdfspkr9la'
}

export default new CognitoUserPool(poolData);