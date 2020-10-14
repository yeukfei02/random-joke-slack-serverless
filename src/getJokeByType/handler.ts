import { Handler } from 'aws-lambda';
import axios from 'axios';
import _ from 'lodash';

import env from 'dotenv';
env.config();

import { Joke } from '../../interface/Joke';

export const getJokeByType: Handler = async (event: any) => {
  const body = JSON.parse(event.body);
  if (body) {
    const type = body.text;
    const jokeResult: Joke = await getJokeByTypeRequest(type);
    console.log('jokeResult = ', jokeResult);

    if (!_.isEmpty(jokeResult)) {
      const result = jokeResult[0];
      const message = `*Setup:* ${result.setup}\n*Punchline:* ${result.punchline}`;
      await sendMessageToSlackChannel(message);
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'getJokeByType',
    }),
  };
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

async function sendMessageToSlackChannel(message: string) {
  const response = await axios.get(`https://slack.com/api/chat.postMessage`, {
    params: {
      token: process.env.SLACK_OAUTH_TOKEN,
      channel: 'random',
      text: message,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response) {
    const responseData = response.data;
    console.log('responseData = ', responseData);
  }
}
