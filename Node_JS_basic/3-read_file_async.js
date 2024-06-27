const fs = require('fs').promises;

function Person(data) {
  const [firstname, lastname, age, field] = data.split(',');
  this.firstname = firstname.trim();
  this.lastname = lastname.trim();
  this.age = parseInt(age.trim(), 10);
  this.field = field.trim();
}

function getPersons(persons) {
  const personObj = [];
  if (Array.isArray(persons)) {
    persons.shift();
    persons.forEach((p) => personObj.push(new Person(p)));
  }
  return personObj;
}

function getInfo(personObj, field, condition) {
  let total = 0;
  const names = [];
  if (Array.isArray(personObj)) {
    personObj.forEach((p) => {
      if (p[field] === condition) {
        total += 1;
        names.push(p.firstname);
      }
    });
  }
  return {
    total,
    names,
  };
}

function stats(persons) {
  const personObj = getPersons(persons);
  const cs = getInfo(personObj, 'field', 'CS');
  const swe = getInfo(personObj, 'field', 'SWE');

  console.log(`Number of students: ${personObj.length}`);
  console.log(`Number of students in CS: ${cs.total}. List: ${cs.names.join(', ')}`);
  console.log(`Number of students in SWE: ${swe.total}. List: ${swe.names.join(', ')}`);
}

async function countStudents(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const persons = content.split('\n').filter((line) => line.trim() !== '');
    stats(persons);
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
