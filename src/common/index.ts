import { createLogger } from './logger.ts'

export * from './constants.ts'

export { logger, createLogger, type Logger as BaseLogger } from './logger.ts'

export * as options from './options.ts'
export type { Options } from './options.ts'
export * as cache from './cache.ts'
export type { Cache } from './cache.ts'

export * from './utils.ts'
export * from './data.ts'

export { api } from './api.ts'

export { toast } from './toast/toast.tsx'

const manifest = browser.runtime.getManifest()
createLogger(`${manifest.name} v${manifest.version}`, 'display: inline-block; background-color: #e0005a; color: #ffffff; font-weight: bold; padding: 1px 3px; border-radius: 3px;').info()
