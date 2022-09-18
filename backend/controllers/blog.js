const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogPosts = await Blog.find({})
  return response.json(blogPosts)
})

blogRouter.get('/:id', async (request, response) => {
  const blogPost = await Blog.findById(request.params.id)
  if (blogPost) {
    response.json(blogPost)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!request.body.title && !request.body.url) {
    return response.status(400).json({ error: 'title and url must be provided'})
  } else {
    const savedBlogPost = await blog.save()
    return response.status(201).json(savedBlogPost)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blogPost = await Blog.findById(request.params.id)

  blogPost.likes = body.likes

  try {
    const updatedBlogPost = await blogPost.save()
    return response.status(200).json(updatedBlogPost)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter
