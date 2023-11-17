// const countNumberOfMinutes = (time) =>{
//   const splitTime = time.split(':');
//   return Number(splitTime[0]) * 60 + Number(splitTime[1]);
// };

// const isMeetingPossible = (beginTime, endTime, beginTimeMeeting, duration) => {
//   beginTime = countNumberOfMinutes(beginTime);
//   endTime = countNumberOfMinutes(endTime);
//   beginTimeMeeting = countNumberOfMinutes(beginTimeMeeting);
//   if (beginTime < endTime && beginTimeMeeting + duration <= endTime && beginTimeMeeting >= beginTime) {
//     return true;
//   }
//   return false;
// };

// isMeetingPossible('08:00', '17:30', '14:00', 90);
// isMeetingPossible('8:0', '10:0', '8:0', 120);
// isMeetingPossible('08:00', '14:30', '14:00', 90);
// isMeetingPossible('14:00', '17:30', '08:0', 90);
// isMeetingPossible('8:00', '17:30', '08:00', 900);
