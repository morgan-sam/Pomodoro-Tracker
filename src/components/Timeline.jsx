import React from "react";
import CanvasTimeline from "components/CanvasTimeline";
import ElementsTimeline from "components/ElementsTimeline";

function Timeline(props) {
  return (
    <div>
      <ElementsTimeline {...props} />
      <CanvasTimeline {...props} />
    </div>
  )
}
export default Timeline;
