import { useEffect, useState } from 'react'
import { Stage, Layer, Image, Line, Circle, Text } from 'react-konva'
import styled from 'styled-components'
import { Loader, ErrorState } from '../../../shared/components'

export const CANVAS_WIDTH = 1920
export const CANVAS_HEIGHT = 1080
export const SCALE = 0.5 // Scale down for display

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: auto;
`

export interface CanvasContainerProps {
  points: [number, number][]
  mode?: 'create' | 'view'
  onStageClick?: (x: number, y: number) => void
  loading?: boolean
  error?: string | null
}

export const CanvasContainer = ({
  points,
  mode = 'view',
  onStageClick,
  loading = false,
  error = null,
}: CanvasContainerProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [imageError, setImageError] = useState(false)

  // Load background image
  useEffect(() => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.src = 'https://picsum.photos/1920/1080'
    img.onload = () => {
      setImage(img)
      setImageError(false)
    }
    img.onerror = () => {
      setImageError(true)
    }
  }, [])

  const handleStageClick = (e: any) => {
    if (!onStageClick || !image) return

    const stage = e.target.getStage()
    const pointerPos = stage.getPointerPosition()

    if (!pointerPos) return

    // Convert screen coordinates to canvas coordinates
    const x = pointerPos.x / SCALE
    const y = pointerPos.y / SCALE

    onStageClick(x, y)
  }

  if (loading) {
    return (
      <Container>
        <Loader text="Loading polygon..." />
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <ErrorState>{error}</ErrorState>
      </Container>
    )
  }

  if (imageError) {
    return (
      <Container>
        <ErrorState>Failed to load background image</ErrorState>
      </Container>
    )
  }

  return (
    <Container>
      {image && (
        <Stage
          width={CANVAS_WIDTH * SCALE}
          height={CANVAS_HEIGHT * SCALE}
          onClick={mode === 'create' ? handleStageClick : undefined}
          style={{
            cursor: mode === 'create' ? 'crosshair' : 'default',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <Layer>
            {/* Background Image */}
            <Image
              image={image}
              width={CANVAS_WIDTH * SCALE}
              height={CANVAS_HEIGHT * SCALE}
            />

            {/* Polygon Line */}
            {points.length > 1 && (
              <Line
                points={points.flat().map((p) => p * SCALE)}
                stroke="#4caf50"
                strokeWidth={2}
                closed={mode === 'view'}
                dash={mode === 'create' ? [5, 5] : undefined}
              />
            )}

            {/* Points */}
            {points.map(([x, y], index) => (
              <Circle
                key={index}
                x={x * SCALE}
                y={y * SCALE}
                radius={5}
                fill="#4caf50"
                stroke="#fff"
                strokeWidth={2}
              />
            ))}

            {/* Point Labels */}
            {points.map(([x, y], index) => (
              <Text
                key={`label-${index}`}
                x={x * SCALE + 10}
                y={y * SCALE - 10}
                text={`${index + 1}`}
                fontSize={14}
                fontStyle="bold"
                padding={4}
                fillEnabled={true}
                fill="rgba(255,255,255,0.8)"
              />
            ))}
          </Layer>
        </Stage>
      )}
    </Container>
  )
}

