import config from './awsAmplifyConfig';

const awsConfig = {
    Auth: {
        mandatorySignIn: false,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
      },
      Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
      },
      API: {
        endpoints: [
          {
            name: "gNewsNotes",
            endpoint: config.apiGateway.URL,
            region: config.apiGateway.REGION
          },
        ]
      }
}
  
export { awsConfig };


