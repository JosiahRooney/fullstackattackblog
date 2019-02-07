import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import Share from '../components/Share'

import { rhythm, scale } from '../utils/typography'
import { DiscussionEmbed } from "disqus-react"

class BlogPostTemplate extends React.Component {
  render() {
    const data = this.props.data;
    const post = data.markdownRemark
    const siteTitle = data.site.siteMetadata.title
    const twitterHandle = data.site.siteMetadata.social.twitterHandle
    const url = data.site.siteMetadata.social.url
    const slug = post.frontmatter.path
    const { previous, next } = this.props.pageContext

    const disqusShortname = "full-stack-attack";
    const disqusConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
    };

    let tagsArr = [];
    let arr = post.frontmatter.tags;
    let location = this.props.location.pathname;
    for (let i = 0; i < arr.length; i++) {
      let path = `/tags/${arr[i]}?returnTo=${location}`;
      let comma = i !== arr.length - 1 ? ', ' : '';
      tagsArr.push(
        <span key={i}><Link key={i} to={path}>{arr[i]}</Link>{comma}</span>
      )
    }

    if (previous) {
      let previousName = previous.frontmatter.path.split('/')[1].split('-');
      previous.title = previousName.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
      previous.title = previous.title.join(' ');
    }

    if (next) {
      let nextName = next.frontmatter.path.split('/')[1].split('-');
      next.title = nextName.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
      next.title = next.title.join(' ');
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} image={post.frontmatter.image.childImageSharp.fluid.src} />
        <h1>{post.frontmatter.title}</h1>
        
        <p
          style={{
            fontSize: rhythm(1 / 2),
            marginBottom: 0
          }}
        >Sharing is caring:</p>
        <Share 
          socialConfig={{
            twitterHandle,
            config: {
              url: `${url}${slug}`,
              title: siteTitle,
            },
          }}
        />
        <p
          style={{
            fontSize: rhythm(1 / 2),
            marginBottom: `3px`
          }}
        >Tags: {tagsArr}</p>
        <p
          style={{
            fontSize: rhythm(1 / 2)
          }}
        ><Link to={`/`}>&larr; Back to all posts</Link></p>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
        <p
          style={{
            fontSize: rhythm(1 / 2)
          }}
        >Tags: {tagsArr}</p>
        <p
          style={{
            fontSize: rhythm(1 / 2),
            marginBottom: 0
          }}
        >Sharing is caring:</p>
        <Share 
          socialConfig={{
            twitterHandle,
            config: {
              url: `${url}${slug}`,
              title: siteTitle,
            },
          }}
        />
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        social {
          twitterHandle
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        path
        published
        image {
          childImageSharp {
            fluid(maxWidth: 400, maxHeight: 250) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
