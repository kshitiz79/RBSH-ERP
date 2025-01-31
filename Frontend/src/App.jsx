

import './App.css'
import DirectorDashboardLayout from './components/DirectorDashboardLayout'
import EmployeDashboardLayout from './components/EmployeDashboardLayout'
import InternDashboardLayout from './components/InternDashboardLayout'
import Auth from './pages/Auth/Auth'

function App() {
 

  return (
    <>




<Auth/>


 <DirectorDashboardLayout/>
 
<EmployeDashboardLayout/> 

<InternDashboardLayout/>
    </>
  )
}

export default App
