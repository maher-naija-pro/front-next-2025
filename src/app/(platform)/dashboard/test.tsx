"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function D3Test() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Clear SVG
    d3.select(ref.current).selectAll("*").remove();

    const svg = d3.select(ref.current);

    // Simple data
    const data = [10, 30, 50, 80, 40];

    // Draw circles
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d, i) => 50 + i * 60)
      .attr("cy", 50)
      .attr("r", (d) => d / 2)
      .attr("fill", "steelblue");
  }, []);

  return (
    <svg
      ref={ref}
      width={400}
      height={100}
      style={{ border: "1px solid #ccc" }}
    />
  );
}
