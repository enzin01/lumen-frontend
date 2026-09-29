import { href } from "../utils.js";
export const Link = ({ url, label, cls = "" }) => (
  <a className={cls} href={href(url)}>
    {label}
  </a>
);
