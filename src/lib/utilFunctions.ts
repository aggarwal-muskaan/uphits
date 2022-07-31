export const getBgColor = (id: number) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};
