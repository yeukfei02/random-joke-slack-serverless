import { Handler } from 'aws-lambda';
import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
awsXRay.captureAWS(awsSdk);

export const getMain: Handler = async (event: any) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'random joke slack api',
    }),
  };
  return response;
};
