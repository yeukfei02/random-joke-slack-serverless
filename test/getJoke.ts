import lambdaTester from 'lambda-tester';

import { getJoke } from '../src/getJoke/handler';

export const getJokeTest = (): void => {
  describe('getJoke test', () => {
    test('getJoke', async () => {
      return lambdaTester(getJoke)
        .event({})
        .expectResult((result: any) => {
          console.log('result = ', result);
          expect(result).toBeDefined();
          expect(result.statusCode).toBe(200);
          expect(result.body).toBeDefined();
        });
    });
  });
};
