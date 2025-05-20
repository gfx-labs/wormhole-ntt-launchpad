import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: var(--base-gap-xl);

  ${breakpointMediaQuery(
    'tabletLandscapeStart',
    css`
      align-items: flex-start;
      column-gap: calc(var(--base-gap) * 3);
      flex-direction: row;
    `,
  )}
`

const Item = styled.div`
  align-items: center;
  background-color: #030303;
  background-image: radial-gradient(circle at 50% 120%, rgb(193 187 246 / 8%), rgb(193 187 246 / 10%) 37%, rgb(255 255 255 / 0%) 69%);
  border-radius: calc(var(--base-border-radius-xl) + var(--base-border-radius-sm));
  border: solid 1px var(--theme-gray-1);
  box-shadow: 0 6.3px 6.5px 0 rgb(0 0 0 / 2%), 0 29.7px 25.5px 0 rgb(0 0 0 / 3%), 0 77px 80px 0 rgb(0 0 0 / 5%);
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--base-gap-xl);
  height: 100%;
  max-width: 100%;
  padding: calc(var(--base-common-padding) * 7) calc(var(--base-common-padding) * 7) calc(var(--base-common-padding) * 4);
  width: 350px;

  ${breakpointMediaQuery(
    'tabletLandscapeStart',
    css`
      max-width: none;
      width: auto;
    `,
  )}
`

const Step = styled.span`
  color: rgb(255 255 255 / 40%);
  font-family: var(--base-font-family-title);
  font-size: 2.4rem;
  line-height: 1;
  text-align: center;
`

const Title = styled.h2`
  color: var(--theme-title-color);
  font-family: var(--base-font-family-title);
  font-size: 3.6rem;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
`

const Text = styled.p`
  color: var(--theme-text-color);
  font-size: 1.4rem;
  font-weight: normal;
  line-height: 1.6;
  margin: 0;
  text-align: center;
`

const Steps = () => {
  const Items = [
    {
      title: (
        <>
          Create Your
          <br />
          Multichain Token
        </>
      ),
      description:
        'Expand or launch your token across multiple networks to unlock multichain functionality and broaden its reach.',
    },
    {
      title: (
        <>
          Manage Your
          <br />
          Multichain Token
        </>
      ),
      description:
        'Easily manage your multichain-enabled token. Set inbound and outbound rate limits, and deploy your token on new networks as you grow.',
    },
    {
      title: (
        <>
          Token
          <br />
          Dashboard
        </>
      ),
      description:
        "Track your token's total supply, monitor distribution across networks, and visualize rate limits for seamless multichain management.",
    },
  ]

  return (
    <Wrapper>
      {Items.map(({ title, description }, index) => (
        <Item key={`${description}`}>
          <Step>0{index + 1}</Step>
          <Title>{title}</Title>
          <Text>{description}</Text>
        </Item>
      ))}
    </Wrapper>
  )
}

export default Steps
