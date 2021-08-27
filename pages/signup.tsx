import React from 'react';
import Head from 'next/head';

import { CenteredBoxForm } from '../components/CenteredBoxForm';

function SignupPage() {
  return (
    <>
      <Head>
        <title>Signup Page</title>
      </Head>

      <CenteredBoxForm>
        <p>Sign Up</p>
      </CenteredBoxForm>
    </>
  );
}

export default SignupPage;
