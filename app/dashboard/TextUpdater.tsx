import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }: any) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">Enter the initial idea...</label>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
          placeholder="Type something..."
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
