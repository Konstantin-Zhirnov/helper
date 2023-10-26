import React from 'react'
import { Card, CardBody, CardFooter, Divider } from '@chakra-ui/react'

import { CardType } from '../../types'

import { MotionLi } from '../../../../shared'

import classes from './Post.module.sass'

const Post: React.FC<CardType> = ({ index, title, content, actions }) => {
  return (
    <MotionLi custom={index + 1}>
      <Card className={classes.card}>
        <CardBody>
          <h3>{title}</h3>
          <Divider className={classes.divider} />
          {content}
        </CardBody>
        <CardFooter>{actions}</CardFooter>
      </Card>
    </MotionLi>
  )
}

export default Post
