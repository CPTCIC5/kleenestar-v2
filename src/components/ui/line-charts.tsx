"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts";

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

// Transform chart data to match LineChart structure
const transformChartData = (parsedData: any) => {
  const labels = parsedData.labels;

  // Combine the data into an array of objects where each object corresponds to a month
  const transformedData = labels.map((label: string, index: number) => {
    const entry: any = { month: label };
    parsedData.data.forEach((channel: any) => {
      entry[channel.label] = channel.data[index];
    });
    return entry;
  });

  return transformedData;
};

// Define chart configuration for colors
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
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
    <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>{parsedData.title || "Marketing Channel Performance"}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={transformedData}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)} // Abbreviated months
            />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Legend />
            {/* Render a line for each marketing channel */}
            {parsedData.data.map((channel: any, index: number) => (
              <Line
                key={index}
                dataKey={channel.label}
                type="monotone"
                stroke={`hsl(var(--chart-${index + 1}))`} // Line color for each channel
                strokeWidth={3}
                dot={{ fill: `hsl(var(--chart-${index + 1}))`, strokeWidth: 2, r: 4 }} // Dot style
                activeDot={{ r: 6 }} // Larger dot on hover
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
