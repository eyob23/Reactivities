import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
interface IProps {
  setEditMode: (editMode: boolean) => void;
  selectedActivity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  key: string;
  submitting: boolean;
}
const ActivityForm: React.FC<IProps> = ({ setEditMode, selectedActivity, createActivity, editActivity, submitting }) => {
  const [activity, setActivity] = useState(selectedActivity);

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (!activity.id) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity?.title} />
        <Form.TextArea onChange={handleInputChange} name='description' rows={2} placeholder='Description' value={activity?.description} />
        <Form.Input onChange={handleInputChange} name='category' placeholder='Category' value={activity?.category} />
        <Form.Input onChange={handleInputChange} name='date' type='datetime-local' placeholder='Date' value={activity?.date} />
        <Form.Input onChange={handleInputChange} name='city' placeholder='City' value={activity?.city} />
        <Form.Input onChange={handleInputChange} name='venue' placeholder='Venue' value={activity?.venue} />
        <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
        <Button floated='right' type='button' content='Cancel' onClick={() => setEditMode(false)} />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
