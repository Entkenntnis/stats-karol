import secrets from '../../secrets.ts'
import type { App } from '../types.ts'

export default (App: App) => {
  App.secrets = secrets
}
