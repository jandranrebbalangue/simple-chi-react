import React from "react";
import useSWR from "swr";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TodosProps, fetcher, addTodo } from "./constants";
import FormModal from "./components/FormModal";

function App() {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data, isLoading, mutate } = useSWR("/todos", fetcher);
  if (isLoading) return <CircularProgress />;
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Anime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item: TodosProps) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <button
        onClick={async () => {
          const newTodo = {
            id: "3",
            text: "oshi no ko",
          };
          await mutate(addTodo(newTodo), {
            optimisticData: [newTodo],
          });
        }}
      >
        Add Todo
      </button>
    </>
  );
}

export default App;
