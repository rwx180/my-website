const cursorSmall = document.querySelector('.cursor-pointer');
const cursorBig = document.querySelector('.cursor-background-fitler');


const positionElement = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  var htmlLang = document.documentElement.lang;
  cursorSmall.style.top = `${mouseY}px`;
  cursorSmall.style.left = `${mouseX}px`;
  cursorBig.style.top = `${mouseY}px`;
  cursorBig.style.left = `${mouseX}px`;

}
if (cursorSmall) {
  window.addEventListener('mousemove', positionElement)
}


const about = () => {
  window.location = 'about'
}
const blog = () => {
  window.location = 'blog'
}
const portfolio = () => {
  window.location = 'portfolio'
}
const home = () => {
  window.location = '/'
}

const back = () => {
  
  window.history.back()
}
document.addEventListener('alpine:init', () => {
  Alpine.store('darkMode', {
    on: false,

    toggle() {
      this.on = !this.on
    }
  })
})

function toggleMenuButton() {
  var menu = document.getElementById('header-menu');
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
  } else {
    menu.classList.add('active');
  }
};
function updateOnlineStatus(event) {


  var mainContent = document.getElementsByClassName('loaded-content')
  var internetData = document.getElementsByClassName('internet-data')
  if (!navigator.onLine) {
    for(var i=0; i< mainContent.length; i++ ){
      mainContent[i].classList.add('hidden');

    }
    for(var i=0; i< internetData.length; i++ ){
      internetData[i].classList.remove('hidden');

    }
      
    

  }
  if (navigator.onLine) {
    for(var i=0; i< mainContent.length; i++ ){
      mainContent[i].classList.remove('hidden');

    }
    for(var i=0; i< internetData.length; i++ ){
      internetData[i].classList.add('hidden');

    }

  }
}
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('loading-screen').style.display = 'none';


  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  updateOnlineStatus(); // Initial check
});
let base_url = 'https://ayatali.com/api/v1/'
function fetchData() {
  return {
    personal: {},
    imageUrl: 'https://ayatali.com/storage/ayat/',
    socaialMedia: {},
    loading: false,
    error: '',
    footerContent: '',
    headerContent: '',
    noInternet: '',
    notfound: '',
    errorPage: '',
    about: [],
    blogs: [],
    portfolio: [],
    blogDetails: {},
    projectDetails: {},
    page: 1,
    perPage: 10,
    lastPage: 1,
    isOnline: navigator.onLine,
    base_url: 'https://ayatali.com/api/v1/',
    async loadContent(url) {
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      return response.data;
    },
    updateOnlineStatus(status) {
      this.isOnline = status;

    },
    setLastPage(lastPage) {
      this.lastPage = lastPage

    },
    formatDate(date) {
      // Array of month abbreviations
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthNamesAR = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
        "يوليو", "اغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

      var htmlLang = document.documentElement.lang;
      // Get the day of the month
      let newDate = new Date(date);
      const day = newDate.getDate();
      console.log(newDate)
      // Get the month abbreviation
      const month = htmlLang == 'ar' ? monthNamesAR[newDate.getMonth()] : monthNames[newDate.getMonth()];
      // Get the full year
      const year = newDate.getFullYear();

      // Return the formatted date
      return htmlLang == 'ar' ? `${day}، ${month}، ${year}` : `${day}, ${month}, ${year}`;
    },

    async contentData(page, per_page, tags, currentID = null) {

      let tagsIds = []
      if (tags) {
        tagsIds = JSON.parse(tags).reduce(
          (acc, x, i) =>
            acc.concat(
              x.id), []
        )
      }


      this.loading = true;
      this.error = '';
      try {

        const response = await axios.get(this.base_url + `contents/pages/${page}?page=${this.page}&${per_page ? 'per_page=' + per_page : ''}&${tagsIds ? 'tags=' + tagsIds : ''}&${currentID ? 'current_id=' + currentID : ''}`,
          {
            headers: {
              locale: document.documentElement.lang
            }
          })
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        let contentArray = await response.data.data?.data;
        this.lastPage = await response.data.data.last_page;
        let formated = contentArray
          .reduce(
            (acc, x, i) =>
              acc.concat(
                {
                  id: x.id,
                  created_at: this.formatDate(x.created_at),
                  title: x.title,
                  image: x.image,
                  content_details: JSON.parse(x.content_details),
                  sections_data: JSON.parse(x.sections_data),
                  tags_data: JSON.parse(x.tags_data),
                  content_data: JSON.parse(x.content_data)

                }
              ),
            [],
          );

        // console.log(formated);
        this[page] = [...this[page], ...formated]
        // this.socaialMedia = await social.data.data;
      } catch (error) {
        this.error = 'Failed to fetch data: ' + error.message;
      } finally {
        this.loading = false;
      }

    },
    checkScroll(page) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1200 && !this.loading && (this.lastPage > this.page)) {
        this.page++
        this.contentData(page);
      }
    },
    reloadPage() {
      location.reload()
    },

  }
}