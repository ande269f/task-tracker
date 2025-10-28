import { HStack, Skeleton, Stack } from "@chakra-ui/react";
import "./../TaskCard/TaskCardStyles.scss";

export const TaskSkeleton = ({ howMany, className, height }: { howMany: number, className?: string, height: number }) => {
    //array.from.map er et trick til at lave en loop ud af en number
  return (
    <div>
      {Array.from({ length: howMany }).map((_, i) => (
        <Stack key={i} className={className} gap="none">
          <HStack width="full" />
          <Skeleton height={`${height}px`} maxHeight={`${height}px`} />
        </Stack>
      ))}
    </div>
  );
};
