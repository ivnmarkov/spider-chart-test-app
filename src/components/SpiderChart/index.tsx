import React, { useEffect, useRef, useState } from "react";
import { COLORS, CHART } from "../../constants";
import ChartBackground from "./classes/ChartBackground";
import ChartAxis from "./classes/ChartAxis";
import ChartPolygon from "./classes/ChartPolygon";
import ChartPoint from "./classes/ChartPoint";
import ChartDatasetInitialAnimation from "./classes/ChartDatasetInitialAnimation";

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

  const [isReady, setIsReady] = useState(false);

  const onAnimationFinish = () => {
    setIsReady(true);
  };

  const drawChart = () => {
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

      // Draw dataset polygons with active points
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

        // Dataset polygon
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
  };

  useEffect(() => {
    if (svgRef.current) {
      new ChartDatasetInitialAnimation({
        data,
        svg: svgRef.current,
        onAnimationFinish,
      });
    }
  }, []);

  useEffect(() => {
    if (isReady) {
      drawChart();
    }
  }, [isReady, angleSlice, activeAxis, numberOfAxes, data, activeNames]);

  return (
    <div style={{ position: "absolute" }}>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default SpiderChart;
