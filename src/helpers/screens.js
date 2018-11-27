import { SCREEN_SIZES } from 'helpers/globals'

const hideAt = screenSize => (
  {
    [`@media (max-width: ${screenSize}px)`]: {
      display: 'none !important'
    }
  }
)

const hideFrom = screenSize => (
  {
    [`@media (min-width: ${screenSize}px)`]: {
      display: 'none !important'
    }
  }
)

export const hideAtSm = hideAt(SCREEN_SIZES.sm)
export const hideAtMd = hideAt(SCREEN_SIZES.md)
export const hideAtLg = hideAt(SCREEN_SIZES.lg)
export const hideAtXl = hideAt(SCREEN_SIZES.xl)

export const hideFromSm = hideFrom(SCREEN_SIZES.sm + 1)
export const hideFromMd = hideFrom(SCREEN_SIZES.md + 1)
export const hideFromLg = hideFrom(SCREEN_SIZES.lg + 1)
export const hideFromXl = hideFrom(SCREEN_SIZES.xl + 1)

const styleFrom = (screenSize, style) => (
  {
    [`@media (min-width: ${screenSize}px)`]: style
  }
)

const styleUpTo = (screenSize, style) => (
  {
    [`@media (max-width: ${screenSize}px)`]: style
  }
)

export const styleFromSm = styleFrom.bind(null, SCREEN_SIZES.sm)
export const styleFromMd = styleFrom.bind(null, SCREEN_SIZES.md)
export const styleFromLg = styleFrom.bind(null, SCREEN_SIZES.lg)
export const styleFromXl = styleFrom.bind(null, SCREEN_SIZES.xl)

export const styleUpToSm = styleUpTo.bind(null, SCREEN_SIZES.sm)
export const styleUpToMd = styleUpTo.bind(null, SCREEN_SIZES.md)
export const styleUpToLg = styleUpTo.bind(null, SCREEN_SIZES.lg)
export const styleUpToXl = styleUpTo.bind(null, SCREEN_SIZES.xl)
