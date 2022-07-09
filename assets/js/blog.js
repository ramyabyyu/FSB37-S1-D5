// Image Preview Logic
const photoIcon = document.querySelector(".preview .photo__icon"),
  imgPreview = document.querySelector(".preview .img__preview"),
  previewContainer = document.querySelector(".preview");

function preview(event) {
  const reader = new FileReader();

  reader.onloadend = () => {
    previewContainer.style.backgroundColor = "transparent";
    photoIcon.style.display = "none";
    imgPreview.style.display = "block";
    imgPreview.src = reader.result;
  };

  reader.readAsDataURL(event);
}

// Add Blog Logic

let blogs = [];
const errAlert = document.querySelector(".validation__alert");

function addBlog(event) {
  event.preventDefault();

  // Input Value
  const projectName = document.getElementById("name").value,
    startDate = document.getElementById("start-date").value,
    endDate = document.getElementById("end-date").value,
    description = document.getElementById("description").value,
    errMsg = document.getElementById("error__msg");

  if (!projectName || !startDate || !endDate || !description) {
    errAlert.style.display = "block";
    errAlert.style.backgroundColor = "#e28484";
    errAlert.style.color = "#8f2121";
    errMsg.innerHTML = "All Fields is Required!";
    return;
  }

  // image
  let image = document.getElementById("upload");

  image = URL.createObjectURL(image.files[0]);

  const blog = {
    projectName,
    description,
    image,
    duration: countDuration(new Date(startDate), new Date(endDate)),
    technologies: filterChecboxChecked(),
  };

  blogs.push(blog);

  errAlert.style.display = "block";
  errAlert.style.backgroundColor = "#82eb82";
  errAlert.style.color = "#308330";
  errMsg.innerHTML = "New Blog Created Successfully";

  renderBlog();
}

// Getting checbox checked
function filterChecboxChecked() {
  // querry all checkbox inputs
  const checkboxChecked = document.querySelectorAll(
    ".checkbox__group input[type='checkbox']:checked"
  );

  // Array Container
  let cbValue = [];

  // turn nodelist into array
  for (let i = 0; i < checkboxChecked.length; i++) {
    cbValue.push(checkboxChecked[i].value);
  }

  return cbValue;
}

// Closing Alert
function closeAlert() {
  errAlert.style.display = "none";
}

// Render Blog
function renderBlog() {
  let blogContainer = document.getElementById("blog-container");

  blogContainer.innerHTML = "";

  for (let i = 0; i < blogs.length; i++) {
    const techs = blogs[i].technologies;
    blogContainer.innerHTML += `
    <div class="blog__items">
      <a href="./blog-detail.html">
        <div class="blog__image">
          <img src="${blogs[i].image}" alt="Blog Image" />
        </div>
        <div class="blog__header">
          <h3 class="blog__title">${blogs[i].projectName}</h3>
          <p class="blog__duration">Duration : ${blogs[i].duration} Month</p>
        </div>
        <div class="blog__body">
          <p class="blog__description truncate">${blogs[i].description}</p>
        </div>
        <div class="blog__techs">
          ${techs[0] ? `<i class="fa-brands fa-${techs[0]}"></i>` : ""}
          ${techs[1] ? `<i class="fa-brands fa-${techs[1]}"></i>` : ""}
          ${techs[2] ? `<i class="fa-brands fa-${techs[2]}"></i>` : ""}
          ${techs[3] ? `<i class="fa-brands fa-${techs[3]}"></i>` : ""}
          ${techs[4] ? `<i class="fa-brands fa-${techs[4]}"></i>` : ""}
          ${techs[5] ? `<i class="fa-brands fa-${techs[5]}"></i>` : ""}
        </div>
        <div class="blog__actions">
          <button type="button" class="action__btn">Edit</button>
          <button type="button" class="action__btn">Delete</button>
        </div>
      </a>
    </div>
        `;
  }
}

function renderTechIcons(techs) {
  const blogTech = document.querySelector(".blog__tech");

  for (let i = 0; i < techs.length; i++) {
    blogTech.innerHTML += `<i class="fa-brands fa-${techs[i]}"></i>`;
  }
}

// const month = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// // Time Format
// function timeFormat(time) {
//   const date = time.getDate();
//   const monthIndex = time.getMonth();
//   const year = time.getFullYear();

//   const hour = time.getHours();
//   const minute = time.getMinutes();

//   return `${date} ${month[monthIndex]} ${year} ${hour}:${minute} WIB`;
// }

// Count Project Duration
function countDuration(startDate, endDate) {
  const result =
    startDate.getMonth() -
    endDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());

  return Math.abs(result);
}
