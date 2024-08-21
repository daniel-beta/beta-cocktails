import { SVGProps } from "react";

const RightArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="1.5em"
    height="1.5em"
    {...props}
  >
    <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);
export default RightArrowIcon;
