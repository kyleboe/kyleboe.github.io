import React from 'react'
import CallToActionBlock from 'components/CallToActionBlock'
import PageHeader from 'components/PageHeader'
import FeaturedPost from 'components/FeaturedPost'
import Layout from 'components/Layout'
import BlogPosts from 'components/BlogPosts'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/themes/prism-okaidia.css'

const Blog = () => (
  <Layout>
    <PageHeader
      title='Blog'
    />
    <FeaturedPost
      title='Featured Post Title Ornare Fringella Phareta Ipsum Bibendum'
      snippet='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Donec ullamcprper nulla non metus auctor fingilla. ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum.'
      tag='Engineering'
      path='/blog/our-first-post'
    />
    <BlogPosts />
    <CallToActionBlock
      title='Lorem Ipsum Perieet Dolar'
      linkText='MEET THE TEAM'
      linkHref='/team'
    />
  </Layout>
)

export default Blog
