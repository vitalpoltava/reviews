const selectUserReviews = (uid, reviewsTable) =>
  !uid || !reviewsTable ? [] : reviewsTable.filter(item => item.userId === uid);

module.exports = {
  selectUserReviews,
};