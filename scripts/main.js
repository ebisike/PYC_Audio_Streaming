$(document).ready(function() {
    let commentDiv = document.querySelector('#commentDiv')
    let baseUrl = "https://pyc.somee.com"
    let localBaseUrl = "https://localhost:44397"
    let myUrl = "https://ebisike.github.io/pyc/"

    //auto get data after 1sec
    setInterval(getData, 1000, `${myUrl}`)

    //call the service to return comments on page load
    getData()

    //listen for the clear event
    document.querySelector('#clear').addEventListener('click', () => {
        //alert('cl')
        document.querySelector('#usernameInput').value = ""
        document.querySelector('#commentInput').value = ""
    })


    //listen for form submission
    document.querySelector('#form').addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(document.querySelector('#usernameInput').value)
        var data = {
            Username: document.querySelector('#usernameInput').value,
            Comment: document.querySelector('#commentInput').value
        }

        //call a ajax method to submit the data
        $.ajax({
            method: "POST",
            url: `${baseUrl}/api/Reactions/PostReactions`,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(resp) {
                //console.log(resp)
                //alert('Comment Posted')
                document.querySelector('#usernameInput').value = ""
                document.querySelector('#commentInput').value = ""
                $('#newComment').modal('hide')
                getData()
            },
            error: function(resp) {
                console.log(resp)
                console.log("faild to post comment")
            }
        })
    })

    //listen for a delete action
    document.querySelector('#commentDiv').addEventListener('click', (e) => {
        if (e.target.classList.contains("del") || e.target.classList.contains("fa-trash")) {
            deleteComment(e.target.id)
            return
        }
    })

    //listen for edit action
    document.querySelector('#commentDiv').addEventListener('click', (e) => {
        if (e.target.classList.contains("edit") || e.target.classList.contains("fa-pencil")) {
            getCommentToEdit(e.target.id)
            $('#editModal').modal('show')

            document.querySelector('#editForm').addEventListener('submit', (e) => {
                e.preventDefault()
                console.log(document.querySelector('#editId').value)
                var editData = {
                    Username: document.querySelector('#editUsernameInput').value,
                    Comment: document.querySelector('#editCommentInput').value,
                    Time: document.querySelector('#editTime').value,
                    Date: document.querySelector('#editDate').value
                }
                let idd = +document.querySelector('#editId').value
                    //ajax method to submit editted data
                $.ajax({
                    method: "PUT",
                    url: `${baseUrl}/api/Reactions/EditReactions/?index=${idd}`,
                    data: JSON.stringify(editData),
                    dataType: "json",
                    contentType: "application/json",
                    success: function(resp) {
                        //console.log(resp)
                        alert('Comment Editeed!!')
                        document.querySelector('#editUsernameInput').value = ""
                        document.querySelector('#editCommentInput').value = ""
                        getData()
                    },
                    error: function(resp) {
                        console.log(resp.response)
                        $('#editModal').modal('hide')
                        console.log("faild to edit comment")
                        document.querySelector('#editUsernameInput').value = ""
                        document.querySelector('#editCommentInput').value = ""
                        getData()
                    }
                })
            })
            return
        }
    })

    // handle fetching user comments
    function getData() {
        $.ajax({
            method: 'GET',
            url: `${baseUrl}/api/Reactions/GetReactions`,
            success: function(resp) {
                console.log(typeof(resp))
                    //console.log(Object.keys(resp).length === 0)
                showCommentsOnUI(resp)

                // if (Object.keys(resp).length === 0) {
                //     //commentDiv.textContent = "Sorry! No comments yet. You can use the + button to post new comments"
                //     showCommentsOnUI(resp)
                // } else {
                //     commentDiv.textContent = "Sorry! No comments yet. You can use the + button to post new comments"
                // }

            },
            error: function(resp) {
                console.log('faled')
            }
        })
    }

    function deleteComment(id) {
        $.ajax({
            method: "GET",
            url: `${baseUrl}/api/Reactions/Delete/?index=${id}`,
            success: function(resp) {
                console.log("Delete PAssed")
                getData()
            },
            error: function(resp) {
                console.log("Delete Failed")
            }

        })
    }

    function getCommentToEdit(id) {
        $.ajax({
            method: "GET",
            url: `${baseUrl}/api/Reactions/Edit/?index=${id}`,
            success: function(resp) {
                //console.log(resp)
                showEditTextOnUi(resp, id)
            },
            error: function(resp) {
                console.log("edit not allowd")
            }
        })
    }

    function showEditTextOnUi(data, index) {
        document.querySelector('#editUsernameInput').setAttribute("placeholder", data["username"])
        document.querySelector('#editUsernameInput').setAttribute("value", data["username"])
        document.querySelector('#editCommentInput').setAttribute("placeholder", data["comment"])
        document.querySelector('#editCommentInput').setAttribute("value", data["comment"])
        document.querySelector('#editId').setAttribute("value", index)
        document.querySelector('#editTime').setAttribute("value", data["time"])
        document.querySelector('#editate').setAttribute("value", data["date"])
    }

    function showCommentsOnUI(arr) {
        commentDiv.textContent = ""
        arr.forEach((data, i) => {
            let username = document.createElement('p')
            let timeSpan = document.createElement('span')
            let timeStamp = document.createElement('small')
            let comment = document.createElement('p')
            let divider = document.createElement('hr')
            let group = document.createElement('div')

            let edit = document.createElement('a')
            let editIcon = document.createElement('i')
            let del = document.createElement('a')
            let delIcon = document.createElement('i')

            //delete buttons
            //del.setAttribute("href", "#")
            del.setAttribute("id", i)
            del.classList.add("btn", "btn-sm", "btn-danger", "del")
            delIcon.classList.add("fa", "fa-trash", "del")
            delIcon.setAttribute("aria-hidden", "true")
            delIcon.setAttribute("id", i)
            del.appendChild(delIcon)

            //edit buttons
            //edit.setAttribute("href", "#")
            edit.setAttribute("id", i)
            edit.classList.add("btn", "btn-sm", "btn-primary", "ml-1", "edit")
            editIcon.classList.add("fa", "fa-pencil")
            editIcon.setAttribute("aria-hidden", "true")
            editIcon.setAttribute("id", i)
            edit.appendChild(editIcon)

            username.textContent = data["username"]
            timeStamp.textContent = " | " + data["date"] + " @" + data["time"]
            comment.textContent = data["comment"]

            timeSpan.appendChild(timeStamp)
            username.appendChild(timeSpan)
            group.appendChild(username)
                // add css classes
            username.classList.add("text-primary", "mb-0", "h6")
            timeStamp.classList.add("text-dark")
                //username.style.width = "50%"
            group.appendChild(comment)
            group.appendChild(del)
            group.appendChild(edit)
            group.appendChild(divider)

            commentDiv.append(group)
        })
    }

    //listen for action to add a new comment
    document.querySelector(".fa-plus-circle").addEventListener('click', (e) => {
        $('#newComment').modal('show')
    })

})