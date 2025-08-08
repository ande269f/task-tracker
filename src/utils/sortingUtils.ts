import sortTaskState from './../store/states/sortTaskState';
import { taskObject } from "../store/states/taskObjectState"
import { interactiveTaskOrder } from "../store/states/interactiveTaskOrderState"

interface sortingProps {
  userInput: taskObject[]
  sortTask: interactiveTaskOrder[] 
  sortingState: sortTaskState
}



export const handleSorting = (sortingProps: sortingProps): taskObject[] => {
    switch (sortingProps.sortingState.sortingState) {
      case "interactiveOrdering": 
        return interactiveTaskSort(sortingProps)
      case "dateCreated": 
        return dateTaskSort(sortingProps)
      default:
        return interactiveTaskSort(sortingProps)
  }
}

const handleSortingDirection = (sortingDirection: boolean, userInput: taskObject[]): taskObject[] => {
  const copiedUserInput = [...userInput] // laver en kopi for at undgå potentielle problemer i react
  return sortingDirection ? copiedUserInput : copiedUserInput.reverse()
}

const interactiveTaskSort = (sortingProps: sortingProps): taskObject[] => {

  sortingProps.sortTask.map(taskSorting => (
      sortingProps.userInput.find(task => 
        task.uuid === taskSorting.uuid 
      )
  )).filter((task): task is taskObject => task !== undefined); //sørger for at der ikke kan returnere manglende matches
              //læs op på det her
  const sortedOutput = handleSortingDirection(sortingProps.sortingState.sortDirection, sortingProps.userInput)

  return sortedOutput
}           

const dateTaskSort = (sortingProps: sortingProps): taskObject[] => {
  sortingProps.userInput.sort((a,b) => 
    b.dateCreated.getDate.prototype.getTime() - a.dateCreated.getDate.prototype.getTime())
    //bruger date.prototype.getTime til at omskrive til num værdi

  const sortedOutput = handleSortingDirection(sortingProps.sortingState.sortDirection, sortingProps.userInput)

  return sortedOutput
} 

