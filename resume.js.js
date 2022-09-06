const labelNumberOfItems={
    "Name":3,
    "Education":4,
    "Work Experience":5,
    "Skills":1,
    "Personal Projects":2,
    "Languages":2
  };

  const labelIds={
    "Name":"personalDetails",
    "Education":"education",
    "Work Experience":"workExperience",
    "Skills":"skills",
    "Personal Projects":"personalProjects",
    "Languages":"languages"
  };

  const internalDivIds={
    "Name":["personName","personAbout","PersonSubDescription"],
    "Education":["educationDegree","educationCollege","educationDate","educationBranch"],
    "Work Experience":["workRoleName","workCompanyName","workDate","workPlace","workDescription"],
    "Skills":["skills"],
    "Personal Projects":["projectTitle","projectAbout"],
    "Languages":["lang","langExperiance"]
  };

  const labelSubItems={
    "Name":["h3","p","p","p"]
  }

  const onSubmit={
    "Education":generateEducationTypeDiv,
    "Work Experience":generateWorkTypeDiv,
    "Skills":generateSkillTypeDiv,
    "Personal Projects":generateProjectTypeDiv,
    "Languages":generateLanguagesTypeDiv
  }


const dropDown=document.getElementById("selectId");
dropDown.addEventListener("change",handelDropDownCahnges);

const submitButton=document.getElementById("submitButton");
submitButton.addEventListener("click",updateValues);
submitButton.style.visibility="collapse";

const resetButton=document.getElementById("resetButton");
resetButton.addEventListener("click",resetValues);
resetButton.style.visibility="collapse";

const cancelButton=document.getElementById("cancelButton");
cancelButton.addEventListener("click",cancelForm);
cancelButton.style.visibility="collapse";

const addButton=document.getElementById("addButton");
addButton.addEventListener("click",addNewForm);
addButton.style.visibility="collapse";


  // handling the dropdown
  function handelDropDownCahnges(v){

    let m=document.getElementById("inputFields");
    m.innerHTML="";

    const SELECTED_VALUE=v.target.value;

    if(SELECTED_VALUE!=="select option"){

      const SELECTED_VALUE_ID=labelIds[SELECTED_VALUE];

      const selectedFieldDetails=document.getElementById(SELECTED_VALUE_ID).querySelectorAll("div");

      generateInputFields(selectedFieldDetails.length,labelNumberOfItems[SELECTED_VALUE]);

      fetchTheValues(selectedFieldDetails,SELECTED_VALUE);

      submitButton.style.visibility="visible";
      resetButton.style.visibility="visible";
      cancelButton.style.visibility="visible";
      addButton.style.visibility="visible";

      if(SELECTED_VALUE=="Name"){
        addButton.style.visibility="collapse";
      }
      
    }else{
      submitButton.style.visibility="collapse";
      resetButton.style.visibility="collapse";
      cancelButton.style.visibility="collapse";
      addButton.style.visibility="collapse";
    }
  }


// updating the values in the resume
  function updateValues(){

    const SELECTED_VALUE=dropDown.options[dropDown.selectedIndex].text;
    
    if(SELECTED_VALUE!=="select option"){

      const SELECTED_VALUE_ID=labelIds[SELECTED_VALUE];

      let resumeFieldValues=document.getElementById(SELECTED_VALUE_ID).querySelectorAll("div");
      const fillFieldValues=document.getElementById("inputFields").querySelectorAll("div");

      fillFieldValues.forEach(function(item,index){
        const subFillFieldValues=document.getElementById(fillFieldValues[index].id).querySelectorAll("input");
        let resumeFieldValuesChange=resumeFieldValues[index].querySelectorAll("h3,p,a,h1,h2,h3,h4,h5,h6");
        subFillFieldValues.forEach(function(ite,ind){
          resumeFieldValuesChange[ind].innerHTML=subFillFieldValues[ind].value;
        });
      });

    }
  }

// reseting the values in input filleds
  function resetValues(){

    const SELECTED_VALUE=dropDown.options[dropDown.selectedIndex].text;

    if(SELECTED_VALUE!=="select option"){

      const SELECTED_VALUE_ID=labelIds[SELECTED_VALUE];

      const selectedFieldDetails=document.getElementById(SELECTED_VALUE_ID).querySelectorAll("div");

      fetchTheValues(selectedFieldDetails,SELECTED_VALUE);
    }
  }

