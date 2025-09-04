const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(process.argv[2])
      .then((students) => {
        let output = 'This is the list of our students\n';

        const fields = Object.keys(students);
        fields.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        fields.forEach((field) => {
          const list = students[field];
          output += `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}\n`;
        });

        response.status(200).send(output.trim());
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(process.argv[2])
      .then((students) => {
        const list = students[major] || [];
        const output = `List: ${list.join(', ')}`;
        response.status(200).send(output);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}

module.exports = StudentsController;
