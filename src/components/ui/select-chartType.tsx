import  { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Component as LineCharts } from "./line-charts";
import { Component as BarCharts } from "./bar-charts";
import { Component as PieCharts } from "./pie-charts";

// Define the possible chart types
type ChartType = "pie" | "bar" | "line" | null;

interface SelectDemoProps {
  chart_data: any;  // Replace 'any' with the appropriate type for chart_data if known
}

export const SelectDemo: React.FC<SelectDemoProps> = ({ chart_data }) => {
  const [chartType, setChartType] = useState<ChartType>(null);

  const renderChart = () => {
    switch (chartType) {
      case "pie":
        return <PieCharts chart_data={chart_data} />;
      case "bar":
        return <BarCharts chart_data={chart_data} />;
      case "line":
        return <LineCharts chart_data={chart_data} />;
      default:
        return <div>Please select a chart type.</div>;
    }
  };

  return (
    <div className="flex flex-col">
      <Select onValueChange={(value: string) => setChartType(value as ChartType)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a chart type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Chart Types</SelectLabel>
            <SelectItem value="pie">Pie Chart</SelectItem>
            <SelectItem value="bar">Bar Chart</SelectItem>
            <SelectItem value="line">Line Chart</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex mt-4">{renderChart()}</div>
    </div>
  );
};
