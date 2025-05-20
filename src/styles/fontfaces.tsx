import drukHeavy from '@/fonts/Druk-Heavy.woff2'
import drukWide from '@/fonts/DrukWide-Medium.woff2'
import { css } from 'styled-components'

const fontFaces = css`
    @font-face {
        font-display: swap;
        font-family: 'Druk Heavy';
        font-style: normal;
        font-weight: normal;
        src: url(${drukHeavy}) format('woff2');
    }

    @font-face {
        font-display: swap;
        font-family: 'Druk Wide';
        font-style: normal;
        font-weight: normal;
        src: url(${drukWide}) format('woff2');
    }
`

export default fontFaces
