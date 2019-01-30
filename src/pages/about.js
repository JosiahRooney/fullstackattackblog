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
    console.log(this.props)
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
