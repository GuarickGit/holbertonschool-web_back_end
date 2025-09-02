const fs = require('fs');

async function countStudents(path) {
  let data;

  try {
    data = await fs.promises.readFile(path, 'utf8');
  } catch (err) {
    throw new Error('Cannot load the database');
  }

  const splittedData = data.split('\n');

  const lines = splittedData.slice(1).filter((line) => line.trim() !== '');

  const students = lines.map((line) => line.split(','));

  const groups = {};

  students.forEach((student) => {
    const firstname = student[0];
    const field = student[student.length - 1];

    if (!groups[field]) {
      groups[field] = [];
    }

    groups[field].push(firstname);
  });

  console.log(`Number of students: ${students.length}`);

  for (const field in groups) {
    if (Object.prototype.hasOwnProperty.call(groups, field)) {
      console.log(`Number of students in ${field}: ${groups[field].length}. List: ${groups[field].join(', ')}`);
    }
  }
}

module.exports = countStudents;
