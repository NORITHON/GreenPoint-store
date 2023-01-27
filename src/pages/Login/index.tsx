import { Box, Button, Card, InputLabel, styled, TextField, Typography } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

function Login() {
  return (
    <Wrapper>
      <Card
        component="form"
        sx={{ p: 3, width: 360, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h5">로그인</Typography>
        <Box>
          <InputLabel>이메일</InputLabel>
          <TextField fullWidth hiddenLabel size="small" />
        </Box>
        <Box>
          <InputLabel>비밀번호</InputLabel>
          <TextField fullWidth hiddenLabel size="small" type="password" />
        </Box>
        <Button variant="contained" sx={{ mt: 2 }} type="submit">
          로그인
        </Button>
      </Card>
    </Wrapper>
  );
}

export default Login;
