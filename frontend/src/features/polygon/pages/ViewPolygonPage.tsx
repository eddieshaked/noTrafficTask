import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePolygon, getPolygonById } from '../../../api/polygon.api'
import {
  ButtonGroup,
  DangerButton,
  FullHeightPageContainer,
  PageHeader,
  PageTitle,
  SecondaryButton,
} from '../../../shared/components'
import { CanvasContainer } from '../components/CanvasContainer'

const ViewPolygonPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const polygonId = Number(id)

  const { data: polygon, isLoading, error } = useQuery({
    queryKey: ['polygon', id],
    queryFn: () => getPolygonById(polygonId),
    enabled: !!id,
  })

  const deleteMutation = useMutation({
    mutationFn: () => deletePolygon(polygonId),
    onSuccess: () => {
      queryClient.invalidateQueries('polygons')
      queryClient.invalidateQueries(['polygon', id])
      navigate('/polygons')
    },
  })

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${polygon?.name}"?`)) {
      deleteMutation.mutate()
    }
  }

  if (isLoading) {
    return (
      <FullHeightPageContainer>
        <PageHeader>
          <PageTitle>View Polygon</PageTitle>
          <ButtonGroup>
            <SecondaryButton onClick={() => navigate('/polygons')}>Back to List</SecondaryButton>
          </ButtonGroup>
        </PageHeader>
        <CanvasContainer
          points={[]}
          mode="view"
          loading={true}
        />
      </FullHeightPageContainer>
    )
  }

  if (error || !polygon) {
    return (
      <FullHeightPageContainer>
        <PageHeader>
          <PageTitle>View Polygon</PageTitle>
          <ButtonGroup>
            <SecondaryButton onClick={() => navigate('/polygons')}>Back to List</SecondaryButton>
          </ButtonGroup>
        </PageHeader>
        <CanvasContainer
          points={[]}
          mode="view"
          error="Polygon not found"
        />
      </FullHeightPageContainer>
    )
  }

  return (
    <FullHeightPageContainer>
      <PageHeader>
        <PageTitle>Polygon: {polygon.name}</PageTitle>
        <ButtonGroup>
          <SecondaryButton onClick={() => navigate('/polygons')}>Back to List</SecondaryButton>
          <DangerButton 
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
          </DangerButton>
        </ButtonGroup>
      </PageHeader>

      <CanvasContainer
        points={polygon.points}
        mode="view"
      />
    </FullHeightPageContainer>
  )
}

export default ViewPolygonPage

