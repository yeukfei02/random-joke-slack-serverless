<p align="center">
  <img width="200px" src="https://github.com/yeukfei02/random-joke-slack-serverless/blob/main/joke.png?raw=true"><br/>
  <h2 align="center">random-joke-slack-serverless</h2>
</p>

A random joke slack app build in serverless

documentation: https://documenter.getpostman.com/view/3827865/TVRoYmZG

api url: https://f6s7gvdr4j.execute-api.ap-southeast-1.amazonaws.com/v1/api/joke

<p align="center">
  <img width="800px" src="https://github.com/yeukfei02/random-joke-slack-serverless/blob/main/tutorial.png?raw=true">
</p>

<p align="center">
  <img width="800px" src="https://github.com/yeukfei02/random-joke-slack-serverless/blob/main/tutorial2.png?raw=true">
</p>

<p align="center">
  <img width="800px" src="https://github.com/yeukfei02/random-joke-slack-serverless/blob/main/tutorial3.png?raw=true">
</p>

<p align="center">
  <img width="800px" src="https://github.com/yeukfei02/random-joke-slack-serverless/blob/main/tutorial4.png?raw=true">
</p>

1. create slack app

2. add slash command, add your api endpoint to slash command

3. add `chat:write` and `command` into `scope`

4. add slack app to your channel

5. get the `oauth token`

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
