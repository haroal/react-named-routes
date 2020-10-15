import React from 'react'
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

export default class App extends React.Component {
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
