import React from 'react'
import { Link } from 'gatsby'
import './Layout.css'
import './Link.css'

import { rhythm, scale } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header
    let nav = (
      <div className="navigation">
        <ul className="nav-list">
          <li>
            {
              location.pathname === rootPath ? <Link to={`/`}><span className="active">Home</span></Link> : <Link to={`/`}>Home</Link>
            }
          </li>
          <li>
            {
              location.pathname === '/about' ? <Link to={`/about`}><span className="active">About</span></Link> : <Link to={`/about`}>About</Link>
            }
          </li>
        </ul>
      </div>
    )

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h2
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h2>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {nav}
        {children}
        <footer>
          © {new Date().getFullYear()}, Built with love and 
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
