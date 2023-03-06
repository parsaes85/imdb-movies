// in error handling this message show

const refreshMessage = () => {
    loader.innerHTML = `
    <div class="flex flex-col items-center gap-2">
        <h1 class="text-xl">Can't get data. Please Refresh</h1>
        <button class="bg-movieBg py-2 px-8 rounded-lg" onclick="location.reload()">Refresh</button>
    </div>
    `
}