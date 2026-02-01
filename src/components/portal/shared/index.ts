// Server-safe exports (no React context or client-side code)
export { default as PortalLayout } from './PortalLayout'
export {
  portalConfigsBase,
  getPortalConfigBase,
  type PortalRole,
  type PortalConfigBase,
} from './types'

// Client-only exports (these use React context and icons)
// Import from './navigation' and './PortalSidebar' directly when needed in client components
