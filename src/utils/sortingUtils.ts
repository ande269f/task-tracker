import { TaskEdit } from "./../store/slices/taskEditsSlice/taskEditsSlice";
import {
  sortTaskState,
} from "../store/slices/sortTaskSlice/sortTaskSlice";
import { taskObject } from "../store/slices/taskSlice/taskSlice";
import { interactiveTaskOrder } from "../store/slices/taskOrderSlice/taskOrderSlice";

interface sortingProps {
  userInput: taskObject[];
  sortTask: interactiveTaskOrder[];
  sortingState: sortTaskState;
}

export const handleSorting = (sortingProps: sortingProps): taskObject[] => {
  const sortingState = sortingProps.sortingState.sortingState;
  const sortDirection = sortingProps.sortingState.sortDirection;

  var sortedData;
  switch (sortingState) {
    case "interactiveOrdering":
      return interactiveTaskSort(sortingProps);
    case "dateCreated":
      sortedData = dateTaskSort(sortingProps);
      return handleSortingDirection(sortDirection, sortedData);
    case "alfabeticalOrdering":
      sortedData = alphabetTaskSort(sortingProps);
      return handleSortingDirection(sortDirection, sortedData);
    default:
      return interactiveTaskSort(sortingProps);
  }
};

const handleSortingDirection = (
  sortingDirection: boolean,
  userInput: taskObject[]
): taskObject[] => {
  const copiedUserInput = [...userInput]; // laver en kopi for at undgå potentielle problemer i react
  return sortingDirection ? copiedUserInput : copiedUserInput.reverse();
};

const interactiveTaskSort = (sortingProps: sortingProps): taskObject[] => {
  const sortedSortTasks = [...sortingProps.sortTask];
  //mapper sorttasks til tasks og returnere matches
  return sortedSortTasks
    .map((taskSorting) =>
      sortingProps.userInput.find((task) => task.taskUuid === taskSorting.uuid)
    )
    .filter((task): task is taskObject => task !== undefined); //sørger for at der ikke kan returnere manglende matches
  //læs op på det her
};

const dateTaskSort = (sortingProps: sortingProps): taskObject[] => {
  const copiedUserInput = [...sortingProps.userInput]; // laver en kopi og ændre i den, da værdierne kommer direkte fra redux
  return copiedUserInput.sort(
    (a, b) => a.taskCreated.getTime() - b.taskCreated.getTime()
  );
  //bruger date.getTime til at omskrive til num værdi
};

export const dateTaskEditsSort = (sortingProps: TaskEdit[]): TaskEdit[] => {
  const copiedUserInput = [...sortingProps]; // laver en kopi og ændre i den, da værdierne kommer direkte fra redux
  return copiedUserInput.sort(
    (a, b) => b.dateEdited.getTime() - a.dateEdited.getTime()
  );
  //bruger date.getTime til at omskrive til num værdi
};

const alphabetTaskSort = (sortingProps: sortingProps): taskObject[] => {
  const copiedUserInput = [...sortingProps.userInput];
  return copiedUserInput.sort((a, b) =>
    a.taskText
      //regex til kun at bruge letters - specialtegn påvirker ikke sorteringen uventet så
      .replace(/[^0-9a-z]/gi, "")
      .localeCompare(b.taskText.replace(/[^0-9a-z]/gi, ""))
  );
};
