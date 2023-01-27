import { Container as MuiContainer, styled } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Main from './pages/Main';

export const Container = styled(MuiContainer)(({ theme }) => ({
  paddingTop: (theme.mixins.toolbar.minHeight as number) * 2,
  height: `calc(100vh - ${theme.mixins.toolbar.minHeight as number}px)`,
}));

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Router;
