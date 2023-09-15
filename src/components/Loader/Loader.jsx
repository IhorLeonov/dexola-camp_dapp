import { LoaderBox } from "./Loader.styled.jsx";
import { RotatingLines } from "react-loader-spinner";

export const Loader = ({ style, width, color = "#CAE8FF" }) => {
  return (
    <LoaderBox style={style}>
      <RotatingLines
        strokeColor={color}
        strokeWidth="5"
        animationDuration="0.75"
        width={width}
        visible={true}
      />
    </LoaderBox>
  );
};
