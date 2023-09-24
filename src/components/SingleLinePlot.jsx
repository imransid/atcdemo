import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import {
  PiArrowFatLeftDuotone,
  PiArrowFatRightDuotone,
  PiArrowFatUpDuotone,
  PiArrowFatDownDuotone,
} from "react-icons/pi";

const SingleLinePlot = ({
  data,
  data2,
  width = window.innerWidth,
  height = 400,
  marginTop = 10,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 60,
  status,
  iconStatus,
}) => {
  const gx = useRef();

  const GetKeyIcon = () => {
    if (iconStatus === -1) return <></>;

    if (iconStatus === 0)
      return <PiArrowFatLeftDuotone size={26} color="gray" />;
    if (iconStatus === 1)
      return <PiArrowFatRightDuotone size={26} color="gray" />;
    if (iconStatus === 2) return <PiArrowFatUpDuotone size={26} color="gray" />;
    if (iconStatus === 3)
      return <PiArrowFatDownDuotone size={26} color="gray" />;
  };

  const curve1 = [
    [marginLeft + 200, height - 285],
    [marginLeft + 400, height - 285],
    [marginLeft + 800, height - 280],
    [marginLeft + 1000, height - 275],
    [marginLeft + 1200, height - 260],
    [marginLeft + 1400, height - 200],
    [width - marginRight, height - marginBottom - 50],
  ];
  const curve2 = [
    [marginLeft, height - 250],
    [marginLeft + 200, height - 245],
    [marginLeft + 400, height - 245],
    [marginLeft + 800, height - 240],
    [marginLeft + 1000, height - 235],
    [marginLeft + 1200, height - 220],
    [marginLeft + 1400, height - 170],
    [width - marginRight, height - marginBottom - 50],
  ];
  const curve3 = [
    [marginLeft + 200, height - 205],
    [marginLeft + 400, height - 205],
    [marginLeft + 800, height - 200],
    [marginLeft + 1000, height - 195],
    [marginLeft + 1200, height - 180],
    [marginLeft + 1400, height - 140],
    [width - marginRight, height - marginBottom - 50],
  ];

const curve4 = [
    [marginLeft + 200, height - 130],
    [marginLeft + 400, height - 130],
    [marginLeft + 800, height - 135],
    [marginLeft + 1000, height - 140],
    [marginLeft + 1200, height - 145],
    [marginLeft + 1400, height - 180],
    [width - marginRight, marginTop + 70],
  ];
  const curve5 = [
    [marginLeft, height - 175],
    [marginLeft + 200, height - 175],
    [marginLeft + 400, height - 175],
    [marginLeft + 800, height - 180],
    [marginLeft + 1000, height - 185],
    [marginLeft + 1200, height - 190],
    [marginLeft + 1400, height - 225],
    [width - marginRight, marginTop + 70],
  ];
  const curve6 = [
    [marginLeft + 200, height - 220],
    [marginLeft + 400, height - 220],
    [marginLeft + 800, height - 225],
    [marginLeft + 1000, height - 230],
    [marginLeft + 1200, height - 235],
    [marginLeft + 1400, height - 260],
    [width - marginRight, marginTop + 70],
  ];

  const x = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return d.y;
      }),
    ])
    .range([height - marginBottom, marginTop]);

 // const y_y = d3.scaleLinear().domain([0, 1000]).range([0, 1000]);
  //const x_x = d3.scaleLinear().domain([0, 1000]).range([0, 1000]);

  const baseGraphExtra = d3
    .line()
    .x(function (d) {
      return d.x;
    })
    .y(function (d) {
      return d.y;
    });

  const y1 = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data2, function (d) {
        return d.y;
      }),
    ])
    .range([height - marginBottom, marginTop]);
  //d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);

  const line = d3.line().curve(d3.curveNatural);

  useEffect(
    () => void d3.select(gx.current).call(d3.axisBottom(x).tickSize(0)),
    [gx, x]
  );



  return (
    <svg width={width} height={height} id="my-svg">
      { status !== "ATC" && <g
        ref={gx}
        color="grey"
        transform={`translate(0,${height - marginBottom})`}
      />}
      <g transform={`translate(${marginLeft},0)`} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        { status === "ATC" &&<line color='grey'  x1={marginLeft} y1={marginTop} x2={width - marginRight} y2={marginTop}/>}
        {status !== "ATC" &&  <line
            color="grey"
            x1={marginLeft}
            y1={height - marginBottom - 50}
            x2={width - marginRight}
            y2={height - marginBottom - 50}
          />}
        { status !== "ATC" && <line color="yellow" x1={marginLeft} x2={marginLeft + 400} y1={height - 182.6} y2={height - 245}/>}
        <line
          color="grey"
          x1={marginLeft}
          y1={marginTop}
          x2={marginLeft}
          y2={height - marginBottom}
        />
        {/* ***** Nuatical mile wise scale line******/}
        <line
            color="grey"
            opacity="0.4"
            x1={x(25)}
            y1={marginTop}
            x2={x(25)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(50)}
            y1={marginTop}
            x2={x(50)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(75)}
            y1={marginTop}
            x2={x(75)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            x1={x(100)}
            y1={marginTop}
            x2={x(100)}
            y2={height - marginBottom}
          />

          <line
            color="grey"
            opacity="0.4"
            x1={x(125)}
            y1={marginTop}
            x2={x(125)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(150)}
            y1={marginTop}
            x2={x(150)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(175)}
            y1={marginTop}
            x2={x(175)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            x1={x(200)}
            y1={marginTop}
            x2={x(200)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(250)}
            y1={marginTop}
            x2={x(250)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            x1={x(300)}
            y1={marginTop}
            x2={x(300)}
            y2={height - marginBottom}
          />

        <line
            color="grey"
            opacity="0.4"
            x1={x(350)}
            y1={marginTop}
            x2={x(350)}
            y2={height - marginBottom}
          />    

          <line
            color="grey"
            opacity="0.4"
            x1={x(410)}
            y1={marginTop}
            x2={x(410)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(480)}
            y1={marginTop}
            x2={x(480)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(570)}
            y1={marginTop}
            x2={x(570)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(680)}
            y1={marginTop}
            x2={x(680)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(820)}
            y1={marginTop}
            x2={x(820)}
            y2={height - marginBottom}
          />
        <line
          color="grey"
          opacity="0.4"
          x1={x(1000)}
          y1={marginTop}
          x2={x(1000)}
          y2={height - marginBottom}
        />
        {/* ***** Nuatical mile wise scale line******/}
      </g>
      <path
        fill="none"
        color="grey"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(status === "ATC" ? curve4 : curve1)}
      />
      <path
        fill="none"
        color="grey"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(status === "ATC" ? curve5 : curve2)}
      />



      <GetKeyIcon />

      <path
        fill="none"
        color="grey"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(status === "ATC" ? curve6 : curve3)}
      />


        <defs>
            <filter x="0" y="0" width="1" height="1" id="solid">
              <feFlood floodColor="white" result="bg" />
              <feMerge>
                <feMergeNode in="bg"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter x="0" y="0" width="1" height="1" id="solid1">
              <feFlood floodColor="black" result="bg" />
              <feMerge>
                <feMergeNode in="bg"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
        </defs>

       { (data.length > 0 || data2.length> 0)  && <text x={status === "ATC" ? data2[data2.length-1]?.x: data[data.length-1]?.x} 
        y={ status === "ATC" ? data2[data2.length-1]?.y - 60 : data[data.length-1]?.y - 60} 
        //style={{background: 'white'}}
        //fill="white"
        filter="url(#solid)"
          textAnchor="middle"
          stroke="black"
          strokeWidth="1px"
          alignmentBaseline="middle"
          > 
          { status === "ATC" ? data2[data2.length - 1].airCraftSpeed : data[data.length - 1].airCraftSpeed } / {
            parseFloat(
              Math.atan2(Math.abs((status === "ATC" ? data2[data2.length-1].y : data[data.length-1].y) - ( height - 245)), Math.abs((status === "ATC" ? data2[data2.length-1].x : data[data.length-1].x) - (marginLeft + 400))) * 180/ Math.PI
              ).toFixed(2)
          } 
          </text> }

          { (data.length > 0 || data2.length> 0)  && <text x={status === "ATC" ? data2[data2.length-1]?.x: data[data.length-1]?.x} 
        y={ status === "ATC" ? data2[data2.length-1]?.y : data[data.length-1]?.y} 
          filter="url(#solid1)"
          textAnchor="middle"
          stroke="black"
          strokeWidth="1px"
          alignmentBaseline="middle"
          fontSize={48}
          > 
          🛬
          </text> }

         { status !== "ATC" && data.length > 0 && <text x={data[data.length-1]?.x} y={height-15} 

     
          filter="url(#solid)"
          textAnchor="middle"
          stroke="black"
          strokeWidth="1px"
          alignmentBaseline="middle"
          > THAI321<br/>
            

          </text>}

          {/*<g fill="none" stroke="grey">
          { status === "ATC" ? data2.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r="0.2" />
            )) : data.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r="0.2" />
            )) }
           
          </g> */}

       <path
        fill="none"
        stroke="grey"
        strokeWidth="1.5"
        strokeDasharray="3,3"
        d={baseGraphExtra(status === "ATC" ? data2 : data)}
      />  
    </svg>
  );
};

export default SingleLinePlot;
