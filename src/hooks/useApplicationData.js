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

        const updatedDays = updateSpots(appointments, state.days);
        setState({
          ...state,
          appointments,
          days: updatedDays
        });
      })
  }

  const updateSpots = (appointments, days) => {
    let appointmentsId = [];
    let newSpotsCount = 0;
    const updatedDays = days.map((singleDay) => {
      if (singleDay.name === state.day) {
        appointmentsId = singleDay.appointments;

        for (let singleAppointmentKey in appointments) {
          const singleAppointment = appointments[singleAppointmentKey];

          if (appointmentsId.includes(singleAppointment.id)) {

            if (!singleAppointment.interview) {
              newSpotsCount++;

            }
          }
        }
        singleDay.spots = newSpotsCount;
      }
      return singleDay;
    });

    return updatedDays;
  }


  function cancelInterview(id) {
    const appointment = state.appointments[id];
    const cancelAppointment = { ...appointment };
    cancelAppointment.interview = null;

    const newAppointments = { ...state.appointments }
    newAppointments[id] = cancelAppointment;


    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        const updatedDays = updateSpots(newAppointments, state.days);
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