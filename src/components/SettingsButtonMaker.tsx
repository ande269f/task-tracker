import { IconButton, Menu, SegmentGroup } from "@chakra-ui/react";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  setSortingState,
} from "../store/slices/sortTaskSlice";
import { setDetailsDialogState } from "../store/slices/detailsDialogSlice";
import { setLoginState } from "../store/slices/loginSlice";

export const SettingsButtonMaker = () => {
  // sorteringsmulighederne defineres her - det er dem der vises for brugeren;
  const sortingOption1 = "Custom";
  const sortingOption2 = "Dato";
  const sortingOption3 = "Alfabetisk";

  const dispatch = useDispatch<AppDispatch>();
  const currentSortState = useSelector((state: RootState) => state.sortState);

  const handleSortChange = (sortValue: string | null) => {
    const newSortState = decideSortStateValue(sortValue);
    dispatch(setSortingState({ sortingState: newSortState }));
  };

  const decideSortStateValue = (sortValue: string | null) => {
    switch (sortValue) {
      case sortingOption1:
        return "interactiveOrdering";
      case sortingOption2:
        return "dateCreated";
      case sortingOption3:
        return "alfabeticalOrdering";
      case "interactiveOrdering":
        return sortingOption1;
      case "dateCreated":
        return sortingOption2;
      case "alfabeticalOrdering":
        return sortingOption3;
      default:
        return sortingOption1;
    }
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton aria-label="Settings" variant="ghost">
          <IoSettingsSharp />
        </IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel> Sortering </Menu.ItemGroupLabel>
            <SegmentGroup.Root
              size="xs"
              value={decideSortStateValue(currentSortState.sortingState)}
              onValueChange={(e) => handleSortChange(e.value)}
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Items
                items={[sortingOption1, sortingOption2, sortingOption3]}
              />
            </SegmentGroup.Root>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel> Andet</Menu.ItemGroupLabel>
            <Menu.Item
              value="openDeleteHistoryDialog"
              onClick={() =>
                dispatch(setDetailsDialogState({
                  taskObject: null,
                  dialogboxOpened: true,
                  dialogboxType: "deleteHistoryDialog",
                }))
              }
            >
              Slettede opgaver
            </Menu.Item>
            <Menu.Item
              value="logout"
              onClick={() => 
                dispatch(setLoginState({ loginState: "NOT_LOGGED_IN"}))
              }
              >
              Log ud
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};
