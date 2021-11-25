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

export const getJokeByType: Handler = async (event: APIGatewayEvent, context: Context) => {
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
      if (type === 'general' || type === 'programming') {
        const jokeResultList: Joke[] = data;
        if (!_.isEmpty(jokeResultList)) {
          const jokeResult: Joke[] = jokeResultList.filter((item: Joke) => {
            if (item.type === type) {
              return item;
            }
          });
          console.log('jokeResult = ', jokeResult);

          if (!_.isEmpty(jokeResult)) {
            const result = _.sample(jokeResult) as Joke;
            const message = `*Setup:* ${result.setup}\n*Punchline:* ${result.punchline}`;
            await sendMessageToSlackChannel(message);

            response = {
              statusCode: 200,
              body: JSON.stringify({
                message: 'getJokeByType',
              }),
            };
          }
        }
      } else {
        response = {
          statusCode: 200,
          body: JSON.stringify({
            message: 'getJokeByType error, type can only be general or programming',
          }),
        };
      }
    }
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
