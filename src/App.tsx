import React, { MutableRefObject, useEffect, useState } from 'react';
import './App.css';
import { animated, useTransition, config } from 'react-spring';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';

const startText = [
  { id: 0, text: 'Development.' },
  { id: 1, text: 'CS Student.' }
];

export const App = () => {
  const [index, set] = useState<number>(0);
  const parallax = React.useRef<Parallax>() as MutableRefObject<Parallax>;
  useEffect(
    () => void setInterval(() => set((state) => (state + 1) % 2), 2000),
    []
  );
  const transitions = useTransition(startText[index], (item) => item.id, {
    from: { position: 'absolute', overflow: 'hidden', height: 0, opacity: 0 },
    enter: { height: 200, opacity: 1 },
    leave: { height: 0, opacity: 0 },
    config: config.slow
  });

  return (
    <div className="App">
      <div className="noise" />
      <Parallax pages={2} scrolling={true} ref={parallax}>
        <ParallaxLayer offset={0} speed={0.5}>
          {transitions.map(({ item, props, key }) => (
            <animated.div key={key} style={props} className="start-headline">
              {item.text}
            </animated.div>
          ))}
          <span onClick={() => parallax.current.scrollTo(1)}>
            <i className="arrow down"></i>
          </span>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5}>
          <span>Layer 2</span>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
