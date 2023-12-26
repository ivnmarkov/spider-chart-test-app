import { COLORS, CHART } from "../../../constants";
import createSvgElement from "../utils/createSvgElement";

class ChartBackground {
  constructor() {
    const chartBackground = createSvgElement("circle");
    chartBackground.setAttribute("cx", CHART.center.x.toString());
    chartBackground.setAttribute("cy", CHART.center.y.toString());
    chartBackground.setAttribute("r", CHART.radius.toString());
    chartBackground.setAttribute("fill", COLORS.chartBackground);
    return chartBackground;
  }
}

export default ChartBackground;
