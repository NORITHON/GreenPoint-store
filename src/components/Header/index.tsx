import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import ThemeModeToggle from './ThemeModeToggle';
import logo from '../../assets/logo.png';
import logo_text from '../../assets/logo_text.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { storeState } from '../../store/atoms';

function Header() {
  const [store, setStore] = useRecoilState(storeState);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        boxShadow: 0,
        backgroundColor: 'backgroud.paper',
        color: 'primary.main',
      }}
      enableColorOnDark
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            alt="logo"
            src={logo}
            sx={{ mr: 2, width: 32 }}
            onClick={() => navigate('/')}
          />
          <Box
            component="img"
            alt="logo_text"
            src={logo_text}
            sx={{ height: 24 }}
            onClick={() => navigate('/')}
          />
          <Box sx={{ flexGrow: 1 }} />
          {store && (
            <Box>
              <Tooltip title={store.name}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={store.name} src={store.image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem disableTouchRipple disableRipple>
                  <Typography textAlign="center">{store.name} 사장님, 반갑습니다 👋</Typography>
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    navigate('/menu');
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">메뉴 관리</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    if (window.confirm('로그아웃 하시겠습니까?')) {
                      setStore(null);
                    }
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">로그아웃</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          <Box sx={{ width: 8 }} />
          <ThemeModeToggle />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
