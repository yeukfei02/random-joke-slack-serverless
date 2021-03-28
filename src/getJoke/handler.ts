// import env from 'dotenv';
// env.config();

import { APIGatewayEvent, Context, Callback, Handler } from 'aws-lambda';
import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
if (process.env._X_AMZN_TRACE_ID) {
  awsXRay.captureAWS(awsSdk);
}

import axios from 'axios';
import _ from 'lodash';

import { sendMessageToSlackChannel } from '../../common/common';
import { Joke } from '../../interface/Joke';

export const getJoke: Handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const jokeResult: Joke = await getJokeRequest();
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

async function getJokeRequest() {
  let result: any = {};

  const response = await axios.get(`https://official-joke-api.appspot.com/jokes/random`);
  if (response) {
    const responseData = response.data;
    if (responseData) {
      result = responseData;
    }
  }

  return result;
}
