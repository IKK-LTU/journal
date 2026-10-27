import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  onClickAway: () => void;
};

const ClickAwayListener = ({ children, onClickAway }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClickAway();
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickAwayListener;
