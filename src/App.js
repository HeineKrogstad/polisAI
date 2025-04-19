import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import TravelInsurance from './pages/TravelInsurance/TravelInsurance';
import MortgageInsurance from './pages/MortgageInsurance/MortgageInsurance';
import PropertyInsurance from './pages/PropertyInsurance/PropertyInsurance';
import AcarusInsurance from './pages/AcarusInsurance/AcarusInsurance';
import SportInsurance from './pages/SportInsurance/SportInsurance';
import OSAGO from './pages/OSAGO/OSAGO';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mortgage" element={<MortgageInsurance />} />
          <Route path="travel" element={<TravelInsurance />} />
          <Route path="property" element={<PropertyInsurance />} />
          <Route path="acarus" element={<AcarusInsurance />} />
          <Route path="sport" element={<SportInsurance />} />
          <Route path="osago" element={<OSAGO />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;