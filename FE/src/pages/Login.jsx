import React from 'react';

import { Flex } from '@chakra-ui/react';
import Welcome from '../components/Welcome/Welcome';
import AuthIN from '../components/AUTHIN/Signin';

function Login() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <AuthIN />
      </div>
    </>
  );
}

export default Login;
