import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Matrix from './components/Matrix';

export default () => (
  <Layout>
    <Route exact path='/' component={Matrix} />
  </Layout>
);
