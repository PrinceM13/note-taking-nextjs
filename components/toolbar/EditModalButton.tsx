type ButtonProps = { children: string; color: string; onClick: () => any };

export default function EditModalButton({ children, color, onClick }: ButtonProps) {
  return (
    <button
      style={{ borderRadius: "5px", padding: "2px 4px", backgroundColor: color }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
