import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './Components/Authentication/PrivateRoute';
import NotFound from './Components/Common/NotFound';
import AuthProvider from './context/AuthProvider/AuthProvider';
import Home from './Pages/Home';
import Login from './Pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;