import React from 'react'

import { SearchComponent } from '../../../features'
import { Wrapper } from '../../../shared'

import classes from './Hero.module.sass'

const Hero: React.FC = React.memo(() => {
  return (
    <div className={classes.hero}>
      <Wrapper>
        <div className={classes.container}>
          <div className={classes.info}>
            <h1 className={classes.title}>Find your local services here</h1>
            <p className={classes.text}>
              Connect with trusted local professionals for all your service needs.
            </p>

            <SearchComponent />

            <p className={classes.text_bottom}>
              Common search topics: <span>plumber</span>, <span>web designer</span>,{' '}
              <span>dog walker</span>
            </p>
          </div>

          <div className={classes.image}>
            <img src="/person.webp" alt="photo person with box" />
          </div>
        </div>
      </Wrapper>
    </div>
  )
})

export { Hero }
