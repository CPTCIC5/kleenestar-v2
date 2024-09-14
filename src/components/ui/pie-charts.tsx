"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Transform chart data and include colors
const transformChartData = (parsedData: any) => {
  

  // Add colors to the transformed data
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const transformedData = parsedData.data?.map((channel: any, index: number) => ({
    name: channel.label,
    value: channel.data.reduce((acc: number, val: number) => acc + val, 0), // Sum up values
    color: colors[index % colors.length], // Assign color
  }));

  return transformedData;
};

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

export function Component({ chart_data }: { chart_data: any }) {
  let parsedData;
  
  try {
    parsedData = JSON.parse(chart_data);
  } catch (error) {
    console.error("Error parsing JSON string:", error);
    return;
  }

  const transformedData = transformChartData(parsedData);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>{chart_data.title || "Chart Data"}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Render Pie with Colors */}
            <Pie
              data={transformedData}
              dataKey="value"
              nameKey="name"
              outerRadius={100} 
            >
              {transformedData?.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {parsedData?.title || "Trending up by 5.2% this month"} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {parsedData.description || "Showing total visitors for the last 6 months"}
        </div>
      </CardFooter>
    </Card>
  );
}
