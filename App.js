const input=document.querySelector("#expression");
const category=document.querySelector('#category');
const displayanswer=document.querySelector(".text");
const result=document.querySelector(".answer");


async function display(){
    let ASCIIValue=encodeURIComponent(input.value);
    const selectCategory=category.value;
        const fetchData=await fetch(`https://newton.now.sh/api/v2/${selectCategory}/${ASCIIValue}`);
         const data =await fetchData.json();
            const textData={
                key:selectCategory,
                value: data,
            };
            const localData=JSON.parse(localStorage.getItem("value"));
            if(localData && localData.length>0){
                localData.push(textData);
                localStorage.setItem("value",JSON.stringify(localData));
            }
            else{
                localStorage.setItem("value",JSON.stringify([textData]));
            }
            
            displayanswer.textContent=`${data.operation} : ${data.expression}`;
            result.textContent=`Result = ${data.result}`
}

function displayHistory(){
    displayanswer.textContent="";
    result.textContent="";
    const localData=JSON.parse(localStorage.getItem("value"));
    if(localData){
        for(let data of localData){
            console.log(data["value"]["operation"]);
            const historyElement=document.createElement("p");
            historyElement.textContent=`
            ${data["key"]} : ${data["value"]["expression"]} = Result ${data["value"]["result"]}`;
            displayanswer.append(historyElement)
        }
        
    }
}


function deleteHistory(){
    displayanswer.textContent="";
    result.textContent="";
    const localData=JSON.parse(localStorage.getItem("value"));
    if(localData){
        localStorage.removeItem("value");
        displayanswer.textContent=`Data Deleted Successfully`;
    }
    else{
        displayanswer.textContent=`No Data is present`;
    }
}
