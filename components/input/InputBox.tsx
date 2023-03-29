type InputBoxProps = {
  value: string;
  name: string;
  onChange: (e: any) => any;
};

export default function InputBox({ value, name, onChange }: InputBoxProps) {
  return <input value={value} name={name} onChange={onChange} />;
}
