import { Button, Menu } from "@chakra-ui/react";
import { HiDotsHorizontal } from "react-icons/hi";

import { EditTaskOption } from "./EditTaskOption";
import { DeleteTaskOption } from "./DeleteTaskOption";
import { DetailsTaskOption } from "./DetailsTaskOption";


export const TaskOptionStyling = {
  padding: "0.5rem"
};

export const TaskActionsDropdown = () => {


  return (
    <div className="TaskActionsDropdown">
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
          focusRing={"none"}
            aria-label="Open details"
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant="ghost"
          >
            <HiDotsHorizontal />
          </Button>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content className="Dropdown" >
            <EditTaskOption />
            <DetailsTaskOption />
            <DeleteTaskOption />
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </div>
  );
};
