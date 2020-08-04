import React, { useState, useEffect } from 'react';
import { animated, useTransition, config } from 'react-spring';
import styled from 'styled-components';

import OiYou from '../../assets/fonts/OiYou.otf';
import OiMate from '../../assets/fonts/OiMate.otf';

const startText = [
  { id: 0, text: 'Development.' },
  { id: 1, text: 'CS Student.' },
  { id: 2, text: 'Passion.' }
];

const Style = styled.div`
  @font-face {
    font-family: oiYou;
    src: url(${OiYou});
  }

  @font-face {
    font-family: oiMate;
    src: url(${OiMate});
  }

  font-size: 6vw;
`;

const Headline = styled.div`
  font-family: oiYou;
  color: #ffd600;
  position: absolute;
  display: block;
  z-index: 1;
  width: 100%;
  outline: none;
  white-space: pre;
`;

const HeadlineBackground = styled.div`
  font-family: oiMate;
  color: #952626;
  position: relative;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  display: block;
  outline: none;
  white-space: pre;
`;

export const StartHeadline = (): JSX.Element => {
  const [index, set] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(
      () => set((state) => (state + 1) % startText.length),
      2000
    );

    return () => clearInterval(interval);
  }, []);

  const transitions = useTransition(startText[index], (item) => item.id, {
    from: {
      position: 'absolute',
      opacity: 0,
      transform: 'translate3d(-50%,-50%,0)',
      left: '50%',
      top: '50%'
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(-50%,-50%,0)'
    },
    leave: {
      opacity: 0,
      transform: 'translate3d(-50%,-60%,0)'
    },
    config: { ...config.stiff, duration: 500 }
  });
  return (
    <Style>
      {transitions.map(
        ({ item, props, key }) =>
          item && (
            <animated.div key={key} style={props}>
              <Headline>{item.text}</Headline>
              <HeadlineBackground>{item.text}</HeadlineBackground>
            </animated.div>
          )
      )}
    </Style>
  );
};
