import React from 'react'
import cn from 'classnames'
import { BiChevronDown } from 'react-icons/bi'

import { useAppDispatch, useAppSelector, useMatchMedia } from '../../../../../shared'

import { getLocation, getSearchComponentLocation, setModal } from '../../../model/slice'

import classes from './Button.module.sass'

interface IProps {
  search?: boolean
}
const Button: React.FC<IProps> = React.memo(({ search }) => {
  const { isMobile } = useMatchMedia()

  const dispatch = useAppDispatch()
  const location = useAppSelector(getLocation)
  const searchLocation = useAppSelector(getSearchComponentLocation)

  const handleClick = () => {
    dispatch(setModal('locations'))
    document.body.style.overflow = 'hidden'
  }

  return (
    <button onClick={handleClick} className={cn(classes.btn, { [classes.search]: search })}>
      {(isMobile || search) && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 29 29"
          fill="none"
          className={classes.location_icon}
        >
          <g clipPath="url(#clip0_7_792)">
            <path
              d="M14.5 16.3125C13.6038 16.3125 12.7277 16.0467 11.9826 15.5488C11.2374 15.0509 10.6566 14.3433 10.3137 13.5153C9.97071 12.6873 9.88098 11.7762 10.0558 10.8972C10.2307 10.0183 10.6622 9.21088 11.2959 8.57717C11.9296 7.94346 12.737 7.5119 13.616 7.33706C14.495 7.16223 15.4061 7.25196 16.234 7.59492C17.062 7.93788 17.7697 8.51866 18.2676 9.26382C18.7655 10.009 19.0313 10.8851 19.0313 11.7812C19.0299 12.9826 18.552 14.1343 17.7026 14.9838C16.8531 15.8333 15.7013 16.3111 14.5 16.3125ZM14.5 9.0625C13.9623 9.0625 13.4366 9.22195 12.9895 9.52069C12.5424 9.81943 12.194 10.244 11.9882 10.7408C11.7824 11.2376 11.7286 11.7843 11.8335 12.3117C11.9384 12.839 12.1973 13.3235 12.5776 13.7037C12.9578 14.0839 13.4422 14.3429 13.9696 14.4478C14.497 14.5527 15.0436 14.4988 15.5404 14.293C16.0372 14.0873 16.4618 13.7388 16.7606 13.2917C17.0593 12.8446 17.2188 12.319 17.2188 11.7812C17.218 11.0604 16.9313 10.3694 16.4216 9.85968C15.9119 9.34998 15.2208 9.06329 14.5 9.0625Z"
              fill="#6E82A8"
            />
            <path
              d="M14.5 27.1875L6.85534 18.1715C6.81193 18.1197 6.53978 17.7623 6.53978 17.7623C5.23379 16.0421 4.5282 13.941 4.53126 11.7812C4.53126 9.13737 5.58154 6.60178 7.45104 4.73228C9.32054 2.86278 11.8561 1.8125 14.5 1.8125C17.1439 1.8125 19.6795 2.86278 21.549 4.73228C23.4185 6.60178 24.4688 9.13737 24.4688 11.7812C24.472 13.9401 23.7669 16.0405 22.4616 17.7601L22.4602 17.7623C22.4602 17.7623 22.1884 18.1197 22.1479 18.1678L14.5 27.1875ZM7.98634 16.6705C7.98724 16.6711 8.19786 16.9498 8.24607 17.0098L14.5 24.3853L20.7622 16.9993C20.802 16.9493 21.0144 16.6687 21.0149 16.6679C22.0818 15.2624 22.6583 13.5458 22.6563 11.7812C22.6563 9.61808 21.7969 7.5435 20.2673 6.01391C18.7378 4.48432 16.6632 3.625 14.5 3.625C12.3368 3.625 10.2623 4.48432 8.73267 6.01391C7.20308 7.5435 6.34376 9.61808 6.34376 11.7812C6.34175 13.5468 6.91876 15.2643 7.98634 16.6705Z"
              fill="#6E82A8"
            />
          </g>
          <defs>
            <clipPath id="clip0_7_792">
              <rect width="29" height="29" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      <span className={cn(classes.text, { [classes.mobile]: isMobile })}>
        {search && searchLocation ? searchLocation : location}
      </span>
      <BiChevronDown size={isMobile ? 24 : 20} className={classes.arrow_icon} />
    </button>
  )
})

export { Button }