import React from 'react'
import { Img, Link, StaticQuery, graphql } from 'gatsby'
import './Layout.css'
import './Link.css'

import { rhythm, scale } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const { location, title, children, data } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    let nav = (
      <div className="navigation container">
        <ul className="nav-list">
          <li>
            {
              location.pathname === rootPath ? <Link to={`/`}><span className="active">Posts</span></Link> : <Link to={`/`}>Posts</Link>
            }
          </li>
          <li>
            {
              location.pathname === '/about' ? <Link to={`/about`}><span className="active">About</span></Link> : <Link to={`/about`}>About</Link>
            }
          </li>
          <li>
            {
              location === '/tags' ? <Link to={`/tags`}><span className="active">Tags</span></Link> : <Link to={`/tags`}>Tags</Link>
            }
          </li>
        </ul>
      </div>
    )

    if (location.pathname === rootPath) {
      header = (
        <h1
          className="container"
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1),
            marginTop: 0
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
          className="container"
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
      <div className={`wrapper`}>
        <header>
          {header}
        </header>
        <div>
          {nav}
        </div>
        <div>
          <div className="container">{children}</div>
        </div>
        <footer>
          <div className="container">
            © {new Date().getFullYear()}, Built with love and 
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Layout
