import * as React from "react"
import Svg, { G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const OrderIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={74}
    height={74}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect width={42} height={42} x={16} y={14} fill="#BFACC8" rx={8} />
      <Path
        stroke="#4F1271"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M46 27h-7m-4 0h-7m18 8h-9m-4 0h-5m18 8h-5m-4 0h-9m11-18v4m-6 4v4m8 4v4"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default OrderIcon
