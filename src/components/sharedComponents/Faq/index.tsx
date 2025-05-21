import Item from '@/src/components/sharedComponents/Faq/Item'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import type { ComponentProps, FC } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  background-color: #030303;
  background-image: radial-gradient(circle at -1% -24%, rgb(193 187 246 / 7%), rgb(193 187 246 / 0%) 57%);
  border-radius: calc(var(--base-border-radius-xl) + var(--base-border-radius-sm));
  display: flex;
  flex-direction: column;
  padding: calc(var(--base-common-padding) * 6) var(--base-common-padding);
  row-gap: calc(var(--base-gap) * 5);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: calc(var(--base-common-padding) * 6);
    `,
  )}

  ${breakpointMediaQuery(
    'tabletLandscapeStart',
    css`
      padding: calc(var(--base-common-padding) * 10);
    `,
  )}
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: calc(var(--base-gap) * 2);
`

const MainTitle = styled.h2`
  color: var(--theme-title-color);
  font-family: var(--base-font-family-title);
  font-size: 2.8rem;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      font-size: 5rem;
    `,
  )}
`

interface Props extends ComponentProps<'div'> {
  data: { title: string; description: string }[]
  mainTitle?: string
}

const Faq: FC<Props> = ({ mainTitle = 'Frequently asked questions', data }) => {
  return (
    <Wrapper>
      <MainTitle>{mainTitle}</MainTitle>
      <List>
        {data.map(({ title, description }) => (
          <Item
            key={`${title}`}
            title={title}
            description={description}
          />
        ))}
      </List>
    </Wrapper>
  )
}

export default Faq
