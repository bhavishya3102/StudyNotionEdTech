export const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }
  
  /** Example date string
const dateStr = '2023-05-15';

// Format the date using the formattedDate function
const formatted = formattedDate(dateStr);

// Output the formatted date
console.log(formatted); // Output: May 15, 2023 */