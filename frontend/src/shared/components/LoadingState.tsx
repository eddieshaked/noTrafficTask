import styled from 'styled-components'
import { Loader } from './Loader'

export const LoadingState = ({ text = 'Loading...' }: { text?: string }) => {
  return <Loader text={text} />
}

export const LoadingStateInCard = ({ text = 'Loading...' }: { text?: string }) => {
  return (
    <CardContainer>
      <Loader text={text} />
    </CardContainer>
  )
}

const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
`

