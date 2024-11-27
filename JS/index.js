/*


*/


let 
exampleFormControlInput1 = document.getElementById("exampleFormControlInput1")  ,
exampleFormControlInput2 = document.getElementById("exampleFormControlInput2") , 
btnSumbit = document.getElementById("btnSumbit"),
alertVaild = document.getElementById("alertVaild") ,
nameRegex = /^[a-zA-Z]{4,20}$/ ,
linkRegex = /https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/ ,
alertVaildLink = document.getElementById("alertVaildLink") ;
requiredField = document.getElementById("requiredField") ,
arrayHaveLinks = [] ;

if(localStorage.getItem("allLinks"))
    {
        arrayHaveLinks = JSON.parse(localStorage.getItem("allLinks")) ;
        displayLinks(arrayHaveLinks);
    }
function addLinks()
{
    let inputsObject = 
    {
        siteName : exampleFormControlInput1.value ,
        urlName : exampleFormControlInput2.value
    }
    
    arrayHaveLinks.push(inputsObject) ;
    localStorage.setItem("allLinks" , JSON.stringify(arrayHaveLinks)) ;
    displayLinks(arrayHaveLinks);
    clearInputs();
}
function clearInputs() 
{
     exampleFormControlInput1.value = null ;
     exampleFormControlInput2.value = null ;
}
function displayLinks(array)
{
    let box = `` ;
    let head = `        

        <div id="head" class = "row">
                <span class = "col-3 text-center">Index</span>
                <span class = "col-3 text-center "> Website Name</span>
                <span class = "col-3 text-center">Visit</span>
                <span class = "col-3 text-center">Delete</span>
            </div>`;
    for(let i = 0 ;i < array.length ; i++)
        {
            box += `  
                           
            <table class="table">
                          <tbody>
                            <tr id = "mainTR" class = "row">
                              <td scope="row" class = "col-3 d-flex"> <span class = "align-self-center">${i + 1}</span> </td>
                              <td class = "col-3 d-flex  justify-content-start justify-content-md-center"> <span class = ""> ${array[i].siteName}</span></td>
                              <td class = "col-3 "> <a href = "${array[i].urlName}" target = "_blank">  <button type="button" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button> </a></td>
                              <td class = "col-3"><button onclick = "deleteLink(${i})"  type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                            </tr>
                          </tbody>
                          
                        </table>

                        `
        }
        document.getElementById(`TheTable`).innerHTML = head + box ;
}
function deleteLink(index) 
{
    arrayHaveLinks.splice(index , 1) ;
    localStorage.setItem("allLinks" , JSON.stringify(arrayHaveLinks)) ;
    displayLinks(arrayHaveLinks) ;
}


function searching(term) 
{
    let searchList = [] ;
    for(let i = 0 ; i < arrayHaveLinks.length ; i++)
        {
            term = term.trim().toLowerCase();
            if(arrayHaveLinks[i].siteName.startsWith(term))
                {
                    searchList.push(arrayHaveLinks[i]) ; 
                }
                
        }
        displayLinks(searchList);
}
function siteNameVaildition(siteValue) {
    if (nameRegex.test(siteValue)) {
        btnSumbit.removeAttribute("disabled" , "") ;
        alertVaild.classList.add("d-none");
    } else {
        alertVaild.classList.remove("d-none") ;
       
        btnSumbit.setAttribute("disabled" , "");
    }
}
function linkVaildition(linkValue) {

    if(linkRegex.test(linkValue))
        {
            btnSumbit.removeAttribute("disabled" , "") ;
            alertVaildLink.classList.add("d-none");
        }
        else
        {
            alertVaildLink.classList.remove("d-none");
            btnSumbit.setAttribute("disabled" , "") ;
        }
}
