import { CHART } from "../../../constants";
import createSvgElement from "../utils/createSvgElement";

export default class ChartPoint {
  private value: number;
  private color: string;
  private x: number;
  private y: number;

  constructor({
    value,
    color,
    angle,
  }: {
    value: number;
    color: string;
    angle: number;
  }) {
    this.value = value;
    this.color = color;
    this.x =
      CHART.center.x +
      ((CHART.radius * this.value) / CHART.maxAxisValue) * Math.cos(angle);
    this.y =
      CHART.center.y +
      ((CHART.radius * this.value) / CHART.maxAxisValue) * Math.sin(angle);
  }

  public createPoint(): SVGElement {
    const point = createSvgElement("circle");

    point.setAttribute("cx", this.x.toString());
    point.setAttribute("cy", this.y.toString());
    point.setAttribute("r", CHART.pointRadius.toString());
    point.setAttribute("fill", this.color);

    return point;
  }
  public createPointLabel(): SVGElement {
    const label = createSvgElement("text");

    label.setAttribute("x", (this.x + CHART.pointRadius * 2 + 17).toString());
    label.setAttribute("y", (this.y + CHART.pointRadius / 2 + 2).toString());
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("fill", this.color);
    label.style.fontWeight = "500";
    label.textContent = this.value + "%";

    return label;
  }
}
