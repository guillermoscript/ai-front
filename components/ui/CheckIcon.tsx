interface CheckIconProps {
  className?: string;
}

export default function CheckIcon({ className }: CheckIconProps) {
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 13.707a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L7 11.586l8.293-8.293a1 1 0 0 1 1.414 1.414l-9 9z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}
