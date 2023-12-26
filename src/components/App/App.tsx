import SpiderChart from "../SpiderChart";
import SpiderLegend from "../SpiderLegend";
import { CHART, COLORS } from "../../constants";
import "./App.css";
import { useState } from "react";
import ControlButton from "../ControlButton";

function App() {
  const [activeAxis, setActiveAxis] = useState<number | null>(null);
  const data = {
    "Still in role": [70, 40, 80, 35, 50, 60],
    Exits: [45, 70, 60, 65, 15, 45],
  };
  const metrics = [
    "Promotion rate",
    "Performance score",
    "Comp",
    "Age",
    "Engagement score",
    "Manager rating",
  ];
  const controlNames = Object.entries(data).map(([name, _]) => name);

  const [activeNames, setActiveNames] = useState<string[]>(controlNames);

  const handleButtonClick = (buttonText: string) => {
    const buttonTextIndex = activeNames.indexOf(buttonText);
    if (buttonTextIndex < 0) {
      setActiveNames([...activeNames, buttonText]);
    } else {
      const activeNamesCopy = [...activeNames];
      activeNamesCopy.splice(buttonTextIndex, 1);
      setActiveNames(activeNamesCopy);
    }
  };

  const handleMouseHover = (idx: number | null) => {
    setActiveAxis(idx !== null ? idx : null);
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: COLORS.background, color: COLORS.whiteText }}
    >
      <h2>Engineering attrition attributes</h2>
      <div className="control-buttons-container">
        {controlNames.map((name, idx) => (
          <ControlButton
            text={name}
            idx={idx}
            key={name}
            activeNames={activeNames}
            onClick={handleButtonClick}
          />
        ))}
      </div>
      <div className="chart-container">
        <SpiderLegend
          metrics={metrics}
          chartWidth={CHART.width}
          chartHeight={CHART.height}
          handleMouseHover={handleMouseHover}
        />
        <SpiderChart
          data={data}
          metrics={metrics}
          width={CHART.width}
          height={CHART.height}
          activeAxis={activeAxis}
          activeNames={activeNames}
        />
      </div>
    </div>
  );
}

export default App;
