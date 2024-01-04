export const dateWiseDivision = (data) => {
    const dateWiseDivision = data.reduce((acc, curr) => {
      const dateString = new Date(curr.created_at).toDateString();
      const from = curr.from || "Unknown";
      const direction = curr.direction || "outbound";
      const callType = curr.call_type || "missed";
      const key = from + "-" + direction + "-" + callType;
      const prevArr = (acc[dateString] && acc[dateString][key]) || [];
      const newArr = [...prevArr, curr];
      return { ...acc, [dateString]: { ...acc[dateString], [key]: newArr } };
    }, {});
    return dateWiseDivision;
  };
  
  export const padNumberWithZero = (num) => new String(num).padStart(2, "0");
  
  export const convertSecondsInMinAndHour = (durationInSeconds) => {
    let minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return `${padNumberWithZero(hours)}:${padNumberWithZero(
      minutes
    )}:${padNumberWithZero(seconds)}`;
  };
  