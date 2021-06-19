const defaultOpts = {
  day: "numeric",
  month: "short",
  year: "numeric"
};

export default function(dateString, options = defaultOpts) {
  return new Date(dateString).toLocaleDateString(undefined, options);
}
