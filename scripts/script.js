$(document).ready(function() {
    //create an instance of the app

    let baseUrl = "https://pyc.somee.com"
    let localBaseUrl = "https://localhost:44397"
    let myUrl = "https://ebisike.github.io/pyc/"

    var username = ''
    var myApp = new App(baseUrl)


    //auto get data after 1sec
    //setInterval(myApp.fetchComments(), 1000)
    setInterval(function() {
        myApp.fetchComments()
    }, 1000)

    //check if this app instance has a username set in localstorage
    if (!myApp.isUsernameSet()) {
        //call the function to get the user to input username
        console.log("from gehe")
        username = myApp.enterUsername();
    }

    console.log(document.querySelectorAll('.addUsernameHere'))
    document.querySelectorAll('.addUsernameHere').forEach(item => {
        item.textContent = ""
        item.append(myApp.getUsername())
    })

    //listen for action to add a new comment
    document.querySelector(".add-comment").addEventListener('click', (e) => {
        $('#newComment').modal('show')
    })

    //listen for the clear event
    //console.log(document.querySelector('#clear'))
    document.querySelector('#clear').addEventListener('click', (e) => {
        document.querySelector('#commentInput').value = ""
    })


    //listen for form submission
    document.querySelector('#form').addEventListener('submit', (e) => {
        $('#newComment').modal('hide')
        e.preventDefault()
            // console.log("locall storage user ", nativeUser)
            // console.log("Form user ", document.querySelector('#usernameInput').value)

        //submit the comment
        myApp.postComment()
        myApp.fetchComments()
    })


    /************************************************************ UPDATE SCRIPTS STARTS HERE ******************************/
    //listen for edit action
    document.querySelector('#commentDiv').addEventListener('click', (e) => {
        if (e.target.classList.contains("edit") || e.target.classList.contains("fa-pencil")) {
            myApp.fetchCommentForEditing(e.target.id)
            $('#editModal').modal('show')

            document.querySelector('#editForm').addEventListener('submit', (e) => {
                e.preventDefault()
                    //console.log(document.querySelector('#editId').value)
                var editData = {
                    Username: myApp.getUsername(),
                    Comment: document.querySelector('#editCommentInput').value,
                    Time: document.querySelector('#editTime').value,
                    Date: document.querySelector('#editDate').value
                }
                let commentID = document.querySelector('#editId').value

                myApp.postUpdatedComment(editData, commentID)
                    //myApp.fetchComments(myApp.getUsername())
            })
        }
    }) /**************************************UPDATE SCRIPTS ENDS HERE ***********************************************/


    /*******************************************************DELETE SCRIPTS*********************************************/
    //listen for a delete action
    document.querySelector('#commentDiv').addEventListener('click', (e) => {
        if (e.target.classList.contains("del") || e.target.classList.contains("fa-trash")) {
            myApp.deleteComment(e.target.id)
                //myApp.fetchComments(myApp.getUsername())
        }
    }) /**************************************DELETE SCRIPTS ENDS HERE ***********************************************/
})