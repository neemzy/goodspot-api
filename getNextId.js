module.exports = collection => collection.map(item => item.id).reduce((a, b) => Math.max(a, b), 0) + 1;
