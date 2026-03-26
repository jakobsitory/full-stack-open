const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likeCount = 0

    if (blogs.length > 0)
        blogs.map(blog => {
            console.log(blog.likes)
            likeCount += blog.likes
        })
    
    return likeCount
}

module.exports = {
    dummy,
    totalLikes,
}