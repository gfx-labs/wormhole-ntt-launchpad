import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loader = styled.div`
  animation: l1 1s infinite;
  animation: l1 1s infinite;
  width: 20px;
  height: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid;
  border-color: #000 #0000;

  @keyframes l1 {
    to {
      transform: rotate(0.5turn);
    }
  }
`

export function LoadingSpinner() {
  return (
    <Container>
      <Loader />
    </Container>
  )
}
