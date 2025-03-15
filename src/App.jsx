import React from 'react';
import AuthProvider from './context/AuthContext';
import ThemeController from "./styles/themes/ThemeController";
import './styles/App.css';
import Master from './pages/Master';

const App = () => {
  return (
    <AuthProvider>
      <ThemeController>
        <Master />
      </ThemeController>
    </AuthProvider>
  );
};

export default App;
