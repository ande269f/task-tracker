import sortTaskState from './../store/states/sortTaskState';
import { taskObject } from "../store/states/taskObjectState"
import { interactiveTaskOrder } from "../store/states/interactiveTaskOrderState"

interface sortingProps {
  userInput: taskObject[]
  sortTask: interactiveTaskOrder[] 
  sortingState: sortTaskState
}

export const handleSorting = (sortingProps: sortingProps): taskObject[] => {

  const sortingType = (sortingState: string) => {
    switch (sortingState) {
      case "interactiveOrdering": 
        return interactiveTaskSort(sortingProps)
      case "dateCreated": 
        return dateTaskSort(sortingProps)
      default:
        return interactiveTaskSort(sortingProps)
    }
  }

  var sortedTasks = sortingType(sortingProps.sortingState.sortingState)
  sortedTasks = handleSortingDirection(sortingProps.sortingState.sortDirection, sortedTasks)

  return sortedTasks

}

const handleSortingDirection = (sortingDirection: boolean, userInput: taskObject[]): taskObject[] => {
  const copiedUserInput = [...userInput] // laver en kopi for at undgå potentielle problemer i react
  return sortingDirection ? copiedUserInput : copiedUserInput.reverse()
}

const interactiveTaskSort = (sortingProps: sortingProps): taskObject[] => {
  return sortingProps.sortTask.map(taskSorting => (
      sortingProps.userInput.find(task => 
        task.uuid === taskSorting.uuid 
      )
  )).filter((task): task is taskObject => task !== undefined); //sørger for at der ikke kan returnere manglende matches
              //læs op på det her
}           

const dateTaskSort = (sortingProps: sortingProps): taskObject[] => {
  return sortingProps.userInput.sort((a,b) => 
    b.dateCreated.getDate.prototype.getTime() - a.dateCreated.getDate.prototype.getTime())
    //bruger date.prototype.getTime til at omskrive til num værdi
} 

