import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Card: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const classes = `w-2/5 rounded-lg border border-gray-300 p-7 ${className} `;

  return <div className={classes}>{children}</div>;
};

export default Card;
