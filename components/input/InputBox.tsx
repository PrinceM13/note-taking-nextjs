type InputBoxProps = {
  value: string;
  name: string;
  onChange: (e: any) => any;
};

export default function InputBox({ value, name, onChange }: InputBoxProps) {
  return (
    <input
      style={{ borderRadius: "5px", borderWidth: "1px" }}
      value={value}
      name={name}
      onChange={onChange}
    />
  );
}
