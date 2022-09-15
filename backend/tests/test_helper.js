const Blog = require('../models/blog')

const initialBlogPosts = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Another Useless Blog Post',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/lorem.html',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f0',
    title: 'I am beautiful',
    author: 'Oleksandr A. Pylypenko',
    url: 'http://lekspyl.com',
    likes: 4,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17d0',
    title: 'I am wonderful',
    author: 'Oleksandr A. Pylypenko',
    url: 'http://lekspyl.com',
    likes: 3,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f1',
    title: 'How to be a pig',
    author: 'Peppe the Pig',
    url: 'http://pepe-the-pig.com/how-to-be-a-pig.html',
    likes: 1,
    __v: 0
  }
]

const nonExistingId = async () => {
  const blogPost = new Blog({
    title: 'willremovethissoon',
    author: 'doesntmatter',
    url: 'about://blank',
    likes: 0
  })
  await blogPost.save()
  await blogPost.remove()

  return blogPost._id.toString()
}

const blogPostsInDb = async () => {
  const blogPosts = await Blog.find({})
  return blogPosts.map(blogPost => blogPost.toJSON())
}

module.exports = {
  initialBlogPosts, nonExistingId, blogPostsInDb
}
