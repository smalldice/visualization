const namespaceURI = "http://www.w3.org/2000/svg";

function demo1() {
  d3.select("#demo1")
    .selectAll("div")
    .data([4, 8, 15, 16, 23, 42])
    .enter()
    .append("div")
    .style("height", (d) => `${d}px`);
}

function demo2() {
  const colorMap = d3.interpolateRgb(d3.rgb("#d6e685"), d3.rgb("#1e6823"));

  d3.select("#demo2")
    .selectAll("div")
    .data([0.2, 0.4, 0, 0, 0.13, 0.92])
    .enter()
    .append("div")
    .style("background-color", (d) => {
      return d === 0 ? "#eee" : colorMap(d);
    });
}

function demo3() {
  const container = document.querySelector("#demo3");
  const svg = document.createElementNS(namespaceURI, "svg");
  const circle = document.createElementNS(namespaceURI, "circle");
  const text = document.createElementNS(namespaceURI, "text");
  const path = document.createElementNS(namespaceURI, "path");

  svg.style.width = "200px";
  svg.style.height = "200px";

  circle.setAttribute("fill", "#3e5693");
  circle.setAttribute("cx", "50");
  circle.setAttribute("cy", "120");
  circle.setAttribute("r", "20");

  text.setAttribute("x", "100");
  text.setAttribute("y", "100");
  text.textContent = "Hello SVG!";

  path.setAttribute("d", "M100,10L150,70L150,70Z");
  path.setAttribute("fill", "#bedbc3");
  path.setAttribute("stroke", "#539e91");
  path.setAttribute("stroke-width", "3");

  svg.appendChild(circle);
  svg.appendChild(text);
  svg.appendChild(path);

  container.appendChild(svg);
}

function demo4() {
  const data = [
    {
      label: "7am",
      sales: 20,
      x: 50,
      y: 40,
      textX: 50,
      textY: 90,
    },
    {
      label: "8am",
      sales: 12,
      x: 100,
      y: 40,
      textX: 100,
      textY: 90,
    },
    {
      label: "9am",
      sales: 8,
      x: 150,
      y: 40,
      textX: 150,
      textY: 90,
    },
    {
      label: "10am",
      sales: 27,
      x: 200,
      y: 40,
      textX: 200,
      textY: 90,
    },
  ];
  const container = document.getElementById("demo4");
  const svg = document.createElementNS(namespaceURI, "svg");

  data.forEach((item) => {
    const { label, sales: r, x, y, textX, textY } = item;
    const group = document.createElementNS(namespaceURI, "g");
    const circle = document.createElementNS(namespaceURI, "circle");
    const text = document.createElementNS(namespaceURI, "text");

    circle.setAttribute("fill", "#46988a");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", r);

    text.textContent = label;
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);

    group.appendChild(circle);
    group.appendChild(text);
    svg.appendChild(group);
  });

  container.appendChild(svg);
}

function demo5() {
  const data = [
    { x: 0, y: 30 },
    { x: 50, y: 20 },
    { x: 100, y: 40 },
    { x: 150, y: 80 },
    { x: 200, y: 95 },
  ];
  const container = document.getElementById("demo5");
  const svg = document.createElementNS(namespaceURI, "svg");
  const path = document.createElementNS(namespaceURI, "path");
  const width = 200;
  const height = 100;

  let direction =
    "M" +
    data
      .map((item, index) => {
        return item.x + "," + (height - item.y);
      })
      .join("L");

  svg.style.width = `${width}px`;
  svg.style.height = `${height}px`;

  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke", "#46988a");
  path.setAttribute("d", direction);
  path.setAttribute("fill", "none");

  svg.appendChild(path);
  container.appendChild(svg);
}

function demo6() {
  const width = 200;
  const height = 100;

  const data = [
    { x: 0, y: 30 },
    { x: 50, y: 20 },
    { x: 100, y: 40 },
    { x: 150, y: 80 },
    { x: 200, y: 95 },
  ];

  const line = d3
    .line()
    .x((d) => d.x)
    .y((d) => height - d.y)
    .curve(d3.curveLinear);
  console.log(line(data));
  d3.select("#demo6 > svg")
    .append("path")
    .attr("fill", "none")
    .attr("stroke-width", "2")
    .attr("stroke", "#e4393c")
    .attr("d", line(data));
}

demo1();
demo2();
demo3();
demo4();
demo5();
demo6();
