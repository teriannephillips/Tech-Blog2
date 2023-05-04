function deleteFormHandler(event) {
    event.preventDefault();
  
    const postId = event.target.closest('.post-section').id;
    console.log(postId);
  
    fetch(`/api/posts/${postId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      })
      .catch(err => {
        console.log(err);
        alert('Failed to delete post');
      });
  }
  function saveFormHandler(event) {
    event.preventDefault();
    const postSection = event.target.closest('.post-section');
    const postId = event.target.closest('.post-section').id;
    const title = postSection.querySelector('input').value;
    const post = postSection.querySelector('textarea').value;
    console.log(title);
    console.log(post);
  
    fetch(`/api/posts/${postId}`, {
      method: 'PUT',
        body: JSON.stringify({
            title,
            post,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then(response => {
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      })
      .catch(err => {
        console.log(err);
        alert('Failed to edit post');
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const deleteBtns = document.querySelectorAll('.delete-btn');
    if (deleteBtns) {
      deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', deleteFormHandler);
      });
    }
  });
  
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', () => {
      const postSection = button.closest('.post-section');
      const title = postSection.querySelector('.post-title').textContent;
      const post = postSection.querySelector('.post-text').textContent;
      const editBtn = document.querySelector('.edit-btn');
     
      const titleInput = document.createElement('input');
      titleInput.setAttribute('type', 'text');
      titleInput.setAttribute('value', title);
      titleInput.style.width = "100%";
      const postInput = document.createElement('textarea');
      postInput.textContent = post;
      postInput.setAttribute('rows', '5');
      postInput.style.width = "100%";
      const saveBtn = document.createElement('button')
      saveBtn.textContent = 'Save';
      saveBtn.id = 'save-btn';
      postSection.querySelector('.post-title').replaceWith(titleInput);
      postSection.querySelector('.post-text').replaceWith(postInput);
      postSection.querySelector('.edit-btn').replaceWith(saveBtn);
    console.log(saveBtn);
    if (saveBtn) {
        saveBtn.addEventListener('click', saveFormHandler);
      }
    });
  });
    
  