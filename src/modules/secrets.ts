import secrets from '../../secrets.ts'
import type { App } from '../types.ts'

export function initSecrets(App: App) {
  App.secrets = secrets
}
