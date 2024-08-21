import { SVGProps } from "react";

const LeftArrowIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);
export default LeftArrowIcon;
