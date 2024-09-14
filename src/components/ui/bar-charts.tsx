"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

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

// Transform chart data to match BarChart structure
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
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>{parsedData.title || "Marketing Channel Performance"}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={transformedData} width={500} height={300}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis />
            <Legend />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}       />
            {/* Render a bar for each marketing channel */}
            {parsedData.data.map((channel: any, index: number) => (
              <Bar
                key={index}
                dataKey={channel.label}
                fill={`hsl(var(--chart-${index + 1}))`}
                radius={8}
              />
            ))}
          </BarChart>
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
