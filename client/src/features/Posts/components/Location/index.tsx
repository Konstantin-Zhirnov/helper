import React from 'react'
import cn from 'classnames'
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import { BsGeoAltFill } from 'react-icons/bs'

import { useAppDispatch, useAppSelector } from '../../../../app'

import { fetchLocations } from '../../model/asyncActions'
import { getLocation } from '../../model/slice'
import { LocationSelect } from './LocationSelect'

import classes from './Location.module.sass'


interface IProps {
  isMobile?: boolean
}

const Location: React.FC<IProps> = ({ isMobile }) => {

  const dispatch = useAppDispatch()
  const location = useAppSelector(getLocation)


  React.useEffect(() => {
    dispatch(fetchLocations())
  }, [])

  return (
    <Popover>
      <PopoverTrigger>
        <Button className={cn(classes.btn, { [`${classes.mobile}`]: isMobile })}><BsGeoAltFill />&nbsp;{location}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton className={classes.close} />
        <PopoverHeader className={classes.header}>Select a location</PopoverHeader>
        <PopoverBody><LocationSelect /></PopoverBody>
      </PopoverContent>
    </Popover>

  )
}

export { Location }




