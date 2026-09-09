const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
});
export const formatDate = (date: Date) => dateFormatter.format(date);
