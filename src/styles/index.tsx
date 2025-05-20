import { createGlobalStyle } from 'styled-components'

import fontfaces from '@/src/styles/fontfaces'
import globalStyles from '@/src/styles/globalStyles'

/**
 * Global styles, including base and theme CSS variables.
 *
 * This component is used to apply the global styles to the app.
 */
const Styles = createGlobalStyle`
  ${fontfaces}
  ${globalStyles}
`

export default Styles
