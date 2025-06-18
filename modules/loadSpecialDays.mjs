export async function loadSpecialDays() {
  const response = await fetch("days.json"); // Ask the browser to go fetch (load) days.json
  const data = await response.json(); // Convert that response to actual JS data
  return data; // Give (return) the data to whoever called this function
}
