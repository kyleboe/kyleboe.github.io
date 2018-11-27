import React from 'react'
import Services from 'components/Services'
import PageHeader from 'components/PageHeader'
import RailsServices from 'components/RailsServices'
import Layout from 'components/Layout'
import CallToActionBlock from 'components/CallToActionBlock'
import WebAndMobileApps from 'components/WebAndMobileApps'

const ServicesPage = () => (
  <Layout>
    <PageHeader
      title='Services'
      text="For over 10 years, we've solved business problems, not just software problems. High communication and focused collaboration are daily habits which have shaped our world-class engineering team. Bottom line? Our clients see results."
      addPadding
    />
    <Services />
    <WebAndMobileApps />
    <RailsServices />
    <CallToActionBlock
      title='Ready to Get Started?'
      linkText="LET'S CONNECT"
      linkHref='/'
    />
  </Layout>
)

export default ServicesPage
