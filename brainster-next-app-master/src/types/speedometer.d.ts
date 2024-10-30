declare module "react-d3-speedometer" {
  type Props = {
    currentValuePlaceholderStyle?: string;
    currentValueText?: string;
    customSegmentStops?: number[];
    customSegmentLabels: {
      text: string;
      color: string;
    }[];
    dimensionUnit?: string;
    endColor?: string;
    fluidWidth?: boolean;
    forceRender?: boolean;
    height?: number;
    labelFontSize?: string;
    maxSegmentLabels?: number;
    maxValue?: number;
    minValue?: number;
    needleColor?: string;
    needleHeightRatio?: number;
    needleTransition?: string;
    needleTransitionDuration?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
    ringWidth?: number;
    segmentColors?: string[];
    segments?: number;
    startColor?: string;
    textColor?: string;
    value?: number;
    valueFormat?: string;
    valueTextFontSize?: string;
    width?: number;
  };

  const ReactSpeedometer: React.FunctionComponent<Props>;
  export default ReactSpeedometer;
}
