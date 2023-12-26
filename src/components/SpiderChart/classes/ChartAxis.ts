import { CHART, COLORS } from "../../../constants";
import createSvgElement from "../utils/createSvgElement";

class ChartAxis {
  private x: number;
  private y: number;
  private label_x: number;
  private label_y: number;

  constructor({ angle }: { angle: number }) {
    this.x = CHART.center.x + CHART.radius * Math.cos(angle); // Updated to totalRadius
    this.y = CHART.center.y + CHART.radius * Math.sin(angle); // Updated to totalRadius
    this.label_x = CHART.center.x + CHART.totalRadius * Math.cos(angle); // Updated to totalRadius
    this.label_y = CHART.center.y + CHART.totalRadius * Math.sin(angle); // Updated to totalRadius
  }

  public createAxisLine() {
    const line = createSvgElement("line");
    line.setAttribute("x1", CHART.center.x.toString());
    line.setAttribute("y1", CHART.center.y.toString());
    line.setAttribute("x2", this.x.toString());
    line.setAttribute("y2", this.y.toString());
    line.setAttribute("stroke", COLORS.axis);
    return line;
  }

  public createAxisLineLabel({
    label,
    events: { axisMouseEnter, axisMouseLeave },
  }: {
    label: string;
    events: { axisMouseEnter: () => void; axisMouseLeave: () => void };
  }) {
    const text = createSvgElement("text");
    text.setAttribute("x", this.label_x.toString());
    text.setAttribute("y", this.label_y.toString());
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "central");
    text.setAttribute("fill", COLORS.axis);
    text.textContent = label;
    text.style.cursor = "pointer";
    text.onmouseenter = () => axisMouseEnter();
    text.onmouseleave = () => axisMouseLeave;
    return text;
  }
}

export default ChartAxis;
