# diff-steer

> Provides a simple interface to a differential steering algorithm to control two motors from one two-axis joystick.

## Installation

    npm i diff-steer --save

## Usage

`diff-steer` accepts two inputs, a x-axis value and a y-axis value from a two-axis joystick. The first argument is the x-axis (from -1 to 1) and the second argument is the y-axis (-1 to 1):

```js
var diffSteer = require('diff-steer');
diffSteer(0, -1); // UP
// > [255, 255]
diffSteer(0, 1); // DOWN
// > [-255, -255]
diffSteer(-1, 0); // LEFT
// > [-255, 255]
diffSteer(1, 0); // RIGHT
// > [255, -255]
diffSteer(0.8, -0.74); // UPPER RIGHT
// > [255, -5.100000000000005]
```

The return value is an array of motor speeds for each motor ranging from 255 to -255. A positive number is "forward", and a negative number is "backward". You can then use those values however you need to.

It is configured out of the box to work with USB gamepads. For more information on interfacing with USB gamepads, checkout [`gamepad`][gamepad] or [`node-gamepad`][node-gamepad].

### Additional Configuration

#### Axis Input values

If your device does not return values between -1 and 1 for each axis, you can configure `diff-steer`:

```js
diffSteer.maxAxis = 1023;
diffSteer.minAxis = 0;
```

#### UP/DOWN values

USB gamepads return a negative number of `UP` and a positive number for `DOWN`. If your device does not follow this pattern (or you'd prefer a different control scheme), you can flip the axis:

```js
diffSteer.maxAxis = 1023;
diffSteer.minAxis = 0;
```

### Johnny-Five

If you are using [Johnny-Five][j5], you can pass your `five.Motors` collection to the `motor_control` module and `diff-steer` will handle driving your motors for you:

```js
var steerMotors = require('diff-steer/motor_control');
// Refer to J5 docs for more info on motor shield configs
var config = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
var wheels = new five.Motors([config.M1, config.M2]);
// ...
gamepad.on('move', function(id, axis, value) {
  if(axis == 0 || axis == 1) {
    var device = gamepad.deviceAtIndex(id);
    steerMotors(wheels, device.axisStates[0], device.axisStates[1]);
  }
});
```

If you'd rather control the motors yourself, `motor_control` also returns an array of motor commands:

```js
var motorCmds = steerMotors(null, device.axisStates[0], device.axisStates[1]);
console.info(motorCmds);
// [
//   {
//     direction: 'fwd',
//     speed: 255
//   },
//   {
//     direction: 'rev',
//     speed: -255
//   }
// ];
```

[gamepad]: https://www.npmjs.com/package/gamepad
[node-gamepad]: https://www.npmjs.com/package/node-gamepad
[j5]: http://johnny-five.io/
