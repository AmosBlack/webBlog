const blogSection = document.querySelector(".blogs-section");

db.collection("blogs").get().then((blogs)=>{
    blogs.forEach(blog => {
        if(blog.id != decodeURI(location.pathname.split("/").pop())){
            createBlog(blog)
        }
    })
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += ` 
    <div class="blog-card">
    <img src="${data.bannerImage}" class="blog-image" alt="">
    <h1 class="blog-title">${data.title}</h1>
    <p class="blog-overview">${data.subtitle}</p>
    <a href="/${blog.id}" class="btn dark">read</a>
</div>`;
}