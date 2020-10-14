import { Handler } from 'aws-lambda';

export const getMain: Handler = async (event: any) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'random joke slack api',
    }),
  };
  return response;
};
