import { Link } from "../components/Link.jsx";
export const ButtonLink = ({ url, label, cls = "btn-primary" }) => (
  <Link url={url} label={label} cls={`btn ${cls}`} />
);
