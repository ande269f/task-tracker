import { Table } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export const TaskDetailsTable = () => {
  const task = useSelector(
    (state: RootState) => state.detailsOpener.taskObject
  );

  return (
    <Table.Root unstyled width={"100%"}>
      <Table.Caption />

      <Table.Body>
        <Table.Row>
          <Table.Cell>Oprettet</Table.Cell>
          <Table.Cell textAlign="right">
            {task?.taskCreated.toLocaleString("en-UK")}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Status</Table.Cell>
          <Table.Cell textAlign="right">
            {task?.taskCompleted ? "Fuldført" : "Aktiv"}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Uuid</Table.Cell>
          <Table.Cell textAlign="right">{task?.taskUuid}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};
