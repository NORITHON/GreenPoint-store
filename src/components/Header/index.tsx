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
} from '@mui/material';
import { useState } from 'react';
import ThemeModeToggle from './ThemeModeToggle';
import logo from '../../assets/logo.png';
import logo_text from '../../assets/logo_text.svg';
import { useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
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
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ width: 8 }} />
          <ThemeModeToggle />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
