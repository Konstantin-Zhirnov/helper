import React from 'react'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'


import { Posts, ProfileInfo, Reviews } from '../../widgets'
import {
  fetchPostsByUser,
  fetchReviewsByAuthor,
  getAuth,
  getPostsByUser,
  getReviewsByAuthor,
  getUser,
  ProfileAvatar,
} from '../../features'
import { useAppDispatch, useAppSelector, Wrapper } from '../../shared'

import classes from './ProfilePage.module.sass'


const ProfilePage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUser)
  const isAuth = useAppSelector(getAuth)
  const posts = useAppSelector(getPostsByUser)
  const reviews = useAppSelector(getReviewsByAuthor)


  const memoizedPosts = React.useMemo(() => posts, [posts])
  const memoizedReviews = React.useMemo(() => reviews, [reviews])

  React.useEffect(() => {
    dispatch(fetchPostsByUser(user._id))
    dispatch(fetchReviewsByAuthor(user._id))
  }, [user])


  if (!isAuth) return <p className={classes.text}>You need to log in</p>

  return (
    <Wrapper>
      <ProfileAvatar name={user.name} photo={user.photo} id={user._id} />

      <ProfileInfo canRemove={posts.length === 0 && reviews.length === 0} />

      {
        (posts.length > 0 || reviews.length > 0) && (
          <Tabs isFitted variant='enclosed'>
            <TabList className={classes.tab_list}>
              <Tab isDisabled={posts.length < 1}>Posts</Tab>
              <Tab>Reviews</Tab>
            </TabList>
            <TabPanels>
              <TabPanel className={classes.tab_panel}>
                {!!posts.length && <Posts posts={memoizedPosts} reason='profile' />}
              </TabPanel>
              <TabPanel className={classes.tab_panel}>
                <Reviews reviews={memoizedReviews} reason='user' />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )
      }

    </Wrapper>
  )
})

export default ProfilePage
