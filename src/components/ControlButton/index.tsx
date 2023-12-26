import { COLORS } from "../../constants";
import "./styles.css";

const ControlButton = ({
  text,
  idx,
  activeNames,
  onClick,
}: {
  text: string;
  idx: number;
  activeNames: string[];
  onClick: (text: string) => void;
}) => {
  return (
    <button
      className="control-button"
      onClick={() => onClick(text)}
      style={{
        backgroundColor: COLORS.chartBackground,
        color: activeNames.includes(text) ? COLORS.whiteText : COLORS.greyText,
      }}
    >
      <span
        style={{
          backgroundColor: activeNames.includes(text)
            ? COLORS[`dataset${idx + 1}`]
            : COLORS[`dataset${idx + 1}_blurred`],
        }}
      />
      {text}
    </button>
  );
};
export default ControlButton;
