/**
 * Library helpers and utilities for common data visualization and manipulation libraries
 * Provides convenient wrappers and examples for Arquero, Observable Plot, Plotly, Vega-Lite
 */

export interface LibraryInfo {
  name: string;
  version: string;
  cdnUrl: string;
  globalName: string;
  description: string;
  examples: Array<{
    title: string;
    description: string;
    code: string;
  }>;
}

export const SUPPORTED_LIBRARIES: Record<string, LibraryInfo> = {
  arquero: {
    name: 'Arquero',
    version: 'latest',
    cdnUrl: 'https://cdn.jsdelivr.net/npm/arquero@latest/+esm',
    globalName: 'aq',
    description: 'Query processing and transformation of array-backed data tables',
    examples: [
      {
        title: 'Load and filter CSV data',
        description: 'Load CSV data from a URL and filter rows',
        code: `import * as aq from 'arquero';

const data = aq.fromCSV(await fetch('data.csv').then(r => r.text()));

// Filter and select columns
const filtered = data
  .filter(d => d.value > 100)
  .select('name', 'value')
  .orderby(aq.desc('value'));

filtered.view(); // Display as a table`
      },
      {
        title: 'Group and aggregate',
        description: 'Group data and compute statistics',
        code: `import * as aq from 'arquero';

const summary = data
  .groupby('category')
  .rollup({
    count: d => aq.op.count(),
    avg_value: d => aq.op.mean(d.value),
    total: d => aq.op.sum(d.value)
  })
  .orderby(aq.desc('total'));

summary.view();`
      },
      {
        title: 'Join tables',
        description: 'Join two data tables',
        code: `import * as aq from 'arquero';

const joined = table1
  .join(table2, 'id')
  .select('table1.name', 'table2.value');

joined.view();`
      }
    ]
  },

  plot: {
    name: 'Observable Plot',
    version: 'latest',
    cdnUrl: 'https://cdn.jsdelivr.net/npm/@observablehq/plot@latest/+esm',
    globalName: 'Plot',
    description: 'A concise API for exploratory data visualization',
    examples: [
      {
        title: 'Simple scatter plot',
        description: 'Create a scatter plot with Observable Plot',
        code: `import * as Plot from '@observablehq/plot';

const data = [
  {x: 1, y: 2}, {x: 2, y: 5}, {x: 3, y: 3},
  {x: 4, y: 8}, {x: 5, y: 7}
];

Plot.plot({
  marks: [
    Plot.dot(data, {x: 'x', y: 'y', fill: 'steelblue', r: 5}),
    Plot.linearRegressionY(data, {x: 'x', y: 'y', stroke: 'red'})
  ],
  grid: true,
  width: 640,
  height: 400
})`
      },
      {
        title: 'Bar chart',
        description: 'Create a bar chart with labels',
        code: `import * as Plot from '@observablehq/plot';

const data = [
  {category: 'A', value: 30},
  {category: 'B', value: 45},
  {category: 'C', value: 20},
  {category: 'D', value: 60}
];

Plot.plot({
  marks: [
    Plot.barY(data, {x: 'category', y: 'value', fill: 'steelblue'}),
    Plot.ruleY([0])
  ],
  marginBottom: 40,
  width: 640,
  height: 400
})`
      },
      {
        title: 'Line chart with multiple series',
        description: 'Time series visualization',
        code: `import * as Plot from '@observablehq/plot';

const timeSeries = [
  {date: new Date('2024-01'), series: 'A', value: 30},
  {date: new Date('2024-02'), series: 'A', value: 35},
  {date: new Date('2024-03'), series: 'A', value: 40},
  {date: new Date('2024-01'), series: 'B', value: 20},
  {date: new Date('2024-02'), series: 'B', value: 25},
  {date: new Date('2024-03'), series: 'B', value: 30}
];

Plot.plot({
  marks: [
    Plot.lineY(timeSeries, {x: 'date', y: 'value', stroke: 'series'}),
    Plot.dot(timeSeries, {x: 'date', y: 'value', fill: 'series'})
  ],
  color: {legend: true},
  grid: true,
  width: 640,
  height: 400
})`
      }
    ]
  },

  plotly: {
    name: 'Plotly.js',
    version: 'latest',
    cdnUrl: 'https://cdn.jsdelivr.net/npm/plotly.js-dist@latest/+esm',
    globalName: 'Plotly',
    description: 'Interactive, publication-quality graphs',
    examples: [
      {
        title: '3D scatter plot',
        description: 'Create an interactive 3D scatter plot',
        code: `import Plotly from 'plotly.js-dist';

const trace = {
  x: [1, 2, 3, 4, 5],
  y: [1, 4, 9, 16, 25],
  z: [1, 8, 27, 64, 125],
  mode: 'markers',
  marker: {
    size: 12,
    color: 'rgb(23, 190, 207)',
  },
  type: 'scatter3d'
};

const layout = {
  title: '3D Scatter Plot',
  autosize: false,
  width: 640,
  height: 480,
  scene: {
    xaxis: {title: 'X Axis'},
    yaxis: {title: 'Y Axis'},
    zaxis: {title: 'Z Axis'}
  }
};

const container = document.createElement('div');
Plotly.newPlot(container, [trace], layout);
container; // Return to display`
      },
      {
        title: 'Heatmap',
        description: 'Create a correlation heatmap',
        code: `import Plotly from 'plotly.js-dist';

const data = [{
  z: [[1, 0.8, 0.5], [0.8, 1, 0.6], [0.5, 0.6, 1]],
  x: ['Variable 1', 'Variable 2', 'Variable 3'],
  y: ['Variable 1', 'Variable 2', 'Variable 3'],
  type: 'heatmap',
  colorscale: 'RdBu'
}];

const layout = {
  title: 'Correlation Matrix',
  width: 640,
  height: 480
};

const container = document.createElement('div');
Plotly.newPlot(container, data, layout);
container;`
      },
      {
        title: 'Interactive time series',
        description: 'Create a time series with range selector',
        code: `import Plotly from 'plotly.js-dist';

const dates = Array.from({length: 100}, (_, i) =>
  new Date(2024, 0, i + 1).toISOString().split('T')[0]
);
const values = dates.map(() => Math.random() * 100 + 50);

const trace = {
  x: dates,
  y: values,
  type: 'scatter',
  mode: 'lines',
  line: {color: '#1f77b4'}
};

const layout = {
  title: 'Time Series with Range Selector',
  xaxis: {
    rangeselector: {
      buttons: [
        {count: 7, label: '1w', step: 'day', stepmode: 'backward'},
        {count: 1, label: '1m', step: 'month', stepmode: 'backward'},
        {step: 'all'}
      ]
    },
    rangeslider: {visible: true}
  },
  width: 640,
  height: 500
};

const container = document.createElement('div');
Plotly.newPlot(container, [trace], layout);
container;`
      }
    ]
  },

  vega: {
    name: 'Vega-Lite',
    version: 'latest',
    cdnUrl: 'https://cdn.jsdelivr.net/npm/vega-lite@latest/+esm',
    globalName: 'vegaLite',
    description: 'A high-level grammar of interactive graphics',
    examples: [
      {
        title: 'Simple bar chart',
        description: 'Create a Vega-Lite visualization',
        code: `import * as vegaLite from 'vega-lite';
import embed from 'vega-embed';

const spec = {
  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  data: {
    values: [
      {category: 'A', value: 28},
      {category: 'B', value: 55},
      {category: 'C', value: 43},
      {category: 'D', value: 91},
      {category: 'E', value: 81}
    ]
  },
  mark: 'bar',
  encoding: {
    x: {field: 'category', type: 'nominal'},
    y: {field: 'value', type: 'quantitative'}
  },
  width: 600,
  height: 400
};

const container = document.createElement('div');
await embed(container, spec);
container;`
      },
      {
        title: 'Interactive scatter plot',
        description: 'Scatter plot with tooltip and selection',
        code: `import embed from 'vega-embed';

const spec = {
  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  data: {
    values: Array.from({length: 50}, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
    }))
  },
  mark: {type: 'point', filled: true, size: 100},
  encoding: {
    x: {field: 'x', type: 'quantitative'},
    y: {field: 'y', type: 'quantitative'},
    color: {field: 'category', type: 'nominal'},
    tooltip: [{field: 'x'}, {field: 'y'}, {field: 'category'}]
  },
  selection: {
    brush: {type: 'interval'}
  },
  width: 600,
  height: 400
};

const container = document.createElement('div');
await embed(container, spec);
container;`
      }
    ]
  },

  d3: {
    name: 'D3.js',
    version: '7',
    cdnUrl: 'https://cdn.jsdelivr.net/npm/d3@7/+esm',
    globalName: 'd3',
    description: 'Data-Driven Documents - powerful visualization library',
    examples: [
      {
        title: 'Simple bar chart',
        description: 'Create a bar chart with D3',
        code: `import * as d3 from 'd3';

const data = [30, 86, 168, 281, 303, 365];

const svg = d3.create('svg')
  .attr('width', 640)
  .attr('height', 400)
  .attr('viewBox', [0, 0, 640, 400])
  .attr('style', 'max-width: 100%; height: auto;');

const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([40, 620])
  .padding(0.1);

const y = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([350, 50]);

svg.append('g')
  .selectAll('rect')
  .data(data)
  .join('rect')
  .attr('x', (d, i) => x(i))
  .attr('y', d => y(d))
  .attr('height', d => y(0) - y(d))
  .attr('width', x.bandwidth())
  .attr('fill', 'steelblue');

svg.node();`
      },
      {
        title: 'Force-directed graph',
        description: 'Network visualization with D3 force simulation',
        code: `import * as d3 from 'd3';

const nodes = [
  {id: 'A'}, {id: 'B'}, {id: 'C'},
  {id: 'D'}, {id: 'E'}
];

const links = [
  {source: 'A', target: 'B'},
  {source: 'A', target: 'C'},
  {source: 'B', target: 'D'},
  {source: 'C', target: 'E'},
  {source: 'D', target: 'E'}
];

const width = 640;
const height = 400;

const simulation = d3.forceSimulation(nodes)
  .force('link', d3.forceLink(links).id(d => d.id))
  .force('charge', d3.forceManyBody().strength(-300))
  .force('center', d3.forceCenter(width / 2, height / 2));

const svg = d3.create('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('viewBox', [0, 0, width, height]);

const link = svg.append('g')
  .selectAll('line')
  .data(links)
  .join('line')
  .attr('stroke', '#999')
  .attr('stroke-width', 2);

const node = svg.append('g')
  .selectAll('circle')
  .data(nodes)
  .join('circle')
  .attr('r', 20)
  .attr('fill', '#69b3a2');

const label = svg.append('g')
  .selectAll('text')
  .data(nodes)
  .join('text')
  .text(d => d.id)
  .attr('text-anchor', 'middle')
  .attr('dy', 5)
  .attr('fill', 'white');

simulation.on('tick', () => {
  link
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);

  node
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);

  label
    .attr('x', d => d.x)
    .attr('y', d => d.y);
});

svg.node();`
      }
    ]
  }
};

