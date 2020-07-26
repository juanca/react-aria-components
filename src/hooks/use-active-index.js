import {
  useState,
} from 'react';

export default function useActiveIndex(lowerbound, upperbound) {
  const [activeIndex, setActiveIndex] = useState(0);

  function setFirstActiveIndex() {
    setActiveIndex(lowerbound);
  }

  function setLastActiveIndex() {
    setActiveIndex(upperbound);
  }

  function setNextActiveIndex() {
    setActiveIndex(Math.min(activeIndex + 1, upperbound));
  }

  function setPreviousActiveIndex() {
    setActiveIndex(Math.max(activeIndex - 1, 0));
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
