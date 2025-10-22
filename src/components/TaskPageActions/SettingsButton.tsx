import { IconButton, Menu, SegmentGroup } from "@chakra-ui/react";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setSortingState } from "../../store/slices/sortTaskSlice/sortTaskSlice";
import { setDetailsDialogState } from "../../store/slices/detailsDialogSlice/detailsDialogSlice";
import { setUserLoggedOut } from "../../store/slices/loginSlice/loginSlice";
import { deleteUserAndLogout } from "../../store/slices/loginSlice/thunks";

export const SettingsButton = () => {
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
    <div className="Dropdown SettingsButton">
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton aria-label="Settings" variant="subtle">
            <IoSettingsSharp />
          </IconButton>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel className="SegmentGroup">
                {" "}
                Sortering{" "}
              </Menu.ItemGroupLabel>
              <SegmentGroup.Root
                className="SettingsOption"
                size="xs"
                value={decideSortStateValue(currentSortState.sortingState)}
                onValueChange={(e) => handleSortChange(e.value)}
              >
                <SegmentGroup.Indicator />
                <SegmentGroup.Items
                  className="SegmentGroup"
                  focusRing={"none"}
                  items={[sortingOption1, sortingOption2, sortingOption3]}
                />
              </SegmentGroup.Root>
            </Menu.ItemGroup>
            <Menu.Separator />
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel className="SettingsOption">
                {" "}
                Andet
              </Menu.ItemGroupLabel>
              <Menu.Item
                className="SettingsOption"
                value="openDeleteHistoryDialog"
                onClick={() =>
                  dispatch(
                    setDetailsDialogState({
                      taskObject: null,
                      dialogboxOpened: true,
                      dialogboxType: "deleteHistoryDialog",
                    })
                  )
                }
              >
                Papirkurv
              </Menu.Item>
              <Menu.Item
                className="SettingsOption"
                value="logout"
                onClick={() => dispatch(setUserLoggedOut())}
              >
                Log ud
              </Menu.Item>
              <Menu.Item
                className="SettingsOption"
                value="deleteUser"
                color={"red"}
                onClick={() => dispatch(deleteUserAndLogout())}
              >
                Slet bruger
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </div>
  );
};
