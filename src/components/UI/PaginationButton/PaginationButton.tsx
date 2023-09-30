type PaginationButtonProps = {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function PaginationButton({
  disabled,
  onClick,
  children,
}: PaginationButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
