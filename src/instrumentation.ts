import { registerOTel } from '@vercel/otel'

export function register() {
  console.log('OTel registered')
  registerOTel({ serviceName: 'my-app' })
}
