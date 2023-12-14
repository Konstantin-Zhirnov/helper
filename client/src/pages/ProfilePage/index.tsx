import React from 'react'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import { Posts, ProfileInfo, Reviews } from '../../widgets'
import {
  fetchPostsByUser,
  fetchReviewsByAuthor,
  getAuth, getIsPostsByUser, getIsReviewsByAuthor,
  getUser,
  ProfileAvatar,
} from '../../features'
import { useAppDispatch, useAppSelector, Wrapper } from '../../shared'

import classes from './ProfilePage.module.sass'


const ProfilePage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUser)
  const isAuth = useAppSelector(getAuth)
  const isPosts = useAppSelector(getIsPostsByUser)
  const isReviews = useAppSelector(getIsReviewsByAuthor)

  React.useEffect(() => {
    if (user._id) {
      dispatch(fetchPostsByUser(user._id))
      dispatch(fetchReviewsByAuthor(user._id))
    }
  }, [user?._id])


  if (!isAuth) return <p className={classes.text}>You need to log in</p>

  return (
    <Wrapper>
      <ProfileAvatar />

      <ProfileInfo canRemove={isPosts || isReviews}/>

      {
        (isPosts || isReviews) && (
          <Tabs isFitted variant='enclosed'>
            <TabList className={classes.tab_list}>
              <Tab isDisabled={!isPosts} className={classes.tab}>Posts</Tab>
              <Tab isDisabled={!isReviews} className={classes.tab}>Reviews</Tab>
            </TabList>
            <TabPanels>
              <TabPanel className={classes.tab_panel}>
                {isPosts && <Posts reason='profile' />}
              </TabPanel>
              <TabPanel className={classes.tab_panel}>
                <Reviews reason='user' />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )
      }

    </Wrapper>
  )
})

export default ProfilePage
