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
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

import TextUpdaterNode from "./TextUpdater";

import "./text-updater-node.css";
import { Button } from "@/components/ui/button";

import DownloadButton from "@/components/export";

import { ReactFlowProvider } from "reactflow";

import { useMemo } from "react";
import React from 'react';

import { useEffect } from "react";

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
    data: { value: "" },
  },
];

const initialEdges = [
  { id: "edge-1", source: "node-1", target: "node-2", sourceHandle: "a" },
  { id: "edge-2", source: "node-1", target: "node-3", sourceHandle: "b" },
];

const nodeTypes = { textUpdater: TextUpdaterNode };
const TextUpdaterNodeMemo = React.memo(TextUpdaterNode);

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [lastInteractedNodeId, setLastInteractedNodeId] = useState("");

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      // @ts-ignore
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      // @ts-ignore
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (connection: Edge | Connection) =>
      // @ts-ignore
      setEdges((eds) => addEdge(connection, eds)),
    []
  );

  // Function to add a new node
  const addNewNode = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "textUpdater",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { value: `New node ${nodes.length + 1}` },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  // Function to remove the last node
  const removeLastNode = () => {
    if (nodes.length > 0) {
      setNodes((nds) => nds.slice(0, -1));
    }
  };

  var listOfNodes = nodes;

  const handleNodeSubmit = async (nodeId: string, inputValue: string) => {
    console.log("Innitial nodes: ", nodes);
    console.log(inputValue, '\n',nodeId );

    // Fetch and parse the response    
    console.log("laster interacted node id: ",lastInteractedNodeId)

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idea: inputValue }),
    });

    console.log("after response ", response);


    const parsedResponse = await response.json();
    const generatedNodes = parsedResponse.nodes;

    // Reference node's position
    // const referenceNode = nodes.find((node) => node.id === nodeId);
    const referenceNode = listOfNodes.find((node) => node.id === nodeId);

    if (!referenceNode) return console.log('stupid'); // Exit if reference node is not found

    // Constants for positioning
    const horizontalOffset = 350;
    const verticalSpacing = 250;

    let startPositionY =
      referenceNode.position.y -
      ((generatedNodes.length - 1) / 2) * verticalSpacing;

    const newNodes = generatedNodes.map((node: any, index: number) => ({
      id: `node-${Date.now()}-${index}`,
      type: "textUpdater",
      position: {
        x: referenceNode.position.x + horizontalOffset,
        y: startPositionY + index * verticalSpacing,
      },
      data: { value: node.text },
    }));

    const newEdges = newNodes.map((node: any, index: number) => ({
      id: `edge-${Date.now()}-${index}`,
      source: referenceNode.id,
      target: node.id,
    }));
    
    setNodes((nds) => [...nds, ...newNodes]);
    setEdges((eds) => [...eds, ...newEdges]);
    console.log("List of nodes", nodes); 
    listOfNodes = [...listOfNodes, ...newNodes];
    console.log(listOfNodes)
  }

  const nodeTypes = useMemo(() => ({
    textUpdater: (props) => <TextUpdaterNodeMemo key={props.id} {...props} onSubmit={handleNodeSubmit} />,
  }), []);

  return (
    <ReactFlowProvider>
    <div className="h-full w-full">
      <Button onClick={addNewNode}>Add Node</Button>
      <Button onClick={removeLastNode}>Remove Last Node</Button>
      <ReactFlow
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
        
        <MiniMap style={minimapStyle} />
        <Controls position="top-left" />
        <DownloadButton/>
      </ReactFlow>
    </div>
    </ReactFlowProvider>
  );
}

export default Flow;