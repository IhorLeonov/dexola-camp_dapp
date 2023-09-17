import sprite from "../assets/icons/sprite.svg";

// eslint-disable-next-line react/prop-types
export const Icon = ({ name, width, height }) => {
  return (
    <svg className="svg" width={width} height={height}>
      <use href={sprite + `#${name}`}></use>
    </svg>
  );
};
