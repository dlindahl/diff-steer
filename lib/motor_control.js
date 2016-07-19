var diffSteer = require('./diff_steer');

function explicate(motorSpeed) {
  var motorDirection = motorSpeed < 0 ? motorControl.revMethod : motorControl.fwdMethod;
  return [motorDirection, Math.abs(motorSpeed)];
}

function motorControl(wheels, leftRightAxis, upDownAxis, maxAxis, minAxis, maxSpeed, axisFlip) {
  var leftMotor;
  var leftMotorDirection;
  var leftMotorSpeed = 0;
  var motorSpeeds;
  var rightMotor;
  var rightMotorDirection;
  var rightMotorSpeed = 0;

  // Map differential steering values to motor commands
  motorSpeeds = diffSteer(leftRightAxis, upDownAxis, maxAxis, minAxis, maxSpeed, axisFlip);
  leftMotor = explicate(motorSpeeds[0]);
  leftMotorDirection = leftMotor[0];
  leftMotorSpeed = leftMotor[1];
  rightMotor = explicate(motorSpeeds[1]);
  rightMotorDirection = rightMotor[0];
  rightMotorSpeed = rightMotor[1];

  if(wheels) {
    wheels[0][leftMotorDirection](leftMotorSpeed);
    wheels[1][rightMotorDirection](rightMotorSpeed);
  }

  return [
    {
      direction: leftMotorDirection,
      speed: leftMotorSpeed
    },
    {
      direction: rightMotorDirection,
      speed: rightMotorSpeed
    }
  ];
}
motorControl.fwdMethod = 'fwd';
motorControl.revMethod = 'rev';

module.exports = motorControl;
