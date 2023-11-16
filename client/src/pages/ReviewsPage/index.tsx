import React from 'react'
import { Heading } from '@chakra-ui/react'

import { Wrapper } from '../../shared'

import classes from './ReviewsPage.module.sass'


const ReviewsPage: React.FC = () => {
  return (
    <Wrapper>
      <Heading as='h1' className={classes.title}>
        ReviewsPage
      </Heading>
    </Wrapper>
  )
}

export default ReviewsPage
