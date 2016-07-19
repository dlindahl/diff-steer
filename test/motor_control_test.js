import INPUTS from './inputs';
import steerMotor from '../motor_control';
import sinon from 'sinon';
import test from 'ava';

test.beforeEach(t => {
  t.context.leftMotor = {
    fwd: sinon.stub(),
    rev: sinon.stub()
  };
  t.context.rightMotor = {
    fwd: sinon.stub(),
    rev: sinon.stub()
  };
  t.context.wheels = [t.context.leftMotor, t.context.rightMotor];
});

test('Full forward', t => {
  const motorCommands = steerMotor(t.context.wheels, ...INPUTS.FULL_FWD);
  t.plan(6);
  t.is(motorCommands[0].direction, 'fwd');
  t.is(motorCommands[0].speed, 255);
  t.true(t.context.leftMotor.fwd.calledWith(255));
  t.is(motorCommands[1].direction, 'fwd');
  t.is(motorCommands[1].speed, 255);
  t.true(t.context.rightMotor.fwd.calledWith(255));
});

test('Full reverse', t => {
  const motorCommands = steerMotor(t.context.wheels, ...INPUTS.FULL_REV);
  t.plan(6);
  t.is(motorCommands[0].direction, 'rev');
  t.is(motorCommands[0].speed, 255);
  t.true(t.context.leftMotor.rev.calledWith(255));
  t.is(motorCommands[1].direction, 'rev');
  t.is(motorCommands[1].speed, 255);
  t.true(t.context.rightMotor.rev.calledWith(255));
});

test('Full right', t => {
  const motorCommands = steerMotor(t.context.wheels, ...INPUTS.FULL_RIGHT);
  t.plan(6);
  t.is(motorCommands[0].direction, 'fwd');
  t.is(motorCommands[0].speed, 255);
  t.true(t.context.leftMotor.fwd.calledWith(255));
  t.is(motorCommands[1].direction, 'rev');
  t.is(motorCommands[1].speed, 255);
  t.true(t.context.rightMotor.rev.calledWith(255));
});

test('Full left', t => {
  const motorCommands = steerMotor(t.context.wheels, ...INPUTS.FULL_LEFT);
  t.plan(6);
  t.is(motorCommands[0].direction, 'rev');
  t.is(motorCommands[0].speed, 255);
  t.true(t.context.leftMotor.rev.calledWith(255));
  t.is(motorCommands[1].direction, 'fwd');
  t.is(motorCommands[1].speed, 255);
  t.true(t.context.rightMotor.fwd.calledWith(255));
});

test('Forward right', t => {
  const motorCommands = steerMotor(t.context.wheels, ...INPUTS.FWD_RIGHT);
  t.plan(6);
  t.is(motorCommands[0].direction, 'fwd');
  t.is(motorCommands[0].speed, 255);
  t.true(t.context.leftMotor.fwd.calledWith(255));
  t.is(motorCommands[1].direction, 'rev');
  t.is(motorCommands[1].speed, 6.000150000000013);
  t.true(t.context.rightMotor.rev.calledWith(6.000150000000013));
});

test('Reverse left', t => {
  const motorCommands = steerMotor(t.context.wheels, ...INPUTS.REV_LEFT);
  t.plan(6);
  t.is(motorCommands[0].direction, 'rev');
  t.is(motorCommands[0].speed, 105.88978213646999);
  t.true(t.context.leftMotor.rev.calledWith(105.88978213646999));
  t.is(motorCommands[1].direction, 'rev');
  t.is(motorCommands[1].speed, 196.940063931765);
  t.true(t.context.rightMotor.rev.calledWith(196.940063931765));
});
