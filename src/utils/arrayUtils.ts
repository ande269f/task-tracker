
export const detectDuplicates = (existingTaskTexts: string[], newTaskText: string): boolean => {
  return existingTaskTexts.some(
    (taskText) => taskText == newTaskText
  );
};

