import { useEffect, useLayoutEffect, useState } from "react";
import _ from "underscore";

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    setSize([window.innerWidth, window.innerHeight]);
  }, []);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    var lazyLayout = _.debounce(updateSize, 200);

    window.addEventListener("resize", lazyLayout);

    return () => window.removeEventListener("resize", lazyLayout);
  }, []);

  return size;
};