// cancelling the selected filled
  function cancelForm(){
    dropDown.selectedIndex=0;
    let m=document.getElementById("inputFields");
    m.innerHTML="";

    submitButton.style.visibility="collapse";
    resetButton.style.visibility="collapse";
    cancelButton.style.visibility="collapse";
    addButton.style.visibility="collapse";
  }

// generating the number of required fields 
  function generateInputFields(length,items){
  
    let mainDiv=document.getElementById("inputFields");

    for(let i=0;i<length;i++){ 

      let subDiv=document.createElement('div');
      subDiv.id="inputFields" + i.toString();
      subDiv.className="inputFieldDiv";

      let elem=document.createElement('h4');
      elem.appendChild(document.createTextNode('Title :'));
      subDiv.appendChild(elem);

      let elem1=document.createElement('input');
      elem1.id="titleInput" + i.toString() + "0";
      elem1.className="inputField";
      subDiv.appendChild(elem1);


      for(let j=1;j<items;j++){

        let elem2=document.createElement('h6');
        elem2.appendChild(document.createTextNode("Sub-description" + j.toString()));
        subDiv.appendChild(elem2);

        let elem3=document.createElement('input');
        elem3.id="titleInput" + i.toString() + j.toString();
        elem3.className="inputField";
        subDiv.appendChild(elem3);
      }

      const SELECTED_VALUE=dropDown.options[dropDown.selectedIndex].text;
    
    if(SELECTED_VALUE!=="Name"){

      let elem4=document.createElement('input');
      elem4.type="submit";
      elem4.value="Delete";
      elem4.id=i.toString();
      elem4.className="buttonDelete";
      elem4.addEventListener("click",DeleteField);
      subDiv.appendChild(elem4);
    }

      mainDiv.appendChild(subDiv);
    }
  }


  // This operation will be done in four parts 
  // 1st : divs will be shifted upwards
  // 2th : last field will be deleted from the resume
  function DeleteField(v){

    const SELECTED_VALUE=dropDown.options[dropDown.selectedIndex].text;

    const position=parseInt(v.target.id);

    shiftTheDivsAndDeleteLastNode(SELECTED_VALUE,position);
  }


  function shiftTheDivsAndDeleteLastNode(SELECTED_VALUE,position){

     const SELECTED_VALUE_ID=labelIds[SELECTED_VALUE];

      let resumeFieldValues=document.getElementById(SELECTED_VALUE_ID).querySelectorAll("div");

     if(resumeFieldValues.length>position+1)

     for(let i=position;i<resumeFieldValues.length-1;i++){

      let subResumeFieldValues=resumeFieldValues[i].querySelectorAll("h3,p,a,h1,h2,h3,h4,h5,h6");
      let subResumeFieldValues1=resumeFieldValues[i+1].querySelectorAll("h3,p,a,h1,h2,h3,h4,h5,h6");

      subResumeFieldValues1.forEach(function(item,index){
        subResumeFieldValues[index].id=subResumeFieldValues1[index].id;
        subResumeFieldValues[index].innerHTML=subResumeFieldValues1[index].innerHTML;
      });
     }

     /// deleting the last div
     resumeFieldValues[resumeFieldValues.length-1].remove();

     cancelForm();
  }



