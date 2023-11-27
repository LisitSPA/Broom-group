import React from "react";

const CustomSVGContainer = ({ fill }) => {
  return (
    <div className="container_svg">
      <svg
        width="26"
        height="10"
        viewBox="0 0 26 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.5 0C0.776142 0 1 0.223858 1 0.5V5.5C1 7.433 2.567 9 4.5 9H25.5C25.7761 9 26 9.22386 26 9.5C26 9.77614 25.7761 10 25.5 10H4.5C2.01472 10 0 7.98528 0 5.5V0.5C0 0.223858 0.223858 0 0.5 0Z"
          fill={fill}
        />
      </svg>
      <svg
        width="9"
        height="10"
        viewBox="0 0 9 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="4.5" cy="5" r="4.5" fill={fill} />
      </svg>
    </div>
  );
};

export default CustomSVGContainer;
