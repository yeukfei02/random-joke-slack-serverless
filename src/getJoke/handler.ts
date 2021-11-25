// import env from 'dotenv';
// env.config();

import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
if (process.env._X_AMZN_TRACE_ID) {
  awsXRay.captureAWS(awsSdk);
}

import _ from 'lodash';

import { sendMessageToSlackChannel } from '../../helpers/helpers';
import { Joke } from '../../interface/Joke';
import { data } from '../../data/data';

export const getJoke: Handler = async (event: APIGatewayEvent, context: Context) => {
  const jokeResultList: Joke[] = data;
  const jokeResult = _.sample(jokeResultList) as Joke;
  console.log('jokeResult = ', jokeResult);

  if (!_.isEmpty(jokeResult)) {
    const message = `*Setup:* ${jokeResult.setup}\n*Punchline:* ${jokeResult.punchline}`;
    await sendMessageToSlackChannel(message);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'getJoke',
    }),
  };
  return response;
};
