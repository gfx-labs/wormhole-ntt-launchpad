import { css } from 'styled-components'

import baseCSSVars from '@/src/styles/baseCSSVars'
import darkThemeCSSVars from '@/src/styles/themes/darkThemeCSSVars'

const globalStyles = css`
  :root {
    ${baseCSSVars}
  }

  html {
    ${darkThemeCSSVars}
    font-size: 10px;
    scroll-behavior: smooth;
  }

  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--theme-body-background-color);
    background-image: url("/img/bg-main.jpg");
    background-position: 50% 0;
    background-repeat: no-repeat;
    background-size: cover;
    color: var(--theme-text-color, #000);
    font-family: var(--base-font-family);
    font-size: var(--base-text-font-size, 16px);
    line-height: 1.5;
    outline-color: var(--theme-color-primary, #ccc);
  }

  code {
    font-family: var(--base-font-family-code, monospace);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  figure,
  p,
  ol,
  ul {
    margin: 0;
  }

  ol,
  ul {
    list-style: none;
    padding-inline: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-size: inherit;
    font-weight: inherit;
  }

  img {
    display: block;
    max-inline-size: 100%;
  }

  a {
    color: var(--theme-color-primary, #000);
  }

  /**
  * Dialog / Modal CSS reset
  */
  dialog {
    align-items: center;
    background-color: var(--theme-dialog-overlay-color, rgb(0 0 0 / 20%));
    border-radius: var(--base-dialog-border-radius, var(--base-border-radius, 8px));
    border: none;
    display: flex;
    height: 100%;
    justify-content: center;
    opacity: 0;
    padding: var(--base-padding-mobile, 10px);
    transition:
      display var(--base-dialog-animation-time, var(--base-animation-time-xl, 0.4s)) ease-out
        allow-discrete,
      opacity var(--base-dialog-animation-time, var(--base-animation-time-xl, 0.4s)) ease-out,
      overlay var(--base-dialog-animation-time, var(--base-animation-time-xl, 0.4s)) ease-out
        allow-discrete;
    width: 100%;

    &[open] {
      opacity: 1;
    }
  }
`

export default globalStyles
