import React from 'react'
import PageHeader from 'components/PageHeader'
import Layout from 'components/Layout'
import ContactForm from 'components/ContactForm'
import ContactMap from 'components/ContactMap'

const Contact = () => (
  <Layout>
    <PageHeader title='Contact' addPadding>
      <a href='mailto:contact@hint.io'>contact@hint.io</a>
      <div>
        Office: 360.123.4567 <br />
        1901 Main St, Vancouver, WA
      </div>
    </PageHeader>
    <ContactForm />
    <ContactMap />
  </Layout>
)

export default Contact
