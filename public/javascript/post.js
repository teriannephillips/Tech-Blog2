async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post= document.querySelector('textarea[name="post-text"]').value.trim();
    console.log(title);
    console.log(post);

    const response = await fetch(`/api/posts/post`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.post-form').addEventListener('submit', newFormHandler);