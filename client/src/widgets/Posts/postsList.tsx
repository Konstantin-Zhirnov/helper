import React from 'react'

import { LinkButton } from '../../shared'


export const posts = [
  {
    title: 'Apollo page',
    content: (
      <>
        <p>
          The Apollo page presents the display, creation, modification and deletion of a todo list.
        </p>
        <p>
          All queries are implemented using <strong>graphql</strong> and the <strong>Apollo</strong>{' '}
          library.
        </p>
      </>
    ),
    actions: <LinkButton link="/apollo" title="Go to page" />,
  },
  {
    title: 'Users page',
    content: (
      <>
        <p>
          This page uses the classic <strong>Redux toolkit</strong>.
        </p>
        <p>
          When you click on the <strong>«more details»</strong> button, a request is made for more
          specific information about the selected user.
        </p>
        <p>The received information is displayed in the right window.</p>
        <p>
          This page also provides the possibility of manually changing the width of the blocks.
          The&nbsp;
          <strong>«re-resizable»</strong> library is used.
        </p>
      </>
    ),
    actions: <LinkButton link="/users" title="Go to page" />,
  },
  {
    title: 'Posts page',
    content: (
      <>
        <p>
          The Posts page uses <strong>RTK QUERY</strong> with the ability to add and delete a post.
        </p>
        <p>
          Also on this page, a filter is implemented by the number of displayed posts and content.
        </p>
        <p>
          The <strong>«framer-motion»</strong> library is used to animate the display of posts
        </p>
        <p>
          The server part for this application (REST API) was also written by me using{' '}
          <strong>Node.js</strong> and <strong>Express</strong>.
        </p>
      </>
    ),
    actions: <LinkButton link="/posts" title="Go to page" />,
  }
]
