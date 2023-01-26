import Header from './components/Header';
import Router from './Router';
import ThemeProvider from './theme';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Router />
    </ThemeProvider>
  );
}

export default App;
