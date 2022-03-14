import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
if (process.env._X_AMZN_TRACE_ID) {
  awsXRay.captureAWS(awsSdk);
}

export const getMain: Handler = async (event: APIGatewayEvent, context: Context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'random joke slack api',
    }),
  };
  return response;
};
