var clamp = require('lodash.clamp');

// Ported from: http://www.codeproject.com/Tips/879300/Differential-Drive-Control-Algorithm
// Added axisFlip to handle changing behavior of up/down Y-axis
function diffSteer(leftRightAxis, upDownAxis, maxAxis, minAxis, maxSpeed, axisFlip) {
  var direction = 0;
  var leftMotorNoThrottleScale = 0;
  var leftMotorOutput = 0;
  var leftMotorScale = 0;
  var rightMotorNoThrottleTurnScale = 0;
  var rightMotorOutput = 0;
  var rightMotorScale = 0;
  var throttle;
  if(typeof axisFlip == 'undefined') {
    axisFlip = diffSteer.axisFlip;
  }
  if(typeof maxAxis == 'undefined') {
    maxAxis = diffSteer.maxAxis;
  }
  if(typeof minAxis == 'undefined') {
    minAxis = diffSteer.minAxis;
  }
  if(typeof maxSpeed == 'undefined') {
    maxSpeed = diffSteer.maxSpeed;
  }

  // Calculate Throttled Steering Motor values
  direction = leftRightAxis / maxAxis;

  // Turn with with throttle
  leftMotorScale = upDownAxis * (1 + direction);
  leftMotorScale = clamp(leftMotorScale, minAxis, maxAxis); // Govern Axis to Minimum and Maximum range
  rightMotorScale = upDownAxis * (1 - direction);
  rightMotorScale = clamp(rightMotorScale, minAxis, maxAxis); // Govern Axis to Minimum and Maximum range

  // Calculate No Throttle Steering Motors values (Turn with little to no throttle)
  throttle = 1 - Math.abs(upDownAxis / maxAxis); // Throttle inverse magnitude (1 = min, 0 = max)
  leftMotorNoThrottleScale = -leftRightAxis * throttle;
  rightMotorNoThrottleTurnScale = leftRightAxis * throttle;

  // Calculate final motor output values
  leftMotorOutput = (leftMotorScale + leftMotorNoThrottleScale) * axisFlip;
  leftMotorOutput = clamp(leftMotorOutput, minAxis, maxAxis);
  rightMotorOutput = (rightMotorScale + rightMotorNoThrottleTurnScale) * axisFlip;
  rightMotorOutput = clamp(rightMotorOutput, minAxis, maxAxis);

  return [maxSpeed * leftMotorOutput, maxSpeed * rightMotorOutput];
}
diffSteer.axisFlip = -1;
diffSteer.maxAxis = 1;
diffSteer.maxSpeed = 255;
diffSteer.minAxis = -1;

module.exports = diffSteer;
