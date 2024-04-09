import { useCallback } from "react";
import { Handle, Position } from "reactflow";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }: any) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Popover>
    <PopoverTrigger>
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
    </PopoverTrigger>
    <PopoverContent>
      <Button variant="ghost">Add connected node</Button>
      <Button variant="ghost">Generate ideas</Button>
      <Button variant="ghost">Delete node</Button>
      </PopoverContent>
    </Popover>
  );
}

export default TextUpdaterNode;
