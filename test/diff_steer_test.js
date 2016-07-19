import test from 'ava';
import diffSteer from '../index';
import INPUTS from './inputs';

test('Full forward', t => {
  t.plan(2);
  const motorSpeeds = diffSteer(...INPUTS.FULL_FWD);
  t.is(motorSpeeds[0], 255);
  t.is(motorSpeeds[1], 255);
});

test('Full reverse', t => {
  t.plan(2);
  const motorSpeeds = diffSteer(...INPUTS.FULL_REV);
  t.is(motorSpeeds[0], -255);
  t.is(motorSpeeds[1], -255);
});

test('Full right', t => {
  t.plan(2);
  const motorSpeeds = diffSteer(...INPUTS.FULL_RIGHT);
  t.is(motorSpeeds[0], 255);
  t.is(motorSpeeds[1], -255);
});

test('Full left', t => {
  t.plan(2);
  const motorSpeeds = diffSteer(...INPUTS.FULL_LEFT);
  t.is(motorSpeeds[0], -255);
  t.is(motorSpeeds[1], 255);
});

test('Forward right', t => {
  t.plan(2);
  const motorSpeeds = diffSteer(...INPUTS.FWD_RIGHT);
  t.is(motorSpeeds[0], 255);
  t.is(motorSpeeds[1], -6.000150000000013);
});

test('Reverse left', t => {
  t.plan(2);
  const motorSpeeds = diffSteer(...INPUTS.REV_LEFT);
  t.is(motorSpeeds[0], -105.88978213646999);
  t.is(motorSpeeds[1], -196.940063931765);
});
