
async function commentFormHandler(event) {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    const url = document.URL
    let urlArray = url.split('/')
    let postId = urlArray[4];


    if (comment && postId) {
        const response = await fetch('/api/comments/', {
            method: 'post',
            body: JSON.stringify({
                postId,
                comment
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
           document.location.reload();
        } else {
             alert("You must be logged in to comment!");
            document.location.replace('/login')
        }
 }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);