import * as React from "react"
import Svg, { Path } from "react-native-svg"

const  AnalyticsIcon: React.FC<{
    focused: boolean;
    color: string;
    size: number;
}> = (props) => {
  return (
    <Svg
      x="0px"
      y="0px"
      width={props.size}
      height={props.size}
      viewBox="0 0 96.491 96.491"
    >
      <Path fill={props.focused ? '#454A73': "#777"} d="M52.639.463v45.732L93.078 61.3a43.716 43.716 0 003.413-16.985C96.491 20.097 76.855.463 52.639.463z" />
      <Path fill={props.focused ? '#454A73': "#777"} d="M43.854 8.322C19.635 8.322 0 27.955 0 52.174c0 24.221 19.635 43.854 43.854 43.854 18.197 0 33.803-11.084 40.44-26.869l-40.44-15.105V8.322z" />
    </Svg>
  )
}

export default AnalyticsIcon;