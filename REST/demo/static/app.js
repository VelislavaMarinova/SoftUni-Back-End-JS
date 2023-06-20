// alert('hello');

document.querySelector('#load').addEventListener('click', loadProducts);
const form = document.querySelector('form');
form.addEventListener('submit', createProduct);
const list = document.querySelector('ul');
list.addEventListener('click', itemAction);

let editMode = false;
let currentId = null;


async function loadProducts() {
    const res = await fetch('http://localhost:3000/data');
    const data = await res.json();
    list.replaceChildren();
    for (let item of data) {
        createRow(item);

    }
    // console.log(data);
}

function createRow(item) {
    const li = document.createElement('li');
    li.id = item.id;
    li.textContent = `${item.name} - $${item.price} `;

    createAction(li, '[Details]', 'details');
    createAction(li, '[Delete]', 'delete');
    createAction(li, '[edit]', 'edit');


    // const deleteBtn = document.createElement('a');
    // deleteBtn.class = 'delete';
    // deleteBtn.href = 'javascript:void(0)'
    // deleteBtn.textContent = '[Delete]';
    // li.appendChild(deleteBtn);

    // const deleteBtn = document.createElement('a');
    // deleteBtn.class = 'delete';
    // deleteBtn.href = 'javascript:void(0)'
    // deleteBtn.textContent = '[Delete]';
    // li.appendChild(deleteBtn);

    list.appendChild(li);
}

function createAction(li, textContent, className) {
    const btn = document.createElement('a');
    btn.className = className;
    btn.href = 'javascript:void(0)'
    btn.textContent = textContent;
    li.appendChild(btn);
}

async function createProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    if (editMode) {
        const res = await fetch('http://localhost:3000/data' + currentId,{
            method:'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(res.ok){
            loadProducts();
            form.reset();
            editMode=false;
            currentId=null;
        }
    } else {

        const res = await fetch('http://localhost:3000/data', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const item = await res.json()
        console.log(data);
        createRow(item)
    }
}

async function itemAction(e) {
    console.log('here');
    if (e.target.tagName == 'A') {
        e.preventDefault();
        const id = e.target.parentNode.id;
        if (e.target.className == 'delete') {
            deleteItem(id)
        } else if (e.target.className == 'details') {
            details(id)
        } else if (e.target.className == 'edit') {
            editItem(id)
        }
    }
}

async function details(id) {
    const res = await fetch('http://localhost:3000/data/' + id);
    const data = await res.json();


    console.log(data);
    return data;
}

async function deleteItem(id) {
    const res = await fetch('http://localhost:3000/data/' + id, {
        method: 'delete'
    });
    if (res.ok) {
        document.getElementById(id).remove()
    }

}

async function editItem(id) {
    const item =await details(id);
    form.querySelector('[name="name"]').value = item.name;
    form.querySelector('[name="price"]').value = item.price;
    currentId = id;
    editMode = true;

}