import { css } from 'styled-components'

/**
 * Dark theme CSS variables.
 *
 * It should be mainly colors, probably some background images too. Things that
 * change when you change themes, nothing else.
 *
 * Use a --theme prefix to indicate that these variables are theme-specific.
 */
const darkThemeCSSVars = css`
  /* Few basic colors */
  --theme-color-primary: #C1BBF6;
  --theme-color-primary-light: #e3eeff;
  --theme-color-primary-dark: #8886ab;
  --theme-color-darker-gray: #111112;

  /* Title color */
  --theme-title-color: #fff;

  /* Text color */
  --theme-text-color: #a09fa1;
  --theme-text-color-light: #fff;
  --theme-text-color-dark: #000;

  /* Danger / OK / warning */
  --theme-color-danger: #fd8058;
  --theme-color-ok: #7da983;
  --theme-color-warning: #cc0;

  /* General colors */
  --theme-black: #000;
  --theme-gray-1: #1c1c1c;

  /* Main body */
  --theme-body-background-color: #000;

  /* Header */
  --theme-header-background-color: transparent;
  --theme-header-text-color: #fff;

  /* Mobile menu */
  --theme-main-menu-background-color: #292b43;
  --theme-main-menu-color: #fff;

  /* Footer */
  --theme-footer-background-color: transparent;
  --theme-footer-text-color: #fff;
  --theme-footer-text-color-light: #A09FA1;

  /* Main Menu */
  --theme-main-menu-item-color: #fff;

  /* Primary Button */
  --theme-button-primary-background-color: #C1BBF6;
  --theme-button-primary-background-color-hover: #8886AB;

  --theme-button-primary-border-color: #C1BBF6;
  --theme-button-primary-border-color-hover: #8886AB;

  --theme-button-primary-color: #000;
  --theme-button-primary-color-hover: #000;

  --theme-button-primary-background-color-disabled: #C1BBF6;
  --theme-button-primary-border-color-disabled: #C1BBF6;
  --theme-button-primary-color-disabled: #000;

  /* Primary Inverted Button */
  --theme-button-primary-inverted-background-color: rgb(193 187 246 / 10%);
  --theme-button-primary-inverted-background-color-hover: rgb(193 187 246 / 10%);

  --theme-button-primary-inverted-border-color: #C1BBF6;
  --theme-button-primary-inverted-border-color-hover: #8886ab;

  --theme-button-primary-inverted-color: #C1BBF6;
  --theme-button-primary-inverted-color-hover: #8886ab;

  --theme-button-primary-inverted-background-color-disabled: rgb(193 187 246 / 10%);
  --theme-button-primary-inverted-border-color-disabled: #C1BBF6;
  --theme-button-primary-inverted-color-disabled: #C1BBF6;

  /* Secondary Button */
  --theme-button-secondary-background-color: rgba(193 187 246 / 5%);
  --theme-button-secondary-background-color-hover: rgba(193 187 246 / 10%);

  --theme-button-secondary-border-color: rgba(193 187 246 / 5%);
  --theme-button-secondary-border-color-hover: rgba(193 187 246 / 10%);

  --theme-button-secondary-color: rgb(193 187 246);
  --theme-button-secondary-color-hover: rgba(193 187 246 / 80%);

  --theme-button-secondary-background-color-disabled: rgba(193 187 246 / 5%);
  --theme-button-secondary-border-color-disabled: rgba(193 187 246 / 5%);
  --theme-button-secondary-color-disabled: rgb(193 187 246);

  /* Connect Button */
  --theme-button-connect-background-color: #C1BBF6;
  --theme-button-connect-background-color-hover: #8886AB;

  --theme-button-connect-border-color: #C1BBF6;
  --theme-button-connect-border-color-hover: #8886AB;

  --theme-button-connect-color: #000;
  --theme-button-connect-color-hover: #000;

  --theme-button-connect-background-color-disabled: #C1BBF6;
  --theme-button-connect-border-color-disabled: #C1BBF6;
  --theme-button-connect-color-disabled: #000;

  /* Pause Button */
  --theme-button-pause-background-color: #fd8058;
  --theme-button-pause-background-color-hover: #de704b;

  --theme-button-pause-border-color: #fd8058;
  --theme-button-pause-border-color-hover: #de704b;

  --theme-button-pause-color: #000;
  --theme-button-pause-color-hover: #000;

  --theme-button-pause-background-color-disabled: #fd8058;
  --theme-button-pause-border-color-disabled: #fd8058;
  --theme-button-pause-color-disabled: #000;

  /* Un-Pause Button */
  --theme-button-unpause-background-color: #7AE28D;
  --theme-button-unpause-background-color-hover: #62b871;

  --theme-button-unpause-border-color: #7AE28D;
  --theme-button-unpause-border-color-hover: #62b871;

  --theme-button-unpause-color: #000;
  --theme-button-unpause-color-hover: #000;

  --theme-button-unpause-background-color-disabled: #7AE28D;
  --theme-button-unpause-border-color-disabled: #7AE28D;
  --theme-button-unpause-color-disabled: #000;

  /* Dropdown */
  --theme-dropdown-background-color: #292b43;
  --theme-dropdown-border-color: #292b43;

  --theme-dropdown-box-shadow: 0 9.6px 13px 0 rgb(0 0 0 / 8%);

  --theme-dropdown-item-background-color: transparent;
  --theme-dropdown-item-background-color-hover: rgb(255 255 255 / 2%);
  --theme-dropdown-item-background-color-active: rgb(255 255 255 / 5%);

  --theme-dropdown-item-color: #fff;
  --theme-dropdown-item-color-hover: #fff;
  --theme-dropdown-item-color-active: #fff;

  --theme-dropdown-item-border-color: #4b4d60;
  --theme-dropdown-item-border-color-hover: #4b4d60;
  --theme-dropdown-item-border-color-active: #4b4d60;

  /* Dropdown Button  */
  --theme-button-dropdown-background-color: #8b46a4;
  --theme-button-dropdown-background-color-hover: #9a4eb5;

  --theme-button-dropdown-border-color: #8b46a4;
  --theme-button-dropdown-border-color-hover: #9a4eb5;

  --theme-button-dropdown-color: #fff;
  --theme-button-dropdown-color-hover: #fff;

  --theme-button-dropdown-background-color-disabled: #8b46a4;
  --theme-button-dropdown-border-color-disabled: #8b46a4;
  --theme-button-dropdown-color-disabled: #fff;

  /* Form Dropdown Button  */
  --theme-button-form-dropdown-background-color: transparent;
  --theme-button-form-dropdown-background-color-hover: transparent;

  --theme-button-form-dropdown-border-color: rgba(160 159 161 / 30%);
  --theme-button-form-dropdown-border-color-hover: rgb(255 255 255 / 40%);

  --theme-button-form-dropdown-color: var(--theme-text-color);
  --theme-button-form-dropdown-color-hover: var(--theme-text-color-light);

  --theme-button-form-dropdown-background-color-disabled: transparent;
  --theme-button-form-dropdown-border-color-disabled: rgba(160 159 161 / 30%);
  --theme-button-form-dropdown-color-disabled: var(--theme-text-color);

  /* Card */
  --theme-card-background-color: #232436;
  --theme-card-border-color: #232436;
  --theme-card-box-shadow: 0 0 20px 0 rgb(255 255 255 / 8%);

  /* Copy button */
  --theme-copy-button-color: rgb(255 255 255 / 60%);
  --theme-copy-button-color-hover: var(--theme-text-color-light);

  /* External link button */
  --theme-external-link-button-color: rgb(255 255 255 / 60%);
  --theme-external-link-button-color-hover: var(--theme-text-color-light);

  /* Toast */
  --theme-toast-background-color: #C1BBF6;
  --theme-toast-color: #000;

  /* General Error */
  --theme-general-error-background-color: #232436;
  --theme-general-error-border-color: #232436;
  --theme-general-error-title-color: #fff;
  --theme-general-error-message-background-color: #292b43;
  --theme-general-error-message-color: #fff;

  /* Spinner */
  --theme-spinner-color: #C1BBF6;

  /* Dialog / Modal */
  --theme-dialog-overlay-color: rgb(0 0 0 / 80%);

  /* Token Select */
  --theme-token-select-background-color: #2e3048;
  --theme-token-select-border-color: #2e3048;
  --theme-token-select-title-color: #fff;

  --theme-token-select-network-button-color: #fff;
  --theme-token-select-network-button-background-color: #292b43;

  --theme-token-select-list-border-top-color: #4b4d60;

  --theme-token-select-row-background-color: transparent;
  --theme-token-select-row-background-color-hover: rgb(255 255 255 / 5%);
  --theme-token-select-row-token-name-color: #fff;
  --theme-token-select-row-token-balance-color: #fff;
  --theme-token-select-row-token-value-color: #fff;

  --theme-token-select-top-token-item-background-color: #2e3048;
  --theme-token-select-top-token-item-border-color: #4b4d60;
  --theme-token-select-top-token-item-color: #fff;
  --theme-token-select-top-token-item-background-color-hover: rgb(255 255 255 / 5%);

  --theme-token-select-search-field-color: #fff;
  --theme-token-select-search-field-color-active: #fff;
  --theme-token-select-search-field-background-color: #292b43;
  --theme-token-select-search-field-background-color-active: #292b43;
  --theme-token-select-search-field-placeholder-color: #ddd;
  --theme-token-select-search-field-box-shadow: none;
  --theme-token-select-search-field-box-shadow-active: none;
  --theme-token-select-search-field-border-color: #5f6178;
  --theme-token-select-search-field-border-color-active: #5f6178;

  --theme-token-select-add-erc20-token-button-background-color: #5f6178;
  --theme-token-select-add-erc20-token-button-background-color-hover: #4a4c5f;
  --theme-token-select-add-erc20-token-button-border-color: #5f6178;
  --theme-token-select-add-erc20-token-button-border-color-hover: #4a4c5f;
  --theme-token-select-add-erc20-token-button-color: #fff;
  --theme-token-select-add-erc20-token-button-color-hover: #fff;

  /* Token Input */
  --theme-token-input-title-color: #fff;

  --theme-token-input-background: #373954;

  --theme-token-input-textfield-background-color: #373954;
  --theme-token-input-textfield-background-color-active: rgb(255 255 255 / 5%);
  --theme-token-input-textfield-border-color: #5f6178;
  --theme-token-input-textfield-border-color-active: #5f6178;
  --theme-token-input-textfield-color: rgb(255 255 255 / 80%);
  --theme-token-input-textfield-color-active: rgb(255 255 255 / 80%);
  --theme-token-input-textfield-placeholder-color: rgb(255 255 255 / 50%);

  --theme-token-input-dropdown-button-background-color: #373954;
  --theme-token-input-dropdown-button-background-color-hover: rgb(255 255 255 / 5%);
  --theme-token-input-dropdown-button-border-color: #5f6178;
  --theme-token-input-dropdown-button-border-color-hover: #5f6178;
  --theme-token-input-dropdown-button-border-color-active: #5f6178;
  --theme-token-input-dropdown-button-color: #fff;
  --theme-token-input-dropdown-button-color-hover: #fff;
  --theme-token-input-dropdown-button-background-color-disabled: #373954;
  --theme-token-input-dropdown-button-border-color-disabled: #5f6178;
  --theme-token-input-dropdown-button-color-disabled: #fff;

  --theme-token-input-max-button-background-color: #373954;
  --theme-token-input-max-button-background-color-hover: rgb(255 255 255 / 5%);
  --theme-token-input-max-button-border-color: #c5c2cb;
  --theme-token-input-max-button-border-color-hover: #c5c2cb;
  --theme-token-input-max-button-border-color-active: #c5c2cb;
  --theme-token-input-max-button-color: #c670e5;
  --theme-token-input-max-button-color-hover: #c670e5;
  --theme-token-input-max-button-background-color-disabled: #373954;
  --theme-token-input-max-button-border-color-disabled: #5f6178;
  --theme-token-input-max-button-color-disabled: #fff;

  --theme-token-input-estimated-usd-color: #e2e0e7;

  --theme-token-input-balance-color: #e2e0e7;
`

export default darkThemeCSSVars
