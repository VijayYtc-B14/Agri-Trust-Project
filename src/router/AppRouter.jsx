import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RoleSelection from '../components/RoleSelection'
import FarmerLogin from '../components/FarmerLogin'
import FarmerRegister from '../components/FarmerRegister'
import RetailerLogin from '../components/RetailerLogin'
import RetailerRegister from '../components/RetailerRegister'
import FarmerDashboard from '../components/FarmerDashboard'
import RetailerDashboard from '../components/RetailerDashboard'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/farmer-register" element={<FarmerRegister />} />
        <Route path="/retailer-login" element={<RetailerLogin />} />
        <Route path="/retailer-register" element={<RetailerRegister />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
      </Routes>
    </Router>
  )
}

export default AppRouter