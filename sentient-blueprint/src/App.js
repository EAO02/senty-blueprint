import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

function App() {
  const [input, setInput] = useState('');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [blueprint, setBlueprint] = useState(null);

  const generateBlueprint = () => {
    if (!input.trim()) return;

    // Fake blueprint generator for demo
    const newBlueprint = {
      name: "Custom Agent",
      description: input,
      steps: [
        { id: '1', label: 'Input' },
        { id: '2', label: 'Process' },
        { id: '3', label: 'Output' }
      ]
    };

    setBlueprint(newBlueprint);

    // Convert steps into nodes + edges
    const newNodes = newBlueprint.steps.map((step, i) => ({
      id: step.id,
      data: { label: step.label },
      position: { x: 100 + i * 150, y: 150 }
    }));

    const newEdges = [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' }
    ];

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const exportBlueprint = () => {
    if (!blueprint) return;
    const blob = new Blob([JSON.stringify(blueprint, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blueprint.json";
    a.click();
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "1rem", background: "#222", color: "#fff" }}>
        <h2>⚡ Sentient Agent Blueprint Generator</h2>
      </header>

      <div style={{ padding: "1rem", display: "flex", gap: "0.5rem" }}>
        <input
          style={{ flex: 1, padding: "0.5rem" }}
          placeholder="Describe the agent you want..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={generateBlueprint} style={{ padding: "0.5rem 1rem" }}>
          Generate
        </button>
        <button onClick={exportBlueprint} style={{ padding: "0.5rem 1rem" }} disabled={!blueprint}>
          Export JSON
        </button>
      </div>

      <div style={{ flex: 1, border: "1px solid #ddd" }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;