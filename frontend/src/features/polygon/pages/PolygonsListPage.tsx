import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getAllPolygons } from '../../../api/polygon.api'
import {
  Content,
  ErrorState,
  HeaderLeft,
  LoadingState,
  PageContainer,
  PageHeaderLarge,
  PageSubtitle,
  PageTitleLarge,
  PrimaryButtonLarge,
  SecondaryButtonLarge,
} from '../../../shared/components'
import { useSession } from '../../session/hooks/useSession'

const PolygonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`

const PolygonCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: #4caf50;
  }
`

const PolygonName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.2rem;
`

const PolygonInfo = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 8px;
`

const EmptyTitle = styled.h2`
  color: #666;
  margin: 0 0 1rem 0;
`

const EmptyText = styled.p`
  color: #999;
  margin: 0 0 2rem 0;
`

const PolygonsListPage = () => {
  const navigate = useNavigate()
  const { data: session } = useSession()

  const { data: polygons, isLoading, error } = useQuery({
    queryKey: ['polygons'],
    queryFn: getAllPolygons,
    enabled: !!session, // Only fetch when session is available
  })

  const handlePolygonClick = (id: number) => {
    navigate(`/polygon/${id}`)
  }

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeaderLarge>
          <HeaderLeft>
            <PageTitleLarge>My Polygons</PageTitleLarge>
            <PageSubtitle>Loading your polygons...</PageSubtitle>
          </HeaderLeft>
          <SecondaryButtonLarge onClick={() => navigate('/create-polygon')}>
            Create Polygon
          </SecondaryButtonLarge>
        </PageHeaderLarge>
        <Content>
          <LoadingState text="Loading polygons..." />
        </Content>
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer>
        <PageHeaderLarge>
          <HeaderLeft>
            <PageTitleLarge>My Polygons</PageTitleLarge>
            <PageSubtitle>Error loading polygons</PageSubtitle>
          </HeaderLeft>
          <SecondaryButtonLarge onClick={() => navigate('/create-polygon')}>
            Create Polygon
          </SecondaryButtonLarge>
        </PageHeaderLarge>
        <Content>
          <ErrorState>Failed to load polygons. Please try again.</ErrorState>
        </Content>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeaderLarge>
        <HeaderLeft>
          <PageTitleLarge>My Polygons</PageTitleLarge>
          <PageSubtitle>Select a polygon to view it on the canvas</PageSubtitle>
        </HeaderLeft>
        <SecondaryButtonLarge onClick={() => navigate('/create-polygon')}>
          Create Polygon
        </SecondaryButtonLarge>
      </PageHeaderLarge>
      <Content>
        {polygons && polygons.length > 0 ? (
          <PolygonsGrid>
            {polygons.map((polygon) => (
              <PolygonCard
                key={polygon.id}
                onClick={() => handlePolygonClick(polygon.id)}
              >
                <PolygonName>{polygon.name}</PolygonName>
                <PolygonInfo>
                  {polygon.points.length} point{polygon.points.length !== 1 ? 's' : ''}
                </PolygonInfo>
              </PolygonCard>
            ))}
          </PolygonsGrid>
        ) : (
          <EmptyState>
            <EmptyTitle>No polygons yet</EmptyTitle>
            <EmptyText>Create your first polygon to get started</EmptyText>
            <PrimaryButtonLarge onClick={() => navigate('/create-polygon')}>
              Create Polygon
            </PrimaryButtonLarge>
          </EmptyState>
        )}
      </Content>
    </PageContainer>
  )
}

export default PolygonsListPage

