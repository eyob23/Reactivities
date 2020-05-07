import React, { useEffect, useState, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../../api/agent';
import LoadingComponent from './LoadingComponent';

export default function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [target, setTarget] = useState('');
  const handleSelectedActivity = (id: string | null) => {
    setSelectedActivity(id === null ? null : activities.filter((a) => a.id === id)[0]);
  };
  const fetchActivity = () => {
    agent.Activities.list()
      .then((response) => {
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchActivity();
  }, []);
  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.updated(activity)
      .then(() => {
        setActivities([...activities.filter((act) => activity.id !== act.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => setActivities([...activities.filter((act) => id !== act.id)]))
      .then(() => setSubmitting(false));
  };

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  if (loading) return <LoadingComponent content='Loading activities...' />;
  return (
    <>
      <NavBar handleOpenCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          editActivity={handleEditActivity}
          createActivity={handleCreateActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </>
  );
}
