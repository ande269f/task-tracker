import { sortTaskState }  from './../store/slices/sortTaskSlice';
import { taskObject } from "../store/slices/taskSlice"
import { interactiveTaskOrder } from "../store/slices/interactiveTaskOrderSlice"

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
      case "alfabeticalOrdering":
        return alphabetTaskSort(sortingProps)
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
  const copiedUserInput = [...sortingProps.userInput] // laver en kopi og ændre i den, da værdierne kommer direkte fra redux
  return copiedUserInput.sort((a,b) => 
    a.dateCreated.getTime() - b.dateCreated.getTime())
    //bruger date.getTime til at omskrive til num værdi
} 

const alphabetTaskSort = (sortingProps: sortingProps): taskObject[] => {
  const copiedUserInput = [...sortingProps.userInput]
  return copiedUserInput.sort((a,b) => 
    a.taskText
  //regex til kun at bruge letters - specialtegn påvirker ikke sorteringen uventet så
  .replace(/[^0-9a-z]/gi, '')
  .localeCompare(
    b.taskText
    .replace(/[^0-9a-z]/gi, '')
  ))
}