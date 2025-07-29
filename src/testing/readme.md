# Animating Robot walk left and turn

// Spring animation for rotation - use Z-axis instead of Y-axis
const { rotationY } = useSpring({
from: { rotationY: Math.PI / 2 }, // Start facing right (walking direction)
to: { rotationY: 0 }, // Turn 90° left to face viewer
delay: 5000,
config: { duration: 1000 },
});

useEffect(() => {
if (animations.length > 0) {
const firstAnimation = Object.keys(actions)[0];
const action = actions[firstAnimation];

      if (action) {
        action.play();
        setTimeout(() => {
          action.paused = true;
          action.time = 1.41;
        }, 5500);
      }
    }

}, [actions, animations]);
rotation-y={rotationY}
