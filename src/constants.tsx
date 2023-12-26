export const COLORS: { [key: string]: string } = {
  background: "#171719",
  whiteText: "#F2F2FB",
  greyText: "#F2F2FB80",
  chartBackground: "#0B0B0C",
  axis: "#1C1C1E",
  dataset1: "#FF9133",
  dataset1_blurred: "#ff913333",
  dataset2: "#FFE99A",
  dataset2_blurred: "#ffe99a33",
  invisible: "#0000",
};

export const CHART = {
  width: 340,
  height: 340,
  center: { x: 170, y: 170 },
  radius: 170,
  totalRadius: 190,
  startOffset: 270 * (Math.PI / 180), // 270 degrees in radians,
  maxAxisValue: 100,
  pointRadius: 6,
};

export const DATA_KEYS = {
  stillInRole: "Still in role",
  exits: "Exits",
};
