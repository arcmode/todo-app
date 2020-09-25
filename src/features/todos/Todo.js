import React, { useRef, useEffect } from 'react';
import {
  Button,
  Icon,
  Input,
  Divider,
} from  'semantic-ui-react';
import ContentEditable from 'react-contenteditable';

export function Todo({
  title,
  description,
  status,
  dueDate,
  subtasks,
  categories,
  //
  onEdit,
  onComplete,
  onRemove,
  onResetStatus,
  onAddSubtask,
}) {
  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const dueDateRef = useRef(null);
  const categoriesRef = useRef([]);

  titleRef.current = title;
  descriptionRef.current = description;
  dueDateRef.current = dueDate;
  categoriesRef.current = categories;

  const onChange = () => onEdit({
    categories: categoriesRef.current,
    description: descriptionRef.current,
    dueDate: dueDateRef.current,
    title: titleRef.current,
  });

  return (
    <div>
      <h5>
        <ContentEditable
          style={{padding: '5px'}}
          html={titleRef.current}
          onChange={(evt) => {
            titleRef.current = evt.target.value;
            onChange();
          }}
        />
      </h5>
      <div>
        <ContentEditable
          style={{padding: '5px'}}
          html={descriptionRef.current}
          onChange={(evt) => {
            descriptionRef.current = evt.target.value;
            onChange();
          }}
        />
      </div>
      <small style={{display: 'flex', alignItems: 'baseline'}}>
        <Icon style={{display: 'flex', visibility: categoriesRef.current.length ? 'visible': 'hidden'}} name='tags' color='grey'>
        </Icon>
        <ContentEditable
          style={{padding: '5px', flex: 1}}
          html={categoriesRef.current.join(' ')}
          onChange={(evt) => {
            categoriesRef.current = evt.target.value
              .replace('&nbsp; ', '')
              .split(/\s+/g);
            onChange();
          }}
        />
      </small>
      <Divider />
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex'}}>
          {
            status === 'PENDING' ? (
              <Button onClick={onComplete}>
                Complete
              </Button>
            ) : (
              <Button onClick={onResetStatus}>
                Reset
              </Button>
            )
          }
          <Button onClick={onRemove}>
            Remove
          </Button>
        </div>
        <div style={{display: 'flex'}}>
          <Input size='mini' icon='calendar' type="datetime-local" onChange={(evt) => {
            dueDateRef.current = evt.target.value;
            onChange();
          }} />
        </div>
      </div>
    </div>
  );
}
