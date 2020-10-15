/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */

// eslint-disable-next-line no-unused-vars
import { RouteProps } from 'react-router'

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}

/**
 * react-named-routes types
 */

interface Route extends RouteProps {
  path: string
}

interface NamedRoutes {
  [name: string]: Route
}
