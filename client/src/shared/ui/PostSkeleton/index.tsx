import React from 'react'
import { Divider, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

import { Li } from '../Li'
import { useMatchMedia } from '../../lib/hooks/useMatchMedia'

import classes from './PostSkeleton.module.sass'


const PostSkeleton: React.FC = () => {

  const { isMobile } = useMatchMedia()

  return (
    <Li>
      <div className={classes.container}>
        <div className={classes.user}>
          <SkeletonCircle size='24' />
          <Skeleton height='18px' width='150px' mt='0.5rem' mb='0.5rem' />
          <Skeleton height='16px' width='115px' mb='0.3rem' />
        </div>
        <div className={classes.info}>
          {
            isMobile
              ? <Skeleton height='18px' width='265px' mt='0.5rem' />
              : <Skeleton height='18px' width='300px' mt='0.5rem' />
          }

          <Divider className={classes.divider} />

          <SkeletonText mt='0.3rem' noOfLines={2} spacing='4' skeletonHeight='4' />

          <div className={classes.footer}>
            <Skeleton height='14px' width='120px' mb='0.3rem' />

            <Skeleton height='14px' width='90px' mb='0.3rem' />
          </div>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.contact}>
        <Skeleton height='18px' width='260px' mb='0.7rem' mt='0.7rem' />
      </div>
    </Li>
  )
}

export { PostSkeleton }
