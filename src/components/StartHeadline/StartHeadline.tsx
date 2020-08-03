import React, { useState, useEffect } from 'react';
import { animated, useTransition, config } from 'react-spring';
import { useIntersectionObserver } from '@researchgate/react-intersection-observer';
import styled from 'styled-components';
import { ChangeHandler } from '@researchgate/react-intersection-observer/typings/src/types';

const startText = [
  { id: 0, text: 'Development.' },
  { id: 1, text: 'CS Student.' },
  { id: 3, text: 'Passion.' }
];

const Headline = styled.div`
  width: 100%;
  font-size: 6vw;
  font-family: oiYou;
  color: #ffd600;
`;

const HeadlineBackground = styled.div`
  width: 100%;
  font-size: 6vw;
  font-family: oiMate;
  color: #952626;
`;

export const StartHeadline = (): JSX.Element => {
  const [index, set] = useState<number>(0);
  const [visibility, setVisibility] = useState('invisible');
  const handleChange: ChangeHandler = (entry) => {
    setVisibility(entry.isIntersecting ? 'visible' : 'invisible');
  };
  const [ref] = useIntersectionObserver(handleChange, { threshold: 0 });

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

  //   console.log(visibility);

  return (
    <div style={{ width: '100%' }} ref={ref}>
      <HeadlineBackground>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props} className="">
            {item.text}
          </animated.div>
        ))}
      </HeadlineBackground>
      <Headline>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props} className="">
            {item.text}
          </animated.div>
        ))}
      </Headline>
    </div>
  );
};
