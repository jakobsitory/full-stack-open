const dummy = (blogs) => {
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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}