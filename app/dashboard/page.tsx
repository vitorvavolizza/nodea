"use client";

import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  MiniMap,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import TextUpdaterNode from "./TextUpdater";

import "./text-updater-node.css";
import { Button } from "@/components/ui/button";

const rfStyle = {
  backgroundColor: "white",
};

const minimapStyle = {
  height: 120,
};

const initialNodes = [
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: "node-2",
    type: "output",
    targetPosition: "top",
    position: { x: 0, y: 200 },
    data: { label: "node 2" },
  },
  {
    id: "node-3",
    type: "output",
    targetPosition: "top",
    position: { x: 200, y: 200 },
    data: { label: "node 3" },
  },
];

const initialEdges = [
  { id: "edge-1", source: "node-1", target: "node-2", sourceHandle: "a" },
  { id: "edge-2", source: "node-1", target: "node-3", sourceHandle: "b" },
];

const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      // @ts-ignore
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      // @ts-ignore
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Edge | Connection) =>
      // @ts-ignore
      setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="h-full w-full">
      <Button>shadcn button!</Button>
      <ReactFlow
        // @ts-ignore
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        style={rfStyle}
        fitView
        className="h-full w-full"
      >
        <MiniMap style={minimapStyle} zoomable pannable />
        <Controls position="top-left" />
      </ReactFlow>
    </div>
  );
}

export default Flow;
