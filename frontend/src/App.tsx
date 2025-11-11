import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CreatePolygonPage from './features/polygon/pages/CreatePolygonPage'
import PolygonsListPage from './features/polygon/pages/PolygonsListPage'
import ViewPolygonPage from './features/polygon/pages/ViewPolygonPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/polygons" replace />} />
        <Route path="/polygons" element={<PolygonsListPage />} />
        <Route path="/create-polygon" element={<CreatePolygonPage />} />
        <Route path="/polygon/:id" element={<ViewPolygonPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

