import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: var(--theme-color-darker-gray);
  border-radius: var(--base-border-radius-xl);
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  padding: calc(var(--base-common-padding-xl) * 2) var(--base-common-padding-xl);
  width: 534px;
  overflow: auto;
`

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: calc(var(--base-common-padding-xl) * 2);
`

export const Title = styled.h2`
  color: var(--theme-title-color);
  font-family: var(--base-font-family-title);
  font-size: 3.6rem;
  line-height: 1;
  text-transform: uppercase;
`

export const Close = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.923 18.5775C20.0159 18.6704 20.0896 18.7807 20.1399 18.9021C20.1902 19.0235 20.2161 19.1536 20.2161 19.285C20.2161 19.4164 20.1902 19.5465 20.1399 19.6679C20.0896 19.7893 20.0159 19.8996 19.923 19.9925C19.8301 20.0854 19.7198 20.1591 19.5984 20.2094C19.477 20.2597 19.3469 20.2855 19.2155 20.2855C19.0841 20.2855 18.954 20.2597 18.8326 20.2094C18.7112 20.1591 18.6009 20.0854 18.508 19.9925L10.2155 11.6987L1.92302 19.9925C1.73538 20.1801 1.48089 20.2855 1.21552 20.2855C0.950158 20.2855 0.695662 20.1801 0.508022 19.9925C0.320381 19.8048 0.214966 19.5503 0.214966 19.285C0.214966 19.0196 0.320381 18.7651 0.508022 18.5775L8.80177 10.285L0.508022 1.99248C0.320381 1.80484 0.214966 1.55034 0.214966 1.28498C0.214966 1.01962 0.320381 0.765121 0.508022 0.57748C0.695662 0.389839 0.950158 0.284424 1.21552 0.284424C1.48089 0.284424 1.73538 0.389839 1.92302 0.57748L10.2155 8.87123L18.508 0.57748C18.6957 0.389839 18.9502 0.284424 19.2155 0.284424C19.4809 0.284424 19.7354 0.389839 19.923 0.57748C20.1107 0.765121 20.2161 1.01962 20.2161 1.28498C20.2161 1.55034 20.1107 1.80484 19.923 1.99248L11.6293 10.285L19.923 18.5775Z"
      fill="white"
    />
  </svg>
)

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: 21px;
  margin: 0;
  padding: 0;
  width: 21px;

  &:active {
    opacity: 0.8;
  }
`

CloseButton.defaultProps = {
  type: 'button',
}

export const Item = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--theme-text-color-light);
  column-gap: var(--base-gap-xl);
  cursor: pointer;
  display: flex;
  font-family: var(--base-font-family);
  font-size: 1.6rem;
  height: 60px;
  line-height: 1.2;
  transition: background-color var(--base-transition-duration-sm) ease;
  white-space: nowrap;

  &.active {
    background-color: rgb(255 255 255 / 5%);
    cursor: default;
    font-weight: 700;
  }

  &:hover {
    background-color: rgb(255 255 255 / 5%);
  }

  &.disabled {
    color: var(--theme-text-color-subtle, #8b8b8b);
    cursor: not-allowed;
    opacity: 0.5;
    font-weight: 400;
    pointer-events: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

Item.defaultProps = {
  type: 'button',
}
