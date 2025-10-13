import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { IconButton } from "@chakra-ui/react"
import { useSelector } from "react-redux";
import { RootState } from "../../store";


const OrderButton = ({handleOrder}: {handleOrder: Function}) => {
    const sortState = useSelector((state: RootState) => state.sortState);


    // conditional rendering af knaptype
    return (
        <IconButton className="OrderButton" aria-label="Order tasks" onClick={(e) => {e.stopPropagation(); handleOrder();}} variant="subtle">
            {sortState.sortDirection ? <FaSortUp /> : <FaSortDown />}  
        </IconButton>
    )

}

export default OrderButton