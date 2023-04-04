type TextBoxProps = {
  value: string;
  name: string;
  onChange: (e: any) => any;
};

export default function TextBox({ value, name, onChange }: TextBoxProps) {
  return (
    <textarea
      style={{ fontFamily: "sans-serif", borderRadius: "5px" }}
      value={value}
      name={name}
      onChange={onChange}
    ></textarea>
  );
}
