import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const SupermarketMap = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1000;
    const height = 800;

    svg.attr('width', width).attr('height', height);

    // Secciones del supermercado
    const sections = [
      { id: 'fruits', x: 50, y: 50, width: 200, height: 150, color: 'lightblue', label: 'Fruits' },
      { id: 'vegetables', x: 300, y: 50, width: 200, height: 150, color: 'lightgreen', label: 'Vegetables' },
      { id: 'bakery', x: 50, y: 250, width: 200, height: 150, color: 'lightyellow', label: 'Bakery' },
      { id: 'dairy', x: 300, y: 250, width: 200, height: 150, color: 'lightcoral', label: 'Dairy' }
    ];

    // Enlaces entre secciones
    const links = [
      { source: 'fruits', target: 'vegetables' },
      { source: 'bakery', target: 'dairy' },
      { source: 'fruits', target: 'bakery' }
    ];

    // Dibuja las secciones
    sections.forEach(section => {
      svg.append('rect')
        .attr('x', section.x)
        .attr('y', section.y)
        .attr('width', section.width)
        .attr('height', section.height)
        .attr('fill', section.color)
        .attr('stroke', 'black')
        .attr('stroke-width', 2);

      svg.append('text')
        .attr('x', section.x + 10)
        .attr('y', section.y + 30)
        .attr('font-size', '14px')
        .attr('fill', 'black')
        .text(section.label);
    });

    // Coordenadas para dibujar las líneas
    const linkCoords = {
      'fruits': { x: 50 + 100, y: 50 + 75 }, // Centro del rectángulo
      'vegetables': { x: 300 + 100, y: 50 + 75 },
      'bakery': { x: 50 + 100, y: 250 + 75 },
      'dairy': { x: 300 + 100, y: 250 + 75 }
    };

    // Dibuja las rutas
    links.forEach(link => {
      const start = linkCoords[link.source];
      const end = linkCoords[link.target];

      // Ajustar las rutas para evitar la superposición
      const path = [
        { x: start.x, y: start.y },
        { x: start.x, y: end.y },
        { x: end.x, y: end.y }
      ];

      svg.append('path')
        .attr('d', d3.line()(path))
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');
    });
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default SupermarketMap;




