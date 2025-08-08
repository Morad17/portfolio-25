# Animating Robot walk left and turn

// Spring animation for rotation - use Z-axis instead of Y-axis
const { rotationY } = useSpring({
from: { rotationY: Math.PI / 2 }, // Start facing right (walking direction)
to: { rotationY: 0 }, // Turn 90° left to face viewer
delay: 5000,
config: { duration: 1000 },
});

<!-- useEffect(() => {
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
rotation-y={rotationY} -->

//Marquee Left and Right

<!--
      <div className="bottom-row">
        <div className="marquee">
          <motion.h2
            initial={{ x: "0" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            className="marquee-text"
          >
            Concept to code | Turning bold ideas into reality |
          </motion.h2>
          <motion.h2
            initial={{ x: "0" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            className="marquee-text"
          >
            Concept to code| Turning bold ideas into reality |
          </motion.h2>
        </div>
      </div> -->

//Spring bg color change animation

whileHover={{
    y: -5,
    scale: 1.02,
    backgroundColor: "rgba(147, 51, 234, 0.15)",
    boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)"
  }}
transition={{
    duration: 0.3,
    type: "spring",
    stiffness: 300
  }}

//React 3d model icon

motion.div className="models-row">
<!-- <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Canvas
                  camera={{ position: [1, 1, 1] }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Environment preset="warehouse" />
                  <ReactLogo
                    scale={[1.75, 1.75, 1.75]}
                    position={[0, -2, 0]}
                    rotation={[0, 0, 0]}
                  />
                  <GithubLogo
                    scale={[1.75, 1.75, 1.75]}
                    position={[0, -2, 0]}
                    rotation={[0, 0, 0]}
                  />
                </Canvas>
              </motion.div>
            </motion.div -->
