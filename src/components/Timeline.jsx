import React from "react";
import CanvasTimeline from "components/CanvasTimeline";
import ElementsTimeline from "components/ElementsTimeline";

function Timeline(props) {
  return [<ElementsTimeline {...props} />, <CanvasTimeline {...props} />];
}
export default Timeline;
