import lambdaTester from 'lambda-tester';

import { getJokeByType } from '../src/getJokeByType/handler';

export const getJokeByTypeTest = (): void => {
  describe('getJokeByType test', () => {
    test('getJokeByType test', async () => {
      return lambdaTester(getJokeByType)
        .event({ queryStringParameters: { type: 'programming' } })
        .expectResult((result: any) => {
          console.log('result = ', result);
          expect(result).toBeDefined();
          expect(result.statusCode).toBe(200);
          expect(result.body).toBeDefined();
        });
    });
  });
};
