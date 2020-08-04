import React, { MutableRefObject, useState } from 'react';
import './App.css';
import { animated, useSpring } from 'react-spring';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';
import { StartHeadline } from './components/StartHeadline';
import { useIntersectionObserver } from '@researchgate/react-intersection-observer';
import { ChangeHandler } from '@researchgate/react-intersection-observer/typings/src/types';

export const App = (): JSX.Element => {
  const parallax = React.useRef<Parallax>() as MutableRefObject<Parallax>;

  const [visible, setVisible] = useState<boolean>(false);

  const handleChange: ChangeHandler = (entry) => {
    setVisible(entry.isIntersecting);
  };

  const [ref] = useIntersectionObserver(handleChange, { threshold: 0 });

  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <div className="App">
      <div className="noise" />
      <Parallax pages={2} scrolling={true} ref={parallax}>
        <ParallaxLayer offset={0} speed={0.5}>
          <div className="center-headline" ref={ref}>
            {visible && <StartHeadline />}
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
