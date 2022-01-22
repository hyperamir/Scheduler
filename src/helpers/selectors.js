export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter((d) => d.name === day);

  if (filteredDay.length === 0) {
    return [];
  }
  const appointmentsArray = filteredDay[0].appointments;

  const appointments = [];
  for (const elm of appointmentsArray) {
    if (state.appointments[elm]) {
      appointments.push(state.appointments[elm]);
    }
  }
  return appointments;
}


export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return {
    student: interviewer.name,
    interviewer
  }
}