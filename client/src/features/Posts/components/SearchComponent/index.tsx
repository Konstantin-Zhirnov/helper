import React from 'react'

import { useAppDispatch, useMatchMedia } from '../../../../shared'

import { Location } from '../Location'
import { Search } from './Search'
import { SearchButton } from './SearchButton'
import { Divider } from './Divider'

import classes from './SearchComponent.module.sass'
import { fetchLocations } from '../../model/asyncActions'

const SearchComponent: React.FC = React.memo(() => {
  const { isMobile } = useMatchMedia()

  const dispatch = useAppDispatch()

  const getDesktop = () => {
    return (
      <div className={classes.container}>
        <Search />
        <Divider />
        <Location search />
        <SearchButton />
      </div>
    )
  }

  const getMobile = () => {
    return (
      <div className={classes.container_mobile}>
        <Location />

        <div className={classes.search_mobile}>
          <Search isMobile={isMobile} />
          <SearchButton isMobile={isMobile} />
        </div>
      </div>
    )
  }

  React.useEffect(() => {
    dispatch(fetchLocations())
  }, [])

  return !isMobile ? getDesktop() : getMobile()
})

export { SearchComponent }