/**
 * Get example code for a specific library
 */
export function getLibraryExamples(libraryKey: string): string[] {
  const lib = SUPPORTED_LIBRARIES[libraryKey];
  if (!lib) return [];
  return lib.examples.map(ex => `// ${ex.title}\n// ${ex.description}\n\n${ex.code}`);
}

/**
 * Get all library documentation
 */
export function getAllLibraries(): LibraryInfo[] {
  return Object.values(SUPPORTED_LIBRARIES);
}

/**
 * Get quick start code template
 */
export function getQuickStart(libraryKey: string): string | null {
  const lib = SUPPORTED_LIBRARIES[libraryKey];
  if (!lib || lib.examples.length === 0) return null;
  return lib.examples[0].code;
}

/**
 * Generate import statement for a library
 */
export function generateImportStatement(libraryKey: string, alias?: string): string {
  const lib = SUPPORTED_LIBRARIES[libraryKey];
  if (!lib) return '';

  const importAlias = alias || lib.globalName;
  return `import * as ${importAlias} from '${libraryKey === 'plot' ? '@observablehq/plot' : libraryKey}';`;
}

/**
 * Common data generation utilities
 */
export const dataUtils = {
  /**
   * Generate random time series data
   */
  generateTimeSeries(
    points: number = 50,
    startDate: Date = new Date('2024-01-01'),
    variance: number = 10
  ): Array<{date: Date; value: number}> {
    let value = 100;
    return Array.from({length: points}, (_, i) => {
      value += (Math.random() - 0.5) * variance;
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      return {date, value: Math.max(0, value)};
    });
  },

  /**
   * Generate random scatter data
   */
  generateScatterData(
    points: number = 100,
    categories: string[] = ['A', 'B', 'C']
  ): Array<{x: number; y: number; category: string}> {
    return Array.from({length: points}, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      category: categories[Math.floor(Math.random() * categories.length)]
    }));
  },

  /**
   * Generate hierarchical data for tree visualizations
   */
  generateTreeData(depth: number = 3, childrenPerNode: number = 3): any {
    function createNode(level: number, id: string): any {
      if (level >= depth) {
        return {id, value: Math.floor(Math.random() * 100)};
      }
      return {
        id,
        children: Array.from({length: childrenPerNode}, (_, i) =>
          createNode(level + 1, `${id}.${i}`)
        )
      };
    }
    return createNode(0, 'root');
  },

  /**
   * Generate network/graph data
   */
  generateNetworkData(nodes: number = 20, density: number = 0.3): {
    nodes: Array<{id: string}>;
    links: Array<{source: string; target: string}>;
  } {
    const nodeList = Array.from({length: nodes}, (_, i) => ({id: `node-${i}`}));
    const links = [];

    for (let i = 0; i < nodes; i++) {
      for (let j = i + 1; j < nodes; j++) {
        if (Math.random() < density) {
          links.push({
            source: `node-${i}`,
            target: `node-${j}`
          });
        }
      }
    }

    return {nodes: nodeList, links};
  }
};
