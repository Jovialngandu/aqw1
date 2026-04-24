export const formatRelativeTime = (isoDate) => {
  const date = new Date(isoDate);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return `Il y a ${Math.floor(interval)} an(s)`;
  interval = seconds / 2592000;
  if (interval > 1) return `Il y a ${Math.floor(interval)} mois`;
  interval = seconds / 86400;
  if (interval > 1) return `Il y a ${Math.floor(interval)} jour(s)`;
  interval = seconds / 3600;
  if (interval > 1) return `Il y a ${Math.floor(interval)}h`;
  interval = seconds / 60;
  if (interval > 1) return `Il y a ${Math.floor(interval)} min`;
  return "À l'instant";
};