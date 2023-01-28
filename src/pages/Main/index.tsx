import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { IMenu } from '../../types';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import OrderModal from './OrderModal';
import { getMenus } from '../../apis/store';
import { useRecoilValue } from 'recoil';
import { storeState } from '../../store/atoms';

const Item = styled(Card)({
  userSelect: 'none',
  ':hover': {
    transform: 'scale(1.02)',
    cursor: 'pointer',
  },
});

function Main() {
  const store = useRecoilValue(storeState);
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [count, setCount] = useState<number[]>([]);
  const [selectMenuList, setSelectMenuList] = useState<IMenu[]>([]);
  const handleAddMenu = (menu: IMenu) => {
    let flag = false;
    selectMenuList.forEach((item, index) => {
      if (item.id === menu.id) {
        flag = true;
        setCount((old) => {
          let newCount = [...old];
          newCount[index]++;
          return newCount;
        });
      }
    });
    if (flag) return;
    setCount((old) => [...old, 1]);
    setSelectMenuList((old) => [...old, menu]);
  };
  const handleDeleteMenu = (index: number) => {
    setCount((old) => old.filter((_, i) => index !== i));
    setSelectMenuList((old) => old.filter((_, i) => index !== i));
  };
  const handleClickReset = () => {
    setCount([]);
    setSelectMenuList([]);
  };

  const getTotalPrice = () => {
    let result = 0;
    selectMenuList.forEach((item, index) => {
      result += item.price * count[index];
    });
    return result;
  };
  const totalPrice = getTotalPrice();

  useEffect(() => {
    const loadData = async () => {
      if (!store) return;
      const menuData = await getMenus(store.id);
      if (!menuData) return;
      setMenus(menuData);
    };
    loadData();
  }, []);

  return (
    <Box sx={{ display: 'flex', gap: 2, height: 1 }}>
      <Box sx={{ flexGrow: 1, height: 1, p: 3, pt: 0, overflow: 'auto' }}>
        <Typography variant="h5" sx={{ p: 2 }}>
          메뉴 리스트
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {menus.map((menu) => (
            <Grid item xs={4} md={3} lg={2} key={menu.id}>
              <Item onClick={() => handleAddMenu(menu)}>
                <Box component="img" alt={menu.name} src={menu.image} />
                <Box sx={{ p: 2, pb: 3 }}>
                  <Typography color="text.secondary" fontWeight={600}>
                    {menu.name}
                  </Typography>
                  <Typography color="secondary.main" fontWeight={600}>
                    {menu.price.toLocaleString('ko-KR')}원
                  </Typography>
                </Box>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ minWidth: 280, height: 1 }}>
        <Card sx={{ width: 1, height: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">담은 메뉴</Typography>
            <IconButton edge="end" onClick={handleClickReset} size="small">
              <RestartAltIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider />
          <List sx={{ flexGrow: 1, overflow: 'auto' }}>
            {selectMenuList?.map((menu, index) => (
              <ListItem
                key={menu.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteMenu(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={menu.name} src={menu.image} variant="rounded" />
                </ListItemAvatar>
                <ListItemText
                  primary={`${menu.name} ${count[index] < 2 ? '' : `× ${count[index]}`}`}
                  secondary={`${(menu.price * count[index]).toLocaleString('ko-KR')}원`}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography
              variant="h6"
              sx={{ display: 'flex', justifyContent: 'space-evenly' }}
              gutterBottom
            >
              <span>총:</span>
              <span>{totalPrice.toLocaleString('ko-KR')}원</span>
            </Typography>
            <OrderModal price={totalPrice} reset={handleClickReset} />
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default Main;
