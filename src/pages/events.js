import React from "react"
import { RichText } from "prismic-reactjs"
import { graphql } from "gatsby"
import { linkResolver } from "../utils/linkResolver"
import htmlSerializer from "../utils/htmlSerializer"
import Banner from "../components/Banner"
import Layout from "../components/layouts"
import Slices from "../components/slices"

// Query for the Blog Home content in Prismic
export const query = graphql`
  {
    prismic {
      allEvents_pages {
        edges {
          node {
            _meta {
              id
            }
            title
            subtitle
            image
            description
            body {
              ... on PRISMIC_Events_pageBodyText {
                type
                label
                primary {
                  anchor
                  text
                  title
                }
              }
              ... on PRISMIC_Events_pageBodyText_with_embed {
                type
                label
                primary {
                  anchor
                  text
                  title
                  raw_embed
                }
              }
            }
          }
        }
      }
    }
  }
`

// Using the queried Events Page document data, we render the top section
const EventsHead = ({ page }) => {
  return (
    <div className="events-header" data-wio-id={page._meta.id}>
      <Banner
        url={page.image?.url}
        title={page.title && RichText.asText(page.title)}
        subtitle={page.subtitle && RichText.asText(page.subtitle)}
      />

      {page.description && (
        <div className="container">
          {RichText.render(page.description, linkResolver, htmlSerializer)}
        </div>
      )}
    </div>
  )
}

export default ({ data }) => {
  // Define the Blog Home & Blog Post content returned from Prismic
  const doc = data.prismic.allEvents_pages.edges.slice(0, 1).pop()

  if (!doc || !doc.node) return null

  return (
    <Layout title="Events">
      <EventsHead page={doc.node} />
      <Slices slices={doc.node.body} />
    </Layout>
  )
}
