import { useState } from "react";
import { COLORS } from "../../constants";
import "./styles.css";

interface ElementStyle {
  [key: string]: string | number;
}

const SpiderLegend = ({
  metrics,
  chartWidth,
  chartHeight,
  handleMouseHover,
}: {
  metrics: string[];
  chartWidth: number;
  chartHeight: number;
  handleMouseHover: (e: number | null) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const legendContainerWidth = chartWidth + 180;
  const legendContainerHeight = chartHeight + 60;
  const textLabelWidth = 110;

  const legendContainerStyle: ElementStyle = {
    zIndex: 1,
    height: legendContainerHeight,
    width: legendContainerWidth,
  };
  const legendItemStyle: ElementStyle = {
    maxWidth: textLabelWidth,
    minWidth: textLabelWidth,
  };

  const handleMouseHoverExtended = (idx: number | null) => {
    handleMouseHover(idx);
    setHoveredIndex(idx);
  };

  const getLegendItemPosition = (idx: number) => {
    switch (idx) {
      case 0:
        return {
          top: 10,
          left: legendContainerWidth / 2 - textLabelWidth / 2,
        };
      case 1:
        return { top: (legendContainerHeight / 2 / 3) * 1.55, right: 0 };
      case 2:
        return { bottom: (legendContainerHeight / 2 / 3) * 1.55, right: 0 };
      case 3:
        return {
          bottom: 15,
          left: legendContainerWidth / 2 - textLabelWidth / 2,
        };
      case 4:
        return { bottom: (legendContainerHeight / 2 / 3) * 1.55, left: 0 };
      case 5:
        return { top: (legendContainerHeight / 2 / 3) * 1.55, left: 0 };
      default:
        return { top: 0, left: 0 };
    }
  };

  return (
    <div className="legend-container" style={legendContainerStyle}>
      {metrics.map((metric, idx) => (
        <div
          key={metric}
          className="legend-item"
          style={{
            justifyContent:
              idx % (metrics.length / 2)
                ? idx > metrics.length / 2
                  ? "flex-end"
                  : "flex-start"
                : "center",
            color: hoveredIndex === idx ? COLORS.whiteText : COLORS.greyText,
            ...legendItemStyle,
            ...getLegendItemPosition(idx),
          }}
          onMouseEnter={() => {
            handleMouseHoverExtended(idx);
          }}
          onMouseLeave={() => {
            handleMouseHoverExtended(null);
          }}
        >
          <span>{metric}</span>
        </div>
      ))}
    </div>
  );
};

export default SpiderLegend;
