document.addEventListener('DOMContentLoaded', () =>{
    let btn = document.querySelector('.theme-btn');
    let hero_bg = document.querySelector('#home-hero-bg');
    let project_bg = document.getElementById("bg_shape");

    let home = document.getElementById('home-page');
    let projects = document.getElementById('projects-page');

    let themeStorage = localStorage.getItem('theme');
    let darkTheme = true;
    if (themeStorage != null){
        setTheme(themeStorage); 
    }
    
    // Hero bg parallax
    if (home != null) 
    // Check if we are in the home page
    {
        window.addEventListener('scroll', ()=> {
            let value = window.scrollY;
            hero_bg.style.bottom = (value*0.4 -150) + 'px'
        });
    }
    
    
    // Projects pages bg parallax 
    if (projects != null)
    // Check if we are the projects' page
    {
        window.addEventListener('scroll', ()=> {
            let value = window.scrollY;
            project_bg.style.bottom = (value*0.75 - 300) + 'px'
        });
    }

    // Theme Handler

    function setTheme(theme)
    {
        if (theme == 'light') {
            if (home != null){
                hero_bg.src = "./assets/img/hero_bg_light.svg"
                btn.innerHTML = '<i class="uil uil-brightness-low"></i> Switch to dark theme';
            }
            if (projects != null){
                project_bg.src ="./assets/img/projects_bg_light.svg";
            }
            document.getElementById('theme-color').href = "styles/lightTheme.css";
            darkTheme = false
            localStorage.setItem('theme', 'light');
        }
        else{
            if (home != null){
                hero_bg.src = "./assets/img/hero_bg_dark.svg"
                btn.innerHTML = '<i class="uil uil-brightness-low"></i> Switch to light theme';
            }
            if (projects != null){
                project_bg.src ="./assets/img/projects_bg_dark.svg";
            }
            darkTheme = true
            document.getElementById('theme-color').href = "";
            localStorage.setItem('theme', 'dark');
        }
    }
    if (home != null){
        btn.addEventListener('click', ()=> {
            if (darkTheme) {
                setTheme('light')
            }else{
                setTheme('dark')
                
            }   
        });
    }
        
});