import * as React from "react"
import Svg, { G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const ImageCardIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={115}
    height={115}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect width={83} height={83} x={16} y={14} fill="#C9C6D7" rx={8} />
      <Path
        stroke="#F1F1F1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m74 61-5.658-5.658a3.666 3.666 0 0 0-5.184 0L46.5 72m-1.833-33h25.666A3.667 3.667 0 0 1 74 42.667v25.666A3.667 3.667 0 0 1 70.333 72H44.667A3.667 3.667 0 0 1 41 68.333V42.667A3.667 3.667 0 0 1 44.667 39Zm11 11a3.667 3.667 0 1 1-7.334 0 3.667 3.667 0 0 1 7.334 0Z"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default ImageCardIcon;