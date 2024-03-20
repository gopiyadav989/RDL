import { BrowserRouter, Routes, Route} from 'react-router-dom';

import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Navbar from './components/Navbar';

import Dashboard from './vpages/Dashboard'
import Catalog from './vpages/Catalog'
import Contactus from './vpages/Contactus'
import Logout from './vpages/Logout'
import NavbarVreti from './components/NavbarVerti'

import Create from './components/Create/Create';

import { useSelector } from 'react-redux';
import Listing from './pages/Listing';
import Preview from './pages/Preview';
import Profile from './pages/Profile';
import About from './vpages/About';

export default function App() {

  const { currentSeller } = useSelector(state => state.seller);

  return (
      
      <BrowserRouter>
      {currentSeller ? < NavbarVreti/> : <Navbar/>}
      {/* <NavbarVreti /> */}

      <Routes>
        <Route path='/sign-in' element={<SignIn/>}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route path='/create' element={<Create/>}></Route>
        
        <Route path='/' element={currentSeller ? <Dashboard /> : <Home />} />

        <Route path='/preview/:id' element={<Preview/>}/>
        <Route path='/listing/:listingId' element={<Listing/>}></Route>
        <Route path='/catalog' element={<Catalog />} />

        <Route path='/contact' element={<Contactus />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/logout' element={<Logout />} />

        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      </BrowserRouter>
  );
}
