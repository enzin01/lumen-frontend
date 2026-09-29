export function Field({
  label,
  id,
  placeholder,
  type = "text",
  value = "",
  extra = {},
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        {...extra}
      />
    </label>
  );
}
