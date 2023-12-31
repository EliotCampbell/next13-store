import React from 'react'
import classes from './TopBar.module.css'
import { AiOutlineCheck } from 'react-icons/ai'
import ReactCountryFlag from 'react-country-flag'
import TopbarMessageString from '@/components/UI/TopbarMessageString/TopbarMessageString'
import { FiChevronDown } from 'react-icons/fi'

const TopBar = () => {
  return (
    <div className={classes.topBarWrapper}>
      <div className={classes.topBar}>
        <TopbarMessageString />
        <div className={classes.checkDiv}>
          <div className={classes.check}>
            <AiOutlineCheck className={classes.ico} />
            <p className={classes.text}>More than 700 brands</p>
          </div>
          <div className={classes.check}>
            <AiOutlineCheck className={classes.ico} />
            <p className={classes.text}>Super fast delivery</p>
          </div>
          <div className={classes.check}>
            <AiOutlineCheck className={classes.ico} />
            <p className={classes.text}>5000 active customers</p>
          </div>
        </div>
        <div className={classes.langSelect}>
          <ReactCountryFlag countryCode="GB" svg title="US" />
          <p className={classes.langText}>EN</p>
          <FiChevronDown />
        </div>
      </div>
    </div>
  )
}

export default TopBar
