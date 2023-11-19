export const fuzzySearch = (text: string): RegExp => {
  const regex = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

  return new RegExp(regex, "gi");
};

module.exports = {
  fuzzySearch,
};
