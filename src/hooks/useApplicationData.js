import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ])
      .then((all) => {
        setState(prev => ({
          ...prev, days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      })
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {

        const updatedDays = updateSpots(state, appointments);
        setState({
          ...state,
          appointments,
          days: updatedDays
        });
      })
  }


  const getSpotsForDay = function (dayObj, appointments) {
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  }

  const updateSpots = function (state, appointments, id) {
  
    const dayObj = state.days.find(day => day.name === state.day);
    const spots = getSpotsForDay(dayObj, appointments);
  
    const day = { ...dayObj, spots };
  
    const newDays = state.days.map(d => d.name === state.day ? day : d);
  
    return newDays;
  };


  function cancelInterview(id) {
    const appointment = state.appointments[id];
    const cancelAppointment = { ...appointment };
    cancelAppointment.interview = null;

    const newAppointments = { ...state.appointments }
    newAppointments[id] = cancelAppointment;


    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        const updatedDays = updateSpots(state, newAppointments);
        setState({
          ...state,
          appointments: newAppointments,
          days: updatedDays
        })
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}