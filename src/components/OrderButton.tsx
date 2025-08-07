import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { Button, Group, IconButton, Input } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setTextInput } from "../store/slices/textInputSlice";
import { setSortOrder } from "../store/slices/sortTasksSlice";
import { useState } from "react";
import {v4 as uuid, UUIDTypes} from 'uuid';
import { Toaster, toaster } from "./ui/toaster"
import { MdDelete } from "react-icons/md";

const OrderButton = () => {
    return (
        <IconButton aria-label="Order tasks" onClick={(e) => {e.stopPropagation(); handleOrder();}}>
            <FaSortDown />
        </IconButton>
    )
}