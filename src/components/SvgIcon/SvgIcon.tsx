import { IconType } from '../../types';

export type SvgIconProps = {
  iconType: IconType;
};

const SvgIcon: React.FC<SvgIconProps> = ({ iconType }) => {
  const icons = {
    close: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    ),
    cancel: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    ),
    increase: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    ),
    decrease: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#1f2633"
      className="svg-image"
    >
      {icons[iconType]}
    </svg>
  );
};

export default SvgIcon;
