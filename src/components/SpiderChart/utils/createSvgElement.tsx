const createSvgElement = (elementName: string) => {
  return document.createElementNS("http://www.w3.org/2000/svg", elementName);
};

export default createSvgElement;
