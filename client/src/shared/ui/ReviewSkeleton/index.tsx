import React from 'react'
import { Divider, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

import { Li } from '../Li'

import classes from './ReviewSkeleton.module.sass'


const ReviewSkeleton: React.FC = () => {

  return (
    <Li>
      <div className={classes.user}>
        <Skeleton height='16px' width='115px' mb='6px' />
      </div>

      <div className={classes.info}>

        <Skeleton height='18px' width='200px' ml='1rem' />

        <Divider className={classes.divider} />

        <SkeletonText mt='0.2rem' ml='1rem' mr='1rem' noOfLines={2} spacing='2' skeletonHeight='4' />

        <div className={classes.footer}>
          <div className={classes.avatar_container}>
            <SkeletonCircle size='8' />
            <Skeleton height='14px' width='200px' ml='0.5rem' mb='4px' />
          </div>

          <Skeleton height='14px' width='90px' mb='4px' />
        </div>
      </div>
    </Li>
  )
}

export { ReviewSkeleton }
