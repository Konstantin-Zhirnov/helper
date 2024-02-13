import React from 'react'

import { HelpTitles } from '../../widgets'
import { HelpDescriptions, Title, Wrapper } from '../../shared'

const HelpPage: React.FC = () => {
  const [widget, setWidget] = React.useState('Registration')

  return (
    <>
      <Title text="How to use it" divider />
      <Wrapper>
        <HelpTitles widget={widget} setWidget={setWidget} />

        <HelpDescriptions widget={widget} />
      </Wrapper>
    </>
  )
}

export default HelpPage
