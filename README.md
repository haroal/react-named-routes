# react-named-routes

> A simple way to register named routes and access to them easily in your application.

[![NPM](https://img.shields.io/npm/v/react-named-routes.svg)](https://www.npmjs.com/package/react-named-routes) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This package is a React library that will help you organize your routes by naming them.
Indeed, since `react-router@4`, named routes have disappeared from the project and have been
replaced by a component-based route definition. This is a good idea but this means that
it duplicates hard-coded paths especially when you want to add link to your routes.

My solution is a simple `Router` instance where you will be able to register your routes with
a name. To keep the component-based logic that `react-router@4` recommends, you should register
these routes from the same component that contains the `Route` components.

Obviously, you can also use this package without `react-router` as you can format your route like
you want before registering them (only the `path` property is mandatory).


## Install

```bash
npm install --save react-named-routes
```

## Usage

```jsx
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import User from './User'

/* 1. Import the router */
import router from 'react-named-routes'

/* 2. Register your routes into the router */
router.registerRoutes('', {
  home: { path: '/', component: Home, exact: true },
  user: { path: '/user/:id', component: User }
})

export default class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <ul>
            <li>
              {/* 3. Use the router to dynamically generate URL from route name */}
              <Link to={router.toUrl('home')}>Home</Link>
            </li>
            <li>
              <Link to={router.toUrl('user', { id: 4 })}>User</Link>
            </li>
          </ul>

          <hr />

          {/* 4. Get the route information by name to create react-router Route components */}
          <Route {...router.getRoute('home')} />
          <Route {...router.getRoute('user')} />
        </div>
      </Router>
    )
  }
}

```

Please check the `example` folder to see how it works.

## License

MIT © [haroal](https://github.com/haroal)
