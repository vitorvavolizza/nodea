import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
function TextUpdaterNode({ data, id, isConnectable, onSubmit }: any) {
  const [value, setValue] = useState(data.value || "");

  const onChange = useCallback((evt: any) => {
    setValue(evt.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (evt: any) => {
      evt.preventDefault();
      onSubmit(id, value);
    },
    [onSubmit, value, id]
  );

  const handleKeyDown = useCallback(
    (evt: any) => {
      if (evt.key === "Enter" && !evt.shiftKey) {
        evt.preventDefault();
        handleSubmit(evt);
      }
    },
    [handleSubmit]
  );

  return (
    <HoverCard>
      <div className=" bg-white shadow-lg rounded-lg p-4 w-[300px]">
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {id === "node-1" ? (
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Enter the initial idea
              </label>
            ) : null}
            <textarea
              id="text"
              name="text"
              value={value}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              className="nodrag mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-xs"
              placeholder="Type something..."
              rows={6}
            />
            <HoverCardTrigger className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              +
            </HoverCardTrigger>
          </div>
          <Handle
            type="source"
            position={Position.Right}
            id="a"
            isConnectable={isConnectable}
          />
        </form>
        <HoverCardContent>
          <Button variant="ghost" className="text-gray-600 font-light">
            Add connected node
          </Button>
          <Button variant="ghost" className="text-gray-600 font-light">
            Generate ideas
          </Button>
          <Button variant="ghost" className="text-gray-600 font-light">
            Delete node
          </Button>
        </HoverCardContent>
      </div>
    </HoverCard>
  );
}

export default TextUpdaterNode;
