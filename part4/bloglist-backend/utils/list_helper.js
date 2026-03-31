const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let likeCount = 0

  if (blogs.length > 0)
    blogs.forEach(blog => {
      likeCount += blog.likes
    })

  return likeCount
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > favoriteBlog.likes)
      favoriteBlog = blog
  })

  return favoriteBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return

  let authorList = []

  blogs.forEach(blog => {
    const author = authorList.find((element) => element.author === blog.author)

    if (author)
      author.blogs += 1
    else
      authorList = authorList.concat({
        'author': blog.author,
        'blogs': 1
      })
  })

  authorList.sort((a, b) => b.blogs - a.blogs)

  return authorList[0]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return

  let authorList = []

  blogs.forEach(blog => {
    const author = authorList.find((element) => element.author === blog.author)

    if (author)
      author.likes += blog.likes
    else
      authorList = authorList.concat({
        'author': blog.author,
        'likes': blog.likes
      })
  })

  authorList.sort((a, b) => b.likes - a.likes)

  return authorList[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}