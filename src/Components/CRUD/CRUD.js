import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../../Redux/TodoSlice";
import axios from "axios";
import moment from "moment";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpdateIcon from "@material-ui/icons/Update";
import "./CRUD.css";

function CRUD() {
  const [todoS, setTodoS] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDes, setTodoDes] = useState("");

  const [updatedTodoTitle, setUpdatedTodoTitle] = useState("");
  const [updatedTodotDes, setUpdatedTodotDes] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [id, setId] = useState(null);

  const dispatch = useDispatch();
  const stateTodos = useSelector((state) => state.todos);
  const API_Key = "c523c7b09faaa08c136a96a5665d0308";

  const getLocation = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
    console.log(position.coords.latitude, position.coords.longitude);
  };
  let time = new Date().getTime();
  useEffect(() => {
    setTodoS(stateTodos.todos);
    getLocation();
    console.log("coordinates", lat, long);
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${long}&dt=${time}&appid=${API_Key}`
      )
      .then((res) => {
        console.log("openweathermap response", res);
      });
  });

  return (
    <div className="todoContainer">
      <form>
        <input
          className="form-control-sm"
          type="text"
          name="todoTitle"
          placeholder="todoTitle"
          value={todoTitle}
          onChange={(e) => {
            setTodoTitle(e.target.value);
          }}
        />
        <input
          className="form-control-sm"
          type="text"
          name="todoDes"
          placeholder="Todo  description"
          value={todoDes}
          onChange={(e) => {
            setTodoDes(e.target.value);
          }}
        />
        <button
          className="btn border"
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              addTodo({
                id: todoS.length + 1,
                todoTitle,
                todoDes,
                createdAt: String(moment(new Date()).format("MMM Do YY")),
              })
            );
            setTodoTitle("");
            setTodoDes("");
          }}
        >
          add
        </button>
      </form>

      <div>
        {todoS.length > 0 ? (
          todoS.map((todo) => (
            <div className="d-flex justify-content-center" key={todo.id}>
              <div className="mx-1">{todo.todoTitle}</div>
              <div className="mx-1">{todo.todoDes}</div>
              <div className="mx-1">{todo.createdAt}</div>

              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => {
                  setIsEdited(true);
                  setId(todo.id);
                }}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteTodo(todo.id));
                }}
              >
                Delete
              </Button>

              <br />
              {isEdited && id == todo.id && (
                <div>
                  <input
                    className="form-control-sm"
                    type="text"
                    placeholder="update Todo name"
                    onChange={(e) => setUpdatedTodoTitle(e.target.value)}
                  />
                  <input
                    className="form-control-sm"
                    type="text"
                    placeholder="update Todo Des"
                    onChange={(e) => setUpdatedTodotDes(e.target.value)}
                  />

                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<UpdateIcon />}
                    onClick={() => {
                      dispatch(
                        updateTodo({
                          id: todo.id,
                          title: updatedTodoTitle,
                          description: updatedTodotDes,
                        })
                      );
                      setIsEdited(false);
                    }}
                  >
                    Update
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>There are no Todos to show </div>
        )}
      </div>
    </div>
  );
}

export default CRUD;
