type ButtonProps = { children: string; onClick: () => any };

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button style={{ borderRadius: "5px" }} onClick={onClick}>
      {children}
    </button>
  );
}