// fetching the values from the resume
  function fetchTheValues(selectedFieldDetails,SELECTED_VALUE){

    selectedFieldDetails.forEach(function(item,ind){
      const subSelectedFieldDetails=document.getElementById(selectedFieldDetails[ind].id).querySelectorAll("h3,p,a,h1,h2,h3,h4,h5,h6");
      subSelectedFieldDetails.forEach(function(item,index){
        if(index<labelNumberOfItems[SELECTED_VALUE]){
          let targetField=document.getElementById("titleInput" + ind.toString() + index.toString());
          targetField.value=subSelectedFieldDetails[index].innerHTML;
        }
      });
  });
  }


  function addNewForm(){

    submitButton.style.visibility="collapse";
    resetButton.style.visibility="collapse";
    addButton.style.visibility="collapse";

    const SELECTED_VALUE=dropDown.options[dropDown.selectedIndex].text;

    let mainDiv=document.getElementById("inputFields"); 
    let mainDivAttributes=document.getElementById("inputFields").querySelectorAll("div");
    

      let subDiv=document.createElement('div');
      subDiv.id="inputFields" + mainDivAttributes.length.toString();
      subDiv.className="inputFieldDiv";

      let subDescription=document.createElement('h4');
      subDescription.appendChild(document.createTextNode('Title :'));
      subDiv.appendChild(subDescription);

      let subDescription1=document.createElement('input');
      subDescription1.id="titleInput" + mainDivAttributes.length.toString() + "0";
      subDescription1.className="inputField";
      subDiv.appendChild(subDescription1);


      for(let j=1;j<labelNumberOfItems[SELECTED_VALUE];j++){

        let subDescription2=document.createElement('h6');
        subDescription2.appendChild(document.createTextNode("Sub-description" + j.toString()));
        subDiv.appendChild(subDescription2);

        let subDescription3=document.createElement('input');
        subDescription3.id="titleInput" + mainDivAttributes.length.toString() + j.toString();
        subDescription3.className="inputField";
        subDiv.appendChild(subDescription3);
      }

      let submit=document.createElement('input');
      submit.type="submit";
      submit.value="Submit";
      submit.id="subDivSubmit";
      submit.className="button";
      submit.addEventListener("click",submitNewValues);
      subDiv.appendChild(submit);

      mainDiv.appendChild(subDiv);
  }

  function submitNewValues(){

    const SELECTED_VALUE=dropDown.options[dropDown.selectedIndex].text;

    if(validateInputData()){

      onSubmit[SELECTED_VALUE]();
      cancelForm();

  }else{
    alert("Please fill all input fields");
  }
  }

  function validateInputData(){

    const newFilledFields=document.getElementById("inputFields").querySelectorAll('div');
    const lastFilledDivAttributes=newFilledFields[newFilledFields.length-1].querySelectorAll('input');

    let result=true;

    lastFilledDivAttributes.forEach(function(item,index){
      if(lastFilledDivAttributes[index].value.length==0 && result==true){
        result=false;
      }
    });
    return result;
  }


  function generateLanguagesTypeDiv(){

    const mainDiv=document.getElementById("languages");

    const newFilledFields=document.getElementById("inputFields").querySelectorAll('div');
    const lastFilledDivAttributes=newFilledFields[newFilledFields.length-1].querySelectorAll('input');

    const newDiv=document.createElement('div');
    newDiv.id="languages" + (newFilledFields.length-1).toString();

    const language=document.createElement('p');
    language.id=internalDivIds["Languages"][0] + (newFilledFields.length-1).toString();
    language.innerHTML=lastFilledDivAttributes[0].value;
    language.className="langName";
    newDiv.appendChild(language);

    const languageDescription=document.createElement('p');
    languageDescription.id=internalDivIds["Languages"][1] + (newFilledFields.length-1).toString();
    languageDescription.innerHTML=lastFilledDivAttributes[1].value;
    languageDescription.className="langEx";
    newDiv.appendChild(languageDescription);

    mainDiv.appendChild(newDiv);

  }


  function generateProjectTypeDiv(){

    const mainDiv=document.getElementById("personalProjects");

    const newFilledFields=document.getElementById("inputFields").querySelectorAll('div');
    const lastFilledDivAttributes=newFilledFields[newFilledFields.length-1].querySelectorAll('input');

    const newDiv=document.createElement('div');
    newDiv.id="personalProjects" + (newFilledFields.length-1).toString();
    newDiv.className="divMargin";

    const projectTitle=document.createElement('p');
    projectTitle.id=internalDivIds["Personal Projects"][0] + (newFilledFields.length-1).toString();
    projectTitle.innerHTML=lastFilledDivAttributes[0].value;
    projectTitle.className="highSize";
    newDiv.appendChild(projectTitle);

    const projectAbout=document.createElement('p');
    projectAbout.id=internalDivIds["Personal Projects"][1] + (newFilledFields.length-1).toString();
    projectAbout.innerHTML=lastFilledDivAttributes[1].value;
    projectAbout.className="smallSize";
    newDiv.appendChild(projectAbout);

    mainDiv.appendChild(newDiv);

  }



  function generateSkillTypeDiv(){

    const mainDiv=document.getElementById("skills");

    const newFilledFields=document.getElementById("inputFields").querySelectorAll('div');
    const lastFilledDivAttributes=newFilledFields[newFilledFields.length-1].querySelectorAll('input');

    const newDiv=document.createElement('div');
    newDiv.id="skills" + (newFilledFields.length-1).toString();
    newDiv.className="skills";

    const skill=document.createElement('p');
    skill.id=internalDivIds["Skills"][0] + (newFilledFields.length-1).toString();
    skill.innerHTML=lastFilledDivAttributes[0].value;
    newDiv.appendChild(skill);

    mainDiv.appendChild(newDiv);
  }


  function generateWorkTypeDiv(){

    const mainDiv=document.getElementById("workExperience");

    const newFilledFields=document.getElementById("inputFields").querySelectorAll('div');
    const lastFilledDivAttributes=newFilledFields[newFilledFields.length-1].querySelectorAll('input');

    const newDiv=document.createElement('div');
    newDiv.id="workExperience" + (newFilledFields.length-1).toString();
    newDiv.className="divMargin";

    const role=document.createElement('h3');
    role.id=internalDivIds["Work Experience"][0] + (newFilledFields.length-1).toString();
    role.innerHTML=lastFilledDivAttributes[0].value;
    newDiv.appendChild(role);

    const companyName=document.createElement('p');
    companyName.id=internalDivIds["Work Experience"][1] + (newFilledFields.length-1).toString();
    companyName.innerHTML=lastFilledDivAttributes[1].value;
    companyName.className="highSize";
    newDiv.appendChild(companyName);

    const workDate=document.createElement('p');
    workDate.id=internalDivIds["Work Experience"][2] + (newFilledFields.length-1).toString();
    workDate.innerHTML=lastFilledDivAttributes[2].value;
    workDate.className="smallSize";
    newDiv.appendChild(workDate);

    const workPlace=document.createElement('p');
    workPlace.id=internalDivIds["Work Experience"][3] + (newFilledFields.length-1).toString();
    workPlace.innerHTML=lastFilledDivAttributes[3].value;
    workPlace.className="workLocation";
    newDiv.appendChild(workPlace);

    const workDescription=document.createElement('p');
    workDescription.id=internalDivIds["Work Experience"][4] + (newFilledFields.length-1).toString();
    workDescription.innerHTML=lastFilledDivAttributes[4].value;
    workDescription.className="smallSize";
    newDiv.appendChild(workDescription);

    mainDiv.appendChild(newDiv);

  }


  function generateEducationTypeDiv(){

    const mainDiv=document.getElementById("education");

    const newFilledFields=document.getElementById("inputFields").querySelectorAll('div');
    const lastFilledDivAttributes=newFilledFields[newFilledFields.length-1].querySelectorAll('input');

    const newDiv=document.createElement('div');
    newDiv.id="education" + (newFilledFields.length-1).toString();
    newDiv.className="divMargin";

    const degree=document.createElement('h3');
    degree.id=internalDivIds["Education"][0] + (newFilledFields.length-1).toString();
    degree.innerHTML=lastFilledDivAttributes[0].value;
    newDiv.appendChild(degree);

    const collegeName=document.createElement('p');
    collegeName.id=internalDivIds["Education"][1] + (newFilledFields.length-1).toString();
    collegeName.innerHTML=lastFilledDivAttributes[1].value;
    collegeName.className="highSize";
    newDiv.appendChild(collegeName);

    const date=document.createElement('p');
    date.id=internalDivIds["Education"][2] + (newFilledFields.length-1).toString();
    date.innerHTML=lastFilledDivAttributes[2].value;
    date.className="smallSize";
    newDiv.appendChild(date);

    const branch=document.createElement('p');
    branch.id=internalDivIds["Education"][3] + (newFilledFields.length-1).toString();
    branch.innerHTML=lastFilledDivAttributes[3].value;
    branch.className="mediumSize";
    newDiv.appendChild(branch);

    mainDiv.appendChild(newDiv);

  }