class App {
    constructor(url) {
        this.localStorageUsernameKey = "pycstreaming12"
        this.baseUrl = url
    }

    //check if the username for the app is set
    //returns true if is set
    //otherwise returns false.
    isUsernameSet = () => {
        let username = localStorage.getItem(this.localStorageUsernameKey)
        if (username) {
            return true
        }
        return false
    }

    //set the username to localstorage
    setUsername = (username) => localStorage.setItem(this.localStorageUsernameKey, username)

    //get the username stored in the local storage
    getUsername = () => localStorage.getItem(this.localStorageUsernameKey)

    //remove username
    removeUsername = () => localStorage.removeItem(this.localStorageUsernameKey)

    clearLocalStorage = () => localStorage.clear()

    enterUsername = () => {
        $('#enterUsername').modal({
            backdrop: 'static',
            keyboard: false
        })

        //-listen for a submit event on the modal form
        document.querySelector('#usernameForm').addEventListener('submit', (e) => {
            e.preventDefault()
            $('#enterUsername').modal('hide')
            let nativeUsername = document.querySelector('#localUsername').value
            console.log('app: ', nativeUsername)

            this.setUsername(nativeUsername)
            return nativeUsername
        })
    }

    //CRUD operation on User Comments

    //CREATE action
    postComment = () => {
        var data = {
            Username: this.getUsername(),
            Comment: document.querySelector('#commentInput').value,
            IpAddress: ''
        }
        console.log(data)
        console.log(this.baseUrl)

        //call a ajax method to submit the data
        $.ajax({
            method: "POST",
            url: `${this.baseUrl}/api/Reactions/PostReactions`,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(resp) {
                console.log(resp)
                document.querySelector('#commentInput').value = ""
                $('#newComment').modal('hide')
                window.location.reload()
                    //new App().fetchComments(new App().getUsername())
            },
            error: function(resp) {
                console.log(resp)
                console.log("faild to post comment")
            }
        })
    }

    //READ action
    // handle fetching user comments
    fetchComments = (username) => {
        //alert('helo')
        $.ajax({
            method: 'GET',
            url: `${this.baseUrl}/api/Reactions/GetReactions`,
            success: function(resp) {
                //console.log(resp)
                var Ui = new UI()
                Ui.showCommentsOnUI(resp, username)
            },
            error: function(resp) {
                console.log('faled')
            }
        })
    }

    //UPDATE action
    fetchCommentForEditing = (commentId) => {
        $.ajax({
            method: "GET",
            url: `${this.baseUrl}/api/Reactions/Edit/?index=${commentId}`,
            success: function(resp) {
                console.log(resp)
                var ui = new UI()
                ui.showEditTextOnUi(resp, commentId)
            },
            error: function(resp) {
                console.log("edit not allowd")
            }
        })
    }

    //INSERT UPDATED COMMENT
    postUpdatedComment = (data, commentId) => {
        $.ajax({
            method: "PUT",
            url: `${this.baseUrl}/api/Reactions/EditReactions/?index=${commentId}`,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(resp) {
                //console.log(resp)
                alert('Comment Editeed!!')
                document.querySelector('#editUsernameInput').value = ""
                document.querySelector('#editCommentInput').value = ""
            },
            error: function(resp) {
                console.log(resp.response)
                $('#editModal').modal('hide')
                console.log("faild to edit comment")
                document.querySelector('#editUsernameInput').value = ""
                document.querySelector('#editCommentInput').value = ""
                window.location.reload()
                    //new App().fetchComments(new App().getUsername())
            }
        })
    }

    //DELETE action
    deleteComment = (commentId) => {
        $.ajax({
            method: "GET",
            url: `${this.baseUrl}/api/Reactions/Delete/?index=${commentId}`,
            success: function(resp) {
                console.log("Delete PAssed")
                window.location.reload()
            },
            error: function(resp) {
                console.log("Delete Failed")
            }

        })
    }
}