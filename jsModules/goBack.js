// back to previous page

const goBackBtn = document.querySelector('.bx-left-arrow-alt') 

goBackBtn.addEventListener('click', e => {
    history.back()
})