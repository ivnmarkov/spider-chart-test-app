import React, { useEffect, useRef, useState } from "react";
import { COLORS, CHART, DATA_KEYS } from "../../constants";
import ChartBackground from "./classes/ChartBackground";
import ChartAxis from "./classes/ChartAxis";
import ChartPolygon from "./classes/ChartPolygon";
import ChartPoint from "./classes/ChartPoint";

const SpiderChart = ({
  data,
  metrics,
  width = 100,
  height = 100,
  activeAxis,
  activeNames,
}: {
  data: { [key: string]: number[] };
  metrics: string[];
  width?: number;
  height?: number;
  activeAxis: number | null;
  activeNames: string[];
}) => {
  const svgRef = useRef(null);
  const numberOfAxes = metrics.length;
  const angleSlice = (Math.PI * 2) / numberOfAxes;

  useEffect(() => {
    if (svgRef.current) {
      const svg = svgRef.current as SVGSVGElement;
      svg.innerHTML = "";

      // Draw Black Round Background
      svg.appendChild(new ChartBackground() as SVGElement);

      // Draw Axes
      if (activeAxis !== null) {
        const angle = CHART.startOffset + angleSlice * activeAxis;
        const chartAxis = new ChartAxis({ angle });

        svg.appendChild(chartAxis.createAxisLine());
      } else {
        for (let i = 0; i < numberOfAxes; i++) {
          const angle = CHART.startOffset + angleSlice * i;
          const chartAxis = new ChartAxis({ angle });

          svg.appendChild(chartAxis.createAxisLine());
        }
      }

      Object.entries(data).forEach(([key, values], dataIndex) => {
        const datasetActiveColor =
          COLORS[`dataset${dataIndex + 1}` as keyof typeof COLORS];
        const datasetBlurredColor =
          COLORS[`dataset${dataIndex + 1}_blurred` as keyof typeof COLORS];

        const pointColor = activeNames.includes(key)
          ? datasetActiveColor
          : datasetBlurredColor;
        const polygonColor =
          activeAxis !== null || !activeNames.includes(key)
            ? datasetBlurredColor
            : datasetActiveColor;

        const chartPolygon = new ChartPolygon({
          values,
          color: polygonColor,
          angleSlice,
        });
        svg.appendChild(chartPolygon as SVGElement);

        // Active point with text label
        if (activeAxis !== null) {
          const value = values[activeAxis as number];
          const angle = CHART.startOffset + angleSlice * activeAxis;

          const chartPoint = new ChartPoint({
            value,
            angle,
            color: pointColor,
          });
          svg.appendChild(chartPoint.createPoint());
          activeNames.includes(key) &&
            svg.appendChild(chartPoint.createPointLabel());
        }
      });
    }
  }, [angleSlice, activeAxis, numberOfAxes, data, activeNames]);

  useEffect(() => {}, []);

  return (
    <div style={{ position: "absolute" }}>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default SpiderChart;
