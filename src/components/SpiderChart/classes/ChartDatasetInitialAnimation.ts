import { CHART, COLORS } from "../../../constants";
import createSvgElement from "../utils/createSvgElement";
import ChartBackground from "./ChartBackground";

export default class ChartDatasetInitialAnimation {
  constructor({
    data,
    svg,
    onAnimationFinish,
  }: {
    data: { [key: string]: number[] };
    svg: SVGElement;
    onAnimationFinish: () => void;
  }) {
    svg.appendChild(new ChartBackground() as SVGElement);

    Object.entries(data).forEach(([key, values], dataIndex) => {
      const numberOfAxes = values.length;
      const startingPoint = Math.floor(Math.random() * numberOfAxes);
      const angleSlice = (Math.PI * 2) / numberOfAxes;

      for (let i = 0; i < numberOfAxes; i++) {
        const currentPoint = (startingPoint + i) % numberOfAxes;
        const nextPoint = (startingPoint + i + 1) % numberOfAxes;

        setTimeout(() => {
          const angleCurrent = CHART.startOffset + angleSlice * currentPoint;
          const angleNext = CHART.startOffset + angleSlice * nextPoint;
          const x1 =
            CHART.center.x +
            ((CHART.radius * values[currentPoint]) / 100) *
              Math.cos(angleCurrent);
          const y1 =
            CHART.center.y +
            ((CHART.radius * values[currentPoint]) / 100) *
              Math.sin(angleCurrent);
          const x2 =
            CHART.center.x +
            ((CHART.radius * values[nextPoint]) / 100) * Math.cos(angleNext);
          const y2 =
            CHART.center.y +
            ((CHART.radius * values[nextPoint]) / 100) * Math.sin(angleNext);

          // Draw initial black line
          const initialLine = createSvgElement("line");
          initialLine.setAttribute("x1", x1.toString());
          initialLine.setAttribute("y1", y1.toString());
          initialLine.setAttribute("x2", x2.toString());
          initialLine.setAttribute("y2", y2.toString());
          initialLine.setAttribute("stroke", COLORS.whiteText);
          svg.appendChild(initialLine);

          // Redraw line with final color
          setTimeout(() => {
            const line = createSvgElement("line");
            line.setAttribute("x1", x1.toString());
            line.setAttribute("y1", y1.toString());
            line.setAttribute("x2", x2.toString());
            line.setAttribute("y2", y2.toString());
            line.setAttribute("stroke", COLORS.greyText);
            svg.appendChild(line);
            initialLine.remove(); // Remove the initial black line
          }, 500);
          if (i === numberOfAxes - 1) {
            setTimeout(() => {
              onAnimationFinish();
            }, 1000);
          }
        }, 500 * i);
      }
    });
  }
}
