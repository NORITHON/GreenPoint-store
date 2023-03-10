import {
  Box,
  Button,
  Typography,
  Modal,
  styled,
  TextField,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { useRecoilValue } from 'recoil';
import { getUserByContact, payment } from '../../apis/pay';
import { storeState } from '../../store/atoms';
import { IPoint, IUser } from '../../types';

declare global {
  interface Window {
    IMP: any;
  }
}

const IMP = window.IMP;
IMP.init(process.env.REACT_APP_IMP);

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  backgroundColor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
  alignItems: 'center',
};

const Card = styled(Box)(({ theme }) => ({
  borderColor: theme.palette.divider,
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  width: '100%',
  height: '100%',
}));

interface IOrderModal {
  price: number;
  reset: () => void;
  pointList: IPoint[];
}

export default function OrderModal({ price, reset, pointList }: IOrderModal) {
  const store = useRecoilValue(storeState);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [userPoint, setUserPoint] = useState(0);
  const [usePoint, setUsePoint] = useState(0);
  const [point, setPoint] = useState(0);
  const [user, setUser] = useState<IUser | null>();
  const [contact, setContact] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClickPay = () => {
    if (!store) return;
    IMP.request_pay(
      {
        pg: 'kakaopay',
        pay_method: 'card',
        merchant_uid: `order_${uuid()}`,
        name: `${store.name} - ??????????????? (????????? ??????)`,
        amount: currentPrice,
        buyer_email: 'iamport@siot.do',
        buyer_name: user?.nickname ?? '?????????',
        buyer_tel: user?.contact ?? '010-1234-5678',
        buyer_addr: '???????????????',
        buyer_postcode: '123-456',
      },
      function (response: any) {
        if (response.success) {
          if (user) {
            payment({
              customerId: user.id,
              storeId: store.id,
              cost: price,
              savedPoint: point,
              usedPoint: usePoint,
            }).then(() => {
              handleClose();
              enqueueSnackbar('????????? ?????????????????????.', { variant: 'success' });
            });
          } else {
            handleClose();
            enqueueSnackbar('????????? ?????????????????????.', { variant: 'success' });
          }
          reset();
        } else {
          var msg = '????????? ?????????????????????.';
          msg += '\n?????? : ' + response.error_msg;

          alert(msg);
        }
      },
    );
  };
  const onClickPointPay = () => {
    if (!user) return;
    if (window.confirm('???????????? ?????????????????????????')) {
      payment({
        customerId: user.id,
        storeId: 1,
        cost: price,
        savedPoint: point,
        usedPoint: usePoint,
      }).then(() => {
        handleClose();
        enqueueSnackbar('????????? ?????????????????????.', { variant: 'success' });
        reset();
      });
    }
  };

  const onChangeContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact(event.currentTarget.value);
  };
  const onClickReadUser = async () => {
    const userData = await getUserByContact(contact);
    if (userData) {
      setUser(userData);
      setUserPoint(userData.point);
    } else {
      enqueueSnackbar('????????? ????????? ??????????????????.', { variant: 'error' });
    }
  };
  const onChangeUsePoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsePoint(+event.currentTarget.value);
  };
  const onClickUseAllPoint = () => {
    setUsePoint(userPoint);
  };
  const onChangePoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoint(+event.currentTarget.value);
  };

  useEffect(() => {
    setContact('');
    setCurrentPrice(price);
    setUser(null);
    setUserPoint(0);
    setUsePoint(0);
    setPoint(0);
  }, [open]);

  useEffect(() => {
    if (price - usePoint < 0) {
      setUsePoint(price);
      setCurrentPrice(0);
    }
    setCurrentPrice(price - usePoint);
  }, [usePoint]);

  return (
    <div>
      <Button fullWidth variant="contained" onClick={handleOpen} disabled={!price}>
        ?????? ??????
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5" component="h2">
            ?????????
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, width: 1, height: 1 }}>
            <Card>
              <Typography variant="h6" gutterBottom>
                ????????? ??????
              </Typography>
              <InputLabel>???????????? ??????</InputLabel>
              <TextField
                type="number"
                name="contact"
                hiddenLabel
                size="small"
                fullWidth
                value={contact}
                onChange={onChangeContact}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  color="info"
                  disabled={!contact.length}
                  onClick={onClickReadUser}
                >
                  ????????? ??????
                </Button>
              </Box>
              <InputLabel>
                {user ? (
                  <Typography
                    sx={{ fontWeight: 500, display: 'inline', color: 'text.primary' }}
                  >{`${user.nickname}???`}</Typography>
                ) : (
                  '?????????'
                )}
                ??? ?????????
              </InputLabel>
              <TextField
                type="number"
                name="point"
                hiddenLabel
                size="small"
                value={userPoint}
                InputProps={{ readOnly: true }}
                fullWidth
              />
              <InputLabel sx={{ mt: 1 }}>????????? ?????????</InputLabel>
              <TextField
                type="number"
                name="usePoint"
                hiddenLabel
                size="small"
                inputProps={{ min: 0, max: Math.min(userPoint, currentPrice) }}
                fullWidth
                value={Number(usePoint).toString()}
                onChange={onChangeUsePoint}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  disabled={userPoint < 1}
                  onClick={onClickUseAllPoint}
                >
                  ?????? ??????
                </Button>
              </Box>
            </Card>
            <Card>
              <Typography variant="h6" gutterBottom>
                ????????? ??????
              </Typography>
              <FormControl disabled={!user} sx={{ height: 200, overflow: 'auto', px: 1 }}>
                <FormLabel>????????? ?????????</FormLabel>
                <RadioGroup row value={point} onChange={onChangePoint}>
                  {store &&
                    pointList
                      .filter((item) => item.storeId === store.id)
                      .map((point) => (
                        <FormControlLabel
                          key={point.id}
                          value={point.weight}
                          control={<Radio />}
                          label={`${point.name} (${point.weight})`}
                        />
                      ))}
                  <FormControlLabel value={0} control={<Radio />} label="??????" />
                </RadioGroup>
              </FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {currentPrice ? (
                  <Button variant="contained" onClick={onClickPay}>
                    {currentPrice.toLocaleString('ko-KR')}??? ??????
                  </Button>
                ) : (
                  <Button variant="contained" onClick={onClickPointPay}>
                    ???????????? ??????
                  </Button>
                )}
              </Box>
            </Card>
          </Box>
          <Box
            sx={{
              mt: 'auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 1,
            }}
          >
            <Typography>?????? ??????: {currentPrice.toLocaleString('ko-KR')}???</Typography>
            <Button size="small" variant="contained" onClick={handleClose} disabled={price > 0}>
              ?????????
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
