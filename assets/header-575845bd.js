const t=document.querySelector(".header__btn"),o=localStorage.getItem("theme");o==="dark"&&document.body.classList.add("dark-theme");function s(){const e=document.body.classList.contains("dark-theme");t.innerHTML=`
    <svg class="header__theme-icon">
      <use href="./img/symbol-defs.svg#${e?"sun":"moon"}"></use>
    </svg>
  `}s();t.addEventListener("click",()=>{document.body.classList.toggle("dark-theme");const e=document.body.classList.contains("dark-theme");localStorage.setItem("theme",e?"dark":"light"),s()});
//# sourceMappingURL=header-575845bd.js.map
