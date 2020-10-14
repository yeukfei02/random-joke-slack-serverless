import lambdaTester from 'lambda-tester';

import { getMain } from '../src/getMain/handler';

export const getMainTest = (): void => {
  describe('getMain test', () => {
    test('getMain test', async () => {
      return lambdaTester(getMain)
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
