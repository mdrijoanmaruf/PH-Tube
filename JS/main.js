// Fetch Nav Button
const fetchNevMenu = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) =>{
        displayNavMenu(data.categories)
    })
    
}

// Fetch All Videos
const fetchAllVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => {
        displayAllVideos(data.videos)
    })
}



// Display Dynamic Navbar
const displayNavMenu = (navItem) =>{
    const buttonNavContainer = document.getElementById('buttonNavContainer');
    for(let i of navItem){
        let navDiv = document.createElement('div');
        let nav = `
        <div>
            <button class="bg-gray-600 text-white rounded text-[16px] font-[500] md:py-2 py-1 px-4 hover:bg-red-700 cursor-pointer">${i.category}</button>
        </div>
        `
        navDiv.innerHTML = nav;
        buttonNavContainer.append(navDiv)
    }
    
}

// Display Dynamic All Videos
const displayAllVideos = (data) => {
    const allCardsContainer = document.getElementById('allCardsContainer');

    for(let i of data){
        let video = document.createElement('div');
        video.innerHTML = `
            <div class="object-cover h-[200px] relative">
                <img class="rounded-md h-full w-full object-cover" src="${i.thumbnail}" alt="">
                <p class="absolute bottom-2 bg-gray-600 text-gray-100 right-2 text-xs
                    p-[2px] rounded-[4px]">${i.others.views}</p>
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
        `
        allCardsContainer.append(video)
        console.log(i);
        
    }
}




fetchNevMenu()
fetchAllVideos()