// Fetch Nav Button
const fetchNevMenu = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) =>{
        displayNavMenu(data.categories)
    })
    
}

// Fetch All Videos
const fetchAllVideos = (id) => {
    if(id){
        const clickedBtn = document.getElementById(`btn-${id}`);
        clickedBtn.classList.add('active')
        removeActiveClass()
        document.getElementById('allBtn').addEventListener('click' , ()=>{
            removeActiveClass()
            document.getElementById('allBtn').classList.add('active')
        })
    }
    if(id){
        fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            displayAllVideos(data.category)            
        })
    }
    else{
        fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => {
            displayAllVideos(data.videos)
        })
    }
    
}

const removeActiveClass = () =>{
    let allActive = document.getElementsByClassName('active');
    for(let i of allActive){
        i.classList.remove('active')
    }
}

fetchNevMenu()
fetchAllVideos()

// Display Dynamic Navbar
const displayNavMenu = (navItem) =>{
    const buttonNavContainer = document.getElementById('buttonNavContainer');
    for(let i of navItem){
        let navDiv = document.createElement('div');
        let nav = `
        <div>
            <button id="btn-${i.category_id}" onclick="fetchAllVideos(${i.category_id})" class="bg-gray-600 btn text-white rounded text-[16px] font-[500] md:py-2 py-1 px-4 hover:bg-red-700 cursor-pointer">${i.category}</button>
        </div>
        `
        navDiv.innerHTML = nav;
        buttonNavContainer.append(navDiv)
    }
    
}

// Display Dynamic All Videos
const displayAllVideos = (data) => {
    const allCardsContainer = document.getElementById('allCardsContainer');
    if(data.length == 0){
        allCardsContainer.innerHTML = `
            <div class="col-span-full flex flex-col items-center gap-6 mt-8">
                <div>
                    <img class="w-[120px]" src="assets/Icon.png" alt="">
                </div>
                <h2 class="text-center font-[700] text-2xl px-[50px]">
                    Oops!! Sorry, There is no content here
                </h2>
            </div>
        `
        console.log('Zero');
        return ;
    }
    allCardsContainer.innerHTML = ''
    for(let i of data){
        let video = document.createElement('div');
        video.innerHTML = `
            <div class="object-cover cursor-pointer h-[200px] relative">
                <img class="rounded-md h-full w-full object-cover" src="${i.thumbnail}" alt="">
                <p class="absolute bottom-2 bg-gray-600 text-gray-100 right-2 text-xs p-[2px] font-[700] rounded-[4px]">${i.others.views}</p>
            </div>
            <div class="mt-3">
                <div class="flex gap-3 items-center font-[700]">
                    <div class="avatar">
                        <div class="w-10 rounded-full">
                            <img src="${i.authors[0].profile_picture}" />
                        </div>
                    </div>
                    <h2 class="text-xl">
                        ${i.title}
                    </h2>
                </div>
                
                <div class="flex justify-between items-center">
                    <div>
                        <div class="flex gap-1 mt-1 items-center">
                            <p class="opacity-80">${i.authors[0].profile_name}</p>
                            <div>
                                <img class="w-4" src="assets/varified.png" alt="">
                            </div>
                        </div>
                        <div class="mt-1">
                            <p class="opacity-80 font-semibold">91k Views</p>
                        </div>
                    </div>

                    <div>
                        <button class="bg-green-600 text-white text-[18px] px-2 rounded cursor-pointer ">Details</button>
                    </div>
                </div>
            </div>
        `
        allCardsContainer.append(video)

        
    }
}



