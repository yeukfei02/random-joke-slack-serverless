# random-joke-slack-serverless

random-joke-slack-serverless

documentation: https://documenter.getpostman.com/view/3827865/TVRoYmZG

api url: https://f6s7gvdr4j.execute-api.ap-southeast-1.amazonaws.com/v1/api/joke

## Requirement:

- install yarn
- install node (v12+)
- install serverless

## Testing and run:

```
// run function
$ serverless invoke local --function getJoke

// test api in local
$ yarn run dev

// deploy to serverless
$ yarn run deploy

// open serverless dashboard
$ yarn run dashboard

// use eslint and prettier to format code
$ yarn run lint

// run test case
$ yarn run test
```
