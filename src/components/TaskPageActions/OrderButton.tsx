import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { IconButton } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setSortDirection } from "../../store/slices/sortTaskSlice/sortTaskSlice";
import { useEffect } from "react";


const OrderButton = () => {
    const sortState = useSelector((state: RootState) => state.sortState);
    const dispatch = useDispatch<AppDispatch>();

    // useEffect(() => {
    //     // synkroniser sortDirection i taskOrderSlice med sortState i sortTaskSlice ved mount
    //     dispatch(setSortDirection({ sortDirection: sortState.sortDirection }));
    // }, [])
    

      const handleOrder = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(setSortDirection({ sortDirection: !sortState.sortDirection }));
      };


    // conditional rendering af knaptype
    return (
        <IconButton className="OrderButton" aria-label="Order tasks" onClick={(e) => handleOrder(e)} variant="subtle">
            {sortState.sortDirection ? <FaSortUp /> : <FaSortDown />}  
        </IconButton>
    )

}

export default OrderButton