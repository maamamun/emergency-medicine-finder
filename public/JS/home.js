const uBtn = document.getElementById('user')
const sBtn = document.getElementById('shopkeeper')
const dBtn = document.getElementById('delivery')

uBtn.addEventListener('click',(e)=>{    
    if(uBtn.attributes.value.value=="user"){
        localStorage.setItem('role','user')
    }
})

// console.log(sBtn.attributes.value.value)
sBtn.addEventListener('click',(e)=>{    
    if(sBtn.attributes.value.value=="shopkeeper"){
        localStorage.setItem('role','shopkeeper')
    }
})
dBtn.addEventListener('click',(e)=>{    
    if(dBtn.attributes.value.value=="delivery"){
        localStorage.setItem('role','delivery')
    }
})