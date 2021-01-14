class UI {
    constructor() {
        this.commentDiv = document.querySelector('#commentDiv')
    }

    showCommentsOnUI(arr, localUsername) {
        //console.log(arr.reactions)
        this.commentDiv.textContent = ""
        arr.reactions.forEach((data, i) => {
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

            if (localUsername.toLowerCase() === data["username"].toLowerCase()) {
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
            }

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

            this.commentDiv.append(group)
        })
    }

    showEditTextOnUi = (data, index) => {
        document.querySelector('#editCommentInput').setAttribute("placeholder", data["comment"])
        document.querySelector('#editCommentInput').setAttribute("value", data["comment"])
        document.querySelector('#editId').setAttribute("value", index)
            // document.querySelector('#editTime').setAttribute("value", data["time"])
            // document.querySelector('#editate').setAttribute("value", data["date"])
    }
}