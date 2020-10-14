import { Handler } from 'aws-lambda';
import axios from 'axios';

import env from 'dotenv';
env.config();

import { Joke } from '../../interface/Joke';

export const getJoke: Handler = async (event: any) => {
  const jokeResult: Joke = await getJokeRequest();
  if (jokeResult) {
    const message = `Setup: ${jokeResult.setup} Punchline: ${jokeResult.punchline}`;
    await sendMessageToSlack(message);
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

async function sendMessageToSlack(message: string) {
  const response = await axios.post(
    `https://slack.com/api/chat.postMessage`,
    {
      token: process.env.SLACK_OAUTH_TOKEN,
      channel: 'general',
      text: message,
    },
    {
      headers: {
        'Content-type': 'application/json',
      },
    },
  );
  if (response) {
    const responseData = response.data;
    console.log('responseData = ', responseData);
  }
}
