import{s as o}from"./symbol-defs-64727322.js";const t=document.querySelector(".header__btn"),a=localStorage.getItem("theme");a==="dark"&&document.body.classList.add("dark-theme");function s(){const e=document.body.classList.contains("dark-theme");t.innerHTML=`
    <svg class="header__theme-icon">
      <use href="${o}#${e?"sun":"moon"}"></use>
    </svg>
  `}s();t.addEventListener("click",()=>{document.body.classList.toggle("dark-theme");const e=document.body.classList.contains("dark-theme");localStorage.setItem("theme",e?"dark":"light"),s()});
//# sourceMappingURL=header-54b8fdea.js.map
