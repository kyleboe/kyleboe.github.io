import React from 'react'
import Helmet from 'react-helmet'
import style from './style'
import injectSheet from 'react-jss'
import Footer from 'components/Footer'
import 'helpers/fontAwesomeLibSetup'
import 'assets/css/grid.css'
import { StaticQuery, graphql } from 'gatsby'

const Layout = ({ children, classes }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data =>
      <div className={classes.container}>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        />
        <div style={{ flex: '1 0 auto' }}>
          <div>
            {children}
          </div>
        </div>
        <Footer />
      </div>
    }
  />
)

export default injectSheet(style)(Layout)
