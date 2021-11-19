import session from 'express-session';
import Layout from '../components/layout';
import LoginForm from './views/login/loginForm';
export async function getServerSideProps({ req, res }) {
  // Get the user's session based on the request
  const user = session['user'] || null;

  if (user && user.role === 'coach') {
    return {
      redirect: {
        destination: '/welcomeCoach',
        permanent: false,
      },
    }
  } else if (user && user.role === 'teammate') {
    return {
      redirect: {
        destination: '/welcomeTeammate',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
}
const Login = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  )
}
export default Login;