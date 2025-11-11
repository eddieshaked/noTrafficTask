import styled from 'styled-components'

export const Button = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ButtonLarge = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #45a049;
  }
`

export const PrimaryButton = styled(Button)`
  background: #4caf50;
  color: white;

  &:hover:not(:disabled) {
    background: #45a049;
  }
`

export const PrimaryButtonLarge = styled(ButtonLarge)`
  background: #4caf50;
  color: white;
`

export const SecondaryButton = styled(Button)`
  background: #2196f3;
  color: white;

  &:hover:not(:disabled) {
    background: #0b7dda;
  }
`

export const SecondaryButtonLarge = styled(ButtonLarge)`
  background: #2196f3;
  color: white;
`

export const DangerButton = styled(Button)`
  background: #f44336;
  color: white;

  &:hover:not(:disabled) {
    background: #d32f2f;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

