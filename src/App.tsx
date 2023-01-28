import { Backdrop, CircularProgress } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getStore } from './apis/store';
import Router from './Router';
import { storeState } from './store/atoms';
import ThemeProvider from './theme';

function App() {
  const [init, setInit] = useState(false);
  const setStore = useSetRecoilState(storeState);
  useEffect(() => {
    const loadStore = async () => {
      const storeId = localStorage.getItem('storeId');
      if (storeId) {
        const storeData = await getStore(storeId);
        setStore(storeData);
        setInit(true);
      } else {
        setInit(true);
      }
    };
    loadStore();
  }, []);

  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <Router />
        {init ? (
          <Router />
        ) : (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
