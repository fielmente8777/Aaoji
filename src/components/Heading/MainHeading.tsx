import React from "react";

interface HeadingProps {
  title: string;
  className?: string;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
}

const MainHeading: React.FC<HeadingProps> = ({
  title,
  className = "",
  h1,
  h2,
  h3,
  h4,
}) => {
  return (
    <>
      {h1 && (
        <h1
          className={` ${className} text-dark`}
        >
          {title}
        </h1>
      )}
      {h2 && (
        <h2
          className={` ${className} text-dark`}
        >
          {title}
        </h2>
      )}
      {h3 && (
        <h3
          className={` ${className} text-dark`}
        >
          {title}
        </h3>
      )}
      {h4 && (
        <h4
          className={` ${className} text-dark`}
        >
          {title}
        </h4>
      )}
    </>
  );
};

export default MainHeading;
