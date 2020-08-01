import React, { MutableRefObject, useEffect, useState } from 'react';
import './App.css';
import { animated, useTransition, config } from 'react-spring';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';

const startText = [
  { id: 0, text: 'Development.' },
  { id: 1, text: 'CS Student.' },
  { id: 3, text: 'Passion.' }
];

export const App = () => {
  const [index, set] = useState<number>(0);
  const parallax = React.useRef<Parallax>() as MutableRefObject<Parallax>;
  useEffect(
    () =>
      void setInterval(
        () => set((state) => (state + 1) % startText.length),
        5000
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
      textAlign: 'center'
    },
    enter: { opacity: 1, transform: 'translate3d(-50%,-50%,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,-60%,0)' },
    config: config.stiff
  });

  return (
    <div className="App">
      <div className="noise" />
      <Parallax pages={2} scrolling={true} ref={parallax}>
        <ParallaxLayer offset={0}>
          <div className="start-headline">
            {transitions.map(({ item, props, key }) => (
              <animated.div key={key} style={props} className="">
                {item.text}
              </animated.div>
            ))}
          </div>
          <div
            className="arrow-wrap"
            onClick={() => parallax.current.scrollTo(1)}
          >
            <i className="arrow down"></i>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.4}>
          <div style={{ height: '100%', backgroundColor: '#003633' }}>
            <span>Layer 2</span>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
