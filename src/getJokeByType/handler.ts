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

export const getJokeByType: Handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  let response = {};

  const eventBody = event.body;
  if (eventBody) {
    const bodyList = eventBody.split('&');

    let type = '';
    bodyList.forEach((item: string, i: number) => {
      if (item.toLowerCase().startsWith('text')) {
        type = item.substring(5);
      }
    });

    console.log('type = ', type);
    if (type) {
      const jokeResult: Joke[] = await getJokeByTypeRequest(type);
      console.log('jokeResult = ', jokeResult);

      if (!_.isEmpty(jokeResult)) {
        const result = jokeResult[0];
        const message = `*Setup:* ${result.setup}\n*Punchline:* ${result.punchline}`;
        await sendMessageToSlackChannel(message);
      }
    }

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'getJokeByType',
      }),
    };
  } else {
    response = {
      statusCode: 400,
      body: JSON.stringify({
        message: 'getJokeByType error, request body is empty',
      }),
    };
  }

  return response;
};

async function getJokeByTypeRequest(type: string) {
  let result: any = {};

  const response = await axios.get(`https://official-joke-api.appspot.com/jokes/${type}/random`);
  if (response) {
    const responseData = response.data;
    if (responseData) {
      result = responseData;
    }
  }

  return result;
}
