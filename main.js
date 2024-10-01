
let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");

let mood='create';
let ex;
// get total
function getTotal() {
    if (price.value != ""){
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML=result
        total.style.backgroundColor="#054705"
    }else{
        total.innerHTML=""
        total.style.backgroundColor="#850e0e"
    }

}
let prodcData;
if(localStorage.product != null ){
prodcData=JSON.parse(localStorage.product)
}else{
    prodcData=[]
}
//create product

submit.onclick=function (){
    let newPro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if(mood === 'create'){
        if(newPro.count > 1){
        for(let i=0; i<newPro.count; i++){
            prodcData.push(newPro)
        }
    }else{
        prodcData.push(newPro)
    }
    }else{
        prodcData[ex]=newPro;
        mood='create'
        submit.innerHTML='Create'
        count.style.display='block'
    }
    
    localStorage.setItem("product",JSON.stringify(prodcData))
    clearDate()
    getTotal()
    showData()
}

//save localstorage
//clear inputs
function clearDate() {
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    total.innerHTML=""
    count.value=""
    category.value=""
}
//read
function showData() {
    let table=''
for(let i=0; i< prodcData.length; i++){
    table +=`
        <tr>
            <td>${i+1}</td>
            <td>${prodcData[i].title}</td>
            <td>${prodcData[i].price}</td>
            <td>${prodcData[i].taxes}</td>
            <td>${prodcData[i].ads}</td>
            <td>${prodcData[i].discount}</td>
            <td>${prodcData[i].total}</td>
            <td>${prodcData[i].category}</td>
            <td class="tdbtn"><button onclick="updateData(${i})" id="update">update</button></td>
            <td class="tdbtn"><button onclick="deletePro(${i})" id="delete">delete</button></td>
        </tr>
    
    `
 
}
    document.getElementById("tbody").innerHTML=table
    let btnDelete=document.getElementById("deleteAll")
    if(prodcData.length > 0){
        btnDelete.innerHTML=`
        <button onclick='deleteAll()'>Delete All(${prodcData.length})</button>
        `
    }else{
        btnDelete.innerHTML=""
    }

}
showData()
//count
//delete
function deletePro (i){
    prodcData.splice(i,1);
    localStorage.product=JSON.stringify(prodcData);
    showData()
}
function deleteAll(){
    prodcData.splice(0)
    localStorage.product=JSON.stringify(prodcData);
    showData()
}
//update

function updateData(i){
    title.value=prodcData[i].title
    price.value=prodcData[i].price
    taxes.value=prodcData[i].taxes
    ads.value=prodcData[i].ads
    discount.value=prodcData[i].discount
    getTotal()
    category.value=prodcData[i].category
    count.style.display='none'
    submit.innerHTML="Update";
    mood='update'
    ex=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}









//search
// clean data 