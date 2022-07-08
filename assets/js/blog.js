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
    // Checkboxes
    nodejs = document.getElementById("nodejs"),
    reactjs = document.getElementById("reactjs"),
    nextjs = document.getElementById("nextjs"),
    typescript = document.getElementById("typescript");

  const errMsg = document.getElementById("error__msg");

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

  //   Technologies checkboxessss
  const checkboxes = [nodejs, nextjs, reactjs, typescript];

  const blog = {
    projectName,
    description,
    image,
    startDate,
    endDate,
    technologies: checkboxes.filter((c) => c.checked == true),
  };

  blogs.push(blog);

  errAlert.style.display = "block";
  errAlert.style.backgroundColor = "#82eb82";
  errAlert.style.color = "#308330";
  errMsg.innerHTML = "New Blog Created Successfully";

  renderBlog();
}

function closeAlert() {
  errAlert.style.display = "none";
}

// Render Blog
function renderBlog() {
  let blogContainer = document.getElementById("blog-container");

  blogContainer.innerHTML = "";

  for (let i = 0; i < blogs.length; i++) {
    blogContainer.innerHTML += `
      <div class="blog__items">
        <a href="./blog-detail.html">
          <div class="blog__image">
            <img src="${blogs[i].image}" alt="Blog Image" />
          </div>
          <div class="blog__title">
            <h4 class="truncate">${blogs[i].projectName}</h4>
            <p class="truncate">
              ${blogs[i].description}
            </p>
          </div>
          <div class="blog__date">
            <p class="truncate">Duration : ${countDuration(
              new Date(blogs[i].startDate),
              new Date(blogs[i].endDate)
            )} Month</p>
          </div>
        </a>
        <div class="blog__actions">
          <button type="button" class="action__btn">Edit</button>
          <button type="button" class="action__btn">Delete</button>
        </div>
      </div>
        `;
  }
}

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Time Format
function timeFormat(time) {
  const date = time.getDate();
  const monthIndex = time.getMonth();
  const year = time.getFullYear();

  const hour = time.getHours();
  const minute = time.getMinutes();

  return `${date} ${month[monthIndex]} ${year} ${hour}:${minute} WIB`;
}

// Count Project Duration
function countDuration(startDate, endDate) {
  const result =
    startDate.getMonth() -
    endDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear());

  return Math.abs(result);
}
