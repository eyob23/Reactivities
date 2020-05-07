import React, { SyntheticEvent } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const ActivityList: React.FC<IProps> = ({ activities, selectActivity, deleteActivity, submitting, target }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((activity) => {
          console.log(activity.id === target, submitting);
          return (
            <Item key={activity.id}>
              <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>
                    {activity.city}, {activity.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button floated='right' content='View' color='blue' onClick={() => selectActivity(activity.id)} />
                  <Button
                    name={activity.id}
                    loading={target === activity.id && submitting}
                    floated='right'
                    content='Delete'
                    color='red'
                    onClick={(e) => deleteActivity(e, activity.id)}
                  />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;