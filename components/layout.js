import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import session from 'express-session';

import Head from 'next/head'
import axios from 'axios';

const Layout = ({ children }) => {
  async function logout() {
    await axios.post('/api/user/logout')
  }

  return (
    <div className="container">
      <Head>
        <title>Weightroom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <a href='#' onClick={logout}>Logout</a>
        {children}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          justify-content: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          justify-content: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
export default Layout;