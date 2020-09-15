import React from "react"
import { RichText } from "prismic-reactjs"
import { graphql } from "gatsby"
import Banner from "../components/Banner"
import Layout from "../components/layouts"
import Slices from "../components/slices"

// Query for the Blog Home content in Prismic
export const query = graphql`
  {
    prismic {
      allMembership_pages {
        edges {
          node {
            _meta {
              id
            }
            title
            subtitle
            image
            body {
              ... on PRISMIC_Membership_pageBodyText {
                type
                label
                primary {
                  anchor
                  text
                  title
                }
              }
              ... on PRISMIC_Membership_pageBodyMedia {
                type
                label
                primary {
                  media_caption
                  media_link
                  media_title
                }
              }
            }
          }
        }
      }
    }
  }
`

// Using the queried Membership Page document data, we render the top section
const MembershipHead = ({ page }) => {
  return (
    <div className="membership-header" data-wio-id={page._meta.id}>
      <Banner
        url={page.image?.url}
        title={RichText.asText(page.title || "")}
        subtitle={RichText.asText(page.subtitle || "")}
      />
    </div>
  )
}

export default ({ data }) => {
  // Define the Blog Home & Blog Post content returned from Prismic
  const doc = data.prismic.allMembership_pages.edges.slice(0, 1).pop()

  if (!doc) return null

  return (
    <Layout>
      <MembershipHead page={doc.node} />
      <Slices slices={doc.node.body} />
    </Layout>
  )
}
