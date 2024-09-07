import { BlazeCreator } from '@busy-hour/blaze';
import { onSignInUser } from './actions/signin.auth';
import { onSignUpUser } from './actions/signup.auth';

const service = BlazeCreator.service({
  name: 'auth',
  tags: ['Auth'],
  actions: {
    // Public
    signIn: onSignInUser,
    signUp: onSignUpUser,
  },
});

export default service;
