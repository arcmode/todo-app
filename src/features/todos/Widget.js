import React from 'react';
import {
  Button,
  Container,
  Header,
  Segment,
} from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  add,
  complete,
  edit,
  remove,
  resetStatus,
  selectTodos,
} from './todosSlice';
import { Todo } from './Todo';

export function Widget({ title }) {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  return (
    <div className='TodoWidget'>
      <Header
        as='h1'
        content={title}
        textAlign='center'
      />
      <Container>
        {
          Object.entries(todos).map(
            ([board, todos], idx) => (
              <Segment.Group key={`board-${idx}`}>
                {
                  todos.map(
                    (todo, idx) => (
                      <Segment key={`todo-${idx}`}>
                        <small>
                          #{idx}
                        </small>
                        <Todo
                          onEdit={(data) =>
                            dispatch(edit({ data, todo: idx, board }))}
                          onComplete={() =>
                            dispatch(complete({ todo: idx, board }))}
                          onRemove={() =>
                            dispatch(remove({ todo: idx, board }))}
                          onResetStatus={() =>
                            dispatch(resetStatus({ todo: idx, board }))}
                          {...todo}
                        ></Todo>
                      </Segment>
                    )
                  )
                }
                <Segment>
                  <Button
                    className='AddTodo'
                    onClick={ () => dispatch(add({ board })) }
                  >
                    Add TODO
                  </Button>
                </Segment>
              </Segment.Group>
            )
          )
        }
      </Container>
    </div>
  );
}
