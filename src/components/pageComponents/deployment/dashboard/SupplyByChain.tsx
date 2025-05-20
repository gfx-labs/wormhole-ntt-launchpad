import type { NTTToken } from '@/src/api/endpoints'
import { InnerCardOpaque, InnerCardTitle } from '@/src/components/sharedComponents/form/ui'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import { Cell, Pie, PieChart } from 'recharts'
import styled, { css } from 'styled-components'
import { formatUnits } from 'viem'

const Wrapper = styled(InnerCardOpaque)`
  padding: calc(var(--base-common-padding-xl) * 2) var(--base-common-padding-xl);
  row-gap: calc(var(--base-gap-xl) * 3);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: calc(var(--base-common-padding) * 4);
    `,
  )}
`

const Title = styled(InnerCardTitle)`
  border-bottom: 1px solid rgb(255 255 255 / 12%);
  padding-bottom: calc(var(--base-common-padding) * 3);
`

const ChartWrapper = styled.div`
  --chart-size: 215px;

  display: grid;
  margin: 0 auto;
  max-width: fit-content;
  min-width: 0;
  row-gap: var(--base-gap-xl);

  ${breakpointMediaQuery(
    'tabletLandscapeStart',
    css`
      column-gap: var(--base-gap-xl);
      grid-template-columns: var(--chart-size) 1fr;
  `,
  )}
`

const Chart = styled.div`
  display: flex;
  justify-content: center;
`

const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: max-content;
  row-gap: var(--base-gap-sm);
`

const Rows = styled.div`
  overflow-x: auto;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.75fr 1.25fr;
`

const Value = styled.div<{ type?: 'text' | 'number' }>`
  align-items: center;
  color: var(--theme-text-color);
  column-gap: var(--base-gap);
  display: flex;
  font-size: 1.4rem;
  justify-content: ${({ type }) => (type === 'number' ? 'flex-end' : 'flex-start')};
  line-height: 1.4;
  min-width: 0;
  padding: var(--base-gap) calc(var(--base-gap) + var(--base-gap-sm));

  &:first-child {
    color: var(--theme-text-color-light);
  }
`

Value.defaultProps = {
  type: 'text',
}

const Total = styled(Value)`
  background-color: var(--theme-gray-1);
  font-size: 1.6rem;

  &:first-child {
    border-top-left-radius: var(--base-border-radius);
    border-bottom-left-radius: var(--base-border-radius);
  }

  &:last-child {
    border-top-right-radius: var(--base-border-radius);
    border-bottom-right-radius: var(--base-border-radius);
    font-weight: 700;
  }
`

const Circle = styled.div<{ color: string }>`
  --circle-size: 8px;

  background-color: ${({ color }) => color};
  border-radius: 50%;
  flex-shrink: 0;
  height: var(--circle-size);
  width: var(--circle-size);
`

const SupplyByChain = ({ tokens, ...restProps }: { tokens: NTTToken[] }) => {
  const allChainsTotalSupply = tokens.reduce(
    (acc, ti) => acc + BigInt(ti.token.totalSupply),
    BigInt(0),
  )

  const getTokenSupply = (ti: NTTToken) => {
    if (allChainsTotalSupply === 0n) {
      return 0
    }

    return formatUnits(BigInt(ti.token.totalSupply), ti.token.decimals)
  }

  const getTokenSupplyPercentage = (ti: NTTToken) => {
    if (allChainsTotalSupply === 0n) {
      return 0
    }

    return formatUnits((BigInt(ti.token.totalSupply) * BigInt(10000)) / allChainsTotalSupply, 2)
  }

  const data = tokens.map((ti) => ({
    name: ti.blockchain,
    value: +getTokenSupply(ti),
  }))

  const COLORS = [
    '#FD8057',
    '#DDE95A',
    '#C1BBF6',
    '#8886AB',
    '#985c48',
    '#7d861b',
    '#2715d2',
    '#4e48b8',
  ]

  const calculateTotalPercentage = () => {
    return tokens.reduce((acc, ti) => acc + Number(getTokenSupplyPercentage(ti)), 0)
  }

  return (
    <Wrapper {...restProps}>
      <Title>Supply by chains</Title>
      <ChartWrapper>
        <Chart>
          <PieChart
            height={215}
            width={215}
          >
            <Pie
              cx="50%"
              cy="50%"
              data={data}
              dataKey="value"
              outerRadius="100%"
              stroke="#000"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Chart>
        <Rows>
          <Data>
            {tokens.map((ti, index) => {
              return (
                <Row key={`${ti.blockchain}`}>
                  <Value>
                    <Circle color={COLORS[index % COLORS.length]} /> {ti.blockchain}
                  </Value>
                  <Value type="number">{Number(getTokenSupplyPercentage(ti)).toFixed(2)}%</Value>
                  <Value type="number">
                    ({getTokenSupply(ti) === '0' ? '0.00' : getTokenSupply(ti)})
                  </Value>
                </Row>
              )
            })}
            <Row>
              <Total>Total supply</Total>
              <Total type="number">{calculateTotalPercentage().toFixed(2)}%</Total>
              <Total type="number">
                {formatUnits(allChainsTotalSupply, tokens[0].token.decimals)}
              </Total>
            </Row>
          </Data>
        </Rows>
      </ChartWrapper>
    </Wrapper>
  )
}

export default SupplyByChain
