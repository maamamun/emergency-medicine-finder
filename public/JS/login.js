const role = document.getElementById('role')

const roleValue = localStorage.getItem('role')

if (roleValue) {
    if (roleValue == "user") {
        role[1].setAttribute('selected', 'selected')
    } else if (roleValue == "shopkeeper") {
        role[2].setAttribute('selected','selected')
    } else if (roleValue == "delivery") {
        role[3].setAttribute('selected','selected')
    }else {
        role[0].setAttribute('selected', 'selected')
    }
}
