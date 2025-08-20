import { Button } from "@chakra-ui/react";
import { HiDotsHorizontal } from "react-icons/hi";



export const DetailsButtonMaker = ({handleDetailsButtonMaker}: {handleDetailsButtonMaker: Function}) => {

  return (
    <div>
        <Button
        aria-label="Open details"
        onClick={(e) => { handleDetailsButtonMaker();  e.stopPropagation();}}
        variant="ghost"
        >
            <HiDotsHorizontal />
        </Button>
    </div>
  )
}