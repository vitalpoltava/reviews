// Get Data
let users = require('./data/users');
let reviews = require('./data/reviews');

const selectAllUsers = () => {
  return users;
};

const addUser = (request) => {
  if (!request || !request.name) {
    return false;
  }
  const uuid = `f${(+new Date).toString(16)}`;
  users.push({id: uuid, name: request.name});
  return uuid;
};

const selectUserReviews = (uid) => {
  const selected = !uid ? [] : reviews.filter(item => item.userId === uid);
  return selected.map(review => {
    const user = users.find(user => user.id === review.reviewedUserId) || {};
    return {...review, reviewedUser: user.name};
  });
};

const deleteReview = (uid, reviewId) => {
  const initialLength = reviews.length;
  reviews = reviews.filter(review => review.id !== reviewId && review.userId === uid);
  return reviews.length !== initialLength;
};

module.exports = {
  selectUserReviews,
  deleteReview,
  selectAllUsers,
};