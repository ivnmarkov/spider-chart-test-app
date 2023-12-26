import { CHART } from "../../../constants";
import createSvgElement from "../utils/createSvgElement";

class ChartPolygon {
  constructor({
    values,
    color,
    angleSlice,
  }: {
    values: number[];
    color: string;
    angleSlice: number;
  }) {
    const points = values
      .map((value, axisIndex) => {
        const angle = CHART.startOffset + angleSlice * axisIndex;
        const x =
          CHART.center.x +
          ((CHART.radius * value) / CHART.maxAxisValue) * Math.cos(angle);
        const y =
          CHART.center.y +
          ((CHART.radius * value) / CHART.maxAxisValue) * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");

    const chartPolygon = createSvgElement("polygon");
    chartPolygon.setAttribute("points", points);
    chartPolygon.setAttribute("stroke", color);
    chartPolygon.setAttribute("fill", "none");
    return chartPolygon;
  }
}

export default ChartPolygon;
