export async function loadSpecialDays() {
  try {
    const response = await fetch("days.json");
    if (!response.ok) throw new Error("Failed to load days.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading special days:", error);
    return []; // fallback to empty array so app doesn't crash
  }
}
