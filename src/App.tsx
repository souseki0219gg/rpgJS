import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from 'styles/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from 'pages/IndexPage';
import GamePage from 'pages/GamePage';
import NotFound from 'pages/NotFound';
import { pageRoutes } from 'constants/routes';


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={pageRoutes.top} element={<IndexPage />} />
        <Route path={pageRoutes.game} element={<GamePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <AppRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;
