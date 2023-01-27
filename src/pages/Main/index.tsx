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
import { useState } from 'react';
import { IMenu } from '../../types';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import OrderModal from './OrderModal';

const menus = [
  {
    id: 0,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220426_184%2F1650960521204tT4oq_JPEG%2F314Yul1Ov1PVpPxJRXPrONERyJok9pYZPq7-BJdkXLE%253D.jpg',
    price: 4000,
    name: '아메리카노',
  },
  {
    id: 1,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220107_26%2F1641531835060Lfau0_JPEG%2FatROYaw78yEMZTNhKzI2MwKnAANqx7Xp-p2yg4-Ysc0YH7O0tosWn9k5ETCIojqWYXn_FJI5XsiZ5wqG.jpg',
    price: 4500,
    name: '카페라떼',
  },
  {
    id: 2,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220112_138%2F1641967956734Vtbi0_JPEG%2FDzjdUrkWY272WObu_ANDXE9gfmDCFksmEOS5wNIg7uB4976jgJQA9FGf6XwwGtK1nYUDZ9JBKecMEIp_.jpg',
    price: 4500,
    name: '바닐라라떼',
  },
  {
    id: 3,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_14%2F1641882555324XvtES_JPEG%2FpI9nwm4yYkcmuQArqPC4l5gXKsSURL1DoQLjBjebJhI%253D.jpg',
    price: 5000,
    name: '헤이즐넛라떼',
  },
  {
    id: 4,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220107_51%2F1641531834988OryKU_JPEG%2FzaTR4pTcw-WggRb0_0Rzf9lhreJ7x1GMFfFQJmVdN2bMdMuYoGe5UyxiYHWORZj-lt2w_UE6LQZFClud.jpg',
    price: 5000,
    name: '카라멜마끼야또',
  },
  {
    id: 5,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_222%2F1641862115504ISTKj_JPEG%2Fs_kgz0oFMm09-TVkeyoTR0wbK57Nr7Wlmt5VCRzX9NE%253D.jpg',
    price: 5500,
    name: '유기농 아이스크림',
  },
  {
    id: 6,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_207%2F16418624654009Bsa3_JPEG%2FXFEBWQvN8HHch2-cq8al6nCjEpGjApyetdLniwKFOXQ%253D.jpg',
    price: 6500,
    name: '구름아이스커피',
  },
  {
    id: 7,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_6%2F1641862551851otCEo_JPEG%2F32QYKg91laXuRLC2bJ2X6_4QhFKHfbkJMZlRyv6jQrE%253D.jpg',
    price: 6500,
    name: '에쏘 아포카토',
  },
  {
    id: 8,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_213%2F1641862679060tkpfR_JPEG%2FW5fnIuQ3EJvrgJtMi_GHtt8KQXI5jaqyJZwxdppft2k%253D.jpg',
    price: 6500,
    name: '헤즐넛 아포카토',
  },
  {
    id: 9,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_251%2F1641863055452Omjft_JPEG%2FSiaOXReEMeyZdRDTuuAIRJrEFTgE_IcEIe5UQMxcGMg%253D.jpg',
    price: 6500,
    name: '더치 아포카토',
  },
  {
    id: 10,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_238%2F1641863696858txN4A_JPEG%2Fr7EtBSGsm0MR7CniYno7TDBNOKSNw4TFylzbZ2eSqzY%253D.jpg',
    price: 4000,
    name: '복숭아아이스티',
  },
  {
    id: 11,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_77%2F1641863712954sBIxP_JPEG%2FOWoEyTVPvBs-N48hwCsRZpKRfTFulydkPBy0nPUpy_E%253D.jpg',
    price: 4000,
    name: '페퍼민트',
  },
  {
    id: 12,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_82%2F1641863793777q1ITX_JPEG%2FeK1b5bcTsjc4YHIsV8TyFVJ_ZK9CeVooR4nxljSBvTg%253D.jpg',
    price: 4000,
    name: '캐모마일',
  },
  {
    id: 13,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_232%2F1641863793780bSxST_JPEG%2F2rI3tvYMTIjcO8a_yEEQlR9Pf___QIqm2-CBK8ZCDWw%253D.jpg',
    price: 4000,
    name: '루이보스',
  },
  {
    id: 14,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_47%2F1641881523309g4rIP_JPEG%2FbyqMoFgyiCxWK4afED63F4SmTyabVAudKbYgo61BkDs%253D.jpg',
    price: 3500,
    name: '초코쿠키',
  },
  {
    id: 15,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_195%2F1641881609413mi7ta_JPEG%2FdTXpn4A3IKRw2rwW7gDaNTKAQRyPljFizqC9LAjzJPw%253D.jpg',
    price: 3500,
    name: '치즈쿠키',
  },
  {
    id: 16,
    image:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220111_258%2F1641881740270RRwr9_JPEG%2Fuqg7jW9bu_Smq8OOxjF0-LWS5aXQQAf6QDvcTUh8eJo%253D.jpg',
    price: 3500,
    name: '촉촉쿠키',
  },
];

const Item = styled(Card)({
  userSelect: 'none',
  ':hover': {
    transform: 'scale(1.02)',
    cursor: 'pointer',
  },
});

function Main() {
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
            <OrderModal price={totalPrice} />
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default Main;
