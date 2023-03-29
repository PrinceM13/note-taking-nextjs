type ButtonProps = { children: string; onClick: () => any };

export default function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
