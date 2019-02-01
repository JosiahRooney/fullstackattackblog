import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'
import Image from 'gatsby-image'
import styled from 'styled-components'

const StyledImg = styled(Image)`
  display: block;
  margin: 0 auto;
  width: 100%;
`

class About extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = "Full Stack Attack"

    return (
      <StaticQuery
      query={aboutQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <Layout location={this.props.location} title={siteTitle}>
            <SEO
              title="All posts"
              keywords={[`blog`, `gatsby`, `javascript`, `react`]}
            />
            <div
              style={{
                marginBottom: rhythm(2.5),
              }}
            >
              <StyledImg
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                style={{
                  marginRight: 0,
                  marginBottom: 0,
                  minWidth: 150,
                  borderRadius: `100%`
                }}
                imgStyle={{
                  borderRadius: `50%`,
                }}
              />
              <h3
                style={{
                  marginTop: rhythm(1)
                }}
              >About Me</h3>
              <p>
                I'm a senior front end software engineer working for Zenni Optical in Novato, CA. At work I am converting our web application from jQuery &amp; Bootstrap to React, Webpack, and Babel ES6. I've been a professional developer for almost 10 years.
              </p>
              <p>
                I'm an advocate for modern web technology, especially component-based UI frameworks. I believe many problems have already been solved in code and we should leverage existing solutions instead of always building our own.
              </p>
              <p>
                Aside from attending a full stack software engineering boot camp, I am fully self taught. I've been writing HTML &amp; CSS code since the 1990s. I learned JavaScript in the early 2000s. I try to spend at least 2-3 hours a week learning new technology. This blog itself was built with technology that's new to me. It runs on Gatsby.js and was deployed to Netlify (with domain from AWS Route 53).
              </p>
            </div>
          </Layout>
        )
      }}
    />
    )
  }
}

const aboutQuery = graphql`
  query aboutQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default About
