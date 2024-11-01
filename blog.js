
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('blog-share-button');
  const closeBtn = document.getElementById('close-share-modal');
  const floatingMenu = document.getElementById('share-modal');

  // Toggle menu visibility
  menuButton.addEventListener('click', () => {
    floatingMenu.classList.toggle('hidden');
    positionMenu(menuButton, floatingMenu, window.scrollY);

  });
  closeBtn.addEventListener('click', () => {
    floatingMenu.classList.toggle('hidden');

  });


  // Function to position the menu
  function positionMenu(button, menu, scrollY) {
    const rect = button.getBoundingClientRect();
    const menuHeight = menu.offsetHeight;


    // Basic dynamic positioning logic (floating-style)
    let top = rect.top;
    let isBottom = false;
    let left = rect.left
    // + window.scrollX;

    // Ensure the menu doesn't overflow the viewport
    if (top + menuHeight > window.innerHeight) {
      menu.style.top = `-${menuHeight + 18}px`;
    } else {
      menu.style.top = `calc(100% + 18px)`;
    }
  }

  window.addEventListener('scroll', () => {

    const scrollTop = window.scrollY; // Get the current vertical scroll position
    positionMenu(menuButton, floatingMenu, window.scrollY);


  });

  // Close the menu if clicked outside
  document.addEventListener('click', (event) => {
    if (!menuButton.contains(event.target) && !floatingMenu.contains(event.target)) {
      floatingMenu.classList.add('hidden');
    }
  });

  const copyBtn = document.getElementById('copy-link');
  const copiedMessage = document.getElementById('copied-message');

  copyBtn.addEventListener('click', (event) => {
    const link = window.location.href;
    navigator.clipboard.writeText(link)
      .then(() => {
        copiedMessage.style.display = 'flex'

        setTimeout(() => {
          copiedMessage.style.display = 'none'

        }, 2000)
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  })

})

mediumZoom(document.querySelectorAll("img"), {
  margin: 24,
  background: 'rgba(0,0,0,0.5)',
  scrollOffset: 0,
})
