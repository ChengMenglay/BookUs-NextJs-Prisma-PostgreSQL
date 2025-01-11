"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { User } from "@prisma/client";
import { format, parse } from "date-fns";

export const description = "An interactive bar chart";

type BarChartProps = {
  ticket: {
    id: string;
    seatNumber: string[];
    schedule: {
      departure_date: Date | null;
    };
  }[];
};

const chartConfig = {
  views: {
    label: "Data Views",
  },
  ticket: {
    label: "Ticket",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarChartComponent({ ticket }: BarChartProps) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("ticket");

  // Aggregate tickets by unique month
  const chartData = React.useMemo(() => {
    const monthData: Record<
      string,
      { departure_date: string; ticket: number }
    > = {};

    ticket.forEach((ticket) => {
      const departureMonth = format(
        ticket.schedule.departure_date as Date,
        "MMMM"
      ); // e.g., "January 2024"
      if (!monthData[departureMonth]) {
        monthData[departureMonth] = {
          departure_date: departureMonth,
          ticket: 0,
        };
      }
      monthData[departureMonth].ticket += ticket.seatNumber.length;
    });

    // Convert to array and sort by date
    return Object.values(monthData).sort((a, b) => {
      const dateA = parse(a.departure_date, "MMMM", new Date());
      const dateB = parse(b.departure_date, "MMMM", new Date());
      return dateA.getTime() - dateB.getTime();
    });
  }, [ticket]);
  let total_ticket = 0;
  ticket.forEach((ticket) => {
    total_ticket += ticket.seatNumber.length;
  });
  const total = React.useMemo(
    () => ({
      ticket: total_ticket,
    }),
    [ticket]
  );

  const keys: Array<keyof typeof total> = ["ticket"];

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>Showing total ticket in each months</CardDescription>
        </div>
        <div className="flex">
          {keys.map((key) => {
            const chart = key as keyof typeof chartConfig; // Explicitly typing for chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-[100px]"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="departure_date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return value; // Display "January 2024", "February 2024", etc.
                  }}
                />
              }
            />
            <Bar dataKey="ticket" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
