async function createPostHandler(event) {
    event.preventDefault();
    document.location.replace('/dashboard/new')
}

document.querySelector('#new-post').addEventListener('click', createPostHandler);