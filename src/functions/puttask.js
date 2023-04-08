const putTask = (url) => {
    fetch(url, {
        method: 'PUT'
    }).catch(err => {
        console.log(err);
    })
}

export default putTask;