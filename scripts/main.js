$(document).ready(function() {

    //listen for the clear event
    document.querySelector('#clear').addEventListener('click', () => {
        //alert('cl')
        document.querySelector('#usernameInput').value = ""
        document.querySelector('#commentInput').value = ""
    })

    $.ajax({
            method: 'post',
            url: "http://127.0.0.1/StreamingCommentsServer/handleComments.php",
            data: $('form').serialize(),
            success: function(resp) {
                console.log('submitted')
            },
            error: function(resp) {
                console.log('faled')
            }
        })
        //require the native js file reader
        // const fs = require('fs')

    // //require the comments data
    // //const usercomments = require('./comments.json') //obsollete

    // fs.readFile('./comments.json', 'utf8', (err, jsonData) => {
    //     if (err) {
    //         console.log("error reading file", err)
    //         return
    //     }
    //     try {
    //         const usercomments = JSON.parse(jsonData)
    //         console.log("Username is:", usercomments.username)
    //     } catch (error) {
    //         console.log("Error Parsing JSON string", error)
    //     }
    // })

    // //lsten for the submit event
    // document.querySelector('#form').addEventListener('submit', (e) => {
    //     e.preventDefault()
    //         //console.log(e)
    //     let username = document.querySelector('#usernameInput').value
    //     let comment = document.querySelector('#commentInput').value
    //     console.log(comment)
    // })

    // //reuseable function to read json file
    // function jsonReader(filePath, callback) {
    //     fs.readFile(filePath, (err, fileData) => {
    //         if (err) {

    //             return callback && callback(err)
    //         }
    //         try {
    //             const usercomments = JSON.parse(fileData)
    //             return callback && callback(null, usercomments)
    //         } catch (err) {
    //             return callback && callback(err)
    //         }
    //     })
    // }
})