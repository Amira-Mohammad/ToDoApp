import { createSlice } from "@reduxjs/toolkit";

export const TodoSlice = createSlice({
  name: "counter",
  initialState: {
    todos: [
      {
        id: Math.random(),
        todoTitle: "todo1",
        todoDes: "todoDes1",
        Checked: false,
        createdAt: "30-12-2022",
        FinishedAt: "",
        ArchiveAt: "",
      },
      {
        id: Math.random(),
        todoTitle: "todo2",
        todoDes: "todoDes2",
        createdAt: "31-12-2022",
        FinishedAt: "",
        ArchiveAt: "",
      },
      {
        id: Math.random(),
        todoTitle: "todo3",
        todoDes: "todoDes3",
        createdAt: "28-12-2022",
        FinishedAt: "",
        ArchiveAt: "",
      },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      console.log(action);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (action.payload.todoTitle !== "" && action.payload.todoDes !== "") {
        state.todos.push(action.payload);
        console.log("addTodoaddTodoaddTodo", action.payload);
      } else {
        alert("you can not add empty todo");
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id != action.payload);
    },
    updateTodo: (state, action) => {
      state.todos.map((todo) => {
        if (todo.id == action.payload.id) {
          todo.todo = action.payload.title;
          todo.todoDes = action.payload.description;
          console.log("action.payload.title", action.payload.title);
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, updateTodo } = TodoSlice.actions;

export default TodoSlice.reducer;
