import { BlazeCreator } from '@busy-hour/blaze';
import { $onHashText } from './actions/$hash-text.core';
import { $onCompareText } from './actions/$compare-text.core';
import { $onVerifyJwt } from './actions/$verify-jwt.core';
import { $onSignJwt } from './actions/$sign-jwt.core';

const service = BlazeCreator.service({
  name: 'core',
  actions: {
    $hashText: $onHashText,
    $compareText: $onCompareText,
    $verifyJwt: $onVerifyJwt,
    $signJwt: $onSignJwt,
  },
});

export default service;
