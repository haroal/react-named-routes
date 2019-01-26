import pathToRegexp from 'path-to-regexp'

class Router {
  /**
   * A router that will contain the routes.
   * @constructor
   */
  constructor() {
    /**
     * Contains all the registered routes.
     * @type {Object<string, Object>}
     */
    this.globalRoutes = {}
  }

  /**
   * Registers multiple routes into the router. Adds the given prefix at the beginning of each route path.
   * It also prevents from registering the same route name twice by throwing an Error.
   * @param {string} prefix Root path to add to each route path.
   * @param {Object} routes Set of routes to register. Must contain at least a `path` property, but can also register
   *                        any extra information you want to store.
   */
  registerRoutes(prefix, routes) {
    for (const [name, route] of Object.entries(routes)) {
      if (this.globalRoutes[name] !== undefined) {
        throw Error(`Route with name "${name}" already registered`)
      }

      this.globalRoutes[name] = {
        ...route,
        path: prefix + route.path
      }
    }
  }

  /**
   * Returns all the registered route information by name.
   * @param {string} name Name given to the route when registered.
   * @returns {Object} the route information
   */
  getRoute(name) {
    const route = this.globalRoutes[name]
    if (route === undefined) throw Error(`Route with name "${name}" not found`)

    return route
  }

  /**
   * Generates a URL from a route name. It dynamically injects the parameters inside the url.
   * @param {string} name Name of the route
   * @param {Object?} params Parameters to inject in the route path
   * @returns {string} the URL
   */
  toUrl(name, params) {
    const { path } = this.getRoute(name)
    const compiler = pathToRegexp.compile(path)

    return compiler(params)
  }
}

/* We return a single instance of the router */
const router = new Router()
export default router
