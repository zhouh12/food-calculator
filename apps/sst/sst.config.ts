/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'sst',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          profile: 'default',
          region: 'ap-southeast-2',
        },
      },
    }
  },
  async run() {
    const api = new sst.aws.ApiGatewayV2('MyApi')
    api.route('GET /', {
      handler: 'functions/src/functions/lambda_function.handler',
      runtime: 'python3.11',
      timeout: '30 seconds',
    })
    api.route('POST /hello', {
      handler: 'functions/src/functions/lambda_function.hello',
      runtime: 'python3.11',
      timeout: '30 seconds',
    })
    return {
      api: api.url,
    }
  },
})
