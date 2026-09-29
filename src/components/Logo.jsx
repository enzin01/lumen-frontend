import { href } from "../utils.js";
export const Logo = ({ dest = "/home" }) => (
  <a className="logo" href={href(dest)} aria-label="LUMEN, página inicial">
    <span className="logo-icon">{"L"}</span>
    <span>{"LUMEN"}</span>
  </a>
);
