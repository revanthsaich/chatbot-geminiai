const themeImage = document.getElementById('theme');
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    if(document.body.classList.contains("dark-theme"))
    {
        theme.src="dark_mode.png"
        document.body.style.background=""
    }
    else
    {
        theme.src="light_mode.png"
    }

    const currentBgImage = getComputedStyle(document.body).getPropertyValue('--bg-image');

  // Define the new background image URLs for light and dark themes
  const lightBgImage = 'url("bg_light.jpg")';
  const darkBgImage = 'url("bg_dark.jpg")';

  // Update the background image based on the current theme
  if (currentBgImage === lightBgImage) {
    document.body.style.setProperty('--bg-image', darkBgImage);
  } else {
    document.body.style.setProperty('--bg-image', lightBgImage);
  }
}
document.body.style.transition = "background-image 0.2s linear,  background-color 0.2s linear";


themeImage.addEventListener('click', toggleTheme);
