import { Handler } from 'aws-lambda';
import axios from 'axios';

export const getJoke: Handler = async (event: any) => {
  const jokeResult = await getJokeRequest();
  console.log('jokeResult = ', jokeResult);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'getJoke',
      jokeResult: jokeResult,
    }),
  };
  return response;
};

async function getJokeRequest() {
  let result = null;

  const response = await axios.get(`https://official-joke-api.appspot.com/jokes/random`);
  if (response) {
    const responseData = response.data;
    if (responseData) {
      result = responseData;
    }
  }

  return result;
}
