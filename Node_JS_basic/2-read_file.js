const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    const counters = {};

    for (let index = 1; index < lines.length; index += 1) {
      const line = lines[index];
      const [firstName, , , field] = line.split(',');

      if (field) {
        counters[field] = counters[field] || { count: 0, names: [] };
        counters[field].count += 1;
        counters[field].names.push(firstName.trim());
      }
    }

    console.log(`Number of students: ${lines.length - 1}`);
    for (const field in counters) {
      if (Object.prototype.hasOwnProperty.call(counters, field)) {
        console.log(
          `Number of students in ${field}: ${
            counters[field].count
          }. List: ${counters[field].names.join(', ')}`,
        );
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
