import { PrimaryButton } from '@/src/components/sharedComponents/ui/Buttons'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import { useNavigate } from '@tanstack/react-router'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 65px;
  row-gap: var(--base-gap-xl);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding-top: 140px;
    `,
  )}
`

const Title = styled.h1`
  color: var(--theme-title-color);
  font-family: var(--base-font-family-title);
  font-size: 5.4rem;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      font-size: 12rem;
    `,
  )}
`

const Text = styled.p`
  color: var(--theme-text-color-light);
  font-size: 1.6rem;
  font-weight: normal;
  line-height: 1.5;
  margin: calc(var(--base-gap-xl) * -1) 0 0;
  text-align: center;

  br {
    display: none;
  }

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      br {
        display: block;
      }
    `,
  )}
`

const Buttons = styled.div`
  align-items: center;
  display: grid;
  padding-top: calc(var(--base-gap-xl) * 2);
  row-gap: var(--base-gap-xl);
  text-align: center;

  ${breakpointMediaQuery(
    'tabletLandscapeStart',
    css`
      column-gap: var(--base-gap-xl);
      grid-template-columns: 1fr 16px 1fr;
    `,
  )}
`

const MainButton = styled(PrimaryButton)`
  border-radius: calc(
    var(--base-border-radius-xl) + var(--base-border-radius-sm)
  );
  flex-direction: column;
  font-size: 1.3rem;
  font-weight: 500;
  height: 63px;
  line-height: 1;
  padding: 0 var(--base-common-padding-xl);
  row-gap: 2px;
  text-align: center;
  width: 100%;

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      height: 96px;
      max-width: 350px;
      font-size: 1.4rem;
    `,
  )}
`

const ButtonDescription = styled.span`
  font-family: var(--base-font-family);
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.2;
  text-transform: none;
`

const Or = styled.span`
  color: var(--theme-text-color-light);
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.2;
  text-transform: uppercase;
`

const WelcomeHome = () => {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <Title>NTT Launchpad</Title>
      <Text>
        Native Token Transfers (NTT) <br />
        simplifies and enables seamless, flexible <br />
        token transfers across blockchains
      </Text>
      <Buttons>
        <MainButton
          onClick={() => {
            navigate({
              to: '/deploy',
            })
          }}
        >
          Get Started
          <ButtonDescription>Create your multichain token</ButtonDescription>
        </MainButton>
        <Or>Or</Or>
        <MainButton
          onClick={() => {
            navigate({
              to: '/deployment/search',
            })
          }}
        >
          Manage Deployment
          <ButtonDescription>Access the token dashboard and admin panel</ButtonDescription>
        </MainButton>
      </Buttons>
    </Wrapper>
  )
}

export default WelcomeHome
