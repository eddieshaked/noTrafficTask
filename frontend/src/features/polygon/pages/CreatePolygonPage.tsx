import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { createPolygon, CreatePolygonDto } from '../../../api/polygon.api'
import {
    Button,
    Controls,
    DangerButton,
    FullHeightPageContainer,
    InfoText,
    Input,
    PageHeader,
    PageTitle,
    PrimaryButton,
    SecondaryButton,
} from '../../../shared/components'
import { CanvasContainer } from '../components/CanvasContainer'

const CreatePolygonPage = () => {
    const [points, setPoints] = useState<[number, number][]>([])
    const [polygonName, setPolygonName] = useState('')
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: (data: CreatePolygonDto) => createPolygon(data),
        onSuccess: () => {
            queryClient.invalidateQueries('polygons')
            navigate('/polygons')
        },
    })

    const handleStageClick = (x: number, y: number) => {
        // Add point
        setPoints([...points, [x, y]])
    }

    const handleSave = () => {
        if (points.length < 3) {
            alert('A polygon must have at least 3 points')
            return
        }

        if (!polygonName.trim()) {
            alert('Please enter a polygon name')
            return
        }

        createMutation.mutate({
            name: polygonName,
            points,
        })
    }

    const handleClear = () => {
        setPoints([])
        setPolygonName('')
    }

    const handleUndo = () => {
        if (points.length > 0) {
            setPoints(points.slice(0, -1))
        }
    }

    return (
        <FullHeightPageContainer>
            <PageHeader>
                <div>
                    <PageTitle>Create Polygon</PageTitle>
                    <InfoText>
                        Click on the canvas to add points. You need at least 3 points to create a polygon.
                    </InfoText>
                </div>
            </PageHeader>

            <CanvasContainer
                points={points}
                mode="create"
                onStageClick={handleStageClick}
            />

            <Controls>
                <Input
                    type="text"
                    placeholder="Enter polygon name..."
                    value={polygonName}
                    onChange={(e) => setPolygonName(e.target.value)}
                />
                <InfoText>Points: {points.length}</InfoText>
                <Button onClick={handleUndo} disabled={points.length === 0}>
                    Undo Last Point
                </Button>
                <DangerButton onClick={handleClear} disabled={points.length === 0}>
                    Clear All
                </DangerButton>
                <PrimaryButton
                    onClick={handleSave}
                    disabled={points.length < 3 || !polygonName.trim() || createMutation.isLoading}
                >
                    {createMutation.isLoading ? 'Saving...' : 'Save Polygon'}
                </PrimaryButton>
                <SecondaryButton onClick={() => navigate('/polygons')}>Back to List</SecondaryButton>
            </Controls>
        </FullHeightPageContainer>
    )
}

export default CreatePolygonPage

