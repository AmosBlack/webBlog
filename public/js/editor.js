const blogTitleField = document.querySelector(".title")
const blogSubTitleField = document.querySelector(".subtitle")
const articleField = document.querySelector(".article")

//banner
const bannerImage = document.querySelector("#banner-upload")
const banner = document.querySelector(".banner")
let bannerPath;

const publishBtn = document.querySelector(".publish-btn")
const uploadInput = document.querySelector('#image-upload')

bannerImage.addEventListener("change", ()=>{
    uploadImage(bannerImage, "banner")
})

uploadInput.addEventListener("change", ()=>{
    uploadImage(uploadInput, "image") 
});

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append("image", file);

        fetch('/upload', {
            method: "POST",
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);
            } else{
                bannerPath = `https://web-blog-orcin.vercel.app//${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else {
        alert("Upload Images Only!")
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);

}

publishBtn.addEventListener("click", () => {
    if(articleField.value.length && blogTitleField.value.length){
        // generating id
        let letters = "abcdefghijklmnopqrstuvwxyz";
        let blogTitle = blogTitleField.value.split(" ").join("-").toLowerCase();
        let id = "";
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }
        // setting up docNaame  
        let docName = `${blogTitle}-${id}`;
        let date = new Date(); // for blog metadata
        //access firestore with db 
        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            subtitle: blogSubTitleField.value,
            article: articleField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        })
        .then(() => {
            location.href = `/${docName}`
        })
        .catch((err) => {
            console.error(err);
            console.log("not cool")
        })
    }
})