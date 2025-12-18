import React from 'react';
import './App.css';
import Main from './pages/MainLayout.tsx'
import SignIn from './pages/SignInLayout.tsx';
import {Routes,Route} from 'react-router-dom';
import { UserProvider } from './providers/UserProvider.tsx';

function App() {
  return (
    <div className='App'>
      <UserProvider>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/main" element={<Main/>}/>
      </Routes>
    </UserProvider>
    </div>
  );
}

export default App;
