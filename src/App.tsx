import React, { MutableRefObject, useEffect, useState } from 'react';
import './App.css';
import { animated, useTransition, config, useSpring } from 'react-spring';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';

const startText = [
  { id: 0, text: 'Development.' },
  { id: 1, text: 'CS Student.' },
  { id: 3, text: 'Passion.' }
];

export const App = (): JSX.Element => {
  const [index, set] = useState<number>(0);
  const parallax = React.useRef<Parallax>() as MutableRefObject<Parallax>;
  useEffect(
    () =>
      void setInterval(
        () => set((state) => (state + 1) % startText.length),
        2000
      ),
    []
  );
  const transitions = useTransition(startText[index], (item) => item.id, {
    from: {
      position: 'absolute',
      opacity: 0,
      transform: 'translate3d(-50%,-40%,0)',
      left: '50%',
      top: '50%',
      textAlign: 'center',
      width: '100%'
    },
    enter: { opacity: 1, transform: 'translate3d(-50%,-50%,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,-60%,0)' },
    config: config.stiff
  });

  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <div className="App">
      <div className="noise" />
      <Parallax pages={2} scrolling={true} ref={parallax}>
        <ParallaxLayer offset={0} speed={0.5}>
          <div className="start-headline-bg">
            {transitions.map(({ item, props, key }) => (
              <animated.div key={key} style={props} className="">
                {item.text}
              </animated.div>
            ))}
          </div>
          <div className="start-headline">
            {transitions.map(({ item, props, key }) => (
              <animated.div key={key} style={props} className="">
                {item.text}
              </animated.div>
            ))}
          </div>
          <animated.div style={props}>
            <div
              className="arrow-wrap"
              onClick={() => parallax.current.scrollTo(1)}
            >
              <i className="arrow down"></i>
            </div>
          </animated.div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5}>
          <div style={{ height: '100%', backgroundColor: '#003633' }}>
            <span>Layer 2</span>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
