import { css } from 'styled-components'

const breakpoints = {
  smallScreen: 576,
  mediumScreen: 768,
  largeScreen: 992,
  xLargeScreen: 1200
}

const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[`${label}Up`] = (...args) => css`
    @media (min-width: ${breakpoints[label]}px) {
      ${css(...args)}
    }
  `

  acc[`${label}Down`] = (...args) => css`
    @media (max-width: ${breakpoints[label] - 1}px) {
      ${css(...args)}
    }
  `

  return acc
}, {})

export default media
