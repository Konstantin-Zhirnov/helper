import React from 'react'

import { Title, Wrapper } from '../../shared'

import classes from './PolicyPage.module.sass'

const PolicyPage: React.FC = () => {
  return (
    <>
      <Title text="Privacy Policy" divider />
      <Wrapper>
        <p className={classes.text}>
          Your privacy is important to us. This document outlines the policy regarding the use of
          cookies on our website.
        </p>
        <p className={classes.title}>1. How We Use Cookies</p>
        <p className={classes.text}>
          We use cookies to manage user sessions and enhance the experience on our website. Cookies
          are small text files placed on your device when you visit a website. They help us
          determine if you are logged in and store your preferences for the next visit.
        </p>
        <p className={classes.title}>2. Types of Cookies We Use</p>
        <p className={classes.text}>
          Session Cookies: These cookies are temporarily stored on your device and are deleted when
          you close your browser. They are necessary for proper authentication and user session
          functionality.
        </p>
        <p className={classes.title}>3. Managing Cookies</p>
        <p className={classes.text}>
          You can manage cookies through your web browser settings. Typically, browsers allow you to
          disable cookies or notify you when they are sent. However, disabling cookies may impact
          the functionality of our website.
        </p>
        <p className={classes.title}>4. Consent to Cookie Policy</p>
        <p className={classes.text}>
          By continuing to use our website, you agree to our cookie usage policy.
        </p>
        <p className={classes.title}>5. Changes to Cookie Policy</p>
        <p className={classes.text}>
          We may periodically update our cookie usage policy, and any changes will be posted on this
          page.
        </p>
        <p className={classes.title}>6. Contact Information</p>
        <p className={classes.text}>
          If you have any questions regarding our cookie policy, please contact us at{' '}
          <a href="mailto:kostya.zhirnov@gmail.com">kostya.zhirnov@gmail.com</a>.
        </p>
        <p className={classes.version}>
          <span>Last Updated:</span> January 29, 2004
        </p>
      </Wrapper>
    </>
  )
}

export default PolicyPage
