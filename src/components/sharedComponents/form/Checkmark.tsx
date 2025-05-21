import styled from 'styled-components'

export const Checkmark = styled.div`
  --checkmark-size: 32px;

  align-items: center;
  border-radius: 50%;
  border: solid 2px #a09fa1;
  display: flex;
  height: var(--checkmark-size);
  justify-content: center;
  transition: border-color var(--base-transition-duration) ease;
  width: var(--checkmark-size);

  &::after {
    background-position: 50% 50%;
    background-repeat: no-repeat;
    content: '';
    height: 100%;
    width: 100%;
  }

  &.checked {
    border-color: var(--theme-color-primary);

    &::after {
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuMDQ4IDUuODk5TDMuNjk1IDkuMjUybDYuNDg2IDYuNDg3TDIwLjMwNSA1LjYxNSAxNi45NTIgMi4yNmwtNi43NyA2Ljc3TDcuMDQ3IDUuOXoiIGZpbGw9IiNDMUJCRjYiLz48L3N2Zz4=');
    }
  }
`
