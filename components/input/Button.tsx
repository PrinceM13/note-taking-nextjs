type ButtonProps = { children: string };

export default function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}
