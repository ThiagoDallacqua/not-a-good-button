import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

import { texts } from '../../constants'

import styles from './index.module.scss'
import './balloon.css'

const Button = () => {
  const timeout = useRef<NodeJS.Timeout>()

  const [clickCount, setClickCount] = useState(0)
  const [clicked, setClicked] = useState(false) // this serves only to "glitch out" the tooltip XD
  const [tooltip, setTooltip] = useState('')

  const buttonStyles = classNames(styles.button, {
    [styles.warning]: clickCount === 3,
    [styles.danger]: clickCount > 3
  })

  useEffect(() => {
    if (clicked) {
      timeout.current = setTimeout(() => {
        setClicked(false);
      }, 1500)
    }

    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [clicked])


  return (
    <button
      aria-label={tooltip}
      data-balloon-pos={'up'}
      className={buttonStyles}
      onClick={() => {
        if (clickCount === 4) {
          setClickCount(0)
        } else {
          setClickCount(clickCount + 1)
        }

        setTooltip(texts[clickCount])

        setClicked(true)
      }}
    >
      hello there, click me!
    </button>
  )
}

export default Button
