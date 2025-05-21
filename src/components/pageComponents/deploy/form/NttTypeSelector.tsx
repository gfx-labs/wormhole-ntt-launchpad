import { useDeployStore } from '@/src/stores/deploy'
import type { DeployType } from '@/src/stores/deploy/types'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  max-width: 100%;
  row-gap: calc(var(--base-gap) * 3);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      column-gap: calc(var(--base-gap) * 3);
      grid-template-columns: 1fr 1fr;
    `,
  )}
`

const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border-radius: calc(
    var(--base-border-radius-xl) + var(--base-border-radius-sm)
  );
  border: solid 1px rgb(255 255 255 / 12%);
  box-shadow: 0 6.3px 6.5px 0 rgb(0 0 0 / 2%), 0 29.7px 25.5px 0 rgb(0 0 0 / 3%),
    0 77px 80px 0 rgb(0 0 0 / 5%);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  max-width: 100%;
  min-height: 260px;
  min-width: 0;
  padding: 0 calc(var(--base-common-padding) * 6);
  row-gap: var(--base-gap);
  transition: background-color var(--base-transition-duration) ease-out,
    border-color var(--base-transition-duration) ease-out;

  &:hover {
    background-color: rgb(255 255 255 / 5%);
    border-color: rgb(193 187 246 / 50%);
  }

  &:active {
    opacity: 0.8;
  }

  ${breakpointMediaQuery(
    'tabletLandscapeStart',
    css`
      width: 405px;
    `,
  )}
`

const ButtonTitle = styled.span`
  color: var(--theme-title-color);
  font-family: var(--base-font-family-title);
  font-size: 3.6rem;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
`

const ButtonText = styled.span`
  color: var(--theme-text-color);
  font-family: var(--base-font-family);
  font-size: 1.4rem;
  font-weight: normal;
  line-height: 1.4;
  margin: calc(var(--base-gap) * -1) 0 0;
  text-align: center;
`

const NttTypeSelector = ({ ...restProps }) => {
  const { setFormType, setStep } = useDeployStore()

  const options: Array<{
    type: DeployType
    text: string | ReactNode
    title: string | ReactNode
  }> = [
    {
      type: 'upgrade',
      title: (
        <>
          Expand your
          <br />
          existing token
        </>
      ),
      text: (
        <>
          Transform your existing token into
          <br />a multichain asset without altering
          <br />
          its original contract.
        </>
      ),
    },
    {
      type: 'new',
      title: (
        <>
          Launch a<br />
          Multichain token
        </>
      ),
      text: (
        <>
          Deploy a new token ready
          <br />
          for multichain integration
          <br />
          from day one.
        </>
      ),
    },
  ]

  return (
    <Wrapper {...restProps}>
      {options.map(({ type, text, title }) => (
        <Button
          key={type}
          onClick={() => {
            setFormType(type)
            setStep('setup')
          }}
        >
          <ButtonTitle>{title}</ButtonTitle>
          <ButtonText>{text}</ButtonText>
        </Button>
      ))}
    </Wrapper>
  )
}

export default NttTypeSelector
