import { Button, GeneralMessage } from '@bootnodedev/db-ui-toolkit'
import { useNavigate } from '@tanstack/react-router'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

interface ErrorCardProps {
  title?: string
  description?: string
  onRetry?: () => void
  buttonText?: string
}

export const ErrorCard = ({
  title = 'Something went wrong',
  description = 'An error occurred while processing your request. Please try again.',
  buttonText = 'Go to home',
}: ErrorCardProps) => {
  const navigate = useNavigate()
  return (
    <Container>
      <GeneralMessage
        title={title}
        message={<span>{description}</span>}
        actionButton={<Button onClick={() => navigate({ to: '/' })}>{buttonText}</Button>}
      />
    </Container>
  )
}
