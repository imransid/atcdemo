import React, {useRef, useEffect} from 'react'
import * as d3 from "d3";

export default function LinePlot({
    data,
    width = window.innerWidth,
    height = 400,
    marginTop = 10,
    marginRight = 30,
    marginBottom = 30,
    marginLeft = 60
  }) {

    const gx = useRef();
    const gy = useRef();

    const points = [[marginLeft+200, height-300],[marginLeft+900, height-270],[width-marginRight, height - marginBottom]];
    const points2 = [[marginLeft, height-250],[marginLeft+900, height-220],[width-marginRight, height - marginBottom]];
    const points3 = [[marginLeft+200, height-200],[marginLeft+900, height-170],[width-marginRight, height - marginBottom]];

    const x = d3.scaleLinear().domain([0, 1000]).range([ marginLeft, (width - marginRight) ]);

    //console.log('Domain',d3.extent(data, function(d) { return  d.x; }));
    //console.log('Range : [',marginLeft,',',(width - marginRight),']');
  

    const y = d3.scaleLinear().domain([0,d3.max(data, function(d) { return  d.y; })]).range([ (height - marginBottom), marginTop]);
    //d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);

    const line = d3.line().curve(d3.curveNatural);

    const baseGraph =  d3.line()
                        .x(function(d){return x(d.x)})
                        .y(function(d){return y(d.y)})
                        
    //const line2 = d3.line().x((d) => x(d)).y((d) => y(d));

    // const lineBuilder = d3
    //                     .line()
    //                     .x((d) => x(d))
    //                     .y((d) => y(d));

    // const linePath = lineBuilder(data);

    useEffect(() => void 
      d3.select(gx.current).call(d3.axisBottom(x).tickSize(0)),[gx, x]
    );
    useEffect(() => void 
      d3.select(gy.current).call(d3.axisLeft(y).tickSize(0)), [gy, y]
    );


    return (
      <svg width={width} height={height} id='my-svg'>
            <g ref={gx} transform={`translate(0,${height - marginBottom})`}/>
            <g  transform={`translate(${marginLeft},0)`} />
            <g fill="white" stroke="currentColor" strokeWidth="1.5">
              <line color='grey'  x1={marginLeft} y1={marginTop} x2={marginLeft} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x('2014-04-29')} y1={marginTop} x2={x('2014-04-29')} y2={height - marginBottom}/>
              {/* <line color='grey' opacity='0.4' x1={x(10)} y1={marginTop} x2={x(10)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(15)} y1={marginTop} x2={x(15)} y2={height - marginBottom}/>
              <line color='grey'  x1={x(20)} y1={marginTop} x2={x(20)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(40)} y1={marginTop} x2={x(40)} y2={height - marginBottom}/>
              <line  color='grey' opacity='0.4'x1={x(60)} y1={marginTop} x2={x(60)} y2={height - marginBottom}/>
              <line  color='grey' opacity='0.4'x1={x(80)} y1={marginTop} x2={x(80)} y2={height - marginBottom}/>
              <line  color='grey' opacity='0.4'x1={x(100)} y1={marginTop} x2={x(100)} y2={height - marginBottom}/>
              <line  color='grey' opacity='0.4'x1={x(120)} y1={marginTop} x2={x(120)} y2={height - marginBottom}/>
              <line  color='grey' opacity='0.4'x1={x(140)} y1={marginTop} x2={x(140)} y2={height - marginBottom}/>
              <line  color='grey' opacity='0.4'x1={x(160)} y1={marginTop} x2={x(160)} y2={height - marginBottom}/>
              <line  color='grey' opacity='0.4'x1={x(180)} y1={marginTop} x2={x(180)} y2={height - marginBottom}/>
              <line  color='grey' opacity='0.4'x1={x(200)} y1={marginTop} x2={x(200)} y2={height - marginBottom}/> */}
            </g> 
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              d={line(points)}
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              d={line(points2)}
            />

            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              d={line(points3)}
            />
             <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              d={line(data)}
            /> 

              <path
              fill="none"
              stroke="steelblue"
              strokeWidth="1.5"
              d={baseGraph(data)}
            /> 

{/* <g  fill="white" stroke="currentColor" strokeWidth="1.5">
          
<path
      d={linePath}
      stroke="#9a6fb0"
      fill="none"
      strokeWidth={2}
    />
         
   
    
     </g>  */}
       {/* {data.map((d, i) => (
         <g key={i} fill="white" stroke="currentColor" strokeWidth="1.5">
          
             <circle cx={x(i)} cy={y(d)} r="0.2" style={{ transition: "ease-out .1s"  }} strokeLinejoin="round" />
            
      
       
        </g> 
           ))}     */}
        {/* {data.map((d) => {
          const transform = `translate(0,${y(1) - y(d)})`;

          return (
            <g key={d}>
              <path
                fill="none"
                transform={transform}
                //stroke={(d)}
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                d={line2(d)}
              />
            </g>
          );
        })} */}
      </svg>


      
    );
}
