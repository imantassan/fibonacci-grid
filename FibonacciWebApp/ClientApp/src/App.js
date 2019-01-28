import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Matrix from './components/Matrix';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/matrix' component={Matrix} />
  </Layout>
);
