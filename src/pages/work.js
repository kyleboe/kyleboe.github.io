import React from 'react'
import PageHeader from 'components/PageHeader'
import CallToActionBlock from 'components/CallToActionBlock'
import QuoteSlider from 'components/QuoteSlider'
import FeaturedWork from 'components/FeaturedWork'
import WorkGrid from 'components/WorkGrid'
import Layout from 'components/Layout'

const Work = () => (
  <Layout>
    <PageHeader
      title='Work'
      text='Maecenas sed diam eget risus varius blandit sit amet non magma. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum perieet dolar.'
      addPadding
    />
    <FeaturedWork />
    <WorkGrid />
    <QuoteSlider />
    <CallToActionBlock
      title='Ready to Get Started?'
      linkText="LET'S CONNECT"
      linkHref='/'
    />
  </Layout>
)

export default Work
