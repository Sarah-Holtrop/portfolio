import React from 'react';
import Coach from './views/coach'
import Layout from '../components/layout';
import session from 'express-session';
import state from './views/coach/state';

export async function getServerSideProps({ req, res }) {
  const user = session['user'] || null;
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
}

const WelcomeCoach = () => {
  return (
    <Layout>
      <Coach />
    </Layout>
  )
}

export default WelcomeCoach;