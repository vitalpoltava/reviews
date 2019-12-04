const selectUserReviews = (uid, reviewsTable) => {
  if (!uid || !reviewsTable) {
    return [];
  }

  return reviewsTable.filter(item => item.userId === uid);
};

module.exports = {
  selectUserReviews,
};