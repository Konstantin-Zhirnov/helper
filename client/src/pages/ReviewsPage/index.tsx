import React from 'react'
import { useParams } from 'react-router-dom'

import { UserInfo } from '../../features'
import { Wrapper } from '../../shared'


const ReviewsPage: React.FC = () => {
  const { id } = useParams()
  return (
    <Wrapper>
      <UserInfo id={id} />
    </Wrapper>
  )
}

export default ReviewsPage
