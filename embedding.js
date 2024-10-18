const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

/* Version 1 
async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = 'Jurgen Geitner';
  course.save();
}
  */

/* Version 2 */
async function updateAuthor(courseId) {
  const course = await Course.updateOne({ _id: courseId }, {
    $set: {
      'author.name': 'Roberto Marley'
    }
    /* to remove
      $unset: {
      'author.name': ''
    } */
  });
}

//updateAuthor('67122ac471e653e4af8c5661');

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.deleteOne();
  course.save();
}

//addAuthor('6712758024e58b91015c6648', new Author({ name: 'Amy'}));

removeAuthor('6712758024e58b91015c6648', '67127774405a10c17352f45c');