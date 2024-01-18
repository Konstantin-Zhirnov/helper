import React, { useLayoutEffect, useState } from 'react'



export const useGetWidth = (selector: string): number => {

  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const setCurrentWidth = () => {
      const width = document.querySelectorAll(selector)[0]?.clientWidth
      if (width) {
        setWidth(width);
      }
    }
    setCurrentWidth()

    window.addEventListener("resize", setCurrentWidth)
    return () => {
      window.removeEventListener("resize", setCurrentWidth)
    }
  }, []);

  return width
}
