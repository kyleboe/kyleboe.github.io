import React from 'react'
import CallToActionBlock from 'components/CallToActionBlock'
import PageHeader from 'components/PageHeader'
import TeamHero from 'components/TeamHero'
import TeamMembers from 'components/TeamMembers'
import Layout from 'components/Layout'

const Team = () => (
  <Layout>
    <PageHeader
      title='Team'
      text='Hint is a remote-first software consultancy with a mix of co-located and remote team members. Our main office is located in uptown Vancouver, WA which is approximately twenty minutes outside of Portland, OR.'
      addPadding
    />
    <TeamHero />
    <TeamMembers />
    <CallToActionBlock
      title="See What We've Been Working On"
      linkText='VIEW WORK'
      linkHref='/work'
    />
  </Layout>
)

export default Team
