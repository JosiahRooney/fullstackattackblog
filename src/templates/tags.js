import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"

import Layout from '../components/Layout'
import { rhythm } from "../utils/typography";

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout location={`/tags/${tag}/`} title={'Full Stack Attack'}>
      <div>
        <h1>{tagHeader}</h1>
        <div
          style={{
            marginBottom: rhythm(1)
          }}
        >
          <Link to="/tags">&larr; All tags</Link>
        </div>
        <ul>
          {edges.map(({ node }) => {
            const { path, title } = node.frontmatter
            return (
              <li key={path}>
                <Link to={path}>{title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`