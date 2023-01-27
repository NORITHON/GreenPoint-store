import { Container as MuiContainer, styled } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Header from './components/Header';
import Login from './pages/Login';
import Main from './pages/Main';
import Menu from './pages/Menu';
import { storeState } from './store/atoms';

export const Container = styled(MuiContainer)(({ theme }) => ({
  paddingTop: (theme.mixins.toolbar.minHeight as number) * 2,
  height: `calc(100vh - ${theme.mixins.toolbar.minHeight as number}px)`,
}));

function Router() {
  const store = useRecoilValue(storeState);
  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="xl">
        <Routes>
          {store ? (
            <>
              <Route path="/" element={<Main />} />
              <Route path="/menu" element={<Menu />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Router;
