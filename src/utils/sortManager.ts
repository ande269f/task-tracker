import { taskObject } from "../store/states/taskObjectState"
import taskOrder from "../store/states/taskOrderState"



export const interactiveTaskSort = (userInput: taskObject[], sortTask: taskOrder[]): taskObject[] => {
      return sortTask.map(taskSorting => (
          userInput.find(task => 
            task.uuid === taskSorting.uuid 
          )
      )).filter((task): task is taskObject => task !== undefined); //sørger for at der ikke kan returnere manglende matches
}           //læs op på det her

