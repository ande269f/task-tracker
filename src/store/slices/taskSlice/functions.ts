import { UUIDTypes } from 'uuid';
export const arrayLengthMismatch = (
  tasksLength: number,
  sortTasksLength: number,
  warningText: string
): boolean => {
  if (tasksLength !== sortTasksLength) {
    warningText !== "" &&
      console.warn(
        warningText +
          " antal sortTasks: " +
          sortTasksLength +
          ", antal tasks: " +
          tasksLength
      );

    return true;
  } else return false;
};

// måde at gøre matching general, ved at bruge "gettere" til uuid'er
export const makeArray1LenMatchArray2 = <A, B, UUIDTypes>(
  array1: A[],
  array2: B[],
  getUuidA: (item: A) => UUIDTypes,
  getUuidB: (item: B) => UUIDTypes
): A[] => {
  try {
    const uuidsB = new Set(array2.map(getUuidB));
    const newArray1Length = array1.filter((a) => uuidsB.has(getUuidA(a)));

    console.info(
        "Successfully matched arrays!" +
        " fjernet " +
        (array1.length - Array.from(uuidsB).length) +
        " elementer." + 
        " Ny længde: " + newArray1Length.length
    );

    return newArray1Length;
  } catch (e) {
    console.error("Fejl ved matching af arrays: " + e);
    return array1;
  }
};
