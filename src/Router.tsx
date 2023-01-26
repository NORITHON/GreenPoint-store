import { Container as MuiContainer, styled } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';

export const Container = styled(MuiContainer)(({ theme }) => ({
  paddingTop: (theme.mixins.toolbar.minHeight as number) * 2,
  minHeight: `calc(100vh - 154px)`,
}));

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Router;
