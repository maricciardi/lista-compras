const form = document.querySelector("form")
const input = document.getElementById("input")
const ul = document.getElementById("itens")
const alert = document.getElementById("alert")
let myList = []


form.onsubmit = (event) => {
    event.preventDefault()

    addItem();
    showItens();
    
}

//para inserir o valor do input em uma array, depois disso apagar input
function addItem() {
    myList.push(input.value)
    input.value = '';
    input.focus();
    console.log(myList)
}


//para adicionar um li para cada item da lista e colocar no ul
function showItens() {
    let newLi = ''

    myList.forEach((item, index) => {
        newLi = newLi + `
        <li class="item">
            <div class="checkbox-wrapper">
                <div class="checkbox-image"></div>
                <input type="checkbox" name="check" id="check">
            </div>
            <label for="check" class="nameItem">${item}</label>
            <img src="assets/icons/trash.svg" alt="ícone de lixeira" onclick="deleteItem(${index})">
        </li>
        `
    })

    ul.innerHTML = newLi

    //guardar itens no local storage
    localStorage.setItem('myList', JSON.stringify(myList))
}

           
//deletar item da lista e mostrar lista atualizada
function deleteItem(index) {
    myList.splice(index, 1)

    showItens()
    showAlert()
}


//mostrar o alerta de item removido
function showAlert() {
    alert.style.display = 'grid'
    setTimeout(() => {
        alert.style.display = 'none'
    }, 2000)
}

function closeAlert() {
    alert.style.display = 'none'
}


function reloadPage() {
    const localStorageItens = localStorage.getItem('myList')

    if (localStorageItens) {
        myList = JSON.parse(localStorageItens)
    }

    showItens()
}

reloadPage()