import {
  useRef,
} from 'react';

export default function useActiveIndex(lowerbound, upperbound) {
  const activeIndex = useRef(-1);
  if (activeIndex.current > upperbound) activeIndex.current = -1;

  function setActiveIndex(index) {
    activeIndex.current = index;
  }

  function setFirstActiveIndex() {
    activeIndex.current = lowerbound;
  }

  function setLastActiveIndex() {
    activeIndex.current = upperbound;
  }

  function setNextActiveIndex() {
    activeIndex.current = Math.min(activeIndex.current + 1, upperbound);
  }

  function setPreviousActiveIndex() {
    activeIndex.current = Math.max(activeIndex.current - 1, 0);
  }

  return {
    activeIndex,
    setActiveIndex,
    setFirstActiveIndex,
    setLastActiveIndex,
    setNextActiveIndex,
    setPreviousActiveIndex,
  };
}
