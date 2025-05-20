import { Spinner } from '@bootnodedev/db-ui-toolkit'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
  max-width: 32rem;
  width: 100%;
  gap: 1.5rem;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`

const Title = styled.h3`
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`

const Description = styled.p`
  color: #666;
  margin: 0;
  line-height: 1.5;
`

interface LoadingCardProps {
  title?: string
  description?: string
}

export const LoadingCard = ({
  title = 'Indexing Your New Token',
  description = "This usually takes a few minutes. We're preparing everything for you.",
}: LoadingCardProps) => {
  return (
    <Container>
      <Card>
        <Spinner
          height="56"
          width="56"
        />
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextContainer>
      </Card>
    </Container>
  )
}
