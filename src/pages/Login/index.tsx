import { Box, Button, Card, InputLabel, styled, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { getStore } from '../../apis/store';
import { storeState } from '../../store/atoms';

export const Wrapper = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const PASSWORD = '1234';

function Login() {
  const setStore = useSetRecoilState(storeState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ id: string; password: string }>();
  const onValid = async (data: { id: string; password: string }) => {
    if (data.password !== PASSWORD) {
      setError('password', { message: '비밀번호가 틀렸습니다.' });
      return;
    }
    const storeData = await getStore(data.id);
    if (storeData) {
      setStore(storeData);
    } else {
      setError('id', { message: '없는 가게 아이디입니다.' });
    }
  };

  return (
    <Wrapper>
      <Card
        component="form"
        onSubmit={handleSubmit(onValid)}
        sx={{ p: 3, width: 360, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h5">로그인</Typography>
        <Box>
          <InputLabel>아이디</InputLabel>
          <TextField
            {...register('id', { required: '아이디를 입력하세요' })}
            fullWidth
            hiddenLabel
            size="small"
            helperText={errors.id?.message}
          />
        </Box>
        <Box>
          <InputLabel>비밀번호</InputLabel>
          <TextField
            {...register('password', { required: '비밀번호를 입력하세요' })}
            fullWidth
            hiddenLabel
            size="small"
            type="password"
            helperText={errors.password?.message}
          />
        </Box>
        <Button variant="contained" sx={{ mt: 2 }} type="submit">
          로그인
        </Button>
      </Card>
    </Wrapper>
  );
}

export default Login;
