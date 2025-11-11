import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196f3;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
`

const LoaderText = styled.p`
  color: #666;
  margin: 0;
  font-size: 1rem;
`

interface LoaderProps {
  text?: string
  size?: number
  color?: string
}

export const Loader = ({ text = 'Loading...', size = 50, color = '#2196f3' }: LoaderProps) => {
  return (
    <LoaderContainer>
      <Spinner
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderTopColor: color,
        }}
      />
      {text && <LoaderText>{text}</LoaderText>}
    </LoaderContainer>
  )
}

export const LoaderInCard = styled(LoaderContainer)`
  background: white;
  border-radius: 8px;
`

