export function getLocationDisplay(stadium: string): string {
  // Some stadiums might have city names, we'll extract just the main name
  const mainStadiumName = stadium.split(',')[0];
  
  // Map of cities for stadiums that don't include city names
  const cityMap: Record<string, string> = {
    'Eden Gardens': 'Kolkata',
    'Wankhede': 'Mumbai',
    'M. Chinnaswamy': 'Bangalore',
    'Feroz Shah Kotla': 'Delhi',
    'MA Chidambaram': 'Chennai',
    'Sardar Patel': 'Ahmedabad',
    'Punjab Cricket Association': 'Mohali',
    'Green Park': 'Kanpur'
  };

  const city = cityMap[mainStadiumName] || '';
  return city;
}