import { Box, Button, Typography, Modal, styled, TextField, InputLabel } from '@mui/material';
import { useState } from 'react';

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
}

export default function OrderModal({ price }: IOrderModal) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button fullWidth variant="contained" onClick={handleOpen}>
        주문 하기
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h5" component="h2">
            결제창
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, width: 1, height: 1 }}>
            <Card>
              <Typography variant="h6" gutterBottom>
                포인트 사용
              </Typography>
              <InputLabel>전화번호 입력</InputLabel>
              <TextField name="contact" hiddenLabel size="small" />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 1 }}>
                <Button size="small" variant="contained" color="info">
                  사용자 조회
                </Button>
              </Box>
              <InputLabel>사용자의 포인트</InputLabel>
              <TextField name="contact" hiddenLabel size="small" InputProps={{ readOnly: true }} />
              <InputLabel sx={{ mt: 1 }}>차감할 포인트</InputLabel>
              <TextField name="contact" hiddenLabel size="small" />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 1 }}>
                <Button size="small" variant="contained" color="error">
                  포인트 차감
                </Button>
              </Box>
            </Card>
            <Card>
              <Typography variant="h6" gutterBottom>
                온라인 결제
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button variant="contained">남은 금액 결제</Button>
              </Box>
              QR
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
            <Typography>남은 금액: {price.toLocaleString('ko-KR')}원</Typography>
            <Button size="small" variant="contained" onClick={handleClose} disabled={price > 0}>
              나가기
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
