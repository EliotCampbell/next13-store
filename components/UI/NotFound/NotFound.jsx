import React from 'react'
import classes from './NotFound.module.css'
import img404 from '@/public/img404.png'
import Link from 'next/link'
import Image from 'next/image'

const NotFound = () => {
  return (
    <div className={classes.main}>
      <h1>Whoops! ERROR 404 - PAGE NOT FOUND :_(</h1>
      <Image src={img404} alt={img404} className={classes.img} />
      <Link href={'/'} className={classes.backLink}>
        <h1>{'<<<'} GO TO MAIN </h1>
      </Link>
    </div>
  )
}

export default NotFound
